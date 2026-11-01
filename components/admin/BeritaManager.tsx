'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import {
    Plus,
    Pencil,
    Trash2,
    Eye,
    Search,
    Calendar,
    Tag,
    CheckCircle2,
    AlertCircle,
    ExternalLink,
    X,
    Newspaper,
    Sparkles,
    FileText,
    Upload,
    ImageIcon,
    Loader2,
    Link2,
    Check,
    ArrowLeft
} from 'lucide-react'
import type { Article } from '@/types/content.types'
import { compressAndConvertToWebP, formatBytes } from '@/lib/image-compression'

interface BeritaManagerProps {
    initialArticles: Article[]
}

const CATEGORY_OPTIONS = [
    'Pengumuman SPMB',
    'Kegiatan Santri',
    'Prestasi',
    'Karakter & Pembiasaan',
    'Akademik',
    'Fasilitas & Sarana',
    'Kesiswaan & Ekstrakurikuler'
]

export default function BeritaManager({ initialArticles }: BeritaManagerProps) {
    const router = useRouter()
    const [articles, setArticles] = useState<Article[]>(initialArticles)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string>('all')

    // View state: 'list' untuk daftar berita, 'form' untuk editor satu halaman penuh (BUKAN popup)
    const [viewMode, setViewMode] = useState<'list' | 'form'>('list')
    const [editingArticle, setEditingArticle] = useState<Article | null>(null)
    const [previewArticle, setPreviewArticle] = useState<Article | null>(null)
    const [deleteTarget, setDeleteTarget] = useState<Article | null>(null)

    // Form fields
    const [formTitle, setFormTitle] = useState('')
    const [formDate, setFormDate] = useState('')
    const [formCategory, setFormCategory] = useState(CATEGORY_OPTIONS[0])
    const [formCustomCategory, setFormCustomCategory] = useState('')
    const [formSummary, setFormSummary] = useState('')
    const [formContent, setFormContent] = useState('')
    const [formImageUrl, setFormImageUrl] = useState('')

    // Image upload state
    const [imageInputMode, setImageInputMode] = useState<'upload' | 'url'>('upload')
    const [isProcessingImage, setIsProcessingImage] = useState(false)
    const [compressionStats, setCompressionStats] = useState<{
        originalSize: number
        compressedSize: number
        savings: number
    } | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Status state
    const [isSaving, setIsSaving] = useState(false)
    const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

    const getTodayFormatted = () => {
        const months = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ]
        const now = new Date()
        return `${String(now.getDate()).padStart(2, '0')} ${months[now.getMonth()]} ${now.getFullYear()}`
    }

    const openAddForm = () => {
        setEditingArticle(null)
        setFormTitle('')
        setFormDate(getTodayFormatted())
        setFormCategory(CATEGORY_OPTIONS[0])
        setFormCustomCategory('')
        setFormSummary('')
        setFormContent('')
        setFormImageUrl('')
        setCompressionStats(null)
        setImageInputMode('upload')
        setViewMode('form')
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const openEditForm = (article: Article) => {
        setEditingArticle(article)
        setFormTitle(article.title)
        setFormDate(article.date)
        if (CATEGORY_OPTIONS.includes(article.category)) {
            setFormCategory(article.category)
            setFormCustomCategory('')
        } else {
            setFormCategory('Lainnya')
            setFormCustomCategory(article.category)
        }
        setFormSummary(article.summary)
        setFormContent(article.content || article.summary)
        setFormImageUrl(article.image_url || '')
        setCompressionStats(null)
        setImageInputMode(article.image_url ? 'upload' : 'upload')
        setViewMode('form')
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const closeForm = () => {
        setViewMode('list')
        setEditingArticle(null)
        setCompressionStats(null)
    }

    // Auto-compress to WebP and upload
    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsProcessingImage(true)
        setCompressionStats(null)

        try {
            // 1. Kompresi dan auto-convert ke WebP di sisi browser (Client-Side)
            const result = await compressAndConvertToWebP(file, {
                maxWidth: 1200,
                maxHeight: 800,
                quality: 0.82,
                maxFileSizeKB: 250,
            })

            setCompressionStats({
                originalSize: result.originalSize,
                compressedSize: result.compressedSize,
                savings: result.savingsPercentage,
            })

            // Tampilkan preview instan
            setFormImageUrl(result.dataUrl)

            // 2. Upload file WebP ringan ke server
            const formData = new FormData()
            formData.append('file', result.file)

            const uploadRes = await fetch('/api/admin/articles/upload-image', {
                method: 'POST',
                body: formData,
            })

            const uploadData = await uploadRes.json()

            if (!uploadRes.ok) {
                throw new Error(uploadData.error || 'Gagal mengunggah gambar ke server')
            }

            // Simpan URL media permanen
            setFormImageUrl(uploadData.url)
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : 'Gagal memproses gambar'
            alert('Gagal memproses gambar: ' + msg)
        } finally {
            setIsProcessingImage(false)
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        }
    }

    const handleRemoveImage = () => {
        setFormImageUrl('')
        setCompressionStats(null)
    }

    const handleSaveList = async (updatedList: Article[]) => {
        setIsSaving(true)
        setStatusMessage(null)

        try {
            const res = await fetch('/api/admin/articles', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ articles: updatedList }),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || 'Gagal menyimpan perubahan berita')
            }

            setArticles(updatedList)
            setStatusMessage({
                type: 'success',
                text: 'Daftar berita berhasil disimpan dan langsung tayang di website publik!',
            })
            router.refresh()
            setTimeout(() => setStatusMessage(null), 4000)
            return true
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : 'Terjadi kesalahan sistem'
            setStatusMessage({ type: 'error', text: msg })
            return false
        } finally {
            setIsSaving(false)
        }
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const finalCategory = formCategory === 'Lainnya' && formCustomCategory.trim()
            ? formCustomCategory.trim()
            : formCategory

        if (!formTitle.trim()) {
            alert('Judul berita tidak boleh kosong')
            return
        }

        let updated: Article[]
        if (editingArticle) {
            // Update existing
            updated = articles.map((item) =>
                item.id === editingArticle.id
                    ? {
                        ...item,
                        title: formTitle.trim(),
                        date: formDate.trim() || getTodayFormatted(),
                        category: finalCategory,
                        summary: formSummary.trim(),
                        content: formContent.trim() || formSummary.trim(),
                        image_url: formImageUrl.trim() || undefined,
                    }
                    : item
            )
        } else {
            // Add new
            const newArticle: Article = {
                id: Date.now().toString(),
                title: formTitle.trim(),
                date: formDate.trim() || getTodayFormatted(),
                category: finalCategory,
                summary: formSummary.trim(),
                content: formContent.trim() || formSummary.trim(),
                image_url: formImageUrl.trim() || undefined,
            }
            // Put new article on top
            updated = [newArticle, ...articles]
        }

        const success = await handleSaveList(updated)
        if (success) {
            setViewMode('list')
            setEditingArticle(null)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    const confirmDelete = async () => {
        if (!deleteTarget) return
        const updated = articles.filter((item) => item.id !== deleteTarget.id)
        const success = await handleSaveList(updated)
        if (success) {
            setDeleteTarget(null)
        }
    }

    // Filtered articles
    const filteredArticles = articles.filter((art) => {
        const matchesQuery =
            art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
            art.category.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCat =
            selectedCategory === 'all' || art.category === selectedCategory
        return matchesQuery && matchesCat
    })

    // Available categories from current articles
    const uniqueCategories = Array.from(
        new Set(articles.map((a) => a.category).filter(Boolean))
    )

    // ==========================================
    // TAMPILAN 1: FORM FULL HALAMAN (BUKAN POPUP)
    // Didesain khusus agar sangat lega di HP (Infinix Note 8 dsb)
    // ==========================================
    if (viewMode === 'form') {
        return (
            <div className="space-y-4 sm:space-y-6 max-w-5xl mx-auto pb-16 animate-in fade-in duration-150">
                {/* Top Nav: Tombol Kembali & Info Halaman */}
                <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <button
                        type="button"
                        onClick={closeForm}
                        className="inline-flex items-center gap-2 text-slate-700 hover:text-emerald-900 font-bold text-sm sm:text-base py-2 px-3 rounded-xl hover:bg-slate-100 transition-colors self-start min-h-[44px]"
                    >
                        <ArrowLeft className="w-5 h-5 text-emerald-800" />
                        <span>Kembali ke Daftar Berita</span>
                    </button>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                        <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                            <span>{editingArticle ? 'Mode Sunting Berita' : 'Tulis Berita Baru'}</span>
                        </span>
                    </div>
                </div>

                {/* Form Utama: Full-width, lega, font 16px di mobile agar tidak zoom otomatis */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 border border-slate-200/90 shadow-sm">
                    <div className="mb-6 pb-4 border-b border-slate-100">
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                            {editingArticle ? 'Sunting Berita Sekolah' : 'Tambah Berita & Kabar Sekolah'}
                        </h1>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                            Foto otomatis dikonversi ke WebP dan dikompresi agar loading cepat, hemat storage, dan bebas lag di smartphone.
                        </p>
                    </div>

                    <form onSubmit={handleFormSubmit} className="space-y-5 sm:space-y-6">
                        {/* Judul Berita */}
                        <div>
                            <label className="block text-xs sm:text-sm font-bold text-gray-800 uppercase tracking-wider mb-1.5">
                                Judul Berita / Kegiatan *
                            </label>
                            <input
                                type="text"
                                required
                                value={formTitle}
                                onChange={(e) => setFormTitle(e.target.value)}
                                placeholder="Contoh: Semarak Ujian Munaqosyah & Wisuda Tahfidz Santri Al-Ittihadiyah"
                                className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-hidden font-medium"
                            />
                        </div>

                        {/* Tanggal & Kategori */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs sm:text-sm font-bold text-gray-800 uppercase tracking-wider mb-1.5">
                                    Tanggal Publikasi
                                </label>
                                <input
                                    type="text"
                                    value={formDate}
                                    onChange={(e) => setFormDate(e.target.value)}
                                    placeholder="Contoh: 01 November 2026"
                                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-hidden bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm font-bold text-gray-800 uppercase tracking-wider mb-1.5">
                                    Kategori Berita
                                </label>
                                <select
                                    value={formCategory}
                                    onChange={(e) => setFormCategory(e.target.value)}
                                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-hidden bg-white"
                                >
                                    {CATEGORY_OPTIONS.map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                    <option value="Lainnya">Lainnya (Ketik Sendiri)</option>
                                </select>
                            </div>
                        </div>

                        {formCategory === 'Lainnya' && (
                            <div>
                                <label className="block text-xs sm:text-sm font-bold text-gray-800 uppercase tracking-wider mb-1.5">
                                    Nama Kategori Kustom
                                </label>
                                <input
                                    type="text"
                                    value={formCustomCategory}
                                    onChange={(e) => setFormCustomCategory(e.target.value)}
                                    placeholder="Ketik nama kategori baru..."
                                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-hidden"
                                />
                            </div>
                        )}

                        {/* Foto / Gambar Berita (Auto WebP) */}
                        <div className="p-4 sm:p-6 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-3.5">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-emerald-100/70 text-emerald-800 flex items-center justify-center">
                                        <ImageIcon className="w-4 h-4 text-emerald-800" />
                                    </div>
                                    <div>
                                        <label className="text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wider block">
                                            Foto Sampul Berita
                                        </label>
                                        <span className="text-[11px] text-gray-500">Auto WebP &amp; Kompres MB</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1.5 bg-slate-200/60 p-1 rounded-xl self-start sm:self-auto">
                                    <button
                                        type="button"
                                        onClick={() => setImageInputMode('upload')}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[36px] ${imageInputMode === 'upload'
                                            ? 'bg-white text-emerald-900 shadow-2xs'
                                            : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                    >
                                        Unggah Berkas
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setImageInputMode('url')}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[36px] ${imageInputMode === 'url'
                                            ? 'bg-white text-emerald-900 shadow-2xs'
                                            : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                    >
                                        Gunakan Link URL
                                    </button>
                                </div>
                            </div>

                            {imageInputMode === 'upload' ? (
                                <div className="space-y-3">
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileSelect}
                                        className="hidden"
                                    />

                                    {formImageUrl ? (
                                        <div className="bg-white p-3.5 sm:p-5 rounded-xl border border-slate-200 space-y-3">
                                            <div className="relative aspect-16/10 sm:aspect-21/9 w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-100">
                                                <img
                                                    src={formImageUrl}
                                                    alt="Pratinjau Foto Berita"
                                                    className="w-full h-full object-cover"
                                                />
                                                <span className="absolute top-2 left-2 bg-emerald-800 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-xs tracking-wider">
                                                    WEBP OPTIMIZED
                                                </span>
                                            </div>

                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                                                <div className="space-y-0.5">
                                                    <p className="text-xs sm:text-sm font-bold text-gray-900 flex items-center gap-1.5">
                                                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                                                        <span>Gambar Siap Ditampilkan</span>
                                                    </p>
                                                    {compressionStats && (
                                                        <div className="text-xs text-emerald-900 font-medium">
                                                            Hemat {compressionStats.savings}% ({formatBytes(compressionStats.originalSize)} → {formatBytes(compressionStats.compressedSize)})
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex items-center gap-2 w-full sm:w-auto">
                                                    <button
                                                        type="button"
                                                        onClick={() => fileInputRef.current?.click()}
                                                        disabled={isProcessingImage}
                                                        className="flex-1 sm:flex-initial px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold rounded-xl transition-colors min-h-[44px] flex items-center justify-center gap-1.5"
                                                    >
                                                        <span>Ganti Foto</span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={handleRemoveImage}
                                                        className="flex-1 sm:flex-initial px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs sm:text-sm font-bold rounded-xl transition-colors min-h-[44px] flex items-center justify-center gap-1.5"
                                                    >
                                                        <span>Hapus</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            onClick={() => !isProcessingImage && fileInputRef.current?.click()}
                                            className={`border-2 border-dashed border-emerald-300 hover:border-emerald-600 bg-white hover:bg-emerald-50/40 rounded-2xl p-6 sm:p-10 text-center cursor-pointer transition-all min-h-[140px] flex items-center justify-center ${isProcessingImage ? 'opacity-60 pointer-events-none' : ''
                                                }`}
                                        >
                                            {isProcessingImage ? (
                                                <div className="flex flex-col items-center gap-2.5">
                                                    <Loader2 className="w-7 h-7 text-emerald-700 animate-spin" />
                                                    <p className="text-sm font-bold text-emerald-950">
                                                        Mengompres &amp; Mengonversi Gambar ke WebP...
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        Menurunkan MB menjadi KB agar ringan dan tidak lag di smartphone
                                                    </p>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center gap-2.5">
                                                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-100">
                                                        <Upload className="w-6 h-6 text-emerald-700" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-900">
                                                            Ketuk di Sini untuk Memilih Foto (Galeri / Kamera)
                                                        </p>
                                                        <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
                                                            Format PNG / JPG / JPEG otomatis diubah menjadi <strong>WebP</strong> berukuran sangat hemat kuota.
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <div className="relative">
                                        <Link2 className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                        <input
                                            type="url"
                                            value={formImageUrl}
                                            onChange={(e) => setFormImageUrl(e.target.value)}
                                            placeholder="https://images.unsplash.com/... atau tautan gambar langsung"
                                            className="w-full pl-10 pr-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-700 outline-hidden bg-white"
                                        />
                                    </div>
                                    {formImageUrl && (
                                        <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
                                            <span>Tautan gambar tersimpan</span>
                                            <button
                                                type="button"
                                                onClick={() => setFormImageUrl('')}
                                                className="text-red-600 font-semibold hover:underline"
                                            >
                                                Hapus Tautan
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Ringkasan Singkat (Summary) */}
                        <div>
                            <label className="block text-xs sm:text-sm font-bold text-gray-800 uppercase tracking-wider mb-1.5">
                                Ringkasan Singkat (Summary) *
                            </label>
                            <textarea
                                rows={3}
                                required
                                value={formSummary}
                                onChange={(e) => setFormSummary(e.target.value)}
                                placeholder="Tuliskan 1-2 kalimat ringkasan untuk kartu cuplikan berita di halaman utama..."
                                className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-hidden leading-relaxed"
                            />
                        </div>

                        {/* Isi Lengkap Berita (Content) */}
                        <div>
                            <label className="block text-xs sm:text-sm font-bold text-gray-800 uppercase tracking-wider mb-1.5">
                                Narasi Lengkap Berita (Isi Artikel)
                            </label>
                            <textarea
                                rows={10}
                                value={formContent}
                                onChange={(e) => setFormContent(e.target.value)}
                                placeholder="Tuliskan narasi lengkap kegiatan, kutipan pesan kepala sekolah/asatidz, detail prestasi siswa, jadwal, panduan pendaftaran, dll..."
                                className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-hidden font-normal leading-relaxed min-h-[220px]"
                            />
                            <p className="text-xs text-gray-400 mt-1.5">
                                Jika dikosongkan, halaman baca publik akan otomatis menggunakan teks ringkasan di atas.
                            </p>
                        </div>

                        {/* Tombol Simpan & Batal (Besar & Nyaman di Jempol HP) */}
                        <div className="pt-6 border-t border-slate-200 flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
                            <button
                                type="button"
                                onClick={closeForm}
                                disabled={isSaving || isProcessingImage}
                                className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 text-base font-bold transition-colors min-h-[48px] flex items-center justify-center"
                            >
                                Batal
                            </button>
                            <Button
                                type="submit"
                                disabled={isSaving || isProcessingImage}
                                className="w-full sm:w-auto bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-base px-8 py-3.5 rounded-xl shadow-md min-h-[48px] flex items-center justify-center gap-2"
                            >
                                {isSaving ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>Menyimpan ke Database...</span>
                                    </>
                                ) : (
                                    <span>{editingArticle ? 'Simpan Perubahan Berita' : 'Terbitkan Berita Sekarang'}</span>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    // ==========================================
    // TAMPILAN 2: DAFTAR BERITA (TABEL / LIST VIEW)
    // ==========================================
    return (
        <div className="space-y-6">
            {/* Header Title & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2.5 mb-1">
                        <div className="w-9 h-9 rounded-xl bg-emerald-600/10 text-emerald-800 flex items-center justify-center">
                            <Newspaper className="w-5 h-5 text-emerald-700" />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                            Kelola Berita &amp; Informasi Sekolah
                        </h1>
                    </div>
                    <p className="text-gray-600 text-sm md:text-base">
                        Tambah, sunting gambar (auto WebP &amp; kompres MB), atau hapus kabar santri dan pengumuman SPMB.
                    </p>
                </div>

                <div className="flex items-center gap-2.5">
                    <Link
                        href="/berita"
                        target="_blank"
                        className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 hover:text-emerald-800 hover:border-emerald-300 font-semibold text-xs sm:text-sm shadow-2xs transition-colors min-h-[44px]"
                    >
                        <span>Lihat Publik</span>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                    </Link>
                    <Button
                        onClick={openAddForm}
                        className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm min-h-[44px]"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Tambah Berita Baru</span>
                    </Button>
                </div>
            </div>

            {/* Status Alert Banner */}
            {statusMessage && (
                <div
                    className={`p-4 rounded-xl flex items-center gap-3 border ${statusMessage.type === 'success'
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                        : 'bg-red-50 border-red-200 text-red-900'
                        }`}
                >
                    {statusMessage.type === 'success' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                        <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                    )}
                    <span className="text-sm font-medium">{statusMessage.text}</span>
                </div>
            )}

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="p-4 sm:p-5 border border-slate-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Artikel</p>
                            <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">{articles.length}</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                            <FileText className="w-5 h-5" />
                        </div>
                    </div>
                </Card>

                <Card className="p-4 sm:p-5 border border-slate-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Artikel Bergambar</p>
                            <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
                                {articles.filter((a) => a.image_url).length}
                            </p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                            <ImageIcon className="w-5 h-5" />
                        </div>
                    </div>
                </Card>

                <Card className="p-4 sm:p-5 border border-slate-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Optimasi Gambar</p>
                            <p className="text-base sm:text-lg font-bold text-emerald-700 mt-1 flex items-center gap-1.5">
                                <Sparkles className="w-4 h-4 text-emerald-600" />
                                <span>Auto WebP &amp; Egress Safe</span>
                            </p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5" />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Filter & Search Bar */}
            <Card className="p-4 sm:p-5 border border-slate-200 space-y-4">
                <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Cari berdasarkan judul atau isi kabar..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 text-sm sm:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-hidden"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors min-h-[36px] ${selectedCategory === 'all'
                                ? 'bg-emerald-800 text-white shadow-2xs'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            Semua ({articles.length})
                        </button>
                        {uniqueCategories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors min-h-[36px] ${selectedCategory === cat
                                    ? 'bg-emerald-800 text-white shadow-2xs'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </Card>

            {/* Articles Table / List */}
            <div className="space-y-3">
                {filteredArticles.length === 0 ? (
                    <Card className="p-8 text-center border border-dashed border-gray-300">
                        <Newspaper className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <h3 className="text-base font-bold text-gray-800 mb-1">Tidak Ada Berita Ditemukan</h3>
                        <p className="text-sm text-gray-500 max-w-md mx-auto mb-4">
                            {searchQuery || selectedCategory !== 'all'
                                ? 'Coba ubah kata kunci pencarian atau bersihkan filter kategori.'
                                : 'Belum ada berita yang tersimpan. Klik tombol di bawah untuk menulis kabar pertama.'}
                        </p>
                        <Button
                            onClick={openAddForm}
                            className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl min-h-[44px]"
                        >
                            Tambah Berita Baru
                        </Button>
                    </Card>
                ) : (
                    filteredArticles.map((art) => (
                        <Card
                            key={art.id}
                            className="p-4 sm:p-6 border border-slate-200/90 hover:border-emerald-300 transition-colors"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                <div className="flex gap-3.5 sm:gap-4 items-start flex-1 min-w-0">
                                    {/* Thumbnail jika ada gambar */}
                                    {art.image_url ? (
                                        <div className="w-20 h-20 sm:w-28 sm:h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 relative">
                                            <img
                                                src={art.image_url}
                                                alt={art.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                                                WEBP
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-slate-300 flex items-center justify-center shrink-0">
                                            <ImageIcon className="w-6 h-6" />
                                        </div>
                                    )}

                                    <div className="space-y-1.5 flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-100">
                                                {art.category}
                                            </span>
                                            <span className="text-xs text-gray-400 flex items-center gap-1">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {art.date}
                                            </span>
                                        </div>

                                        <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                                            {art.title}
                                        </h3>

                                        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                                            {art.summary}
                                        </p>
                                    </div>
                                </div>

                                {/* Action Buttons (Touch Friendly) */}
                                <div className="flex items-center gap-2 shrink-0 self-end sm:self-start">
                                    <button
                                        onClick={() => setPreviewArticle(art)}
                                        title="Pratinjau Berita"
                                        className="p-2.5 text-slate-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-xl transition-colors border border-slate-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => openEditForm(art)}
                                        title="Edit Berita"
                                        className="p-2.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-xl transition-colors border border-blue-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setDeleteTarget(art)}
                                        title="Hapus Berita"
                                        className="p-2.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-xl transition-colors border border-red-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>

            {/* Modal: Pratinjau Berita (Full Screen di HP agar lega) */}
            {previewArticle && (
                <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-0 sm:p-4 overflow-y-auto">
                    <div className="bg-white rounded-none sm:rounded-3xl max-w-2xl w-full min-h-screen sm:min-h-0 p-5 sm:p-8 shadow-2xl border border-slate-200 relative my-0 sm:my-8">
                        <button
                            onClick={() => setPreviewArticle(null)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-2 mb-3 mt-2 sm:mt-0">
                            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-100">
                                {previewArticle.category}
                            </span>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                {previewArticle.date}
                            </span>
                        </div>

                        {/* Gambar di Pratinjau */}
                        {previewArticle.image_url && (
                            <div className="relative aspect-16/10 w-full mb-4 overflow-hidden rounded-2xl bg-slate-100 border border-slate-200">
                                <img
                                    src={previewArticle.image_url}
                                    alt={previewArticle.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4 leading-snug">
                            {previewArticle.title}
                        </h2>

                        <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 mb-5">
                            <p className="text-xs sm:text-sm font-medium text-emerald-950 italic">
                                &ldquo;{previewArticle.summary}&rdquo;
                            </p>
                        </div>

                        <div className="text-gray-700 text-sm sm:text-base leading-relaxed space-y-3 whitespace-pre-line mb-6">
                            {previewArticle.content || previewArticle.summary}
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-xs text-emerald-800 font-bold">
                                SMP Terpadu Al-Ittihadiyah
                            </span>
                            <button
                                onClick={() => setPreviewArticle(null)}
                                className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs sm:text-sm font-bold min-h-[44px]"
                            >
                                Tutup Pratinjau
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal: Konfirmasi Hapus */}
            {deleteTarget && (
                <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
                        <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
                            <Trash2 className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
                            Hapus Berita Ini?
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 text-center mb-5 leading-relaxed">
                            Apakah Anda yakin ingin menghapus berita <strong className="text-gray-900">&ldquo;{deleteTarget.title}&rdquo;</strong>? Tindakan ini tidak dapat dibatalkan.
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <button
                                onClick={() => setDeleteTarget(null)}
                                disabled={isSaving}
                                className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs sm:text-sm font-semibold transition-colors min-h-[44px]"
                            >
                                Batal
                            </button>
                            <Button
                                onClick={confirmDelete}
                                disabled={isSaving}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-sm min-h-[44px]"
                            >
                                {isSaving ? 'Menghapus...' : 'Ya, Hapus'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
