'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Save, AlertCircle, CheckCircle, RefreshCw, Image as ImageIcon, Target } from 'lucide-react'
import type { PageContent } from '@/types/content.types'

interface ContentEditorProps {
    initialContent: PageContent[]
}

// Urutan kategori disesuaikan dengan ADMIN_GUIDE.md
const categories = [
    { id: 'hero', label: 'Hero Section' },
    { id: 'profile', label: 'Profil Sekolah' },
    { id: 'visi_misi', label: 'Visi & Misi' },
    { id: 'keunggulan', label: 'Keunggulan' },
    { id: 'alur', label: 'Alur SPMB' },
    { id: 'footer', label: 'Footer' },
    { id: 'branding', label: 'Logo & Branding' },
]

export default function ContentEditor({ initialContent }: ContentEditorProps) {
    const router = useRouter()
    // Default tab dimulai dari Hero Section sesuai dokumentasi ADMIN_GUIDE.md
    const [activeTab, setActiveTab] = useState('hero')
    const [content, setContent] = useState<PageContent[]>(initialContent)
    const [isSaving, setIsSaving] = useState(false)
    const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [statusMessage, setStatusMessage] = useState('')

    // Referensi untuk melacak nilai asli guna meminimalkan egress (hanya kirim data yang berubah)
    const originalContentRef = useRef<Map<string, string>>(
        new Map(initialContent.map((item) => [item.id, item.value ?? '']))
    )

    // Deteksi item yang telah dimodifikasi (dirty items)
    const dirtyItems = content.filter(
        (item) => (item.value ?? '') !== (originalContentRef.current.get(item.id) ?? '')
    )

    const currentContent = content.filter((c) => c.category === activeTab)

    const handleChange = (id: string, newValue: string) => {
        setContent((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, value: newValue } : item
            )
        )
        setSaveStatus('idle')
    }

    const handleSave = async () => {
        // Optimasi Egress: Jika tidak ada perubahan, tidak perlu membebani network / database
        if (dirtyItems.length === 0) {
            setSaveStatus('success')
            setStatusMessage('Semua konten sudah tersimpan (tidak ada perubahan baru).')
            setTimeout(() => setSaveStatus('idle'), 3000)
            return
        }

        setIsSaving(true)
        setSaveStatus('idle')
        setStatusMessage('')

        try {
            // Hanya kirimkan item yang berubah (menghemat 95%+ bandwidth egress)
            const response = await fetch('/api/admin/content', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: dirtyItems }),
            })

            const data = await response.json()

            if (!response.ok || !data.success) {
                throw new Error(data.message || data.error || `HTTP ${response.status}: Gagal menyimpan`)
            }

            // Perbarui baseline nilai asli agar dirtyItems reset
            originalContentRef.current = new Map(
                content.map((item) => [item.id, item.value ?? ''])
            )

            setSaveStatus('success')
            setStatusMessage(`Berhasil menyimpan ${dirtyItems.length} perubahan! Data telah otomatis disinkronkan.`)

            // Auto-refresh data tanpa reload browser penuh (menjaga tab aktif & menghemat egress)
            router.refresh()

            // Hilangkan notifikasi sukses setelah 4 detik
            setTimeout(() => {
                setSaveStatus('idle')
            }, 4000)

        } catch (error: unknown) {
            setSaveStatus('error')
            setStatusMessage(error instanceof Error ? error.message : 'Terjadi kesalahan sistem')
        } finally {
            setIsSaving(false)
        }
    }

    // Logo preview khusus tab branding
    const logoUrlItem = content.find((c) => c.category === 'branding' && c.key === 'logo_url')

    return (
        <div>
            {/* Tabs Bar */}
            <div className="bg-white rounded-2xl shadow-xs border border-gray-200 mb-6 p-1.5 overflow-x-auto">
                <div className="flex gap-1.5 min-w-max">
                    {categories.map((cat) => {
                        const tabDirtyCount = content.filter(
                            (item) => item.category === cat.id && (item.value ?? '') !== (originalContentRef.current.get(item.id) ?? '')
                        ).length

                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveTab(cat.id)}
                                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all whitespace-nowrap flex items-center gap-2 ${activeTab === cat.id
                                    ? 'bg-green-600 text-white shadow-md'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                    }`}
                            >
                                <span>{cat.label}</span>
                                {tabDirtyCount > 0 && (
                                    <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded-full ${activeTab === cat.id
                                        ? 'bg-white text-green-700'
                                        : 'bg-green-100 text-green-700'
                                        }`}>
                                        {tabDirtyCount}
                                    </span>
                                )}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Preview Logo jika berada di tab Branding */}
            {activeTab === 'branding' && logoUrlItem && (
                <Card className="p-6 mb-6 bg-linear-to-br from-green-50/50 to-emerald-50/30 border border-green-200">
                    <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-green-600" />
                        Preview Logo Sekolah Saat Ini
                    </h3>
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-white rounded-xl p-2 border border-gray-200 shadow-xs flex items-center justify-center overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={logoUrlItem.value || '/logo.webp'}
                                alt="Logo Preview"
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/logo.webp'
                                }}
                            />
                        </div>
                        <div className="text-xs text-gray-600 space-y-1">
                            <p className="font-semibold text-gray-800">Logo aktif di landing page & navbar</p>
                            <p className="text-gray-500">File default tersimpan di <code className="bg-white px-1.5 py-0.5 rounded border text-green-700 font-mono">/logo.webp</code></p>
                        </div>
                    </div>
                </Card>
            )}

            {/* Panduan jika berada di tab Visi & Misi */}
            {activeTab === 'visi_misi' && (
                <Card className="p-5 mb-6 bg-linear-to-br from-emerald-50 to-green-50/40 border border-emerald-200">
                    <div className="flex items-start gap-3">
                        <div className="p-2.5 bg-emerald-100 rounded-xl text-emerald-800 shrink-0">
                            <Target className="w-5 h-5 text-emerald-700" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-gray-900 mb-1">
                                Panduan Visi &amp; Misi (AKBAR)
                            </h3>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                Konten ini memuat Visi Resmi Sekolah dan 6 Poin Misi berlandaskan pilar karakter <strong>AKBAR</strong> (Aktif, Kreatif, Bersih, Antusias, dan Religius). Perubahan pada teks akan otomatis tercermin di halaman utama secara real-time.
                            </p>
                        </div>
                    </div>
                </Card>
            )}

            {/* Form Konten */}
            <Card className="p-6 md:p-8">
                <div className="space-y-6">
                    {currentContent.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            Tidak ada konten untuk kategori ini.
                        </div>
                    )}

                    {currentContent.map((item) => {
                        const isModified = (item.value ?? '') !== (originalContentRef.current.get(item.id) ?? '')

                        return (
                            <div key={item.id} className="relative">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-semibold text-gray-800">
                                        {item.label}
                                    </label>
                                    {isModified && (
                                        <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                            Diubah
                                        </span>
                                    )}
                                </div>

                                {item.value_type === 'textarea' ? (
                                    <textarea
                                        value={item.value ?? ''}
                                        onChange={(e) => handleChange(item.id, e.target.value)}
                                        rows={4}
                                        className={`w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-green-200 focus:outline-none text-base text-gray-900 font-medium resize-y transition-colors ${isModified
                                            ? 'border-green-400 bg-green-50/20'
                                            : 'border-gray-300 focus:border-green-500'
                                            }`}
                                    />
                                ) : item.value_type === 'number' ? (
                                    <input
                                        type="number"
                                        value={item.value ?? ''}
                                        onChange={(e) => handleChange(item.id, e.target.value)}
                                        className={`w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-green-200 focus:outline-none text-base text-gray-900 font-medium transition-colors ${isModified
                                            ? 'border-green-400 bg-green-50/20'
                                            : 'border-gray-300 focus:border-green-500'
                                            }`}
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        value={item.value ?? ''}
                                        onChange={(e) => handleChange(item.id, e.target.value)}
                                        className={`w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-green-200 focus:outline-none text-base text-gray-900 font-medium transition-colors ${isModified
                                            ? 'border-green-400 bg-green-50/20'
                                            : 'border-gray-300 focus:border-green-500'
                                            }`}
                                    />
                                )}
                            </div>
                        )
                    })}
                </div>

                {/* Tombol Simpan & Status Feedback */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <Button
                            onClick={handleSave}
                            disabled={isSaving}
                            size="lg"
                            className="w-full sm:w-auto gap-2 font-bold px-8 shadow-md"
                        >
                            {isSaving ? (
                                <>
                                    <RefreshCw className="w-5 h-5 animate-spin" />
                                    Menyimpan & Menyinkronkan...
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5" />
                                    {dirtyItems.length > 0
                                        ? `Simpan ${dirtyItems.length} Perubahan`
                                        : 'Simpan Perubahan'}
                                </>
                            )}
                        </Button>

                        {dirtyItems.length > 0 && (
                            <span className="text-xs text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 font-medium">
                                Ada {dirtyItems.length} perubahan yang belum disimpan
                            </span>
                        )}
                    </div>

                    {saveStatus === 'success' && (
                        <div className="flex items-center gap-3 text-green-700 bg-green-50 border border-green-200 p-4 rounded-xl animate-in fade-in duration-300">
                            <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                            <span className="text-sm font-medium">{statusMessage}</span>
                        </div>
                    )}

                    {saveStatus === 'error' && (
                        <div className="flex flex-col gap-1 text-red-700 bg-red-50 border border-red-200 p-4 rounded-xl">
                            <div className="flex items-center gap-2 font-semibold text-sm">
                                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                                <span>Gagal Menyimpan Konten</span>
                            </div>
                            {statusMessage && (
                                <span className="text-xs text-red-600 pl-7">{statusMessage}</span>
                            )}
                        </div>
                    )}
                </div>
            </Card>

            {/* Info Box Tips */}
            <div className="mt-6 bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 md:p-5">
                <h3 className="font-semibold text-emerald-900 mb-2 text-sm flex items-center gap-2">
                    <span>💡</span> Tips Manajemen Konten
                </h3>
                <ul className="text-xs md:text-sm text-emerald-800 space-y-1">
                    <li>• Perubahan disimpan secara instan dan halaman publik langsung otomatis ter-revalidasi.</li>
                    <li>• Sistem secara pintar hanya mengirim data yang Anda ubah untuk menghemat bandwidth (egress).</li>
                    <li>• Tidak perlu melakukan reload browser penuh; data tersinkron tanpa kehilangan posisi tab Anda.</li>
                </ul>
            </div>
        </div>
    )
}
