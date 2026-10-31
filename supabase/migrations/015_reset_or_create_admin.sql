-- ====================================================================
-- SCRIPT PERBAIKAN & RESET ADMIN SUPABASE
-- Jalankan query ini di Supabase Dashboard -> SQL Editor
-- (https://supabase.com/dashboard/project/sgdyjuvdjqoiahvslgas/sql)
-- ====================================================================

-- 1. Perbaiki kolom NULL di auth.users (Penyebab error 500: Database error querying schema)
UPDATE auth.users
SET 
  confirmation_token = COALESCE(confirmation_token, ''),
  recovery_token = COALESCE(recovery_token, ''),
  email_change = COALESCE(email_change, ''),
  email_change_token_new = COALESCE(email_change_token_new, ''),
  email_change_token_current = COALESCE(email_change_token_current, ''),
  phone = COALESCE(phone, ''),
  phone_change = COALESCE(phone_change, ''),
  phone_change_token = COALESCE(phone_change_token, ''),
  reauthentication_token = COALESCE(reauthentication_token, ''),
  encrypted_password = crypt('admin123456', gen_salt('bf')),
  email_confirmed_at = COALESCE(email_confirmed_at, NOW()),
  updated_at = NOW()
WHERE email = 'admin@ittihadiyah.sch.id';

-- 2. Pastikan identity untuk provider 'email' terdaftar di auth.identities
INSERT INTO auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  provider_id,
  last_sign_in_at,
  created_at,
  updated_at
)
SELECT 
  id,
  id,
  jsonb_build_object('sub', id::text, 'email', email),
  'email',
  id::text,
  NOW(),
  NOW(),
  NOW()
FROM auth.users
WHERE email = 'admin@ittihadiyah.sch.id'
ON CONFLICT DO NOTHING;

-- 3. Pastikan email terdaftar di tabel public.admin_users
INSERT INTO public.admin_users (email)
VALUES ('admin@ittihadiyah.sch.id')
ON CONFLICT (email) DO NOTHING;
