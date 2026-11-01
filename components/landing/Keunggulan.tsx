import Card from '@/components/ui/Card'
import { Heart, BookOpen, ShieldCheck, Trophy } from 'lucide-react'
import { getContentMap } from '@/lib/content'
import ScrollReveal from '@/components/ScrollReveal'

export default async function Keunggulan() {
    // Fetch content from CMS with parent-friendly fallbacks
    const content = await getContentMap('keunggulan')

    const keunggulanList = [
        {
            icon: Heart,
            badge: 'Prioritas Akhlak',
            title: content['item_1.title'] || 'Pembiasaan Ibadah & Sholat Berjamaah',
            description: content['item_1.description'] || 'Membiasakan sholat lima waktu berjamaah, sholat dhuha, tadarus pagi, dan adab sopan santun kepada orang tua serta sesama.',
        },
        {
            icon: BookOpen,
            badge: 'Cinta Al-Qur\'an',
            title: content['item_2.title'] || 'Bimbingan Tahfidz & Al-Qur\'an Ramah Anak',
            description: content['item_2.description'] || 'Bimbingan hafalan Al-Qur\'an juz amma dan tilawah tartil dengan ustadz/ustadzah yang sabar, telaten, dan tidak membebani santri.',
        },
        {
            icon: ShieldCheck,
            badge: 'Lingkungan Aman',
            title: content['item_3.title'] || 'Pergaulan Positif & Bebas Bullying',
            description: content['item_3.description'] || 'Suasana sekolah yang kondusif, mengontrol penggunaan HP/gadget secara bijak, dan menjauhkan anak dari pengaruh negatif pergaulan luar.',
        },
        {
            icon: Trophy,
            badge: 'Prestasi Nyata',
            title: content['item_4.title'] || 'Pendidikan Akademik Unggul & Ekstrakurikuler',
            description: content['item_4.description'] || 'Kurikulum terpadu nasional & kepesantrenan dengan guru-guru berkompeten yang siap mengantarkan putra-putri ke jenjang SMA favorit.',
        },
    ]

    return (
        <section id="keunggulan" className="py-16 lg:py-24 bg-slate-50 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal direction="up">
                        <div className="text-center mb-14">
                            <p className="text-emerald-800 font-semibold text-sm tracking-wider uppercase mb-2">
                                Mengapa Memilih Al-Ittihadiyah
                            </p>
                            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                                {content['keunggulan.title'] || 'Bukan Sekadar Sekolah, Ini Rumah Kedua Buah Hati Anda'}
                            </h2>
                            <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                                {content['keunggulan.subtitle'] || 'Kami mengerti kekhawatiran Bapak/Ibu terhadap pergaulan remaja saat ini. Di sini, karakter dan keimanan anak dijaga bersama-sama.'}
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {keunggulanList.map((item, index) => {
                            const Icon = item.icon
                            return (
                                <ScrollReveal
                                    key={index}
                                    direction="up"
                                    delay={0.08 * index}
                                >
                                    <Card
                                        className="p-7 bg-white rounded-3xl shadow-xs hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between border border-slate-200/80 group"
                                    >
                                        <div>
                                            <div className="flex items-center justify-between mb-5">
                                                <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-100 group-hover:bg-emerald-100 transition-colors">
                                                    <Icon className="w-6 h-6" />
                                                </div>
                                                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                                                    {item.badge}
                                                </span>
                                            </div>

                                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-emerald-800 transition-colors">
                                                {item.title}
                                            </h3>

                                            <p className="text-gray-600 leading-relaxed text-sm">
                                                {item.description}
                                            </p>
                                        </div>

                                        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                                            <span>Fokus Karakter &amp; Prestasi</span>
                                        </div>
                                    </Card>
                                </ScrollReveal>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
