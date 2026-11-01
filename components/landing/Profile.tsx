import Card from '@/components/ui/Card'
import { Building2, Trophy } from 'lucide-react'
import { getContentMap } from '@/lib/content'
import ScrollReveal from '@/components/ScrollReveal'

export default async function Profile() {
    const content = await getContentMap('profile')

    const title = content['profile.title']?.trim() || ''
    const subtitle = content['profile.subtitle']?.trim() || ''
    const paragraph1 = content['profile.paragraph_1']?.trim() || ''
    const paragraph2 = content['profile.paragraph_2']?.trim() || ''

    const fasilitasItems = [1, 2, 3, 4]
        .map((num) => content[`fasilitas.item_${num}`]?.trim())
        .filter((item): item is string => Boolean(item))

    const programItems = [1, 2, 3, 4]
        .map((num) => content[`program.item_${num}`]?.trim())
        .filter((item): item is string => Boolean(item))

    const hasProfileContent = Boolean(
        title || subtitle || paragraph1 || paragraph2 || fasilitasItems.length > 0 || programItems.length > 0
    )

    // Jika admin belum mengisi profil di CMS, jangan tampilkan data dummy
    if (!hasProfileContent) {
        return null
    }

    return (
        <section id="profil" className="py-10 md:py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    {(title || subtitle) && (
                        <ScrollReveal direction="up">
                            <div className="text-center mb-8 sm:mb-12">
                                <p className="text-emerald-800 font-semibold text-xs sm:text-sm tracking-wider uppercase mb-2">
                                    Profil Lembaga
                                </p>
                                {title && (
                                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4 tracking-tight">
                                        {title}
                                    </h2>
                                )}
                                {subtitle && (
                                    <p className="text-xs sm:text-base md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                                        {subtitle}
                                    </p>
                                )}
                            </div>
                        </ScrollReveal>
                    )}

                    {/* Description */}
                    {(paragraph1 || paragraph2) && (
                        <ScrollReveal direction="up" delay={0.2}>
                            <div className="p-5 sm:p-7 md:p-10 mb-6 sm:mb-10 bg-slate-50 border border-slate-200/80 rounded-2xl sm:rounded-3xl">
                                <div className="space-y-3 sm:space-y-4">
                                    {paragraph1 && (
                                        <p className="text-gray-800 leading-relaxed text-sm sm:text-base md:text-lg">
                                            {paragraph1}
                                        </p>
                                    )}
                                    {paragraph2 && (
                                        <p className="text-gray-800 leading-relaxed text-sm sm:text-base md:text-lg">
                                            {paragraph2}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </ScrollReveal>
                    )}

                    {/* Fasilitas & Program Grid */}
                    {(fasilitasItems.length > 0 || programItems.length > 0) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                            {/* Fasilitas Card */}
                            {fasilitasItems.length > 0 && (
                                <ScrollReveal direction="right" delay={0.3}>
                                    <Card className="p-5 sm:p-7 md:p-9 border border-emerald-100 rounded-2xl sm:rounded-3xl hover:shadow-lg transition-all duration-300 h-full bg-white">
                                        <div className="flex items-center gap-3 sm:gap-3.5 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-100">
                                            <div className="bg-emerald-50 text-emerald-800 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-emerald-100">
                                                <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                                                    Fasilitas Sekolah
                                                </h3>
                                                <p className="text-[11px] sm:text-xs text-gray-500">Mendukung kenyamanan dan fokus belajar siswa</p>
                                            </div>
                                        </div>
                                        <ul className="space-y-2.5 sm:space-y-3.5">
                                            {fasilitasItems.map((item, idx) => (
                                                <li
                                                    key={idx}
                                                    className="flex items-start gap-2.5 sm:gap-3 text-gray-700"
                                                >
                                                    <span className="text-emerald-700 font-bold mt-0.5">✓</span>
                                                    <span className="flex-1 text-xs sm:text-sm md:text-base leading-relaxed">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </Card>
                                </ScrollReveal>
                            )}

                            {/* Program Unggulan Card */}
                            {programItems.length > 0 && (
                                <ScrollReveal direction="left" delay={0.3}>
                                    <Card className="p-5 sm:p-7 md:p-9 border border-emerald-100 rounded-2xl sm:rounded-3xl hover:shadow-lg transition-all duration-300 h-full bg-white">
                                        <div className="flex items-center gap-3 sm:gap-3.5 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-100">
                                            <div className="bg-emerald-50 text-emerald-800 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-emerald-100">
                                                <Trophy className="w-5 h-5 sm:w-6 sm:h-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                                                    Program Unggulan
                                                </h3>
                                                <p className="text-[11px] sm:text-xs text-gray-500">Kombinasi kurikulum nasional &amp; kepesantrenan</p>
                                            </div>
                                        </div>
                                        <ul className="space-y-2.5 sm:space-y-3.5">
                                            {programItems.map((item, idx) => (
                                                <li
                                                    key={idx}
                                                    className="flex items-start gap-2.5 sm:gap-3 text-gray-700"
                                                >
                                                    <span className="text-emerald-700 font-bold mt-0.5">✓</span>
                                                    <span className="flex-1 text-xs sm:text-sm md:text-base leading-relaxed">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </Card>
                                </ScrollReveal>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
