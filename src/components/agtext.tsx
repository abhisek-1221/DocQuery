import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import AnimatedGradientText from "@/components/magicui/animated-gradient-text";

export async function AnimatedGradientTextDemo() {
  return (
    <div className="z-10 flex min-h-[16rem] items-center justify-center">
      <AnimatedGradientText>
        📈 <hr className="mx-2 h-4 w-[1px] shrink-0 bg-black" />{" "}
        <span
          className={cn(
            `inline animate-gradient bg-gradient-to-r from-[#e1e18d] via-[#c5a9e4] to-[#e9aa8f] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent text-xs sm:text-xs md:text-lg lg:text-xl`,
          )}
        >
          Introducing ThriftWise
        </span>
        <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
      </AnimatedGradientText>
    </div>
  );
}
