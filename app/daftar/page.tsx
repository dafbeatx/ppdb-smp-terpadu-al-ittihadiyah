import MultiStepForm from '@/components/registration/MultiStepForm'
import { HeartHandshake, PhoneCall } from 'lucide-react'

export default function DaftarPage() {
    const waHelpUrl = "https://wa.me/6281947674100?text=" + encodeURIComponent("Assalamu'alaikum Panitia PPDB SMP Al-Ittihadiyah, saya sedang membuka formulir pendaftaran dan butuh bantuan.")

    return (
        <main className="min-h-[calc(100vh-80px)] bg-linear-to-br from-slate-50 via-emerald-50/30 to-green-50/50 pt-24 pb-8 md:pt-32 md:pb-16">
            <div className="container mx-auto px-4 max-w-4xl pb-24 md:pb-0">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold mb-3">
                        <span>Penerimaan Santri Baru TA 2026/2027</span>
                    </div>
                    <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-2 md:mb-3 tracking-tight">
                        Formulir Pendaftaran Santri Baru
                    </h1>
                    <p className="text-sm md:text-base text-gray-600 max-w-xl mx-auto">
                        SMP Terpadu Al-Ittihadiyah • Ciampea, Bogor
                    </p>
                </div>

                {/* Friendly banner for non-tech-savvy parents */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                    <div className="flex items-center gap-3 text-center sm:text-left">
                        <div className="p-2.5 bg-emerald-600 text-white rounded-xl shrink-0 hidden sm:block">
                            <HeartHandshake className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-emerald-950">
                                Butuh Bantuan Mengisi Formulir Ini?
                            </p>
                            <p className="text-xs sm:text-sm text-emerald-800 mt-0.5">
                                Jangan ragu, panitia kami yang ramah siap memandu Bapak/Ibu via WhatsApp sampai selesai.
                            </p>
                        </div>
                    </div>

                    <a
                        href={waHelpUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 w-full sm:w-auto"
                    >
                        <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm">
                            <PhoneCall className="w-4 h-4" />
                            <span>Bantuan WhatsApp</span>
                        </button>
                    </a>
                </div>

                <MultiStepForm />
            </div>
        </main>
    )
}
