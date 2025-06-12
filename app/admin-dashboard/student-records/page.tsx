"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Download, Search } from "lucide-react"

// Mock data for classes and sections
const classes = ["Grade 8", "Grade 9", "Grade 10"]
const sections = ["Hercules", "Phoenix", "Dragon"]

// Mock student data (you would fetch this from your backend)
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

export default function StudentRecordsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [globalSearchQuery, setGlobalSearchQuery] = useState("")
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedSection, setSelectedSection] = useState("")

  // Filter students based on search query and global search
  const filteredStudents = students.filter((student) => {
    const matchesLocalSearch = student.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (students.indexOf(student) + 1).toString().includes(searchQuery)
    const matchesGlobalSearch = student.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
      (students.indexOf(student) + 1).toString().includes(globalSearchQuery)
    return matchesLocalSearch && matchesGlobalSearch
  })

  const handleViewLatestDashboard = (studentName: string) => {
    router.push(`/latest-dashboard/${encodeURIComponent(studentName)}`)
  }

  const handleViewHistoricDashboard = (studentName: string) => {
    router.push(`/historic-dashboard/${encodeURIComponent(studentName)}`)
  }

  const handleViewStudentAnalysis = (studentName: string) => {
    router.push(`/student-analysis/${encodeURIComponent(studentName)}`)
  }

  const handleDownloadAllLatestDashboards = () => {
    // Implement download functionality
    console.log("Downloading all latest dashboards")
  }

  const handleDownloadAllHistoricDashboards = () => {
    // Implement download functionality
    console.log("Downloading all historic dashboards")
  }

  const handleBackClick = () => {
    router.push("/admin-dashboard")
  }

  const showTable = selectedClass !== "" && selectedSection !== ""

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
            <h1 className="text-xl font-semibold">Student Records</h1>
          </div>
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search across all students..."
              value={globalSearchQuery}
              onChange={(e) => setGlobalSearchQuery(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Student List</CardTitle>
            <CardDescription>
              {showTable 
                ? `Complete list of students in ${selectedClass} - ${selectedSection}`
                : "Please select a class and section to view students"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Filters and Search */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls} value={cls}>
                      {cls}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedSection} onValueChange={setSelectedSection}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Section" />
                </SelectTrigger>
                <SelectContent>
                  {sections.map((section) => (
                    <SelectItem key={section} value={section}>
                      {section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {showTable && (
                <>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Search students by name or roll number..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleDownloadAllLatestDashboards}
                      className="bg-blue-600 hover:bg-blue-700 text-white gap-2 flex-1"
                    >
                      <Download className="h-4 w-4" />
                      Latest
                    </Button>
                    <Button
                      onClick={handleDownloadAllHistoricDashboards}
                      className="bg-blue-600 hover:bg-blue-700 text-white gap-2 flex-1"
                    >
                      <Download className="h-4 w-4" />
                      Historic
                    </Button>
                  </div>
                </>
              )}
            </div>

            {/* Student Table */}
            {showTable && (
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
                      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">
                        Dashboards
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student, index) => (
                      <tr key={student} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4 border-r border-gray-200">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                              {index + 1}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 border-r border-gray-200">
                          <div className="font-medium text-gray-900">{student}</div>
                        </td>
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

                            {/* Analysis Section */}
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
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 