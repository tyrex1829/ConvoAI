"use client";

// import { LogoIcon } from '@/components/logo'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("firstname") as string;
    const email = formData.get("email") as string;
    const password = formData.get("pwd") as string;

    try {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
      });

      if (error) {
        setError(error.message || "An error occurred during signup");
        return;
      }

      if (data) {
        // Signup successful, redirect to dashboard
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Signup error:", err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="flex min-h-screen px-4 py-16 md:py-32">
      <form
        onSubmit={handleSubmit}
        className=" m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border border-white/30 p-0.5 shadow-md"
      >
        <div className="p-8 pb-6">
          <div>
            <h1 className=" mb-1 mt-4 text-xl font-semibold text-white">
              Create a ConvoAI Account
            </h1>
            <p className="text-sm text-white/50">
              Welcome! Create an account to get started
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              className="bg-transparent text-white hover:bg-white/10 hover:text-white border-white/30"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="0.98em"
                height="1em"
                viewBox="0 0 256 262"
              >
                <path
                  fill="#4285f4"
                  d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                ></path>
                <path
                  fill="#34a853"
                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                ></path>
                <path
                  fill="#fbbc05"
                  d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                ></path>
                <path
                  fill="#eb4335"
                  d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                ></path>
              </svg>
              <span>Google</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="bg-transparent text-white hover:bg-white/10 hover:text-white border-white/30"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 256 256"
              >
                <path fill="#f1511b" d="M121.666 121.666H0V0h121.666z"></path>
                <path fill="#80cc28" d="M256 121.666H134.335V0H256z"></path>
                <path
                  fill="#00adef"
                  d="M121.663 256.002H0V134.336h121.663z"
                ></path>
                <path
                  fill="#fbbc09"
                  d="M256 256.002H134.335V134.336H256z"
                ></path>
              </svg>
              <span>Microsoft</span>
            </Button>
          </div>

          <hr className="my-4 border-dashed border-white/30" />

          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="firstname" className="block text-sm text-white">
                Name
              </Label>
              <Input
                type="text"
                required
                name="firstname"
                id="firstname"
                className="bg-transparent border-white/30 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm text-white">
                E-mail
              </Label>
              <Input
                type="email"
                required
                name="email"
                id="email"
                className="bg-transparent border-white/30 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pwd" className=" text-sm text-white">
                Password
              </Label>
              <Input
                type="password"
                required
                name="pwd"
                id="pwd"
                className="input sz-md variant-mixed bg-transparent border-white/30 text-white"
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center">{error}</div>
            )}

            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-white/80"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Continue"}
            </Button>
          </div>
        </div>

        <div className=" border p-3 bg-white/10 border-white/10 rounded-lg">
          <p className=" text-center text-sm text-white/85">
            Have an account ?
            <Button asChild variant="link" className="px-2 text-white">
              <Link href="/signin">Sign In</Link>
            </Button>
          </p>
        </div>
      </form>
    </section>
  );
}
