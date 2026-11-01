export type PageContent = {
    id: string
    section: string
    key: string
    value_type: 'text' | 'textarea' | 'number'
    value: string
    label: string
    category: string
    display_order: number
    updated_at: string
    updated_by: string | null
}

export type ContentCategory = 'hero' | 'profile' | 'visi_misi' | 'keunggulan' | 'alur' | 'footer' | 'sejarah' | 'fasilitas' | 'branding' | 'berita'

export type Article = {
    id: string
    title: string
    date: string
    category: string
    summary: string
    content: string
    author?: string
}

