"use client"

import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"

// Historic data for students across multiple terms
const historicSubjectData = {
  mathematics: {
    "Ronisha Shrestha": {
      allTermsData: [
        { term: "Grade 7 - First Term", marks: 88, classAverage: 70 },
        { term: "Grade 7 - Mid Term", marks: 90, classAverage: 72 },
        { term: "Grade 7 - Final Term", marks: 92, classAverage: 74 },
        { term: "Grade 8 - First Term", marks: 92, classAverage: 70 },
        { term: "Grade 8 - Mid Term", marks: 94, classAverage: 71 },
        { term: "Grade 8 - Second Term", marks: 96, classAverage: 72.5 },
      ],
      currentGrade: "A",
      overallTrend: "Improving",
    },
    "AAYUMI TAMANG": {
      allTermsData: [
        { term: "Grade 7 - First Term", marks: 45, classAverage: 70 },
        { term: "Grade 7 - Mid Term", marks: 48, classAverage: 72 },
        { term: "Grade 7 - Final Term", marks: 52, classAverage: 74 },
        { term: "Grade 8 - First Term", marks: 55, classAverage: 70 },
        { term: "Grade 8 - Mid Term", marks: 59, classAverage: 71 },
        { term: "Grade 8 - Second Term", marks: 63, classAverage: 72.5 },
      ],
      currentGrade: "C",
      overallTrend: "Improving",
    },
    "Yanis Shrestha": {
      allTermsData: [
        { term: "Grade 7 - First Term", marks: 35, classAverage: 70 },
        { term: "Grade 7 - Mid Term", marks: 38, classAverage: 72 },
        { term: "Grade 7 - Final Term", marks: 40, classAverage: 74 },
        { term: "Grade 8 - First Term", marks: 40, classAverage: 70 },
        { term: "Grade 8 - Mid Term", marks: 42, classAverage: 71 },
        { term: "Grade 8 - Second Term", marks: 45, classAverage: 72.5 },
      ],
      currentGrade: "D",
      overallTrend: "Slowly Improving",
    },
  },
  science: {
    "Ronisha Shrestha": {
      allTermsData: [
        { term: "Grade 7 - First Term", marks: 85, classAverage: 68 },
        { term: "Grade 7 - Mid Term", marks: 87, classAverage: 70 },
        { term: "Grade 7 - Final Term", marks: 89, classAverage: 72 },
        { term: "Grade 8 - First Term", marks: 90, classAverage: 73 },
        { term: "Grade 8 - Mid Term", marks: 92, classAverage: 74 },
        { term: "Grade 8 - Second Term", marks: 95, classAverage: 75.2 },
      ],
      currentGrade: "A",
      overallTrend: "Consistently Improving",
    },
    "AAYUMI TAMANG": {
      allTermsData: [
        { term: "Grade 7 - First Term", marks: 68, classAverage: 68 },
        { term: "Grade 7 - Mid Term", marks: 70, classAverage: 70 },
        { term: "Grade 7 - Final Term", marks: 72, classAverage: 72 },
        { term: "Grade 8 - First Term", marks: 75, classAverage: 73 },
        { term: "Grade 8 - Mid Term", marks: 78, classAverage: 74 },
        { term: "Grade 8 - Second Term", marks: 81, classAverage: 75.2 },
      ],
      currentGrade: "B",
      overallTrend: "Steady Improvement",
    },
    "Yanis Shrestha": {
      allTermsData: [
        { term: "Grade 7 - First Term", marks: 55, classAverage: 68 },
        { term: "Grade 7 - Mid Term", marks: 58, classAverage: 70 },
        { term: "Grade 7 - Final Term", marks: 60, classAverage: 72 },
        { term: "Grade 8 - First Term", marks: 60, classAverage: 73 },
        { term: "Grade 8 - Mid Term", marks: 62, classAverage: 74 },
        { term: "Grade 8 - Second Term", marks: 65, classAverage: 75.2 },
      ],
      currentGrade: "C",
      overallTrend: "Gradual Improvement",
    },
  },
}

// Default data generator for students not in the main dataset
const getDefaultHistoricData = (studentName: string, subject: string) => {
  const baseData = {
    mathematics: {
      allTermsData: [
        { term: "Grade 7 - First Term", marks: 65, classAverage: 70 },
        { term: "Grade 7 - Mid Term", marks: 68, classAverage: 72 },
        { term: "Grade 7 - Final Term", marks: 70, classAverage: 74 },
        { term: "Grade 8 - First Term", marks: 70, classAverage: 70 },
        { term: "Grade 8 - Mid Term", marks: 72, classAverage: 71 },
        { term: "Grade 8 - Second Term", marks: 75, classAverage: 72.5 },
      ],
      currentGrade: "B",
      overallTrend: "Gradually Improving",
    },
    science: {
      allTermsData: [
        { term: "Grade 7 - First Term", marks: 68, classAverage: 68 },
        { term: "Grade 7 - Mid Term", marks: 70, classAverage: 70 },
        { term: "Grade 7 - Final Term", marks: 72, classAverage: 72 },
        { term: "Grade 8 - First Term", marks: 74, classAverage: 73 },
        { term: "Grade 8 - Mid Term", marks: 76, classAverage: 74 },
        { term: "Grade 8 - Second Term", marks: 78, classAverage: 75.2 },
      ],
      currentGrade: "B",
      overallTrend: "Steady Improvement",
    },
  }

  return baseData[subject] || baseData.mathematics
}

export default function SubjectHistoricDashboardPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const studentName = decodeURIComponent(params.student as string)
  const subject = searchParams.get("subject") || "mathematics"

  const [studentData, setStudentData] = useState(null)

  useEffect(() => {
    // Get student data based on subject and name
    let data = historicSubjectData[subject]?.[studentName]

    if (!data) {
      // Use default data if student not found in main dataset
      data = getDefaultHistoricData(studentName, subject)
    }

    if (data) {
      setStudentData(data)
    }
  }, [subject, studentName])

  const handleBackClick = () => {
    router.push("/subject-dashboard")
  }

  if (!studentData) {
    return <div className="p-8 text-center">Loading...</div>
  }

  // Format subject name
  const formatSubjectName = (subj) => {
    return subj.charAt(0).toUpperCase() + subj.slice(1)
  }

  // Calculate performance metrics
  const firstTermMarks = studentData.allTermsData[0].marks
  const latestMarks = studentData.allTermsData[studentData.allTermsData.length - 1].marks
  const totalImprovement = latestMarks - firstTermMarks
  const averageMarks =
    studentData.allTermsData.reduce((sum, term) => sum + term.marks, 0) / studentData.allTermsData.length

  // Get trend color
  const getTrendColor = (trend) => {
    if (trend.includes("Improving")) return "text-green-600"
    if (trend.includes("Declining")) return "text-red-600"
    return "text-orange-600"
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
                {studentName} - {formatSubjectName(subject)} Historic Dashboard
              </h1>
              <p className="text-sm text-gray-500">Subject Teacher View - Grade 7 to Grade 8</p>
            </div>
          </div>
          <Button variant="default" className="bg-black hover:bg-gray-800 gap-2">
            <Download className="h-4 w-4" />
            Download Historic Report
          </Button>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto space-y-8">
        {/* Performance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <CardContent className="p-0">
              <h3 className="text-sm text-gray-500 mb-1">Current Grade</h3>
              <p className="text-3xl font-bold text-blue-600">{studentData.currentGrade}</p>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardContent className="p-0">
              <h3 className="text-sm text-gray-500 mb-1">Overall Trend</h3>
              <p className={`text-lg font-bold ${getTrendColor(studentData.overallTrend)}`}>
                {studentData.overallTrend}
              </p>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardContent className="p-0">
              <h3 className="text-sm text-gray-500 mb-1">Total Improvement</h3>
              <p className={`text-3xl font-bold ${totalImprovement >= 0 ? "text-green-600" : "text-red-600"}`}>
                {totalImprovement >= 0 ? "+" : ""}
                {totalImprovement}
              </p>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardContent className="p-0">
              <h3 className="text-sm text-gray-500 mb-1">Average Score</h3>
              <p className="text-3xl font-bold text-purple-600">{averageMarks.toFixed(1)}</p>
            </CardContent>
          </Card>
        </div>

        {/* Historic Performance Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Historic Performance Trend</CardTitle>
            <CardDescription>
              Performance progression in {formatSubjectName(subject)} from Grade 7 to Grade 8
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={studentData.allTermsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="term" angle={-45} textAnchor="end" height={100} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="marks"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 6 }}
                    name="Student Performance"
                  />
                  <Line
                    type="monotone"
                    dataKey="classAverage"
                    stroke="#ef4444"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
                    name="Class Average"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Performance Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Analysis</CardTitle>
            <CardDescription>Detailed analysis of student's journey in {formatSubjectName(subject)}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={studentData.allTermsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="term" angle={-45} textAnchor="end" height={100} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="marks"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                    name="Student Performance"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Key Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
            <CardDescription>Analysis and observations for {studentName}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Performance Trend</h4>
                <p className="text-sm text-blue-800">
                  {studentData.overallTrend} - Student has shown {totalImprovement >= 0 ? "positive growth" : "decline"}{" "}
                  of {Math.abs(totalImprovement)} marks over the period.
                </p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Consistency</h4>
                <p className="text-sm text-green-800">
                  Average performance of {averageMarks.toFixed(1)} marks shows{" "}
                  {averageMarks >= 75 ? "excellent" : averageMarks >= 60 ? "good" : "needs improvement"} consistency in{" "}
                  {formatSubjectName(subject)}.
                </p>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-medium text-orange-900 mb-2">Class Comparison</h4>
                <p className="text-sm text-orange-800">
                  Student is currently{" "}
                  {latestMarks >= studentData.allTermsData[studentData.allTermsData.length - 1].classAverage
                    ? "performing above"
                    : "performing below"}{" "}
                  the class average in {formatSubjectName(subject)}.
                </p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-900 mb-2">Recommendations</h4>
                <p className="text-sm text-purple-800">
                  {totalImprovement >= 0
                    ? `Continue the positive momentum. Focus on maintaining consistency and challenging the student with advanced concepts.`
                    : `Needs additional support and attention. Consider personalized learning strategies and extra practice sessions.`}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
