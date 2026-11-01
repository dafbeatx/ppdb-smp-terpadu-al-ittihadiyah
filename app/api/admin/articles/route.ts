import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Article } from '@/types/content.types'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const supabase = await createClient()

        const { data, error } = await supabase
            .from('page_contents')
            .select('value')
            .eq('section', 'berita')
            .eq('key', 'articles_list')
            .maybeSingle()

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        let articles: Article[] = []
        if (data?.value) {
            try {
                const parsed = JSON.parse(data.value)
                if (Array.isArray(parsed)) {
                    articles = parsed
                }
            } catch {
                articles = []
            }
        }

        return NextResponse.json({ articles })
    } catch {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json()
        const articles = body?.articles

        if (!articles || !Array.isArray(articles)) {
            return NextResponse.json({ error: 'Format data berita tidak valid' }, { status: 400 })
        }

        const supabase = await createClient()

        // 1. Verifikasi Auth User
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError || !user || !user.email) {
            return NextResponse.json({
                error: 'Unauthorized',
                details: userError?.message
            }, { status: 401 })
        }

        // 2. Verifikasi Hak Admin
        const { data: adminData, error: adminError } = await supabase
            .from('admin_users')
            .select('id, email')
            .ilike('email', user.email.trim())
            .single()

        if (adminError || !adminData) {
            return NextResponse.json({
                error: 'Bukan akun administrator',
                details: adminError?.message
            }, { status: 403 })
        }

        // 3. Simpan daftar berita ke page_contents
        const jsonValue = JSON.stringify(articles)
        const { error: saveError } = await supabase
            .from('page_contents')
            .upsert(
                {
                    section: 'berita',
                    key: 'articles_list',
                    category: 'berita',
                    value_type: 'textarea',
                    label: 'Daftar Artikel & Berita Sekolah',
                    value: jsonValue,
                    updated_at: new Date().toISOString(),
                    updated_by: adminData.id,
                },
                { onConflict: 'section,key' }
            )

        if (saveError) {
            return NextResponse.json({ error: saveError.message }, { status: 500 })
        }

        // 4. Revalidate cache halaman publik
        revalidatePath('/berita')
        revalidatePath('/')
        revalidatePath('/admin/berita')

        return NextResponse.json({
            success: true,
            message: 'Daftar berita berhasil diperbarui',
            articles,
        })
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Terjadi kesalahan sistem'
        return NextResponse.json({ error: message }, { status: 500 })
    }
}

