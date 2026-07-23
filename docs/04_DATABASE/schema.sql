-- -------------------------------------------------------------
-- DIGITAL MEMORIES — COMPLETE SUPABASE DATABASE SCHEMA
-- Version 1.0
-- -------------------------------------------------------------

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    display_name VARCHAR(255),
    avatar_url TEXT,
    language VARCHAR(10) DEFAULT 'vi' NOT NULL,
    timezone VARCHAR(50) DEFAULT 'Asia/Ho_Chi_Minh' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS couples (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    partner_id UUID REFERENCES users(id) ON DELETE SET NULL,
    anniversary DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'active' NOT NULL,
    relationship_title VARCHAR(255) DEFAULT 'Tình yêu của chúng mình' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS themes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    palette JSONB NOT NULL,
    font JSONB NOT NULL,
    background TEXT,
    motion_profile JSONB,
    texture TEXT,
    soundscape TEXT,
    preview_image TEXT
);

CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    couple_id UUID REFERENCES couples(id) ON DELETE CASCADE NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    cover_image TEXT,
    theme_id UUID REFERENCES themes(id) ON DELETE SET NULL,
    visibility VARCHAR(50) DEFAULT 'public' NOT NULL,
    password_hash VARCHAR(255),
    status VARCHAR(50) DEFAULT 'published' NOT NULL,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS memories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(255) NOT NULL,
    story TEXT,
    emotion VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    location VARCHAR(255),
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    weather VARCHAR(100),
    cover_asset TEXT,
    favorite BOOLEAN DEFAULT FALSE NOT NULL,
    sort_order INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS memory_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    memory_id UUID REFERENCES memories(id) ON DELETE CASCADE NOT NULL,
    type VARCHAR(50) NOT NULL,
    url TEXT NOT NULL,
    thumbnail TEXT,
    duration DECIMAL(10,2),
    size INTEGER,
    width INTEGER,
    height INTEGER,
    cloudinary_public_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS letters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    font_style VARCHAR(100),
    paper_style VARCHAR(100),
    signature VARCHAR(255),
    locked BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS shares (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE,
    password_hash VARCHAR(255),
    allow_download BOOLEAN DEFAULT TRUE NOT NULL,
    allow_comments BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
    author VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_couple ON projects(couple_id);
CREATE INDEX IF NOT EXISTS idx_memories_project ON memories(project_id);
CREATE INDEX IF NOT EXISTS idx_memories_date ON memories(date);
CREATE INDEX IF NOT EXISTS idx_memories_emotion ON memories(emotion);
CREATE INDEX IF NOT EXISTS idx_memory_assets_memory ON memory_assets(memory_id);
CREATE INDEX IF NOT EXISTS idx_shares_token ON shares(token);

ALTER TABLE couples ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE letters ENABLE ROW LEVEL SECURITY;

CREATE POLICY couples_access_policy ON couples
    FOR ALL
    USING (owner_id = auth.uid() OR partner_id = auth.uid());

CREATE POLICY projects_read_policy ON projects
    FOR SELECT
    USING (
        visibility = 'public' 
        OR couple_id IN (
            SELECT id FROM couples WHERE owner_id = auth.uid() OR partner_id = auth.uid()
        )
    );

CREATE POLICY projects_write_policy ON projects
    FOR ALL
    USING (
        couple_id IN (
            SELECT id FROM couples WHERE owner_id = auth.uid() OR partner_id = auth.uid()
        )
    );
