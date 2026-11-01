import Link from 'next/link'
import { getContentMap } from '@/lib/content'
import Image from 'next/image'
import ScrollReveal from '@/components/ScrollReveal'
import Counter from '@/components/Counter'
import ParallaxHeroBg from '@/components/landing/ParallaxHeroBg'
import { MessageCircle, ArrowRight, ShieldCheck, Smartphone, HeartHandshake } from 'lucide-react'

export default async function Hero() {
    const content = await getContentMap('hero')

    // Basic fallbacks for CMS content
    const schoolName = content['hero.school_name'] || 'SMP Terpadu Al-Ittihadiyah'
    const tagline = content['hero.tagline'] || 'Membimbing Putra-Putri Anda Menjadi Generasi Sholeh, Berakhlak Mulia, dan Berprestasi'
    const year = content['hero.year'] || 'Tahun Ajaran 2026/2027'

    // Stats fallbacks
    const statExperience = parseInt(content['hero.stat_experience'], 10) || 15
    const statGraduate = parseInt(content['hero.stat_graduate'], 10) || 98
    const statAccreditation = content['hero.stat_accreditation'] || 'A'

    const waAdminUrl = "https://wa.me/6281947674100?text=" + encodeURIComponent("Assalamu'alaikum Admin PPDB SMP Terpadu Al-Ittihadiyah, saya orang tua calon siswa ingin bertanya seputar pendaftaran.")

    return (
        <section id="hero" className="relative bg-linear-to-br from-emerald-800 via-green-800 to-emerald-950 text-white pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
            <ParallaxHeroBg />

            <div className="container mx-auto px-4 relative z-10">
                <ScrollReveal direction="up" distance={30}>
                    <div className="max-w-4xl mx-auto text-center">
                        
                        {/* Logo & Info Badge */}
                        <div className="flex flex-col items-center justify-center mb-6">
                            <div className="bg-white p-3 rounded-2xl shadow-xl shadow-emerald-950/40 mb-4">
                                <Image
                                    src="/logo.webp"
                                    alt={`Logo ${schoolName}`}
                                    width={80}
                                    height={80}
                                    sizes="(max-width: 768px) 64px, 80px"
                                    className="w-16 h-16 md:w-20 md:h-20 object-contain"
                                    priority
                                />
                            </div>

                            <div className="inline-flex items-center bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-xs md:text-sm font-medium text-emerald-100 tracking-wide">
                                <span>Penerimaan Peserta Didik Baru (PPDB) • {year}</span>
                            </div>
                        </div>

                        {/* Main Compelling Heading for Parents */}
                        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-5 leading-tight tracking-tight text-white">
                            Sekolah Terbaik untuk <br className="hidden sm:inline" />
                            <span className="text-amber-300">
                                Akhlak &amp; Masa Depan
                            </span> Buah Hati Anda
                        </h1>

                        {/* Reassuring Subtitle */}
                        <p className="text-base sm:text-lg md:text-xl mb-8 text-emerald-100/90 font-normal max-w-2xl mx-auto leading-relaxed">
                            {tagline}. Lingkungan Islami yang aman, bimbingan tahfidz Al-Qur&apos;an, dan asuhan guru yang sabar serta penuh kasih sayang.
                        </p>

                        {/* Call to Actions tailored for parents */}
                        <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 justify-center items-center mb-10">
                            <Link
                                href="/daftar"
                                className="w-full sm:w-auto min-w-65 inline-flex items-center justify-center bg-amber-400 hover:bg-amber-300 text-emerald-950 shadow-xl shadow-emerald-950/30 font-bold text-base md:text-lg py-4 px-8 rounded-xl gap-2 transition-colors active:scale-95"
                            >
                                <span>Daftar Siswa Baru Sekarang</span>
                                <ArrowRight className="w-5 h-5 text-emerald-950" />
                            </Link>

                            <a 
                                href={waAdminUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto min-w-60 inline-flex items-center justify-center bg-emerald-900/60 hover:bg-emerald-900/80 border border-emerald-400/40 text-white font-semibold text-base py-4 px-6 rounded-xl gap-2 transition-colors active:scale-95"
                            >
                                <MessageCircle className="w-5 h-5 text-emerald-300" />
                                <span>Konsultasi via WhatsApp</span>
                            </a>
                        </div>

                        {/* 3 Reassuring Points for Parents */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left max-w-3xl mx-auto bg-emerald-900/40 p-4 rounded-2xl border border-emerald-500/20 mb-12">
                            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-emerald-100 font-medium">
                                <div className="p-1.5 rounded-lg bg-emerald-800/60 text-amber-300 shrink-0">
                                    <Smartphone className="w-4 h-4" />
                                </div>
                                <span>Gampang diisi lewat HP apa saja</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-emerald-100 font-medium">
                                <div className="p-1.5 rounded-lg bg-emerald-800/60 text-amber-300 shrink-0">
                                    <HeartHandshake className="w-4 h-4" />
                                </div>
                                <span>Bisa dipandu Admin sampai tuntas</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-emerald-100 font-medium">
                                <div className="p-1.5 rounded-lg bg-emerald-800/60 text-amber-300 shrink-0">
                                    <ShieldCheck className="w-4 h-4" />
                                </div>
                                <span>Cukup foto berkas pakai kamera HP</span>
                            </div>
                        </div>

                        {/* Proof Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                            <div className="bg-emerald-900/30 rounded-2xl p-5 border border-emerald-700/30">
                                <div className="text-3xl md:text-4xl font-extrabold text-white mb-1">
                                    <Counter value={statExperience} suffix="+" />
                                </div>
                                <div className="text-emerald-200 text-xs sm:text-sm font-medium">Tahun Mengabdi &amp; Berpengalaman</div>
                            </div>
                            <div className="bg-emerald-900/30 rounded-2xl p-5 border border-emerald-700/30">
                                <div className="text-3xl md:text-4xl font-extrabold text-amber-300 mb-1">
                                    <Counter value={statGraduate} suffix="%" />
                                </div>
                                <div className="text-emerald-200 text-xs sm:text-sm font-medium">Lulusan Diterima di SMA/SMK Unggulan</div>
                            </div>
                            <div className="bg-emerald-900/30 rounded-2xl p-5 border border-emerald-700/30">
                                <div className="text-3xl md:text-4xl font-extrabold text-white mb-1">
                                    {statAccreditation}
                                </div>
                                <div className="text-emerald-200 text-xs sm:text-sm font-medium">Akreditasi Unggul &amp; Terpercaya</div>
                            </div>
                        </div>

                    </div>
                </ScrollReveal>
            </div>
        </section>
    )
}