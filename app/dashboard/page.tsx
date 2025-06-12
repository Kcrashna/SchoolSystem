"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { GraduationCap, LogOut, Users, BookOpen, FileText, Search, Download, Star } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const subjectData = [
  { subject: "COMP", fullMarks: 100, passMarks: 40, highest: 98.5, lowest: 40, total: 27 },
  { subject: "ENGL", fullMarks: 100, passMarks: 40, highest: 89.5, lowest: 23.5, total: 27 },
  { subject: "HPE", fullMarks: 100, passMarks: 40, highest: 93, lowest: 40, total: 27 },
  { subject: "MATH", fullMarks: 100, passMarks: 40, highest: 100, lowest: 0, total: 28 },
  { subject: "NEPA", fullMarks: 100, passMarks: 40, highest: 98, lowest: 0, total: 28 },
  { subject: "OPT.", fullMarks: 50, passMarks: 20, highest: 49, lowest: 0, total: 28 },
  { subject: "SAMA", fullMarks: 100, passMarks: 40, highest: 97, lowest: 20, total: 27 },
  { subject: "SCIE", fullMarks: 100, passMarks: 40, highest: 96, lowest: 38, total: 27 },
]

const students = [
  "AAYUMI TAMANG",
  "Aabhushan Acharya",
  "Aardip Basnet",
  "Aayush Chhantyal",
  "Abinam Lama",
  "Agrima Koirala",
  "Amriddhi Rajbhandari",
  "Anuva Giri",
  "Anzila Devkota",
  "Aric Kunwar",
  "Arushi Rimal",
  "Arya Karmacharya",
  "Lakshya Thapa",
  "Manish Raj Giri",
  "Miksha Kafle",
  "Pratik Bhattarai",
  "Rajkumar Rawat",
  "Riyaz Basnet",
  "Riyaz Chhetri",
  "Ronisha Shrestha",
  "Sahara Dahal",
  "Sajjan Adhikari",
  "Sartaz Malla",
  "Spandan Joshi",
  "Sumiran Gurung",
  "Suzix Balampaki Magar",
  "Yanis Shrestha",
]

const chartData = [
  { subject: "COMPUTER", average: 78 },
  { subject: "ENGLISH", average: 73 },
  { subject: "HPE", average: 32 },
  { subject: "MATHEMATICS", average: 60 },
  { subject: "NEPALI", average: 65 },
  { subject: "OPT. MATHS", average: 32 },
  { subject: "SCIENCE", average: 65 },
  { subject: "SOCIAL", average: 65 },
]

const radarData = [
  {
    subject: "HPE",
    "First Term": 85,
    "Mid Term": 78,
    "Second Term": 92,
  },
  {
    subject: "ENGLISH",
    "First Term": 72,
    "Mid Term": 68,
    "Second Term": 75,
  },
  {
    subject: "COMPUTER",
    "First Term": 88,
    "Mid Term": 85,
    "Second Term": 90,
  },
  {
    subject: "SCIENCE",
    "First Term": 65,
    "Mid Term": 70,
    "Second Term": 68,
  },
  {
    subject: "SAMAJIK ADHYAN",
    "First Term": 58,
    "Mid Term": 62,
    "Second Term": 65,
  },
  {
    subject: "OPT. MATHS",
    "First Term": 45,
    "Mid Term": 48,
    "Second Term": 52,
  },
  {
    subject: "NEPALI",
    "First Term": 70,
    "Mid Term": 75,
    "Second Term": 78,
  },
  {
    subject: "MATHEMATICS",
    "First Term": 55,
    "Mid Term": 60,
    "Second Term": 58,
  },
]

interface SubjectMarks {
  TH: number;
  PR: number;
  Total: number;
}

interface StudentMarksData {
  name: string;
  rank: number;
  percentage: number;
  grade: string;
  result: string;
  subjects: {
    [key: string]: SubjectMarks;
  };
}

// Import student marks data from the latest dashboard
const studentMarksData: StudentMarksData[] = [
  {
    name: "Ronisha Shrestha",
    rank: 1,
    percentage: 94.8,
    grade: "A",
    result: "PASS",
    subjects: {
      COMP: { TH: 49, PR: 49, Total: 98 },
      ENGL: { TH: 42, PR: 47, Total: 89 },
      HPE: { TH: 48, PR: 45, Total: 93 },
      MATH: { TH: 46, PR: 50, Total: 96 },
      NEPA: { TH: 46, PR: 49, Total: 95 },
      OPT: { TH: 49, PR: 0, Total: 49 },
      SAMA: { TH: 47, PR: 49, Total: 96 },
      SCIE: { TH: 47, PR: 48, Total: 95 },
    },
  },
  {
    name: "Amriddhi Rajbhandari",
    rank: 2,
    percentage: 92.5,
    grade: "A",
    result: "PASS",
    subjects: {
      COMP: { TH: 49.5, PR: 49, Total: 98.5 },
      ENGL: { TH: 41.5, PR: 47, Total: 88.5 },
      HPE: { TH: 46, PR: 45, Total: 91 },
      MATH: { TH: 50, PR: 50, Total: 100 },
      NEPA: { TH: 42, PR: 49, Total: 91 },
      OPT: { TH: 49, PR: 0, Total: 49 },
      SAMA: { TH: 43, PR: 46, Total: 89 },
      SCIE: { TH: 47, PR: 48, Total: 95 },
    },
  },
  {
    name: "AAYUMI TAMANG",
    rank: 17,
    percentage: 67.0,
    grade: "B",
    result: "PASS",
    subjects: {
      COMP: { TH: 27, PR: 40, Total: 67 },
      ENGL: { TH: 30, PR: 35, Total: 65 },
      HPE: { TH: 38, PR: 40, Total: 78 },
      MATH: { TH: 23, PR: 40, Total: 63 },
      NEPA: { TH: 23, PR: 40, Total: 63 },
      OPT: { TH: 25, PR: 0, Total: 25 },
      SAMA: { TH: 22, PR: 28, Total: 50 },
      SCIE: { TH: 37, PR: 44, Total: 81 },
    },
  },
  {
    name: "Yanis Shrestha",
    rank: 21,
    percentage: 58.9,
    grade: "C",
    result: "PASS",
    subjects: {
      COMP: { TH: 22, PR: 35, Total: 57 },
      ENGL: { TH: 29, PR: 45, Total: 74 },
      HPE: { TH: 33, PR: 30, Total: 63 },
      MATH: { TH: 10, PR: 35, Total: 45 },
      NEPA: { TH: 27, PR: 40, Total: 67 },
      OPT: { TH: 29, PR: 0, Total: 29 },
      SAMA: { TH: 20, PR: 30, Total: 50 },
      SCIE: { TH: 30, PR: 35, Total: 65 },
    },
  },
  {
    name: "Sartaz Malla",
    rank: 27,
    percentage: 51.0,
    grade: "C",
    result: "PASS",
    subjects: {
      COMP: { TH: 23.5, PR: 35, Total: 58.5 },
      ENGL: { TH: 21.5, PR: 25, Total: 46.5 },
      HPE: { TH: 27, PR: 30, Total: 57 },
      MATH: { TH: 23, PR: 35, Total: 58 },
      NEPA: { TH: 25, PR: 35, Total: 60 },
      OPT: { TH: 25, PR: 0, Total: 25 },
      SAMA: { TH: 15, PR: 20, Total: 35 },
      SCIE: { TH: 17, PR: 25, Total: 42 },
    },
  },
]

interface StudentData {
  subject: string;
  fullMarks: number;
  passMarks: number;
  highest: number;
  lowest: number;
  total: number;
}

interface SubjectMetrics {
  category: string;
  value: number;
}

export default function DashboardPage() {
  const [currentUser, setCurrentUser] = useState("")
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedSection, setSelectedSection] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("MATH")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("class-overview")
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const user = localStorage.getItem("currentUser")
    const classValue = localStorage.getItem("selectedClass")
    const section = localStorage.getItem("selectedSection")

    if (!user) {
      router.push("/")
      return
    }

    setCurrentUser(user)
    setSelectedClass(classValue || "")
    setSelectedSection(section || "")

    // Check if we should navigate to student-report tab
    const tab = searchParams.get("tab")
    if (tab === "student-report") {
      setActiveTab("student-report")
    }
  }, [router, searchParams])

  const handleLogout = () => {
    localStorage.clear()
    router.push("/")
  }

  const formatClassName = (className: string) => {
    return className.replace("grade-", "Grade ").replace("-", " ")
  }

  const formatSectionName = (section: string) => {
    return section.charAt(0).toUpperCase() + section.slice(1)
  }

  const getSubjectData = (subjectCode: string): SubjectMetrics[] | null => {
    const subject = subjectData.find((s) => s.subject === subjectCode)
    if (!subject) return null

    // Calculate average (just a mock value for demonstration)
    const average = Math.round((subject.highest + subject.lowest) / 2)

    return [
      { category: "Highest", value: subject.highest },
      { category: "Average", value: average },
      { category: "Lowest", value: subject.lowest },
    ]
  }

  const handleViewHistoricDashboard = (studentName: string) => {
    router.push(`/historic-dashboard/${encodeURIComponent(studentName)}`)
  }

  const handleViewLatestDashboard = (studentName: string) => {
    router.push(`/latest-dashboard/${encodeURIComponent(studentName)}`)
  }

  const handleViewStudentAnalysis = (studentName: string) => {
    router.push(`/student-analysis/${encodeURIComponent(studentName)}`)
  }

  const handleViewOverallAnalysis = () => {
    router.push("/overall-analysis")
  }

  // Filter students based on search query
  const filteredStudents = students.filter((student) => student.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleDownloadAllDashboards = async () => {
    try {
      // Show loading state to user
      alert("Starting PDF generation. This may take a few moments...")

      const pdf = new jsPDF('p', 'mm', 'a4')
      let firstPage = true

      // Create a container div for rendering dashboards
      const container = document.createElement('div')
      container.style.position = 'absolute'
      container.style.left = '-9999px'
      container.style.width = '1024px' // Fixed width for consistent rendering
      document.body.appendChild(container)

      for (const student of students) {
        try {
          // Create the dashboard content
          const studentData = studentMarksData.find(s => s.name === student)
          if (!studentData) continue

          // Create dashboard HTML
          container.innerHTML = `
            <div class="min-h-screen bg-white p-8">
              <!-- Header -->
              <div class="bg-red-600 text-white p-4 text-center mb-6">
                <h1 class="text-lg font-bold">
                  MARKSHEET ANALYSIS OF SECOND TERMINAL EXAM OF GRADE 8 (HERCULES)
                </h1>
              </div>

              <!-- Student Info Grid -->
              <div class="grid grid-cols-5 gap-4 mb-6">
                <div class="bg-white rounded-lg p-4 shadow">
                  <h3 class="text-sm text-gray-600 mb-1">Name of Student</h3>
                  <p class="text-blue-600 font-bold">${studentData.name}</p>
                </div>
                <div class="bg-white rounded-lg p-4 shadow">
                  <h3 class="text-sm text-gray-600 mb-1">Grade</h3>
                  <p class="font-bold">${studentData.grade}</p>
                </div>
                <div class="bg-white rounded-lg p-4 shadow">
                  <h3 class="text-sm text-gray-600 mb-1">Rank</h3>
                  <p class="text-blue-600 font-bold">${studentData.rank}</p>
                </div>
                <div class="bg-white rounded-lg p-4 shadow">
                  <h3 class="text-sm text-gray-600 mb-1">Result</h3>
                  <p class="text-green-600 font-bold">${studentData.result}</p>
                </div>
                <div class="bg-white rounded-lg p-4 shadow">
                  <h3 class="text-sm text-gray-600 mb-1">Percentage</h3>
                  <p class="text-blue-600 font-bold">${studentData.percentage}%</p>
                </div>
              </div>

              <!-- Rank Scale -->
              <div class="mb-6">
                <h2 class="text-lg font-bold mb-4">Determining a Student's Rank in Each Subject Within the Class</h2>
                <div class="flex mb-2">
                  <div class="flex-1 bg-green-500 text-white text-center p-1">A</div>
                  <div class="flex-1 bg-blue-500 text-white text-center p-1">B</div>
                  <div class="flex-1 bg-orange-500 text-white text-center p-1">C</div>
                  <div class="flex-1 bg-yellow-500 text-white text-center p-1">D</div>
                  <div class="flex-1 bg-red-500 text-white text-center p-1">E</div>
                </div>
                <div class="flex justify-between text-sm text-gray-600">
                  <span>1</span>
                  <span>6</span>
                  <span>12</span>
                  <span>18</span>
                  <span>24</span>
                  <span>30</span>
                </div>
              </div>

              <!-- Subject Performance Table -->
              <div class="overflow-x-auto">
                <table class="w-full border-collapse bg-white shadow">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="border border-gray-200 p-3 text-left">Subject</th>
                      <th class="border border-gray-200 p-3 text-center">Theory Marks</th>
                      <th class="border border-gray-200 p-3 text-center">Practical Marks</th>
                      <th class="border border-gray-200 p-3 text-center">Total</th>
                      <th class="border border-gray-200 p-3 text-center">Ranking</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${Object.entries(studentData.subjects)
                      .map(([subject, marks]) => {
                        let rankingClass = ''
                        const total = marks.Total
                        if (total >= 90) rankingClass = 'bg-green-500'
                        else if (total >= 80) rankingClass = 'bg-blue-500'
                        else if (total >= 70) rankingClass = 'bg-orange-500'
                        else if (total >= 60) rankingClass = 'bg-yellow-500'
                        else rankingClass = 'bg-red-500'

                        return `
                          <tr>
                            <td class="border border-gray-200 p-3">${subject}</td>
                            <td class="border border-gray-200 p-3 text-center">${marks.TH}</td>
                            <td class="border border-gray-200 p-3 text-center">${marks.PR}</td>
                            <td class="border border-gray-200 p-3 text-center font-bold">${marks.Total}</td>
                            <td class="border border-gray-200 p-3 text-center">
                              <span class="px-3 py-1 rounded text-white ${rankingClass}">
                                ${total >= 90 ? 'A' : total >= 80 ? 'B' : total >= 70 ? 'C' : total >= 60 ? 'D' : 'E'}
                              </span>
                            </td>
                          </tr>
                        `
                      })
                      .join('')}
                  </tbody>
                </table>
              </div>

              <div class="text-sm text-gray-500 text-center mt-6">
                Generated on ${new Date().toLocaleDateString()} | School Management System
              </div>
            </div>
          `

          // Wait for styles to be applied
          await new Promise(resolve => setTimeout(resolve, 100))

          // Convert to canvas
          const canvas = await html2canvas(container.firstElementChild as HTMLElement, {
            scale: 2,
            logging: false,
            useCORS: true,
            backgroundColor: '#ffffff'
          })

          // Add new page if not the first page
          if (!firstPage) {
            pdf.addPage()
          }
          firstPage = false

          // Add to PDF
          const imgData = canvas.toDataURL('image/png')
          pdf.addImage(imgData, 'PNG', 0, 0, 210, 297) // A4 dimensions

        } catch (err) {
          console.error(`Error processing student ${student}:`, err)
          continue // Continue with next student even if one fails
        }
      }

      // Clean up
      document.body.removeChild(container)

      // Save the PDF
      pdf.save('latest_student_dashboards.pdf')
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-semibold">School Management System</h1>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Welcome, Ram Thapa!</h2>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-gray-600">Including your average rating score:</span>
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </div>
                  <span className="ml-2 text-lg font-semibold text-gray-700">4.8/5.0</span>
                </div>
              </div>
              <p className="text-gray-600">
                Class Teacher of {formatClassName(selectedClass)} - {formatSectionName(selectedSection)}
              </p>
            </div>
            <Button
              onClick={() => router.push('/dashboard/rate-teachers')}
              className="bg-purple-600 hover:bg-purple-700 text-white gap-2"
            >
              <Star className="h-4 w-4" />
              Rate Teachers
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Grade</p>
                  <p className="text-3xl font-bold text-blue-600">8</p>
                  <p className="text-sm text-gray-500">Current Grade Level</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <GraduationCap className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Section</p>
                  <p className="text-3xl font-bold text-green-600">Hercules</p>
                  <p className="text-sm text-gray-500">Class Section</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Students</p>
                  <p className="text-3xl font-bold text-purple-600">28</p>
                  <p className="text-sm text-gray-500">Enrolled Students</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Overall Analysis Button */}
        <div className="mb-6">
          <Button onClick={handleViewOverallAnalysis} className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
            <FileText className="h-4 w-4" />
            View Overall Analysis
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="class-overview" className="gap-2">
              <Users className="h-4 w-4" />
              Class Overview
            </TabsTrigger>
            <TabsTrigger value="subject-overview" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Subject Overview
            </TabsTrigger>
            <TabsTrigger value="student-report" className="gap-2">
              <FileText className="h-4 w-4" />
              Student Wise Report
            </TabsTrigger>
          </TabsList>

          <TabsContent value="class-overview">
            <Card>
              <CardHeader>
                <CardTitle>Class Performance Overview</CardTitle>
                <CardDescription>Average marks across all subjects for Grade 8 - Hercules</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    average: {
                      label: "Average Score",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[400px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <XAxis dataKey="subject" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="average" fill="var(--color-average)" radius={4} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subject-overview">
            <div className="space-y-6">
              {/* Subject Filter Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {subjectData.map((subject) => (
                  <Card
                    key={subject.subject}
                    className={`cursor-pointer transition-colors ${
                      selectedSubject === subject.subject
                        ? "bg-gray-900 text-white hover:bg-gray-800"
                        : "bg-white hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedSubject(subject.subject)}
                  >
                    <CardContent className="p-6 text-center">
                      <h3 className={`font-bold ${selectedSubject === subject.subject ? "text-white" : ""}`}>
                        {subject.subject}
                      </h3>
                      <p
                        className={`text-sm ${selectedSubject === subject.subject ? "text-gray-200" : "text-gray-500"}`}
                      >
                        Avg: {Math.round((subject.highest + subject.lowest) / 2)}%
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>{selectedSubject} Performance</CardTitle>
                  <CardDescription>Detailed performance metrics for {selectedSubject}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <ChartContainer
                        config={{
                          value: {
                            label: "Score",
                            color: "hsl(var(--chart-1))",
                          },
                        }}
                        className="h-[300px]"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={getSubjectData(selectedSubject) || []}>
                            <XAxis dataKey="category" />
                            <YAxis domain={[0, 100]} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="value" fill="var(--color-value)" radius={4} />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                    <div className="space-y-4">
                      {getSubjectData(selectedSubject)?.map((item, index) => (
                        <div key={item.category} className="text-center">
                          <div
                            className={`text-4xl font-bold ${
                              item.category === "Highest"
                                ? "text-green-600"
                                : item.category === "Average"
                                  ? "text-blue-600"
                                  : "text-orange-600"
                            }`}
                          >
                            {item.value}
                          </div>
                          <div className="text-sm text-gray-600">{item.category} Score</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Subject Overview</CardTitle>
                  <CardDescription>Complete performance metrics for all subjects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 px-4 py-2 text-left">Subject</th>
                          <th className="border border-gray-300 px-4 py-2 text-center">Full Marks</th>
                          <th className="border border-gray-300 px-4 py-2 text-center">Pass Marks</th>
                          <th className="border border-gray-300 px-4 py-2 text-center">Highest Score</th>
                          <th className="border border-gray-300 px-4 py-2 text-center">Lowest Score</th>
                          <th className="border border-gray-300 px-4 py-2 text-center">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subjectData.map((subject, index) => (
                          <tr
                            key={index}
                            className={`hover:bg-gray-50 ${subject.subject === selectedSubject ? "bg-blue-50" : ""}`}
                            onClick={() => setSelectedSubject(subject.subject)}
                            style={{ cursor: "pointer" }}
                          >
                            <td className="border border-gray-300 px-4 py-2 font-medium">{subject.subject}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{subject.fullMarks}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{subject.passMarks}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{subject.highest}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{subject.lowest}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{subject.total}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="student-report">
            <Card>
              <CardHeader>
                <CardTitle>Student List</CardTitle>
                <CardDescription>Complete list of students in Grade 8 - Hercules</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Search Bar */}
                <div className="mb-6">
                  <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        type="text"
                        placeholder="Search students by name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full max-w-md"
                      />
                    </div>
                    <Button
                      onClick={handleDownloadAllDashboards}
                      className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download All Latest Dashboards
                    </Button>
                    <Button
                      onClick={handleDownloadAllDashboards}
                      className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download All Historic Dashboards
                    </Button>
                  </div>
                  {searchQuery && (
                    <p className="text-sm text-gray-600 mt-2">
                      Showing {filteredStudents.length} of {students.length} students
                    </p>
                  )}
                </div>

                {/* Table Structure */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-200 rounded-lg">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-200">
                          Roll No.
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-200">
                          Name
                        </th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Dashboards</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.length > 0 ? (
                        filteredStudents.map((student, index) => {
                          // Find the original index for numbering
                          const originalIndex = students.findIndex((s) => s === student)
                          return (
                            <tr key={student} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                              {/* Roll No. Column */}
                              <td className="px-4 py-4 border-r border-gray-200">
                                <div className="flex items-center">
                                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                                    {originalIndex + 1}
                                  </div>
                                </div>
                              </td>

                              {/* Name Column */}
                              <td className="px-4 py-4 border-r border-gray-200">
                                <div className="font-medium text-gray-900">{student}</div>
                              </td>

                              {/* Dashboards Column */}
                              <td className="px-4 py-4">
                                <div className="flex flex-col lg:flex-row items-center justify-center gap-2">
                                  {/* View Section */}
                                  <div className="flex flex-col sm:flex-row gap-2">
                                    <div className="flex flex-col gap-1">
                                      <span className="text-xs font-medium text-gray-600 text-center">View</span>
                                      <div className="flex gap-1">
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100 text-xs px-2 py-1"
                                          onClick={() => handleViewLatestDashboard(student)}
                                        >
                                          Latest
                                        </Button>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100 text-xs px-2 py-1"
                                          onClick={() => handleViewHistoricDashboard(student)}
                                        >
                                          Historic
                                        </Button>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Download Section */}
                                  <div className="flex flex-col sm:flex-row gap-2">
                                    <div className="flex flex-col gap-1">
                                      <span className="text-xs font-medium text-gray-600 text-center">Download</span>
                                      <div className="flex gap-1">
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100 text-xs px-2 py-1"
                                        >
                                          Latest
                                        </Button>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100 text-xs px-2 py-1"
                                        >
                                          Historic
                                        </Button>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Overall Analysis */}
                                  <div className="flex flex-col gap-1">
                                    <span className="text-xs font-medium text-gray-600 text-center">Analysis</span>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100 text-xs px-2 py-1"
                                      onClick={() => handleViewStudentAnalysis(student)}
                                    >
                                      Student Performance Summary
                                    </Button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )
                        })
                      ) : (
                        <tr>
                          <td colSpan={3} className="px-4 py-8 text-center text-gray-500">
                            No students found matching "{searchQuery}"
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Mobile-friendly alternative for very small screens */}
                <div className="block sm:hidden mt-6">
                  <div className="text-sm text-gray-600 mb-4">Mobile view - {filteredStudents.length} students</div>
                  <div className="space-y-3">
                    {filteredStudents.map((student, index) => {
                      const originalIndex = students.findIndex((s) => s === student)
                      return (
                        <div key={student} className="bg-white border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                              {originalIndex + 1}
                            </div>
                            <div className="font-medium text-gray-900">{student}</div>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <div className="text-xs font-medium text-gray-600 mb-1">View</div>
                              <div className="flex gap-1">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100 text-xs flex-1"
                                  onClick={() => handleViewLatestDashboard(student)}
                                >
                                  Latest
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100 text-xs flex-1"
                                  onClick={() => handleViewHistoricDashboard(student)}
                                >
                                  Historic
                                </Button>
                              </div>
                            </div>

                            <div>
                              <div className="text-xs font-medium text-gray-600 mb-1">Download</div>
                              <div className="flex gap-1">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100 text-xs flex-1"
                                >
                                  Latest
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100 text-xs flex-1"
                                >
                                  Historic
                                </Button>
                              </div>
                            </div>
                          </div>

                          <div className="mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100 text-xs w-full"
                              onClick={() => handleViewStudentAnalysis(student)}
                            >
                              Student Performance Summary
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
