"use client"

import { Label } from "@/components/ui/label"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { GraduationCap, LogOut, Users, Search, BarChart3 } from "lucide-react"
import { XAxis, YAxis, ResponsiveContainer, LineChart, Line, CartesianGrid, Tooltip, Legend } from "recharts"

// Available classes and sections
const availableClasses = [
  { value: "grade-7", label: "Grade 7" },
  { value: "grade-8", label: "Grade 8" },
]

const availableSections = [
  { value: "chasers", label: "Chasers" },
  { value: "hercules", label: "Hercules" },
]

// Use the same student list as Class Teacher
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

// Mock data for charts
const performanceData = {
  mathematics: {
    "grade-7": {
      chasers: [
        { name: "A", count: 5 },
        { name: "B", count: 8 },
        { name: "C", count: 10 },
        { name: "D", count: 4 },
        { name: "E", count: 1 },
      ],
      hercules: [
        { name: "A", count: 7 },
        { name: "B", count: 10 },
        { name: "C", count: 6 },
        { name: "D", count: 3 },
        { name: "E", count: 0 },
      ],
    },
    "grade-8": {
      chasers: [
        { name: "A", count: 6 },
        { name: "B", count: 9 },
        { name: "C", count: 8 },
        { name: "D", count: 3 },
        { name: "E", count: 2 },
      ],
      hercules: [
        { name: "A", count: 8 },
        { name: "B", count: 12 },
        { name: "C", count: 5 },
        { name: "D", count: 2 },
        { name: "E", count: 1 },
      ],
    },
  },
  science: {
    "grade-7": {
      chasers: [
        { name: "A", count: 4 },
        { name: "B", count: 7 },
        { name: "C", count: 11 },
        { name: "D", count: 5 },
        { name: "E", count: 1 },
      ],
      hercules: [
        { name: "A", count: 6 },
        { name: "B", count: 9 },
        { name: "C", count: 8 },
        { name: "D", count: 3 },
        { name: "E", count: 0 },
      ],
    },
    "grade-8": {
      chasers: [
        { name: "A", count: 5 },
        { name: "B", count: 8 },
        { name: "C", count: 9 },
        { name: "D", count: 4 },
        { name: "E", count: 2 },
      ],
      hercules: [
        { name: "A", count: 7 },
        { name: "B", count: 10 },
        { name: "C", count: 7 },
        { name: "D", count: 3 },
        { name: "E", count: 1 },
      ],
    },
  },
}

const trendData = {
  mathematics: [
    { month: "Jan", "Grade 7 Chasers": 65, "Grade 7 Hercules": 70, "Grade 8 Chasers": 68, "Grade 8 Hercules": 75 },
    { month: "Feb", "Grade 7 Chasers": 68, "Grade 7 Hercules": 72, "Grade 8 Chasers": 70, "Grade 8 Hercules": 78 },
    { month: "Mar", "Grade 7 Chasers": 67, "Grade 7 Hercules": 75, "Grade 8 Chasers": 72, "Grade 8 Hercules": 80 },
    { month: "Apr", "Grade 7 Chasers": 70, "Grade 7 Hercules": 74, "Grade 8 Chasers": 75, "Grade 8 Hercules": 82 },
    { month: "May", "Grade 7 Chasers": 72, "Grade 7 Hercules": 78, "Grade 8 Chasers": 76, "Grade 8 Hercules": 85 },
  ],
  science: [
    { month: "Jan", "Grade 7 Chasers": 62, "Grade 7 Hercules": 68, "Grade 8 Chasers": 65, "Grade 8 Hercules": 72 },
    { month: "Feb", "Grade 7 Chasers": 65, "Grade 7 Hercules": 70, "Grade 8 Chasers": 68, "Grade 8 Hercules": 75 },
    { month: "Mar", "Grade 7 Chasers": 64, "Grade 7 Hercules": 72, "Grade 8 Chasers": 70, "Grade 8 Hercules": 77 },
    { month: "Apr", "Grade 7 Chasers": 68, "Grade 7 Hercules": 73, "Grade 8 Chasers": 72, "Grade 8 Hercules": 79 },
    { month: "May", "Grade 7 Chasers": 70, "Grade 7 Hercules": 75, "Grade 8 Chasers": 74, "Grade 8 Hercules": 82 },
  ],
}

// Pass rate trend data (percentage of students passing each term)
const passRateData = {
  mathematics: {
    "grade-7": {
      chasers: [
        { term: "First Term", passRate: 75 },
        { term: "Second Term", passRate: 78 },
        { term: "Third Term", passRate: 82 },
      ],
      hercules: [
        { term: "First Term", passRate: 80 },
        { term: "Second Term", passRate: 83 },
        { term: "Third Term", passRate: 85 },
      ],
    },
    "grade-8": {
      chasers: [
        { term: "First Term", passRate: 72 },
        { term: "Second Term", passRate: 76 },
        { term: "Third Term", passRate: 79 },
      ],
      hercules: [
        { term: "First Term", passRate: 85 },
        { term: "Second Term", passRate: 88 },
        { term: "Third Term", passRate: 90 },
      ],
    },
  },
  science: {
    "grade-7": {
      chasers: [
        { term: "First Term", passRate: 70 },
        { term: "Second Term", passRate: 74 },
        { term: "Third Term", passRate: 78 },
      ],
      hercules: [
        { term: "First Term", passRate: 78 },
        { term: "Second Term", passRate: 81 },
        { term: "Third Term", passRate: 84 },
      ],
    },
    "grade-8": {
      chasers: [
        { term: "First Term", passRate: 68 },
        { term: "Second Term", passRate: 72 },
        { term: "Third Term", passRate: 76 },
      ],
      hercules: [
        { term: "First Term", passRate: 82 },
        { term: "Second Term", passRate: 85 },
        { term: "Third Term", passRate: 88 },
      ],
    },
  },
}

// Mock student data with performance metrics for each student
const generateStudentData = (studentName, index) => {
  // Generate consistent but varied data based on student name and index
  const baseMarks = 60 + ((index * 3) % 40) // Varies from 60-100
  const variation = studentName.length % 10 // Small variation based on name

  return {
    id: index + 1,
    name: studentName,
    marks: Math.min(100, baseMarks + variation),
    grade:
      baseMarks + variation >= 90
        ? "A"
        : baseMarks + variation >= 80
          ? "B"
          : baseMarks + variation >= 70
            ? "C"
            : baseMarks + variation >= 60
              ? "D"
              : "E",
    rank: index + 1,
  }
}

export default function SubjectDashboardPage() {
  // Initialize state with proper defaults
  const [currentUser, setCurrentUser] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedClasses, setSelectedClasses] = useState([])
  const [selectedSections, setSelectedSections] = useState([])
  const [activeTab, setActiveTab] = useState("overall-analysis") // Always start with overall-analysis
  const [filterClass, setFilterClass] = useState("")
  const [filterSection, setFilterSection] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [isInitialized, setIsInitialized] = useState(false) // Track initialization
  const router = useRouter()

  // Memoized handlers to prevent recreation on every render
  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab)
  }, [])

  const handleLogout = useCallback(() => {
    localStorage.clear()
    router.push("/")
  }, [router])

  const handleViewLatestDashboard = useCallback(
    (student) => {
      router.push(`/subject-latest-dashboard/${encodeURIComponent(student.name)}?subject=${selectedSubject}`)
    },
    [router, selectedSubject],
  )

  const handleViewHistoricDashboard = useCallback(
    (student) => {
      router.push(`/subject-historic-dashboard/${encodeURIComponent(student.name)}?subject=${selectedSubject}`)
    },
    [router, selectedSubject],
  )

  // Initialize component state
  useEffect(() => {
    const user = localStorage.getItem("currentUser")
    const subject = localStorage.getItem("selectedSubject")
    const classes = JSON.parse(localStorage.getItem("selectedClasses") || "[]")
    const sections = JSON.parse(localStorage.getItem("selectedSections") || "[]")

    if (!user || !subject) {
      router.push("/")
      return
    }

    // Reset all state to ensure clean initialization
    setCurrentUser(user)
    setSelectedSubject(subject)
    setSelectedClasses(classes)
    setSelectedSections(sections)

    // Always reset to overall-analysis tab on component mount
    setActiveTab("overall-analysis")

    // Set initial filter values if available
    if (classes.length > 0) {
      setFilterClass(classes[0])
    }
    if (sections.length > 0) {
      setFilterSection(sections[0])
    }

    // Mark as initialized
    setIsInitialized(true)
  }, [router])

  // Cleanup effect to reset state when component unmounts
  useEffect(() => {
    return () => {
      // Reset state on unmount to prevent stale state issues
      setActiveTab("overall-analysis")
      setSearchQuery("")
      setIsInitialized(false)
    }
  }, [])

  const formatClassName = (className) => {
    return className.replace("grade-", "Grade ").replace("-", " ")
  }

  const formatSectionName = (section) => {
    return section.charAt(0).toUpperCase() + section.slice(1)
  }

  const formatSubjectName = (subject) => {
    return subject.charAt(0).toUpperCase() + subject.slice(1)
  }

  // Get filtered students based on search query and selected filters
  const getFilteredStudents = useCallback(() => {
    if (!selectedSubject || !filterClass || !filterSection) return []

    // Generate student data for the selected class/section
    const studentsWithData = students.map((studentName, index) => generateStudentData(studentName, index))

    if (!searchQuery) return studentsWithData

    return studentsWithData.filter((student) => student.name.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [selectedSubject, filterClass, filterSection, searchQuery])

  const filteredStudents = getFilteredStudents()

  // Get combined performance data for selected classes and sections
  const getCombinedPerformanceData = useCallback(() => {
    if (!selectedSubject) return []

    const combinedData = [
      { name: "A", count: 0 },
      { name: "B", count: 0 },
      { name: "C", count: 0 },
      { name: "D", count: 0 },
      { name: "E", count: 0 },
    ]

    selectedClasses.forEach((cls) => {
      selectedSections.forEach((section) => {
        const data = performanceData[selectedSubject]?.[cls]?.[section] || []
        data.forEach((item, index) => {
          combinedData[index].count += item.count
        })
      })
    })

    return combinedData
  }, [selectedSubject, selectedClasses, selectedSections])

  // Get combined pass rate data for selected classes and sections
  const getCombinedPassRateData = useCallback(() => {
    if (!selectedSubject) return []

    const combinedData = []
    const terms = ["First Term", "Second Term", "Third Term"]

    terms.forEach((term) => {
      const termData = { term }

      selectedClasses.forEach((cls) => {
        selectedSections.forEach((section) => {
          const data = passRateData[selectedSubject]?.[cls]?.[section] || []
          const termInfo = data.find((d) => d.term === term)
          const key = `${formatClassName(cls)} ${formatSectionName(section)}`
          termData[key] = termInfo ? termInfo.passRate : 0
        })
      })

      combinedData.push(termData)
    })

    return combinedData
  }, [selectedSubject, selectedClasses, selectedSections])

  // Calculate average marks for a class/section combination
  const calculateAverageMarks = useCallback((cls, section) => {
    const studentsInSection = students.map((studentName, index) => generateStudentData(studentName, index))
    const avgMarks = studentsInSection.reduce((sum, student) => sum + student.marks, 0) / studentsInSection.length
    return avgMarks
  }, [])

  // Don't render until properly initialized
  if (!isInitialized) {
    return <div className="p-8 text-center">Loading...</div>
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
          <h2 className="text-3xl font-bold mb-2">Welcome, {currentUser}!</h2>
          <p className="text-gray-600">Subject Teacher - {formatSubjectName(selectedSubject)}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedClasses.map((cls) => (
              <span key={cls} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {formatClassName(cls)}
              </span>
            ))}
            {selectedSections.map((section) => (
              <span key={section} className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {formatSectionName(section)}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons - Enhanced with better state management */}
        <div className="flex flex-wrap gap-4 mb-6">
          <Button
            variant={activeTab === "overall-analysis" ? "default" : "outline"}
            onClick={() => handleTabChange("overall-analysis")}
            className="gap-2"
            type="button" // Explicitly set button type
          >
            <BarChart3 className="h-4 w-4" />
            Overall Analysis
          </Button>
          <Button
            variant={activeTab === "student-list" ? "default" : "outline"}
            onClick={() => handleTabChange("student-list")}
            className="gap-2"
            type="button" // Explicitly set button type
          >
            <Users className="h-4 w-4" />
            Student List
          </Button>
        </div>

        {/* Debug info - Remove in production */}
        {process.env.NODE_ENV === "development" && (
          <div className="mb-4 p-2 bg-yellow-100 text-xs text-yellow-800 rounded">
            Debug: activeTab = {activeTab}, isInitialized = {isInitialized.toString()}
          </div>
        )}

        {/* Content based on active tab */}
        {activeTab === "overall-analysis" ? (
          <div className="space-y-6">
            {/* Performance Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Trend</CardTitle>
                <CardDescription>
                  Monthly average performance trend for {formatSubjectName(selectedSubject)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData[selectedSubject]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      {selectedClasses.includes("grade-7") && selectedSections.includes("chasers") && (
                        <Line type="monotone" dataKey="Grade 7 Chasers" stroke="#8884d8" activeDot={{ r: 8 }} />
                      )}
                      {selectedClasses.includes("grade-7") && selectedSections.includes("hercules") && (
                        <Line type="monotone" dataKey="Grade 7 Hercules" stroke="#82ca9d" activeDot={{ r: 8 }} />
                      )}
                      {selectedClasses.includes("grade-8") && selectedSections.includes("chasers") && (
                        <Line type="monotone" dataKey="Grade 8 Chasers" stroke="#ff7300" activeDot={{ r: 8 }} />
                      )}
                      {selectedClasses.includes("grade-8") && selectedSections.includes("hercules") && (
                        <Line type="monotone" dataKey="Grade 8 Hercules" stroke="#0088fe" activeDot={{ r: 8 }} />
                      )}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Pass Rate Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Pass Rate Trend</CardTitle>
                <CardDescription>
                  Pass rate progression across terms for {formatSubjectName(selectedSubject)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={getCombinedPassRateData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="term" />
                      <YAxis domain={[0, 100]} label={{ value: "Pass Rate (%)", angle: -90, position: "insideLeft" }} />
                      <Tooltip formatter={(value) => [`${value}%`, "Pass Rate"]} />
                      <Legend />
                      {selectedClasses.includes("grade-7") && selectedSections.includes("chasers") && (
                        <Line
                          type="monotone"
                          dataKey="Grade 7 Chasers"
                          stroke="#8884d8"
                          strokeWidth={3}
                          activeDot={{ r: 8 }}
                        />
                      )}
                      {selectedClasses.includes("grade-7") && selectedSections.includes("hercules") && (
                        <Line
                          type="monotone"
                          dataKey="Grade 7 Hercules"
                          stroke="#82ca9d"
                          strokeWidth={3}
                          activeDot={{ r: 8 }}
                        />
                      )}
                      {selectedClasses.includes("grade-8") && selectedSections.includes("chasers") && (
                        <Line
                          type="monotone"
                          dataKey="Grade 8 Chasers"
                          stroke="#ff7300"
                          strokeWidth={3}
                          activeDot={{ r: 8 }}
                        />
                      )}
                      {selectedClasses.includes("grade-8") && selectedSections.includes("hercules") && (
                        <Line
                          type="monotone"
                          dataKey="Grade 8 Hercules"
                          stroke="#0088fe"
                          strokeWidth={3}
                          activeDot={{ r: 8 }}
                        />
                      )}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Class Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Class Comparison</CardTitle>
                <CardDescription>Average marks comparison between classes and sections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedClasses.map((cls) => (
                    <div key={cls} className="space-y-4">
                      <h3 className="text-lg font-medium">{formatClassName(cls)}</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {selectedSections.map((section) => {
                          const avgMarks = calculateAverageMarks(cls, section)

                          return (
                            <Card key={section}>
                              <CardContent className="p-6">
                                <div className="text-center">
                                  <h4 className="text-sm text-gray-500 mb-1">{formatSectionName(section)}</h4>
                                  <p className="text-3xl font-bold text-blue-600">{avgMarks.toFixed(1)}</p>
                                  <p className="text-sm text-gray-500">Average Marks</p>
                                </div>
                              </CardContent>
                            </Card>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Student List</CardTitle>
              <CardDescription>View and manage students for {formatSubjectName(selectedSubject)}</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <Label htmlFor="filter-class" className="text-sm font-medium">
                    Class
                  </Label>
                  <Select value={filterClass} onValueChange={setFilterClass}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedClasses.map((cls) => (
                        <SelectItem key={cls} value={cls}>
                          {formatClassName(cls)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="filter-section" className="text-sm font-medium">
                    Section
                  </Label>
                  <Select value={filterSection} onValueChange={setFilterSection}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select section" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedSections.map((section) => (
                        <SelectItem key={section} value={section}>
                          {formatSectionName(section)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="search" className="text-sm font-medium">
                    Search
                  </Label>
                  <div className="relative mt-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="search"
                      type="text"
                      placeholder="Search students by name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              {/* Student Table */}
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
                        const originalIndex = students.findIndex((s) => s === student.name)
                        return (
                          <tr
                            key={student.name}
                            className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                          >
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
                              <div className="font-medium text-gray-900">{student.name}</div>
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
                                        type="button"
                                      >
                                        Latest
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100 text-xs px-2 py-1"
                                        onClick={() => handleViewHistoricDashboard(student)}
                                        type="button"
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
                                        type="button"
                                      >
                                        Latest
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100 text-xs px-2 py-1"
                                        type="button"
                                      >
                                        Historic
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )
                      })
                    ) : (
                      <tr>
                        <td colSpan={3} className="px-4 py-8 text-center text-gray-500">
                          {searchQuery ? `No students found matching "${searchQuery}"` : "No students available"}
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
                    const originalIndex = students.findIndex((s) => s === student.name)
                    return (
                      <div key={student.name} className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                            {originalIndex + 1}
                          </div>
                          <div className="font-medium text-gray-900">{student.name}</div>
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
                                type="button"
                              >
                                Latest
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100 text-xs flex-1"
                                onClick={() => handleViewHistoricDashboard(student)}
                                type="button"
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
                                type="button"
                              >
                                Latest
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100 text-xs flex-1"
                                type="button"
                              >
                                Historic
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
