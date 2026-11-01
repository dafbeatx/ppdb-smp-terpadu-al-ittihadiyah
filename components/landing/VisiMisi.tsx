import Card from '@/components/ui/Card'
import { Target, Eye } from 'lucide-react'
import { getContentMap } from '@/lib/content'
import ScrollReveal from '@/components/ScrollReveal'

export default async function VisiMisi() {
    const content = await getContentMap('visi_misi')

    const title = content['visi_misi.title'] || 'Visi & Misi'
    const subtitle = content['visi_misi.subtitle'] || 'Arah dan tujuan pendidikan kami'
    const visi = content['visi_misi.visi'] || 'Terciptanya SMP Terpadu Al Ittihadiyah yang aktif, Kreatif, Bersih, Antusias dan Religius (AKBAR) di Tahun 2024'

    // Ambil item misi secara dinamis (misi_1 s/d misi_n) terurut
    const misiKeys = Object.keys(content)
        .filter((key) => key.startsWith('visi_misi.misi_'))
        .sort((a, b) => {
            const numA = parseInt(a.replace('visi_misi.misi_', ''), 10) || 0
            const numB = parseInt(b.replace('visi_misi.misi_', ''), 10) || 0
            return numA - numB
        })

    const defaultMisi = [
        'Mendorong aktivitas dan kreatifitas secara optimal kepada seluruh komponen sekolah terutama siswa.',
        'Mengoptimalkan pembelajaran dalam jangka meningkatkan keterampilan siswa supaya mereka memiliki prestasi yang dapat dibanggakan.',
        'Melaksanakan pembelajaran dan bimbingan secara efektif sehingga kecerdasan siswa terus diasah agar tercapainya kecerdasan intelektual dan emosional yang mantap.',
        'Menanamkan cinta kebersihan dan keindahan kepada semua komponen sekolah.',
        'Antusias terhadap perkembangan dan kemajuan ilmu pengetahuan dan tekhnologi.',
        'Menimbulkan penghayatan yang dalam dan pengalaman yang tinggi terhadap ajaran agama (religi) sehingga tercipta kematangan dalam berpikir dan bertindak.',
    ]

    const fetchedMisi = (misiKeys.length > 0
        ? misiKeys.map((k) => content[k])
        : [
            content['visi_misi.misi_1'],
            content['visi_misi.misi_2'],
            content['visi_misi.misi_3'],
            content['visi_misi.misi_4'],
            content['visi_misi.misi_5'],
            content['visi_misi.misi_6'],
        ]
    ).filter(Boolean)

    const misiItems = fetchedMisi.length > 0 ? fetchedMisi : defaultMisi

    return (
        <section id="visi-misi" className="py-16 md:py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal direction="up">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                {title}
                            </h2>
                            <p className="text-lg text-gray-600">
                                {subtitle}
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <ScrollReveal direction="right" delay={0.2}>
                            <Card className="p-8 border-l-4 border-green-600 md:hover:shadow-xl md:hover:border-l-8 transition-all duration-300 h-full flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center mb-6">
                                        <div className="bg-green-100 p-3 rounded-lg mr-4">
                                            <Eye className="w-8 h-8 text-green-600" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900">Visi</h3>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed text-lg italic">
                                        &ldquo;{visi}&rdquo;
                                    </p>
                                </div>

                                {/* Pilar Karakter AKBAR */}
                                <div className="mt-8 pt-6 border-t border-gray-100">
                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                                        Pilar Karakter AKBAR:
                                    </h4>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                                        <div className="bg-green-50 border border-green-100 px-3 py-2 rounded-xl text-green-900 font-medium flex items-center gap-1.5">
                                            <span className="font-bold text-green-700 bg-green-200/60 w-5 h-5 rounded-md flex items-center justify-center text-xs">A</span>
                                            <span>Aktif</span>
                                        </div>
                                        <div className="bg-green-50 border border-green-100 px-3 py-2 rounded-xl text-green-900 font-medium flex items-center gap-1.5">
                                            <span className="font-bold text-green-700 bg-green-200/60 w-5 h-5 rounded-md flex items-center justify-center text-xs">K</span>
                                            <span>Kreatif</span>
                                        </div>
                                        <div className="bg-green-50 border border-green-100 px-3 py-2 rounded-xl text-green-900 font-medium flex items-center gap-1.5">
                                            <span className="font-bold text-green-700 bg-green-200/60 w-5 h-5 rounded-md flex items-center justify-center text-xs">B</span>
                                            <span>Bersih</span>
                                        </div>
                                        <div className="bg-green-50 border border-green-100 px-3 py-2 rounded-xl text-green-900 font-medium flex items-center gap-1.5">
                                            <span className="font-bold text-green-700 bg-green-200/60 w-5 h-5 rounded-md flex items-center justify-center text-xs">A</span>
                                            <span>Antusias</span>
                                        </div>
                                        <div className="bg-green-50 border border-green-100 px-3 py-2 rounded-xl text-green-900 font-medium flex items-center gap-1.5 col-span-2 sm:col-span-2">
                                            <span className="font-bold text-green-700 bg-green-200/60 w-5 h-5 rounded-md flex items-center justify-center text-xs">R</span>
                                            <span>Religius</span>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </ScrollReveal>

                        <ScrollReveal direction="left" delay={0.2}>
                            <Card className="p-8 border-l-4 border-blue-600 md:hover:shadow-xl md:hover:border-l-8 transition-all duration-300 h-full">
                                <div className="flex items-center mb-6">
                                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                                        <Target className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">Misi</h3>
                                </div>
                                <ul className="space-y-4 text-gray-700 text-base md:text-lg">
                                    {misiItems.map((item, index) => (
                                        <li key={index} className="flex items-start group">
                                            <span className="text-blue-600 font-bold mr-3 bg-blue-50 w-8 h-8 rounded-full flex items-center justify-center text-sm group-hover:scale-110 transition-transform shrink-0 mt-0.5">{index + 1}</span>
                                            <span className="flex-1 leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </section>
    )
}
