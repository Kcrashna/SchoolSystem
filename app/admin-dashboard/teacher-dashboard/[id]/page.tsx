"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Star, StarHalf } from "lucide-react"
import { useRouter } from "next/navigation"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Mock data for the teacher (you would fetch this based on the ID)
const teacherData = {
  name: "Mr. Rajesh Kumar",
  department: "Science",
  subjectsHandled: ["Mathematics", "Advanced Mathematics"],
  classAssigned: "Grade 10-A",
  joinedDate: "15 August 2020",
  overallRating: 4.5,
  reviews: [
    {
      id: 1,
      reviewer: "Principal Smith",
      role: "Admin",
      rating: 5,
      comment: "Excellent teaching methods and student engagement",
      date: "2024-03-15"
    },
    {
      id: 2,
      reviewer: "Dr. Johnson",
      role: "Department Head",
      rating: 4,
      comment: "Strong subject knowledge and good classroom management",
      date: "2024-03-10"
    }
  ]
}

// Mock data for course completion
const courseCompletionData = [
  { subject: "Chapter 1", completed: 100 },
  { subject: "Chapter 2", completed: 85 },
  { subject: "Chapter 3", completed: 75 },
  { subject: "Chapter 4", completed: 60 },
  { subject: "Chapter 5", completed: 40 },
]

// Mock data for attendance
const attendanceData = [
  { month: "Jan", attendance: 95 },
  { month: "Feb", attendance: 98 },
  { month: "Mar", attendance: 92 },
  { month: "Apr", attendance: 96 },
  { month: "May", attendance: 90 },
  { month: "Jun", attendance: 94 },
]

// Star Rating Component
const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0

  return (
    <div className="flex items-center gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && <StarHalf className="w-5 h-5 fill-yellow-400 text-yellow-400" />}
      {[...Array(5 - Math.ceil(rating))].map((_, i) => (
        <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
      ))}
      <span className="ml-2 text-sm text-gray-600">({rating})</span>
    </div>
  )
}

export default function TeacherEvaluationPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  const handleBackClick = () => {
    router.push("/admin-dashboard/teacher-records")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <Button variant="outline" onClick={handleBackClick} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Teacher Records
        </Button>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Teacher Name</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">{teacherData.name}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Department</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">{teacherData.department}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Subjects Handled</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">{teacherData.subjectsHandled.join(", ")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Class Assigned</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">{teacherData.classAssigned}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Joined Date</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">{teacherData.joinedDate}</p>
          </CardContent>
        </Card>
      </div>

      {/* Overall Rating Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Overall Performance Rating of this Month</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center flex-col">
            <div className="text-4xl font-bold text-purple-600 mb-2">{teacherData.overallRating}</div>
            <StarRating rating={teacherData.overallRating} />
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Course Completion Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={courseCompletionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" fill="#8884d8" name="Completion %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="attendance" fill="#82ca9d" name="Attendance %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 