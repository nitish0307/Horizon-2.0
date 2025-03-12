"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { User, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = [
  { name: "Home", path: "/" },
  { name: "Channels", path: "/channels" },
  { name: "Pricing", path: "/pricing" },
  { name: "Docs", path: "/docs" },
  { name: "API", path: "/api-docs" },
]

const authenticatedNavItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Devices", path: "/devices" },
]

export function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Check authentication status
    // This is a placeholder. Replace with actual auth check.
    const checkAuth = () => {
      const token = localStorage.getItem("authToken")
      setIsAuthenticated(!!token)
    }
    checkAuth()
  }, [])

  const handleLogout = () => {
    // Implement logout logic here
    localStorage.removeItem("authToken")
    setIsAuthenticated(false)
    router.push("/")
  }

  const NavLink = ({ item }: { item: { name: string; path: string } }) => (
    <Link href={item.path} passHref>
      <motion.span
        className={`text-sm font-medium transition-colors hover:text-purple-400 cursor-pointer ${
          pathname === item.path ? "text-purple-400" : "text-gray-300"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {item.name}
      </motion.span>
    </Link>
  )

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-purple-900/30">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" passHref>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
                Data Horizon
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <NavLink key={item.name} item={item} />
            ))}
            {isAuthenticated && authenticatedNavItems.map((item) => <NavLink key={item.name} item={item} />)}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-gray-300 hover:text-purple-400">
                    <User className="h-5 w-5 mr-2" />
                    <span>Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => router.push("/profile")}>Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/settings")}>Settings</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:text-purple-400"
                  onClick={() => router.push("/login")}
                >
                  Login
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={() => router.push("/signup")}>
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-6 w-6 text-gray-300" /> : <Menu className="h-6 w-6 text-gray-300" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 pb-4"
          >
            <div className="flex flex-col space-y-4">
              <div className="flex justify-center mb-2">
                <ThemeToggle />
              </div>
              {navItems.map((item) => (
                <NavLink key={item.name} item={item} />
              ))}
              {isAuthenticated && authenticatedNavItems.map((item) => <NavLink key={item.name} item={item} />)}
              {isAuthenticated ? (
                <>
                  <Link href="/profile" passHref>
                    <span className="text-sm font-medium text-gray-300 hover:text-purple-400">Profile</span>
                  </Link>
                  <Link href="/settings" passHref>
                    <span className="text-sm font-medium text-gray-300 hover:text-purple-400">Settings</span>
                  </Link>
                  <Button
                    variant="ghost"
                    className="justify-start p-0 h-auto text-sm font-medium text-gray-300 hover:text-purple-400"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Logout</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="justify-start p-0 h-auto text-sm font-medium text-gray-300 hover:text-purple-400"
                    onClick={() => router.push("/login")}
                  >
                    Login
                  </Button>
                  <Button
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={() => router.push("/signup")}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

