"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LogOut,
  Users,
  GraduationCap,
  Settings,
  UserCog,
  School,
} from "lucide-react"

export default function AdminDashboardPage() {
  const [currentUser, setCurrentUser] = useState("")
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem("currentUser")
    if (!user || user !== "Admin") {
      router.push("/")
      return
    }
    setCurrentUser(user)
  }, [router])

  const handleLogout = () => {
    localStorage.clear()
    router.push("/")
  }

  const handleMenuItemClick = (path: string) => {
    router.push(path)
  }

  const menuItems = [
    {
      title: "User Management",
      description: "Manage teachers, students, and staff accounts",
      icon: UserCog,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      path: "/admin-dashboard/user-management",
    },
    {
      title: "Class Management",
      description: "Manage classes, sections, and subjects",
      icon: School,
      color: "text-green-600",
      bgColor: "bg-green-100",
      path: "/admin-dashboard/class-management",
    },
    {
      title: "Student Records",
      description: "View and manage student academic records",
      icon: GraduationCap,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      path: "/admin-dashboard/student-records",
    },
    {
      title: "Teacher Records",
      description: "View and manage teacher records",
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      path: "/admin-dashboard/teacher-records",
    },
    {
      title: "System Settings",
      description: "Configure system preferences and settings",
      icon: Settings,
      color: "text-gray-600",
      bgColor: "bg-gray-100",
      path: "/admin-dashboard/settings",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <School className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-semibold">School Management System</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, {currentUser}</span>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Administrator Dashboard</h2>
          <p className="text-gray-600">Manage and monitor all aspects of the school system</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {menuItems.map((item, index) => (
            <Card 
              key={index} 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleMenuItemClick(item.path)}
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${item.bgColor}`}>
                    <item.icon className={`h-6 w-6 ${item.color}`} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription className="text-sm">{item.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full justify-start">
                  Access {item.title}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 