"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Copy, Play, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useToast } from "@/components/ui/use-toast"

export default function ApiDocsPage() {
  const router = useRouter()
  const { toast } = useToast()

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "The code snippet has been copied to your clipboard.",
    })
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-purple-900/30">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/dashboard")}
            className="mr-4 text-gray-400 hover:text-purple-400"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Button>

          <div>
            <h1 className="text-xl font-bold text-white">API Documentation</h1>
            <p className="text-sm text-gray-400">Integrate with Data Horizon</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Introduction */}
          <section className="mb-12">
            <Card className="bg-gray-900/60 border-purple-900/50">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Getting Started</CardTitle>
                <CardDescription>Learn how to integrate your IoT devices with Data Horizon</CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  The Data Horizon API allows you to send data from your IoT devices to our platform, retrieve
                  historical data, and manage your devices programmatically.
                </p>
                <p className="mb-4">
                  All API requests require authentication using your API key. You can find your API key in your account
                  settings.
                </p>
                <div className="bg-black/50 p-4 rounded-md border border-gray-800 flex items-center justify-between">
                  <code className="text-purple-400">https://api.datahorizon.io/v1</code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-purple-400"
                    onClick={() => copyToClipboard("https://api.datahorizon.io/v1")}
                  >
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* API Reference */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">API Reference</h2>

            <Tabs defaultValue="channels">
              <TabsList className="bg-gray-900/50 border border-gray-800 mb-6">
                <TabsTrigger value="channels">Channels</TabsTrigger>
                <TabsTrigger value="devices">Devices</TabsTrigger>
                <TabsTrigger value="data">Data</TabsTrigger>
              </TabsList>

              <TabsContent value="channels">
                <ApiEndpoint
                  method="GET"
                  endpoint="/channels"
                  description="List all channels"
                  codeSnippet={`curl -X GET "https://api.datahorizon.io/v1/channels" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
                  response={`{
  "channels": [
    {
      "id": "ch_123456",
      "name": "Home Sensors",
      "description": "Temperature and humidity sensors at home",
      "created_at": "2023-04-15T10:30:00Z",
      "device_count": 3
    },
    {
      "id": "ch_789012",
      "name": "Office Environment",
      "description": "Office environmental monitoring",
      "created_at": "2023-05-20T14:15:00Z",
      "device_count": 5
    }
  ]
}`}
                />

                <ApiEndpoint
                  method="POST"
                  endpoint="/channels"
                  description="Create a new channel"
                  codeSnippet={`curl -X POST "https://api.datahorizon.io/v1/channels" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "New Channel",
    "description": "My new IoT channel"
  }'`}
                  response={`{
  "id": "ch_345678",
  "name": "New Channel",
  "description": "My new IoT channel",
  "created_at": "2023-06-10T09:45:00Z",
  "device_count": 0
}`}
                />
              </TabsContent>

              <TabsContent value="devices">
                <ApiEndpoint
                  method="GET"
                  endpoint="/devices"
                  description="List all devices"
                  codeSnippet={`curl -X GET "https://api.datahorizon.io/v1/devices" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
                  response={`{
  "devices": [
    {
      "id": "dev_123456",
      "name": "Living Room Sensor",
      "type": "temperature",
      "channel_id": "ch_123456",
      "status": "online",
      "last_seen": "2023-06-15T10:30:00Z"
    },
    {
      "id": "dev_789012",
      "name": "Kitchen Humidity",
      "type": "humidity",
      "channel_id": "ch_123456",
      "status": "offline",
      "last_seen": "2023-06-14T22:15:00Z"
    }
  ]
}`}
                />

                <ApiEndpoint
                  method="POST"
                  endpoint="/devices"
                  description="Register a new device"
                  codeSnippet={`curl -X POST "https://api.datahorizon.io/v1/devices" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Bedroom Sensor",
    "type": "multi",
    "channel_id": "ch_123456"
  }'`}
                  response={`{
  "id": "dev_345678",
  "name": "Bedroom Sensor",
  "type": "multi",
  "channel_id": "ch_123456",
  "status": "offline",
  "last_seen": null,
  "api_key": "dev_key_abcdef123456"
}`}
                />
              </TabsContent>

              <TabsContent value="data">
                <ApiEndpoint
                  method="POST"
                  endpoint="/data"
                  description="Send data from a device"
                  codeSnippet={`curl -X POST "https://api.datahorizon.io/v1/data" \\
  -H "Authorization: Bearer DEV_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "temperature": 23.5,
    "humidity": 65,
    "timestamp": "2023-06-15T14:30:00Z"
  }'`}
                  response={`{
  "success": true,
  "message": "Data received",
  "data_point_id": "dp_123456"
}`}
                />

                <ApiEndpoint
                  method="GET"
                  endpoint="/data/{device_id}"
                  description="Get historical data for a device"
                  codeSnippet={`curl -X GET "https://api.datahorizon.io/v1/data/dev_123456?start=2023-06-10T00:00:00Z&end=2023-06-15T23:59:59Z" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
                  response={`{
  "device_id": "dev_123456",
  "data": [
    {
      "id": "dp_123456",
      "timestamp": "2023-06-15T10:30:00Z",
      "temperature": 23.5,
      "humidity": 65
    },
    {
      "id": "dp_123457",
      "timestamp": "2023-06-15T11:00:00Z",
      "temperature": 24.0,
      "humidity": 63
    }
  ]
}`}
                />
              </TabsContent>
            </Tabs>
          </section>

          {/* Code Examples */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Code Examples</h2>

            <Tabs defaultValue="javascript">
              <TabsList className="bg-gray-900/50 border border-gray-800 mb-6">
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
                <TabsTrigger value="arduino">Arduino</TabsTrigger>
              </TabsList>

              <TabsContent value="javascript">
                <CodeExample
                  title="Sending data with JavaScript"
                  description="Example of sending sensor data using JavaScript"
                  code={`// Using fetch API to send data
const API_KEY = 'YOUR_DEVICE_API_KEY';
const API_URL = 'https://api.datahorizon.io/v1/data';

async function sendSensorData(temperature, humidity) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${API_KEY}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        temperature,
        humidity,
        timestamp: new Date().toISOString()
      })
    });
    
    const data = await response.json();
    console.log('Data sent successfully:', data);
    return data;
  } catch (error) {
    console.error('Error sending data:', error);
    throw error;
  }
}

// Example usage
sendSensorData(23.5, 65);`}
                />
              </TabsContent>

              <TabsContent value="python">
                <CodeExample
                  title="Sending data with Python"
                  description="Example of sending sensor data using Python"
                  code={`import requests
import json
from datetime import datetime

API_KEY = 'YOUR_DEVICE_API_KEY'
API_URL = 'https://api.datahorizon.io/v1/data'

def send_sensor_data(temperature, humidity):
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }
    
    payload = {
        'temperature': temperature,
        'humidity': humidity,
        'timestamp': datetime.now().isoformat()
    }
    
    try:
        response = requests.post(API_URL, headers=headers, data=json.dumps(payload))
        response.raise_for_status()
        print('Data sent successfully:', response.json())
        return response.json()
    except requests.exceptions.RequestException as e:
        print('Error sending data:', e)
        raise

# Example usage
send_sensor_data(23.5, 65)`}
                />
              </TabsContent>

              <TabsContent value="arduino">
                <CodeExample
                  title="Sending data with Arduino"
                  description="Example of sending sensor data using Arduino with ESP8266/ESP32"
                  code={`#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
#include <DHT.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
const char* apiKey = "YOUR_DEVICE_API_KEY";
const char* apiUrl = "https://api.datahorizon.io/v1/data";

#define DHTPIN 2
#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  dht.begin();
  
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  
  Serial.println("Connected to WiFi");
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    float temperature = dht.readTemperature();
    float humidity = dht.readHumidity();
    
    if (isnan(temperature) || isnan(humidity)) {
      Serial.println("Failed to read from DHT sensor!");
    } else {
      sendSensorData(temperature, humidity);
    }
  }
  
  delay(60000); // Send data every minute
}

void sendSensorData(float temperature, float humidity) {
  HTTPClient http;
  WiFiClientSecure client;
  client.setInsecure(); // Skip certificate verification
  
  http.begin(client, apiUrl);
  http.addHeader("Authorization", String("Bearer ") + apiKey);
  http.addHeader("Content-Type", "application/json");
  
  StaticJsonDocument<200> doc;
  doc["temperature"] = temperature;
  doc["humidity"] = humidity;
  
  String payload;
  serializeJson(doc, payload);
  
  int httpResponseCode = http.POST(payload);
  
  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.println("HTTP Response code: " + String(httpResponseCode));
    Serial.println("Response: " + response);
  } else {
    Serial.println("Error on sending POST: " + String(httpResponseCode));
  }
  
  http.end();
}`}
                />
              </TabsContent>
            </Tabs>
          </section>

          {/* API Playground */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">API Playground</h2>

            <Card className="bg-gray-900/60 border-purple-900/50">
              <CardHeader>
                <CardTitle className="text-white">Test API Requests</CardTitle>
                <CardDescription>Try out API requests directly in your browser</CardDescription>
              </CardHeader>
              <CardContent>
                <ApiPlayground />
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  )
}

interface ApiEndpointProps {
  method: "GET" | "POST" | "PUT" | "DELETE"
  endpoint: string
  description: string
  codeSnippet: string
  response: string
}

function ApiEndpoint({ method, endpoint, description, codeSnippet, response }: ApiEndpointProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "The code snippet has been copied to your clipboard.",
    })
  }

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="mb-6 bg-black/50 rounded-lg border border-gray-800 overflow-hidden"
    >
      <CollapsibleTrigger asChild>
        <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-900/30">
          <div className="flex items-center gap-4">
            <span
              className={`px-2 py-1 rounded text-xs font-bold ${
                method === "GET"
                  ? "bg-blue-900/50 text-blue-400"
                  : method === "POST"
                    ? "bg-green-900/50 text-green-400"
                    : method === "PUT"
                      ? "bg-yellow-900/50 text-yellow-400"
                      : "bg-red-900/50 text-red-400"
              }`}
            >
              {method}
            </span>
            <span className="font-mono text-purple-400">{endpoint}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-400">{description}</span>
            <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="p-4 border-t border-gray-800">
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-400 mb-2">Request</h4>
            <div className="relative bg-black rounded-md p-4 font-mono text-sm text-gray-300">
              <TypewriterText text={codeSnippet} />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-gray-500 hover:text-purple-400"
                onClick={() => copyToClipboard(codeSnippet)}
              >
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy</span>
              </Button>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-2">Response</h4>
            <div className="relative bg-black rounded-md p-4 font-mono text-sm text-gray-300">
              <TypewriterText text={response} />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-gray-500 hover:text-purple-400"
                onClick={() => copyToClipboard(response)}
              >
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy</span>
              </Button>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

interface CodeExampleProps {
  title: string
  description: string
  code: string
}

function CodeExample({ title, description, code }: CodeExampleProps) {
  const { toast } = useToast()

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "The code snippet has been copied to your clipboard.",
    })
  }

  return (
    <div className="mb-6 bg-black/50 rounded-lg border border-gray-800 overflow-hidden">
      <div className="p-4 border-b border-gray-800">
        <h3 className="text-lg font-medium text-white">{title}</h3>
        <p className="text-gray-400 text-sm mt-1">{description}</p>
      </div>

      <div className="relative p-4 font-mono text-sm text-gray-300">
        <TypewriterText text={code} />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-gray-500 hover:text-purple-400"
          onClick={() => copyToClipboard(code)}
        >
          <Copy className="h-4 w-4" />
          <span className="sr-only">Copy</span>
        </Button>
      </div>
    </div>
  )
}

function TypewriterText({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let currentIndex = 0
    setDisplayedText("")
    setIsComplete(false)

    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText((prev) => prev + text[currentIndex])
        currentIndex++
      } else {
        clearInterval(interval)
        setIsComplete(true)
      }
    }, 5)

    return () => clearInterval(interval)
  }, [text])

  return (
    <pre className="whitespace-pre-wrap break-all">
      {displayedText}
      {!isComplete && <span className="inline-block w-2 h-4 bg-purple-500 animate-pulse" />}
    </pre>
  )
}

function ApiPlayground() {
  const [method, setMethod] = useState<"GET" | "POST">("GET")
  const [endpoint, setEndpoint] = useState("/channels")
  const [requestBody, setRequestBody] = useState("")
  const [apiKey, setApiKey] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState("")

  const handleSubmit = () => {
    setIsLoading(true)
    setResponse("")

    // Simulate API request
    setTimeout(() => {
      if (method === "GET" && endpoint === "/channels") {
        setResponse(
          JSON.stringify(
            {
              channels: [
                {
                  id: "ch_123456",
                  name: "Home Sensors",
                  description: "Temperature and humidity sensors at home",
                  created_at: "2023-04-15T10:30:00Z",
                  device_count: 3,
                },
                {
                  id: "ch_789012",
                  name: "Office Environment",
                  description: "Office environmental monitoring",
                  created_at: "2023-05-20T14:15:00Z",
                  device_count: 5,
                },
              ],
            },
            null,
            2,
          ),
        )
      } else if (method === "POST" && endpoint === "/channels") {
        try {
          const body = JSON.parse(requestBody)
          setResponse(
            JSON.stringify(
              {
                id: "ch_" + Math.floor(Math.random() * 1000000),
                name: body.name || "New Channel",
                description: body.description || "",
                created_at: new Date().toISOString(),
                device_count: 0,
              },
              null,
              2,
            ),
          )
        } catch (e) {
          setResponse(
            JSON.stringify(
              {
                error: "Invalid JSON in request body",
              },
              null,
              2,
            ),
          )
        }
      } else {
        setResponse(
          JSON.stringify(
            {
              error: "Endpoint not implemented in playground",
            },
            null,
            2,
          ),
        )
      }

      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Method</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value as "GET" | "POST")}
            className="w-full bg-black border border-gray-800 rounded-md p-2 text-white"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
          </select>
        </div>

        <div className="md:col-span-3">
          <label className="block text-sm font-medium text-gray-400 mb-1">Endpoint</label>
          <div className="flex items-center">
            <span className="bg-black border border-r-0 border-gray-800 rounded-l-md p-2 text-gray-400">
              https://api.datahorizon.io/v1
            </span>
            <input
              type="text"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              className="flex-1 bg-black border border-gray-800 rounded-r-md p-2 text-white"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">API Key</label>
        <input
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your API key"
          className="w-full bg-black border border-gray-800 rounded-md p-2 text-white"
        />
      </div>

      {method === "POST" && (
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Request Body (JSON)</label>
          <textarea
            value={requestBody}
            onChange={(e) => setRequestBody(e.target.value)}
            placeholder='{"name": "New Channel", "description": "My new IoT channel"}'
            rows={5}
            className="w-full bg-black border border-gray-800 rounded-md p-2 text-white font-mono"
          />
        </div>
      )}

      <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? (
          <>
            <div className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Sending Request...
          </>
        ) : (
          <>
            <Play className="mr-2 h-4 w-4" />
            Send Request
          </>
        )}
      </Button>

      {response && (
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Response</label>
          <div className="relative bg-black border border-gray-800 rounded-md p-4 font-mono text-sm text-gray-300">
            <pre className="whitespace-pre-wrap">{response}</pre>
          </div>
        </div>
      )}
    </div>
  )
}

