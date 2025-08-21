"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

// Icons (using simple SVG icons for better performance and customization)
const HomeIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);

const AutomationIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const IntegrationsIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const SettingsIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const LogoutIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    className="w-6 h-6"
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
);

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType;
}

const navItems: NavItem[] = [
  {
    id: "home",
    label: "Home",
    icon: HomeIcon,
  },
  {
    id: "automations",
    label: "Automations",
    icon: AutomationIcon,
  },
  {
    id: "integrations",
    label: "Integrations",
    icon: IntegrationsIcon,
  },
  {
    id: "settings",
    label: "Settings",
    icon: SettingsIcon,
  },
];

interface SideBarProps {
  className?: string;
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function SideBar({
  className,
  activeTab,
  onTabChange,
}: SideBarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { data: session } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/signin";
        },
      },
    });
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="border-white/20 text-white hover:bg-white/10"
        >
          {isMobileOpen ? <CloseIcon /> : <MenuIcon />}
        </Button>
      </div>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 h-full backdrop-blur-sm border-r border-white/10 z-40 transition-all duration-300 ease-in-out",
          // Mobile styles
          "lg:relative lg:z-auto",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          // Desktop width
          isCollapsed ? "lg:w-16" : "lg:w-64",
          // Mobile width
          "w-64",
          className
        )}
      >
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              {!isCollapsed && (
                <div className="flex items-center space-x-3">
                  <h2 className="text-white font-semibold text-lg">ConvoAI</h2>
                </div>
              )}

              {/* Collapse button - desktop only */}
              <div className="hidden lg:block">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="text-white/60 hover:text-white hover:bg-white/10"
                >
                  <MenuIcon />
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    setIsMobileOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                    "hover:bg-white/10 hover:text-white",
                    isActive
                      ? "bg-white/15 text-white border border-white/20"
                      : "text-white/70",
                    isCollapsed && "lg:justify-center lg:space-x-0"
                  )}
                >
                  <Icon />
                  {!isCollapsed && (
                    <span className="font-normal text-base">{item.label}</span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Upgrade Plan Button */}
          <div className="p-4">
            <Button
              className={cn(
                "w-full bg-gradient-to-r bg-white hover:bg-white/85 text-black border-0",
                isCollapsed && "lg:px-2"
              )}
            >
              {!isCollapsed && <span>Upgrade Plan</span>}
              {isCollapsed && <span className="text-xs">↑</span>}
            </Button>
          </div>

          {/* User Profile & Sign Out */}
          <div className="p-4 border-t border-white/10 mt-auto">
            {session?.user && (
              <div
                className={cn(
                  "p-3 rounded-lg bg-white/5",
                  isCollapsed && "lg:p-2"
                )}
              >
                {!isCollapsed && (
                  <>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {session.user.name?.charAt(0) ||
                            session.user.email?.charAt(0) ||
                            "U"}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-sm truncate">
                          {session.user.name || "User"}
                        </p>
                        <p className="text-white/60 text-xs truncate">
                          {session.user.email}
                        </p>
                      </div>
                    </div>
                  </>
                )}

                <Button
                  variant="ghost"
                  onClick={handleSignOut}
                  className={cn(
                    "w-full justify-start text-white/70 hover:text-white hover:bg-white/10",
                    isCollapsed && "lg:justify-center lg:px-2"
                  )}
                >
                  <LogoutIcon />
                  {!isCollapsed && <span className="ml-3">Sign Out</span>}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
