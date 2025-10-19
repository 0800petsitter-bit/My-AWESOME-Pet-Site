/**
 * Example: How to use the Pet Management API
 * 
 * This file demonstrates how to use the Supabase API functions
 * to manage pets, appointments, and photos.
 */

import React from 'react'
import { 
  getPets, 
  getPetById, 
  createPet, 
  updatePet, 
  deletePet,
  getAppointmentsByPetId,
  createAppointment,
  subscribeToTableChanges
} from '@/lib/api'

// Example 1: Fetch all pets
async function exampleGetAllPets() {
  try {
    const pets = await getPets()
    console.log('All pets:', pets)
  } catch (error) {
    console.error('Error fetching pets:', error)
  }
}

// Example 2: Create a new pet
async function exampleCreatePet() {
  try {
    const newPet = await createPet({
      name: 'Buddy',
      type: 'dog',
      breed: 'Golden Retriever',
      age: 3,
      description: 'Friendly and loves to play fetch',
      image_url: 'https://example.com/buddy.jpg',
      owner_id: 'user-uuid-here' // Replace with actual user ID from auth
    })
    console.log('Created pet:', newPet)
    return newPet
  } catch (error) {
    console.error('Error creating pet:', error)
  }
}

// Example 3: Update a pet
async function exampleUpdatePet(petId: string) {
  try {
    const updatedPet = await updatePet(petId, {
      age: 4,
      description: 'Friendly and loves to play fetch and swim'
    })
    console.log('Updated pet:', updatedPet)
  } catch (error) {
    console.error('Error updating pet:', error)
  }
}

// Example 4: Get a specific pet
async function exampleGetPetById(petId: string) {
  try {
    const pet = await getPetById(petId)
    console.log('Pet details:', pet)
  } catch (error) {
    console.error('Error fetching pet:', error)
  }
}

// Example 5: Delete a pet
async function exampleDeletePet(petId: string) {
  try {
    await deletePet(petId)
    console.log('Pet deleted successfully')
  } catch (error) {
    console.error('Error deleting pet:', error)
  }
}

// Example 6: Create an appointment
async function exampleCreateAppointment(petId: string) {
  try {
    // Schedule appointment for one week from now
    const appointmentDate = new Date()
    appointmentDate.setDate(appointmentDate.getDate() + 7)
    
    const appointment = await createAppointment({
      pet_id: petId,
      appointment_date: appointmentDate.toISOString(),
      service_type: 'grooming',
      notes: 'First grooming appointment',
      status: 'scheduled'
    })
    console.log('Created appointment:', appointment)
  } catch (error) {
    console.error('Error creating appointment:', error)
  }
}

// Example 7: Get appointments for a pet
async function exampleGetAppointments(petId: string) {
  try {
    const appointments = await getAppointmentsByPetId(petId)
    console.log('Pet appointments:', appointments)
  } catch (error) {
    console.error('Error fetching appointments:', error)
  }
}

// Example 8: Subscribe to real-time changes
function exampleRealtimeSubscription() {
  const channel = subscribeToTableChanges('pets', (payload) => {
    console.log('Change received!', payload)
    
    // Handle different event types
    if (payload.eventType === 'INSERT') {
      console.log('New pet added:', payload.new)
    } else if (payload.eventType === 'UPDATE') {
      console.log('Pet updated:', payload.new)
    } else if (payload.eventType === 'DELETE') {
      console.log('Pet deleted:', payload.old)
    }
  })

  // To unsubscribe later:
  // channel.unsubscribe()
  
  return channel
}

// Example 9: Using in a React component
export function PetListComponent() {
  const [pets, setPets] = React.useState<Array<{
    id: string
    name: string
    type: string
    breed?: string | null
  }>>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    loadPets()
    
    // Subscribe to changes
    const channel = subscribeToTableChanges('pets', () => {
      loadPets() // Reload pets when data changes
    })

    return () => {
      channel.unsubscribe()
    }
  }, [])

  async function loadPets() {
    try {
      const data = await getPets()
      setPets(data)
    } catch (error) {
      console.error('Error loading pets:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h2>My Pets</h2>
      {pets.map(pet => (
        <div key={pet.id}>
          <h3>{pet.name}</h3>
          <p>Type: {pet.type}</p>
          {pet.breed && <p>Breed: {pet.breed}</p>}
        </div>
      ))}
    </div>
  )
}

// Example 10: Error handling with try-catch
async function exampleWithErrorHandling() {
  try {
    const pets = await getPets()
    
    if (pets.length === 0) {
      console.log('No pets found. Add your first pet!')
    } else {
      console.log(`Found ${pets.length} pets`)
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      
      // Handle specific error types
      if (error.message.includes('JWT')) {
        console.log('Authentication error - please log in')
      } else if (error.message.includes('permission')) {
        console.log('Permission error - check RLS policies')
      }
    }
  }
}

// Example 11: Batch operations
async function exampleBatchCreate() {
  const petsToCreate = [
    {
      name: 'Max',
      type: 'dog',
      breed: 'Labrador',
      age: 5,
      owner_id: 'user-uuid'
    },
    {
      name: 'Whiskers',
      type: 'cat',
      breed: 'Siamese',
      age: 2,
      owner_id: 'user-uuid'
    },
    {
      name: 'Tweety',
      type: 'bird',
      breed: 'Canary',
      age: 1,
      owner_id: 'user-uuid'
    }
  ]

  try {
    const createdPets = await Promise.all(
      petsToCreate.map(pet => createPet(pet))
    )
    console.log('Created multiple pets:', createdPets)
  } catch (error) {
    console.error('Error creating pets:', error)
  }
}

export {
  exampleGetAllPets,
  exampleCreatePet,
  exampleUpdatePet,
  exampleGetPetById,
  exampleDeletePet,
  exampleCreateAppointment,
  exampleGetAppointments,
  exampleRealtimeSubscription,
  exampleWithErrorHandling,
  exampleBatchCreate
}
