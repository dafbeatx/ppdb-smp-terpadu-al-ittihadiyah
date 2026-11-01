'use client'

import Image from 'next/image'
import Card from '@/components/ui/Card'
import ScrollReveal from '@/components/ScrollReveal'

export default function PrincipalWelcome() {
    return (
        <section className="py-16 md:py-24 bg-[#f4f9f6]">
            <div className="container mx-auto px-6 md:px-12">
                <div className="max-w-6xl mx-auto">
                    <ScrollReveal direction="up">
                        <div className="flex flex-col md:flex-row items-center md:items-center gap-10 md:gap-16">
                            {/* Photo Column */}
                            <div className="w-full md:w-[280px] flex justify-center flex-shrink-0">
                                <Card className="overflow-hidden rounded-2xl border-none shadow-xl bg-white p-2 w-[240px] md:w-full">
                                    <div className="relative rounded-xl overflow-hidden aspect-[3/4]">
                                        <Image
                                            src="/kepala-sekolah.webp"
                                            alt="Kepala Sekolah SMP Terpadu Al-Ittihadiyah"
                                            fill
                                            sizes="(max-width: 768px) 240px, 280px"
                                            className="object-cover"
                                            priority
                                        />
                                    </div>
                                    <div className="px-4 py-5 text-center flex flex-col justify-center min-h-[90px]">
                                        <h3 className="text-base md:text-lg font-bold text-gray-900 leading-snug">
                                            Farhan Sopian Sahid, S.Pd.I
                                        </h3>
                                        <p className="text-sm text-green-700 font-semibold mt-1.5 uppercase tracking-wide">
                                            Kepala Sekolah
                                        </p>
                                    </div>
                                </Card>
                            </div>

                            {/* Text Column */}
                            <div className="w-full flex-1">
                                <div className="space-y-6 text-center md:text-left">
                                    <p className="text-emerald-800 font-semibold text-sm tracking-wider uppercase">
                                        Sambutan Kepala Sekolah
                                    </p>

                                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                                        Mencetak Generasi <span className="text-emerald-700">Unggul &amp; Berakhlak Mulia</span>
                                    </h2>

                                    <div className="space-y-5 text-gray-700 text-base md:text-lg leading-relaxed">
                                        <p className="font-semibold text-gray-900">
                                            Assalamu&apos;alaikum Warahmatullahi Wabarakatuh.
                                        </p>
                                        <p>
                                            Puji syukur kehadirat Allah SWT atas segala limpahan rahmat-Nya. Selamat datang di portal PPDB Online SMP Terpadu Al-Ittihadiyah. Kami sangat bangga dan antusias menyambut Bapak/Ibu serta calon peserta didik baru untuk bergabung dalam keluarga besar kami pada Tahun Ajaran 2026/2027.
                                        </p>
                                        <p>
                                            Di SMP Terpadu Al-Ittihadiyah, kami berkomitmen tidak hanya untuk memberikan pendidikan akademik yang berkualitas, tetapi juga membentuk karakter siswa yang berlandaskan nilai-nilai keislaman, disiplin, dan jiwa kepemimpinan. Kami percaya bahwa setiap anak memiliki potensi unik yang harus diasah dengan pendekatan yang tepat.
                                        </p>
                                        <p>
                                            Mari bersama-sama kita wujudkan masa depan putra-putri kita menjadi generasi yang tidak hanya cerdas secara intelektual, namun juga kokoh dalam akhlak dan iman. Terima kasih atas kepercayaan Bapak/Ibu kepada institusi kami.
                                        </p>
                                        <p className="font-bold text-gray-900 mt-6 pt-4 border-t border-emerald-100 md:border-none">
                                            Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    )
}
