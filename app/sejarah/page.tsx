import Link from 'next/link'
import { ArrowLeft, BookOpen, Milestone, ShieldCheck, Heart, GraduationCap } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Sejarah Singkat - SMP Terpadu Al-Ittihadiyah',
    description: 'Perjalanan, sejarah pendirian, dan komitmen SMP Terpadu Al-Ittihadiyah dalam mencetak generasi Islam yang berakhlak mulia dan berprestasi di Ciampea, Bogor.',
}

export default function SejarahPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col pt-24 pb-16">
            <div className="container mx-auto px-4 max-w-4xl">
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
                            Mengenal Lebih Dekat
                        </p>
                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
                            Sejarah &amp; Perjalanan Kami
                        </h1>
                        <p className="text-emerald-100 text-base md:text-lg leading-relaxed">
                            Membangun peradaban generasi muda melalui perpaduan ilmu pengetahuan umum, pembiasaan ibadah, dan penguatan nilai Al-Qur&apos;an di Ciampea, Bogor.
                        </p>
                    </div>
                </div>

                {/* Content Article */}
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xs border border-slate-200/80 space-y-10 leading-relaxed text-gray-700">
                    {/* Section 1 */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 text-emerald-800 border-b border-slate-100 pb-3">
                            <BookOpen className="w-6 h-6 text-emerald-700" />
                            <h2 className="text-2xl font-bold text-gray-900">Latar Belakang Pendirian</h2>
                        </div>
                        <p className="text-base md:text-lg leading-relaxed">
                            SMP Terpadu Al-Ittihadiyah lahir dari kepedulian mendalam para tokoh pendidikan dan masyarakat di Ciampea, Kabupaten Bogor terhadap tantangan pendidikan usia remaja. Di tengah derasnya arus globalisasi dan ancaman pergaulan bebas, dirasakan adanya kebutuhan mendesak akan lembaga pendidikan tingkat menengah pertama yang mampu menjadi benteng moral sekaligus kawah candradimuka intelektual bagi putra-putri Islam.
                        </p>
                        <p className="text-base md:text-lg leading-relaxed">
                            Dengan mengusung konsep <strong>Sekolah Menengah Pertama Terpadu</strong>, yayasan berikhtiar memadukan keunggulan Kurikulum Nasional (Kemendikbudristek) dengan kurikulum kepesantrenan yang menitikberatkan pada pembinaan akhlak mulia, tahfidz Al-Qur&apos;an, dan pembiasaan ibadah harian.
                        </p>
                    </section>

                    {/* Section 2: Tonggak Perkembangan */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-3 text-emerald-800 border-b border-slate-100 pb-3">
                            <Milestone className="w-6 h-6 text-emerald-700" />
                            <h2 className="text-2xl font-bold text-gray-900">Tonggak Perkembangan Lembaga</h2>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 font-black flex items-center justify-center shrink-0 text-sm">
                                    01
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg mb-1">Peletakan Pondasi &amp; Izin Operasional</h3>
                                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                                        Dimulai dengan penyediaan sarana ruang belajar yang asri dan aman di Kp. Pasar Salasa, Ciampea Udik, serta legalitas formal perizinan dinas pendidikan setempat.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 font-black flex items-center justify-center shrink-0 text-sm">
                                    02
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg mb-1">Penguatan Program Tahfidz &amp; Karakter</h3>
                                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                                        Menghadirkan ustadz dan ustadzah berkompeten untuk membimbing hafalan Al-Qur&apos;an juz amma, tahsin tartil, dan sholat berjamaah rutin bagi seluruh santri.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 font-black flex items-center justify-center shrink-0 text-sm">
                                    03
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg mb-1">Penerapan Budaya AKBAR (2024 - Sekarang)</h3>
                                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                                        Merumuskan visi institusi yang <strong>Aktif, Kreatif, Bersih, Antusias, dan Religius (AKBAR)</strong> sebagai pedoman seluruh aktivitas belajar, kesiswaan, dan tata kelola sekolah.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Nilai Pokok */}
                    <section className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-6 md:p-8 space-y-4">
                        <div className="flex items-center gap-2.5 text-emerald-900 font-bold text-lg">
                            <ShieldCheck className="w-5 h-5 text-emerald-700" />
                            <span>Komitmen Kami untuk Masa Depan Siswa</span>
                        </div>
                        <p className="text-sm md:text-base text-emerald-950 leading-relaxed">
                            SMP Terpadu Al-Ittihadiyah terus berikhtiar melayani para orang tua dengan sepenuh hati. Kami mendidik setiap santri selayaknya anak kandung sendiri, dengan keteladanan, kesabaran, serta kedisiplinan yang berimbang demi mengantarkan mereka menjadi pribadi yang bermanfaat bagi agama, bangsa, dan keluarga.
                        </p>
                    </section>

                    {/* Action Footer */}
                    <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <GraduationCap className="w-5 h-5 text-emerald-700" />
                            <span>SMP Terpadu Al-Ittihadiyah Ciampea, Bogor</span>
                        </div>
                        <Link
                            href="/daftar"
                            className="w-full sm:w-auto inline-flex items-center justify-center bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors shadow-sm"
                        >
                            Daftar Siswa Baru (PPDB)
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

