// components/ui/MusicianCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface MusicianCardProps {
  id: string;
  name: string;
  instrument: string;
  photo: string;
  className?: string;
}

const MusicianCard = ({
  id,
  name,
  instrument,
  photo,
  className,
}: MusicianCardProps) => {
  return (
    <Link href={`/musicians/${id}`}>
      <Card
        className={`group hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 ${className}`}
      >
        <CardContent className="p-4">
          {/* Profile Photo */}
          <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg">
            <Image
              src={photo}
              alt={`${name}'s profile`}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Musician Info */}
          <div className="text-center">
            <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
              {name}
            </h3>
            <p className="text-muted-foreground text-sm">{instrument}</p>
          </div>

          {/* Instrument Icon */}
          <div className="flex justify-center mt-3">
            <div className="text-2xl opacity-70 group-hover:opacity-100 transition-opacity">
              {getInstrumentIcon(instrument)}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

// Helper function for instrument icons
const getInstrumentIcon = (instrument: string) => {
  const iconMap: Record<string, string> = {
    Guitar: "🎸",
    Piano: "🎹",
    Drums: "🥁",
    Violin: "🎻",
    Bass: "🎸",
    Saxophone: "🎷",
    Trumpet: "🎺",
    Vocals: "🎤",
    // Add more instruments as needed
  };

  return iconMap[instrument] || "🎵";
};

export default MusicianCard;
