import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import sharp from 'sharp'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
    try {
        const supabase = await createClient()

        // 1. Verifikasi Autentikasi Pengguna
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError || !user || !user.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // 2. Verifikasi Hak Administrator
        const { data: adminData, error: adminError } = await supabase
            .from('admin_users')
            .select('id, email')
            .ilike('email', user.email.trim())
            .single()

        if (adminError || !adminData) {
            return NextResponse.json({ error: 'Bukan akun administrator' }, { status: 403 })
        }

        // 3. Ambil file dari form data
        const formData = await request.formData()
        const file = formData.get('file') as File | null

        if (!file) {
            return NextResponse.json({ error: 'Tidak ada file gambar yang dikirim' }, { status: 400 })
        }

        const originalSize = file.size
        const arrayBuffer = await file.arrayBuffer()
        const inputBuffer = Buffer.from(arrayBuffer)

        // 4. Proses konversi ke WebP dan optimasi ukuran (Sharp)
        const webpBuffer = await sharp(inputBuffer)
            .resize({
                width: 1200,
                height: 800,
                fit: 'inside',
                withoutEnlargement: true,
            })
            .webp({
                quality: 80,
                effort: 4,
            })
            .toBuffer()

        const compressedSize = webpBuffer.length
        const fileName = `article-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.webp`
        const storagePath = `berita/${fileName}`

        // 5. Simpan ke Supabase Storage (documents bucket)
        const { error: uploadError } = await supabase.storage
            .from('documents')
            .upload(storagePath, webpBuffer, {
                contentType: 'image/webp',
                upsert: true,
            })

        if (uploadError) {
            console.error('Supabase storage upload error:', uploadError)
            return NextResponse.json(
                { error: 'Gagal mengunggah gambar ke cloud storage: ' + uploadError.message },
                { status: 500 }
            )
        }

        // 6. Simpan salinan lokal di public/uploads/berita jika memungkinkan (opsional untuk fast local load)
        try {
            const localUploadsDir = path.join(process.cwd(), 'public', 'uploads', 'berita')
            if (!existsSync(localUploadsDir)) {
                await mkdir(localUploadsDir, { recursive: true })
            }
            await writeFile(path.join(localUploadsDir, fileName), webpBuffer)
        } catch {
            // Abaikan jika filesystem read-only (seperti serverless Vercel)
        }

        // 7. URL yang dapat diakses secara publik
        const mediaUrl = `/api/media?path=${encodeURIComponent(storagePath)}`

        return NextResponse.json({
            success: true,
            url: mediaUrl,
            fileName,
            originalSize,
            compressedSize,
            savingsPercentage: Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100)),
        })
    } catch (err: unknown) {
        console.error('Error in upload article image:', err)
        const message = err instanceof Error ? err.message : 'Terjadi kesalahan sistem'
        return NextResponse.json({ error: message }, { status: 500 })
    }
}

