import { Target, Eye, CheckCircle2, Compass, Sparkles } from 'lucide-react'
import { getContentMap } from '@/lib/content'
import ScrollReveal from '@/components/ScrollReveal'

export default async function VisiMisi() {
    const content = await getContentMap('visi_misi')

    const title = content['visi_misi.title'] || 'Visi & Misi Sekolah'
    const subtitle = content['visi_misi.subtitle'] || 'Komitmen nyata kami dalam mendidik generasi aktif, cerdas, berkarakter, dan berakhlak mulia'
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
    ).filter((item): item is string => Boolean(item))

    const misiItems = fetchedMisi.length > 0 ? fetchedMisi : defaultMisi

    // 5 Pilar Karakter AKBAR dari singkatan resmi sekolah
    const akbarPillars = [
        { letter: 'A', word: 'Aktif', desc: 'Optimal beraktivitas & berkarya' },
        { letter: 'K', word: 'Kreatif', desc: 'Asah keterampilan & prestasi' },
        { letter: 'B', word: 'Bersih', desc: 'Cinta kebersihan lahir & batin' },
        { letter: 'A', word: 'Antusias', desc: 'Semangat kemajuan iptek' },
        { letter: 'R', word: 'Religius', desc: 'Penghayatan ajaran Islam' },
    ]

    return (
        <section id="visi-misi" className="py-16 md:py-24 bg-linear-to-b from-white via-emerald-50/30 to-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}
                    <ScrollReveal direction="up">
                        <div className="text-center mb-14">
                            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider mb-3">
                                <Compass className="w-4 h-4 text-emerald-600" />
                                <span>Arah & Tujuan Kami</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                                {title}
                            </h2>
                            <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                                {subtitle}
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                        {/* Kolom Visi (kiri) */}
                        <div className="lg:col-span-5 h-full">
                            <ScrollReveal direction="right" delay={0.2} className="h-full">
                                <div className="h-full bg-linear-to-br from-emerald-800 via-emerald-700 to-green-900 text-white rounded-3xl p-7 md:p-9 shadow-xl shadow-emerald-950/15 border border-emerald-600/30 flex flex-col justify-between relative overflow-hidden group">
                                    {/* Ambient glow backgrounds */}
                                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-60 h-60 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
                                    <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-60 h-60 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />

                                    <div className="relative z-10">
                                        {/* Header Pill Visi (kuning keemasan khas spanduk sekolah) */}
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="inline-flex items-center gap-2 bg-linear-to-r from-amber-400 via-yellow-400 to-amber-400 text-emerald-950 px-6 py-2 rounded-full font-black text-lg md:text-xl shadow-md tracking-wider">
                                                <Eye className="w-5 h-5 text-emerald-950" />
                                                <span>VISI</span>
                                            </div>
                                            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-200/90 bg-emerald-900/60 px-3 py-1 rounded-full border border-emerald-500/30">
                                                SMP Terpadu
                                            </span>
                                        </div>

                                        {/* Teks Visi */}
                                        <div className="relative my-4">
                                            <span className="text-6xl text-amber-300/30 font-serif leading-none absolute -top-4 -left-2 select-none">
                                                “
                                            </span>
                                            <p className="text-white text-lg md:text-xl font-medium leading-relaxed italic pl-6 border-l-2 border-amber-400/60">
                                                {visi}
                                            </p>
                                        </div>
                                    </div>

                                    {/* 5 Pilar Karakter AKBAR */}
                                    <div className="relative z-10 mt-8 pt-6 border-t border-emerald-600/50">
                                        <div className="flex items-center gap-2 mb-3.5">
                                            <Sparkles className="w-4 h-4 text-amber-300" />
                                            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                                                5 Pilar Karakter AKBAR
                                            </h4>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                            {akbarPillars.map((p, idx) => (
                                                <div
                                                    key={p.letter}
                                                    className={`bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-colors p-2.5 rounded-xl border border-white/10 flex items-start gap-2.5 ${
                                                        idx === 4 ? 'sm:col-span-2' : ''
                                                    }`}
                                                >
                                                    <div className="w-6 h-6 rounded-lg bg-amber-400 text-emerald-950 font-black flex items-center justify-center shrink-0 text-xs shadow-sm">
                                                        {p.letter}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="font-bold text-white leading-tight">{p.word}</p>
                                                        <p className="text-emerald-100/70 text-[11px] leading-tight truncate">{p.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* Kolom Misi (kanan) */}
                        <div className="lg:col-span-7 h-full">
                            <ScrollReveal direction="left" delay={0.2} className="h-full">
                                <div className="h-full bg-white rounded-3xl p-7 md:p-9 shadow-xl shadow-slate-200/60 border border-slate-100 flex flex-col justify-between relative overflow-hidden">
                                    {/* Top decorative accent bar */}
                                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-emerald-600 via-amber-400 to-emerald-700" />

                                    <div>
                                        {/* Header Pill Misi (kuning keemasan khas spanduk sekolah) */}
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="inline-flex items-center gap-2 bg-linear-to-r from-amber-400 via-yellow-400 to-amber-400 text-emerald-950 px-6 py-2 rounded-full font-black text-lg md:text-xl shadow-md tracking-wider">
                                                <Target className="w-5 h-5 text-emerald-950" />
                                                <span>MISI</span>
                                            </div>
                                            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                                                6 Komitmen Utama
                                            </span>
                                        </div>

                                        {/* Daftar Misi dengan centang keemasan mirip spanduk resmi */}
                                        <div className="space-y-3">
                                            {misiItems.map((item, index) => (
                                                <div
                                                    key={`misi-${index + 1}`}
                                                    className="group flex items-start gap-3.5 p-3 rounded-2xl hover:bg-emerald-50/50 transition-all duration-200 border-b border-dashed border-slate-100 last:border-b-0"
                                                >
                                                    {/* Centang Keemasan */}
                                                    <div className="w-7 h-7 rounded-full bg-amber-100 border border-amber-300 text-amber-700 flex items-center justify-center shrink-0 mt-0.5 shadow-sm group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-emerald-950 transition-all duration-200">
                                                        <CheckCircle2 className="w-4 h-4" />
                                                    </div>

                                                    <div className="flex-1">
                                                        <p className="text-gray-800 text-sm md:text-base leading-relaxed font-medium">
                                                            {item}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Footer Catatan */}
                                    <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
                                        <span className="flex items-center gap-1.5 font-medium text-emerald-700">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                            {'Berlandaskan Al-Qur\'an & As-Sunnah'}
                                        </span>
                                        <span className="font-semibold text-gray-400">SMP Terpadu Al-Ittihadiyah</span>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
