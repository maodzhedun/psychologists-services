import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#f3f3f3]">
      <div className="container mx-auto px-4 text-center">
        {/* 404 Number */}
        <h1 className="text-[120px] sm:text-[180px] lg:text-[240px] font-bold text-[#54be96]/20 leading-none select-none">
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#191a15] -mt-8 sm:-mt-12 mb-4">
          Сторінку не знайдено
        </h2>

        {/* Description */}
        <p className="text-base sm:text-lg text-[#191a15]/50 mb-8 max-w-md mx-auto">
          Схоже, ця сторінка не існує або була переміщена. Поверніться на
          головну, щоб продовжити.
        </p>

        {/* Back to Home Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium bg-[#54be96] text-white rounded-xl transition-all hover:bg-[#36a379] hover:-translate-y-0.5"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="rotate-180"
          >
            <path
              d="M4.16666 10H15.8333"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 4.16666L15.8333 10L10 15.8333"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          На головну
        </Link>
      </div>
    </section>
  );
}
