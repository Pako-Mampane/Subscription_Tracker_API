"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/Theme-toggle";
import { SearchResults } from "@/components/Search-results";
import { Menu, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  { name: "API Reference", href: "/docs" },
  { name: "Authentication", href: "/auth" },
];

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => setShowSearchResults(false);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    setShowSearchResults(false);
    setSearchQuery("");
  }, [pathname]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setShowSearchResults(value.length > 0);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  ST
                </span>
              </div>
              <span className="font-bold text-lg">Sub Tracker</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.href
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* Search - now functional */}
            <div className="hidden md:flex items-center relative">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search endpoints..."
                  className="pl-8 w-64"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              {showSearchResults && (
                <div
                  className="absolute top-full left-0 right-0 mt-1 z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <SearchResults
                    query={searchQuery}
                    onResultClick={() => setShowSearchResults(false)}
                  />
                </div>
              )}
            </div>

            <ThemeToggle />

            {/* Mobile Navigation */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4 mt-8">
                  <div className="relative mb-4">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search endpoints..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                    />
                  </div>
                  {showSearchResults && (
                    <div className="mb-4">
                      <SearchResults
                        query={searchQuery}
                        onResultClick={() => {
                          setShowSearchResults(false);
                          setIsOpen(false);
                        }}
                      />
                    </div>
                  )}
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        pathname === item.href
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
