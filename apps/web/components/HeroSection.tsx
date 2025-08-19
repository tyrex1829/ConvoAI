import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket } from "lucide-react";

export default function HeroSection() {
  return (
    <main className="overflow-hidden mt-10">
      <section className="relative">
        <div className="relative py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <div className="text-center sm:mx-auto sm:w-10/12 lg:mr-auto lg:mt-0 lg:w-4/5">
              <Link
                href="/"
                className="rounded-[var(--radius)] mx-auto flex w-fit items-center gap-2 border border-white/50 p-1 pr-3 "
              >
                <span className=" rounded-[calc(var(--radius)-0.25rem)] px-2 py-1 text-xs bg-white/20 text-white/80">
                  New
                </span>
                <span className="text-sm text-white/50">
                  Ai Instagram Automation
                </span>
                <span className="bg-[var(--color-border)] block h-4 w-px"></span>
                <ArrowRight className="size-4 text-white/80" />
              </Link>

              <h1 className="mt-10 text-4xl font-semibold md:text-5xl xl:text-5xl xl:[line-height:1.125] text-white text-center">
                Scale Instagram DMs with <br /> AI Automation
              </h1>

              <p className="mx-auto mt-6 hidden max-w-2xl text-wrap text-base sm:block text-white/50">
                Instantly reply to messages, engage with post interactions, and
                keep conversations flowing around the clock. Save time and grow
                your reach
              </p>

              <p className="mx-auto mt-5 max-w-2xl text-wrap sm:hidden text-base text-white/50">
                Instantly reply to messages, engage with post interactions. Save
                time and grow your reach
              </p>

              <div className="mt-12">
                <Button
                  size="lg"
                  asChild
                  className="bg-white text-black hover:bg-white/80"
                >
                  <Link href="#">
                    <Rocket className="relative size-4" />
                    <span className="text-nowrap ">Start For Free</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
