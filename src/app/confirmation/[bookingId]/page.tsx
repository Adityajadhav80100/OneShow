import { ConfirmationView } from "@/components/ticket/ConfirmationView";

interface ConfirmationPageProps {
  params: Promise<{ bookingId: string }>;
}

export default async function ConfirmationPage({ params }: ConfirmationPageProps) {
  const { bookingId } = await params;

  return <ConfirmationView bookingId={bookingId} />;
}
