"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

// Generate random data for demo purposes
const generateData = (dataKey: string, count = 24) => {
  const now = new Date()
  const data = []

  for (let i = count - 1; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 3600000)
    const hours = time.getHours()
    const formattedHours = hours < 10 ? `0${hours}` : hours

    let value
    if (dataKey === "temperature") {
      // Temperature between 18-30°C with some fluctuation
      value = 22 + Math.sin(i / 3) * 4 + (Math.random() * 2 - 1)
    } else if (dataKey === "humidity") {
      // Humidity between 40-80% with some fluctuation
      value = 60 + Math.sin(i / 4) * 10 + (Math.random() * 5 - 2.5)
    } else if (dataKey === "energy") {
      // Energy consumption between 10-25 kWh
      value = 15 + Math.sin(i / 3) * 5 + Math.random() * 3
    } else {
      value = Math.random() * 100
    }

    data.push({
      time: `${formattedHours}:00`,
      [dataKey]: Number.parseFloat(value.toFixed(1)),
    })
  }

  return data
}

interface DashboardChartProps {
  type: "line" | "area" | "bar"
  dataKey: string
  color: string
}

export function DashboardChart({ type, dataKey, color }: DashboardChartProps) {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setData(generateData(dataKey))
      setIsLoading(false)
    }, 1000)

    // Update data every 30 seconds for demo
    const interval = setInterval(() => {
      setData(generateData(dataKey))
    }, 30000)

    return () => clearInterval(interval)
  }, [dataKey])

  if (isLoading) {
    return (
      <div className="h-[200px] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="time" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip
              contentStyle={{ backgroundColor: "#111", border: "1px solid #333" }}
              labelStyle={{ color: "#ccc" }}
            />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              dot={{ fill: color, r: 4 }}
              activeDot={{ r: 6, fill: "#fff", stroke: color }}
              animationDuration={1000}
            />
          </LineChart>
        )
      case "area":
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="time" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip
              contentStyle={{ backgroundColor: "#111", border: "1px solid #333" }}
              labelStyle={{ color: "#ccc" }}
            />
            <defs>
              <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={color} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#gradient-${dataKey})`}
              animationDuration={1000}
            />
          </AreaChart>
        )
      case "bar":
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="time" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip
              contentStyle={{ backgroundColor: "#111", border: "1px solid #333" }}
              labelStyle={{ color: "#ccc" }}
            />
            <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} animationDuration={1000} />
          </BarChart>
        )
      default:
        return null
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-[200px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    </motion.div>
  )
}

