"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function withAuth(WrappedComponent: React.ComponentType) {
  return function AuthenticatedComponent(props: any) {
    const router = useRouter()

    useEffect(() => {
      // Check if the user is authenticated
      const isAuthenticated = !!localStorage.getItem("authToken")
      if (!isAuthenticated) {
        // Redirect to login if not authenticated
        router.push("/login")
      }
    }, [router])

    // Render the wrapped component if authenticated
    return <WrappedComponent {...props} />
  }
}

