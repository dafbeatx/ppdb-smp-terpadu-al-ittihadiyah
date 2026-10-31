import { requireAuth } from '@/lib/auth'
import { getContent } from '@/lib/content'
import ContentEditor from '@/components/admin/ContentEditor'

export default async function AdminContentPage() {
    await requireAuth()

    // Fetch all content
    const content = await getContent()

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Edit Content Website
                </h1>
                <p className="text-gray-600">
                    Ubah semua teks di website tanpa perlu coding
                </p>
            </div>

            <ContentEditor initialContent={content} />
        </div>
    )
}
