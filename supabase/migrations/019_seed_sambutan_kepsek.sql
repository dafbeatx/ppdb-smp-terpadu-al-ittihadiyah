-- Migration 019: Seed Sambutan Kepala Sekolah
UPDATE page_contents
SET 
    value = 'Membina Generasi Qur''ani yang Cerdas, Berkarakter, dan Berakhlak Mulia',
    updated_at = NOW()
WHERE section = 'sambutan' AND key = 'judul';

UPDATE page_contents
SET 
    value = 'Assalamu''alaikum Warahmatullahi Wabarakatuh.

Puji dan syukur senantiasa kita panjatkan ke hadirat Allah SWT atas limpahan rahmat, taufik, serta hidayah-Nya. Shalawat dan salam semoga senantiasa tercurahkan kepada junjungan kita Nabi Muhammad SAW, beserta keluarga, sahabat, dan umatnya hingga akhir zaman.

Selamat datang di website resmi SMP Terpadu Al-Ittihadiyah Ciampea, Kabupaten Bogor.

Pendidikan tingkat menengah pertama merupakan fase keemasan sekaligus masa transisi yang sangat menentukan arah masa depan putra-putri kita. Di era kemajuan teknologi dan derasnya arus pergaulan saat ini, kecerdasan akademis semata tidak lagi cukup. Anak-anak kita membutuhkan benteng spiritual yang kokoh, pondasi adab yang luhur, serta lingkungan belajar yang sehat dan penuh keteladanan.

SMP Terpadu Al-Ittihadiyah berikhtiar hadir menjawab kegelisahan para orang tua dengan menyatukan keunggulan Kurikulum Nasional dan kurikulum kepesantrenan. Melalui pembiasaan ibadah harian seperti sholat berjamaah, sholat dhuha, halaqah tahfidz Al-Qur''an, dan bimbingan karakter AKBAR (Aktif, Kreatif, Berakhlak Mulia), kami mendidik para santri selayaknya anak kandung sendiri dengan kesabaran dan cinta kasih.

Melalui Sistem Penerimaan Murid Baru (SPMB) Tahun Ajaran 2026/2027 ini, kami membuka pintu silaturahmi seluas-luasnya bagi Bapak dan Ibu yang menghendaki pendidikan terbaik bagi buah hatinya. Mari bersama-sama bersinergi mengantarkan putra-putri kita menjadi pribadi yang cerdas intelektualnya, terampil amaliyahnya, dan mulia akhlaknya.

Wassalamu''alaikum Warahmatullahi Wabarakatuh.',
    updated_at = NOW()
WHERE section = 'sambutan' AND key = 'isi';

