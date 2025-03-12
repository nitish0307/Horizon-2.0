"use client"

import type React from "react"

import Link from "next/link"
import { motion } from "framer-motion"
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

export function Footer() {
  const { toast } = useToast()

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    })
    // Reset the form
    const form = e.target as HTMLFormElement
    form.reset()
  }

  return (
    <footer className="relative z-10 bg-black/80 backdrop-blur-md border-t border-purple-900/30">
      <div className="container mx-auto px-4 py-12">
        {/* Newsletter Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-purple-900/30 to-black/30 backdrop-blur-sm p-8 rounded-xl border border-purple-900/30 text-center"
          >
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Stay Updated with Data Horizon</h3>
            <p className="text-gray-400 mb-6 max-w-lg mx-auto">
              Subscribe to our newsletter for the latest updates, features, and IoT insights.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                required
                className="bg-black/50 border-gray-800 focus:border-purple-500 text-white"
              />
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <Link href="/" passHref>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600 cursor-pointer">
                Data Horizon
              </span>
            </Link>
            <p className="text-gray-400 mt-4 mb-6">
              Empowering businesses with AI-powered IoT data analytics and real-time insights.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/features" className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/api-docs" className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer">
                  API
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer">
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/changelog"
                  className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer"
                >
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-medium mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/case-studies"
                  className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer"
                >
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/webinars" className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer">
                  Webinars
                </Link>
              </li>
              <li>
                <Link
                  href="/help-center"
                  className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer"
                >
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer">
                  Partners
                </Link>
              </li>
              <li>
                <a
                  href="mailto:info@datahorizon.io"
                  className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer flex items-center"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Data Horizon. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              href="/terms"
              className="text-gray-500 hover:text-purple-400 text-sm transition-colors cursor-pointer"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="text-gray-500 hover:text-purple-400 text-sm transition-colors cursor-pointer"
            >
              Privacy Policy
            </Link>
            <Link
              href="/security"
              className="text-gray-500 hover:text-purple-400 text-sm transition-colors cursor-pointer"
            >
              Security
            </Link>
            <Link
              href="/cookies"
              className="text-gray-500 hover:text-purple-400 text-sm transition-colors cursor-pointer"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

