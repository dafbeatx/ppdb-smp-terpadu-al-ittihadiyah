import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import FloatingFAQBot from '@/components/FloatingFAQBot'
import Navbar from '@/components/Navbar'
import PublicNavbarWrapper from '@/components/PublicNavbarWrapper'
import PublicFooterWrapper from '@/components/PublicFooterWrapper'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#064e3b',
}

export const metadata: Metadata = {
  title: 'SPMB SMP Terpadu Al-Ittihadiyah - Pendaftaran Siswa Baru',
  description: 'Sistem Penerimaan Murid Baru SMP Terpadu Al-Ittihadiyah. Daftar online dengan mudah dan cepat.',
  keywords: 'SPMB, Pendaftaran, SMP Al-Ittihadiyah, Sekolah Islam, Pendidikan',
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon-180x180.png"
  },
  openGraph: {
    title: "SPMB SMP Terpadu Al-Ittihadiyah Tahun Ajaran 2026/2027",
    description: "Sistem Penerimaan Murid Baru SMP Terpadu Al-Ittihadiyah. Daftar online dengan mudah dan cepat.",
    url: 'https://ppdb-smp-terpadu-al-ittihadiyah.vercel.app',
    siteName: 'SPMB SMP Terpadu Al-Ittihadiyah',
    images: [
      {
        url: "https://ppdb-smp-terpadu-al-ittihadiyah.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "SPMB SMP Terpadu Al-Ittihadiyah"
      }
    ],
    type: "website",
    locale: 'id_ID',
  },
  twitter: {
    card: "summary_large_image",
    title: "SPMB SMP Terpadu Al-Ittihadiyah Tahun Ajaran 2026/2027",
    description: "Sistem Penerimaan Murid Baru SMP Terpadu Al-Ittihadiyah. Daftar online dengan mudah dan cepat.",
    images: ["https://ppdb-smp-terpadu-al-ittihadiyah.vercel.app/og-image.png"]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <PublicNavbarWrapper>
          <Navbar />
        </PublicNavbarWrapper>

        {children}

        <FloatingFAQBot />
        <PublicFooterWrapper>
          <Footer />
        </PublicFooterWrapper>
      </body>
    </html>
  )
}
