"use client";

import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, Shield, Key, AlertTriangle } from "lucide-react";
import { useState } from "react";

function CopyButton({ text, type }: { text: string; type: string }) {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <Button
      size="sm"
      variant="ghost"
      className="absolute top-2 right-2"
      onClick={copyToClipboard}
    >
      {copied === type ? (
        <Check className="h-4 w-4" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  );
}

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              Authentication Guide
            </h1>
            <p className="text-lg text-muted-foreground">
              Learn how to authenticate your requests to the Subscription
              Tracker API using Bearer tokens.
            </p>
          </div>

          {/* Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Bearer Token Authentication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The Subscription Tracker API uses Bearer token authentication.
                You must include your API token in the{" "}
                <code className="bg-muted px-2 py-1 rounded">
                  Authorization
                </code>{" "}
                header of every request.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">Header Format:</p>
                <code className="text-sm">
                  Authorization: Bearer YOUR_API_TOKEN
                </code>
              </div>
            </CardContent>
          </Card>

          {/* Getting Your Token */}
          <Card>
            <CardHeader>
              <CardTitle>Getting Your API Token</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>
                  Send a request to the{" "}
                  <span className="px-2 py-0.5 rounded text-xs font-mono font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    /sign-up
                  </span>
                  or{" "}
                  <span className="px-2 py-0.5 rounded text-xs font-mono font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    /sign-in
                  </span>{" "}
                  endpoint
                </li>
                <li>The response body will include your Bearer token.</li>
                <li>
                  Store this token securely as you’ll need it to authenticate
                  all future API requests.
                </li>
              </ol>

              <div className="">
                <h4 className="font-semibold mb-3">Response Example</h4>
                <pre>
                  <code>{`{
  "token": "your-generated-bearer-token"
}`}</code>
                </pre>
              </div>
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Important:</strong> Keep your API token secure and
                  never expose it in client-side code or public repositories.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Basic Example */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Authentication Example</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="curl" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="curl">cURL</TabsTrigger>
                  <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                  <TabsTrigger value="python">Python</TabsTrigger>
                </TabsList>

                <TabsContent value="curl">
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{`curl -H "Authorization: Bearer YOUR_TOKEN" \\
  https://subscription-tracker-api-4oge.onrender.com/api/v1/subscriptions`}</code>
                    </pre>
                    <CopyButton
                      text={`curl -H "Authorization: Bearer YOUR_TOKEN" \\
  https://subscription-tracker-api-4oge.onrender.com/api/v1/subscriptions`}
                      type="curl-basic"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="javascript">
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{`const response = await fetch('https://subscription-tracker-api-4oge.onrender.com/api/v1/subscriptions', {
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN'
  }
});

const data = await response.json();
console.log(data);`}</code>
                    </pre>
                    <CopyButton
                      text={`const response = await fetch('https://subscription-tracker-api-4oge.onrender.com/api/v1/subscriptions', {
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN'
  }
});

const data = await response.json();
console.log(data);`}
                      type="js-basic"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="python">
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{`import requests

headers = {
    'Authorization': 'Bearer YOUR_TOKEN'
}

response = requests.get(
    'https://subscription-tracker-api-4oge.onrender.com/api/v1/subscriptions',
    headers=headers
)

data = response.json()
print(data)`}</code>
                    </pre>
                    <CopyButton
                      text={`import requests

headers = {
    'Authorization': 'Bearer YOUR_TOKEN'
}

response = requests.get(
    'https://subscription-tracker-api-4oge.onrender.com/api/v1/subscriptions',
    headers=headers
)

data = response.json()
print(data)`}
                      type="python-basic"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* POST Request Example */}
          <Card>
            <CardHeader>
              <CardTitle>POST Request with Authentication</CardTitle>
              <p className="text-sm text-muted-foreground">
                Example of creating a new subscription with proper
                authentication headers.
              </p>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="curl" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="curl">cURL</TabsTrigger>
                  <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                  <TabsTrigger value="python">Python</TabsTrigger>
                </TabsList>

                <TabsContent value="curl">
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{`curl -X POST \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Netflix",
    "category": "Streaming",
    "price": 9.99,
    "billing_cycle": "monthly",
    "next_renewal": "2025-09-01"
  }' \\
  https://subscription-tracker-api-4oge.onrender.com/api/v1/subscriptions`}</code>
                    </pre>
                    <CopyButton
                      text={`curl -X POST \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Netflix",
    "category": "Streaming",
    "price": 9.99,
    "billing_cycle": "monthly",
    "next_renewal": "2025-09-01"
  }' \\
  https://subscription-tracker-api-4oge.onrender.com/api/v1/subscriptions`}
                      type="curl-post"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="javascript">
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{`const response = await fetch('https://subscription-tracker-api-4oge.onrender.com/api/v1/subscriptions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Netflix',
    category: 'Streaming',
    price: 9.99,
    billing_cycle: 'monthly',
    next_renewal: '2025-09-01'
  })
});

const subscription = await response.json();
console.log(subscription);`}</code>
                    </pre>
                    <CopyButton
                      text={`const response = await fetch('https://subscription-tracker-api-4oge.onrender.com/api/v1/subscriptions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Netflix',
    category: 'Streaming',
    price: 9.99,
    billing_cycle: 'monthly',
    next_renewal: '2025-09-01'
  })
});

const subscription = await response.json();
console.log(subscription);`}
                      type="js-post"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="python">
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{`import requests

headers = {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
}

data = {
    'name': 'Netflix',
    'category': 'Streaming',
    'price': 9.99,
    'billing_cycle': 'monthly',
    'next_renewal': '2025-09-01'
}

response = requests.post(
    'https://subscription-tracker-api-4oge.onrender.com/api/v1/subscriptions',
    headers=headers,
    json=data
)

subscription = response.json()
print(subscription)`}</code>
                    </pre>
                    <CopyButton
                      text={`import requests

headers = {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
}

data = {
    'name': 'Netflix',
    'category': 'Streaming',
    'price': 9.99,
    'billing_cycle': 'monthly',
    'next_renewal': '2025-09-01'
}

response = requests.post(
    'https://subscription-tracker-api-4oge.onrender.com/api/v1/subscriptions',
    headers=headers,
    json=data
)

subscription = response.json()
print(subscription)`}
                      type="python-post"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Error Responses */}
          <Card>
            <CardHeader>
              <CardTitle>Authentication Error Responses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Badge variant="destructive">401</Badge>
                  Unauthorized
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Returned when no token is provided or the token is invalid.
                </p>
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{`{
  "error": "Unauthorized",
  "message": "Invalid or missing authentication token",
  "code": 401
}`}</code>
                  </pre>
                  <CopyButton
                    text={`{
  "error": "Unauthorized",
  "message": "Invalid or missing authentication token",
  "code": 401
}`}
                    type="error-401"
                  />
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Badge variant="destructive">403</Badge>
                  Forbidden
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Returned when the token is valid but doesn&apos;t have
                  permission for the requested resource.
                </p>
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{`{
  "error": "Forbidden",
  "message": "Insufficient permissions for this resource",
  "code": 403
}`}</code>
                  </pre>
                  <CopyButton
                    text={`{
  "error": "Forbidden",
  "message": "Insufficient permissions for this resource",
  "code": 403
}`}
                    type="error-403"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Best Practices */}
          <Card>
            <CardHeader>
              <CardTitle>Security Best Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <strong>Store tokens securely:</strong> Use environment
                    variables or secure credential storage systems. Never
                    hardcode tokens in your source code.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <strong>Use HTTPS only:</strong> Always make API requests
                    over HTTPS to protect your token in transit.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <strong>Rotate tokens regularly:</strong> Generate new
                    tokens periodically and revoke old ones.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <strong>Handle errors gracefully:</strong> Implement proper
                    error handling for authentication failures and token
                    expiration.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <strong>Monitor token usage:</strong> Keep track of API
                    usage and watch for unusual activity that might indicate a
                    compromised token.
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Rate Limiting */}
          <Card>
            <CardHeader>
              <CardTitle>Rate Limiting</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                The API enforces rate limits to ensure fair usage. Rate limit
                information is included in response headers:
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm">
                  <code>{`X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200`}</code>
                </pre>
              </div>
              <p className="text-sm text-muted-foreground">
                If you exceed the rate limit, you&apos;ll receive a{" "}
                <Badge variant="destructive">429</Badge> status code. Wait until
                the reset time before making additional requests.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
