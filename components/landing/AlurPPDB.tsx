import Link from 'next/link'
import Button from '@/components/ui/Button'
import { FileText, Camera, CheckCircle2, MessageCircle, ArrowRight, HelpCircle } from 'lucide-react'
import { getContentMap } from '@/lib/content'
import Card from '@/components/ui/Card'
import ScrollReveal from '@/components/ScrollReveal'

export default async function AlurPPDB() {
    const content = await getContentMap('alur')

    const title = content['alur.title'] || 'Alur Pendaftaran: Sangat Mudah & Praktis'
    const subtitle = content['alur.subtitle'] || 'Bisa diisi lewat HP hanya dalam 5-10 menit. Tidak perlu scan komputer yang rumit!'

    const steps = [
        {
            number: '1',
            icon: FileText,
            badge: 'Langkah 1',
            title: content['alur.step_1_title'] || 'Isi Data Sederhana',
            description: content['alur.step_1_desc'] || 'Cukup isi nama anak, tanggal lahir, nama orang tua, dan nomor WhatsApp yang aktif.',
        },
        {
            number: '2',
            icon: Camera,
            badge: 'Langkah 2',
            title: content['alur.step_2_title'] || 'Foto Berkas Pakai HP',
            description: content['alur.step_2_desc'] || 'Jepret foto KTP, Kartu Keluarga (KK), dan Ijazah/SKL langsung dari kamera HP Anda.',
        },
        {
            number: '3',
            icon: CheckCircle2,
            badge: 'Langkah 3',
            title: content['alur.step_3_title'] || 'Dapatkan Bukti Daftar',
            description: content['alur.step_3_desc'] || 'Nomor pendaftaran resmi langsung muncul di layar dan bisa disimpan atau dicetak.',
        },
        {
            number: '4',
            icon: MessageCircle,
            badge: 'Langkah 4',
            title: content['alur.step_4_title'] || 'Konfirmasi ke Panitia',
            description: content['alur.step_4_desc'] || 'Kirim pesan ke WhatsApp Admin. Tim kami akan memverifikasi dan menyambut Bapak/Ibu.',
        },
    ]

    const waAdminUrl = "https://wa.me/6281947674100?text=" + encodeURIComponent("Assalamu'alaikum Admin PPDB, saya ingin dibantu cara mendaftar di SMP Terpadu Al-Ittihadiyah.")

    return (
        <section id="alur" className="py-16 lg:py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal direction="up">
                        <div className="text-center mb-14">
                            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider mb-3">
                                <HelpCircle className="w-4 h-4 text-emerald-600" />
                                <span>Panduan Pendaftaran Ramah Orang Tua</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                                {title}
                            </h2>
                            <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                                {subtitle}
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* Step Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {steps.map((step, index) => {
                            const Icon = step.icon

                            return (
                                <ScrollReveal
                                    key={index}
                                    direction="up"
                                    delay={index * 0.1}
                                    distance={20}
                                >
                                    <Card className="p-7 text-center h-full group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-emerald-100/60 bg-emerald-50/20 rounded-2xl flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center justify-between mb-6">
                                                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                                                    {step.badge}
                                                </span>
                                                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-emerald-200">
                                                    {step.number}
                                                </div>
                                            </div>

                                            <div className="bg-white w-20 h-20 rounded-2xl mb-6 mx-auto flex items-center justify-center shadow-md shadow-emerald-950/5 group-hover:scale-110 transition-transform">
                                                <Icon className="w-9 h-9 text-emerald-600" />
                                            </div>

                                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors">
                                                {step.title}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed text-sm">
                                                {step.description}
                                            </p>
                                        </div>

                                        <div className="mt-6 pt-4 border-t border-emerald-100/60 text-xs font-medium text-emerald-600">
                                            ✓ Mudah & Cepat
                                        </div>
                                    </Card>
                                </ScrollReveal>
                            )
                        })}
                    </div>

                    {/* Reassurance Callout Box specifically for Non-Tech Parents */}
                    <ScrollReveal direction="up" delay={0.3}>
                        <div className="bg-linear-to-br from-emerald-800 to-green-950 text-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-emerald-950/20 max-w-5xl mx-auto border border-emerald-600/30">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="space-y-3 text-center md:text-left flex-1">
                                    <div className="inline-flex items-center gap-2 bg-emerald-400/20 border border-emerald-300/30 px-3.5 py-1 rounded-full text-xs font-semibold text-emerald-200">
                                        <span>💬 Layanan Bantuan Pendaftaran</span>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-extrabold text-white">
                                        {content['alur.cta_title'] || 'Merasa Awam dengan Teknologi atau Butuh Bantuan?'}
                                    </h3>
                                    <p className="text-emerald-100/90 text-sm md:text-base leading-relaxed max-w-xl">
                                        {content['alur.cta_text'] || 'Bapak/Ibu jangan khawatir atau sungkan. Panitia PPDB kami yang ramah siap memandu langkah demi langkah via WhatsApp, atau Bapak/Ibu bisa langsung datang ke sekolah dengan membawa berkas asli.'}
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto shrink-0">
                                    <Link href="/daftar" className="w-full">
                                        <Button size="lg" className="w-full bg-white text-green-900 hover:bg-emerald-50 font-bold text-base py-4 px-6 rounded-xl shadow-lg border border-white gap-2">
                                            <span>Mulai Daftar Online</span>
                                            <ArrowRight className="w-4 h-4 text-green-800" />
                                        </Button>
                                    </Link>

                                    <a
                                        href={waAdminUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full"
                                    >
                                        <Button size="lg" variant="outline" className="w-full bg-emerald-900/60 border-emerald-400/50 hover:bg-emerald-800 text-white font-semibold text-base py-4 px-6 rounded-xl gap-2">
                                            <MessageCircle className="w-5 h-5 text-emerald-300" />
                                            <span>Minta Dipandu via WhatsApp</span>
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    )
}
