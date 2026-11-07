import Link from 'next/link'
import Image from 'next/image'
import { getContentMap } from '@/lib/content'
import ScrollReveal from '@/components/ScrollReveal'
import Counter from '@/components/Counter'
import ParallaxHeroBg from '@/components/landing/ParallaxHeroBg'
import { 
    MapPin, 
    CheckCircle2, 
    GraduationCap, 
    ClipboardCheck, 
    MessageCircle, 
    ArrowRight 
} from 'lucide-react'

export default async function Hero() {
    const content = await getContentMap('hero')

    // Real school information from CMS or official defaults
    const schoolName = content['hero.school_name']?.trim() || 'SMP Terpadu Al-Ittihadiyah'
    const tagline = content['hero.tagline']?.trim()
    const year = content['hero.year']?.trim() || 'Tahun Ajaran 2026/2027'

    // Stats: only display when filled by admin in CMS
    const rawExp = content['hero.stat_experience']?.trim()
    const rawGrad = content['hero.stat_graduate']?.trim()
    const statAccreditation = content['hero.stat_accreditation']?.trim() || 'Terakreditasi B'

    const statExperience = rawExp ? parseInt(rawExp, 10) : null
    const statGraduate = rawGrad ? parseInt(rawGrad, 10) : null

    // Deteksi cerdas: jika angka >= 1900 berarti tahun berdirinya sekolah (misal 2013),
    // jika angka kecil (< 100) berarti jumlah tahun pengalaman/mengabdi (misal 13+).
    const isCalendarYear = statExperience !== null && !isNaN(statExperience) && statExperience >= 1900
    const experienceLabel = isCalendarYear ? 'Berdiri Sejak' : 'Th Mengabdi'
    const experienceSuffix = isCalendarYear ? '' : '+'

    const hasStats = Boolean(
        (statExperience !== null && !isNaN(statExperience)) ||
        (statGraduate !== null && !isNaN(statGraduate)) ||
        statAccreditation
    )

    const waAdminUrl = "https://wa.me/6281947674100?text=" + encodeURIComponent("Assalamu'alaikum Admin SPMB SMP Terpadu Al-Ittihadiyah, saya orang tua calon siswa ingin bertanya seputar pendaftaran.")

    return (
        <section 
            id="hero" 
            className="relative min-h-[580px] sm:min-h-[640px] md:min-h-[720px] flex flex-col justify-between pt-24 sm:pt-28 md:pt-36 text-white overflow-visible"
        >
            {/* Full-width grayscale photograph of school building & dark overlay */}
            <div className="absolute inset-0 -z-10 overflow-hidden bg-slate-950">
                <Image
                    src="/hero-bg.webp"
                    alt={`Gedung ${schoolName}`}
                    fill
                    priority
                    fetchPriority="high"
                    sizes="100vw"
                    className="object-cover filter grayscale contrast-115 brightness-90 scale-[1.02]"
                />
                <div className="absolute inset-0 bg-slate-950/75 bg-linear-to-b from-slate-950/85 via-slate-950/70 to-slate-950/90" />
                <ParallaxHeroBg />
            </div>

            {/* Main Content Area (Left-aligned typography) */}
            <div className="container mx-auto px-4 sm:px-6 relative z-10 flex-1 flex flex-col justify-center py-8 sm:py-12 md:py-16">
                <ScrollReveal direction="up" distance={25}>
                    <div className="max-w-4xl text-left space-y-4 sm:space-y-6">
                        
                        {/* Institutional Badge */}
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm font-semibold tracking-wide">
                            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span>{schoolName} • Ciampea, Kab. Bogor</span>
                            {statAccreditation && (
                                <>
                                    <span className="text-emerald-400">•</span>
                                    <span className="text-amber-300 font-bold">{statAccreditation}</span>
                                </>
                            )}
                        </div>

                        {/* Bold 2-Line Headline */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
                            Sistem Penerimaan Murid Baru
                            <span className="block text-emerald-300 font-extrabold mt-1 sm:mt-2">
                                {year}
                            </span>
                        </h1>

                        {/* 2-Line Sub-headline */}
                        <p className="text-base sm:text-lg md:text-xl text-slate-200 font-normal leading-relaxed max-w-2xl pt-1">
                            {tagline ? tagline : "Membina Generasi Qur'ani yang Berkarakter, Unggul dalam Akademik, dan Berakhlak Mulia melalui kurikulum terpadu dan kepesantrenan."}
                        </p>

                        {/* Quick Credibility Badges */}
                        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2 text-xs sm:text-sm">
                            {hasStats && (
                                <>
                                    {statExperience !== null && !isNaN(statExperience) && (
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/45 backdrop-blur-xs border border-white/15 text-slate-200">
                                            <span className="font-bold text-white"><Counter value={statExperience} suffix={experienceSuffix} /></span>
                                            <span className="text-slate-300">{experienceLabel}</span>
                                        </div>
                                    )}
                                    {statGraduate !== null && !isNaN(statGraduate) && (
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/45 backdrop-blur-xs border border-white/15 text-slate-200">
                                            <span className="font-bold text-amber-300"><Counter value={statGraduate} suffix="%" /></span>
                                            <span className="text-slate-300">Lanjut SMA</span>
                                        </div>
                                    )}
                                </>
                            )}
                            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 font-semibold">
                                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                                <span>Pendaftaran Gelombang I Dibuka</span>
                            </div>
                        </div>

                    </div>
                </ScrollReveal>
            </div>

            {/* 3 Floating / Overlapping Action Cards (Bottom of Hero) */}
            <div className="container mx-auto px-4 sm:px-6 relative z-20 -mb-12 sm:-mb-16 md:-mb-20">
                <ScrollReveal direction="up" distance={20} delay={0.1}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 md:gap-6 max-w-6xl mx-auto">
                        {/* Card 1: Pendaftaran Siswa Baru */}
                        <Link
                            href="/daftar"
                            className="group flex items-center gap-4 p-5 sm:p-6 bg-emerald-900 hover:bg-emerald-800 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-emerald-700/60 min-h-20"
                        >
                            <div className="w-12 h-12 rounded-xl bg-white/10 group-hover:bg-white/15 border border-white/20 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
                                <GraduationCap className="w-6 h-6 text-white" strokeWidth={1.75} />
                            </div>
                            <div className="min-w-0 flex-1">
                                <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-amber-300 transition-colors leading-snug truncate">
                                    Pendaftaran Siswa Baru
                                </h3>
                                <p className="text-xs sm:text-sm text-emerald-100 font-medium mt-0.5 flex items-center gap-1">
                                    <span>Daftar Online Sekarang</span>
                                    <ArrowRight className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-1 transition-transform" />
                                </p>
                            </div>
                        </Link>

                        {/* Card 2: Alur & Persyaratan */}
                        <Link
                            href="/#alur"
                            className="group flex items-center gap-4 p-5 sm:p-6 bg-emerald-900 hover:bg-emerald-800 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-emerald-700/60 min-h-20"
                        >
                            <div className="w-12 h-12 rounded-xl bg-white/10 group-hover:bg-white/15 border border-white/20 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
                                <ClipboardCheck className="w-6 h-6 text-white" strokeWidth={1.75} />
                            </div>
                            <div className="min-w-0 flex-1">
                                <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-amber-300 transition-colors leading-snug truncate">
                                    Alur &amp; Persyaratan
                                </h3>
                                <p className="text-xs sm:text-sm text-emerald-100 font-medium mt-0.5 flex items-center gap-1">
                                    <span>Pelajari Prosedur Masuk</span>
                                    <ArrowRight className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-1 transition-transform" />
                                </p>
                            </div>
                        </Link>

                        {/* Card 3: Layanan Konsultasi WA */}
                        <a
                            href={waAdminUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-4 p-5 sm:p-6 bg-emerald-900 hover:bg-emerald-800 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-emerald-700/60 min-h-20"
                            aria-label="Konsultasi Panitia via WhatsApp"
                        >
                            <div className="w-12 h-12 rounded-xl bg-white/10 group-hover:bg-white/15 border border-white/20 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
                                <MessageCircle className="w-6 h-6 text-white" strokeWidth={1.75} />
                            </div>
                            <div className="min-w-0 flex-1">
                                <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-amber-300 transition-colors leading-snug truncate">
                                    Layanan Konsultasi WA
                                </h3>
                                <p className="text-xs sm:text-sm text-emerald-100 font-medium mt-0.5 flex items-center gap-1">
                                    <span>Hubungi Panitia SPMB</span>
                                    <ArrowRight className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-1 transition-transform" />
                                </p>
                            </div>
                        </a>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    )
}
