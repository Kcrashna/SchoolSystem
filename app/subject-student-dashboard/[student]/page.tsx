"use client"

import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Download, Save } from "lucide-react"
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts"

// Mock student data for different subjects
const studentSubjectData = {
  mathematics: {
    "Ronisha Shrestha": {
      currentMarks: 96,
      grade: "A",
      rank: 1,
      previousMarks: [92, 94, 96],
      terms: ["First Term", "Mid Term", "Second Term"],
      strengths: ["Problem solving", "Algebra", "Geometry"],
      weaknesses: ["Trigonometry"],
      reviews: [],
    },
    "Amriddhi Rajbhandari": {
      currentMarks: 100,
      grade: "A",
      rank: 2,
      previousMarks: [95, 98, 100],
      terms: ["First Term", "Mid Term", "Second Term"],
      strengths: ["Calculus", "Algebra", "Statistics"],
      weaknesses: [],
      reviews: [],
    },
    "Miksha Kafle": {
      currentMarks: 90,
      grade: "A",
      rank: 3,
      previousMarks: [85, 88, 90],
      terms: ["First Term", "Mid Term", "Second Term"],
      strengths: ["Algebra", "Statistics"],
      weaknesses: ["Calculus"],
      reviews: [],
    },
  },
  science: {
    "Ronisha Shrestha": {
      currentMarks: 95,
      grade: "A",
      rank: 1,
      previousMarks: [90, 92, 95],
      terms: ["First Term", "Mid Term", "Second Term"],
      strengths: ["Physics", "Chemistry"],
      weaknesses: ["Biology"],
      reviews: [],
    },
    "Amriddhi Rajbhandari": {
      currentMarks: 95,
      grade: "A",
      rank: 2,
      previousMarks: [92, 94, 95],
      terms: ["First Term", "Mid Term", "Second Term"],
      strengths: ["Chemistry", "Biology"],
      weaknesses: ["Physics mechanics"],
      reviews: [],
    },
    "Miksha Kafle": {
      currentMarks: 90,
      grade: "A",
      rank: 3,
      previousMarks: [86, 88, 90],
      terms: ["First Term", "Mid Term", "Second Term"],
      strengths: ["Biology", "Environmental Science"],
      weaknesses: ["Physics"],
      reviews: [],
    },
  },
}

// Mock class average data
const classAverageData = {
  mathematics: [80, 82, 85],
  science: [78, 80, 83],
}

export default function SubjectStudentDashboardPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const studentName = decodeURIComponent(params.student as string)
  const subject = searchParams.get("subject") || "mathematics"

  const [studentData, setStudentData] = useState(null)
  const [review, setReview] = useState("")
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    // Get student data based on subject and name
    const data = studentSubjectData[subject]?.[studentName]
    if (data) {
      setStudentData(data)
      // Load saved reviews from localStorage if available
      const savedReviews = JSON.parse(localStorage.getItem(`reviews_${subject}_${studentName}`) || "[]")
      setReviews(savedReviews)
    }
  }, [subject, studentName])

  const handleBackClick = () => {
    router.push("/subject-dashboard")
  }

  const handleSaveReview = () => {
    if (!review.trim()) return

    const newReview = {
      id: Date.now(),
      text: review,
      date: new Date().toLocaleDateString(),
      teacher: localStorage.getItem("currentUser") || "Teacher",
    }

    const updatedReviews = [...reviews, newReview]
    setReviews(updatedReviews)

    // Save to localStorage
    localStorage.setItem(`reviews_${subject}_${studentName}`, JSON.stringify(updatedReviews))

    // Clear the review input
    setReview("")
  }

  if (!studentData) {
    return <div className="p-8 text-center">Loading...</div>
  }

  // Prepare performance trend data
  const performanceTrendData = studentData.terms.map((term, index) => ({
    term,
    "Student Marks": studentData.previousMarks[index],
    "Class Average": classAverageData[subject][index],
  }))

  // Format subject name
  const formatSubjectName = (subj) => {
    return subj.charAt(0).toUpperCase() + subj.slice(1)
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
            <div>
              <h1 className="text-xl font-semibold">
                {studentName} - {formatSubjectName(subject)} Dashboard
              </h1>
              <p className="text-sm text-gray-500">Subject Teacher View</p>
            </div>
          </div>
          <Button variant="default" className="bg-black hover:bg-gray-800 gap-2">
            <Download className="h-4 w-4" />
            Download Report
          </Button>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto space-y-8">
        {/* Student Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <CardContent className="p-0">
              <h3 className="text-sm text-gray-500 mb-1">Current Marks</h3>
              <p className="text-3xl font-bold text-blue-600">{studentData.currentMarks}</p>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardContent className="p-0">
              <h3 className="text-sm text-gray-500 mb-1">Grade</h3>
              <p className="text-3xl font-bold text-green-600">{studentData.grade}</p>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardContent className="p-0">
              <h3 className="text-sm text-gray-500 mb-1">Rank</h3>
              <p className="text-3xl font-bold text-purple-600">{studentData.rank}</p>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardContent className="p-0">
              <h3 className="text-sm text-gray-500 mb-1">Progress</h3>
              <p className="text-3xl font-bold text-orange-600">
                {studentData.previousMarks[2] - studentData.previousMarks[0] >= 0 ? "+" : ""}
                {studentData.previousMarks[2] - studentData.previousMarks[0]}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Trend</CardTitle>
            <CardDescription>Student performance compared to class average</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="term" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Student Marks" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="Class Average" stroke="#ef4444" strokeWidth={2} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Strengths and Weaknesses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Strengths</CardTitle>
              <CardDescription>Areas where the student excels</CardDescription>
            </CardHeader>
            <CardContent>
              {studentData.strengths.length > 0 ? (
                <ul className="list-disc pl-5 space-y-2">
                  {studentData.strengths.map((strength, index) => (
                    <li key={index} className="text-green-700">
                      {strength}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No specific strengths identified yet.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Areas for Improvement</CardTitle>
              <CardDescription>Topics that need more attention</CardDescription>
            </CardHeader>
            <CardContent>
              {studentData.weaknesses.length > 0 ? (
                <ul className="list-disc pl-5 space-y-2">
                  {studentData.weaknesses.map((weakness, index) => (
                    <li key={index} className="text-orange-700">
                      {weakness}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No specific areas for improvement identified.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Write Review Section */}
        <Card>
          <CardHeader>
            <CardTitle>Write Review</CardTitle>
            <CardDescription>Add your feedback for this student</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Enter your review and feedback for this student..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="min-h-[120px]"
            />
            <Button onClick={handleSaveReview} className="gap-2">
              <Save className="h-4 w-4" />
              Save Review
            </Button>

            {/* Previous Reviews */}
            {reviews.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Previous Reviews</h3>
                <div className="space-y-4">
                  {reviews.map((item) => (
                    <div key={item.id} className="bg-gray-50 p-4 rounded-lg border">
                      <p className="text-gray-800">{item.text}</p>
                      <div className="mt-2 flex justify-between text-xs text-gray-500">
                        <span>{item.teacher}</span>
                        <span>{item.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
