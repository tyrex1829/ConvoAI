import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Settings2, Sparkles, Zap } from "lucide-react";
import { ReactNode } from "react";

export default function Features() {
  return (
    <section className="py-16 md:py-32 mt-14">
      <div className="@container mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl text-white">
            Built to cover your needs
          </h2>
          <p className="mt-4 text-white/50">
            Customize the DMs for your audience, automate the comments <br />{" "}
            and use trained models to generate content.
          </p>
        </div>
        <div className="mx-auto mt-8 grid max-w-6xl gap-6 grid-cols-1 md:grid-cols-3 *:text-center md:mt-16">
          <Card className="group border-0 shadow-none bg-transparent">
            <CardHeader className="pb-3 bg-transparent">
              <CardDecorator>
                <Zap className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-medium text-white">Customizable</h3>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-white/50">
                Extensive customization options, allowing you to tailor every
                aspect to meet your specific needs.
              </p>
            </CardContent>
          </Card>

          <Card className="group border-0 shadow-none bg-transparent ">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Settings2 className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-medium text-white">
                You have full control
              </h3>
            </CardHeader>

            <CardContent>
              <p className="mt-3 text-sm text-white/50">
                From design elements to functionality, you have complete control
                to create a unique and personalized experience.
              </p>
            </CardContent>
          </Card>

          <Card className="group border-0 shadow-none bg-transparent ">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Sparkles className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-medium text-white">Powered By AI</h3>
            </CardHeader>

            <CardContent>
              <p className="mt-3 text-sm text-white/50">
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
    <div className="absolute inset-0 m-auto flex size-12 items-center justify-center text-white group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,1)] transition-all duration-300">
      {children}
    </div>
  </div>
);
