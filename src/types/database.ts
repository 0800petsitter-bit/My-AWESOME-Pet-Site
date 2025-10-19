// Database types for Supabase tables

export interface Pet {
  id: string
  name: string
  type: string
  breed?: string | null
  age?: number | null
  description?: string | null
  image_url?: string | null
  owner_id: string
  created_at: string
  updated_at: string
}

export interface Appointment {
  id: string
  pet_id: string
  appointment_date: string
  service_type: string
  notes?: string | null
  status: 'scheduled' | 'completed' | 'cancelled'
  created_at: string
  updated_at: string
}

export interface PetPhoto {
  id: string
  pet_id: string
  photo_url: string
  caption?: string | null
  created_at: string
}

// Types for creating new records (without auto-generated fields)
export type NewPet = Omit<Pet, 'id' | 'created_at' | 'updated_at'>
export type NewAppointment = Omit<Appointment, 'id' | 'created_at' | 'updated_at'>
export type NewPetPhoto = Omit<PetPhoto, 'id' | 'created_at'>

// Types for updating records (all fields optional except id)
export type UpdatePet = Partial<Omit<Pet, 'id' | 'created_at' | 'updated_at'>>
export type UpdateAppointment = Partial<Omit<Appointment, 'id' | 'created_at' | 'updated_at'>>
