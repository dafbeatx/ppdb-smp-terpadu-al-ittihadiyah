import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { readFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const rawPath = searchParams.get('path')

        if (!rawPath) {
            return new NextResponse('Path parameter is required', { status: 400 })
        }

        // Sanitasi path untuk mencegah Directory Traversal
        const safePath = path.normalize(rawPath).replace(/^(\.\.(\/|\\|$))+/, '')
        if (safePath.includes('..') || safePath.startsWith('/') || safePath.startsWith('\\')) {
            return new NextResponse('Invalid path', { status: 400 })
        }

        // 1. Coba baca dari filesystem lokal terlebih dahulu (jika ada)
        const localPath = path.join(process.cwd(), 'public', 'uploads', safePath)
        if (existsSync(localPath)) {
            try {
                const fileBuffer = await readFile(localPath)
                return new NextResponse(fileBuffer, {
                    status: 200,
                    headers: {
                        'Content-Type': 'image/webp',
                        'Cache-Control': 'public, max-age=31536000, immutable',
                    },
                })
            } catch {
                // Fallback ke Supabase Storage jika pembacaan lokal gagal
            }
        }

        // 2. Unduh dari Supabase Storage (documents bucket)
        const supabase = await createClient()
        const { data, error } = await supabase.storage
            .from('documents')
            .download(safePath)

        if (error || !data) {
            return new NextResponse('Media not found', { status: 404 })
        }

        const buffer = await data.arrayBuffer()

        return new NextResponse(buffer, {
            status: 200,
            headers: {
                'Content-Type': data.type || 'image/webp',
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        })
    } catch (err: unknown) {
        console.error('Error serving media:', err)
        return new NextResponse('Internal server error', { status: 500 })
    }
}

