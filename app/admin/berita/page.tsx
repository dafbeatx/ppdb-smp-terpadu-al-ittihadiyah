import { requireAuth } from '@/lib/auth'
import { getArticles } from '@/lib/content'
import BeritaManager from '@/components/admin/BeritaManager'

export const metadata = {
    title: 'Kelola Berita & Informasi - Admin SMP Terpadu Al-Ittihadiyah',
}

export default async function AdminBeritaPage() {
    await requireAuth()
    const articles = await getArticles()

    return (
        <div className="space-y-6">
            <BeritaManager initialArticles={articles} />
        </div>
    )
}

