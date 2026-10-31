import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
    try {
        const { student, parent, registrationId } = await request.json()

        const supabase = await createClient()

        let currentRegistrationId = registrationId

        // 1. Create registration IF NOT EXISTS
        if (!currentRegistrationId) {
            const { data: registration, error: regError } = await supabase
                .from('registrations')
                .insert({ registration_number: '', status: 'pending' })
                .select('id, registration_number')
                .single()

            if (regError || !registration) {
                console.error('Registration error details:', regError)
                return NextResponse.json(
                    {
                        error: 'Gagal membuat pendaftaran',
                        details: regError?.message || 'No registration returned'
                    },
                    { status: 500 }
                )
            }
            currentRegistrationId = registration.id
        }

        // Fetch current registration data (especially registration_number)
        const { data: regInfo } = await supabase
            .from('registrations')
            .select('registration_number')
            .eq('id', currentRegistrationId)
            .single()

        // 2. Upsert student data if provided
        if (student && Object.keys(student).length > 0) {
            // Check if student already exists for this registration
            const { data: existingStudent } = await supabase
                .from('students')
                .select('id')
                .eq('registration_id', currentRegistrationId)
                .maybeSingle()

            let studentError
            if (existingStudent?.id) {
                const res = await supabase
                    .from('students')
                    .update({ ...student, updated_at: new Date().toISOString() })
                    .eq('id', existingStudent.id)
                studentError = res.error
            } else {
                const res = await supabase
                    .from('students')
                    .insert({
                        registration_id: currentRegistrationId,
                        ...student,
                    })
                studentError = res.error
            }

            if (studentError) {
                console.error('Student save error:', studentError)
                return NextResponse.json(
                    { error: 'Gagal menyimpan data siswa', details: studentError.message },
                    { status: 500 }
                )
            }
        }

        // 3. Upsert parent data if provided and has meaningful content
        const hasParentData = parent && (parent.father_name || parent.mother_name || parent.phone_number)
        if (hasParentData) {
            // Check if parent already exists for this registration
            const { data: existingParent } = await supabase
                .from('parents')
                .select('id')
                .eq('registration_id', currentRegistrationId)
                .maybeSingle()

            let parentError
            if (existingParent?.id) {
                const res = await supabase
                    .from('parents')
                    .update({ ...parent, updated_at: new Date().toISOString() })
                    .eq('id', existingParent.id)
                parentError = res.error
            } else {
                const res = await supabase
                    .from('parents')
                    .insert({
                        registration_id: currentRegistrationId,
                        ...parent,
                    })
                parentError = res.error
            }

            if (parentError) {
                console.error('Parent save error:', parentError)
                return NextResponse.json(
                    { error: 'Gagal menyimpan data orang tua', details: parentError.message },
                    { status: 500 }
                )
            }
        }

        return NextResponse.json({
            success: true,
            registrationId: currentRegistrationId,
            registrationNumber: regInfo?.registration_number,
        })
    } catch (error: any) {
        console.error('Unexpected error in /api/register:', error)
        return NextResponse.json(
            { error: 'Terjadi kesalahan server', details: error.message },
            { status: 500 }
        )
    }
}
