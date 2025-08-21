"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/axios";

interface Automation {
  id: string;
  name: string;
  createdAt: string;
  active: boolean;
  keywords: Array<{ id: string; word: string }>;
  trigger: Array<{
    id: string;
    type: string;
  }>;
  listener: Array<{
    id: string;
    listener: string;
    prompt?: string;
    commentReply?: string;
    dmCount: number;
    commentCount: number;
  }>;
}

export default function AutomationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [automation, setAutomation] = useState<Automation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showTriggerDropdown, setShowTriggerDropdown] = useState(false);
  const [selectedTriggerType, setSelectedTriggerType] = useState<string>("");
  const [triggerKeywords, setTriggerKeywords] = useState<string[]>([""]);
  const [isCreatingTrigger, setIsCreatingTrigger] = useState(false);
  const [showListenerDropdown, setShowListenerDropdown] = useState(false);
  const [selectedListenerType, setSelectedListenerType] = useState<string>("");
  const [listenerMessage, setListenerMessage] = useState("");
  const [listenerPrompt, setListenerPrompt] = useState("");
  const [isCreatingListener, setIsCreatingListener] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listenerDropdownRef = useRef<HTMLDivElement>(null);

  const automationId = params.slug as string;

  useEffect(() => {
    if (!automationId) {
      setError("Invalid automation ID");
      setLoading(false);
      return;
    }

    const fetchAutomationDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("Fetching automation with ID:", automationId);

        // Fetch specific automation by ID
        const { data } = await api.get(`/user/automation/${automationId}`);

        console.log("API Response:", data);

        if (data.automation) {
          setAutomation(data.automation);
        } else {
          setError("Automation not found");
        }
      } catch (err: any) {
        console.error("Error fetching automation details:", err);
        console.error("Error response:", err.response);

        // Handle different error types
        if (err.response?.status === 404) {
          setError("Automation not found");
        } else if (err.response?.status === 401) {
          setError("Unauthorized access");
        } else {
          setError("Failed to load automation details");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAutomationDetail();
  }, [automationId]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowTriggerDropdown(false);
      }
      if (
        listenerDropdownRef.current &&
        !listenerDropdownRef.current.contains(event.target as Node)
      ) {
        setShowListenerDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCreateTrigger = async () => {
    if (!selectedTriggerType) return;

    // Filter out empty keywords
    const validKeywords = triggerKeywords.filter(
      (keyword) => keyword.trim() !== ""
    );

    try {
      setIsCreatingTrigger(true);

      const requestBody = {
        name: automation?.name,
        trigger: [{ type: selectedTriggerType }],
        keywords: validKeywords.map((keyword) => ({ word: keyword })),
      };

      console.log("Creating trigger:", requestBody);

      const response = await api.patch(
        `/user/automation/${automationId}`,
        requestBody
      );

      if (response.status === 200) {
        // Reset form
        setSelectedTriggerType("");
        setTriggerKeywords([""]);
        setShowTriggerDropdown(false);

        // Refresh automation data
        const { data } = await api.get(`/user/automation/${automationId}`);
        if (data.automation) {
          setAutomation(data.automation);
        }
      }
    } catch (error) {
      console.error("Error creating trigger:", error);
      // You might want to show an error message to the user here
    } finally {
      setIsCreatingTrigger(false);
    }
  };

  const addKeywordInput = () => {
    setTriggerKeywords([...triggerKeywords, ""]);
  };

  const updateKeyword = (index: number, value: string) => {
    const newKeywords = [...triggerKeywords];
    newKeywords[index] = value;
    setTriggerKeywords(newKeywords);
  };

  const removeKeyword = (index: number) => {
    if (triggerKeywords.length > 1) {
      const newKeywords = triggerKeywords.filter((_, i) => i !== index);
      setTriggerKeywords(newKeywords);
    }
  };

  const handleCreateListener = async () => {
    if (!selectedListenerType) return;

    try {
      setIsCreatingListener(true);

      const requestBody: any = {
        name: automation?.name,
        listener: [
          {
            listener: selectedListenerType,
            ...(selectedListenerType === "MESSAGE"
              ? { commentReply: listenerMessage }
              : { prompt: listenerPrompt }),
          },
        ],
      };

      console.log("Creating listener:", requestBody);

      const response = await api.patch(
        `/user/automation/${automationId}`,
        requestBody
      );

      if (response.status === 200) {
        // Reset form
        setSelectedListenerType("");
        setListenerMessage("");
        setListenerPrompt("");
        setShowListenerDropdown(false);

        // Refresh automation data
        const { data } = await api.get(`/user/automation/${automationId}`);
        if (data.automation) {
          setAutomation(data.automation);
        }
      }
    } catch (error) {
      console.error("Error creating listener:", error);
    } finally {
      setIsCreatingListener(false);
    }
  };

  const triggerOptions = [
    {
      id: "comments",
      title: "User comments on my post",
    },
    {
      id: "dm",
      title: "User sends me a dm with a keyword",
    },
  ];

  const listenerOptions = [
    {
      id: "MESSAGE",
      title: "Send message",
      description: "Send a predefined message as response",
    },
    {
      id: "SMARTAI",
      title: "Send by AI",
      description: "Generate response using AI with custom prompt",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16  rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <svg
              className="w-8 h-8 text-white/60 animate-spin"
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
          </div>
          <div className="text-white">Loading automation details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen  text-white">
        <div className="container mx-auto px-4 py-8">
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
              <h3 className="text-xl font-semibold text-red-400 mb-2">Error</h3>
              <p className="text-white/60 mb-6">{error}</p>
              <button
                onClick={() => {
                  router.push("/dashboard");
                  // Set automations tab active when we return
                  setTimeout(() => {
                    const event = new CustomEvent("setActiveTab", {
                      detail: "automations",
                    });
                    window.dispatchEvent(event);
                  }, 100);
                }}
                className="px-6 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-medium transition-colors hover:bg-white/20"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!automation) {
    return null;
  }

  return (
    <div className="min-h-screen  text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                router.push("/dashboard");
                // Set automations tab active when we return
                setTimeout(() => {
                  const event = new CustomEvent("setActiveTab", {
                    detail: "automations",
                  });
                  window.dispatchEvent(event);
                }, 100);
              }}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <svg
                className="w-6 h-6 text-white/70"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
            <div>
              <input
                className="text-3xl font-bold bg-transparent border border-white/5 rounded-lg p-2 outline-none"
                value={automation.name}
                onChange={(e) =>
                  setAutomation({ ...automation, name: e.target.value })
                }
              />
              <div className="mt-2 mb-2">
                <label className="block text-white/70 text-sm mb-1">
                  Created
                </label>
                <p className="text-white/60 text-sm">
                  {new Date(automation.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                automation.active
                  ? "bg-green-500/20 text-green-400"
                  : "bg-gray-500/20 text-gray-400"
              }`}
            >
              {automation.active ? "Active" : "Inactive"}
            </span>
            <button
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                automation.active
                  ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                  : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
              }`}
            >
              {automation.active ? "Disable" : "Enable"}
            </button>
          </div>
        </div>

        {/* Automation Details */}
        <div className="space-y-8">
          {/* Triggers */}
          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-4">Triggers</h3>
            {automation.trigger.length > 0 ? (
              <div className="space-y-4">
                {automation.trigger.map((trigger) => (
                  <div
                    key={trigger.id}
                    className="p-4 bg-white/10 border border-white/20 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-medium">{trigger.type}</h4>
                      <button className="text-white/60 hover:text-white">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                    </div>
                    <div className="mb-2">
                      <label className="block text-white/70 text-sm mb-1">
                        Trigger Type
                      </label>
                      <p className="text-white/80 text-sm">{trigger.type}</p>
                    </div>
                  </div>
                ))}
                <div ref={listenerDropdownRef} className="relative">
                  <button
                    onClick={() =>
                      setShowListenerDropdown(!showListenerDropdown)
                    }
                    className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors"
                  >
                    Add Listener
                  </button>

                  {showListenerDropdown && (
                    <div className="absolute top-full mt-2 left-0 w-96 bg-gray-800 rounded-lg border border-gray-600 shadow-xl z-10">
                      <div className="p-4 space-y-4">
                        {/* Listener Options */}
                        {listenerOptions.map((option) => (
                          <div
                            key={option.id}
                            className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                              selectedListenerType === option.id
                                ? "border-blue-500 bg-blue-500/10"
                                : "border-gray-600 hover:border-gray-500"
                            }`}
                            onClick={() => setSelectedListenerType(option.id)}
                          >
                            <div className="flex items-start space-x-3">
                              <div
                                className={`w-4 h-4 rounded-full border-2 mt-0.5 ${
                                  selectedListenerType === option.id
                                    ? "border-blue-500 bg-blue-500"
                                    : "border-gray-400"
                                }`}
                              >
                                {selectedListenerType === option.id && (
                                  <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                                )}
                              </div>
                              <div>
                                <h4 className="text-white font-medium text-sm">
                                  {option.title}
                                </h4>
                                <p className="text-gray-400 text-xs mt-1">
                                  {option.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* Input based on selection */}
                        {selectedListenerType === "MESSAGE" && (
                          <div>
                            <label className="block text-gray-300 text-sm mb-2">
                              Message
                            </label>
                            <input
                              type="text"
                              value={listenerMessage}
                              onChange={(e) =>
                                setListenerMessage(e.target.value)
                              }
                              placeholder="Enter your message..."
                              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                            />
                          </div>
                        )}

                        {selectedListenerType === "SMARTAI" && (
                          <div>
                            <label className="block text-gray-300 text-sm mb-2">
                              AI Prompt
                            </label>
                            <textarea
                              value={listenerPrompt}
                              onChange={(e) =>
                                setListenerPrompt(e.target.value)
                              }
                              placeholder="Enter your AI prompt..."
                              rows={3}
                              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none"
                            />
                          </div>
                        )}

                        {/* Create Button */}
                        <button
                          onClick={handleCreateListener}
                          disabled={
                            !selectedListenerType ||
                            isCreatingListener ||
                            (selectedListenerType === "MESSAGE" &&
                              !listenerMessage.trim()) ||
                            (selectedListenerType === "SMARTAI" &&
                              !listenerPrompt.trim())
                          }
                          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-colors"
                        >
                          {isCreatingListener ? "Creating..." : "Add Listener"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-white/60 mb-4">No triggers configured</p>
                <div ref={dropdownRef} className="relative">
                  <button
                    onClick={() => setShowTriggerDropdown(!showTriggerDropdown)}
                    className="px-4 py-2 bg-white hover:bg-white/85 rounded-lg text-black transition-colors"
                  >
                    Add Trigger
                  </button>

                  {showTriggerDropdown && (
                    <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 w-96 bg-gray-800 rounded-lg border border-gray-600 shadow-xl z-10">
                      <div className="p-4 space-y-4">
                        {/* Trigger Options */}
                        {triggerOptions.map((option) => (
                          <div
                            key={option.id}
                            className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                              selectedTriggerType === option.id
                                ? "border-blue-500 bg-blue-500/10"
                                : "border-gray-600 hover:border-gray-500"
                            }`}
                            onClick={() => setSelectedTriggerType(option.id)}
                          >
                            <div className="flex items-start space-x-3">
                              <div
                                className={`w-4 h-4 rounded-full border-2 mt-0.5 ${
                                  selectedTriggerType === option.id
                                    ? "border-blue-500 bg-blue-500"
                                    : "border-gray-400"
                                }`}
                              >
                                {selectedTriggerType === option.id && (
                                  <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                                )}
                              </div>
                              <div>
                                <h4 className="text-white font-medium text-sm">
                                  {option.title}
                                </h4>
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* Keyword Input - always show */}
                        <div>
                          <label className="block text-gray-300 text-sm mb-2">
                            Add words that trigger automations
                          </label>
                          <div className="space-y-2">
                            {triggerKeywords.map((keyword, index) => (
                              <div
                                key={index}
                                className="flex items-center space-x-2"
                              >
                                <input
                                  type="text"
                                  value={keyword}
                                  onChange={(e) =>
                                    updateKeyword(index, e.target.value)
                                  }
                                  placeholder="Add keyword..."
                                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                />
                                {keyword.trim() !== "" && (
                                  <button
                                    onClick={addKeywordInput}
                                    className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white transition-colors"
                                  >
                                    <svg
                                      className="w-4 h-4"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4v16m8-8H4"
                                      />
                                    </svg>
                                  </button>
                                )}
                                {triggerKeywords.length > 1 && (
                                  <button
                                    onClick={() => removeKeyword(index)}
                                    className="w-8 h-8 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white transition-colors"
                                  >
                                    <svg
                                      className="w-4 h-4"
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
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Create Button */}
                        <button
                          onClick={handleCreateTrigger}
                          disabled={!selectedTriggerType || isCreatingTrigger}
                          className="w-full px-4 py-2 bg-white text-black hover:bg-white/85 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
                        >
                          {isCreatingTrigger ? "Creating..." : "Create Trigger"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Listeners & Responses */}
          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-4">
              Listeners & Responses
            </h3>
            {automation.listener.length > 0 ? (
              <div className="space-y-4">
                {automation.listener.map((listener) => (
                  <div
                    key={listener.id}
                    className="p-4 bg-white/10 border border-white/20 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-medium">
                        {listener.listener === "MESSAGE"
                          ? "Send Message"
                          : "Send by AI"}
                      </h4>
                      <button className="text-white/60 hover:text-white">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-white/70 text-sm mb-1">
                          Type
                        </label>
                        <p className="text-white/80 text-sm">
                          {listener.listener}
                        </p>
                      </div>
                      {listener.commentReply && (
                        <div>
                          <label className="block text-white/70 text-sm mb-1">
                            Message
                          </label>
                          <p className="text-white/80 text-sm">
                            {listener.commentReply}
                          </p>
                        </div>
                      )}
                      {listener.prompt && (
                        <div>
                          <label className="block text-white/70 text-sm mb-1">
                            AI Prompt
                          </label>
                          <p className="text-white/80 text-sm">
                            {listener.prompt}
                          </p>
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-white/70 text-sm mb-1">
                            DM Count
                          </label>
                          <p className="text-white/80 text-sm">
                            {listener.dmCount}
                          </p>
                        </div>
                        <div>
                          <label className="block text-white/70 text-sm mb-1">
                            Comment Count
                          </label>
                          <p className="text-white/80 text-sm">
                            {listener.commentCount}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-white/60 mb-4">No listeners configured</p>
                <p className="text-white/40 text-sm">
                  Add triggers first to enable listeners
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button className="px-6 py-2 bg-white hover:bg-white/85 rounded-lg text-black font-medium transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
