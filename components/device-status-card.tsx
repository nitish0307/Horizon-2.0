"use client"

import { motion } from "framer-motion"
import { Power, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"

interface DeviceStatusCardProps {
  name: string
  status: "online" | "offline"
  lastUpdate: string
}

export function DeviceStatusCard({ name, status, lastUpdate }: DeviceStatusCardProps) {
  const { toast } = useToast()

  const handleRestart = () => {
    toast({
      title: "Device restarting",
      description: `${name} is restarting. This may take a few moments.`,
    })
  }

  const handleConfigure = () => {
    toast({
      title: "Configure device",
      description: `Opening configuration for ${name}.`,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-3 bg-gray-900/50 rounded-lg border border-gray-800 flex items-center justify-between"
    >
      <div className="flex items-center gap-3">
        <div
          className={`relative flex items-center justify-center w-10 h-10 rounded-full ${
            status === "online" ? "bg-green-900/20" : "bg-red-900/20"
          }`}
        >
          <Power className={`h-5 w-5 ${status === "online" ? "text-green-400" : "text-red-400"}`} />

          {status === "online" && (
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
          <h4 className="font-medium text-white">{name}</h4>
          <div className="flex items-center gap-2">
            <span
              className={`inline-block w-2 h-2 rounded-full ${status === "online" ? "bg-green-400" : "bg-red-400"}`}
            />
            <span className="text-xs text-gray-400">
              {status === "online" ? "Online" : "Offline"} • {lastUpdate}
            </span>
          </div>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">More options</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleRestart}>Restart Device</DropdownMenuItem>
          <DropdownMenuItem onClick={handleConfigure}>Configure</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  )
}

