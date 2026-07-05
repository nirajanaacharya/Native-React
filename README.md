#Images
<img width="900" height="1600" alt="image" src="https://github.com/user-attachments/assets/e72fc73c-f405-4189-ae51-3f9e63460872" />
<img width="900" height="1600" alt="image" src="https://github.com/user-attachments/assets/a6c61250-56c2-4c2b-ac9a-519a037369a3" />
<img width="900" height="1600" alt="image" src="https://github.com/user-attachments/assets/5998ec01-6c67-4411-a0eb-5ef4f30e3eed" />
<img width="900" height="1600" alt="image" src="https://github.com/user-attachments/assets/fbff8cb4-2cf8-4acf-a736-1b930335a253" />
<img width="900" height="1600" alt="image" src="https://github.com/user-attachments/assets/2a169114-16c4-4691-bbff-55fa2afb07f8" />
<img width="900" height="1600" alt="image" src="https://github.com/user-attachments/assets/bdb445a1-07c5-4ff8-8273-0e232bef7653" />





# Reales

A modern real estate mobile app built with React Native and Expo, letting users browse, search, and save property listings — with admin tools for managing listings and images.

## Features

- Browse property listings (villas, apartments, houses, studios)
- Search and filter properties by location, type, and price
- Save favorite properties
- Secure authentication (sign up, sign in, email verification)
- User profiles with editable profile pictures
- Admin roles for creating, updating, and deleting property listings
- Property image uploads via Supabase Storage
-  Map-based property locations (lat/lng coordinates)

## Tech Stack

**Frontend**
- [React Native](https://reactnative.dev/) with [Expo SDK 54](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/) — file-based navigation
- [NativeWind](https://www.nativewind.dev/) — Tailwind CSS for React Native

**Authentication**
- [Clerk](https://clerk.com/) — sign up, sign in, session management, MFA support

**Backend & Database**
- [Supabase](https://supabase.com/) — PostgreSQL database, Row Level Security (RLS) policies, and Storage for property images

## Prerequisites

- Node.js (LTS recommended)
- npm
- Expo CLI (`npx expo`)
- A Clerk account and API keys
- A Supabase project with database and storage configured
- Expo Go app (for quick testing) or a development build for full native module support

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd reales
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the project root:
   ```
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```bash
   npx expo start
   ```

5. **Run on a device or simulator**
   - Press `a` for Android
   - Press `i` for iOS
   - Scan the QR code with Expo Go for a physical device

## Project Structure

```
reales/
├── app/                    # Expo Router screens (file-based routing)
│   ├── (auth)/             # Sign in, sign up, verification screens
│   ├── (root)/
│   │   └── (tabs)/         # Main app tabs (home, favorites, profile, etc.)
├── assets/                 # Images, fonts, and static assets
├── components/             # Reusable UI components
├── constants/               # App-wide constants
├── lib/                    # Supabase client, helpers, utilities
└── ...
```

## Database & Permissions

Property data is stored in Supabase with Row Level Security enabled. Admin-only actions (inserting, updating, and deleting properties, and uploading property images) are gated behind an `is_admin` flag on the `users` table, enforced via RLS policies rather than client-side checks.

## Authentication Flow

Authentication is handled by Clerk and supports:
- Email/password sign up with email verification
- Sign in with optional multi-factor authentication (email code / phone code)
- Session persistence and automatic redirect handling via Expo Router

## Known Limitations / Roadmap

- [ ] Notifications screen (currently a placeholder)
- [ ] Settings screen (currently a placeholder)
- [ ] Full phone-code MFA flow (email-code MFA is implemented; phone-code UI is pending)
