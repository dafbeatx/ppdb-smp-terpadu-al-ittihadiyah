'use client'

import { useState } from 'react'
import { Calendar, Tag, ArrowRight, X, BookOpen, Share2, Check } from 'lucide-react'
import type { Article } from '@/types/content.types'

interface BeritaGridProps {
    initialArticles: Article[]
}

export default function BeritaGrid({ initialArticles }: BeritaGridProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [activeArticle, setActiveArticle] = useState<Article | null>(null)
    const [copied, setCopied] = useState(false)

    const categories = ['all', ...Array.from(new Set(initialArticles.map((a) => a.category).filter(Boolean)))]

    const filtered = initialArticles.filter((art) => {
        if (selectedCategory === 'all') return true
        return art.category === selectedCategory
    })

    const handleShare = async (article: Article) => {
        if (typeof window !== 'undefined') {
            const url = `${window.location.origin}/berita`
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: article.title,
                        text: article.summary,
                        url: url,
                    })
                    return
                } catch {
                    // fall back to copy
                }
            }
            try {
                await navigator.clipboard.writeText(`${article.title}\n\n${url}`)
                setCopied(true)
                setTimeout(() => setCopied(false), 2500)
            } catch {
                // Ignore
            }
        }
    }

    return (
        <div className="space-y-6 sm:space-y-8">
            {/* Category Filter Pills */}
            {categories.length > 2 && (
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${selectedCategory === cat
                                ? 'bg-emerald-800 text-white shadow-xs'
                                : 'bg-white text-gray-600 hover:bg-slate-100 border border-slate-200'
                                }`}
                        >
                            {cat === 'all' ? `Semua Berita (${initialArticles.length})` : cat}
                        </button>
                    ))}
                </div>
            )}

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {filtered.map((article) => (
                    <article
                        key={article.id}
                        onClick={() => setActiveArticle(article)}
                        className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group"
                    >
                        <div>
                            <div className="flex items-center justify-between text-[11px] sm:text-xs text-gray-500 mb-3 sm:mb-4 pb-2.5 sm:pb-3 border-b border-slate-100">
                                <span className="flex items-center gap-1.5 font-semibold text-emerald-800 bg-emerald-50 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-emerald-100">
                                    <Tag className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-700" />
                                    {article.category}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400" />
                                    {article.date}
                                </span>
                            </div>

                            <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3 leading-snug group-hover:text-emerald-900 transition-colors">
                                {article.title}
                            </h2>

                            <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-6 line-clamp-3">
                                {article.summary}
                            </p>
                        </div>

                        <div className="pt-3 sm:pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-800">
                            <span className="flex items-center gap-1.5 group-hover:underline">
                                <span>Baca Selengkapnya</span>
                                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                            </span>
                            <span className="text-slate-400 font-normal text-[11px]">Informasi Resmi</span>
                        </div>
                    </article>
                ))}
            </div>

            {/* Reading Modal */}
            {activeArticle && (
                <div
                    className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setActiveArticle(null)
                    }}
                >
                    <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full p-6 sm:p-8 md:p-10 shadow-2xl border border-slate-200 relative my-8 animate-in fade-in zoom-in-95 duration-150">
                        <button
                            onClick={() => setActiveArticle(null)}
                            className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-2 rounded-xl hover:bg-slate-100 transition-colors"
                            aria-label="Tutup"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100 flex items-center gap-1.5">
                                <Tag className="w-3 h-3 text-emerald-700" />
                                {activeArticle.category}
                            </span>
                            <span className="text-xs text-gray-400 flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" />
                                {activeArticle.date}
                            </span>
                        </div>

                        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 leading-tight">
                            {activeArticle.title}
                        </h2>

                        <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-100 mb-6">
                            <p className="text-xs sm:text-sm font-medium text-emerald-950 leading-relaxed italic">
                                &ldquo;{activeArticle.summary}&rdquo;
                            </p>
                        </div>

                        <div className="text-gray-700 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line mb-8">
                            {activeArticle.content || activeArticle.summary}
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <BookOpen className="w-4 h-4 text-emerald-700" />
                                <span>Diterbitkan oleh Humas SMP Terpadu Al-Ittihadiyah</span>
                            </div>

                            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                                <button
                                    onClick={() => handleShare(activeArticle)}
                                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-emerald-800 px-3 py-2 rounded-xl border border-slate-200 hover:border-emerald-300 transition-colors"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-3.5 h-3.5 text-emerald-700" />
                                            <span>Tersalin!</span>
                                        </>
                                    ) : (
                                        <>
                                            <Share2 className="w-3.5 h-3.5" />
                                            <span>Bagikan</span>
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={() => setActiveArticle(null)}
                                    className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors"
                                >
                                    Tutup
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

