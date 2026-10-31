'use client'

import { usePathname } from 'next/navigation'

export default function PublicFooterWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    if (pathname?.startsWith('/admin') || pathname === '/login') {
        return null
    }
    return <>{children}</>
}

