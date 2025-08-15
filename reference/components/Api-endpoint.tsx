"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface RequestExample {
  curl: string;
  javascript: string;
  python: string;
}

interface ApiEndpointProps {
  id: string;
  method: string;
  path: string;
  title: string;
  description: string;
  parameters: Parameter[];
  requestExample: RequestExample;
  responseExample: string;
}

const methodColors = {
  GET: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  POST: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  PUT: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  DELETE: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export function ApiEndpoint({
  id,
  method,
  path,
  title,
  description,
  parameters,
  requestExample,
  responseExample,
}: ApiEndpointProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedCode(type);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div id={id} className="scroll-mt-20 mb-12">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Badge
              className={cn(
                "font-mono",
                methodColors[method as keyof typeof methodColors]
              )}
            >
              {method}
            </Badge>
            <code className="text-lg font-mono bg-muted px-2 py-1 rounded">
              {path}
            </code>
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <p className="text-muted-foreground">{description}</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Parameters */}
          {parameters.length > 0 && (
            <div>
              <h4 className="font-semibold mb-3">Parameters</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Required</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parameters.map((param) => (
                    <TableRow key={param.name}>
                      <TableCell className="font-mono">{param.name}</TableCell>
                      <TableCell className="font-mono text-sm">
                        {param.type}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={param.required ? "default" : "secondary"}
                        >
                          {param.required ? "Required" : "Optional"}
                        </Badge>
                      </TableCell>
                      <TableCell>{param.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Request Examples */}
          <div>
            <h4 className="font-semibold mb-3">Request Examples</h4>
            <Tabs defaultValue="curl" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="curl">cURL</TabsTrigger>
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
              </TabsList>

              <TabsContent value="curl">
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{requestExample.curl}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(requestExample.curl, "curl")}
                  >
                    {copiedCode === "curl" ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="javascript">
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{requestExample.javascript}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() =>
                      copyToClipboard(requestExample.javascript, "javascript")
                    }
                  >
                    {copiedCode === "javascript" ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="python">
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{requestExample.python}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() =>
                      copyToClipboard(requestExample.python, "python")
                    }
                  >
                    {copiedCode === "python" ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Response Example */}
          <div>
            <h4 className="font-semibold mb-3">Response Example</h4>
            <div className="relative">
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{responseExample}</code>
              </pre>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2"
                onClick={() => copyToClipboard(responseExample, "response")}
              >
                {copiedCode === "response" ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
