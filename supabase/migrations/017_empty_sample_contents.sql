-- MIGRATION 017: EMPTY SAMPLE/PLACEHOLDER CONTENTS FOR ADMIN TO FILL
-- Keeps only:
-- 1. Visi & Misi resmi AKBAR
-- 2. Alamat sekolah Ciampea Bogor
-- 3. Nomor HP / WhatsApp
-- 4. Email sekolah

-- Kosongkan hero stats & tagline
UPDATE page_contents
SET value = '', updated_at = NOW()
WHERE category = 'hero' AND key IN ('tagline', 'stat_experience', 'stat_graduate', 'stat_accreditation');

-- Kosongkan profile & fasilitas & program
UPDATE page_contents
SET value = '', updated_at = NOW()
WHERE category = 'profile' AND key IN ('title', 'subtitle', 'paragraph_1', 'paragraph_2', 'item_1', 'item_2', 'item_3', 'item_4');

-- Kosongkan keunggulan
UPDATE page_contents
SET value = '', updated_at = NOW()
WHERE category = 'keunggulan';

-- Kosongkan alur
UPDATE page_contents
SET value = '', updated_at = NOW()
WHERE category = 'alur';

-- Kosongkan deskripsi & jam operasional footer
UPDATE page_contents
SET value = '', updated_at = NOW()
WHERE category = 'footer' AND key IN ('school_desc', 'hours_weekday', 'hours_saturday', 'hours_sunday');

-- Tambahkan field sambutan kepala sekolah agar admin bisa mengisi
INSERT INTO page_contents (category, section, key, value, label, value_type, display_order)
VALUES
  ('profile', 'sambutan', 'nama_kepsek', '', 'Nama Kepala Sekolah & Gelar', 'text', 14),
  ('profile', 'sambutan', 'jabatan', '', 'Jabatan Pimpinan', 'text', 15),
  ('profile', 'sambutan', 'judul', '', 'Judul Sambutan', 'text', 16),
  ('profile', 'sambutan', 'isi', '', 'Isi Sambutan Kepala Sekolah', 'textarea', 17)
ON CONFLICT (section, key) DO NOTHING;

