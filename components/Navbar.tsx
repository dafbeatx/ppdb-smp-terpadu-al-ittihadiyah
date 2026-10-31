'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, LayoutDashboard, FileText, LogOut, ShieldCheck } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'

const NAV_LINKS = [
    { name: 'Beranda', href: '/#hero' },
    { name: 'Profil', href: '/#profil' },
    { name: 'Visi & Misi', href: '/#visi-misi' },
    { name: 'Keunggulan', href: '/#keunggulan' },
    { name: 'Testimoni', href: '/#testimoni' },
    { name: 'Alur', href: '/#alur' },
]

export default function Navbar() {
    const pathname = usePathname()
    const router = useRouter()
    const isDaftarPage = pathname === '/daftar'
    const isHidden = pathname?.startsWith('/admin') || pathname === '/login'

    const [activeSection, setActiveSection] = useState('hero')
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        // Cek localStorage segera untuk mencegah kedipan UI (flicker)
        if (typeof window !== 'undefined' && localStorage.getItem('is_admin_mode') === 'true') {
            setIsAdmin(true)
        }

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

        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0,
        }

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id)
                }
            })
        }

        const observer = new IntersectionObserver(observerCallback, observerOptions)
        const sections = document.querySelectorAll('section[id]')
        sections.forEach((section) => observer.observe(section))

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            sections.forEach((section) => observer.unobserve(section))
        }
    }, [isHidden])

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
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-none shadow-none",
                isScrolled
                    ? "bg-green-700 py-1.5 shadow-lg"
                    : "bg-transparent py-4"
            )}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo & Brand */}
                    <Link href="/" className="flex items-center gap-2 md:gap-3 group">
                        <div className="relative overflow-hidden rounded-lg">
                            <Image
                                src="/logo.webp"
                                alt="Logo SMP Al-Ittihadiyah"
                                width={48}
                                height={48}
                                className="w-10 h-10 md:w-12 md:h-12 object-contain transition-transform duration-500 group-hover:scale-110"
                                priority
                            />
                        </div>
                        <div className="hidden sm:block">
                            <div className={cn(
                                "font-bold text-sm md:text-base leading-tight transition-colors",
                                isScrolled ? "text-white" : "text-white"
                            )}>SMP Terpadu Al-Ittihadiyah</div>
                            <div className="text-[10px] md:text-xs text-green-300 font-semibold uppercase tracking-wider">
                                {isAdmin ? 'Panel Kontrol Admin' : 'PPDB Online 2026/2027'}
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                                    activeSection === link.href.slice(1)
                                        ? "bg-white/20 text-white"
                                        : "text-white/90 hover:text-white hover:bg-white/10"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 md:gap-3">
                        {isAdmin ? (
                            /* TAMPILAN MODE ADMIN: Seluruh kontrol anonym (Login / Daftar) tidak ditampilkan */
                            <div className="hidden sm:flex items-center gap-2">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 backdrop-blur-xs">
                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                                    Mode Admin
                                </span>
                                <Link href="/admin">
                                    <Button
                                        size="sm"
                                        className="bg-white text-green-800 hover:bg-emerald-50 border border-white font-bold shadow-md flex items-center gap-1.5"
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
                            /* TAMPILAN ANONYM: Hanya muncul bila bukan admin */
                            <>
                                <Link href="/login" className="hidden sm:block">
                                    <Button variant="ghost" size="sm" className="font-bold text-white hover:bg-white/10">
                                        Login
                                    </Button>
                                </Link>
                                {!isDaftarPage && (
                                    <Link href="/daftar">
                                        <Button size="sm" className="shadow-lg font-bold px-4 bg-white text-green-800 hover:bg-emerald-50 border border-white">
                                            Daftar Sekarang
                                        </Button>
                                    </Link>
                                )}
                            </>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button
                            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white border-t border-gray-100 overflow-hidden shadow-xl"
                    >
                        <div className="container mx-auto px-4 py-6 space-y-1">
                            {isAdmin ? (
                                /* Mobile Menu Khusus Admin */
                                <>
                                    <div className="px-4 py-2.5 mb-2 rounded-xl bg-green-50 border border-green-200 flex items-center justify-between">
                                        <span className="flex items-center gap-2 text-xs font-bold text-green-800 uppercase tracking-wider">
                                            <ShieldCheck className="w-4 h-4 text-green-600" />
                                            Mode Admin Aktif
                                        </span>
                                    </div>

                                    <Link
                                        href="/admin"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-base font-bold text-white bg-green-600 hover:bg-green-700 transition-colors shadow-sm"
                                    >
                                        <LayoutDashboard className="w-5 h-5" />
                                        Dashboard Admin
                                    </Link>

                                    <Link
                                        href="/admin/content"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                                    >
                                        <FileText className="w-5 h-5 text-gray-500" />
                                        Edit Konten (CMS)
                                    </Link>

                                    <div className="my-2 border-t border-gray-100 pt-2">
                                        <div className="text-[11px] font-semibold text-gray-400 px-4 uppercase tracking-wider mb-1">
                                            Navigasi Beranda
                                        </div>
                                        {NAV_LINKS.map((link) => (
                                            <Link
                                                key={link.name}
                                                href={link.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className={cn(
                                                    "block px-4 py-2 rounded-xl text-sm font-medium transition-all",
                                                    activeSection === link.href.slice(1)
                                                        ? "text-green-700 font-bold bg-green-50/60"
                                                        : "text-gray-600 hover:bg-gray-50 hover:text-green-600"
                                                )}
                                            >
                                                {link.name}
                                            </Link>
                                        ))}
                                    </div>

                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-base font-medium text-red-600 hover:bg-red-50 transition-colors text-left"
                                    >
                                        <LogOut className="w-5 h-5" />
                                        Keluar dari Admin
                                    </button>
                                </>
                            ) : (
                                /* Mobile Menu Tampilan Anonym */
                                <>
                                    {NAV_LINKS.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={cn(
                                                "block px-4 py-3 rounded-xl text-base font-medium transition-all",
                                                activeSection === link.href.slice(1)
                                                    ? "bg-green-50 text-green-700 font-bold"
                                                    : "text-gray-600 hover:bg-gray-50 hover:text-green-600"
                                            )}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                    {!isDaftarPage && (
                                        <Link
                                            href="/daftar"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block px-4 py-3 rounded-xl text-base font-bold text-center bg-green-600 text-white hover:bg-green-700 shadow-sm"
                                        >
                                            Daftar Sekarang
                                        </Link>
                                    )}
                                    <Link
                                        href="/login"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block px-4 py-3 text-gray-600 font-medium hover:bg-gray-50 rounded-xl"
                                    >
                                        Login Admin
                                    </Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
