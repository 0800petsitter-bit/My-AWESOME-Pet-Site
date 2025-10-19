# Contributing to My AWESOME Pet Site

Thank you for your interest in contributing to the My AWESOME Pet Site! This guide will help you get started.

## Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/My-AWESOME-Pet-Site.git
   cd My-AWESOME-Pet-Site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase** (see SETUP.md for detailed instructions)
   - Create a Supabase project
   - Copy `.env.example` to `.env.local`
   - Add your Supabase credentials
   - Run the database schema

4. **Start the development server**
   ```bash
   npm run dev
   ```

## Project Structure

```
My-AWESOME-Pet-Site/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── lib/              # Utility functions and API
│   └── types/            # TypeScript type definitions
├── supabase/             # Database schema and migrations
├── examples/             # Code examples and tutorials
└── public/               # Static assets
```

## Making Changes

### Before You Start

1. Check existing issues and pull requests
2. Create an issue to discuss major changes
3. Create a new branch for your feature/fix

### Code Style

- Follow the existing code style
- Use TypeScript for type safety
- Run `npm run lint` before committing
- Ensure `npm run build` passes

### Adding Features

**New API Functions**
- Add functions to `src/lib/api.ts`
- Include TypeScript types
- Add error handling
- Update examples in `examples/api-usage.tsx`

**New Database Tables**
- Add schema to `supabase/schema.sql`
- Create TypeScript types in `src/types/database.ts`
- Add RLS policies for security
- Document in README and SETUP.md

**New UI Components**
- Use Tailwind CSS for styling
- Ensure responsive design
- Add TypeScript props
- Test on different screen sizes

### Testing Your Changes

1. **Lint your code**
   ```bash
   npm run lint
   ```

2. **Build the project**
   ```bash
   npm run build
   ```

3. **Test locally**
   ```bash
   npm run dev
   ```

4. **Test with Supabase**
   - Create test data in your Supabase project
   - Verify CRUD operations work
   - Check RLS policies are enforced

## Commit Guidelines

Use clear, descriptive commit messages:

```
feat: Add photo upload functionality
fix: Correct appointment date validation
docs: Update setup guide with troubleshooting
refactor: Simplify pet creation form
```

### Commit Message Format

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

## Pull Request Process

1. **Create a pull request**
   - Use a clear, descriptive title
   - Reference any related issues
   - Describe what changed and why
   - Include screenshots for UI changes

2. **Checklist**
   - [ ] Code follows project style guidelines
   - [ ] All tests pass (`npm run build` and `npm run lint`)
   - [ ] Documentation updated (if needed)
   - [ ] TypeScript types added/updated
   - [ ] No console errors or warnings
   - [ ] Tested locally with Supabase

3. **Review process**
   - Maintainers will review your PR
   - Address any feedback or questions
   - Once approved, your PR will be merged

## Adding New Features

### Example: Adding a Veterinarian Table

1. **Update database schema** (`supabase/schema.sql`):
   ```sql
   CREATE TABLE veterinarians (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     name TEXT NOT NULL,
     clinic_name TEXT,
     phone TEXT,
     email TEXT,
     specialization TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   
   -- Add RLS policies
   ALTER TABLE veterinarians ENABLE ROW LEVEL SECURITY;
   ```

2. **Add TypeScript types** (`src/types/database.ts`):
   ```typescript
   export interface Veterinarian {
     id: string
     name: string
     clinic_name?: string | null
     phone?: string | null
     email?: string | null
     specialization?: string | null
     created_at: string
   }
   ```

3. **Add API functions** (`src/lib/api.ts`):
   ```typescript
   export async function getVeterinarians() {
     const { data, error } = await supabase
       .from('veterinarians')
       .select('*')
     
     if (error) throw error
     return data as Veterinarian[]
   }
   ```

4. **Update documentation**
   - Add to README.md
   - Update SETUP.md if needed
   - Add usage examples

## Code Review Guidelines

When reviewing code:
- Be respectful and constructive
- Focus on code quality and best practices
- Check for security issues
- Verify TypeScript types are correct
- Ensure documentation is clear

## Questions or Issues?

- Check the [SETUP.md](SETUP.md) for common issues
- Search existing issues on GitHub
- Create a new issue with details
- Join community discussions

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

## Thank You!

Your contributions make this project better for everyone. We appreciate your time and effort! 🐾
