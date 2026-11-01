import { getContentMap } from '@/lib/content'
import { MapPin, Phone, Mail, Instagram, Github, Clock } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default async function Footer() {
    // Fetch footer content from CMS
    const footer = await getContentMap('footer')

    const address = footer['footer.address'] || 'Jl. Raya Cikampak No. 296 / Kp. Pasar Salasa RT 03/RW 01, Desa Ciampea Udik, Kecamatan Ciampea, Kabupaten Bogor, Jawa Barat 16620.'
    const phone = footer['footer.phone'] || '+62 819-4767-4100'
    const email = footer['footer.email'] || 'ppdbassalaam@gmail.com'

    // Sanitize phone for WhatsApp link
    const waPhone = phone.replace(/\D/g, '')
    const waLink = `https://wa.me/${waPhone.startsWith('0') ? '62' + waPhone.slice(1) : waPhone}`
    const mapsLink = 'https://share.google/4gGhSkEPrRiBHSBB5'
    const igLink = 'https://www.instagram.com/smpterpadu_alittihadiyah/'
    const githubLink = 'https://github.com/dafbeatx/PPDB-SMP-Terpadu-Al-Ittihadiyah'

    // Clean hours string from redundant day prefixes
    const cleanHours = (val: string | undefined, defaultVal: string) => {
        if (!val) return defaultVal
        return val.replace(/^(Senin\s*-\s*Jumat|Sabtu|Minggu)\s*:\s*/i, '').trim() || defaultVal
    }

    const schoolDesc = footer['footer.school_desc']?.trim() || ''

    const hasHours = Boolean(
        footer['footer.hours_weekday']?.trim() ||
        footer['footer.hours_saturday']?.trim() ||
        footer['footer.hours_sunday']?.trim()
    )

    return (
        <footer className="bg-gray-900 text-white pt-10 pb-8 border-t border-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`grid grid-cols-1 md:grid-cols-2 ${hasHours ? 'lg:grid-cols-3' : ''} gap-8 md:gap-10 lg:gap-12 mb-8`}>
                    {/* Brand & Description */}
                    <div className="flex flex-col items-start text-left space-y-3.5 sm:space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl bg-white p-1.5 shrink-0 flex items-center justify-center shadow-sm">
                                <Image
                                    src="/logo.webp"
                                    alt="Logo SMP Terpadu Al-Ittihadiyah"
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div>
                                <h3 className="font-bold text-base sm:text-lg text-white leading-tight">
                                    SMP Terpadu Al-Ittihadiyah
                                </h3>
                                <p className="text-xs text-amber-300 font-medium mt-0.5">
                                    Ciampea, Bogor • Portal Resmi
                                </p>
                            </div>
                        </div>

                        {schoolDesc && (
                            <p className="text-gray-400 leading-relaxed text-xs sm:text-sm">
                                {schoolDesc}
                            </p>
                        )}

                        <div className="flex items-center gap-3 pt-1">
                            <a
                                href={igLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-800 hover:bg-pink-600 transition-colors text-gray-300 hover:text-white"
                                title="Instagram Resmi"
                            >
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a
                                href={githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors text-gray-300 hover:text-white"
                                title="Repository Project"
                            >
                                <Github className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Contact Info (Tetap ada sesuai permintaan user) */}
                    <div className="flex flex-col items-start text-left space-y-3.5 sm:space-y-4">
                        <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <span className="w-1.5 h-4 bg-emerald-500 rounded-full"></span>
                            Kontak &amp; Alamat
                        </h4>
                        <ul className="w-full space-y-3">
                            <li>
                                <a
                                    href={mapsLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start gap-3 text-gray-300 hover:text-emerald-400 transition-colors group"
                                >
                                    <div className="p-2 bg-gray-800 rounded-xl shrink-0 group-hover:bg-gray-700 transition-colors mt-0.5">
                                        <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                                    </div>
                                    <span className="text-xs sm:text-sm leading-relaxed">{address}</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href={waLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-gray-300 hover:text-emerald-400 transition-colors group"
                                >
                                    <div className="p-2 bg-gray-800 rounded-xl shrink-0 group-hover:bg-gray-700 transition-colors">
                                        <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                                    </div>
                                    <span className="text-xs sm:text-sm font-medium">{phone}</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`mailto:${email}`}
                                    className="flex items-center gap-3 text-gray-300 hover:text-emerald-400 transition-colors group"
                                >
                                    <div className="p-2 bg-gray-800 rounded-xl shrink-0 group-hover:bg-gray-700 transition-colors">
                                        <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                                    </div>
                                    <span className="text-xs sm:text-sm font-medium break-all">{email}</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Operation Hours: Hanya muncul jika admin mengisi jam kerja di CMS */}
                    {hasHours && (
                        <div className="flex flex-col items-start text-left space-y-3.5 sm:space-y-4 w-full">
                            <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                <span className="w-1.5 h-4 bg-emerald-500 rounded-full"></span>
                                Jam Operasional
                            </h4>
                            <div className="w-full bg-gray-800/60 p-4 sm:p-5 rounded-2xl border border-gray-700/60 space-y-3">
                                <div className="flex items-center gap-2 pb-2.5 border-b border-gray-700/60">
                                    <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                                    <span className="text-xs sm:text-sm font-semibold text-white">Waktu Layanan SPMB</span>
                                </div>
                                <div className="space-y-2 text-xs sm:text-sm">
                                    {footer['footer.hours_weekday'] && (
                                        <div className="flex items-center justify-between py-1 border-b border-gray-700/30">
                                            <span className="text-gray-400">Senin - Jumat</span>
                                            <span className="text-emerald-400 font-semibold">{cleanHours(footer['footer.hours_weekday'], '')}</span>
                                        </div>
                                    )}
                                    {footer['footer.hours_saturday'] && (
                                        <div className="flex items-center justify-between py-1 border-b border-gray-700/30">
                                            <span className="text-gray-400">Sabtu</span>
                                            <span className="text-emerald-400 font-semibold">{cleanHours(footer['footer.hours_saturday'], '')}</span>
                                        </div>
                                    )}
                                    {footer['footer.hours_sunday'] && (
                                        <div className="flex items-center justify-between py-1">
                                            <span className="text-gray-400">Minggu / Libur</span>
                                            <span className="text-gray-500 font-medium">{cleanHours(footer['footer.hours_sunday'], '')}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-5 mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-gray-500 text-xs text-center sm:text-left">
                    <p>&copy; {new Date().getFullYear()} SMP Terpadu Al-Ittihadiyah. Hak cipta dilindungi.</p>
                    <div className="flex items-center justify-center gap-3 sm:gap-4 text-gray-400">
                        <Link href="/kebijakan-privasi" className="hover:text-emerald-400 transition-colors">Kebijakan Privasi</Link>
                        <span>•</span>
                        <Link href="/syarat-ketentuan" className="hover:text-emerald-400 transition-colors">Syarat &amp; Ketentuan</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
