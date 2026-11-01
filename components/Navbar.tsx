'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
    Menu,
    X,
    ChevronDown,
    LayoutDashboard,
    FileText,
    LogOut,
    ShieldCheck,
    BookOpen,
    Building2,
    Newspaper,
    ClipboardCheck,
    UserCheck,
    HelpCircle
} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'

// Struktur Navigasi Multi-Layer Sekolah
interface NavSubItem {
    name: string
    href: string
    description?: string
    icon?: React.ComponentType<{ className?: string }>
}

interface NavItem {
    name: string
    href?: string
    items?: NavSubItem[]
}

const NAVIGATION_MENU: NavItem[] = [
    {
        name: 'Beranda',
        href: '/',
    },
    {
        name: 'Profil Sekolah',
        items: [
            {
                name: 'Sejarah & Perjalanan',
                href: '/sejarah',
                description: 'Latar belakang pendirian & ikhtiar kami',
                icon: BookOpen,
            },
            {
                name: 'Visi & Misi (AKBAR)',
                href: '/#visi-misi',
                description: 'Haluan & pilar karakter sekolah',
                icon: UserCheck,
            },
            {
                name: 'Sambutan Kepala Sekolah',
                href: '/#profil',
                description: 'Pesan pimpinan kepada orang tua',
                icon: ShieldCheck,
            },
            {
                name: 'Fasilitas & Kampus',
                href: '/fasilitas',
                description: 'Sarana kelas, masjid & lingkungan belajar',
                icon: Building2,
            },
        ],
    },
    {
        name: 'Akademik',
        items: [
            {
                name: 'Keunggulan Pembiasaan',
                href: '/#keunggulan',
                description: 'Sholat berjamaah & adab santun harian',
                icon: ShieldCheck,
            },
            {
                name: 'Program Bimbingan Tahfidz',
                href: '/#keunggulan',
                description: 'Hafalan Qur\'an ramah anak & tartil',
                icon: BookOpen,
            },
            {
                name: 'Karakter Santri AKBAR',
                href: '/#visi-misi',
                description: 'Aktif, Kreatif, Bersih, Antusias, Religius',
                icon: UserCheck,
            },
        ],
    },
    {
        name: 'Informasi',
        items: [
            {
                name: 'Kabar & Berita Sekolah',
                href: '/berita',
                description: 'Dokumentasi kegiatan santri & prestasi',
                icon: Newspaper,
            },
            {
                name: 'Kisah Orang Tua',
                href: '/#testimoni',
                description: 'Pengalaman nyata wali murid kami',
                icon: UserCheck,
            },
            {
                name: 'Syarat & Ketentuan',
                href: '/syarat-ketentuan',
                description: 'Ketentuan pendaftaran & berkas',
                icon: ClipboardCheck,
            },
        ],
    },
    {
        name: 'SPMB Online',
        items: [
            {
                name: 'Alur & Panduan Daftar',
                href: '/#alur',
                description: 'Panduan mudah 4 langkah lewat HP',
                icon: HelpCircle,
            },
            {
                name: 'Formulir Siswa Baru',
                href: '/daftar',
                description: 'Pendaftaran online resmi 2026/2027',
                icon: ClipboardCheck,
            },
        ],
    },
]

export default function Navbar() {
    const pathname = usePathname()
    const router = useRouter()
    const isDaftarPage = pathname === '/daftar'
    const isHidden = pathname?.startsWith('/admin') || pathname === '/login'

    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [openDropdown, setOpenDropdown] = useState<string | null>(null)
    const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({})

    const [isAdmin, setIsAdmin] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('is_admin_mode') === 'true'
        }
        return false
    })

    const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    // Handle hover dropdown desktop with small delay to avoid accidental closes
    const handleMouseEnter = (name: string) => {
        if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current)
        setOpenDropdown(name)
    }

    const handleMouseLeave = () => {
        dropdownTimeoutRef.current = setTimeout(() => {
            setOpenDropdown(null)
        }, 150)
    }

    // Toggle mobile accordion
    const toggleMobileSection = (name: string) => {
        setMobileExpanded((prev) => ({
            ...prev,
            [name]: !prev[name],
        }))
    }

    useEffect(() => {
        const supabase = createClient()
        let isMounted = true

        const verifyAdmin = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession()
                if (!session?.user?.email) {
                    if (isMounted) {
                        setIsAdmin(false)
                        localStorage.removeItem('is_admin_mode')
                    }
                    return
                }

                const normalizedEmail = session.user.email.toLowerCase().trim()
                const { data: adminData } = await supabase
                    .from('admin_users')
                    .select('id')
                    .ilike('email', normalizedEmail)
                    .maybeSingle()

                if (isMounted) {
                    const adminActive = !!adminData
                    setIsAdmin(adminActive)
                    if (adminActive) {
                        localStorage.setItem('is_admin_mode', 'true')
                    } else {
                        localStorage.removeItem('is_admin_mode')
                    }
                }
            } catch {
                if (isMounted) {
                    setIsAdmin(false)
                    localStorage.removeItem('is_admin_mode')
                }
            }
        }

        verifyAdmin()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!session) {
                if (isMounted) {
                    setIsAdmin(false)
                    localStorage.removeItem('is_admin_mode')
                }
            } else {
                verifyAdmin()
            }
        })

        return () => {
            isMounted = false
            subscription.unsubscribe()
        }
    }, [])

    useEffect(() => {
        if (isHidden) return
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [isHidden])

    const logoTapCountRef = useRef(0)
    const logoTapTimerRef = useRef<NodeJS.Timeout | null>(null)

    // Shortcut keyboard tersembunyi: Ctrl + Shift + A (atau Cmd + Shift + A pada Mac) untuk akses admin
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
                e.preventDefault()
                router.push('/login')
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [router])

    // Ketuk logo 5x berturut-turut untuk akses admin (sangat praktis di smartphone)
    const handleLogoClick = (e: React.MouseEvent) => {
        logoTapCountRef.current += 1
        if (logoTapTimerRef.current) clearTimeout(logoTapTimerRef.current)

        if (logoTapCountRef.current >= 5) {
            e.preventDefault()
            logoTapCountRef.current = 0
            router.push('/login')
            return
        }

        logoTapTimerRef.current = setTimeout(() => {
            logoTapCountRef.current = 0
        }, 2000)
    }

    const handleLogout = async () => {
        try {
            const supabase = createClient()
            await supabase.auth.signOut()
            localStorage.removeItem('is_admin_mode')
            setIsAdmin(false)
            setIsMobileMenuOpen(false)
            router.push('/')
            router.refresh()
        } catch (e) {
            console.error('Logout error:', e)
        }
    }

    if (isHidden) return null

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-emerald-900/95 backdrop-blur-md py-2 shadow-lg border-b border-emerald-800/40"
                    : "bg-emerald-900 md:bg-transparent py-3 md:py-4"
            )}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-14 md:h-16">
                    {/* Logo & Brand (Ketuk 5x untuk akses login admin di smartphone) */}
                    <Link
                        href="/"
                        onClick={handleLogoClick}
                        className="flex items-center gap-2 sm:gap-2.5 md:gap-3 group shrink-0 select-none"
                    >
                        <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl bg-white p-1 shrink-0 flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-105">
                            <Image
                                src="/logo.webp"
                                alt="Logo SMP Al-Ittihadiyah"
                                width={44}
                                height={44}
                                className="w-full h-full object-contain"
                                priority
                            />
                        </div>
                        <div className="min-w-0">
                            <div className="font-bold text-xs sm:text-sm md:text-base text-white leading-tight truncate">
                                SMP Terpadu Al-Ittihadiyah
                            </div>
                            <div className="text-[9px] sm:text-[10px] md:text-xs text-amber-300 font-semibold tracking-wide">
                                {isAdmin ? 'Panel Kontrol Admin' : 'Ciampea, Bogor • Portal Resmi'}
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Navigation with Multi-layer Dropdowns */}
                    <div className="hidden lg:flex items-center gap-1">
                        {NAVIGATION_MENU.map((item) => {
                            if (!item.items) {
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href || '/'}
                                        className="px-3.5 py-2 rounded-xl text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                )
                            }

                            const isDropdownOpen = openDropdown === item.name

                            return (
                                <div
                                    key={item.name}
                                    className="relative"
                                    onMouseEnter={() => handleMouseEnter(item.name)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <button
                                        type="button"
                                        className={cn(
                                            "flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-colors",
                                            isDropdownOpen
                                                ? "bg-white/15 text-white"
                                                : "text-white/90 hover:text-white hover:bg-white/10"
                                        )}
                                        aria-expanded={isDropdownOpen}
                                    >
                                        <span>{item.name}</span>
                                        <ChevronDown
                                            className={cn(
                                                "w-4 h-4 transition-transform duration-200 opacity-80",
                                                isDropdownOpen && "rotate-180"
                                            )}
                                        />
                                    </button>

                                    {/* Desktop Dropdown Panel */}
                                    <AnimatePresence>
                                        {isDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 6, scale: 0.98 }}
                                                transition={{ duration: 0.15 }}
                                                className="absolute top-full left-0 mt-1.5 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50"
                                            >
                                                <div className="space-y-1">
                                                    {item.items.map((sub) => {
                                                        const SubIcon = sub.icon
                                                        return (
                                                            <Link
                                                                key={sub.name}
                                                                href={sub.href}
                                                                onClick={() => setOpenDropdown(null)}
                                                                className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-emerald-50 text-gray-800 transition-colors group"
                                                            >
                                                                {SubIcon && (
                                                                    <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-800 group-hover:bg-emerald-100 shrink-0 mt-0.5">
                                                                        <SubIcon className="w-4 h-4" />
                                                                    </div>
                                                                )}
                                                                <div className="min-w-0">
                                                                    <div className="text-sm font-bold text-gray-900 group-hover:text-emerald-800 leading-snug">
                                                                        {sub.name}
                                                                    </div>
                                                                    {sub.description && (
                                                                        <div className="text-xs text-gray-500 leading-tight mt-0.5 truncate">
                                                                            {sub.description}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </Link>
                                                        )
                                                    })}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )
                        })}
                    </div>

                    {/* Action Buttons Area */}
                    <div className="flex items-center gap-2 md:gap-3">
                        {isAdmin ? (
                            /* Mode Admin Aktif */
                            <div className="hidden sm:flex items-center gap-2">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-800/80 text-amber-300 border border-emerald-600">
                                    <ShieldCheck className="w-3.5 h-3.5" />
                                    Mode Admin
                                </span>
                                <Link href="/admin">
                                    <Button
                                        size="sm"
                                        className="bg-white text-emerald-900 hover:bg-emerald-50 border border-white font-bold shadow-xs flex items-center gap-1.5"
                                    >
                                        <LayoutDashboard className="w-4 h-4" />
                                        Dashboard
                                    </Button>
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleLogout}
                                    className="font-medium text-white hover:bg-red-500/20 hover:text-red-200 flex items-center gap-1.5"
                                    title="Keluar dari Admin"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Keluar
                                </Button>
                            </div>
                        ) : (
                            /* Pengunjung Umum: Hanya tombol pendaftaran */
                            <>
                                {!isDaftarPage && (
                                    <Link href="/daftar">
                                        <Button size="sm" className="shadow-md font-bold text-xs sm:text-sm px-2.5 sm:px-4 py-1.5 sm:py-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 border-none transition-colors">
                                            <span className="inline sm:hidden">Daftar</span>
                                            <span className="hidden sm:inline">Daftar Siswa Baru</span>
                                        </Button>
                                    </Link>
                                )}
                            </>
                        )}

                        {/* Mobile Menu Toggle Button */}
                        <button
                            type="button"
                            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-xl transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle navigation menu"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white border-t border-slate-100 shadow-2xl overflow-hidden max-h-[85vh] overflow-y-auto"
                    >
                        <div className="container mx-auto px-4 py-5 space-y-3">
                            {isAdmin && (
                                <div className="px-3.5 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between mb-2">
                                    <span className="flex items-center gap-2 text-xs font-bold text-emerald-900 uppercase tracking-wide">
                                        <ShieldCheck className="w-4 h-4 text-emerald-700" />
                                        Mode Admin Aktif
                                    </span>
                                    <Link
                                        href="/admin"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-xs font-bold text-emerald-800 underline"
                                    >
                                        Buka Dashboard
                                    </Link>
                                </div>
                            )}

                            {/* Mobile Accordion Menu */}
                            <div className="space-y-1">
                                {NAVIGATION_MENU.map((item) => {
                                    if (!item.items) {
                                        return (
                                            <Link
                                                key={item.name}
                                                href={item.href || '/'}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="block px-3.5 py-2.5 rounded-xl text-base font-semibold text-gray-800 hover:bg-slate-50 transition-colors"
                                            >
                                                {item.name}
                                            </Link>
                                        )
                                    }

                                    const isExpanded = !!mobileExpanded[item.name]

                                    return (
                                        <div key={item.name} className="border-b border-slate-100 pb-1">
                                            <button
                                                type="button"
                                                onClick={() => toggleMobileSection(item.name)}
                                                className="w-full flex items-center justify-between px-3.5 py-2.5 text-base font-semibold text-gray-800 hover:text-emerald-800 transition-colors text-left"
                                            >
                                                <span>{item.name}</span>
                                                <ChevronDown
                                                    className={cn(
                                                        "w-4 h-4 text-gray-400 transition-transform duration-200",
                                                        isExpanded && "rotate-180 text-emerald-700"
                                                    )}
                                                />
                                            </button>

                                            {isExpanded && (
                                                <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50/60 rounded-xl mb-1">
                                                    {item.items.map((sub) => (
                                                        <Link
                                                            key={sub.name}
                                                            href={sub.href}
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                            className="block py-2 px-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-emerald-100/50 hover:text-emerald-900 transition-colors"
                                                        >
                                                            <div className="font-bold">{sub.name}</div>
                                                            {sub.description && (
                                                                <div className="text-xs text-gray-500 mt-0.5">{sub.description}</div>
                                                            )}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>

                            {/* Mobile Action Controls */}
                            <div className="pt-3 border-t border-slate-100 space-y-2">
                                {isAdmin ? (
                                    <>
                                        <Link
                                            href="/admin/content"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-slate-50"
                                        >
                                            <FileText className="w-4 h-4 text-gray-500" />
                                            Edit Konten Website (CMS)
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 text-left"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Keluar dari Admin
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        {!isDaftarPage && (
                                            <Link
                                                href="/daftar"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="block w-full py-3 px-4 rounded-xl text-center font-bold text-sm bg-amber-400 text-emerald-950 shadow-sm"
                                            >
                                                Daftar Siswa Baru Sekarang
                                            </Link>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
