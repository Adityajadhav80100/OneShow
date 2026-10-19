import { MyBookingsView } from "@/components/bookings/MyBookingsView";

export const metadata = {
  title: "My Bookings | OneShow",
  description: "View your verified movie reservations, active turnstile passes, and booking history.",
};

export default function BookingsPage() {
  return <MyBookingsView />;
}
