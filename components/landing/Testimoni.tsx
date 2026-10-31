'use client'

import { Star, Quote, HeartHandshake } from 'lucide-react'
import Image from 'next/image'
import ScrollReveal from '@/components/ScrollReveal'
import Card from '@/components/ui/Card'

const getAvatarByName = (name: string) => {
    const n = name.toLowerCase()
    const isFemale = n.includes('ibu') || n.includes('hj.') || n.includes('siti') || n.includes('aisyah') || n.includes('nur') || n.includes('putri') || n.includes('nabila') || n.includes('maryam')
    const isMale = n.includes('bpk') || n.includes('h.') || n.includes('ahmad') || n.includes('muhammad') || n.includes('rahmat') || n.includes('hendra')

    const variant = name.length % 2 === 0 ? '1' : '2'

    if (isFemale) return `/avatars/female-${variant}.svg`
    if (isMale) return `/avatars/male-${variant}.svg`
    return '/avatars/neutral.svg'
}

const TESTIMONIALS = [
    {
        name: "Ibu Hj. Siti Aminah",
        role: "Wali Murid Siswa Kelas 8",
        content: "Awalnya saya sangat cemas dengan pergaulan remaja saat ini dan kecanduan main game di HP. Alhamdulillah, setelah bersekolah di sini, sholat anak saya jadi tertib tanpa perlu disuruh, tutur katanya santun, dan hafalannya bertambah. Sebagai orang tua, hati saya sangat tenang.",
        rating: 5
    },
    {
        name: "Bpk. Hendra Gunawan",
        role: "Wali Murid (Pendaftar Baru)",
        content: "Jujur saya ini agak gaptek dengan urusan daftar online. Tapi panitia PPDB SMP Al-Ittihadiyah sangat ramah dan sabar memandu saya lewat WhatsApp dari awal sampai kartu pendaftaran keluar. Berkas cukup difoto pakai HP biasa. Sangat membantu dan tidak ribet sama sekali!",
        rating: 5
    },
    {
        name: "Ibu Maryam Fauziah",
        role: "Wali Murid Alumni 2024",
        content: "Putri saya lulus dengan bekal akhlak dan hafalan Qur'an yang sangat baik, serta mampu bersaing hingga diterima di SMA Negeri favorit. Guru-gurunya tulus dan perhatian seperti orang tua sendiri di sekolah. Pilihan terbaik untuk anak kami.",
        rating: 5
    }
]

export default function Testimoni() {
    return (
        <section id="testimoni" className="py-16 lg:py-24 bg-slate-50 overflow-hidden">
            <div className="container mx-auto px-4 max-w-7xl">
                <ScrollReveal direction="up">
                    <div className="text-center mb-14">
                        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider mb-3">
                            <HeartHandshake className="w-4 h-4 text-emerald-600" />
                            <span>Kisah Nyata Para Orang Tua</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                            Apa Kata Para Orang Tua?
                        </h2>
                        <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Pengalaman nyata dari Bapak dan Ibu yang telah mempercayakan pendidikan akhlak buah hatinya di SMP Terpadu Al-Ittihadiyah
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {TESTIMONIALS.map((t, i) => (
                        <ScrollReveal key={i} direction="up" delay={i * 0.15}>
                            <Card className="p-8 h-full flex flex-col justify-between relative group hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 border border-gray-100 bg-white rounded-3xl shadow-sm">
                                <div>
                                    {/* Quote Icon */}
                                    <div className="text-emerald-200 mb-4">
                                        <Quote className="w-9 h-9" />
                                    </div>

                                    {/* Rating Stars */}
                                    <div className="flex gap-1 mb-4 text-amber-400">
                                        {[...Array(t.rating)].map((_, idx) => (
                                            <Star key={idx} className="w-4 h-4 fill-current" />
                                        ))}
                                    </div>

                                    {/* Testimonial Quote */}
                                    <p className="text-gray-700 leading-relaxed text-sm md:text-base italic mb-6">
                                        &ldquo;{t.content}&rdquo;
                                    </p>
                                </div>

                                {/* User Info */}
                                <div className="flex items-center gap-4 pt-4 border-t border-gray-100 mt-auto">
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-emerald-50 shrink-0 border border-emerald-100 flex items-center justify-center p-1">
                                        <Image
                                            src={getAvatarByName(t.name)}
                                            alt={t.name}
                                            width={44}
                                            height={44}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm md:text-base">
                                            {t.name}
                                        </h4>
                                        <p className="text-xs text-emerald-700 font-medium">
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
