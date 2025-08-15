"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";

const sidebarItems = [
  {
    title: "Subscriptions",
    id: "subscriptions",
    items: [
      { title: "List subscriptions", id: "get-subscriptions", method: "GET" },
      { title: "Get subscription", id: "get-subscription", method: "GET" },
      {
        title: "Create subscription",
        id: "create-subscription",
        method: "POST",
      },
      {
        title: "Update subscription",
        id: "update-subscription",
        method: "PUT",
      },
      {
        title: "Delete subscription",
        id: "delete-subscription",
        method: "DELETE",
      },
    ],
  },
  {
    title: "Users",
    id: "users",
    items: [
      { title: "Get user", id: "get-user", method: "GET" },
      {
        title: "Sign Up",
        id: "create-user",
        method: "POST",
      },
      {
        title: "Sign In",
        id: "sign-in-user",
        method: "POST",
      },
      {
        title: "Update user",
        id: "update-user",
        method: "PUT",
      },
      {
        title: "Delete user",
        id: "delete-user",
        method: "DELETE",
      },
    ],
  },
  // {
  //   title: "Stats",
  //   id: "stats",
  //   items: [{ title: "Get summary", id: "get-stats-summary", method: "GET" }],
  // },
];

const methodColors = {
  GET: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  POST: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  PUT: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  DELETE: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export function ApiSidebar() {
  const [activeSection, setActiveSection] = useState("");
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "subscriptions",
    "users",
    // "stats",
  ]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    sidebarItems.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);

      section.items.forEach((item) => {
        const itemElement = document.getElementById(item.id);
        if (itemElement) observer.observe(itemElement);
      });
    });

    return () => observer.disconnect();
  }, []);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <aside className="w-80 border-r bg-muted/30 p-6 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">
            API Reference
          </h3>
        </div>

        {sidebarItems.map((section) => (
          <div key={section.id}>
            <button
              onClick={() => toggleSection(section.id)}
              className="flex items-center justify-between w-full text-left font-medium py-2 hover:text-primary transition-colors"
            >
              <span>{section.title}</span>
              {expandedSections.includes(section.id) ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>

            {expandedSections.includes(section.id) && (
              <div className="ml-4 space-y-1 mt-2">
                {section.items.map((item) => (
                  <Link
                    key={item.id}
                    href={`#${item.id}`}
                    className={cn(
                      "flex items-center gap-2 py-2 px-3 rounded-md text-sm transition-colors hover:bg-accent",
                      activeSection === item.id
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded text-xs font-mono font-medium",
                        methodColors[item.method as keyof typeof methodColors]
                      )}
                    >
                      {item.method}
                    </span>
                    <span className="truncate">{item.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
