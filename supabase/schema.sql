-- Pet Site Database Schema
-- Run this SQL in your Supabase SQL Editor to set up the database

-- Create pets table
CREATE TABLE IF NOT EXISTS pets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- e.g., 'dog', 'cat', 'bird', etc.
  breed TEXT,
  age INTEGER,
  description TEXT,
  image_url TEXT,
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  pet_id UUID REFERENCES pets(id) ON DELETE CASCADE NOT NULL,
  appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
  service_type TEXT NOT NULL, -- e.g., 'grooming', 'checkup', 'vaccination', etc.
  notes TEXT,
  status TEXT DEFAULT 'scheduled', -- 'scheduled', 'completed', 'cancelled'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create pet_photos table for additional images
CREATE TABLE IF NOT EXISTS pet_photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  pet_id UUID REFERENCES pets(id) ON DELETE CASCADE NOT NULL,
  photo_url TEXT NOT NULL,
  caption TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE pet_photos ENABLE ROW LEVEL SECURITY;

-- Create policies for pets table
CREATE POLICY "Users can view all pets"
  ON pets FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own pets"
  ON pets FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their own pets"
  ON pets FOR UPDATE
  USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete their own pets"
  ON pets FOR DELETE
  USING (auth.uid() = owner_id);

-- Create policies for appointments table
CREATE POLICY "Users can view appointments for their pets"
  ON appointments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM pets
      WHERE pets.id = appointments.pet_id
      AND pets.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can create appointments for their pets"
  ON appointments FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM pets
      WHERE pets.id = appointments.pet_id
      AND pets.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can update appointments for their pets"
  ON appointments FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM pets
      WHERE pets.id = appointments.pet_id
      AND pets.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete appointments for their pets"
  ON appointments FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM pets
      WHERE pets.id = appointments.pet_id
      AND pets.owner_id = auth.uid()
    )
  );

-- Create policies for pet_photos table
CREATE POLICY "Users can view all pet photos"
  ON pet_photos FOR SELECT
  USING (true);

CREATE POLICY "Users can insert photos for their pets"
  ON pet_photos FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM pets
      WHERE pets.id = pet_photos.pet_id
      AND pets.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can update photos for their pets"
  ON pet_photos FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM pets
      WHERE pets.id = pet_photos.pet_id
      AND pets.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete photos for their pets"
  ON pet_photos FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM pets
      WHERE pets.id = pet_photos.pet_id
      AND pets.owner_id = auth.uid()
    )
  );

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS pets_owner_id_idx ON pets(owner_id);
CREATE INDEX IF NOT EXISTS appointments_pet_id_idx ON appointments(pet_id);
CREATE INDEX IF NOT EXISTS appointments_date_idx ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS pet_photos_pet_id_idx ON pet_photos(pet_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to auto-update updated_at
CREATE TRIGGER update_pets_updated_at BEFORE UPDATE ON pets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
