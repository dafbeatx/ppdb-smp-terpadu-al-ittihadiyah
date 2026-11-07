import Image from 'next/image'
import Card from '@/components/ui/Card'
import ScrollReveal from '@/components/ScrollReveal'
import { getContentMap } from '@/lib/content'

export default async function PrincipalWelcome() {
    const content = await getContentMap('profile')

    const nama = content['sambutan.nama_kepsek']?.trim()
    const jabatan = content['sambutan.jabatan']?.trim() || 'Kepala Sekolah'
    const judul = content['sambutan.judul']?.trim()
    const isi = content['sambutan.isi']?.trim()

    // Jika admin belum mengisi sambutan di CMS, jangan tampilkan data dummy
    if (!isi && !nama) {
        return null
    }

    return (
        <section id="sambutan" className="pt-20 sm:pt-28 md:pt-36 pb-12 md:pb-20 bg-[#f4f9f6]">
            <div className="container mx-auto px-4 sm:px-6 md:px-12">
                <div className="max-w-6xl mx-auto">
                    <ScrollReveal direction="up">
                        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-16">
                            {/* Photo Column */}
                            <div className="w-full md:w-70 flex justify-center shrink-0">
                                <Card className="overflow-hidden rounded-2xl border-none shadow-xl bg-white p-2 w-50 sm:w-60 md:w-full">
                                    <div className="relative rounded-xl overflow-hidden aspect-3/4">
                                        <Image
                                            src="/kepala-sekolah.webp"
                                            alt={nama || 'Kepala Sekolah'}
                                            fill
                                            sizes="(max-width: 768px) 200px, 280px"
                                            className="object-cover"
                                            priority
                                        />
                                    </div>
                                    <div className="px-3 py-3.5 md:px-4 md:py-5 text-center flex flex-col justify-center min-h-17.5 md:min-h-22.5">
                                        <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 leading-snug">
                                            {nama}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-green-700 font-semibold mt-1 uppercase tracking-wide">
                                            {jabatan}
                                        </p>
                                    </div>
                                </Card>
                            </div>

                            {/* Text Column */}
                            <div className="w-full flex-1">
                                <div className="space-y-4 sm:space-y-6 text-center md:text-left">
                                    <p className="text-emerald-800 font-semibold text-xs sm:text-sm tracking-wider uppercase">
                                        Sambutan Kepala Sekolah
                                    </p>

                                    {judul && (
                                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-snug sm:leading-tight">
                                            {judul}
                                        </h2>
                                    )}

                                    <div className="space-y-3.5 sm:space-y-5 text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-line">
                                        {isi}
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
