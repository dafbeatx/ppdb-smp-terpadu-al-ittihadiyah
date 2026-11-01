import Link from 'next/link'
import { getContentMap } from '@/lib/content'
import Image from 'next/image'
import ScrollReveal from '@/components/ScrollReveal'
import Counter from '@/components/Counter'
import ParallaxHeroBg from '@/components/landing/ParallaxHeroBg'
import { MessageCircle, ArrowRight, ShieldCheck, Smartphone, HeartHandshake } from 'lucide-react'

export default async function Hero() {
    const content = await getContentMap('hero')

    // Real school information from CMS
    const schoolName = content['hero.school_name'] || 'SMP Terpadu Al-Ittihadiyah'
    const tagline = content['hero.tagline']?.trim() || ''
    const year = content['hero.year']?.trim() || 'Tahun Ajaran 2026/2027'

    // Stats: only display when filled by admin in CMS
    const rawExp = content['hero.stat_experience']?.trim()
    const rawGrad = content['hero.stat_graduate']?.trim()
    const statAccreditation = content['hero.stat_accreditation']?.trim() || ''

    const statExperience = rawExp ? parseInt(rawExp, 10) : null
    const statGraduate = rawGrad ? parseInt(rawGrad, 10) : null
    const hasStats = Boolean(
        (statExperience !== null && !isNaN(statExperience)) ||
        (statGraduate !== null && !isNaN(statGraduate)) ||
        statAccreditation
    )

    const waAdminUrl = "https://wa.me/6281947674100?text=" + encodeURIComponent("Assalamu'alaikum Admin PPDB SMP Terpadu Al-Ittihadiyah, saya orang tua calon siswa ingin bertanya seputar pendaftaran.")

    return (
        <section id="hero" className="relative bg-linear-to-br from-emerald-800 via-green-800 to-emerald-950 text-white pt-20 pb-12 sm:pt-24 sm:pb-16 md:pt-32 md:pb-28 overflow-hidden">
            <ParallaxHeroBg />

            <div className="container mx-auto px-4 relative z-10">
                <ScrollReveal direction="up" distance={30}>
                    <div className="max-w-4xl mx-auto text-center">
                        
                        {/* Logo & Info Badge */}
                        <div className="flex flex-col items-center justify-center mb-4 sm:mb-6">
                            <div className="bg-white p-2.5 sm:p-3 rounded-2xl shadow-xl shadow-emerald-950/40 mb-3 sm:mb-4">
                                <Image
                                    src="/logo.webp"
                                    alt={`Logo ${schoolName}`}
                                    width={80}
                                    height={80}
                                    sizes="(max-width: 768px) 56px, 80px"
                                    className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain"
                                    priority
                                />
                            </div>

                            <div className="inline-flex items-center bg-white/10 border border-white/20 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs md:text-sm font-medium text-emerald-100 tracking-wide">
                                <span>Penerimaan Peserta Didik Baru (PPDB) • {year}</span>
                            </div>
                        </div>

                        {/* Main Compelling Heading for Parents */}
                        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold mb-3 sm:mb-5 leading-snug sm:leading-tight tracking-tight text-white">
                            Sekolah Terbaik untuk <br className="hidden sm:inline" />
                            <span className="text-amber-300">
                                Akhlak &amp; Masa Depan
                            </span> Buah Hati Anda
                        </h1>

                        {/* Subtitle from CMS (only shown when filled by admin) */}
                        {tagline && (
                            <p className="text-xs sm:text-base md:text-lg mb-6 sm:mb-8 text-emerald-100/90 font-normal max-w-xl mx-auto leading-relaxed">
                                {tagline}
                            </p>
                        )}

                        {/* Call to Actions tailored for parents */}
                        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 justify-center items-center mb-8 sm:mb-10">
                            <Link
                                href="/daftar"
                                className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center bg-amber-400 hover:bg-amber-300 text-emerald-950 shadow-xl shadow-emerald-950/30 font-bold text-sm sm:text-base md:text-lg py-3 sm:py-3.5 px-6 sm:px-8 rounded-xl gap-2 transition-colors active:scale-95"
                            >
                                <span>Daftar Siswa Baru Sekarang</span>
                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-950" />
                            </Link>

                            <a 
                                href={waAdminUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center bg-emerald-900/60 hover:bg-emerald-900/80 border border-emerald-400/40 text-white font-semibold text-sm sm:text-base py-3 sm:py-3.5 px-5 sm:px-6 rounded-xl gap-2 transition-colors active:scale-95"
                            >
                                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300" />
                                <span>Konsultasi via WhatsApp</span>
                            </a>
                        </div>

                        {/* 3 Reassuring Points for Parents */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 text-left max-w-3xl mx-auto bg-emerald-900/40 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-emerald-500/20 mb-8 sm:mb-12">
                            <div className="flex items-center gap-2 sm:gap-2.5 text-[11px] sm:text-xs md:text-sm text-emerald-100 font-medium">
                                <div className="p-1 sm:p-1.5 rounded-lg bg-emerald-800/60 text-amber-300 shrink-0">
                                    <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                </div>
                                <span>Gampang diisi lewat HP apa saja</span>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-2.5 text-[11px] sm:text-xs md:text-sm text-emerald-100 font-medium">
                                <div className="p-1 sm:p-1.5 rounded-lg bg-emerald-800/60 text-amber-300 shrink-0">
                                    <HeartHandshake className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                </div>
                                <span>Bisa dipandu Admin sampai tuntas</span>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-2.5 text-[11px] sm:text-xs md:text-sm text-emerald-100 font-medium">
                                <div className="p-1 sm:p-1.5 rounded-lg bg-emerald-800/60 text-amber-300 shrink-0">
                                    <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                </div>
                                <span>Cukup foto berkas pakai kamera HP</span>
                            </div>
                        </div>

                        {/* Proof Stats - Only displayed when admin fills in CMS */}
                        {hasStats && (
                            <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                                {statExperience !== null && (
                                    <div className="bg-emerald-900/30 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 md:p-5 border border-emerald-700/30">
                                        <div className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white mb-0.5 sm:mb-1">
                                            <Counter value={statExperience} suffix="+" />
                                        </div>
                                        <div className="text-emerald-200 text-[10px] sm:text-xs md:text-sm leading-tight font-medium">Tahun Mengabdi</div>
                                    </div>
                                )}
                                {statGraduate !== null && (
                                    <div className="bg-emerald-900/30 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 md:p-5 border border-emerald-700/30">
                                        <div className="text-xl sm:text-3xl md:text-4xl font-extrabold text-amber-300 mb-0.5 sm:mb-1">
                                            <Counter value={statGraduate} suffix="%" />
                                        </div>
                                        <div className="text-emerald-200 text-[10px] sm:text-xs md:text-sm leading-tight font-medium">Lulusan ke SMA Unggulan</div>
                                    </div>
                                )}
                                {statAccreditation && (
                                    <div className="bg-emerald-900/30 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 md:p-5 border border-emerald-700/30">
                                        <div className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white mb-0.5 sm:mb-1">
                                            {statAccreditation}
                                        </div>
                                        <div className="text-emerald-200 text-[10px] sm:text-xs md:text-sm leading-tight font-medium">Akreditasi</div>
                                    </div>
                                )}
                            </div>
                        )}

                    </div>
                </ScrollReveal>
            </div>
        </section>
    )
}