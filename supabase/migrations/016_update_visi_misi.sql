-- Migration 016: Update Visi & Misi to official AKBAR 2024 content
-- Updates visi and misi_1 to misi_4, and adds misi_5 and misi_6

INSERT INTO page_contents (category, section, key, value, label, value_type, display_order)
VALUES
  ('visi_misi', 'visi_misi', 'visi', 'Terciptanya SMP Terpadu Al Ittihadiyah yang aktif, Kreatif, Bersih, Antusias dan Religius (AKBAR) di Tahun 2024', 'Visi', 'textarea', 82),
  ('visi_misi', 'visi_misi', 'misi_1', 'Mendorong aktivitas dan kreatifitas secara optimal kepada seluruh komponen sekolah terutama siswa.', 'Misi 1', 'textarea', 83),
  ('visi_misi', 'visi_misi', 'misi_2', 'Mengoptimalkan pembelajaran dalam jangka meningkatkan keterampilan siswa supaya mereka memiliki prestasi yang dapat dibanggakan.', 'Misi 2', 'textarea', 84),
  ('visi_misi', 'visi_misi', 'misi_3', 'Melaksanakan pembelajaran dan bimbingan secara efektif sehingga kecerdasan siswa terus diasah agar tercapainya kecerdasan intelektual dan emosional yang mantap.', 'Misi 3', 'textarea', 85),
  ('visi_misi', 'visi_misi', 'misi_4', 'Menanamkan cinta kebersihan dan keindahan kepada semua komponen sekolah.', 'Misi 4', 'textarea', 86),
  ('visi_misi', 'visi_misi', 'misi_5', 'Antusias terhadap perkembangan dan kemajuan ilmu pengetahuan dan tekhnologi.', 'Misi 5', 'textarea', 87),
  ('visi_misi', 'visi_misi', 'misi_6', 'Menimbulkan penghayatan yang dalam dan pengalaman yang tinggi terhadap ajaran agama (religi) sehingga tercipta kematangan dalam berpikir dan bertindak.', 'Misi 6', 'textarea', 88)
ON CONFLICT (section, key) DO UPDATE 
SET 
  value = EXCLUDED.value,
  label = EXCLUDED.label,
  category = EXCLUDED.category,
  value_type = EXCLUDED.value_type,
  display_order = EXCLUDED.display_order,
  updated_at = NOW();

