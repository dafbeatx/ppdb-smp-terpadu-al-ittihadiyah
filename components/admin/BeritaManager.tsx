'use client'

import { useState } from 'react'
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
    FileText
} from 'lucide-react'
import type { Article } from '@/types/content.types'

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

    // Modal state
    const [isFormOpen, setIsFormOpen] = useState(false)
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

    const openAddModal = () => {
        setEditingArticle(null)
        setFormTitle('')
        setFormDate(getTodayFormatted())
        setFormCategory(CATEGORY_OPTIONS[0])
        setFormCustomCategory('')
        setFormSummary('')
        setFormContent('')
        setIsFormOpen(true)
    }

    const openEditModal = (article: Article) => {
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
        setIsFormOpen(true)
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
            }
            // Put new article on top
            updated = [newArticle, ...articles]
        }

        const success = await handleSaveList(updated)
        if (success) {
            setIsFormOpen(false)
            setEditingArticle(null)
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
                        Tambah, sunting, atau hapus artikel kegiatan, pengumuman SPMB, dan kabar prestasi santri.
                    </p>
                </div>

                <div className="flex items-center gap-2.5">
                    <Link
                        href="/berita"
                        target="_blank"
                        className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 hover:text-emerald-800 hover:border-emerald-300 font-semibold text-xs sm:text-sm shadow-2xs transition-colors"
                    >
                        <span>Lihat Publik</span>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                    </Link>
                    <Button
                        onClick={openAddModal}
                        className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm"
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
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Kategori Aktif</p>
                            <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">{uniqueCategories.length}</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                            <Tag className="w-5 h-5" />
                        </div>
                    </div>
                </Card>

                <Card className="p-4 sm:p-5 border border-slate-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Status Sinkronisasi</p>
                            <p className="text-base sm:text-lg font-bold text-emerald-700 mt-1 flex items-center gap-1.5">
                                <Sparkles className="w-4 h-4 text-emerald-600" />
                                <span>Terkoneksi Database</span>
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
                            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-hidden"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${selectedCategory === 'all'
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
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${selectedCategory === cat
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
                            onClick={openAddModal}
                            className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl"
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
                                <div className="space-y-2 flex-1">
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

                                {/* Action Buttons */}
                                <div className="flex items-center gap-2 shrink-0 self-end sm:self-start">
                                    <button
                                        onClick={() => setPreviewArticle(art)}
                                        title="Pratinjau Berita"
                                        className="p-2 text-slate-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors border border-slate-200"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => openEditModal(art)}
                                        title="Edit Berita"
                                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setDeleteTarget(art)}
                                        title="Hapus Berita"
                                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>

            {/* Modal: Tambah / Edit Berita */}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full p-5 sm:p-8 shadow-2xl border border-slate-200 relative my-8">
                        <button
                            onClick={() => setIsFormOpen(false)}
                            className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-1 rounded-lg"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-slate-100">
                            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                                <Newspaper className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                                    {editingArticle ? 'Sunting Berita' : 'Tambah Berita Baru'}
                                </h2>
                                <p className="text-xs text-gray-500">
                                    Konten akan langsung tersinkron ke halaman publik /berita
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                                    Judul Berita *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formTitle}
                                    onChange={(e) => setFormTitle(e.target.value)}
                                    placeholder="Contoh: Semarak Ujian Munaqosyah & Wisuda Tahfidz Santri"
                                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-hidden"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                                        Tanggal Publikasi
                                    </label>
                                    <input
                                        type="text"
                                        value={formDate}
                                        onChange={(e) => setFormDate(e.target.value)}
                                        placeholder="Contoh: 01 November 2026"
                                        className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-hidden"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                                        Kategori
                                    </label>
                                    <select
                                        value={formCategory}
                                        onChange={(e) => setFormCategory(e.target.value)}
                                        className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-hidden bg-white"
                                    >
                                        {CATEGORY_OPTIONS.map((opt) => (
                                            <option key={opt} value={opt}>
                                                {opt}
                                            </option>
                                        ))}
                                        <option value="Lainnya">Lainnya (Tulis Sendiri)</option>
                                    </select>
                                </div>
                            </div>

                            {formCategory === 'Lainnya' && (
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                                        Nama Kategori Baru
                                    </label>
                                    <input
                                        type="text"
                                        value={formCustomCategory}
                                        onChange={(e) => setFormCustomCategory(e.target.value)}
                                        placeholder="Ketik kategori khusus..."
                                        className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-hidden"
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                                    Ringkasan Singkat (Summary) *
                                </label>
                                <textarea
                                    rows={2}
                                    required
                                    value={formSummary}
                                    onChange={(e) => setFormSummary(e.target.value)}
                                    placeholder="Teks ringkas 1-2 kalimat untuk kartu berita di halaman utama..."
                                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-hidden"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                                    Isi Lengkap Berita (Opsional / Lengkap)
                                </label>
                                <textarea
                                    rows={6}
                                    value={formContent}
                                    onChange={(e) => setFormContent(e.target.value)}
                                    placeholder="Tuliskan narasi lengkap kegiatan, kutipan pimpinan, penjelasan detail acara..."
                                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-hidden font-normal"
                                />
                                <p className="text-[11px] text-gray-400 mt-1">
                                    Jika dikosongkan, isi lengkap akan otomatis menggunakan teks ringkasan di atas.
                                </p>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setIsFormOpen(false)}
                                    className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs sm:text-sm font-semibold transition-colors"
                                >
                                    Batal
                                </button>
                                <Button
                                    type="submit"
                                    disabled={isSaving}
                                    className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-sm"
                                >
                                    {isSaving ? 'Menyimpan...' : editingArticle ? 'Simpan Perubahan' : 'Terbitkan Berita'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal: Pratinjau Berita */}
            {previewArticle && (
                <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full p-5 sm:p-8 shadow-2xl border border-slate-200 relative my-8">
                        <button
                            onClick={() => setPreviewArticle(null)}
                            className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-1 rounded-lg"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-100">
                                {previewArticle.category}
                            </span>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                {previewArticle.date}
                            </span>
                        </div>

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
                                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold"
                            >
                                Tutup
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
                                className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs sm:text-sm font-semibold transition-colors"
                            >
                                Batal
                            </button>
                            <Button
                                onClick={confirmDelete}
                                disabled={isSaving}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-sm"
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

