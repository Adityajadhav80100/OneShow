-- ==============================================================================
-- ONESHOW DATABASE SCHEMA
-- PostgreSQL schema for Supabase
-- ==============================================================================

-- 1. PROFILES TABLE (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CINEMAS TABLE
CREATE TABLE IF NOT EXISTS public.cinemas (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  chain TEXT,
  city TEXT NOT NULL,
  location TEXT NOT NULL,
  badge TEXT,
  amenities TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. SHOWS TABLE
CREATE TABLE IF NOT EXISTS public.shows (
  id TEXT PRIMARY KEY,
  cinema_id TEXT NOT NULL REFERENCES public.cinemas(id) ON DELETE CASCADE,
  movie_id TEXT NOT NULL,
  movie_title TEXT NOT NULL,
  screen_name TEXT NOT NULL,
  show_date DATE NOT NULL,
  show_time TEXT NOT NULL,
  format TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'English',
  base_price NUMERIC NOT NULL DEFAULT 350,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  show_id TEXT NOT NULL REFERENCES public.shows(id) ON DELETE CASCADE,
  booking_reference TEXT UNIQUE NOT NULL,
  movie_id TEXT NOT NULL,
  movie_title TEXT NOT NULL,
  cinema_name TEXT NOT NULL,
  cinema_location TEXT NOT NULL,
  show_time TEXT NOT NULL,
  show_date TEXT NOT NULL,
  screen_name TEXT NOT NULL,
  format TEXT NOT NULL,
  seats_booked TEXT[] NOT NULL,
  subtotal NUMERIC NOT NULL,
  convenience_fee NUMERIC NOT NULL DEFAULT 58.00,
  total_amount NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'CONFIRMED' CHECK (status IN ('CONFIRMED', 'CANCELLED')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. BOOKING_SEATS TABLE (Atomic seat reservation ledger)
CREATE TABLE IF NOT EXISTS public.booking_seats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  show_id TEXT NOT NULL REFERENCES public.shows(id) ON DELETE CASCADE,
  seat_id TEXT NOT NULL, -- e.g. "A1", "C5", "C6"
  seat_tier TEXT NOT NULL, -- 'RECLINER' | 'PRIME_PLUS' | 'CLASSIC'
  price NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  -- CONCURRENCY SAFEGUARD: Prevents double-booking race conditions at DB level!
  CONSTRAINT unique_show_seat UNIQUE (show_id, seat_id)
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cinemas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_seats ENABLE ROW LEVEL SECURITY;

-- Profiles: Public profiles are readable by the owner, editable by the owner
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Cinemas & Shows: Read-only for all public visitors
CREATE POLICY "Public read-only cinemas"
  ON public.cinemas FOR SELECT
  USING (true);

CREATE POLICY "Public read-only shows"
  ON public.shows FOR SELECT
  USING (true);

-- Bookings: Users can view and create their own bookings
CREATE POLICY "Users can view their own bookings"
  ON public.bookings FOR SELECT
  USING (auth.uid() = user_id OR auth.uid() IS NULL);

CREATE POLICY "Users can create bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (true);

-- Booking Seats: Publicly visible to calculate occupied seats per show
CREATE POLICY "Public read-only occupied seats"
  ON public.booking_seats FOR SELECT
  USING (true);

CREATE POLICY "Insert booking seats on checkout"
  ON public.booking_seats FOR INSERT
  WITH CHECK (true);
