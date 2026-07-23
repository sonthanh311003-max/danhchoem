-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  name TEXT NOT NULL,
  recipient TEXT,
  celebration TEXT,
  theme TEXT DEFAULT 'Classic',
  music TEXT,
  letter_content TEXT,
  share_slug TEXT UNIQUE,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create project_images table
CREATE TABLE IF NOT EXISTS project_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  url TEXT NOT NULL,
  caption TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger function to automatically generate random 8-character share_slug on insert
CREATE OR REPLACE FUNCTION generate_share_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.share_slug IS NULL THEN
    NEW.share_slug := substring(md5(random()::text), 1, 8);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_share_slug
  BEFORE INSERT ON projects
  FOR EACH ROW
  EXECUTE FUNCTION generate_share_slug();

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;

-- Policies for projects
CREATE POLICY "Users can manage their own projects"
  ON projects
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can view public projects by share_slug"
  ON projects
  FOR SELECT
  TO anon, authenticated
  USING (is_public = true);

-- Policies for project_images
CREATE POLICY "Users can manage images of their own projects"
  ON project_images
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_images.project_id
      AND projects.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_images.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can view images of public projects"
  ON project_images
  FOR SELECT
  TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_images.project_id
      AND projects.is_public = true
    )
  );
