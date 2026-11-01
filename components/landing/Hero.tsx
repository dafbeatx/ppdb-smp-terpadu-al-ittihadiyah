import Link from 'next/link'
import Image from 'next/image'
import { getContentMap } from '@/lib/content'
import ScrollReveal from '@/components/ScrollReveal'
import Counter from '@/components/Counter'
import ParallaxHeroBg from '@/components/landing/ParallaxHeroBg'
import { 
    CheckCircle2, 
    MessageCircle, 
    MapPin, 
    Calendar, 
    FileText 
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
    const statAccreditation = content['hero.stat_accreditation']?.trim() || ''

    const statExperience = rawExp ? parseInt(rawExp, 10) : null
    const statGraduate = rawGrad ? parseInt(rawGrad, 10) : null
    const hasStats = Boolean(
        (statExperience !== null && !isNaN(statExperience)) ||
        (statGraduate !== null && !isNaN(statGraduate)) ||
        statAccreditation
    )

    const waAdminUrl = "https://wa.me/6281947674100?text=" + encodeURIComponent("Assalamu'alaikum Admin SPMB SMP Terpadu Al-Ittihadiyah, saya orang tua calon siswa ingin bertanya seputar pendaftaran.")

    return (
        <section id="hero" className="relative bg-linear-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-36 md:pb-20 overflow-hidden">
            <ParallaxHeroBg />

            <div className="container mx-auto px-4 relative z-10">
                <ScrollReveal direction="up" distance={25}>
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        
                        {/* Kolom Kiri: Identitas Resmi & Ajakan Pendaftaran */}
                        <div className="lg:col-span-7 text-left space-y-5 sm:space-y-6">
                            
                            {/* Identitas Lembaga & Lokasi */}
                            <div className="space-y-1.5">
                                <p className="text-xs sm:text-sm font-bold text-emerald-300 uppercase tracking-wider">
                                    SMP Terpadu Al-Ittihadiyah
                                </p>
                                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs sm:text-sm text-emerald-100/90 font-medium">
                                    <span className="flex items-center gap-1">
                                        <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                        <span>Ciampea, Kab. Bogor</span>
                                    </span>
                                    <span className="text-emerald-400">•</span>
                                    <span className="text-amber-300 font-semibold">Terakreditasi B</span>
                                </div>
                            </div>

                            {/* Headline Utama */}
                            <div className="space-y-2.5">
                                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight sm:leading-tight tracking-tight">
                                    Sistem Penerimaan Murid Baru (SPMB)
                                </h1>

                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-800/80 border border-emerald-600/50 text-emerald-100 text-xs sm:text-sm font-semibold">
                                    <Calendar className="w-3.5 h-3.5 text-amber-300" />
                                    <span>{year}</span>
                                </div>

                                <p className="text-sm sm:text-base md:text-lg text-emerald-100 font-normal leading-relaxed pt-1">
                                    {tagline ? tagline : "Membina Generasi Qur'ani yang Aktif, Kreatif, dan Berakhlak Mulia melalui integrasi kurikulum nasional dan nilai-nilai kepesantrenan."}
                                </p>
                            </div>

                            {/* Tombol Aksi Nyata (Tanpa ornamen panah berlebih) */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-1">
                                <Link
                                    href="/daftar"
                                    className="w-full sm:w-auto min-h-12 inline-flex items-center justify-center bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-sm sm:text-base px-6 sm:px-8 rounded-xl shadow-lg transition-colors active:scale-95 text-center"
                                >
                                    Daftar Siswa Baru (SPMB Online)
                                </Link>

                                <Link
                                    href="/#alur"
                                    className="w-full sm:w-auto min-h-12 inline-flex items-center justify-center bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm sm:text-base px-5 sm:px-6 rounded-xl transition-colors active:scale-95 text-center gap-2"
                                >
                                    <FileText className="w-4 h-4 text-emerald-300" />
                                    <span>Alur Pendaftaran</span>
                                </Link>

                                <a 
                                    href={waAdminUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-auto min-h-12 inline-flex items-center justify-center bg-emerald-800/70 hover:bg-emerald-700/80 border border-emerald-600/50 text-white font-medium text-sm sm:text-base px-4 sm:px-5 rounded-xl gap-2 transition-colors active:scale-95 text-center"
                                    aria-label="Konsultasi Panitia via WhatsApp"
                                >
                                    <MessageCircle className="w-4 h-4 text-emerald-300" />
                                    <span>Konsultasi WA</span>
                                </a>
                            </div>

                            {/* Tiga Pilar Komitmen Sekolah */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 pt-3 border-t border-emerald-800/70 text-xs sm:text-sm text-emerald-100/90">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                                    <span>Kurikulum Terpadu</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                                    <span>Bimbingan Tahfidz &amp; Sholat</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                                    <span>Lingkungan Asri &amp; Santun</span>
                                </div>
                            </div>
                        </div>

                        {/* Kolom Kanan: Foto Gedung & Informasi Resmi */}
                        <div className="lg:col-span-5">
                            <div className="bg-emerald-900/60 rounded-2xl sm:rounded-3xl border border-emerald-700/40 p-3 sm:p-4 shadow-2xl">
                                
                                {/* Foto Gedung Sekolah (HTML img dengan fetchpriority high sesuai R-40) */}
                                <div className="relative aspect-16/10 sm:aspect-4/3 rounded-xl sm:rounded-2xl overflow-hidden mb-3.5 bg-emerald-950">
                                    <Image
                                        src="/hero-bg.webp"
                                        alt={`Gedung ${schoolName}`}
                                        fill
                                        priority
                                        fetchPriority="high"
                                        sizes="(max-width: 1024px) 100vw, 420px"
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-emerald-950/80 via-transparent to-transparent" />
                                    
                                    <div className="absolute bottom-2.5 left-3 right-3 text-left">
                                        <p className="text-white text-xs sm:text-sm font-bold drop-shadow-sm">
                                            Gedung SMP Terpadu Al-Ittihadiyah
                                        </p>
                                        <p className="text-[11px] text-emerald-200 drop-shadow-sm">
                                            Ciampea Udik, Kabupaten Bogor
                                        </p>
                                    </div>
                                </div>

                                {/* Ringkasan Status Pendaftaran Resmi */}
                                <div className="space-y-2 text-xs sm:text-sm text-left">
                                    <div className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/40">
                                        <span className="text-emerald-200">Status Pendaftaran:</span>
                                        <span className="font-bold text-amber-300">Gelombang I Terbuka</span>
                                    </div>
                                    <div className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/40">
                                        <span className="text-emerald-200">Jenjang Siswa:</span>
                                        <span className="font-semibold text-white">SMP Terpadu Putra &amp; Putri</span>
                                    </div>
                                    <div className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/40">
                                        <span className="text-emerald-200">Program Utama:</span>
                                        <span className="font-semibold text-white">Akademik &amp; Karakter AKBAR</span>
                                    </div>
                                </div>

                                {/* Statistik Resmi dari CMS (Hanya jika diisi admin) */}
                                {hasStats && (
                                    <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-emerald-800/60 text-center">
                                        {statExperience !== null && (
                                            <div className="bg-emerald-950/60 rounded-xl p-2 border border-emerald-700/30">
                                                <div className="text-base sm:text-lg font-black text-white">
                                                    <Counter value={statExperience} suffix="+" />
                                                </div>
                                                <div className="text-[10px] text-emerald-200 leading-tight">Th Pengabdian</div>
                                            </div>
                                        )}
                                        {statGraduate !== null && (
                                            <div className="bg-emerald-950/60 rounded-xl p-2 border border-emerald-700/30">
                                                <div className="text-base sm:text-lg font-black text-amber-300">
                                                    <Counter value={statGraduate} suffix="%" />
                                                </div>
                                                <div className="text-[10px] text-emerald-200 leading-tight">Lanjut SMA</div>
                                            </div>
                                        )}
                                        {statAccreditation && (
                                            <div className="bg-emerald-950/60 rounded-xl p-2 border border-emerald-700/30">
                                                <div className="text-base sm:text-lg font-black text-white">
                                                    {statAccreditation}
                                                </div>
                                                <div className="text-[10px] text-emerald-200 leading-tight">Akreditasi</div>
                                            </div>
                                        )}
                                    </div>
                                )}

                            </div>
                        </div>

                    </div>
                </ScrollReveal>
            </div>
        </section>
    )
}
