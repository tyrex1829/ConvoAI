"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import SideBar from "./SideBar";
import AutomationsFetch from "./fetching/AutomationsFetch";

// Content components for each tab
const HomeContent = ({
  session,
  onTabChange,
}: {
  session: any;
  onTabChange: (tabId: string) => void;
}) => (
  <div className="space-y-6">
    <div className="mb-24">
      <h1 className="text-3xl font-bold mb-2">Welcome to your Dashboard</h1>
      <p className="text-white/70">
        Hello, {session.user.name || session.user.email}!
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-[75%] mx-auto">
      {/* Dashboard cards */}
      <div className=" rounded-lg p-6 border border-white/20  transition-colors">
        <h3 className="text-xl font-semibold mb-2">Setup auto replies</h3>
        <p className="text-white/70 font-light mb-4">
          Deliver personalized messages to your followers
        </p>
        <button
          onClick={() => onTabChange("automations")}
          className="bg-white text-black rounded-lg py-2 px-10 border border-white/10 hover:bg-white/85 transition-colors"
        >
          Go
        </button>
      </div>

      <div className=" rounded-lg p-6 border border-white/20  transition-colors">
        <h3 className="text-xl font-semibold mb-2">Answer with AI</h3>
        <p className="text-white/70 mb-4">Respond to query with AI</p>
        <button
          onClick={() => onTabChange("automations")}
          className="bg-white text-black rounded-lg py-2 px-10 border border-white/10 hover:bg-white/85 transition-colors"
        >
          Go
        </button>
      </div>
    </div>
  </div>
);

const AutomationsContent = ({ session }: { session: any }) => (
  <div className="space-y-6">
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-2">Automations</h1>
    </div>

    {/* Automations List */}
    <AutomationsFetch session={session} />

    {/* Create New Automation */}
  </div>
);

const IntegrationsContent = () => (
  <div className="space-y-6">
    <div className="mb-16">
      <h1 className="text-3xl font-semibold mb-2">Integrations</h1>
    </div>

    {/* Connected Accounts */}
    <div className="bg-white/5 rounded-lg p-6 border border-white/10 max-w-[70%] mx-auto">
      <h3 className="text-xl font-semibold mb-4">Connected Accounts</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">IG</span>
            </div>
            <div>
              <h4 className="text-white font-medium">Instagram Business</h4>
              <p className="text-white/60 text-sm">@your_business_account</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
              Connected
            </span>
            <button className="text-white/70 hover:text-white">Manage</button>
          </div>
        </div>
      </div>
    </div>

    {/* Available Integrations */}
  </div>
);

const SettingsContent = ({ session }: { session: any }) => (
  <div className="space-y-6">
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-2">Settings</h1>
      <p className="text-white/70">
        Manage your account settings and preferences
      </p>
    </div>

    {/* Profile Settings */}
    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
      <h3 className="text-xl font-semibold mb-4">Profile Settings</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-white/70 text-sm mb-2">Name</label>
          <input
            type="text"
            defaultValue={session.user.name || ""}
            className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-white/70 text-sm mb-2">Email</label>
          <input
            type="email"
            defaultValue={session.user.email || ""}
            className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
            placeholder="Your email"
          />
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors">
          Save Changes
        </button>
      </div>
    </div>

    {/* Notification Settings */}
    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
      <h3 className="text-xl font-semibold mb-4">Notifications</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-white font-medium">Email Notifications</h4>
            <p className="text-white/60 text-sm">
              Receive email alerts for new messages
            </p>
          </div>
          <button className="w-12 h-6 bg-blue-600 rounded-full relative">
            <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-white font-medium">Push Notifications</h4>
            <p className="text-white/60 text-sm">
              Receive push notifications on your device
            </p>
          </div>
          <button className="w-12 h-6 bg-white/30 rounded-full relative">
            <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
          </button>
        </div>
      </div>
    </div>

    {/* Danger Zone */}
    <div className="bg-red-500/10 rounded-lg p-6 border border-red-500/20">
      <h3 className="text-xl font-semibold mb-4 text-red-400">Danger Zone</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-white font-medium">Delete Account</h4>
            <p className="text-white/60 text-sm">
              Permanently delete your account and all data
            </p>
          </div>
          <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/signin");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeContent session={session} onTabChange={setActiveTab} />;
      case "automations":
        return <AutomationsContent session={session} />;
      case "integrations":
        return <IntegrationsContent />;
      case "settings":
        return <SettingsContent session={session} />;
      default:
        return <HomeContent session={session} onTabChange={setActiveTab} />;
    }
  };

  // User is authenticated, show dashboard with sidebar
  return (
    <div className="min-h-screen text-white flex">
      {/* Sidebar */}
      <SideBar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        <div className="container mx-auto px-4 py-8 lg:px-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
