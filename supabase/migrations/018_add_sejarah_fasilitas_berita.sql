-- Migration 018: Add Sejarah, Fasilitas, and Berita categories to page_contents
-- Executed to provide full admin CMS synchronization

INSERT INTO page_contents (section, key, value_type, value, label, category, display_order)
VALUES
-- SEJARAH
('sejarah', 'title', 'text', 'Sejarah & Perjalanan Kami', 'Judul Halaman Sejarah', 'sejarah', 1),
('sejarah', 'subtitle', 'textarea', 'Membangun peradaban generasi muda melalui perpaduan ilmu pengetahuan umum, pembiasaan ibadah, dan penguatan nilai Al-Qur''an di Ciampea, Bogor.', 'Subjudul Sejarah', 'sejarah', 2),
('sejarah', 'latar_belakang_1', 'textarea', 'SMP Terpadu Al-Ittihadiyah lahir dari kepedulian mendalam para tokoh pendidikan dan masyarakat di Ciampea, Kabupaten Bogor terhadap tantangan pendidikan usia remaja. Di tengah derasnya arus globalisasi dan ancaman pergaulan bebas, dirasakan adanya kebutuhan mendesak akan lembaga pendidikan tingkat menengah pertama yang mampu menjadi benteng moral sekaligus kawah candradimuka intelektual bagi putra-putri Islam.', 'Latar Belakang - Paragraf 1', 'sejarah', 3),
('sejarah', 'latar_belakang_2', 'textarea', 'Dengan mengusung konsep Sekolah Menengah Pertama Terpadu, yayasan berikhtiar memadukan keunggulan Kurikulum Nasional (Kemendikbudristek) dengan kurikulum kepesantrenan yang menitikberatkan pada pembinaan akhlak mulia, tahfidz Al-Qur''an, dan pembiasaan ibadah harian.', 'Latar Belakang - Paragraf 2', 'sejarah', 4),
('sejarah', 'tonggak_1_tahun', 'text', 'Tahun 2018', 'Tonggak 1 - Tahun', 'sejarah', 5),
('sejarah', 'tonggak_1_desc', 'textarea', 'Peletakan batu pertama dan perintisan gedung pembelajaran di Ciampea Udik, dimulai dengan rombongan belajar perdana santri mukim dan non-mukim.', 'Tonggak 1 - Narasi Perkembangan', 'sejarah', 6),
('sejarah', 'tonggak_2_tahun', 'text', 'Tahun 2021', 'Tonggak 2 - Tahun', 'sejarah', 7),
('sejarah', 'tonggak_2_desc', 'textarea', 'Raihan akreditasi resmi dari Badan Akreditasi Nasional (BAN-S/M) serta perluasan sarana laboratorium komputer dan masjid sekolah.', 'Tonggak 2 - Narasi Perkembangan', 'sejarah', 8),
('sejarah', 'tonggak_3_tahun', 'text', 'Tahun 2024 - Sekarang', 'Tonggak 3 - Tahun', 'sejarah', 9),
('sejarah', 'tonggak_3_desc', 'textarea', 'Penerapan Kurikulum Merdeka Terpadu berbasis digital, penguatan program tahfidz mandiri, dan integrasi pendaftaran santri baru online.', 'Tonggak 3 - Narasi Perkembangan', 'sejarah', 10),
('sejarah', 'komitmen', 'textarea', 'Hingga saat ini, SMP Terpadu Al-Ittihadiyah terus berinovasi dalam metode pengajaran tanpa meninggalkan akar nilai adab Islam. Kami berkomitmen untuk terus menjadi mitra terpercaya bagi para orang tua dalam mengantarkan anak-anak menuju gerbang masa depan yang cemerlang, berilmu amaliyah, dan berakhlak karimah.', 'Komitmen Masa Depan', 'sejarah', 11),

-- FASILITAS
('fasilitas', 'title', 'text', 'Fasilitas Sekolah Al-Ittihadiyah', 'Judul Halaman Fasilitas', 'fasilitas', 1),
('fasilitas', 'subtitle', 'textarea', 'Mendukung kenyamanan, keselamatan, dan efektivitas proses belajar mengajar serta pembinaan akhlak santri setiap hari.', 'Subjudul Fasilitas', 'fasilitas', 2),
('fasilitas', 'item_1_title', 'text', 'Masjid & Musholla Sekolah', 'Fasilitas 1 - Nama', 'fasilitas', 3),
('fasilitas', 'item_1_tag', 'text', 'Spiritual & Ibadah', 'Fasilitas 1 - Kategori/Tag', 'fasilitas', 4),
('fasilitas', 'item_1_desc', 'textarea', 'Pusat pembiasaan ibadah sholat lima waktu berjamaah, sholat dhuha rutin, tadarus pagi, dan halaqah bimbingan tahfidz Al-Qur''an dalam suasana khusyuk.', 'Fasilitas 1 - Deskripsi', 'fasilitas', 5),
('fasilitas', 'item_2_title', 'text', 'Ruang Kelas Bersih & Representatif', 'Fasilitas 2 - Nama', 'fasilitas', 6),
('fasilitas', 'item_2_tag', 'text', 'Akademik', 'Fasilitas 2 - Kategori/Tag', 'fasilitas', 7),
('fasilitas', 'item_2_desc', 'textarea', 'Ruang belajar terang, bersih, dan berorientasi pada kenyamanan interaksi guru dan santri demi tercapainya fokus belajar maksimal.', 'Fasilitas 2 - Deskripsi', 'fasilitas', 8),
('fasilitas', 'item_3_title', 'text', 'Laboratorium Komputer', 'Fasilitas 3 - Nama', 'fasilitas', 9),
('fasilitas', 'item_3_tag', 'text', 'Teknologi', 'Fasilitas 3 - Kategori/Tag', 'fasilitas', 10),
('fasilitas', 'item_3_desc', 'textarea', 'Fasilitas perangkat komputer terkini untuk mengenalkan literasi digital, Asesmen Nasional Berbasis Komputer (ANBK), dan keahlian komputasi dasar.', 'Fasilitas 3 - Deskripsi', 'fasilitas', 11),
('fasilitas', 'item_4_title', 'text', 'Perpustakaan & Ruang Baca', 'Fasilitas 4 - Nama', 'fasilitas', 12),
('fasilitas', 'item_4_tag', 'text', 'Literasi', 'Fasilitas 4 - Kategori/Tag', 'fasilitas', 13),
('fasilitas', 'item_4_desc', 'textarea', 'Koleksi buku pelajaran nasional, kitab-kitab penunjang keislaman, ensiklopedia sains, dan literatur motivasi pembangun karakter remaja.', 'Fasilitas 4 - Deskripsi', 'fasilitas', 14),
('fasilitas', 'item_5_title', 'text', 'Lapangan Olahraga Serbaguna', 'Fasilitas 5 - Nama', 'fasilitas', 15),
('fasilitas', 'item_5_tag', 'text', 'Kebugaran & Kesiswaan', 'Fasilitas 5 - Kategori/Tag', 'fasilitas', 16),
('fasilitas', 'item_5_desc', 'textarea', 'Area terbuka yang luas untuk upacara bendera, senam santri, latihan futsal, bola voli, bulutangkis, dan kegiatan ekstrakurikuler kepramukaan.', 'Fasilitas 5 - Deskripsi', 'fasilitas', 17),
('fasilitas', 'item_6_title', 'text', 'Lingkungan Asri & Aman', 'Fasilitas 6 - Nama', 'fasilitas', 18),
('fasilitas', 'item_6_tag', 'text', 'Kenyamanan', 'Fasilitas 6 - Kategori/Tag', 'fasilitas', 19),
('fasilitas', 'item_6_desc', 'textarea', 'Suasana sekolah yang asri, tenang, dan jauh dari kebisingan jalan raya utama, dilengkapi tata tertib pengawasan pergaulan ramah anak yang bebas bullying.', 'Fasilitas 6 - Deskripsi', 'fasilitas', 20),

-- BERITA LIST JSON
('berita', 'articles_list', 'textarea', '[]', 'Daftar Artikel & Berita Sekolah', 'berita', 1)
ON CONFLICT (section, key) DO UPDATE 
SET 
  label = EXCLUDED.label,
  category = EXCLUDED.category,
  value_type = EXCLUDED.value_type,
  display_order = EXCLUDED.display_order;

