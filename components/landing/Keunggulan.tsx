import Card from '@/components/ui/Card'
import { Heart, BookOpen, ShieldCheck, Trophy, Sparkles } from 'lucide-react'
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
            color: 'bg-emerald-100 text-emerald-700',
            borderColor: 'border-emerald-200',
        },
        {
            icon: BookOpen,
            badge: 'Cinta Al-Qur\'an',
            title: content['item_2.title'] || 'Bimbingan Tahfidz & Al-Qur\'an Ramah Anak',
            description: content['item_2.description'] || 'Bimbingan hafalan Al-Qur\'an juz amma dan tilawah tartil dengan ustadz/ustadzah yang sabar, telaten, dan tidak membebani santri.',
            color: 'bg-blue-100 text-blue-700',
            borderColor: 'border-blue-200',
        },
        {
            icon: ShieldCheck,
            badge: 'Lingkungan Aman',
            title: content['item_3.title'] || 'Pergaulan Positif & Bebas Bullying',
            description: content['item_3.description'] || 'Suasana sekolah yang kondusif, mengontrol penggunaan HP/gadget secara bijak, dan menjauhkan anak dari pengaruh negatif pergaulan luar.',
            color: 'bg-amber-100 text-amber-700',
            borderColor: 'border-amber-200',
        },
        {
            icon: Trophy,
            badge: 'Prestasi Nyata',
            title: content['item_4.title'] || 'Pendidikan Akademik Unggul & Ekstrakurikuler',
            description: content['item_4.description'] || 'Kurikulum terpadu nasional & kepesantrenan dengan guru-guru berkompeten yang siap mengantarkan putra-putri ke jenjang SMA favorit.',
            color: 'bg-purple-100 text-purple-700',
            borderColor: 'border-purple-200',
        },
    ]

    return (
        <section id="keunggulan" className="py-16 lg:py-24 bg-linear-to-br from-slate-50 via-emerald-50/40 to-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal direction="up">
                        <div className="text-center mb-14">
                            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider mb-3">
                                <Sparkles className="w-4 h-4 text-emerald-600" />
                                <span>Alasan Orang Tua Memilih Kami</span>
                            </div>
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
                                    delay={0.1 * index}
                                >
                                    <Card
                                        className="p-7 bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 h-full flex flex-col justify-between border border-gray-100 relative group"
                                    >
                                        <div>
                                            <div className="flex items-center justify-between mb-5">
                                                <div className={`p-3.5 rounded-2xl ${item.color} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                                                    <Icon className="w-7 h-7" />
                                                </div>
                                                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
                                                    {item.badge}
                                                </span>
                                            </div>

                                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-emerald-700 transition-colors">
                                                {item.title}
                                            </h3>

                                            <p className="text-gray-600 leading-relaxed text-sm">
                                                {item.description}
                                            </p>
                                        </div>

                                        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                                            <span>✓ Lingkungan Terbimbing</span>
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
