'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking')
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    // Test Supabase connection
    const checkConnection = async () => {
      try {
        // Simple health check - attempt to query the database
        const { error } = await supabase.from('pets').select('count', { count: 'exact', head: true })
        
        if (error) {
          // If the table doesn't exist yet, that's okay - connection is still good
          if (error.message.includes('relation') || error.message.includes('does not exist')) {
            setConnectionStatus('connected')
            setErrorMessage('Connected! Run the schema.sql to create tables.')
          } else {
            setConnectionStatus('error')
            setErrorMessage(error.message)
          }
        } else {
          setConnectionStatus('connected')
        }
      } catch (err) {
        setConnectionStatus('error')
        setErrorMessage(err instanceof Error ? err.message : 'Unknown error')
      }
    }

    checkConnection()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
              🐾 My AWESOME Pet Site
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              A modern pet management platform powered by Next.js and Supabase
            </p>
          </div>

          {/* Supabase Connection Status */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Supabase Connection Status
            </h2>
            <div className="flex items-center gap-3">
              {connectionStatus === 'checking' && (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                  <span className="text-gray-600 dark:text-gray-300">Checking connection...</span>
                </>
              )}
              {connectionStatus === 'connected' && (
                <>
                  <div className="h-5 w-5 bg-green-500 rounded-full"></div>
                  <span className="text-green-600 dark:text-green-400 font-medium">
                    ✓ Connected to Supabase
                  </span>
                </>
              )}
              {connectionStatus === 'error' && (
                <>
                  <div className="h-5 w-5 bg-red-500 rounded-full"></div>
                  <span className="text-red-600 dark:text-red-400 font-medium">
                    ✗ Connection Error
                  </span>
                </>
              )}
            </div>
            {errorMessage && (
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">{errorMessage}</p>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                🐕 Pet Management
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Create and manage profiles for all your beloved pets with detailed information.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                📅 Appointments
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Schedule and track appointments for grooming, checkups, and vaccinations.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                📸 Photo Gallery
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Upload and organize photos of your pets to cherish every moment.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                🔒 Secure & Private
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your data is protected with Supabase authentication and row-level security.
              </p>
            </div>
          </div>

          {/* Setup Instructions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Quick Setup
            </h2>
            <ol className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="flex gap-3">
                <span className="font-semibold text-blue-600 dark:text-blue-400">1.</span>
                <span>Create a Supabase project at <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">supabase.com</a></span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-blue-600 dark:text-blue-400">2.</span>
                <span>Copy your project URL and anon key to <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">.env.local</code></span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-blue-600 dark:text-blue-400">3.</span>
                <span>Run the SQL from <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">supabase/schema.sql</code> in your Supabase SQL Editor</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-blue-600 dark:text-blue-400">4.</span>
                <span>Start building your pet management features!</span>
              </li>
            </ol>
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                💡 <strong>Tip:</strong> Check the README.md for detailed setup instructions and API examples.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
