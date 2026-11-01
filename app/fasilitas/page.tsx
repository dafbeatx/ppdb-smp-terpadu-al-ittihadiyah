import Link from 'next/link'
import { ArrowLeft, Building2, BookOpen, Monitor, Trophy, ShieldCheck, Heart, Sparkles, CheckCircle } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Fasilitas & Sarana Kampus - SMP Terpadu Al-Ittihadiyah',
    description: 'Sarana dan prasarana lengkap yang mendukung kenyamanan belajar, ibadah, dan pembinaan karakter di SMP Terpadu Al-Ittihadiyah Ciampea, Bogor.',
}

const FACILITIES = [
    {
        title: "Masjid & Musholla Sekolah",
        desc: "Pusat pembiasaan ibadah sholat lima waktu berjamaah, sholat dhuha rutin, tadarus pagi, dan halaqah bimbingan tahfidz Al-Qur'an dalam suasana khusyuk.",
        tag: "Spiritual & Ibadah"
    },
    {
        title: "Ruang Kelas Bersih & Representatif",
        desc: "Ruang belajar terang, bersih, dan berorientasi pada kenyamanan interaksi guru dan santri demi tercapainya fokus belajar maksimal.",
        tag: "Akademik"
    },
    {
        title: "Laboratorium Komputer",
        desc: "Fasilitas perangkat komputer terkini untuk mengenalkan literasi digital, Asesmen Nasional Berbasis Komputer (ANBK), dan keahlian komputasi dasar.",
        tag: "Teknologi"
    },
    {
        title: "Perpustakaan & Ruang Baca",
        desc: "Koleksi buku pelajaran nasional, kitab-kitab penunjang keislaman, ensiklopedia sains, dan literatur motivasi pembangun karakter remaja.",
        tag: "Literasi"
    },
    {
        title: "Lapangan Olahraga Serbaguna",
        desc: "Area terbuka yang luas untuk upacara bendera, senam santri, latihan futsal, bola voli, bulutangkis, dan kegiatan ekstrakurikuler kepramukaan.",
        tag: "Kebugaran & Kesiswaan"
    },
    {
        title: "Lingkungan Asri & Aman",
        desc: "Suasana kampus yang jauh dari kebisingan jalan raya utama, dilengkapi tata tertib pengawasan pergaulan ramah anak yang bebas bullying.",
        tag: "Kenyamanan"
    }
]

export default function FasilitasPage() {
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
                            Sarana &amp; Prasarana
                        </p>
                        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight mb-2 sm:mb-4">
                            Fasilitas Kampus Al-Ittihadiyah
                        </h1>
                        <p className="text-emerald-100 text-xs sm:text-base md:text-lg leading-relaxed">
                            Mendukung kenyamanan, keselamatan, dan efektivitas proses belajar mengajar serta pembinaan akhlak santri setiap hari.
                        </p>
                    </div>
                </div>

                {/* Facilities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
                    {FACILITIES.map((f, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-emerald-300 transition-colors"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-3 sm:mb-4">
                                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100">
                                        {f.tag}
                                    </span>
                                    <span className="text-emerald-700 font-bold text-xs sm:text-sm">✓ Terawat</span>
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2 leading-snug">
                                    {f.title}
                                </h3>
                                <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">
                                    {f.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Reassurance Card */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
                    <div className="space-y-1.5 sm:space-y-2 text-center md:text-left">
                        <h4 className="text-lg sm:text-xl font-bold text-gray-900">
                            Ingin Berkunjung &amp; Melihat Langsung?
                        </h4>
                        <p className="text-gray-600 text-xs sm:text-sm md:text-base max-w-xl">
                            Bapak dan Ibu dipersilakan datang bersilaturahmi ke sekolah kami di Ciampea Udik, Bogor pada jam kerja operasional.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 w-full md:w-auto shrink-0">
                        <a
                            href="https://share.google/4gGhSkEPrRiBHSBB5"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl transition-colors text-center"
                        >
                            Buka Petunjuk Arah (Peta)
                        </a>
                        <Link
                            href="/daftar"
                            className="inline-flex items-center justify-center bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-colors text-center shadow-sm"
                        >
                            Daftar Siswa Baru
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

