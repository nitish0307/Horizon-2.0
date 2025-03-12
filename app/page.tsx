"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowRight, Database, Cpu, Zap, Shield, Code, BarChart2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ParticleBackground } from "@/components/particle-background"

export default function LandingPage() {
  const router = useRouter()

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  }

  const features = [
    {
      icon: <Database className="h-10 w-10 text-purple-400" />,
      title: "Real-time Data Streaming",
      description: "Monitor your IoT devices with live data updates and visualizations",
    },
    {
      icon: <Cpu className="h-10 w-10 text-purple-400" />,
      title: "AI-Powered Insights",
      description: "Gain intelligent insights and anomaly detection from your data",
    },
    {
      icon: <Zap className="h-10 w-10 text-purple-400" />,
      title: "Powerful Visualizations",
      description: "Create beautiful, interactive charts and dashboards",
    },
    {
      icon: <Shield className="h-10 w-10 text-purple-400" />,
      title: "Secure Device Management",
      description: "Manage all your IoT devices with enterprise-grade security",
    },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <ParticleBackground />

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center px-6 py-32 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600"
        >
          Unlock the Power of Your IoT Data
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-lg md:text-xl text-gray-300 max-w-3xl mb-10"
        >
          Data Horizon provides AI-powered insights, real-time monitoring, and beautiful visualizations for all your IoT
          devices.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          <Button
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white group"
            onClick={() => router.push("/signup")}
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-20 bg-black/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-16 text-white"
          >
            Powerful Features for Your IoT Ecosystem
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-xl border border-purple-900/50 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-8 text-white"
          >
            How Data Horizon Works
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="bg-purple-600 rounded-full p-4 mb-4">
                <Database className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Connect Devices</h3>
              <p className="text-gray-400">Easily integrate your IoT devices with our platform</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="bg-purple-600 rounded-full p-4 mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Stream Data</h3>
              <p className="text-gray-400">Collect and process real-time data from your devices</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center"
            >
              <div className="bg-purple-600 rounded-full p-4 mb-4">
                <Cpu className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Gain Insights</h3>
              <p className="text-gray-400">Leverage AI to extract valuable insights from your data</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="relative z-10 px-6 py-20 bg-gradient-to-b from-purple-900/20 to-black">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-16 text-white"
          >
            Empowering Industries with IoT Intelligence
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Smart Manufacturing",
                icon: Cpu,
                description: "Optimize production processes and predict maintenance needs",
              },
              {
                title: "Smart Cities",
                icon: BarChart2,
                description: "Improve urban services and quality of life for citizens",
              },
              {
                title: "Agriculture",
                icon: Zap,
                description: "Enhance crop yields and resource management in farming",
              },
              {
                title: "Healthcare",
                icon: Shield,
                description: "Monitor patient health and improve medical device efficiency",
              },
              {
                title: "Energy Management",
                icon: Database,
                description: "Optimize energy consumption and distribution in buildings",
              },
              { title: "Supply Chain", icon: ArrowRight, description: "Track assets and improve logistics operations" },
            ].map((useCase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-xl border border-purple-900/50"
              >
                <useCase.icon className="h-10 w-10 text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">{useCase.title}</h3>
                <p className="text-gray-400">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* API Integration Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-8 text-white"
          >
            Seamless API Integration
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-xl border border-purple-900/50"
          >
            <div className="flex items-center mb-4">
              <Code className="h-6 w-6 text-purple-400 mr-2" />
              <h3 className="text-xl font-semibold text-white">Easy-to-Use REST API</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Integrate Data Horizon into your existing systems with our comprehensive API
            </p>
            <pre className="bg-black p-4 rounded-md overflow-x-auto">
              <code className="text-sm text-purple-300">
                {`
  POST /api/v1/data HTTP/1.1
  Host: api.datahorizon.io
  Authorization: Bearer YOUR_API_KEY
  Content-Type: application/json

  {
    "device_id": "dev_123456",
    "temperature": 23.5,
    "humidity": 60,
    "timestamp": "2023-06-15T14:30:00Z"
  }
                `}
              </code>
            </pre>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 px-6 py-20 bg-gradient-to-b from-black to-purple-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-16 text-white"
          >
            What Our Customers Say
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "John Doe",
                role: "CTO, TechCorp",
                quote:
                  "Data Horizon has revolutionized how we manage our IoT infrastructure. The insights we've gained are invaluable.",
              },
              {
                name: "Jane Smith",
                role: "Head of Innovation, FutureTech",
                quote:
                  "The real-time analytics and AI-powered insights have helped us stay ahead of issues and optimize our operations.",
              },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-xl border border-purple-900/50"
              >
                <p className="text-gray-300 mb-4">"{testimonial.quote}"</p>
                <p className="text-purple-400 font-semibold">{testimonial.name}</p>
                <p className="text-gray-500">{testimonial.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center bg-gradient-to-r from-purple-900/40 to-black/40 backdrop-blur-sm p-10 rounded-2xl border border-purple-900/50"
        >
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to Transform Your IoT Data?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Join thousands of companies using Data Horizon to unlock insights from their IoT devices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white"
              onClick={() => router.push("/signup")}
            >
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-purple-600 text-purple-400 hover:bg-purple-900/20"
              onClick={() => router.push("/pricing")}
            >
              View Pricing
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-10 bg-black/80 backdrop-blur-sm border-t border-purple-900/30">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
              Data Horizon
            </span>
          </div>

          <div className="flex gap-8 text-gray-400">
            <a href="#" className="hover:text-purple-400 transition-colors">
              About
            </a>
            <a href="#" className="hover:text-purple-400 transition-colors">
              Features
            </a>
            <a href="#" className="hover:text-purple-400 transition-colors">
              Pricing
            </a>
            <a href="#" className="hover:text-purple-400 transition-colors">
              Contact
            </a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Data Horizon. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

