'use client'

import { Quote } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'
import Card from '@/components/ui/Card'

const TESTIMONIALS = [
    {
        name: "Ibu Hj. Siti Aminah",
        initials: "SA",
        role: "Wali Murid Siswa Kelas 8",
        content: "Awalnya saya sangat cemas dengan pergaulan remaja saat ini dan kecanduan main game di HP. Alhamdulillah, setelah bersekolah di sini, sholat anak saya jadi tertib tanpa perlu disuruh, tutur katanya santun, dan hafalannya bertambah. Sebagai orang tua, hati saya sangat tenang.",
    },
    {
        name: "Bpk. Hendra Gunawan",
        initials: "HG",
        role: "Wali Murid (Pendaftar Baru)",
        content: "Jujur saya ini agak gaptek dengan urusan daftar online. Tapi panitia PPDB SMP Al-Ittihadiyah sangat ramah dan sabar memandu saya lewat WhatsApp dari awal sampai kartu pendaftaran keluar. Berkas cukup difoto pakai HP biasa. Sangat membantu dan tidak ribet sama sekali!",
    },
    {
        name: "Ibu Maryam Fauziah",
        initials: "MF",
        role: "Wali Murid Alumni 2024",
        content: "Putri saya lulus dengan bekal akhlak dan hafalan Qur'an yang sangat baik, serta mampu bersaing hingga diterima di SMA Negeri favorit. Guru-gurunya tulus dan perhatian seperti orang tua sendiri di sekolah. Pilihan terbaik untuk anak kami.",
    }
]

export default function Testimoni() {
    return (
        <section id="testimoni" className="py-10 md:py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4 max-w-7xl">
                <ScrollReveal direction="up">
                    <div className="text-center mb-8 sm:mb-12">
                        <p className="text-emerald-800 font-semibold text-xs sm:text-sm tracking-wider uppercase mb-2">
                            Kisah Nyata Para Orang Tua
                        </p>
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4 tracking-tight">
                            Apa Kata Para Orang Tua?
                        </h2>
                        <p className="text-xs sm:text-base md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Pengalaman nyata dari Bapak dan Ibu yang telah mempercayakan pendidikan akhlak buah hatinya di SMP Terpadu Al-Ittihadiyah
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {TESTIMONIALS.map((t, i) => (
                        <ScrollReveal key={i} direction="up" delay={i * 0.1}>
                            <Card className="p-5 sm:p-7 md:p-8 h-full flex flex-col justify-between border border-slate-200/80 bg-slate-50/50 rounded-2xl sm:rounded-3xl hover:shadow-md transition-shadow">
                                <div>
                                    {/* Quote Icon */}
                                    <div className="text-emerald-300 mb-3 sm:mb-5">
                                        <Quote className="w-6 h-6 sm:w-8 sm:h-8" />
                                    </div>

                                    {/* Testimonial Quote */}
                                    <p className="text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base italic mb-4 sm:mb-6">
                                        &ldquo;{t.content}&rdquo;
                                    </p>
                                </div>

                                {/* User Info */}
                                <div className="flex items-center gap-3 sm:gap-3.5 pt-4 sm:pt-5 border-t border-slate-200/60 mt-auto">
                                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center shrink-0">
                                        {t.initials}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm sm:text-base leading-snug">
                                            {t.name}
                                        </h4>
                                        <p className="text-[11px] sm:text-xs text-emerald-800 font-medium">
                                            {t.role}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
