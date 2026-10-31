import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// Force dynamic execution for API route
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const category = searchParams.get('category')

        const supabase = await createClient()

        let query = supabase
            .from('page_contents')
            .select('*')
            .order('display_order', { ascending: true })

        if (category) {
            query = query.eq('category', category)
        }

        const { data, error } = await query

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ content: data })
    } catch {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json()
        const content = body?.content

        if (!content || !Array.isArray(content)) {
            return NextResponse.json({ error: 'Invalid content data' }, { status: 400 })
        }

        // Jika tidak ada item yang dikirim (tidak ada perubahan), langsung return sukses tanpa beban DB
        if (content.length === 0) {
            return NextResponse.json({
                success: true,
                message: 'No changes detected',
                results: []
            })
        }

        const supabase = await createClient()

        // Verifikasi User
        const { data: { user }, error: userError } = await supabase.auth.getUser()

        if (userError || !user || !user.email) {
            return NextResponse.json({
                error: 'Unauthorized',
                details: userError?.message
            }, { status: 401 })
        }

        // Verifikasi Admin (case-insensitive)
        const { data: adminData, error: adminError } = await supabase
            .from('admin_users')
            .select('id, email')
            .ilike('email', user.email.trim())
            .single()

        if (adminError || !adminData) {
            return NextResponse.json({
                error: 'Not an admin',
                details: adminError?.message
            }, { status: 403 })
        }

        // Update item secara paralel dan efisien (hanya item yang dikirim / dirty)
        // Mencegah sequential loop 57x yang membebani database dan rawan timeout
        const results = await Promise.all(
            content.map(async (item: { id: string; value: string; label?: string }) => {
                const { data, error } = await supabase
                    .from('page_contents')
                    .update({
                        value: item.value ?? '',
                        updated_at: new Date().toISOString(),
                        updated_by: adminData.id,
                    })
                    .eq('id', item.id)
                    .select('id')

                if (error) {
                    return {
                        id: item.id,
                        label: item.label || item.id,
                        success: false,
                        error: error.message
                    }
                }

                if (!data || data.length === 0) {
                    return {
                        id: item.id,
                        label: item.label || item.id,
                        success: false,
                        error: 'Item tidak ditemukan atau akses ditolak RLS'
                    }
                }

                return {
                    id: item.id,
                    label: item.label || item.id,
                    success: true
                }
            })
        )

        const failed = results.filter((r) => !r.success)
        const succeeded = results.filter((r) => r.success)

        if (failed.length > 0) {
            return NextResponse.json({
                success: false,
                message: `${failed.length} dari ${content.length} item gagal disimpan`,
                results,
                failed
            }, { status: 500 })
        }

        // Revalidasi cache halaman Next.js agar perubahan langsung tampil di publik
        try {
            revalidatePath('/', 'layout')
        } catch {
            // Revalidation warning diabaikan agar tidak menggagalkan response
        }

        return NextResponse.json({
            success: true,
            message: `Berhasil memperbarui ${succeeded.length} item`,
            results
        })
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        return NextResponse.json({
            error: 'Internal server error',
            message: errorMessage
        }, { status: 500 })
    }
}
