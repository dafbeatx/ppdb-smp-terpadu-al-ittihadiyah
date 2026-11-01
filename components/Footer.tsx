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

    return (
        <footer className="bg-gray-900 text-white pt-10 pb-6 md:pt-16 md:pb-8 border-t border-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 mb-8 md:mb-12">
                    {/* Brand & Description */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4 sm:space-y-6">
                        <div className="flex flex-col items-center md:flex-row md:items-center gap-2.5 sm:gap-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white p-1.5 shrink-0 flex items-center justify-center">
                                <Image
                                    src="/logo.webp"
                                    alt="Logo SMP Terpadu Al-Ittihadiyah"
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <h3 className="font-bold text-lg sm:text-xl leading-tight">
                                SMP Terpadu <br className="hidden md:block" />
                                <span className="text-emerald-400 text-base sm:text-lg">Al-Ittihadiyah</span>
                            </h3>
                        </div>
                        <p className="text-gray-400 leading-relaxed text-xs sm:text-sm max-w-sm mx-auto md:mx-0">
                            {footer['footer.school_desc'] || 'Terwujudnya SMP Terpadu Al-Ittihadiyah yang Aktif, Kreatif, Bersih, Antusias, dan Religius (AKBAR).'}
                        </p>
                        <div className="flex items-center justify-center md:justify-start gap-3 sm:gap-4 pt-1 sm:pt-2">
                            <a
                                href={igLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-pink-600 transition-all duration-300 group"
                                title="Instagram"
                            >
                                <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 group-hover:text-white" />
                            </a>
                            <a
                                href={githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-300 group"
                                title="GitHub"
                            >
                                <Github className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 group-hover:text-white" />
                            </a>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4 sm:space-y-6">
                        <h4 className="text-base sm:text-lg font-semibold relative inline-block pb-2">
                            Kontak Kami
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 w-12 h-1 bg-green-500 rounded-full"></span>
                        </h4>
                        <ul className="w-full space-y-3 sm:space-y-4">
                            <li>
                                <a
                                    href={mapsLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center md:flex-row md:items-start gap-2.5 sm:gap-4 text-gray-400 hover:text-green-400 transition-colors group"
                                >
                                    <div className="p-2 bg-gray-800 rounded-lg md:bg-transparent md:p-0 shrink-0 group-hover:bg-gray-700 md:group-hover:bg-transparent transition-colors">
                                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 md:mt-1 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <span className="text-xs sm:text-sm leading-relaxed max-w-xs md:max-w-none">{address}</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href={waLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center md:flex-row md:items-center gap-2.5 sm:gap-4 text-gray-400 hover:text-green-400 transition-colors group"
                                >
                                    <div className="p-2 bg-gray-800 rounded-lg md:bg-transparent md:p-0 shrink-0 group-hover:bg-gray-700 md:group-hover:bg-transparent transition-colors">
                                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <span className="text-xs sm:text-sm font-medium">{phone}</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`mailto:${email}`}
                                    className="flex flex-col items-center md:flex-row md:items-center gap-2.5 sm:gap-4 text-gray-400 hover:text-green-400 transition-colors group"
                                >
                                    <div className="p-2 bg-gray-800 rounded-lg md:bg-transparent md:p-0 shrink-0 group-hover:bg-gray-700 md:group-hover:bg-transparent transition-colors">
                                        <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 shrink-0 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <span className="text-xs sm:text-sm font-medium break-all">{email}</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Operation Hours */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4 sm:space-y-6 w-full lg:w-auto">
                        <h4 className="text-base sm:text-lg font-semibold relative inline-block pb-2">
                            Jam Operasional
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 w-12 h-1 bg-green-500 rounded-full"></span>
                        </h4>
                        <div className="w-full bg-gray-800/50 p-4 sm:p-6 rounded-xl sm:rounded-2xl space-y-3 sm:space-y-4 border border-gray-700/50">
                            <div className="flex items-center justify-center md:justify-start gap-2.5">
                                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                                <span className="text-gray-300 text-xs sm:text-sm font-medium">Waktu Kerja</span>
                            </div>
                            <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
                                <li className="flex flex-col sm:flex-row justify-between text-gray-400 gap-1">
                                    <span>Senin - Jumat</span>
                                    <span className="text-white font-medium">{cleanHours(footer['footer.hours_weekday'], '07:30 - 16:00')}</span>
                                </li>
                                <li className="flex flex-col sm:flex-row justify-between text-gray-400 gap-1">
                                    <span>Sabtu</span>
                                    <span className="text-white font-medium">{cleanHours(footer['footer.hours_saturday'], '07:30 - 12:00')}</span>
                                </li>
                                <li className="flex flex-col sm:flex-row justify-between text-gray-400 gap-1">
                                    <span>Minggu</span>
                                    <span className="text-gray-500">{cleanHours(footer['footer.hours_sunday'], 'Libur')}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-gray-500 text-xs sm:text-sm text-center md:text-left">
                    <p>&copy; {new Date().getFullYear()} SMP Terpadu Al-Ittihadiyah. All rights reserved.</p>
                    <div className="flex items-center justify-center gap-4 sm:gap-6">
                        <Link href="/kebijakan-privasi" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
                        <Link href="/syarat-ketentuan" className="hover:text-white transition-colors">Syarat & Ketentuan</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
