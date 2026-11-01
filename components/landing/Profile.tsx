import Card from '@/components/ui/Card'
import { Building2, Trophy } from 'lucide-react'
import { getContentMap } from '@/lib/content'
import ScrollReveal from '@/components/ScrollReveal'

export default async function Profile() {
    const content = await getContentMap('profile')

    // Profile section uses 'profile.key' format for main content
    const title = content['profile.title'] || 'Mengenal SMP Terpadu Al-Ittihadiyah'
    const subtitle = content['profile.subtitle'] || 'Sekolah ramah anak yang mendidik kecerdasan akal sekaligus kemuliaan hati'
    
    const paragraph1 = content['profile.paragraph_1'] || 'SMP Terpadu Al-Ittihadiyah hadir sebagai mitra terpercaya bagi para orang tua dalam mendidik putra-putri di usia remaja. Kami memadukan kurikulum pendidikan nasional dengan pembinaan akhlakul karimah dan nilai-nilai Islam.'
    const paragraph2 = content['profile.paragraph_2'] || 'Dengan bimbingan para ustadz dan guru yang sabar serta berdedikasi, kami menanamkan kebiasaan sholat berjamaah, hafalan Al-Qur\'an, serta disiplin belajar dalam suasana kekeluargaan yang hangat, nyaman, dan aman bagi buah hati Anda.'

    const defaultFasilitas = [
        'Ruang Kelas Nyaman, Terang, & Bersih',
        'Masjid Sekolah untuk Sholat Berjamaah & Tadarus',
        'Laboratorium Komputer & Perpustakaan Lengkap',
        'Lapangan Olahraga & Area Terbuka yang Asri & Aman'
    ]

    const defaultProgram = [
        'Tahfidz Al-Qur\'an & Bimbingan Baca Qur\'an Tartil',
        'Pembiasaan Sholat 5 Waktu Berjamaah & Dhuha Rutin',
        'Penguatan Adab, Sopan Santun, & Budi Pekerti',
        'Bimbingan Minat Bakat & Ekstrakurikuler Terbimbing'
    ]

    return (
        <section id="profil" className="py-16 md:py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <ScrollReveal direction="up">
                        <div className="text-center mb-12">
                            <p className="text-emerald-800 font-semibold text-sm tracking-wider uppercase mb-2">
                                Profil Lembaga
                            </p>
                            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                                {title}
                            </h2>
                            <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                                {subtitle}
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* Description */}
                    <ScrollReveal direction="up" delay={0.2}>
                        <div className="p-7 md:p-10 mb-10 bg-slate-50 border border-slate-200/80 rounded-3xl">
                            <div className="space-y-4">
                                <p className="text-gray-800 leading-relaxed text-base md:text-lg">
                                    {paragraph1}
                                </p>
                                <p className="text-gray-800 leading-relaxed text-base md:text-lg">
                                    {paragraph2}
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Fasilitas & Program Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Fasilitas Card */}
                        <ScrollReveal direction="right" delay={0.3}>
                            <Card className="p-7 md:p-9 border border-emerald-100 rounded-3xl hover:shadow-lg transition-all duration-300 h-full bg-white">
                                <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-gray-100">
                                    <div className="bg-emerald-50 text-emerald-800 p-3 rounded-2xl border border-emerald-100">
                                        <Building2 className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                                            Fasilitas Sekolah
                                        </h3>
                                        <p className="text-xs text-gray-500">Mendukung kenyamanan dan fokus belajar siswa</p>
                                    </div>
                                </div>
                                <ul className="space-y-3.5">
                                    {[1, 2, 3, 4].map((num) => {
                                        const item = content[`fasilitas.item_${num}`] || defaultFasilitas[num - 1]
                                        return (
                                            <li
                                                key={num}
                                                className="flex items-start gap-3 text-gray-700"
                                            >
                                                <span className="text-emerald-700 font-bold mt-0.5">✓</span>
                                                <span className="flex-1 text-sm md:text-base leading-relaxed">{item}</span>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </Card>
                        </ScrollReveal>

                        {/* Program Unggulan Card */}
                        <ScrollReveal direction="left" delay={0.3}>
                            <Card className="p-7 md:p-9 border border-emerald-100 rounded-3xl hover:shadow-lg transition-all duration-300 h-full bg-white">
                                <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-gray-100">
                                    <div className="bg-emerald-50 text-emerald-800 p-3 rounded-2xl border border-emerald-100">
                                        <Trophy className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                                            Program Unggulan
                                        </h3>
                                        <p className="text-xs text-gray-500">Kombinasi kurikulum nasional &amp; kepesantrenan</p>
                                    </div>
                                </div>
                                <ul className="space-y-3.5">
                                    {[1, 2, 3, 4].map((num) => {
                                        const item = content[`program.item_${num}`] || defaultProgram[num - 1]
                                        return (
                                            <li
                                                key={num}
                                                className="flex items-start gap-3 text-gray-700"
                                            >
                                                <span className="text-emerald-700 font-bold mt-0.5">✓</span>
                                                <span className="flex-1 text-sm md:text-base leading-relaxed">{item}</span>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </Card>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </section>
    )
}
