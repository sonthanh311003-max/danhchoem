-- -------------------------------------------------------------
-- FILE SQL KHỞI TẠO CƠ SỞ DỮ LIỆU TRÊN SUPABASE (POSTGRESQL)
-- -------------------------------------------------------------
-- Bạn chỉ cần truy cập vào trang quản trị Supabase -> Chọn dự án của bạn
-- -> Vào mục "SQL Editor" -> Chọn "New Query" -> Dán toàn bộ nội dung dưới đây và bấm "Run".

-- 1. BẢNG CẤU HÌNH CẶP ĐÔI (couples)
CREATE TABLE IF NOT EXISTS couples (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  partner1 VARCHAR(255) NOT NULL,
  partner2 VARCHAR(255) NOT NULL,
  anniversary_date DATE NOT NULL,
  theme VARCHAR(50) DEFAULT 'pink',
  music_url TEXT,
  secret_letter_key VARCHAR(100),
  secret_letter_content TEXT,
  future_letter_content TEXT,
  future_letter_open_date DATE,
  spotify_playlist_url TEXT,
  maps_embed_url TEXT,
  avatar1_url TEXT,
  avatar2_url TEXT,
  cover_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. BẢNG DÒNG THỜI GIAN KỶ NIỆM (timelines)
CREATE TABLE IF NOT EXISTS timelines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id UUID REFERENCES couples(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  date DATE NOT NULL,
  description TEXT NOT NULL,
  media_url TEXT,
  media_type VARCHAR(50) DEFAULT 'image', -- image hoặc video
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. BẢNG ALBUM ẢNH (albums)
CREATE TABLE IF NOT EXISTS albums (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id UUID REFERENCES couples(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  caption VARCHAR(255),
  date DATE NOT NULL,
  year INTEGER NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. BẢNG MỤC TIÊU BUCKET LIST (bucket_list)
CREATE TABLE IF NOT EXISTS bucket_list (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id UUID REFERENCES couples(id) ON DELETE CASCADE,
  task VARCHAR(255) NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. BẢNG LƯU BÚT GUESTBOOK (guestbook)
CREATE TABLE IF NOT EXISTS guestbook (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id UUID REFERENCES couples(id) ON DELETE CASCADE,
  sender_name VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  emoji VARCHAR(50) DEFAULT '❤️',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -------------------------------------------------------------
-- CHÈN DỮ LIỆU ĐỂ TEST MẪU (BẠN LINH & MINH)
-- -------------------------------------------------------------
-- Chèn cặp đôi mẫu (Lấy ID làm mốc)
INSERT INTO couples (
  id, slug, partner1, partner2, anniversary_date, theme, music_url,
  secret_letter_key, secret_letter_content, future_letter_content, future_letter_open_date,
  spotify_playlist_url, maps_embed_url, avatar1_url, avatar2_url, cover_image_url
) VALUES (
  '11111111-1111-1111-1111-111111111111', 
  'linh-minh', 
  'Linh', 
  'Minh', 
  '2024-04-23', 
  'pink',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  '23042024',
  'Dear Minh,\n\nCập nhật dữ liệu từ Supabase nhé! Cảm ơn vì đã xuất hiện trong đời của Linh ❤️',
  'Chào hai đứa năm 2030 từ Supabase nhé!',
  '2030-04-23',
  'https://open.spotify.com/embed/playlist/37i9dQZF1DX4g8Gs5nNNki',
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4607738221896!2d106.69741547469721!3d10.776019559203673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4705555555%3A0xe10f930e461b6b55!2sHighlands%20Coffee!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1200&auto=format&fit=crop'
) ON CONFLICT (slug) DO NOTHING;

-- Chèn timeline mẫu
INSERT INTO timelines (couple_id, title, location, date, description, media_url, media_type, order_index) VALUES
('11111111-1111-1111-1111-111111111111', 'Lần đầu gặp nhau', 'Highlands Coffee Nhà Thờ', '2023-08-20', 'Chiều mưa Hà Nội hai ánh mắt chạm nhau.', 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=600&auto=format&fit=crop', 'image', 0),
('11111111-1111-1111-1111-111111111111', 'Sinh nhật đầu tiên', 'Home Sweet Home', '2023-11-15', 'Cùng thổi nến dưới chiếc bánh méo mó ấm áp.', 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=600&auto=format&fit=crop', 'image', 1)
ON CONFLICT DO NOTHING;
