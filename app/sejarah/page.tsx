import Link from 'next/link'
import { ArrowLeft, BookOpen, Milestone, ShieldCheck, GraduationCap } from 'lucide-react'
import type { Metadata } from 'next'
import { getContentMap } from '@/lib/content'

export const metadata: Metadata = {
    title: 'Sejarah Singkat - SMP Terpadu Al-Ittihadiyah',
    description: 'Perjalanan, sejarah pendirian, dan komitmen SMP Terpadu Al-Ittihadiyah dalam mencetak generasi Islam yang berakhlak mulia dan berprestasi di Ciampea, Bogor.',
}

export default async function SejarahPage() {
    const content = await getContentMap('sejarah')

    const title = content['sejarah.title'] || 'Sejarah & Perjalanan Kami'
    const subtitle = content['sejarah.subtitle'] || 'Membangun peradaban generasi muda melalui perpaduan ilmu pengetahuan umum, pembiasaan ibadah, dan penguatan nilai Al-Qur\'an di Ciampea, Bogor.'
    const latarBelakang1 = content['sejarah.latar_belakang_1'] || 'SMP Terpadu Al-Ittihadiyah lahir dari kepedulian mendalam para tokoh pendidikan dan masyarakat di Ciampea, Kabupaten Bogor terhadap tantangan pendidikan usia remaja. Di tengah derasnya arus globalisasi dan ancaman pergaulan bebas, dirasakan adanya kebutuhan mendesak akan lembaga pendidikan tingkat menengah pertama yang mampu menjadi benteng moral sekaligus kawah candradimuka intelektual bagi putra-putri Islam.'
    const latarBelakang2 = content['sejarah.latar_belakang_2'] || 'Dengan mengusung konsep Sekolah Menengah Pertama Terpadu, yayasan berikhtiar memadukan keunggulan Kurikulum Nasional (Kemendikbudristek) dengan kurikulum kepesantrenan yang menitikberatkan pada pembinaan akhlak mulia, tahfidz Al-Qur\'an, dan pembiasaan ibadah harian.'
    
    const tonggak1Tahun = content['sejarah.tonggak_1_tahun'] || 'Tahun 2018'
    const tonggak1Desc = content['sejarah.tonggak_1_desc'] || 'Peletakan batu pertama dan perintisan gedung pembelajaran di Ciampea Udik, dimulai dengan rombongan belajar perdana santri mukim dan non-mukim.'
    
    const tonggak2Tahun = content['sejarah.tonggak_2_tahun'] || 'Tahun 2021'
    const tonggak2Desc = content['sejarah.tonggak_2_desc'] || 'Raihan akreditasi resmi dari Badan Akreditasi Nasional (BAN-S/M) serta perluasan sarana laboratorium komputer dan masjid sekolah.'
    
    const tonggak3Tahun = content['sejarah.tonggak_3_tahun'] || 'Tahun 2024 - Sekarang'
    const tonggak3Desc = content['sejarah.tonggak_3_desc'] || 'Penerapan Kurikulum Merdeka Terpadu berbasis digital, penguatan program tahfidz mandiri, dan integrasi pendaftaran santri baru online.'
    
    const komitmen = content['sejarah.komitmen'] || 'SMP Terpadu Al-Ittihadiyah terus berikhtiar melayani para orang tua dengan sepenuh hati. Kami mendidik setiap santri selayaknya anak kandung sendiri, dengan keteladanan, kesabaran, serta kedisiplinan yang berimbang demi mengantarkan mereka menjadi pribadi yang bermanfaat bagi agama, bangsa, dan keluarga.'

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col pt-20 pb-10 sm:pt-24 sm:pb-16">
            <div className="container mx-auto px-4 max-w-4xl">
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
                            Mengenal Lebih Dekat
                        </p>
                        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight mb-2 sm:mb-4">
                            {title}
                        </h1>
                        <p className="text-emerald-100 text-xs sm:text-base md:text-lg leading-relaxed">
                            {subtitle}
                        </p>
                    </div>
                </div>

                {/* Content Article */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 shadow-xs border border-slate-200/80 space-y-6 sm:space-y-10 leading-relaxed text-gray-700">
                    {/* Section 1 */}
                    <section className="space-y-3 sm:space-y-4">
                        <div className="flex items-center gap-2.5 sm:gap-3 text-emerald-800 border-b border-slate-100 pb-2.5 sm:pb-3">
                            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-700" />
                            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">Latar Belakang Pendirian</h2>
                        </div>
                        <p className="text-xs sm:text-base md:text-lg leading-relaxed">
                            {latarBelakang1}
                        </p>
                        {latarBelakang2 && (
                            <p className="text-xs sm:text-base md:text-lg leading-relaxed">
                                {latarBelakang2}
                            </p>
                        )}
                    </section>

                    {/* Section 2: Tonggak Perkembangan */}
                    <section className="space-y-4 sm:space-y-6">
                        <div className="flex items-center gap-2.5 sm:gap-3 text-emerald-800 border-b border-slate-100 pb-2.5 sm:pb-3">
                            <Milestone className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-700" />
                            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">Tonggak Perkembangan Lembaga</h2>
                        </div>

                        <div className="space-y-4 sm:space-y-6">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 font-black flex items-center justify-center shrink-0 text-xs sm:text-sm">
                                    01
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-sm sm:text-lg mb-0.5 sm:mb-1">{tonggak1Tahun}</h3>
                                    <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                                        {tonggak1Desc}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 sm:gap-4">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 font-black flex items-center justify-center shrink-0 text-xs sm:text-sm">
                                    02
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-sm sm:text-lg mb-0.5 sm:mb-1">{tonggak2Tahun}</h3>
                                    <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                                        {tonggak2Desc}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 sm:gap-4">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 font-black flex items-center justify-center shrink-0 text-xs sm:text-sm">
                                    03
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-sm sm:text-lg mb-0.5 sm:mb-1">{tonggak3Tahun}</h3>
                                    <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                                        {tonggak3Desc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Nilai Pokok */}
                    <section className="bg-emerald-50/60 border border-emerald-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 space-y-3 sm:space-y-4">
                        <div className="flex items-center gap-2 sm:gap-2.5 text-emerald-900 font-bold text-base sm:text-lg">
                            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700" />
                            <span>Komitmen Kami untuk Masa Depan Siswa</span>
                        </div>
                        <p className="text-xs sm:text-sm md:text-base text-emerald-950 leading-relaxed">
                            {komitmen}
                        </p>
                    </section>

                    {/* Action Footer */}
                    <div className="pt-4 sm:pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                            <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700" />
                            <span>SMP Terpadu Al-Ittihadiyah Ciampea, Bogor</span>
                        </div>
                        <Link
                            href="/daftar"
                            className="w-full sm:w-auto inline-flex items-center justify-center bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-colors shadow-sm"
                        >
                            Daftar Siswa Baru (SPMB)
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
