"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Bell, User, LogOut, Settings, ChevronDown, AlertTriangle, Zap, BarChart3, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { DashboardChart } from "@/components/dashboard-chart"
import { DeviceStatusCard } from "@/components/device-status-card"

// Backend integration needed:
// - Fetch real-time data for charts and device status
// - Implement WebSocket connection for live updates
// - Retrieve AI-generated insights from the backend
// - Implement server-side authentication check
export default function DashboardPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleCreateChannel = () => {
    toast({
      title: "Channel created",
      description: "Your new channel has been created successfully.",
    })

    // Navigate to the new channel
    router.push("/channels/new-channel")
  }

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    })
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-purple-900/30">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
              Data Horizon
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-purple-400">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 text-gray-400 hover:text-purple-400">
                  <User className="h-5 w-5" />
                  <span>John Doe</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400 mt-1">Monitor and manage your IoT devices</p>
          </div>

          <Button className="mt-4 md:mt-0 bg-purple-600 hover:bg-purple-700 text-white" onClick={handleCreateChannel}>
            <Plus className="mr-2 h-4 w-4" />
            Create Channel
          </Button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {!isLoading ? (
              <>
                {/* Overview Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="bg-gray-900/60 border-purple-900/50 overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white">Channel Overview</CardTitle>
                      <CardDescription>Your active IoT channels</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Active Channels</span>
                          <span className="text-2xl font-bold text-white">4</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Total Devices</span>
                          <span className="text-2xl font-bold text-white">12</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Data Points (24h)</span>
                          <span className="text-2xl font-bold text-white">8.2k</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="ghost"
                        className="w-full text-purple-400 hover:text-purple-300 hover:bg-purple-900/30"
                        onClick={() => router.push("/channels")}
                      >
                        View All Channels
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>

                {/* Temperature Chart Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card className="bg-gray-900/60 border-purple-900/50 overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white">Temperature</CardTitle>
                      <CardDescription>Last 24 hours</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <DashboardChart type="line" dataKey="temperature" color="#9333ea" />
                    </CardContent>
                    <CardFooter>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2 text-green-400">
                          <Activity className="h-4 w-4" />
                          <span>Normal range</span>
                        </div>
                        <span className="text-white font-medium">Avg: 24.3°C</span>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>

                {/* Humidity Chart Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card className="bg-gray-900/60 border-purple-900/50 overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white">Humidity</CardTitle>
                      <CardDescription>Last 24 hours</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <DashboardChart type="area" dataKey="humidity" color="#818cf8" />
                    </CardContent>
                    <CardFooter>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2 text-yellow-400">
                          <AlertTriangle className="h-4 w-4" />
                          <span>Above threshold</span>
                        </div>
                        <span className="text-white font-medium">Avg: 68%</span>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>

                {/* Energy Consumption Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Card className="bg-gray-900/60 border-purple-900/50 overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white">Energy Consumption</CardTitle>
                      <CardDescription>Last 7 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <DashboardChart type="bar" dataKey="energy" color="#9333ea" />
                    </CardContent>
                    <CardFooter>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2 text-purple-400">
                          <Zap className="h-4 w-4" />
                          <span>15% less than last week</span>
                        </div>
                        <span className="text-white font-medium">Total: 142 kWh</span>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>

                {/* AI Insights Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Card className="bg-gray-900/60 border-purple-900/50 overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white">AI Insights</CardTitle>
                      <CardDescription>Anomaly detection</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-3 bg-purple-900/30 border border-purple-900/50 rounded-lg">
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-white">Temperature Anomaly</h4>
                              <p className="text-sm text-gray-400">
                                Temperature readings are fluctuating 20% more than usual in Living Room sensor.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 bg-purple-900/30 border border-purple-900/50 rounded-lg">
                          <div className="flex items-start gap-3">
                            <BarChart3 className="h-5 w-5 text-green-400 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-white">Energy Optimization</h4>
                              <p className="text-sm text-gray-400">
                                Based on usage patterns, you could save 12% energy by adjusting your thermostat
                                schedule.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="ghost"
                        className="w-full text-purple-400 hover:text-purple-300 hover:bg-purple-900/30"
                        onClick={() => router.push("/insights")}
                      >
                        View All Insights
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>

                {/* Device Status Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Card className="bg-gray-900/60 border-purple-900/50 overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white">Device Status</CardTitle>
                      <CardDescription>Your connected devices</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <DeviceStatusCard name="Living Room Sensor" status="online" lastUpdate="2 min ago" />
                        <DeviceStatusCard name="Kitchen Thermostat" status="online" lastUpdate="5 min ago" />
                        <DeviceStatusCard name="Garage Door Sensor" status="offline" lastUpdate="3 hours ago" />
                        <DeviceStatusCard name="Bedroom Air Quality" status="online" lastUpdate="1 min ago" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="ghost"
                        className="w-full text-purple-400 hover:text-purple-300 hover:bg-purple-900/30"
                        onClick={() => router.push("/devices")}
                      >
                        Manage Devices
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </>
            ) : (
              // Loading skeletons
              Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-900/60 border border-purple-900/50 rounded-xl h-[300px] animate-pulse"
                />
              ))
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}

