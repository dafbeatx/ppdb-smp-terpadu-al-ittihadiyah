'use client'

import { usePathname } from 'next/navigation'

interface PublicNavbarWrapperProps {
    children: React.ReactNode
}

/**
 * PublicNavbarWrapper
 * Menyembunyikan Navbar publik di rute admin (/admin dan seluruh sub-halamannya) serta halaman login.
 */
export default function PublicNavbarWrapper({ children }: PublicNavbarWrapperProps) {
    const pathname = usePathname()

    // Jika URL berada di /admin atau sub-rutenya (/admin/*), serta halaman /login, sembunyikan Navbar
    if (pathname?.startsWith('/admin') || pathname === '/login') {
        return null
    }

    return <>{children}</>
}

