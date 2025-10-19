import { supabase } from './supabase'
import type { Pet, NewPet, UpdatePet, Appointment, NewAppointment, PetPhoto, NewPetPhoto } from '@/types/database'

// Pet CRUD operations
export async function getPets() {
  const { data, error } = await supabase
    .from('pets')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data as Pet[]
}

export async function getPetById(id: string) {
  const { data, error } = await supabase
    .from('pets')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data as Pet
}

export async function createPet(pet: NewPet) {
  const { data, error } = await supabase
    .from('pets')
    .insert(pet)
    .select()
    .single()
  
  if (error) throw error
  return data as Pet
}

export async function updatePet(id: string, updates: UpdatePet) {
  const { data, error } = await supabase
    .from('pets')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data as Pet
}

export async function deletePet(id: string) {
  const { error } = await supabase
    .from('pets')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}

// Appointment operations
export async function getAppointmentsByPetId(petId: string) {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .eq('pet_id', petId)
    .order('appointment_date', { ascending: true })
  
  if (error) throw error
  return data as Appointment[]
}

export async function createAppointment(appointment: NewAppointment) {
  const { data, error } = await supabase
    .from('appointments')
    .insert(appointment)
    .select()
    .single()
  
  if (error) throw error
  return data as Appointment
}

export async function updateAppointment(id: string, updates: Partial<Appointment>) {
  const { data, error } = await supabase
    .from('appointments')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data as Appointment
}

export async function deleteAppointment(id: string) {
  const { error } = await supabase
    .from('appointments')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}

// Pet photos operations
export async function getPhotosByPetId(petId: string) {
  const { data, error } = await supabase
    .from('pet_photos')
    .select('*')
    .eq('pet_id', petId)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data as PetPhoto[]
}

export async function addPetPhoto(photo: NewPetPhoto) {
  const { data, error } = await supabase
    .from('pet_photos')
    .insert(photo)
    .select()
    .single()
  
  if (error) throw error
  return data as PetPhoto
}

export async function deletePetPhoto(id: string) {
  const { error } = await supabase
    .from('pet_photos')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}

// Real-time subscriptions
export function subscribeToTableChanges(
  table: 'pets' | 'appointments' | 'pet_photos',
  callback: (payload: { eventType: string; new: Record<string, unknown>; old: Record<string, unknown> }) => void
) {
  return supabase
    .channel(`${table}_changes`)
    .on('postgres_changes', { event: '*', schema: 'public', table }, callback)
    .subscribe()
}
