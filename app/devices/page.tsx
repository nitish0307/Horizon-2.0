"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus,
  Search,
  Filter,
  ArrowLeft,
  Power,
  Wifi,
  Thermometer,
  Droplets,
  Wind,
  Lock,
  Lightbulb,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

// Mock device data
const mockDevices = [
  {
    id: "dev-001",
    name: "Living Room Sensor",
    type: "temperature",
    status: "online",
    lastUpdate: "2 min ago",
    battery: 87,
    icon: Thermometer,
    data: { temperature: 23.5, humidity: 65 },
  },
  {
    id: "dev-002",
    name: "Kitchen Thermostat",
    type: "thermostat",
    status: "online",
    lastUpdate: "5 min ago",
    battery: 92,
    icon: Thermometer,
    data: { temperature: 22.0, humidity: 58 },
  },
  {
    id: "dev-003",
    name: "Garage Door Sensor",
    type: "security",
    status: "offline",
    lastUpdate: "3 hours ago",
    battery: 15,
    icon: Lock,
    data: { status: "closed" },
  },
  {
    id: "dev-004",
    name: "Bedroom Air Quality",
    type: "air",
    status: "online",
    lastUpdate: "1 min ago",
    battery: 76,
    icon: Wind,
    data: { quality: "good", pm25: 12 },
  },
  {
    id: "dev-005",
    name: "Bathroom Humidity",
    type: "humidity",
    status: "online",
    lastUpdate: "10 min ago",
    battery: 64,
    icon: Droplets,
    data: { humidity: 72 },
  },
  {
    id: "dev-006",
    name: "Office Smart Light",
    type: "light",
    status: "online",
    lastUpdate: "3 min ago",
    battery: 100,
    icon: Lightbulb,
    data: { brightness: 80, color: "warm" },
  },
  {
    id: "dev-007",
    name: "Hallway Motion Sensor",
    type: "motion",
    status: "online",
    lastUpdate: "7 min ago",
    battery: 53,
    icon: Wifi,
    data: { motion: false, lastDetected: "2 hours ago" },
  },
  {
    id: "dev-008",
    name: "Basement Flood Sensor",
    type: "water",
    status: "offline",
    lastUpdate: "1 day ago",
    battery: 8,
    icon: Droplets,
    data: { water: false },
  },
]

// Backend integration needed:
// - Fetch actual device data from the database
// - Implement real-time device status updates
// - Handle device management operations (add, edit, remove)
// - Implement device control functionality
export default function DevicesPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [devices, setDevices] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setDevices(mockDevices)
      setIsLoading(false)
    }, 1500)
  }, [])

  const filteredDevices = devices.filter((device) => device.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleAddDevice = () => {
    toast({
      title: "Add Device",
      description: "Opening device setup wizard...",
    })
  }

  const handleToggleDevice = (deviceId: string) => {
    setDevices(
      devices.map((device) => {
        if (device.id === deviceId) {
          const newStatus = device.status === "online" ? "offline" : "online"

          toast({
            title: `Device ${newStatus === "online" ? "enabled" : "disabled"}`,
            description: `${device.name} is now ${newStatus}.`,
          })

          return {
            ...device,
            status: newStatus,
          }
        }
        return device
      }),
    )
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
            <h1 className="text-xl font-bold text-white">Device Management</h1>
            <p className="text-sm text-gray-400">Manage your IoT devices</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div className="w-full md:w-auto flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search devices..."
                className="pl-10 bg-gray-900/50 border-gray-800 focus:border-purple-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <Button variant="outline" className="border-gray-800 text-gray-400">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>

            <Button className="bg-purple-600 hover:bg-purple-700 text-white ml-auto md:ml-0" onClick={handleAddDevice}>
              <Plus className="mr-2 h-4 w-4" />
              Add Device
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="bg-gray-900/50 border border-gray-800">
            <TabsTrigger value="all">All Devices</TabsTrigger>
            <TabsTrigger value="online">Online</TabsTrigger>
            <TabsTrigger value="offline">Offline</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <DeviceGrid devices={filteredDevices} isLoading={isLoading} onToggle={handleToggleDevice} />
          </TabsContent>

          <TabsContent value="online" className="mt-6">
            <DeviceGrid
              devices={filteredDevices.filter((d) => d.status === "online")}
              isLoading={isLoading}
              onToggle={handleToggleDevice}
            />
          </TabsContent>

          <TabsContent value="offline" className="mt-6">
            <DeviceGrid
              devices={filteredDevices.filter((d) => d.status === "offline")}
              isLoading={isLoading}
              onToggle={handleToggleDevice}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

interface DeviceGridProps {
  devices: any[]
  isLoading: boolean
  onToggle: (deviceId: string) => void
}

function DeviceGrid({ devices, isLoading, onToggle }: DeviceGridProps) {
  const router = useRouter()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-gray-900/60 border border-purple-900/50 rounded-xl h-[220px] animate-pulse" />
        ))}
      </div>
    )
  }

  if (devices.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-white mb-2">No devices found</h3>
        <p className="text-gray-400">Try adjusting your search or filters</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <AnimatePresence>
        {devices.map((device, index) => (
          <motion.div
            key={device.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="bg-gray-900/60 border-purple-900/50 overflow-hidden h-full">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full ${
                        device.status === "online" ? "bg-green-900/20" : "bg-red-900/20"
                      }`}
                    >
                      <device.icon
                        className={`h-5 w-5 ${device.status === "online" ? "text-green-400" : "text-red-400"}`}
                      />

                      {device.status === "online" && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{
                            opacity: [0.5, 1, 0.5],
                            scale: [0.8, 1.2, 0.8],
                          }}
                          transition={{
                            repeat: Number.POSITIVE_INFINITY,
                            duration: 2,
                          }}
                          className="absolute inset-0 rounded-full bg-green-500/20"
                        />
                      )}
                    </div>

                    <div>
                      <CardTitle className="text-white text-lg">{device.name}</CardTitle>
                      <CardDescription>{device.type}</CardDescription>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 ${device.status === "online" ? "text-green-400" : "text-red-400"}`}
                    onClick={() => onToggle(device.id)}
                  >
                    <Power className="h-4 w-4" />
                    <span className="sr-only">Toggle power</span>
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Status</span>
                    <div className="flex items-center gap-1">
                      <span
                        className={`inline-block w-2 h-2 rounded-full ${
                          device.status === "online" ? "bg-green-400" : "bg-red-400"
                        }`}
                      />
                      <span className="text-sm font-medium text-white capitalize">{device.status}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Last Update</span>
                    <span className="text-sm font-medium text-white">{device.lastUpdate}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Battery</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            device.battery > 60 ? "bg-green-500" : device.battery > 20 ? "bg-yellow-500" : "bg-red-500"
                          }`}
                          style={{ width: `${device.battery}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-white">{device.battery}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  variant="ghost"
                  className="w-full text-purple-400 hover:text-purple-300 hover:bg-purple-900/30"
                  onClick={() => router.push(`/devices/${device.id}`)}
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

