import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Code, Shield, BarChart3 } from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Subscription Tracker API
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Easily track, manage, and analyze your subscriptions with our REST
            API
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/docs">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/auth">View Authentication</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Code className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Simple REST Endpoints</CardTitle>
                <CardDescription>
                  Clean, intuitive API design following REST principles
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Secure Authentication</CardTitle>
                <CardDescription>
                  Bearer token authentication with enterprise-grade security
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <BarChart3 className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Analytics Support</CardTitle>
                <CardDescription>
                  Built-in analytics and reporting for subscription insights
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Example Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Quick Example
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="secondary">GET</Badge>
                  Request
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`curl -H "Authorization: Bearer YOUR_TOKEN" \\
  https://subscription-tracker-api-4oge.onrender.com/api/v1/subscriptions`}</code>
                </pre>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Response</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`[
  {
    "id": 1,
    "name": "Netflix",
    "category": "Streaming",
    "price": 9.99,
    "billing_cycle": "monthly",
    "next_renewal": "2025-09-01"
  }
]`}</code>
                </pre>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-8">
            <Button asChild>
              <Link href="/docs">
                View Full API Reference <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground">
              © 2025 Subscription Tracker API. All rights reserved.
            </p>
            <Link
              href="https://github.com/subscription-tracker/api"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub Repository
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
