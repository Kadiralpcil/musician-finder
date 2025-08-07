// components/home/SearchPreview.tsx
"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SearchPreview = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const popularSearches = [
    "Guitar",
    "Istanbul",
    "Rock Band",
    "Jazz",
    "Piano",
    "Drums",
    "Vocals",
    "Collaboration",
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handlePopularSearch = (term: string) => {
    setSearchQuery(term);
    window.location.href = `/search?q=${encodeURIComponent(term)}`;
  };

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Find Your Musical Partner
          </h2>
          <p className="text-gray-600 text-lg">
            Search by instrument, location, genre, or skill level
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Input
              type="text"
              placeholder="Search by instrument, location, genre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 text-lg pl-12 pr-32 rounded-full border-2 border-gray-200 focus:border-primary"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 px-6 rounded-full"
            >
              Search
            </Button>
          </div>
        </form>

        {/* Popular Searches */}
        <div>
          <p className="text-gray-500 mb-4">Popular searches:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {popularSearches.map((term) => (
              <button
                key={term}
                onClick={() => handlePopularSearch(term)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors duration-200 hover:shadow-md"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Search Tips */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg">
            <div className="text-2xl mb-3">🎸</div>
            <h3 className="font-semibold mb-2">By Instrument</h3>
            <p className="text-gray-600 text-sm">
              Find musicians who play specific instruments
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg">
            <div className="text-2xl mb-3">📍</div>
            <h3 className="font-semibold mb-2">By Location</h3>
            <p className="text-gray-600 text-sm">
              Connect with local musicians in your area
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg">
            <div className="text-2xl mb-3">🎵</div>
            <h3 className="font-semibold mb-2">By Genre</h3>
            <p className="text-gray-600 text-sm">
              Discover artists who share your musical style
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchPreview;
