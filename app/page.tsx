"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple demo authentication
    if (username === "Admin" && password === "admin123") {
      localStorage.setItem("currentUser", username)
      router.push("/admin-dashboard") // Admin goes directly to admin dashboard
    } else if (
      (username === "Ram Thapa" && password === "Ram3322") ||
      (username === "Shyam Kumar" && password === "Shyam3122")
    ) {
      localStorage.setItem("currentUser", username)
      router.push("/role-selection") // Teachers go to role selection
    } else {
      alert("Invalid credentials. Please try again.")
    }
  }

  const handleTeacher1Demo = useCallback(() => {
    setUsername("Ram Thapa")
    setPassword("Ram3322")
  }, [])

  const handleTeacher2Demo = useCallback(() => {
    setUsername("Shyam Kumar")
    setPassword("Shyam3122")
  }, [])

  const handleAdminDemo = useCallback(() => {
    setUsername("Admin")
    setPassword("admin123")
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">School Management System</CardTitle>
          <CardDescription>Sign in to access student's dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800">
              Sign In
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t">
            <p className="text-sm font-medium text-gray-700 mb-3">Demo Credentials:</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="text-sm">
                  <span className="font-medium">School Administrator:</span> Admin / admin123
                </div>
                <Button variant="outline" size="sm" onClick={handleAdminDemo}>
                  Use
                </Button>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="text-sm">
                  <span className="font-medium">Teacher 1:</span> Ram Thapa / Ram3322
                </div>
                <Button variant="outline" size="sm" onClick={handleTeacher1Demo}>
                  Use
                </Button>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="text-sm">
                  <span className="font-medium">Teacher 2:</span> Shyam Kumar / Shyam3122
                </div>
                <Button variant="outline" size="sm" onClick={handleTeacher2Demo}>
                  Use
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
