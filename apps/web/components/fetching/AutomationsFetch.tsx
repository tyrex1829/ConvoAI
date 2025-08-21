"use client";

import { api } from "@/lib/axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Automation {
  id: string;
  name: string;
  createdAt: string;
  active: boolean;
  keywords: Array<{ id: string; word: string }>;
  listener: Array<{
    id: string;
    listener: string;
    prompt?: string;
    commentReply?: string;
  }>;
}

interface AutomationsFetchProps {
  session: any;
}

export default function AutomationsFetch({ session }: AutomationsFetchProps) {
  const router = useRouter();
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreatingAutomation, setIsCreatingAutomation] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchAutomations = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data } = await api.get("/user/automation");

        const automationsData: Automation[] =
          data.automation?.automations || [];
        setAutomations(automationsData);
      } catch (err) {
        console.error("Error fetching automations:", err);
        setError("Failed to load automations");
      } finally {
        setLoading(false);
      }
    };

    if (session?.user) {
      fetchAutomations();
    }
  }, [session]);

  const handleCreateAutomation = async () => {
    try {
      setIsCreatingAutomation(true);
      setError(null);
      setSuccessMessage(null);

      const response = await api.patch("/user/initialize-automation");

      if (response.status === 200) {
        setSuccessMessage("Automation created successfully!");

        // Refresh the automations list after successful creation
        const { data } = await api.get("/user/automation");
        const automationsData: Automation[] =
          data.automation?.automations || [];
        setAutomations(automationsData);

        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (err) {
      console.error("Error creating automation:", err);
      setError("Failed to create automation");
    } finally {
      setIsCreatingAutomation(false);
    }
  };

  const handleConfigureAutomation = (automationId: string) => {
    console.log("Navigating to automation detail:", automationId);
    console.log("Full URL:", `/dashboard/${automationId}`);
    router.push(`/dashboard/${automationId}`);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className=" rounded-lg p-8  max-w-md mx-auto">
          <h3 className="text-xl font-semibold text-white mb-2">
            Loading Automations...
          </h3>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-500/10 rounded-lg p-8 border border-red-500/20 max-w-md mx-auto">
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
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-red-400 mb-2">
            Error Loading Automations
          </h3>
          <p className="text-white/60 mb-6">
            {error}. Please try refreshing the page or contact support if the
            problem persists.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (automations.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-white/5 rounded-lg p-8 border border-white/10 max-w-md mx-auto flex flex-col items-center justify-center">
          <h3 className="text-xl font-semibold text-white mb-8">
            No automations
          </h3>

          <button
            onClick={handleCreateAutomation}
            disabled={isCreatingAutomation}
            className="px-6 py-2 bg-transparent border border-white/20 rounded-lg hover:bg-white/15 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isCreatingAutomation && (
              <svg
                className="w-4 h-4 animate-spin"
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
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            {isCreatingAutomation ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {successMessage && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-4">
          <div className="flex items-center space-x-3">
            <svg
              className="w-5 h-5 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-green-400 font-medium">{successMessage}</p>
          </div>
        </div>
      )}

      {automations.map((automation) => (
        <div
          key={automation.id}
          className="flex items-center justify-between p-4  rounded-lg border border-white/20 transition-colors"
        >
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h4 className="text-white font-medium">{automation.name}</h4>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  automation.active
                    ? "bg-green-500/20 text-green-400"
                    : "bg-gray-500/20 text-gray-400"
                }`}
              >
                {automation.active ? "Active" : "Inactive"}
              </span>
            </div>

            {automation.keywords.length > 0 && (
              <div className="mb-2">
                <p className="text-white/60 text-sm mb-1">Keywords:</p>
                <div className="flex flex-wrap gap-1">
                  {automation.keywords.map((keyword) => (
                    <span
                      key={keyword.id}
                      className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs"
                    >
                      {keyword.word}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {automation.listener.length > 0 && (
              <div>
                <p className="text-white/60 text-sm mb-1">Listeners:</p>
                <div className="space-y-1">
                  {automation.listener.map((listener) => (
                    <div key={listener.id} className="text-white/60 text-sm">
                      <span className="font-medium">{listener.listener}</span>
                      {listener.prompt && (
                        <span className="ml-2 text-white/40">
                          - {listener.prompt}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <p className="text-white/40 text-xs mt-2">
              Created: {new Date(automation.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex items-center space-x-3 ml-4">
            <button
              onClick={() => handleConfigureAutomation(automation.id)}
              className="text-white/70 hover:text-white text-sm font-medium transition-colors"
            >
              Configure
            </button>
            <button
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                automation.active
                  ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                  : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
              }`}
            >
              {automation.active ? "Disable" : "Enable"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
