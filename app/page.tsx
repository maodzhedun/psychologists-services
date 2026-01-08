import Link from "next/link";

export default function Home() {
  return (
    <section className="min-h-[calc(100vh-80px)] bg-[#54be96] py-10 sm:py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ===== CONTENT ===== */}
          <div className="max-w-[595px] text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-[80px] font-semibold leading-[1.02] text-white mb-6 tracking-tight">
              The road to the{" "}
              <span className="inline-block bg-white text-[#54be96] px-4 rounded-lg italic">
                depths
              </span>{" "}
              of the human soul
            </h1>

            <p className="text-base lg:text-lg text-white/80 mb-10 leading-relaxed">
              We help you to reveal your potential, overcome challenges and find
              a guide in your own feelings. With your professional psychologist,
              you can take the first step to a new life.
            </p>

            <Link
              href="/psychologists"
              className="inline-flex items-center gap-2 px-12 py-4 text-lg font-medium bg-white text-[#191a15] rounded-full transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Get started
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M3.75 9H14.25"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 3.75L14.25 9L9 14.25"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

          {/* ===== IMAGE ===== */}
          <div className="relative flex justify-center items-center order-1 lg:order-2">
            <div className="relative w-[280px] h-[320px] sm:w-[380px] sm:h-[440px] lg:w-[464px] lg:h-[526px]">
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80"
                alt="Professional psychologist"
                className="w-full h-full object-cover rounded-xl"
              />

              {/* Декоративні елементи */}
              <div className="absolute -top-5 -right-5 w-10 h-10 bg-[#ffc531] rounded-full" />
              <div className="absolute bottom-10 -left-8 w-14 h-14 border-2 border-white rounded-full" />

              {/* Картка статистики */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 lg:left-auto lg:-translate-x-0 lg:-left-16 flex items-center gap-4 px-4 lg:px-6 py-4 bg-[#36a379] rounded-xl">
                <div className="w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center bg-white rounded-lg">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M10 2L12.472 7.01L18 7.82L14 11.71L14.944 17.2L10 14.61L5.056 17.2L6 11.71L2 7.82L7.528 7.01L10 2Z"
                      fill="#FFC531"
                    />
                  </svg>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm text-white/70">
                    Experienced psychologists
                  </span>
                  <span className="text-xl lg:text-2xl font-bold text-white">
                    15,000
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== FEATURES ===== */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 lg:gap-10 mt-10 sm:mt-16 pt-8 sm:pt-10 border-t border-white/20">
          {[
            "Professional support",
            "Individual approach",
            "Confidentiality",
          ].map((feature) => (
            <div key={feature} className="flex items-center gap-2">
              <span className="w-8 h-8 flex items-center justify-center bg-white text-[#54be96] font-bold rounded-full text-sm">
                ✓
              </span>
              <span className="text-white">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
