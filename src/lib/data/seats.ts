export type SeatTier = "RECLINER" | "PRIME_PLUS" | "CLASSIC";

export interface Seat {
  id: string; // e.g. "A1", "B5"
  row: string;
  number: number;
  tier: SeatTier;
  price: number;
  isOccupied: boolean;
}

export interface SeatTierConfig {
  name: string;
  tier: SeatTier;
  price: number;
  description: string;
}

export const SEAT_TIER_CONFIGS: Record<SeatTier, SeatTierConfig> = {
  RECLINER: {
    name: "Recliner Lounge",
    tier: "RECLINER",
    price: 650,
    description: "Plush motorized recliners with in-seat food service",
  },
  PRIME_PLUS: {
    name: "Prime Plus",
    tier: "PRIME_PLUS",
    price: 420,
    description: "Optimal center viewing angle with extra legroom",
  },
  CLASSIC: {
    name: "Classic",
    tier: "CLASSIC",
    price: 280,
    description: "Standard stadium tiered cinema seating",
  },
};

// Generates the layout of seats for an auditorium
export function generateAuditoriumLayout(showId?: string): Seat[] {
  const seats: Seat[] = [];

  // Deterministic seed for occupied seats based on showId
  const occupiedSet = new Set<string>();
  if (showId?.includes("pal")) {
    ["A3", "A7", "B4", "B5", "C7", "C8", "D1", "D2", "E9", "E10"].forEach((s) => occupiedSet.add(s));
  } else if (showId?.includes("inox")) {
    ["A2", "A6", "B8", "B9", "C3", "C4", "D5", "D6", "E1", "F6"].forEach((s) => occupiedSet.add(s));
  } else {
    ["A4", "A5", "B2", "B3", "C9", "C10", "D4", "E7", "E8"].forEach((s) => occupiedSet.add(s));
  }

  // Row A: Recliner (8 wide seats)
  for (let num = 1; num <= 8; num++) {
    const id = `A${num}`;
    seats.push({
      id,
      row: "A",
      number: num,
      tier: "RECLINER",
      price: SEAT_TIER_CONFIGS.RECLINER.price,
      isOccupied: occupiedSet.has(id),
    });
  }

  // Rows B, C, D: Prime Plus (12 seats per row)
  ["B", "C", "D"].forEach((row) => {
    for (let num = 1; num <= 12; num++) {
      const id = `${row}${num}`;
      seats.push({
        id,
        row,
        number: num,
        tier: "PRIME_PLUS",
        price: SEAT_TIER_CONFIGS.PRIME_PLUS.price,
        isOccupied: occupiedSet.has(id),
      });
    }
  });

  // Rows E, F: Classic (12 seats per row)
  ["E", "F"].forEach((row) => {
    for (let num = 1; num <= 12; num++) {
      const id = `${row}${num}`;
      seats.push({
        id,
        row,
        number: num,
        tier: "CLASSIC",
        price: SEAT_TIER_CONFIGS.CLASSIC.price,
        isOccupied: occupiedSet.has(id),
      });
    }
  });

  return seats;
}

export function calculateBookingTotal(selectedSeatIds: string[], allSeats: Seat[]) {
  const selectedSeats = allSeats.filter((s) => selectedSeatIds.includes(s.id));
  const subtotal = selectedSeats.reduce((acc, s) => acc + s.price, 0);
  const convenienceFeePerTicket = 29.0; // ₹29 per ticket
  const convenienceFee = selectedSeats.length > 0 ? selectedSeats.length * convenienceFeePerTicket : 0;
  const gst = convenienceFee * 0.18; // 18% GST on convenience fee
  const totalConvenience = Math.round(convenienceFee + gst);
  const grandTotal = subtotal + totalConvenience;

  return {
    selectedSeats,
    ticketCount: selectedSeats.length,
    subtotal,
    convenienceFee: totalConvenience,
    grandTotal,
  };
}
