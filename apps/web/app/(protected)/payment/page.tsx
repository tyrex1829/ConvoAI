"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/axios";

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<
    "loading" | "success" | "error" | "cancelled"
  >("loading");
  const [message, setMessage] = useState("");

  const session_id = searchParams.get("session_id");
  const cancel = searchParams.get("cancel");

  useEffect(() => {
    const handlePaymentResult = async () => {
      // Handle cancelled payment
      if (cancel === "true") {
        setStatus("cancelled");
        setMessage("Payment was cancelled");
        return;
      }

      // Handle successful payment
      if (session_id) {
        try {
          // Call backend to update subscription
          const response = await api.post("/user/subscription", {
            session_id: session_id,
          });

          if (response.status === 200) {
            setStatus("success");
            setMessage(
              "Payment successful! Your subscription has been upgraded to PRO."
            );

            // Redirect to dashboard after 3 seconds
            setTimeout(() => {
              router.push("/dashboard");
            }, 3000);
          } else {
            setStatus("error");
            setMessage(
              "Payment processed but failed to update subscription. Please contact support."
            );
          }
        } catch (error: any) {
          console.error("Subscription update error:", error);
          setStatus("error");
          setMessage(
            error.response?.data?.error ||
              "An error occurred while processing your subscription. Please contact support."
          );
        }
      } else {
        setStatus("error");
        setMessage("Invalid payment session");
      }
    };

    handlePaymentResult();
  }, [session_id, cancel, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="max-w-md w-full mx-auto p-6">
        <div className="bg-white/5 rounded-lg p-8 border border-white/10 text-center">
          {status === "loading" && (
            <>
              <div className="w-16 h-16 mx-auto mb-4 animate-spin">
                <svg
                  className="w-full h-full text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2">Processing Payment</h2>
              <p className="text-white/60">
                Please wait while we confirm your payment...
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-green-400 mb-2">
                Payment Successful!
              </h2>
              <p className="text-white/80 mb-6">{message}</p>
              <p className="text-sm text-white/60">
                Redirecting to dashboard in 3 seconds...
              </p>
            </>
          )}

          {status === "error" && (
            <>
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-red-400 mb-2">
                Payment Error
              </h2>
              <p className="text-white/80 mb-6">{message}</p>
              <button
                onClick={() => router.push("/dashboard")}
                className="px-6 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-medium transition-colors hover:bg-white/20"
              >
                Back to Dashboard
              </button>
            </>
          )}

          {status === "cancelled" && (
            <>
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-yellow-400 mb-2">
                Payment Cancelled
              </h2>
              <p className="text-white/80 mb-6">{message}</p>
              <button
                onClick={() => router.push("/dashboard")}
                className="px-6 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-medium transition-colors hover:bg-white/20"
              >
                Back to Dashboard
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
