"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  method: string;
  path: string;
  section: string;
  href: string;
}

const searchData: SearchResult[] = [
  {
    id: "get-subscriptions",
    title: "List all subscriptions",
    description:
      "Retrieve a list of all subscriptions for the authenticated user.",
    method: "GET",
    path: "/subscriptions",
    section: "Subscriptions",
    href: "/docs#get-subscriptions",
  },
  {
    id: "get-subscription",
    title: "Get subscription details",
    description: "Retrieve details of a specific subscription by ID.",
    method: "GET",
    path: "/subscriptions/{id}",
    section: "Subscriptions",
    href: "/docs#get-subscription",
  },
  {
    id: "create-subscription",
    title: "Create a new subscription",
    description: "Add a new subscription to track.",
    method: "POST",
    path: "/subscriptions",
    section: "Subscriptions",
    href: "/docs#create-subscription",
  },
  {
    id: "update-subscription",
    title: "Update a subscription",
    description: "Update an existing subscription's details.",
    method: "PUT",
    path: "/subscriptions/{id}",
    section: "Subscriptions",
    href: "/docs#update-subscription",
  },
  {
    id: "delete-subscription",
    title: "Delete a subscription",
    description: "Remove a subscription from tracking.",
    method: "DELETE",
    path: "/subscriptions/{id}",
    section: "Subscriptions",
    href: "/docs#delete-subscription",
  },
  {
    id: "get-user",
    title: "Get user details",
    description: "Retrieve details of a specific user by ID.",
    method: "GET",
    path: "/users/{id}",
    section: "users",
    href: "/docs#get-user",
  },
  {
    id: "create-user",
    title: "Create a new user",
    description: "Add a new user.",
    method: "POST",
    path: "/auth/sign-up",
    section: "users",
    href: "/docs#create-user",
  },
  {
    id: "sign-in-user",
    title: "Sign in a new user",
    description: "Log in  new user.",
    method: "POST",
    path: "/auth/sign-up",
    section: "users",
    href: "/docs#sign-in-user",
  },
  {
    id: "update-user",
    title: "Update a user",
    description: "Update an existing user's details.",
    method: "PUT",
    path: "/users/{id}",
    section: "users",
    href: "/docs#update-user",
  },
  {
    id: "delete-user",
    title: "Delete a user",
    description: "Remove a user from the system.",
    method: "DELETE",
    path: "/users/{id}",
    section: "users",
    href: "/docs#delete-user",
  },
  // {
  //   id: "get-stats-summary",
  //   title: "Get subscription statistics",
  //   description:
  //     "Retrieve summary statistics including total monthly spend, yearly spend, and category breakdown.",
  //   method: "GET",
  //   path: "/stats/summary",
  //   section: "Stats",
  //   href: "/docs#get-stats-summary",
  // },
  {
    id: "authentication",
    title: "Bearer Token Authentication",
    description: "Learn how to authenticate your requests using Bearer tokens.",
    method: "AUTH",
    path: "/auth",
    section: "Authentication",
    href: "/auth",
  },
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Quick start guide and API overview.",
    method: "GUIDE",
    path: "/",
    section: "Documentation",
    href: "/",
  },
];

const methodColors = {
  GET: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  POST: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  PUT: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  DELETE: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  AUTH: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  GUIDE: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
};

interface SearchResultsProps {
  query: string;
  onResultClick: () => void;
}

export function SearchResults({ query, onResultClick }: SearchResultsProps) {
  const results = useMemo(() => {
    if (!query.trim()) return [];

    const searchTerm = query.toLowerCase();
    return searchData
      .filter((item) => {
        return (
          item.title.toLowerCase().includes(searchTerm) ||
          item.description.toLowerCase().includes(searchTerm) ||
          item.path.toLowerCase().includes(searchTerm) ||
          item.method.toLowerCase().includes(searchTerm) ||
          item.section.toLowerCase().includes(searchTerm)
        );
      })
      .slice(0, 8); // Limit to 8 results
  }, [query]);

  if (results.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground text-center">
            No results found for &quot;{query}&quot;
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-h-96 overflow-y-auto">
      <CardContent className="p-2">
        <div className="space-y-1">
          {results.map((result) => (
            <Link
              key={result.id}
              href={result.href}
              onClick={onResultClick}
              className="block p-3 rounded-md hover:bg-accent transition-colors"
            >
              <div className="flex items-start gap-3">
                <Badge
                  className={cn(
                    "font-mono text-xs",
                    methodColors[result.method as keyof typeof methodColors]
                  )}
                >
                  {result.method}
                </Badge>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm truncate">
                      {result.title}
                    </h4>
                    {result.path !== result.href && (
                      <code className="text-xs bg-muted px-1 py-0.5 rounded font-mono">
                        {result.path}
                      </code>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {result.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {result.section}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {results.length === 8 && (
          <div className="text-center pt-2 border-t mt-2">
            <p className="text-xs text-muted-foreground">
              Showing first 8 results. Try a more specific search.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
