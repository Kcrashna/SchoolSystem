"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Search } from "lucide-react"

// Mock teacher data (you would fetch this from your backend)
const teachers = [
  {
    id: 1,
    name: "Mr. Rajesh Kumar",
    subject: "Mathematics",
    department: "Science",
    email: "rajesh.kumar@school.edu"
  },
  {
    id: 2,
    name: "Mrs. Priya Sharma",
    subject: "English Literature",
    department: "Languages",
    email: "priya.sharma@school.edu"
  },
  {
    id: 3,
    name: "Mr. Anil Thapa",
    subject: "Physics",
    department: "Science",
    email: "anil.thapa@school.edu"
  },
  {
    id: 4,
    name: "Ms. Sarah Johnson",
    subject: "History",
    department: "Humanities",
    email: "sarah.johnson@school.edu"
  },
  {
    id: 5,
    name: "Dr. Binod Adhikari",
    subject: "Chemistry",
    department: "Science",
    email: "binod.adhikari@school.edu"
  },
  {
    id: 6,
    name: "Mrs. Maya Gurung",
    subject: "Computer Science",
    department: "Technology",
    email: "maya.gurung@school.edu"
  },
  {
    id: 7,
    name: "Mr. David Wilson",
    subject: "Physical Education",
    department: "Sports",
    email: "david.wilson@school.edu"
  },
  {
    id: 8,
    name: "Ms. Sita Rai",
    subject: "Biology",
    department: "Science",
    email: "sita.rai@school.edu"
  },
  {
    id: 9,
    name: "Dr. Ram Pradhan",
    subject: "Economics",
    department: "Social Studies",
    email: "ram.pradhan@school.edu"
  },
  {
    id: 10,
    name: "Mrs. Anjali Shrestha",
    subject: "Art",
    department: "Fine Arts",
    email: "anjali.shrestha@school.edu"
  }
]

export default function TeacherRecordsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  // Filter teachers based on search query
  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.department.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleBackClick = () => {
    router.push("/admin-dashboard")
  }

  const handleViewDashboard = (teacherId: number) => {
    router.push(`/admin-dashboard/teacher-dashboard/${teacherId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={handleBackClick} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            <h1 className="text-xl font-semibold">Teacher Records</h1>
          </div>
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search teachers by name, subject, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Teacher List</CardTitle>
            <CardDescription>Complete list of teachers in the school</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-200">
                      ID
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-200">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-200">
                      Subject
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-200">
                      Department
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-200">
                      Email
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeachers.map((teacher) => (
                    <tr key={teacher.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 border-r border-gray-200">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-sm font-medium text-purple-600">
                            {teacher.id}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 border-r border-gray-200">
                        <div className="font-medium text-gray-900">{teacher.name}</div>
                      </td>
                      <td className="px-4 py-4 border-r border-gray-200 text-gray-700">
                        {teacher.subject}
                      </td>
                      <td className="px-4 py-4 border-r border-gray-200 text-gray-700">
                        {teacher.department}
                      </td>
                      <td className="px-4 py-4 border-r border-gray-200 text-gray-700">
                        {teacher.email}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDashboard(teacher.id)}
                            className="bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100"
                          >
                            View Dashboard
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 