/**
 * Client-Side Image Compression & Auto-WebP Converter
 * Berfungsi mengonversi gambar ke WebP dan menurunkan ukurannya (MB -> KB)
 * secara langsung di browser SEBELUM diupload, sehingga:
 * 1. Menghemat bandwidth dan network egress hingga 90-98%
 * 2. Mencegah log ingestion berlebih akibat payload multipart besar
 * 3. Menjaga kuota Supabase Storage tetap hemat dan efisien
 */

export interface CompressionOptions {
    maxWidth?: number
    maxHeight?: number
    quality?: number
    maxFileSizeKB?: number
}

export interface CompressionResult {
    file: File
    blob: Blob
    dataUrl: string
    originalSize: number
    compressedSize: number
    savingsPercentage: number
    width: number
    height: number
}

export function formatBytes(bytes: number, decimals = 1): string {
    if (bytes === 0) return '0 B'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export async function compressAndConvertToWebP(
    inputFile: File,
    options: CompressionOptions = {}
): Promise<CompressionResult> {
    const maxWidth = options.maxWidth || 1200
    const maxHeight = options.maxHeight || 800
    let quality = options.quality || 0.82
    const maxFileSizeKB = options.maxFileSizeKB || 300

    return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.onerror = () => reject(new Error('Gagal membaca file gambar'))
        reader.onload = (e) => {
            const img = new Image()

            img.onerror = () => reject(new Error('Gagal memuat gambar untuk kompresi'))
            img.onload = async () => {
                try {
                    // 1. Hitung dimensi baru proporsional
                    let width = img.naturalWidth || img.width
                    let height = img.naturalHeight || img.height

                    if (width > maxWidth || height > maxHeight) {
                        const ratio = Math.min(maxWidth / width, maxHeight / height)
                        width = Math.round(width * ratio)
                        height = Math.round(height * ratio)
                    }

                    // 2. Render ke HTML5 Canvas
                    const canvas = document.createElement('canvas')
                    canvas.width = width
                    canvas.height = height
                    const ctx = canvas.getContext('2d')

                    if (!ctx) {
                        throw new Error('Canvas 2D context tidak tersedia di browser')
                    }

                    // Optimasi rendering kualitas tinggi
                    ctx.imageSmoothingEnabled = true
                    ctx.imageSmoothingQuality = 'high'
                    ctx.drawImage(img, 0, 0, width, height)

                    // 3. Konversi ke WebP Blob
                    const getBlob = (q: number): Promise<Blob | null> => {
                        return new Promise((res) => {
                            canvas.toBlob(res, 'image/webp', q)
                        })
                    }

                    let blob = await getBlob(quality)

                    // Fallback jika browser lawas tidak mendukung canvas WebP (sangat jarang)
                    let mimeType = 'image/webp'
                    let ext = 'webp'
                    if (!blob) {
                        mimeType = 'image/jpeg'
                        ext = 'jpg'
                        blob = await new Promise((res) => canvas.toBlob(res, 'image/jpeg', quality))
                    }

                    if (!blob) {
                        throw new Error('Gagal mengonversi gambar ke blob')
                    }

                    // Jika ukuran masih > batas target, lakukan kompresi tahap kedua
                    if (blob.size > maxFileSizeKB * 1024 && quality > 0.65) {
                        quality = 0.68
                        const smallerBlob = await getBlob(quality)
                        if (smallerBlob && smallerBlob.size < blob.size) {
                            blob = smallerBlob
                        }
                    }

                    // 4. Buat objek File baru dengan ekstensi .webp
                    const originalNameNoExt = inputFile.name.substring(0, inputFile.name.lastIndexOf('.')) || inputFile.name
                    const cleanName = originalNameNoExt.toLowerCase().replace(/[^a-z0-9_-]/g, '_')
                    const newFileName = `${cleanName}.${ext}`

                    const webpFile = new File([blob], newFileName, {
                        type: mimeType,
                        lastModified: Date.now(),
                    })

                    const savings = Math.max(
                        0,
                        Math.round(((inputFile.size - blob.size) / inputFile.size) * 100)
                    )

                    const dataUrl = canvas.toDataURL(mimeType, quality)

                    resolve({
                        file: webpFile,
                        blob,
                        dataUrl,
                        originalSize: inputFile.size,
                        compressedSize: blob.size,
                        savingsPercentage: savings,
                        width,
                        height,
                    })
                } catch (err) {
                    reject(err)
                }
            }

            img.src = e.target?.result as string
        }

        reader.readAsDataURL(inputFile)
    })
}

