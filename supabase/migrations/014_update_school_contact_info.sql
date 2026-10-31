-- UPDATE CMS CONTACT INFORMATION (Footer & School Info)
-- Execute in Supabase SQL Editor to update contact info in database

-- 1. Update Alamat
UPDATE page_contents 
SET value = 'Jl. Raya Cikampak No. 296 / Kp. Pasar Salasa RT 03/RW 01, Desa Ciampea Udik, Kecamatan Ciampea, Kabupaten Bogor, Jawa Barat 16620.',
    updated_at = NOW()
WHERE category = 'footer' AND key = 'address';

-- 2. Update No. HP / Telepon
UPDATE page_contents 
SET value = '+62 819-4767-4100',
    updated_at = NOW()
WHERE category = 'footer' AND key = 'phone';

-- 3. Update Email
UPDATE page_contents 
SET value = 'ppdbassalaam@gmail.com',
    updated_at = NOW()
WHERE category = 'footer' AND key = 'email';

