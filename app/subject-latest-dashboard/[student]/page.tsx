"use client"

import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Download, Save } from "lucide-react"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

// Student marks data - only showing subject-specific data
const subjectStudentData = {
  mathematics: {
    "Ronisha Shrestha": {
      currentMarks: 96,
      theoryMarks: 46,
      practicalMarks: 50,
      grade: "A",
      rank: 1,
      classAverage: 72.5,
      classHighest: 100,
      previousTerms: [
        { term: "First Term", marks: 92 },
        { term: "Mid Term", marks: 94 },
        { term: "Second Term", marks: 96 },
      ],
    },
    "Amriddhi Rajbhandari": {
      currentMarks: 100,
      theoryMarks: 50,
      practicalMarks: 50,
      grade: "A",
      rank: 1,
      classAverage: 72.5,
      classHighest: 100,
      previousTerms: [
        { term: "First Term", marks: 95 },
        { term: "Mid Term", marks: 98 },
        { term: "Second Term", marks: 100 },
      ],
    },
    "Miksha Kafle": {
      currentMarks: 90,
      theoryMarks: 40,
      practicalMarks: 50,
      grade: "A",
      rank: 3,
      classAverage: 72.5,
      classHighest: 100,
      previousTerms: [
        { term: "First Term", marks: 85 },
        { term: "Mid Term", marks: 88 },
        { term: "Second Term", marks: 90 },
      ],
    },
    "AAYUMI TAMANG": {
      currentMarks: 63,
      theoryMarks: 23,
      practicalMarks: 40,
      grade: "C",
      rank: 17,
      classAverage: 72.5,
      classHighest: 100,
      previousTerms: [
        { term: "First Term", marks: 55 },
        { term: "Mid Term", marks: 59 },
        { term: "Second Term", marks: 63 },
      ],
    },
    "Yanis Shrestha": {
      currentMarks: 45,
      theoryMarks: 10,
      practicalMarks: 35,
      grade: "D",
      rank: 21,
      classAverage: 72.5,
      classHighest: 100,
      previousTerms: [
        { term: "First Term", marks: 40 },
        { term: "Mid Term", marks: 42 },
        { term: "Second Term", marks: 45 },
      ],
    },
    "Sartaz Malla": {
      currentMarks: 58,
      theoryMarks: 23,
      practicalMarks: 35,
      grade: "D",
      rank: 27,
      classAverage: 72.5,
      classHighest: 100,
      previousTerms: [
        { term: "First Term", marks: 50 },
        { term: "Mid Term", marks: 54 },
        { term: "Second Term", marks: 58 },
      ],
    },
  },
  science: {
    "Ronisha Shrestha": {
      currentMarks: 95,
      theoryMarks: 47,
      practicalMarks: 48,
      grade: "A",
      rank: 1,
      classAverage: 75.2,
      classHighest: 95,
      previousTerms: [
        { term: "First Term", marks: 90 },
        { term: "Mid Term", marks: 92 },
        { term: "Second Term", marks: 95 },
      ],
    },
    "Amriddhi Rajbhandari": {
      currentMarks: 95,
      theoryMarks: 47,
      practicalMarks: 48,
      grade: "A",
      rank: 1,
      classAverage: 75.2,
      classHighest: 95,
      previousTerms: [
        { term: "First Term", marks: 92 },
        { term: "Mid Term", marks: 94 },
        { term: "Second Term", marks: 95 },
      ],
    },
    "Miksha Kafle": {
      currentMarks: 90,
      theoryMarks: 42,
      practicalMarks: 48,
      grade: "A",
      rank: 3,
      classAverage: 75.2,
      classHighest: 95,
      previousTerms: [
        { term: "First Term", marks: 86 },
        { term: "Mid Term", marks: 88 },
        { term: "Second Term", marks: 90 },
      ],
    },
    "AAYUMI TAMANG": {
      currentMarks: 81,
      theoryMarks: 37,
      practicalMarks: 44,
      grade: "B",
      rank: 11,
      classAverage: 75.2,
      classHighest: 95,
      previousTerms: [
        { term: "First Term", marks: 75 },
        { term: "Mid Term", marks: 78 },
        { term: "Second Term", marks: 81 },
      ],
    },
    "Yanis Shrestha": {
      currentMarks: 65,
      theoryMarks: 30,
      practicalMarks: 35,
      grade: "C",
      rank: 18,
      classAverage: 75.2,
      classHighest: 95,
      previousTerms: [
        { term: "First Term", marks: 60 },
        { term: "Mid Term", marks: 62 },
        { term: "Second Term", marks: 65 },
      ],
    },
    "Sartaz Malla": {
      currentMarks: 42,
      theoryMarks: 12,
      practicalMarks: 30,
      grade: "E",
      rank: 27,
      classAverage: 75.2,
      classHighest: 95,
      previousTerms: [
        { term: "First Term", marks: 35 },
        { term: "Mid Term", marks: 38 },
        { term: "Second Term", marks: 42 },
      ],
    },
  },
}

// Default data generator for students not in the main dataset
const getDefaultStudentData = (studentName: string, subject: string) => {
  const baseData = {
    mathematics: {
      currentMarks: 75,
      theoryMarks: 35,
      practicalMarks: 40,
      grade: "B",
      rank: 15,
      classAverage: 72.5,
      classHighest: 100,
      previousTerms: [
        { term: "First Term", marks: 70 },
        { term: "Mid Term", marks: 72 },
        { term: "Second Term", marks: 75 },
      ],
    },
    science: {
      currentMarks: 78,
      theoryMarks: 38,
      practicalMarks: 40,
      grade: "B",
      rank: 12,
      classAverage: 75.2,
      classHighest: 95,
      previousTerms: [
        { term: "First Term", marks: 74 },
        { term: "Mid Term", marks: 76 },
        { term: "Second Term", marks: 78 },
      ],
    },
  }

  return baseData[subject] || baseData.mathematics
}

export default function SubjectLatestDashboardPage() {
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
    let data = subjectStudentData[subject]?.[studentName]

    if (!data) {
      // Use default data if student not found in main dataset
      data = getDefaultStudentData(studentName, subject)
    }

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
      subject: subject,
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

  // Format subject name
  const formatSubjectName = (subj) => {
    return subj.charAt(0).toUpperCase() + subj.slice(1)
  }

  // Prepare performance comparison data
  const comparisonData = [
    {
      category: "Student Score",
      value: studentData.currentMarks,
    },
    {
      category: "Class Average",
      value: studentData.classAverage,
    },
    {
      category: "Class Highest",
      value: studentData.classHighest,
    },
  ]

  // Prepare trend data
  const trendData = studentData.previousTerms.map((term) => ({
    term: term.term,
    "Student Performance": term.marks,
    "Class Average": studentData.classAverage,
  }))

  // Get grade color
  const getGradeColor = (grade) => {
    switch (grade) {
      case "A":
        return "text-green-600"
      case "B":
        return "text-blue-600"
      case "C":
        return "text-orange-600"
      case "D":
        return "text-yellow-600"
      case "E":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
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
                {studentName} - {formatSubjectName(subject)} Latest Dashboard
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
        {/* Student Performance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="p-4">
            <CardContent className="p-0">
              <h3 className="text-sm text-gray-500 mb-1">Total Marks</h3>
              <p className="text-3xl font-bold text-blue-600">{studentData.currentMarks}</p>
              <p className="text-xs text-gray-500">out of 100</p>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardContent className="p-0">
              <h3 className="text-sm text-gray-500 mb-1">Theory</h3>
              <p className="text-3xl font-bold text-purple-600">{studentData.theoryMarks}</p>
              <p className="text-xs text-gray-500">out of 50</p>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardContent className="p-0">
              <h3 className="text-sm text-gray-500 mb-1">Practical</h3>
              <p className="text-3xl font-bold text-orange-600">{studentData.practicalMarks}</p>
              <p className="text-xs text-gray-500">out of 50</p>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardContent className="p-0">
              <h3 className="text-sm text-gray-500 mb-1">Grade</h3>
              <p className={`text-3xl font-bold ${getGradeColor(studentData.grade)}`}>{studentData.grade}</p>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardContent className="p-0">
              <h3 className="text-sm text-gray-500 mb-1">Class Rank</h3>
              <p className="text-3xl font-bold text-indigo-600">{studentData.rank}</p>
              <p className="text-xs text-gray-500">out of 28</p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Comparison</CardTitle>
              <CardDescription>Student performance vs class statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" radius={4} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Performance Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Trend</CardTitle>
              <CardDescription>Progress across terms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="term" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Student Performance" fill="#22c55e" />
                    <Bar dataKey="Class Average" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
            <CardDescription>Analysis of student performance in {formatSubjectName(subject)}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Current Standing</h4>
                <p className="text-sm text-blue-800">
                  Ranked {studentData.rank} out of 28 students with {studentData.currentMarks} marks
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Progress</h4>
                <p className="text-sm text-green-800">
                  {studentData.currentMarks - studentData.previousTerms[0].marks >= 0 ? "Improved" : "Declined"} by{" "}
                  {Math.abs(studentData.currentMarks - studentData.previousTerms[0].marks)} marks from first term
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-medium text-orange-900 mb-2">Class Comparison</h4>
                <p className="text-sm text-orange-800">
                  {studentData.currentMarks >= studentData.classAverage ? "Above" : "Below"} class average by{" "}
                  {Math.abs(studentData.currentMarks - studentData.classAverage).toFixed(1)} marks
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Write Review Section */}
        <Card>
          <CardHeader>
            <CardTitle>Write Review</CardTitle>
            <CardDescription>
              Add your feedback for {studentName} in {formatSubjectName(subject)}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder={`Enter your review and feedback for ${studentName}'s performance in ${formatSubjectName(subject)}...`}
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
                        <span>
                          {item.teacher} - {formatSubjectName(item.subject)} Teacher
                        </span>
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
