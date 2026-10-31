import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const supabase = await createClient()

        // 1. Check authentication & admin status
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        if (authError || !user || !user.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { data: adminData } = await supabase
            .from('admin_users')
            .select('id')
            .ilike('email', user.email.trim())
            .single()

        if (!adminData) {
            return NextResponse.json({ error: 'Not an admin' }, { status: 403 })
        }

        const { id } = await params
        const { status } = await request.json()

        const { error } = await supabase
            .from('registrations')
            .update({ status: String(status), updated_at: new Date().toISOString() })
            .eq('id', id)

        if (error) {
            console.error('Update status error:', error)
            return NextResponse.json({
                error: 'Gagal memperbarui status di database',
                details: error.message,
            }, { status: 500 })
        }

        return NextResponse.json({ success: true })
    } catch (error: unknown) {
        console.error('Update status unexpected error:', error)
        const message = error instanceof Error ? error.message : 'Unknown error'
        return NextResponse.json({
            error: 'Terjadi kesalahan sistem',
            details: message
        }, { status: 500 })
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const supabase = await createClient()

        // 1. Check authentication & admin status
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        if (authError || !user || !user.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { data: adminData } = await supabase
            .from('admin_users')
            .select('id')
            .ilike('email', user.email.trim())
            .single()

        if (!adminData) {
            return NextResponse.json({ error: 'Not an admin' }, { status: 403 })
        }

        const { id } = await params

        // 2. Get documents to delete from storage as well
        const { data: docs } = await supabase
            .from('documents')
            .select('file_path')
            .eq('registration_id', id)

        if (docs && docs.length > 0) {
            const paths = docs.map(d => d.file_path)
            await supabase.storage.from('documents').remove(paths)
        }

        // 3. Delete registration (cascade will handle students, parents, and docs metadata in DB)
        const { error } = await supabase
            .from('registrations')
            .delete()
            .eq('id', id)

        if (error) {
            console.error('Delete registration error:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ success: true })
    } catch (error: unknown) {
        console.error('Delete registration unexpected error:', error)
        const message = error instanceof Error ? error.message : 'Unknown error'
        return NextResponse.json({ error: message }, { status: 500 })
    }
}
