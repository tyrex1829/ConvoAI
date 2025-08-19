import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Settings2, Sparkles, Zap } from "lucide-react";
import { ReactNode } from "react";

export default function Features() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="text-center">
          <h2 className="text-4xl font-semibold text-white lg:text-5xl">
            Built to cover your needs
          </h2>
          <p className="mt-4 text-white/60">
            Libero sapiente aliquam quibusdam aspernatur, praesentium iusto
            repellendus.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:mt-16 md:grid-cols-3">
          <Card className="group border-white/10 bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-all duration-300">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Zap className="size-6 text-white" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-medium text-white text-center">
                Customizable
              </h3>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-white/70 text-center">
                Extensive customization options, allowing you to tailor every
                aspect to meet your specific needs.
              </p>
            </CardContent>
          </Card>

          <Card className="group border-white/10 bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-all duration-300">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Settings2 className="size-6 text-white" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-medium text-white text-center">
                You have full control
              </h3>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-white/70 text-center">
                From design elements to functionality, you have complete control
                to create a unique and personalized experience.
              </p>
            </CardContent>
          </Card>

          <Card className="group border-white/10 bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-all duration-300">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Sparkles className="size-6 text-white" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-medium text-white text-center">
                Powered By AI
              </h3>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-white/70 text-center">
                Elements to functionality, you have complete control to create a
                unique experience.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div className="relative mx-auto size-36 duration-300 group-hover:scale-105">
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:24px_24px]"
    />
    <div
      aria-hidden
      className="absolute inset-0 bg-gradient-radial from-transparent to-black/20 to-75%"
    />
    <div className="absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t border-white/20 bg-black/60 backdrop-blur-sm">
      {children}
    </div>
  </div>
);
