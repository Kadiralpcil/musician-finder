// components/home/CTAFooter.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

const CTAFooter = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main CTA Content */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to start your
            <span className="block">musical journey?</span>
          </h2>

          <p className="text-pink-100 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of musicians who have already found their perfect
            collaborators. Your next musical adventure is just one click away.
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link href="/register">
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Join Now - It's Free! 🚀
            </Button>
          </Link>

          <Link href="/login">
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-purple-600 font-bold py-4 px-8 rounded-full text-lg transition-all duration-200"
            >
              Already a Member?
            </Button>
          </Link>
        </div>

        {/* Benefits List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
          <div className="flex items-center justify-center gap-3">
            <div className="text-2xl">⚡</div>
            <span className="font-medium">Quick Setup</span>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="text-2xl">🆓</div>
            <span className="font-medium">100% Free</span>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="text-2xl">🎯</div>
            <span className="font-medium">Perfect Matches</span>
          </div>
        </div>

        {/* Musical Notes Animation */}
        <div className="mt-12 flex justify-center space-x-4">
          <div className="animate-pulse delay-100 text-2xl">🎵</div>
          <div className="animate-pulse delay-300 text-2xl">🎶</div>
          <div className="animate-pulse delay-500 text-2xl">🎸</div>
          <div className="animate-pulse delay-700 text-2xl">🥁</div>
          <div className="animate-pulse delay-900 text-2xl">🎹</div>
        </div>
      </div>
    </section>
  );
};

export default CTAFooter;
