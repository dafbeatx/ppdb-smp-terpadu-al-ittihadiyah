import Link from 'next/link'
import Button from '@/components/ui/Button'
import { FileText, Camera, CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react'
import { getContentMap } from '@/lib/content'
import ScrollReveal from '@/components/ScrollReveal'

export default async function AlurPPDB() {
    const content = await getContentMap('alur')

    const title = content['alur.title']?.trim()
    const subtitle = content['alur.subtitle']?.trim()

    const rawSteps = [
        {
            number: '1',
            icon: FileText,
            badge: 'Langkah 1',
            title: content['alur.step_1_title']?.trim(),
            description: content['alur.step_1_desc']?.trim(),
        },
        {
            number: '2',
            icon: Camera,
            badge: 'Langkah 2',
            title: content['alur.step_2_title']?.trim(),
            description: content['alur.step_2_desc']?.trim(),
        },
        {
            number: '3',
            icon: CheckCircle2,
            badge: 'Langkah 3',
            title: content['alur.step_3_title']?.trim(),
            description: content['alur.step_3_desc']?.trim(),
        },
        {
            number: '4',
            icon: MessageCircle,
            badge: 'Langkah 4',
            title: content['alur.step_4_title']?.trim(),
            description: content['alur.step_4_desc']?.trim(),
        },
    ]

    const steps = rawSteps.filter((s) => s.title || s.description)

    const ctaTitle = content['alur.cta_title']?.trim() || 'Merasa Awam dengan Teknologi atau Butuh Bantuan?'
    const ctaText = content['alur.cta_text']?.trim() || 'Bapak/Ibu jangan ragu untuk bertanya. Panitia SPMB kami siap memandu pendaftaran via WhatsApp sampai tuntas.'

    const waAdminUrl = "https://wa.me/6281947674100?text=" + encodeURIComponent("Assalamu'alaikum Admin SPMB, saya ingin dibantu cara mendaftar di SMP Terpadu Al-Ittihadiyah.")

    return (
        <section id="alur" className="py-10 md:py-20 bg-slate-50 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header: Only shown if title or steps exist */}
                    {(title || subtitle || steps.length > 0) && (
                        <ScrollReveal direction="up">
                            <div className="text-center mb-8 sm:mb-12">
                                <p className="text-emerald-800 font-semibold text-xs sm:text-sm tracking-wider uppercase mb-2">
                                    Langkah Pendaftaran
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

                    {/* Step Cards with Sequential Progression: only shown if filled by admin */}
                    {steps.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-16 relative">
                            {steps.map((step, index) => {
                                const Icon = step.icon

                                return (
                                    <ScrollReveal
                                        key={index}
                                        direction="up"
                                        delay={index * 0.08}
                                        distance={20}
                                    >
                                        <div className="p-5 sm:p-7 h-full bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between relative group hover:border-emerald-300 transition-colors">
                                            <div>
                                                <div className="flex items-center justify-between mb-4 sm:mb-6">
                                                    <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-100 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full">
                                                        {step.badge}
                                                    </span>
                                                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs sm:text-sm">
                                                        {step.number}
                                                    </div>
                                                </div>

                                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl mb-4 sm:mb-5 flex items-center justify-center bg-emerald-50 text-emerald-800 border border-emerald-100">
                                                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                                                </div>

                                                {step.title && (
                                                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2 leading-snug">
                                                        {step.title}
                                                    </h3>
                                                )}
                                                {step.description && (
                                                    <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
                                                        {step.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                )
                            })}
                        </div>
                    )}

                    {/* Reassurance Callout Box */}
                    <ScrollReveal direction="up" delay={0.2}>
                        <div className="bg-linear-to-br from-emerald-800 to-green-950 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 shadow-2xl shadow-emerald-950/20 max-w-5xl mx-auto border border-emerald-600/30">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
                                <div className="space-y-2.5 sm:space-y-3 text-center md:text-left flex-1">
                                    <div className="inline-flex items-center gap-2 bg-emerald-400/20 border border-emerald-300/30 px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold text-emerald-200">
                                        <span>💬 Layanan Bantuan Pendaftaran</span>
                                    </div>
                                    <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
                                        {ctaTitle}
                                    </h3>
                                    <p className="text-emerald-100/90 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl">
                                        {ctaText}
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 sm:gap-3 w-full md:w-auto shrink-0">
                                    <Link href="/daftar" className="w-full">
                                        <Button size="lg" className="w-full bg-white text-green-900 hover:bg-emerald-50 font-bold text-sm sm:text-base py-3 sm:py-4 px-5 sm:px-6 rounded-xl shadow-lg border border-white gap-2">
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
                                        <Button size="lg" variant="outline" className="w-full bg-emerald-900/60 border-emerald-400/50 hover:bg-emerald-800 text-white font-semibold text-sm sm:text-base py-3 sm:py-4 px-5 sm:px-6 rounded-xl gap-2">
                                            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300" />
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
