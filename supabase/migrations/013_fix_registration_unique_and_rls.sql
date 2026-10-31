-- MIGRATION 013: Fix UNIQUE constraint on registration_id and allow UPDATE via RLS
-- Safe script that cleans duplicate records first so it never fails!

-- 1. Bersihkan data duplikat jika ada dari uji coba sebelumnya
DELETE FROM students a USING (
    SELECT MIN(ctid) as min_ctid, registration_id
    FROM students 
    WHERE registration_id IS NOT NULL
    GROUP BY registration_id HAVING COUNT(*) > 1
) b
WHERE a.registration_id = b.registration_id 
AND a.ctid <> b.min_ctid;

DELETE FROM parents a USING (
    SELECT MIN(ctid) as min_ctid, registration_id
    FROM parents 
    WHERE registration_id IS NOT NULL
    GROUP BY registration_id HAVING COUNT(*) > 1
) b
WHERE a.registration_id = b.registration_id 
AND a.ctid <> b.min_ctid;

-- 2. Buat UNIQUE INDEX (lebih aman dan tidak akan error jika sudah ada)
CREATE UNIQUE INDEX IF NOT EXISTS students_registration_id_unique ON students (registration_id);
CREATE UNIQUE INDEX IF NOT EXISTS parents_registration_id_unique ON parents (registration_id);

-- 3. Berikan izin UPDATE untuk publik/anon saat mengisi multi-step form
DROP POLICY IF EXISTS "Enable update for all users" ON students;
CREATE POLICY "Enable update for all users"
ON students FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- 4. Berikan izin UPDATE untuk data orang tua
DROP POLICY IF EXISTS "Enable update for all users" ON parents;
CREATE POLICY "Enable update for all users"
ON parents FOR UPDATE
TO public
USING (true)
WITH CHECK (true);
