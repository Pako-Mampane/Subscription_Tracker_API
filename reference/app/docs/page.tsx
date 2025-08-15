import { ApiSidebar } from "@/components/Api-sidebar";
import { ApiEndpoint } from "@/components/Api-endpoint";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <ApiSidebar />
        <main className="flex-1 p-8 max-w-4xl">
          <div className="space-y-12">
            <div>
              <h1 className="text-4xl font-bold mb-4">API Reference</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Complete reference for the Subscription Tracker API endpoints.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Base URL:</strong>{" "}
                  <code>
                    https://subscription-tracker-api-4oge.onrender.com/api/v1
                  </code>
                </p>
              </div>
            </div>

            {/* Subscriptions Section */}
            <section id="subscriptions" className="scroll-mt-20">
              <h2 className="text-3xl font-bold mb-6 border-b pb-2">
                Subscriptions
              </h2>

              <ApiEndpoint
                id="get-subscriptions"
                method="GET"
                path="/subscriptions"
                title="List all subscriptions"
                description="Retrieve a list of all subscriptions for the authenticated user."
                parameters={[]}
                requestExample={{
                  curl: `curl -H "Authorization: Bearer YOUR_TOKEN" \\
  https://subscription-tracker-api-4oge.onrender.com/api/v1/subscriptions`,
                  javascript: `const response = await fetch('https://subscription-tracker-api-4oge.onrender.com/api/v1/subscriptions', {
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN'
  }
});
const subscriptions = await response.json();`,
                  python: `import requests

headers = {'Authorization': 'Bearer YOUR_TOKEN'}
response = requests.get('https://subscription-tracker-api-4oge.onrender.com/api/v1/subscriptions', headers=headers)
subscriptions = response.json()`,
                }}
                responseExample={`[
  {
    "id": 1,
    "name": "Netflix",
    "price": 9.99,
    "currency":"BWP",
    "category": "entertainment",
    "frequency": "monthly",
    "paymentMethod": "Credit Card",
    "status": "active",
    "startDate": "2025-08-01",
    "next_renewal": "2025-09-01"
  },
  {
    "id": 2,
    "name": "Bloomberg",
    "price": 15.99,
    "currency":"BWP",
    "category": "finance",
    "frequency": "monthly",
    "paymentMethod": "Credit Card",
    "status": "active",
    "startDate": "2025-08-01",
    "next_renewal": "2025-09-01"
  },
]`}
              />

              <ApiEndpoint
                id="get-subscription"
                method="GET"
                path="/subscriptions/{id}"
                title="Get subscription details"
                description="Retrieve details of a specific subscription by ID."
                parameters={[
                  {
                    name: "id",
                    type: "integer",
                    required: true,
                    description: "The subscription ID",
                  },
                ]}
                requestExample={{
                  curl: `curl -H "Authorization: Bearer YOUR_TOKEN" \\
  https://subscription-tracker-api-4oge.onrender.com/api/v1/subscriptions/1`,
                  javascript: `const response = await fetch('https://subscription-tracker-api-4oge.onrender.com/api/v1/subscriptions/1', {
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN'
  }
});
const subscription = await response.json();`,
                  python: `import requests

headers = {'Authorization': 'Bearer YOUR_TOKEN'}
response = requests.get('https://subscription-tracker-api-4oge.onrender.com/api/v1/subscriptions/1', headers=headers)
subscription = response.json()`,
                }}
                responseExample={`[{
    "id": 1,
    "name": "Netflix",
    "price": 9.99,
    "currency":"BWP",
    "category": "entertainment",
    "frequency": "monthly",
    "paymentMethod": "Credit Card",
    "status": "active",
    "startDate": "2025-08-01",
    "next_renewal": "2025-09-01"
  }]`}
              />

              <ApiEndpoint
                id="create-subscription"
                method="POST"
                path="/subscriptions"
                title="Create a new subscription"
                description="Add a new subscription to track."
                parameters={[
                  {
                    name: "name",
                    type: "string",
                    required: true,
                    description: "The subscription service name",
                  },
                  {
                    name: "category",
                    type: "string",
                    required: true,
                    description:
                      "The subscription category: 'sports', 'news', 'entertainment', 'lifestyle', 'technology', 'finance', or 'other'",
                  },
                  {
                    name: "price",
                    type: "number",
                    required: true,
                    description: "The subscription price",
                  },
                  {
                    name: "currency",
                    type: "string",
                    required: true,
                    description:
                      "The subscription currency: 'BWP', 'ZAR', 'USD', 'GBP', or 'EUR'",
                  },
                  {
                    name: "frequency",
                    type: "string",
                    required: true,
                    description:
                      "Billing cycle: 'Daily' ,'Weekly','Monthly', or 'Yearly'",
                  },
                  {
                    name: "paymentMethod",
                    type: "string",
                    required: true,
                    description: "Payment method for the subscription",
                  },
                  {
                    name: "status",
                    type: "string",
                    required: true,
                    description:
                      "The subscription status: 'active', 'cancelled', or 'expired'",
                  },
                  {
                    name: "startDate",
                    type: "string",
                    required: true,
                    description: "Start date (ISO 8601 format)",
                  },
                  {
                    name: "renewalDate",
                    type: "string",
                    required: true,
                    description: "Next renewal date (ISO 8601 format)",
                  },
                ]}
                requestExample={{
                  curl: `curl -X POST -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Disney+",
    "category": "Streaming",
    "price": 7.99,
    "billing_cycle": "monthly",
    "next_renewal": "2025-09-15"
  }' \\
  https://subscription-tracker-api-4oge.onrender.com/api/v1/subscriptions`,
                  javascript: `const response = await fetch('https://subscription-tracker-api-4oge.onrender.com/api/v1/subscriptions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "name": "Netflix",
    "price": 9.99,
    "currency":"BWP",
    "category": "entertainment",
    "frequency": "monthly",
    "paymentMethod": "Credit Card",
    "status": "active",
    "startDate": "2025-08-01",
    "next_renewal": "2025-09-01"
  })
});
const subscription = await response.json();`,
                  python: `import requests

headers = {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
}
data = {
    "name": "Netflix",
    "price": 9.99,
    "currency":"BWP",
    "category": "entertainment",
    "frequency": "monthly",
    "paymentMethod": "Credit Card",
    "status": "active",
    "startDate": "2025-08-01",
    "next_renewal": "2025-09-01"
}
response = requests.post('https://subscription-tracker-api-4oge.onrender.com/api/v1/subscriptions', headers=headers, json=data)
subscription = response.json()`,
                }}
                responseExample={`{
    "name": "Netflix",
    "price": 9.99,
    "currency":"BWP",
    "category": "entertainment",
    "frequency": "monthly",
    "paymentMethod": "Credit Card",
    "status": "active",
    "startDate": "2025-08-01",
    "next_renewal": "2025-09-01"
    "created_at": "2025-08-14T12:00:00Z",
    "updated_at": "2025-08-14T12:00:00Z"
}`}
              />

              <ApiEndpoint
                id="update-subscription"
                method="PUT"
                path="/subscriptions/{id}"
                title="Update a subscription"
                description="Update an existing subscription's details."
                parameters={[
                  {
                    name: "id",
                    type: "string",
                    required: true,
                    description: "The subscription ID",
                  },
                  {
                    name: "name",
                    type: "string",
                    required: false,
                    description: "The subscription service name",
                  },
                  {
                    name: "category",
                    type: "string",
                    required: false,
                    description:
                      "The subscription category: 'sports', 'news', 'entertainment', 'lifestyle', 'technology', 'finance', or 'other'",
                  },
                  {
                    name: "price",
                    type: "number",
                    required: false,
                    description: "The subscription price",
                  },
                  {
                    name: "currency",
                    type: "string",
                    required: false,
                    description:
                      "The subscription currency: 'BWP', 'ZAR', 'USD', 'GBP', or 'EUR'",
                  },
                  {
                    name: "frequency",
                    type: "string",
                    required: false,
                    description:
                      "Billing cycle: 'Daily' ,'Weekly','Monthly', or 'Yearly'",
                  },
                  {
                    name: "paymentMethod",
                    type: "string",
                    required: false,
                    description: "Payment method for the subscription",
                  },
                  {
                    name: "status",
                    type: "string",
                    required: false,
                    description:
                      "The subscription status: 'active', 'cancelled', or 'expired'",
                  },
                  {
                    name: "startDate",
                    type: "string",
                    required: false,
                    description: "Start date (ISO 8601 format)",
                  },
                  {
                    name: "renewalDate",
                    type: "string",
                    required: false,
                    description: "Next renewal date (ISO 8601 format)",
                  },
                ]}
                requestExample={{
                  curl: `curl -X PUT -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"price": 12.99}' \\
  https://subscription-tracker-api-4oge.onrender.com/api/v1/subscriptions/1`,
                  javascript: `const response = await fetch('https://subscription-tracker-api-4oge.onrender.com/api/v1/subscriptions/1', {
  method: 'PUT',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    price: 12.99
  })
});
const subscription = await response.json();`,
                  python: `import requests

headers = {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
}
data = {'price': 12.99}
response = requests.put('https://subscription-tracker-api-4oge.onrender.com/api/v1/subscriptions/1', headers=headers, json=data)
subscription = response.json()`,
                }}
                responseExample={`{
  "id": 1,
  "name": "Netflix",
  "category": "Streaming",
  "price": 12.99,
  "frequency": "monthly",
  "renewalDate": "2025-09-01",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2025-08-14T12:00:00Z"
}`}
              />

              <ApiEndpoint
                id="cancel-subscription"
                method="PUT"
                path="/subscriptions/{id}/cancel"
                title="Cancel a subscription"
                description="Cancel a subscription from tracking."
                parameters={[
                  {
                    name: "id",
                    type: "integer",
                    required: true,
                    description: "The subscription ID",
                  },
                ]}
                requestExample={{
                  curl: `curl -X DELETE -H "Authorization: Bearer YOUR_TOKEN" \\
  https://subscription-tracker-api-4oge.onrender.com/api/v1/subscriptions/1`,
                  javascript: `const response = await fetch('https://subscription-tracker-api-4oge.onrender.com/api/v1/subscriptions/1', {
  method: 'DELETE',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN'
  }
});`,
                  python: `import requests

headers = {'Authorization': 'Bearer YOUR_TOKEN'}
response = requests.delete('https://subscription-tracker-api-4oge.onrender.com/api/v1/subscriptions/1', headers=headers)`,
                }}
                responseExample={`{
  "message": "Subscription cancelled successfully"
}`}
              />
              <ApiEndpoint
                id="delete-subscription"
                method="DELETE"
                path="/subscriptions/{id}"
                title="Delete a subscription"
                description="Remove a subscription from tracking."
                parameters={[
                  {
                    name: "id",
                    type: "integer",
                    required: true,
                    description: "The subscription ID",
                  },
                ]}
                requestExample={{
                  curl: `curl -X DELETE -H "Authorization: Bearer YOUR_TOKEN" \\
  https://subscription-tracker-api-4oge.onrender.com/api/v1/subscriptions/1`,
                  javascript: `const response = await fetch('https://subscription-tracker-api-4oge.onrender.com/api/v1/subscriptions/1', {
  method: 'DELETE',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN'
  }
});`,
                  python: `import requests

headers = {'Authorization': 'Bearer YOUR_TOKEN'}
response = requests.delete('https://subscription-tracker-api-4oge.onrender.com/api/v1/subscriptions/1', headers=headers)`,
                }}
                responseExample={`{
  "message": "Subscription deleted successfully"
}`}
              />
            </section>

            {/* Users Section */}
            <section id="users" className="scroll-mt-20">
              <h2 className="text-3xl font-bold mb-6 border-b pb-2">users</h2>

              <ApiEndpoint
                id="get-user"
                method="GET"
                path="/users/{id}"
                title="Get user"
                description="Retrieve the profile information for the authenticated user."
                parameters={[
                  {
                    name: "id",
                    type: "integer",
                    required: true,
                    description: "The user ID",
                  },
                ]}
                requestExample={{
                  curl: `curl -H "Authorization: Bearer YOUR_TOKEN" \\
  https://subscription-tracker-api-4oge.onrender.com/api/v1/users/1`,
                  javascript: `const response = await fetch('https://subscription-tracker-api-4oge.onrender.com/api/v1/users/1', {
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN'
  }
});
const subscription = await response.json();`,
                  python: `import requests

headers = {'Authorization': 'Bearer YOUR_TOKEN'}
response = requests.get('https://subscription-tracker-api-4oge.onrender.com/api/v1/users/1', headers=headers)
subscription = response.json()`,
                }}
                responseExample={`[{
    "id": '6asvxn2350hcvcet6',
    "name": "John Doe",
    "email": "doejohn@gmail.com"

  }]`}
              />

              <ApiEndpoint
                id="create-user"
                method="POST"
                path="/auth/sign-ip"
                title="Create a new user"
                description="Add a new user to track their subscriptions."
                parameters={[
                  {
                    name: "name",
                    type: "string",
                    required: true,
                    description: "The user's name",
                  },
                  {
                    name: "email",
                    type: "string",
                    required: true,
                    description: "The user's email address.",
                  },
                  {
                    name: "password",
                    type: "string",
                    required: true,
                    description: "The user's password.",
                  },
                ]}
                requestExample={{
                  curl: `curl -X POST -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "John Doe",
    "email": "doejohn@gmail.com",
    "password": "password123",
  }' \\
  https://subscription-tracker-api-4oge.onrender.com/api/v1/users`,
                  javascript: `const response = await fetch('https://subscription-tracker-api-4oge.onrender.com/api/v1/users', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "name": "John Doe",
    "email": "doejohn@gmail.com",
    "password": "password123",
  })
});
const user = await response.json();`,
                  python: `import requests

headers = {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
}
data = {
    "name": "John Doe",
    "email": "doejohn@gmail.com",
    "password": "password123",
}
response = requests.post('https://subscription-tracker-api-4oge.onrender.com/api/v1/users', headers=headers, json=data)
subscription = response.json()`,
                }}
                responseExample={`{
    "name": "John Doe",
    "email": "doejohn@gmail.com",
    "password": "password123",
    "created_at": "2025-08-14T12:00:00Z",
    "updated_at": "2025-08-14T12:00:00Z"
}`}
              />
              <ApiEndpoint
                id="sign-in-user"
                method="POST"
                path="/users"
                title="Sign in the user"
                description="Log in user to track their subscriptions."
                parameters={[
                  {
                    name: "email",
                    type: "string",
                    required: true,
                    description: "The user's email address.",
                  },
                  {
                    name: "password",
                    type: "string",
                    required: true,
                    description: "The user's password.",
                  },
                ]}
                requestExample={{
                  curl: `curl -X POST -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "doejohn@gmail.com",
    "password": "password123",
  }' \\
  https://subscription-tracker-api-4oge.onrender.com/api/v1/users`,
                  javascript: `const response = await fetch('https://subscription-tracker-api-4oge.onrender.com/api/v1/users', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "email": "doejohn@gmail.com",
    "password": "password123",
  })
});
const user = await response.json();`,
                  python: `import requests

headers = {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
}
data = {
    "email": "doejohn@gmail.com",
    "password": "password123",
}
response = requests.post('https://subscription-tracker-api-4oge.onrender.com/api/v1/users', headers=headers, json=data)
subscription = response.json()`,
                }}
                responseExample={`{
"success":"true",
"message":"User signed in successfully",
data:{
    "token":"Your_bearer_token_here",
    "user":{
    "name": "John Doe",
    "email": "doejohn@gmail.com",
    "created_at": "2025-08-14T12:00:00Z",
    "updated_at": "2025-08-14T12:00:00Z"
    }
  },
}`}
              />

              <ApiEndpoint
                id="update-user"
                method="PUT"
                path="/users/{id}"
                title="Update a user"
                description="Update an existing user's details."
                parameters={[
                  {
                    name: "id",
                    type: "string",
                    required: true,
                    description: "The user ID",
                  },
                  {
                    name: "name",
                    type: "string",
                    required: false,
                    description: "The user's name",
                  },
                  {
                    name: "email",
                    type: "string",
                    required: false,
                    description: "The user's email address",
                  },
                ]}
                requestExample={{
                  curl: `curl -X PUT -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"price": 12.99}' \\
  https://subscription-tracker-api-4oge.onrender.com/api/v1/users/6asvxn2350hcvcet6`,
                  javascript: `const response = await fetch('https://subscription-tracker-api-4oge.onrender.com/api/v1/users/6asvxn2350hcvcet6', {
  method: 'PUT',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Susan Doe'
  })
});
const subscription = await response.json();`,
                  python: `import requests

headers = {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
}
data = {'name': 'Susan Doe'}
response = requests.put('https://subscription-tracker-api-4oge.onrender.com/api/v1/users/6asvxn2350hcvcet6', headers=headers, json=data)
subscription = response.json()`,
                }}
                responseExample={`{
  "id": 1,
  'name': 'Susan Doe'
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2025-08-14T12:00:00Z"
}`}
              />

              <ApiEndpoint
                id="delete-user"
                method="DELETE"
                path="/users/{id}"
                title="Delete a user"
                description="Remove a user from the system."
                parameters={[
                  {
                    name: "id",
                    type: "integer",
                    required: true,
                    description: "The user ID",
                  },
                ]}
                requestExample={{
                  curl: `curl -X DELETE -H "Authorization: Bearer YOUR_TOKEN" \\
  https://subscription-tracker-api-4oge.onrender.com/api/v1/users/6asvxn2350hcvcet6`,
                  javascript: `const response = await fetch('https://subscription-tracker-api-4oge.onrender.com/api/v1/users/6asvxn2350hcvcet6', {
  method: 'DELETE',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN'
  }
});`,
                  python: `import requests

headers = {'Authorization': 'Bearer YOUR_TOKEN'}
response = requests.delete('https://subscription-tracker-api-4oge.onrender.com/api/v1/users/6asvxn2350hcvcet6', headers=headers)`,
                }}
                responseExample={`{
  "message": "Subscription deleted successfully"
}`}
              />
            </section>

            {/* Stats Section */}
            {/* <section id="stats" className="scroll-mt-20">
              <h2 className="text-3xl font-bold mb-6 border-b pb-2">Stats</h2>

              <ApiEndpoint
                id="get-stats-summary"
                method="GET"
                path="/stats/summary"
                title="Get subscription statistics"
                description="Retrieve summary statistics including total monthly spend, yearly spend, and category breakdown."
                parameters={[]}
                requestExample={{
                  curl: `curl -H "Authorization: Bearer YOUR_TOKEN" \\
  https://subscription-tracker-api-4oge.onrender.com/api/v1/stats/summary`,
                  javascript: `const response = await fetch('https://subscription-tracker-api-4oge.onrender.com/api/v1/stats/summary', {
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN'
  }
});
const stats = await response.json();`,
                  python: `import requests

headers = {'Authorization': 'Bearer YOUR_TOKEN'}
response = requests.get('https://subscription-tracker-api-4oge.onrender.com/api/v1/stats/summary', headers=headers)
stats = response.json()`,
                }}
                responseExample={`{
  "total_monthly_spend": 24.97,
  "total_yearly_spend": 299.64,
  "active_subscriptions": 3,
  "category_breakdown": {
    "Streaming": {
      "count": 2,
      "monthly_spend": 17.98,
      "yearly_spend": 215.76
    },
    "Music": {
      "count": 1,
      "monthly_spend": 4.99,
      "yearly_spend": 59.88
    }
  },
  "upcoming_renewals": [
    {
      "id": 2,
      "name": "Spotify",
      "next_renewal": "2025-08-15",
      "price": 4.99
    }
  ]
}`}
              />
            </section> */}
          </div>
        </main>
      </div>
    </div>
  );
}
