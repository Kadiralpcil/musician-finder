// components/home/StatsSection.tsx
"use client";

import { useEffect, useState } from "react";

interface StatItem {
  number: string;
  label: string;
  icon: string;
}

const stats: StatItem[] = [
  {
    number: "1000+",
    label: "Musicians",
    icon: "👥",
  },
  {
    number: "50+",
    label: "Cities",
    icon: "🌍",
  },
  {
    number: "200+",
    label: "Collaborations",
    icon: "🤝",
  },
  {
    number: "95%",
    label: "Success Rate",
    icon: "⭐",
  },
];

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("stats-section");
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="stats-section"
      className="py-20 px-4 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by Musicians Worldwide
          </h2>
          <p className="text-purple-200 text-lg">
            Join thousands of musicians who found their perfect match
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center transform transition-all duration-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Icon */}
              <div className="text-4xl md:text-6xl mb-4">{stat.icon}</div>

              {/* Number */}
              <div className="text-3xl md:text-5xl font-bold text-white mb-2">
                {stat.number}
              </div>

              {/* Label */}
              <div className="text-purple-200 text-lg font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8 text-purple-200">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Active Community</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-yellow-400">🔒</div>
            <span>Verified Profiles</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-green-400">✓</div>
            <span>Safe & Secure</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
