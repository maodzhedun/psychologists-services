//app/page.tsx

import Icon from "@/components/ui/Icon";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="min-h-[calc(100vh-80px)] bg-[#f3f3f3] py-10 sm:py-16 lg:py-20 overflow-x-clip">
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
              <Icon name="arrow" size={18} />
            </Link>
          </div>

          {/* ===== IMAGE ===== */}
          <div className="relative flex justify-center items-center order-1 lg:order-2 overflow-visible">
            <div className="relative w-[280px] h-[320px] sm:w-[420px] sm:h-[480px] lg:w-[464px] lg:h-[526px] overflow-visible">
              <Image
                src="/images/hero.jpg"
                alt="Professional psychologist"
                fill
                className="w-full h-full object-cover rounded-xl"
              />

              {/* ===== DECORATIVE ELEMENTS ===== */}

              {/* User icon - top right (yellow) - from Figma */}
              <div className="absolute z-10 -top-3 -right-3 sm:-top-5 sm:-right-5 lg:top-12 lg:-right-10 w-10 h-10 sm:w-12 sm:h-12 lg:w-[54px] lg:h-[54px] bg-[#FBC75E] rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg rotate-[15deg]">
                <Icon name="users" size={20} className="lg:w-6 lg:h-6" />
              </div>

              {/* Question mark - left side (blue) */}
              <div className="absolute z-10 top-1/3 -left-3 sm:-left-6 lg:-left-10 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-[#4535af] rounded-lg lg:rounded-xl flex items-center justify-center shadow-lg rotate-[-15deg]">
                <span className="text-white font-bold text-lg lg:text-xl">
                  ?
                </span>
              </div>

              {/* Stats card - bottom */}
              <div className="absolute z-10 bottom-6 sm:bottom-10 lg:bottom-20 left-1/2 -translate-x-1/2  lg:-translate-x-0 lg:-left-26 flex items-center gap-4 px-4 lg:px-8 py-4 lg:py-5 bg-[#54be96] rounded-2xl shadow-lg">
                <div className="w-10 h-10 lg:w-14 lg:h-14 flex items-center justify-center bg-white rounded-xl lg:rounded-2xl">
                  <Icon
                    name="check"
                    size={20}
                    className="text-[#54be96] lg:w-6 lg:h-6"
                  />
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
