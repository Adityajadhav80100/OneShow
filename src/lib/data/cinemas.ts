export interface Cinema {
  id: string;
  name: string;
  chain: string;
  city: string;
  location: string;
  distance: string;
  badge?: string;
  amenities: string[];
}

export interface Showtime {
  id: string;
  cinemaId: string;
  cinemaName: string;
  cinemaLocation: string;
  screenName: string;
  dateId: string; // "today" | "tomorrow" | "day3" | "day4" | "day5"
  time: string;
  format: string;
  language: string;
  status: "AVAILABLE" | "FILLING_FAST" | "ALMOST_FULL" | "SOLD_OUT";
  basePrice: number;
}

export interface BookingDate {
  id: string;
  label: string;
  dayName: string;
  formattedDate: string;
  isToday?: boolean;
}

// Generate the next 5 booking dates starting from today
export function getBookingDates(): BookingDate[] {
  const dates: BookingDate[] = [];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const now = new Date();

  for (let i = 0; i < 5; i++) {
    const target = new Date(now);
    target.setDate(now.getDate() + i);

    const dayName = daysOfWeek[target.getDay()];
    const dateNum = target.getDate();
    const monthName = months[target.getMonth()];

    let label = `${dayName}, ${dateNum} ${monthName}`;
    if (i === 0) label = "Today";
    else if (i === 1) label = "Tomorrow";

    dates.push({
      id: i === 0 ? "today" : i === 1 ? "tomorrow" : `day-${i + 1}`,
      label,
      dayName,
      formattedDate: `${dateNum} ${monthName}`,
      isToday: i === 0,
    });
  }

  return dates;
}

export const SAMPLE_CINEMAS: Cinema[] = [
  {
    id: "cinema-pvr-palladium",
    name: "PVR ICON Phoenix Palladium",
    chain: "PVR INOX",
    city: "Mumbai",
    location: "Lower Parel, South Mumbai",
    distance: "1.2 km away",
    badge: "Laser IMAX",
    amenities: ["Food Lounge", "Paperless Ticket", "Wheelchair Accessible", "Valet Parking"],
  },
  {
    id: "cinema-inox-megaplex",
    name: "INOX Megaplex Inorbit Mall",
    chain: "PVR INOX",
    city: "Mumbai",
    location: "Malad West, Western Suburbs",
    distance: "4.8 km away",
    badge: "Dolby Atmos",
    amenities: ["Gourmet Menu", "Paperless Ticket", "Free Parking", "Recliner Lounges"],
  },
  {
    id: "cinema-cinepolis-viviana",
    name: "Cinépolis VIP Viviana Mall",
    chain: "Cinépolis",
    city: "Mumbai",
    location: "Thane West",
    distance: "9.5 km away",
    badge: "4DX Certified",
    amenities: ["VIP Lounge", "In-seat Dining", "Paperless Ticket", "Wheelchair Friendly"],
  },
];

// Sample showtimes mapped across dates & formats
export const SAMPLE_SHOWTIMES: Showtime[] = [
  // PVR ICON Palladium - Today
  {
    id: "show-pal-101",
    cinemaId: "cinema-pvr-palladium",
    cinemaName: "PVR ICON Phoenix Palladium",
    cinemaLocation: "Lower Parel, Mumbai",
    screenName: "Audi 3",
    dateId: "today",
    time: "10:30 AM",
    format: "IMAX 3D",
    language: "English",
    status: "FILLING_FAST",
    basePrice: 380,
  },
  {
    id: "show-pal-102",
    cinemaId: "cinema-pvr-palladium",
    cinemaName: "PVR ICON Phoenix Palladium",
    cinemaLocation: "Lower Parel, Mumbai",
    screenName: "Audi 3",
    dateId: "today",
    time: "02:15 PM",
    format: "IMAX 3D",
    language: "English",
    status: "AVAILABLE",
    basePrice: 420,
  },
  {
    id: "show-pal-103",
    cinemaId: "cinema-pvr-palladium",
    cinemaName: "PVR ICON Phoenix Palladium",
    cinemaLocation: "Lower Parel, Mumbai",
    screenName: "Audi 3",
    dateId: "today",
    time: "07:15 PM",
    format: "IMAX 3D",
    language: "English",
    status: "ALMOST_FULL",
    basePrice: 480,
  },
  {
    id: "show-pal-104",
    cinemaId: "cinema-pvr-palladium",
    cinemaName: "PVR ICON Phoenix Palladium",
    cinemaLocation: "Lower Parel, Mumbai",
    screenName: "Audi 1",
    dateId: "today",
    time: "10:45 PM",
    format: "4DX 3D",
    language: "English",
    status: "AVAILABLE",
    basePrice: 400,
  },

  // INOX Megaplex Inorbit - Today
  {
    id: "show-inox-201",
    cinemaId: "cinema-inox-megaplex",
    cinemaName: "INOX Megaplex Inorbit Mall",
    cinemaLocation: "Malad West, Mumbai",
    screenName: "Audi 5",
    dateId: "today",
    time: "11:15 AM",
    format: "2D Dolby Atmos",
    language: "English",
    status: "AVAILABLE",
    basePrice: 280,
  },
  {
    id: "show-inox-202",
    cinemaId: "cinema-inox-megaplex",
    cinemaName: "INOX Megaplex Inorbit Mall",
    cinemaLocation: "Malad West, Mumbai",
    screenName: "Audi 5",
    dateId: "today",
    time: "03:45 PM",
    format: "2D Dolby Atmos",
    language: "English",
    status: "AVAILABLE",
    basePrice: 320,
  },
  {
    id: "show-inox-203",
    cinemaId: "cinema-inox-megaplex",
    cinemaName: "INOX Megaplex Inorbit Mall",
    cinemaLocation: "Malad West, Mumbai",
    screenName: "Audi 2",
    dateId: "today",
    time: "08:30 PM",
    format: "IMAX 3D",
    language: "English",
    status: "FILLING_FAST",
    basePrice: 420,
  },

  // Cinépolis Viviana - Today
  {
    id: "show-cine-301",
    cinemaId: "cinema-cinepolis-viviana",
    cinemaName: "Cinépolis VIP Viviana Mall",
    cinemaLocation: "Thane West, Mumbai",
    screenName: "VIP Screen 1",
    dateId: "today",
    time: "01:00 PM",
    format: "4DX 3D",
    language: "English",
    status: "AVAILABLE",
    basePrice: 360,
  },
  {
    id: "show-cine-302",
    cinemaId: "cinema-cinepolis-viviana",
    cinemaName: "Cinépolis VIP Viviana Mall",
    cinemaLocation: "Thane West, Mumbai",
    screenName: "VIP Screen 1",
    dateId: "today",
    time: "06:30 PM",
    format: "4DX 3D",
    language: "English",
    status: "ALMOST_FULL",
    basePrice: 450,
  },
  {
    id: "show-cine-303",
    cinemaId: "cinema-cinepolis-viviana",
    cinemaName: "Cinépolis VIP Viviana Mall",
    cinemaLocation: "Thane West, Mumbai",
    screenName: "Audi 4",
    dateId: "today",
    time: "09:45 PM",
    format: "2D Dolby Atmos",
    language: "English",
    status: "AVAILABLE",
    basePrice: 300,
  },

  // Upcoming Days Showtimes (Tomorrow & Day 3)
  {
    id: "show-pal-tomorrow-1",
    cinemaId: "cinema-pvr-palladium",
    cinemaName: "PVR ICON Phoenix Palladium",
    cinemaLocation: "Lower Parel, Mumbai",
    screenName: "Audi 3",
    dateId: "tomorrow",
    time: "11:00 AM",
    format: "IMAX 3D",
    language: "English",
    status: "AVAILABLE",
    basePrice: 380,
  },
  {
    id: "show-pal-tomorrow-2",
    cinemaId: "cinema-pvr-palladium",
    cinemaName: "PVR ICON Phoenix Palladium",
    cinemaLocation: "Lower Parel, Mumbai",
    screenName: "Audi 3",
    dateId: "tomorrow",
    time: "04:30 PM",
    format: "IMAX 3D",
    language: "English",
    status: "AVAILABLE",
    basePrice: 440,
  },
  {
    id: "show-pal-tomorrow-3",
    cinemaId: "cinema-pvr-palladium",
    cinemaName: "PVR ICON Phoenix Palladium",
    cinemaLocation: "Lower Parel, Mumbai",
    screenName: "Audi 3",
    dateId: "tomorrow",
    time: "08:15 PM",
    format: "IMAX 3D",
    language: "English",
    status: "FILLING_FAST",
    basePrice: 500,
  },
  {
    id: "show-inox-tomorrow-1",
    cinemaId: "cinema-inox-megaplex",
    cinemaName: "INOX Megaplex Inorbit Mall",
    cinemaLocation: "Malad West, Mumbai",
    screenName: "Audi 5",
    dateId: "tomorrow",
    time: "02:00 PM",
    format: "2D Dolby Atmos",
    language: "English",
    status: "AVAILABLE",
    basePrice: 300,
  },
  {
    id: "show-inox-tomorrow-2",
    cinemaId: "cinema-inox-megaplex",
    cinemaName: "INOX Megaplex Inorbit Mall",
    cinemaLocation: "Malad West, Mumbai",
    screenName: "Audi 5",
    dateId: "tomorrow",
    time: "07:30 PM",
    format: "2D Dolby Atmos",
    language: "English",
    status: "AVAILABLE",
    basePrice: 350,
  },

  // Day 3 shows
  {
    id: "show-pal-day3-1",
    cinemaId: "cinema-pvr-palladium",
    cinemaName: "PVR ICON Phoenix Palladium",
    cinemaLocation: "Lower Parel, Mumbai",
    screenName: "Audi 3",
    dateId: "day-3",
    time: "01:30 PM",
    format: "IMAX 3D",
    language: "English",
    status: "AVAILABLE",
    basePrice: 450,
  },
  {
    id: "show-pal-day3-2",
    cinemaId: "cinema-pvr-palladium",
    cinemaName: "PVR ICON Phoenix Palladium",
    cinemaLocation: "Lower Parel, Mumbai",
    screenName: "Audi 3",
    dateId: "day-3",
    time: "06:45 PM",
    format: "IMAX 3D",
    language: "English",
    status: "AVAILABLE",
    basePrice: 520,
  },
];

export function getShowtimeById(showId: string): Showtime | undefined {
  return SAMPLE_SHOWTIMES.find((s) => s.id === showId);
}
