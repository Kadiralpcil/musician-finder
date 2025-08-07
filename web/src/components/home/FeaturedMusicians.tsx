// components/home/FeaturedMusicians.tsx
"use client";

import { useEffect, useState } from "react";
import MusicianCard from "@/components/ui/MusicianCard";

interface Musician {
  id: string;
  name: string;
  instrument: string;
  photo: string;
}

// Mock data - replace with real API call
const mockMusicians: Musician[] = [
  {
    id: "1",
    name: "Alex Johnson",
    instrument: "Guitar",
    photo: "/images/musicians/musician-1.jpg",
  },
  {
    id: "2",
    name: "Sarah Chen",
    instrument: "Piano",
    photo: "/images/musicians/musician-2.jpg",
  },
  {
    id: "3",
    name: "Mike Rodriguez",
    instrument: "Drums",
    photo: "/images/musicians/musician-3.jpg",
  },
  {
    id: "4",
    name: "Emma Wilson",
    instrument: "Vocals",
    photo: "/images/musicians/musician-4.jpg",
  },
  {
    id: "5",
    name: "David Kim",
    instrument: "Bass",
    photo: "/images/musicians/musician-5.jpg",
  },
  {
    id: "6",
    name: "Lisa Brown",
    instrument: "Violin",
    photo: "/images/musicians/musician-6.jpg",
  },
];

const FeaturedMusicians = () => {
  const [musicians, setMusicians] = useState<Musician[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchMusicians = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
      setMusicians(mockMusicians);
      setIsLoading(false);
    };

    fetchMusicians();
  }, []);

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Musicians
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover talented musicians in our community ready to collaborate
          </p>
        </div>

        {/* Musicians Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="bg-gray-300 aspect-square rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {musicians.map((musician) => (
              <MusicianCard
                key={musician.id}
                id={musician.id}
                name={musician.name}
                instrument={musician.instrument}
                photo={musician.photo}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedMusicians;
