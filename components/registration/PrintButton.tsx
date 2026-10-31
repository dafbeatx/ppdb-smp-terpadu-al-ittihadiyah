'use client'

import Button from '@/components/ui/Button'
import { Printer } from 'lucide-react'

export default function PrintButton() {
    return (
        <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => window.print()}
            className="gap-2 bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
        >
            <Printer className="w-5 h-5 text-gray-600" />
            Cetak / Simpan Bukti (PDF)
        </Button>
    )
}

