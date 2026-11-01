'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { MessageCircle, X, Phone, ArrowUpCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const FAQ_DATA = [
    {
        q: "Saya awam internet/gaptek, bagaimana cara daftarnya?",
        a: "Bapak/Ibu jangan khawatir! Pendaftaran sangat mudah. Cukup klik tombol 'WhatsApp Admin' di bawah, tim panitia kami siap membantu memandu atau mengisikan datanya sampai selesai."
    },
    {
        q: "Dokumen apa saja yang perlu disiapkan?",
        a: "Cukup foto KTP Orang Tua, Kartu Keluarga (KK), dan Ijazah atau Surat Keterangan Lulus (SKL). Foto langsung pakai kamera HP biasa, tidak perlu repot scan ke tempat fotokopi."
    },
    {
        q: "Bisa daftar langsung lewat HP?",
        a: "Bisa sekali! Website ini sangat ringan dan bisa dibuka di semua jenis HP Android maupun iPhone tanpa perlu install aplikasi apa pun."
    },
    {
        q: "Lokasi sekolah di mana dan apakah bisa berkunjung?",
        a: "Lokasi kami di Jl. Raya Cikampak No. 296 / Kp. Pasar Salasa RT 03/RW 01, Desa Ciampea Udik, Ciampea, Bogor. Bapak/Ibu sangat dipersilakan datang berkunjung untuk silaturahmi dan melihat lingkungan sekolah."
    }
]

export default function FloatingFAQBot() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
    const [messages, setMessages] = useState<{ type: 'bot' | 'user', content: string }[]>([
        { type: 'bot', content: 'Halo! Ada yang bisa kami bantu terkait pendaftaran (SPMB)?' }
    ])
    const [showScrollTop, setShowScrollTop] = useState(false)
    const [isInputFocused, setIsInputFocused] = useState(false)
    const chatContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleFocus = (e: FocusEvent) => {
            const target = e.target as HTMLElement
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
                setIsInputFocused(true)
            }
        }
        const handleBlur = () => setIsInputFocused(false)

        window.addEventListener('focusin', handleFocus)
        window.addEventListener('focusout', handleBlur)
        return () => {
            window.removeEventListener('focusin', handleFocus)
            window.removeEventListener('focusout', handleBlur)
        }
    }, [])

    // Auto-scroll to bottom of chat area only
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: 'smooth'
            })
        }
    }, [messages, isTyping])

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 500)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleQuestionClick = (q: string, a: string) => {
        if (isTyping) return

        setMessages(prev => [...prev, { type: 'user', content: q }])
        setIsTyping(true)

        // Simulate bot thinking delay
        setTimeout(() => {
            setMessages(prev => [...prev, { type: 'bot', content: a }])
            setIsTyping(false)
        }, 1000)
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    if (pathname?.startsWith('/admin') || pathname === '/login') return null
    if (isInputFocused && typeof window !== 'undefined' && window.innerWidth < 768) return null

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60] flex flex-col items-end gap-2.5 sm:gap-3">
            {/* Scroll to Top Button */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        onClick={scrollToTop}
                        className="bg-white text-emerald-800 p-2.5 sm:p-3 rounded-full shadow-lg border border-emerald-100 hover:bg-emerald-50 transition-colors"
                        aria-label="Scroll ke atas"
                    >
                        <ArrowUpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-[calc(100vw-32px)] sm:w-[360px] max-w-[360px] overflow-hidden flex flex-col h-[70vh] sm:h-[480px] max-h-[80vh] sm:max-h-[560px] mb-1 sm:mb-2"
                    >
                        {/* Header: Fixed at top */}
                        <div className="bg-emerald-800 p-3.5 sm:p-4 text-white flex justify-between items-center shrink-0">
                            <div className="flex items-center gap-2.5 sm:gap-3">
                                <div className="bg-white/20 p-1.5 sm:p-2 rounded-lg">
                                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xs sm:text-sm">Bantuan SPMB</h3>
                                    <p className="text-[10px] text-emerald-100/80">Online • Panduan cepat</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="hover:bg-white/10 p-1 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Body: Scrollable area including chat and options */}
                        <div className="flex-1 overflow-hidden flex flex-col bg-gray-50">
                            {/* Chat Content: Auto-scrollable internally */}
                            <div
                                ref={chatContainerRef}
                                className="flex-1 overflow-y-auto p-4 space-y-4 pt-6 scroll-smooth"
                            >
                                {messages.map((msg, i) => (
                                    <div
                                        key={i}
                                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.type === 'user'
                                                ? 'bg-green-600 text-white rounded-tr-none'
                                                : 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-tl-none'
                                                }`}
                                        >
                                            {msg.content}
                                        </div>
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className="flex justify-start">
                                        <div className="bg-white text-gray-400 p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 text-xs">
                                            <span className="flex gap-1">
                                                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></span>
                                                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Separated area for Quick Replies & WA */}
                            <div className="p-4 border-t bg-white shrink-0 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Ketuk untuk bertanya</p>
                                <div className="max-h-[120px] overflow-y-auto pr-1 -mr-1 custom-scrollbar">
                                    <div className="flex flex-wrap gap-2">
                                        {FAQ_DATA.map((item, i) => (
                                            <button
                                                key={i}
                                                disabled={isTyping}
                                                onClick={() => handleQuestionClick(item.q, item.a)}
                                                className={`text-[11px] px-3 py-2 rounded-xl border transition-all text-left leading-snug ${isTyping
                                                    ? 'bg-gray-50 text-gray-400 border-gray-100'
                                                    : 'bg-white hover:bg-green-50 hover:text-green-700 hover:border-green-200 text-gray-600 border-gray-200 shadow-sm active:scale-95'
                                                    }`}
                                            >
                                                {item.q}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <a
                                        href="https://wa.me/6281947674100?text=Assalamu%27alaikum%20Admin%20SPMB%2C%20saya%20ingin%20bertanya%20seputar%20pendaftaran%20siswa%20baru"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-all text-xs sm:text-sm shadow-md shadow-green-200 active:scale-95"
                                    >
                                        <Phone className="w-4 h-4" />
                                        Tanya Admin via WhatsApp
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`bg-emerald-800 text-white p-3.5 sm:p-4 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all group relative ${isOpen ? 'rotate-90' : ''}`}
                aria-label="Tanya seputar SPMB"
            >
                {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
        </div>
    )
}
