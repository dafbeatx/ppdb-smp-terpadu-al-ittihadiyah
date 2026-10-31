import { z } from 'zod'

export const parentSchema = z.object({
    father_name: z.string().min(2, 'Nama ayah harus diisi (atau isi Almarhum)'),
    father_occupation: z.string().min(1, 'Pekerjaan ayah harus diisi'),
    pendidikan_ayah: z.string().min(1, 'Pendidikan ayah harus dipilih'),
    mother_name: z.string().min(2, 'Nama ibu harus diisi (atau isi Almarhumah)'),
    mother_occupation: z.string().min(1, 'Pekerjaan ibu harus diisi'),
    pendidikan_ibu: z.string().min(1, 'Pendidikan ibu harus dipilih'),
    phone_number: z.string()
        .regex(/^08\d{8,11}$/, 'Nomor HP harus format Indonesia (08xx) dan 10-13 digit'),
    email: z.string().email('Format email tidak valid').optional().or(z.literal('')),
    address: z.string().optional(),
    nama_wali: z.string().optional().or(z.literal('')),
    hubungan_wali: z.string().optional().or(z.literal('')),
})

export type ParentFormData = z.infer<typeof parentSchema>
