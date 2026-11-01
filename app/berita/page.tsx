import Link from 'next/link'
import { ArrowLeft, Calendar, Tag, ArrowRight, Newspaper } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Kabar & Berita Sekolah - SMP Terpadu Al-Ittihadiyah',
    description: 'Kabar terbaru, agenda kegiatan, pengumuman resmi, dan prestasi santri SMP Terpadu Al-Ittihadiyah Ciampea, Bogor.',
}

const ARTICLES = [
    {
        id: '1',
        title: 'Pembukaan Penerimaan Peserta Didik Baru (PPDB) Tahun Ajaran 2026/2027',
        date: '28 Oktober 2026',
        category: 'Pengumuman PPDB',
        summary: 'Pendaftaran gelombang pertama resmi dibuka secara online. Panitia menyediakan kemudahan pengisian form langsung dari smartphone serta panduan tatap muka via WhatsApp.',
    },
    {
        id: '2',
        title: 'Semarak Ujian Munaqosyah & Wisuda Tahfidz Juz 30 Santri Al-Ittihadiyah',
        date: '15 Oktober 2026',
        category: 'Kegiatan Santri',
        summary: 'Sebanyak puluhan santri telah berhasil menyelesaikan setoran hafalan Al-Qur\'an Juz 30 dengan predikat Jayyid Jiddan di hadapan dewan asatidz dan para orang tua murid.',
    },
    {
        id: '3',
        title: 'Pembiasaan Sholat Dhuha dan Literasi Kitab: Ikhtiar Memperkuat Adab Remaja',
        date: '02 Oktober 2026',
        category: 'Karakter & Pembiasaan',
        summary: 'Setiap pagi sebelum kegiatan belajar mengajar dimulai, seluruh siswa dan dewan guru bersama-sama menunaikan sholat dhuha berjamaah dan tadarus Al-Qur\'an terarah.',
    },
    {
        id: '4',
        title: 'Prestasi Santri dalam Ajang Lomba Pidato Bahasa Arab & Seni Islami Tingkat Kabupaten',
        date: '18 September 2026',
        category: 'Prestasi',
        summary: 'Perwakilan siswa SMP Terpadu Al-Ittihadiyah berhasil meraih apresiasi membanggakan dalam kompetisi pidato dakwah dan tilawah Al-Qur\'an antar sekolah menengah se-Bogor Barat.',
    }
]

export default function BeritaPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col pt-24 pb-16">
            <div className="container mx-auto px-4 max-w-5xl">
                {/* Back button */}
                <div className="mb-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-950 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Kembali ke Beranda</span>
                    </Link>
                </div>

                {/* Hero Header */}
                <div className="bg-emerald-900 text-white rounded-3xl p-8 md:p-12 shadow-xl border border-emerald-700/50 mb-10 relative overflow-hidden">
                    <div className="relative z-10 max-w-2xl">
                        <p className="text-amber-300 font-bold text-xs md:text-sm uppercase tracking-wider mb-2">
                            Pusat Informasi &amp; Publikasi
                        </p>
                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
                            Kabar &amp; Berita Sekolah
                        </h1>
                        <p className="text-emerald-100 text-base md:text-lg leading-relaxed">
                            Dokumentasi aktivitas, agenda kesiswaan, prestasi santri, dan pengumuman resmi SMP Terpadu Al-Ittihadiyah Ciampea, Bogor.
                        </p>
                    </div>
                </div>

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {ARTICLES.map((article) => (
                        <article
                            key={article.id}
                            className="bg-white rounded-3xl p-7 md:p-8 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-emerald-300 transition-colors"
                        >
                            <div>
                                <div className="flex items-center justify-between text-xs text-gray-500 mb-4 pb-3 border-b border-slate-100">
                                    <span className="flex items-center gap-1.5 font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                                        <Tag className="w-3.5 h-3.5 text-emerald-700" />
                                        {article.category}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                        {article.date}
                                    </span>
                                </div>

                                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 leading-snug">
                                    {article.title}
                                </h2>

                                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                                    {article.summary}
                                </p>
                            </div>

                            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-800">
                                <span>SMP Terpadu Al-Ittihadiyah</span>
                                <span className="text-slate-400 font-normal">Informasi Resmi</span>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Bottom Callout */}
                <div className="bg-emerald-900/10 border border-emerald-200/80 rounded-3xl p-8 text-center max-w-2xl mx-auto space-y-4">
                    <h3 className="text-xl font-bold text-emerald-950">
                        Tertarik Mendaftarkan Buah Hati Anda?
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                        Pendaftaran santri baru tahun ajaran 2026/2027 saat ini sedang berlangsung. Kuota kelas terbatas untuk menjaga rasio bimbingan yang optimal.
                    </p>
                    <div>
                        <Link
                            href="/daftar"
                            className="inline-flex items-center justify-center bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors shadow-sm gap-2"
                        >
                            <span>Daftar Siswa Baru Sekarang</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

