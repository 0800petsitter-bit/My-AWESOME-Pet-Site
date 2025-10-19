import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Only create client if both URL and key are provided and URL is valid
const isValidUrl = (url: string) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Create a dummy client if credentials are not set (for development/build)
const createSupabaseClient = () => {
  if (supabaseUrl && supabaseAnonKey && isValidUrl(supabaseUrl)) {
    return createClient(supabaseUrl, supabaseAnonKey)
  }
  
  // Return a placeholder client for when credentials aren't configured
  console.warn('⚠️  Supabase credentials not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file.')
  
  // Create a minimal client with dummy values for build/development without credentials
  return createClient('https://placeholder.supabase.co', 'placeholder-key')
}

export const supabase = createSupabaseClient()

