# Supabase Setup Guide

This guide will walk you through setting up Supabase for the My AWESOME Pet Site.

## Prerequisites

- A Supabase account (sign up at [supabase.com](https://supabase.com))
- Node.js 18 or higher installed
- Git installed

## Step 1: Create a Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Click "New Project"
3. Fill in the project details:
   - **Name**: My AWESOME Pet Site (or your preferred name)
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose the region closest to your users
4. Click "Create new project"
5. Wait for the project to be set up (this may take a minute)

## Step 2: Get Your API Credentials

1. Once your project is ready, go to **Project Settings** (gear icon in the sidebar)
2. Click on **API** in the settings menu
3. You'll see two important values:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")
4. Keep this tab open - you'll need these values in the next step

## Step 3: Configure Environment Variables

1. In your project directory, copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` in your text editor

3. Replace the placeholder values with your actual Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

4. Save the file

⚠️ **Important**: Never commit `.env.local` to version control. It's already in `.gitignore`.

## Step 4: Set Up the Database Schema

1. Go back to your Supabase project dashboard
2. Click on the **SQL Editor** icon in the sidebar (looks like `</>`)
3. Click **New Query**
4. Open the `supabase/schema.sql` file from this project
5. Copy the entire contents of the file
6. Paste it into the SQL Editor in Supabase
7. Click **Run** (or press Ctrl/Cmd + Enter)

You should see a success message. The schema creates:
- Three tables: `pets`, `appointments`, and `pet_photos`
- Row Level Security policies
- Indexes for performance
- Triggers for automatic timestamp updates

## Step 5: (Optional) Enable Authentication

If you want to add user authentication:

1. In your Supabase dashboard, go to **Authentication** → **Providers**
2. Enable the providers you want to use:
   - Email (enabled by default)
   - Google, GitHub, etc. (configure as needed)
3. Configure the auth settings according to your needs

## Step 6: Install Dependencies and Run

1. Install the project dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

4. You should see the pet site homepage with a green "Connected to Supabase" status indicator!

## Step 7: Test the Connection

The homepage automatically tests the Supabase connection. You should see:
- ✓ **Green indicator**: Successfully connected
- ✗ **Red indicator**: Check your environment variables or internet connection

## Next Steps

Now that Supabase is connected, you can:

1. **Add authentication**: Implement user sign-up and login
2. **Create pet profiles**: Use the API functions in `src/lib/api.ts`
3. **Upload images**: Set up Supabase Storage for pet photos
4. **Real-time features**: Use Supabase's real-time subscriptions

## Troubleshooting

### "Connection Error" on Homepage

**Possible causes:**
- Environment variables not set correctly
- Supabase project URL or key is wrong
- Database schema not created
- Internet connection issues

**Solutions:**
1. Double-check your `.env.local` file
2. Make sure you copied the correct URL and anon key from Supabase
3. Verify the schema was created successfully in the SQL Editor
4. Restart the dev server after changing environment variables

### "Table does not exist" Errors

**Solution:**
- Run the `supabase/schema.sql` script in your Supabase SQL Editor

### "Row Level Security" Errors

**Explanation:**
- RLS is enabled by default for security
- Anonymous users can read pets but need to be authenticated to create/update/delete

**Solutions:**
- Implement authentication for full CRUD operations
- Or temporarily disable RLS for testing (not recommended for production)

### Build Errors

**Common issues:**
- Missing dependencies: Run `npm install`
- TypeScript errors: Make sure all types are correct
- Environment variables: Build-time variables should start with `NEXT_PUBLIC_`

## Database Schema Reference

### Pets Table
```typescript
{
  id: string (UUID)
  name: string
  type: string (e.g., 'dog', 'cat', 'bird')
  breed: string | null
  age: number | null
  description: string | null
  image_url: string | null
  owner_id: string (references auth.users)
  created_at: timestamp
  updated_at: timestamp
}
```

### Appointments Table
```typescript
{
  id: string (UUID)
  pet_id: string (references pets)
  appointment_date: timestamp
  service_type: string (e.g., 'grooming', 'checkup')
  notes: string | null
  status: 'scheduled' | 'completed' | 'cancelled'
  created_at: timestamp
  updated_at: timestamp
}
```

### Pet Photos Table
```typescript
{
  id: string (UUID)
  pet_id: string (references pets)
  photo_url: string
  caption: string | null
  created_at: timestamp
}
```

## API Functions Reference

All API functions are available in `src/lib/api.ts`:

### Pets
- `getPets()` - Get all pets
- `getPetById(id)` - Get a specific pet
- `createPet(pet)` - Create a new pet
- `updatePet(id, updates)` - Update a pet
- `deletePet(id)` - Delete a pet

### Appointments
- `getAppointmentsByPetId(petId)` - Get appointments for a pet
- `createAppointment(appointment)` - Create an appointment
- `updateAppointment(id, updates)` - Update an appointment
- `deleteAppointment(id)` - Delete an appointment

### Photos
- `getPhotosByPetId(petId)` - Get photos for a pet
- `addPetPhoto(photo)` - Add a photo
- `deletePetPhoto(id)` - Delete a photo

### Real-time
- `subscribeToTableChanges(table, callback)` - Subscribe to database changes

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the Supabase documentation
3. Open an issue on GitHub
4. Join the Supabase Discord community

Happy coding! 🐾
