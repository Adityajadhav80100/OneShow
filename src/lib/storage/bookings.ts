export interface BookedSeatItem {
  id: string; // e.g. "A1", "C5"
  tier: string; // "RECLINER" | "PRIME_PLUS" | "CLASSIC"
  price: number;
}

export interface StoredBooking {
  id: string;
  bookingReference: string;
  movieId: string | number;
  movieTitle: string;
  posterUrl: string;
  backdropUrl: string;
  cinemaId: string;
  cinemaName: string;
  cinemaLocation: string;
  showId: string;
  showDate: string;
  showTime: string;
  screenName: string;
  format: string;
  seats: BookedSeatItem[];
  ticketCount: number;
  subtotal: number;
  convenienceFee: number;
  totalAmount: number;
  createdAt: string; // ISO string
  status: "CONFIRMED" | "CANCELLED";
  isDemo: boolean;
}

const STORAGE_KEY = "oneshow_demo_bookings_v1";

/**
 * Generates a clean, realistic booking reference: e.g. "ONE-892401-MUM"
 */
export function generateBookingReference(): string {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `ONE-${randomNum}-MUM`;
}

/**
 * Safely retrieve all demo bookings from browser localStorage
 */
export function getAllBookings(): StoredBooking[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    // Filter valid objects
    return parsed.filter(
      (b) => b && typeof b.id === "string" && typeof b.bookingReference === "string"
    );
  } catch (err) {
    console.error("[OneShow Storage] Failed to read bookings from localStorage:", err);
    return [];
  }
}

/**
 * Retrieve a single booking by ID or booking reference
 */
export function getBookingById(id: string): StoredBooking | null {
  if (typeof window === "undefined" || !id) return null;

  const bookings = getAllBookings();
  const search = id.trim().toLowerCase();

  return (
    bookings.find(
      (b) => b.id.toLowerCase() === search || b.bookingReference.toLowerCase() === search
    ) || null
  );
}

export function subscribeToBookings(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("oneshow-bookings-updated", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("oneshow-bookings-updated", callback);
  };
}

/**
 * Save a new booking into localStorage
 */
export function saveBooking(booking: StoredBooking): boolean {
  if (typeof window === "undefined") return false;

  try {
    const existing = getAllBookings();

    // Prevent duplicate booking ID
    const alreadyExists = existing.some(
      (b) => b.id === booking.id || b.bookingReference === booking.bookingReference
    );
    if (alreadyExists) return true;

    const updated = [booking, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("oneshow-bookings-updated"));
    return true;
  } catch (err) {
    console.error("[OneShow Storage] Failed to save booking to localStorage:", err);
    return false;
  }
}

/**
 * Cancel a demo booking
 */
export function cancelBooking(id: string): boolean {
  if (typeof window === "undefined" || !id) return false;

  try {
    const existing = getAllBookings();
    const target = existing.find(
      (b) => b.id === id || b.bookingReference === id
    );

    if (!target) return false;

    target.status = "CANCELLED";
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    window.dispatchEvent(new Event("oneshow-bookings-updated"));
    return true;
  } catch (err) {
    console.error("[OneShow Storage] Failed to cancel booking:", err);
    return false;
  }
}
