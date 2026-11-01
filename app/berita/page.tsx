import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import { getArticles } from '@/lib/content'
import BeritaGrid from '@/components/berita/BeritaGrid'
import type { Article } from '@/types/content.types'

export const metadata: Metadata = {
    title: 'Kabar & Berita Sekolah - SMP Terpadu Al-Ittihadiyah',
    description: 'Kabar terbaru, agenda kegiatan, pengumuman resmi, dan prestasi santri SMP Terpadu Al-Ittihadiyah Ciampea, Bogor.',
}

const DEFAULT_ARTICLES: Article[] = [
    {
        id: '1',
        title: 'Pembukaan Sistem Penerimaan Murid Baru (SPMB) Tahun Ajaran 2026/2027',
        date: '28 Oktober 2026',
        category: 'Pengumuman SPMB',
        summary: 'Pendaftaran gelombang pertama resmi dibuka secara online. Panitia menyediakan kemudahan pengisian form langsung dari smartphone serta panduan tatap muka via WhatsApp.',
        content: 'SMP Terpadu Al-Ittihadiyah secara resmi membuka pendaftaran santri baru untuk tahun ajaran 2026/2027. Program ini menyasar calon peserta didik lulusan SD/MI yang berkeinginan menempuh pendidikan menengah pertama yang memadukan kurikulum nasional dan nilai kepesantrenan. Pendaftaran dapat dilakukan sepenuhnya secara daring melalui website ini.',
    },
    {
        id: '2',
        title: 'Semarak Ujian Munaqosyah & Wisuda Tahfidz Juz 30 Santri Al-Ittihadiyah',
        date: '15 Oktober 2026',
        category: 'Kegiatan Santri',
        summary: 'Sebanyak puluhan santri telah berhasil menyelesaikan setoran hafalan Al-Qur\'an Juz 30 dengan predikat Jayyid Jiddan di hadapan dewan asatidz dan para orang tua murid.',
        content: 'Alhamdulillah, acara munaqosyah tahfidz berjalan dengan penuh khidmat. Para santri diuji langsung kelancaran dan ketepatan tajwid dalam membaca hafalan Al-Qur\'an Juz 30 oleh tim penguji asatidz. Keberhasilan ini membuktikan komitmen sekolah dalam pembiasaan Qur\'ani sejak dini.',
    },
    {
        id: '3',
        title: 'Pembiasaan Sholat Dhuha dan Literasi Kitab: Ikhtiar Memperkuat Adab Remaja',
        date: '02 Oktober 2026',
        category: 'Karakter & Pembiasaan',
        summary: 'Setiap pagi sebelum kegiatan belajar mengajar dimulai, seluruh siswa dan dewan guru bersama-sama menunaikan sholat dhuha berjamaah dan tadarus Al-Qur\'an terarah.',
        content: 'Pendidikan karakter di SMP Terpadu Al-Ittihadiyah dimulai sejak pagi hari. Pembiasaan sholat dhuha, doa bersama, dan pembacaan adab penuntut ilmu menjadi rutinitas harian yang membangun kedisiplinan serta ketenangan batin santri dalam menuntut ilmu pengetahuan umum maupun agama.',
    },
    {
        id: '4',
        title: 'Prestasi Santri dalam Ajang Lomba Pidato Bahasa Arab & Seni Islami Tingkat Kabupaten',
        date: '18 September 2026',
        category: 'Prestasi',
        summary: 'Perwakilan siswa SMP Terpadu Al-Ittihadiyah berhasil meraih apresiasi membanggakan dalam kompetisi pidato dakwah dan tilawah Al-Qur\'an antar sekolah menengah se-Bogor Barat.',
        content: 'Santri-santri berprestasi Al-Ittihadiyah kembali menunjukkan keunggulannya dalam ajang kompetisi dakwah dan bahasa Arab tingkat kabupaten. Prestasi ini diraih berkat pembinaan intensif ekstrakurikuler muhadhoroh (latihan pidato) dan bimbingan bahasa Arab harian.',
    }
]

export default async function BeritaPage() {
    const fetchedArticles = await getArticles()
    const articles = fetchedArticles && fetchedArticles.length > 0 ? fetchedArticles : DEFAULT_ARTICLES

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col pt-20 pb-10 sm:pt-24 sm:pb-16">
            <div className="container mx-auto px-4 max-w-5xl">
                {/* Back button */}
                <div className="mb-4 sm:mb-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-800 hover:text-emerald-950 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Kembali ke Beranda</span>
                    </Link>
                </div>

                {/* Hero Header */}
                <div className="bg-emerald-900 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 shadow-xl border border-emerald-700/50 mb-6 sm:mb-10 relative overflow-hidden">
                    <div className="relative z-10 max-w-2xl">
                        <p className="text-amber-300 font-bold text-[11px] sm:text-xs md:text-sm uppercase tracking-wider mb-1 sm:mb-2">
                            Pusat Informasi &amp; Publikasi
                        </p>
                        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight mb-2 sm:mb-4">
                            Kabar &amp; Berita Sekolah
                        </h1>
                        <p className="text-emerald-100 text-xs sm:text-base md:text-lg leading-relaxed">
                            Dokumentasi aktivitas, agenda kesiswaan, prestasi santri, dan pengumuman resmi SMP Terpadu Al-Ittihadiyah Ciampea, Bogor.
                        </p>
                    </div>
                </div>

                {/* Dynamic News Grid with Reading Modal */}
                <div className="mb-8 sm:mb-12">
                    <BeritaGrid initialArticles={articles} />
                </div>

                {/* Bottom Callout */}
                <div className="bg-emerald-900/10 border border-emerald-200/80 rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-center max-w-2xl mx-auto space-y-3 sm:space-y-4">
                    <h3 className="text-lg sm:text-xl font-bold text-emerald-950">
                        Tertarik Mendaftarkan Buah Hati Anda?
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                        Pendaftaran santri baru tahun ajaran 2026/2027 saat ini sedang berlangsung. Kuota kelas terbatas untuk menjaga rasio bimbingan yang optimal.
                    </p>
                    <div>
                        <Link
                            href="/daftar"
                            className="inline-flex items-center justify-center bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-colors shadow-sm gap-2"
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
