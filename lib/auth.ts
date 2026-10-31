import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function requireAuth() {
    const supabase = await createClient()

    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user || !user.email) {
        redirect('/login')
    }

    // Check if user is admin (case-insensitive)
    const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('id, email')
        .ilike('email', user.email.trim())
        .single()

    if (adminError || !adminData) {
        await supabase.auth.signOut()
        redirect('/login')
    }

    return { user, admin: adminData }
}

async function createClient() {
    const cookieStore = await cookies()

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch { }
                },
            },
        }
    )
}
