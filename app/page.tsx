import Link from "next/link";

export default function Home() {
  return (
    <section className="min-h-[calc(100vh-80px)] bg-[#f3f3f3] py-10 sm:py-16 lg:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ===== CONTENT ===== */}
          <div className="max-w-[595px] text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[80px] font-semibold leading-[1.1] text-[#191a15] mb-6 tracking-tight">
              The road to the{" "}
              <span className="text-[#54be96] italic">depths</span> of the human
              soul
            </h1>

            <p className="text-base lg:text-lg text-[#191a15]/70 mb-10 leading-relaxed max-w-[510px]">
              We help you to reveal your potential, overcome challenges and find
              a guide in your own life with the help of our experienced
              psychologists.
            </p>

            <Link
              href="/psychologists"
              className="inline-flex items-center gap-3 px-12 py-4 text-lg font-medium bg-[#54be96] text-white rounded-full transition-all hover:bg-[#36a379] hover:-translate-y-0.5 hover:shadow-lg"
            >
              Get started
              {/* Arrow icon ↗ */}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M5.25 12.75L12.75 5.25"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.25 5.25H12.75V12.75"
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
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80"
                alt="Professional psychologist"
                className="w-full h-full object-cover rounded-xl"
              />

              {/* ===== DECORATIVE ELEMENTS ===== */}

              {/* User icon - top right (yellow) */}
              <div className="absolute -top-3 -right-3 sm:-top-5 sm:-right-5 w-10 h-10 sm:w-12 sm:h-12 bg-[#ffc531] rounded-xl flex items-center justify-center shadow-lg">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-white"
                >
                  <path
                    d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Question mark - left side (blue) */}
              <div className="absolute top-1/3 -left-3 sm:-left-6 w-8 h-8 sm:w-10 sm:h-10 bg-[#4535af] rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">?</span>
              </div>

              {/* Stats card - bottom */}
              <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 lg:left-auto lg:-translate-x-0 lg:-left-12 flex items-center gap-4 px-4 lg:px-6 py-4 bg-[#54be96] rounded-xl shadow-lg">
                <div className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center bg-white/20 rounded-lg">
                  {/* Checkmark icon */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-white"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs sm:text-sm text-white/80">
                    Experienced psychologists
                  </span>
                  <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                    15,000
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
