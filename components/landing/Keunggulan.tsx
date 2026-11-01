import Card from '@/components/ui/Card'
import { Heart, BookOpen, ShieldCheck, Trophy } from 'lucide-react'
import { getContentMap } from '@/lib/content'
import ScrollReveal from '@/components/ScrollReveal'

export default async function Keunggulan() {
    // Fetch content from CMS
    const content = await getContentMap('keunggulan')

    const title = content['keunggulan.title']?.trim()
    const subtitle = content['keunggulan.subtitle']?.trim()

    const rawList = [
        {
            icon: Heart,
            badge: 'Prioritas Akhlak',
            title: content['item_1.title']?.trim(),
            description: content['item_1.description']?.trim(),
        },
        {
            icon: BookOpen,
            badge: 'Cinta Al-Qur\'an',
            title: content['item_2.title']?.trim(),
            description: content['item_2.description']?.trim(),
        },
        {
            icon: ShieldCheck,
            badge: 'Lingkungan Aman',
            title: content['item_3.title']?.trim(),
            description: content['item_3.description']?.trim(),
        },
        {
            icon: Trophy,
            badge: 'Prestasi Nyata',
            title: content['item_4.title']?.trim(),
            description: content['item_4.description']?.trim(),
        },
    ]

    const keunggulanList = rawList.filter((item) => item.title || item.description)

    // Jika admin belum mengisi keunggulan di CMS, jangan tampilkan data dummy
    if (keunggulanList.length === 0 && !title) {
        return null
    }

    return (
        <section id="keunggulan" className="py-10 md:py-20 bg-slate-50 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto">
                    {(title || subtitle) && (
                        <ScrollReveal direction="up">
                            <div className="text-center mb-8 sm:mb-12">
                                <p className="text-emerald-800 font-semibold text-xs sm:text-sm tracking-wider uppercase mb-2">
                                    Mengapa Memilih Al-Ittihadiyah
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

                    {keunggulanList.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            {keunggulanList.map((item, index) => {
                                const Icon = item.icon
                                return (
                                    <ScrollReveal
                                        key={index}
                                        direction="up"
                                        delay={0.08 * index}
                                    >
                                        <Card
                                            className="p-5 sm:p-6 md:p-7 bg-white rounded-2xl sm:rounded-3xl shadow-xs hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between border border-slate-200/80 group"
                                        >
                                            <div>
                                                <div className="flex items-center justify-between mb-4 sm:mb-5">
                                                    <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-100 group-hover:bg-emerald-100 transition-colors">
                                                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                                                    </div>
                                                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                                                        {item.badge}
                                                    </span>
                                                </div>

                                                {item.title && (
                                                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3 leading-snug group-hover:text-emerald-800 transition-colors">
                                                        {item.title}
                                                    </h3>
                                                )}

                                                {item.description && (
                                                    <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
                                                        {item.description}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                                                <span>Fokus Karakter &amp; Prestasi</span>
                                            </div>
                                        </Card>
                                    </ScrollReveal>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
