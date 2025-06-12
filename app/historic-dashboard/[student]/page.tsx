"use client"

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, GraduationCap } from "lucide-react"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  LabelList,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

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

const trendData = {
  COMPUTER: [
    { term: "First Term", value: 85.0 },
    { term: "Third Quarterly", value: 78.0 },
    { term: "Final Term", value: 88.0 },
    { term: "Second Term", value: 89.0 },
    { term: "Mid Term", value: 48.0 },
    { term: "PRE-SLE", value: 87.0 },
  ],
  ENGLISH: [
    { term: "First Term", value: 73.33 },
    { term: "Third Quarterly", value: 80.33 },
    { term: "Final Term", value: 81.33 },
    { term: "Second Term", value: 64.0 },
    { term: "Mid Term", value: 67.0 },
    { term: "PRE-SLE", value: 68.0 },
  ],
  HPE: [
    { term: "First Term", value: 62.0 },
    { term: "Third Quarterly", value: 78.0 },
    { term: "Final Term", value: 92.0 },
    { term: "Second Term", value: 80.0 },
    { term: "Mid Term", value: 80.0 },
    { term: "PRE-SLE", value: 80.0 },
  ],
  MATHEMATICS: [
    { term: "First Term", value: 50.0 },
    { term: "Third Quarterly", value: 86.67 },
    { term: "Final Term", value: 92.0 },
    { term: "Second Term", value: 72.0 },
    { term: "Mid Term", value: 60.0 },
    { term: "PRE-SLE", value: 60.0 },
  ],
  NEPALI: [
    { term: "First Term", value: 54 },
    { term: "Third Quarterly", value: 46 },
    { term: "Final Term", value: 54 },
    { term: "Second Term", value: 40 },
    { term: "Mid Term", value: 35 },
    { term: "PRE-SLE", value: 34 },
  ],
  "OPT. MATHS": [
    { term: "First Term", value: 41 },
    { term: "Third Quarterly", value: 45 },
    { term: "Final Term", value: 43 },
    { term: "Second Term", value: 41 },
    { term: "Mid Term", value: 26 },
    { term: "PRE-SLE", value: 33 },
  ],
  "SAMAJIK ADHYAN": [
    { term: "First Term", value: 61.33 },
    { term: "Third Quarterly", value: 70.67 },
    { term: "Final Term", value: 76.0 },
    { term: "Second Term", value: 68.0 },
    { term: "Mid Term", value: 54.0 },
    { term: "PRE-SLE", value: 54.0 },
  ],
  SCIENCE: [
    { term: "First Term", value: 50 },
    { term: "Third Quarterly", value: 62 },
    { term: "Final Term", value: 53 },
    { term: "Second Term", value: 34 },
    { term: "Mid Term", value: 31 },
    { term: "PRE-SLE", value: 33 },
  ],
}

const riskData = {
  COMPUTER: [
    { term: "Mid Term", value: 32 },
    { term: "Second Term", value: 34 },
    { term: "PRE-SLE", value: 30 },
  ],
  ENGLISH: [
    { term: "Mid Term", value: 36 },
    { term: "Second Term", value: 28 },
    { term: "PRE-SLE", value: 24 },
  ],
  HPE: [
    { term: "Mid Term", value: null }, // missing data
    { term: "Second Term", value: 34 },
    { term: "PRE-SLE", value: 28 },
  ],
  MATHEMATICS: [
    { term: "Mid Term", value: 35 },
    { term: "Second Term", value: 17 },
    { term: "PRE-SLE", value: 12 },
  ],
  NEPALI: [
    { term: "Mid Term", value: 26 },
    { term: "Second Term", value: 24 },
    { term: "PRE-SLE", value: 26 },
  ],
  "OPT. MATHS": [
    { term: "Mid Term", value: 22 },
    { term: "Second Term", value: 22 },
    { term: "PRE-SLE", value: 33 },
  ],
  "SAMAJIK ADHYAN": [
    { term: "Mid Term", value: 26 },
    { term: "Second Term", value: 22 },
    { term: "PRE-SLE", value: 18 },
  ],
  SCIENCE: [
    { term: "Mid Term", value: 22 },
    { term: "Second Term", value: 21 },
    { term: "PRE-SLE", value: 20 },
  ],
}

const subjectColors = {
  COMPUTER: "#4ade80",
  ENGLISH: "#60a5fa",
  HPE: "#a78bfa",
  MATHEMATICS: "#fb7185",
  NEPALI: "#c084fc",
  "OPT. MATHS": "#f472b6",
  "SAMAJIK ADHYAN": "#fbbf24",
  SCIENCE: "#f87171",
}

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

export default function HistoricDashboardPage() {
  const params = useParams()
  const router = useRouter()
  const studentName = decodeURIComponent(params.student as string)
  const [selectedStudent, setSelectedStudent] = useState(studentName)

  const handleStudentChange = (newStudent: string) => {
    setSelectedStudent(newStudent)
    router.push(`/historic-dashboard/${encodeURIComponent(newStudent)}`)
  }

  const handleBackClick = () => {
    router.push("/dashboard?tab=student-report")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={handleBackClick} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Student List
            </Button>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-semibold">Historic Dashboard - {selectedStudent}</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto space-y-8">
        {/* Radar Chart Section */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Student performance across all subjects and terms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-white border-2 border-gray-300 p-8 rounded-lg">
              <div className="flex justify-center mb-6">
                <ChartContainer
                  config={{
                    "First Term": {
                      label: "First Term",
                      color: "#ff6b6b",
                    },
                    "Mid Term": {
                      label: "Mid Term",
                      color: "#4ecdc4",
                    },
                    "Second Term": {
                      label: "Second Term",
                      color: "#45b7d1",
                    },
                  }}
                  className="h-[500px] w-[500px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid gridType="polygon" />
                      <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fontSize: 12, fill: "#000" }}
                        className="text-sm font-medium"
                      />
                      <PolarRadiusAxis
                        angle={90}
                        domain={[0, 100]}
                        tick={{ fontSize: 10, fill: "#666" }}
                        tickFormatter={(value) => `${value}%`}
                      />
                      <Radar
                        name="First Term"
                        dataKey="First Term"
                        stroke="#ff6b6b"
                        fill="#ff6b6b"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                      <Radar
                        name="Mid Term"
                        dataKey="Mid Term"
                        stroke="#4ecdc4"
                        fill="#4ecdc4"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                      <Radar
                        name="Second Term"
                        dataKey="Second Term"
                        stroke="#45b7d1"
                        fill="#45b7d1"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                      <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: "20px" }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              <div className="text-center">
                <div className="bg-gray-100 p-4 rounded border inline-block">
                  <p className="text-sm text-gray-700">
                    This radar chart represents the theory marks obtained by student in each exam of grade 8.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trend Analysis Section */}
        <div className="bg-white rounded-lg">
          {/* Orange Header */}
          <div className="bg-orange-500 text-white text-center py-4 rounded-t-lg">
            <h2 className="text-lg font-bold">
              TREND ANALYSIS OF MARKS OBTAINED IN TERMINAL EXAMS FROM GRADE 7 TO GRADE 8
            </h2>
          </div>

          <div className="p-6">
            {/* Student Selection and Info */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium mb-2">Name of Student</label>
                <Select value={selectedStudent} onValueChange={handleStudentChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((student) => (
                      <SelectItem key={student} value={student}>
                        {student}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="text-sm">
                <p>
                  Since for some subjects the total theory marks is 75, we have normalized the Marks to a scale of 0-1
                  to give equal weightage to each subject.
                </p>
              </div>
              <div className="border border-gray-300 p-4 text-sm">
                <p>
                  This trend analysis graph represents the trend of marks obtained by student in each subject from grade
                  7 to grade 8.
                </p>
              </div>
            </div>

            {/* Subject Charts Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {Object.entries(trendData).map(([subject, data]) => (
                <div key={subject} className="space-y-2">
                  <h3 className="text-sm font-medium">
                    Subject ● <span style={{ color: subjectColors[subject] }}>{subject}</span>
                  </h3>
                  <div className="text-xs text-gray-500">100</div>
                  <ChartContainer
                    config={{
                      value: {
                        label: "Score",
                        color: subjectColors[subject],
                      },
                    }}
                    className="h-[200px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="term" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={60} />
                        <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                        <ChartTooltip
                          content={<ChartTooltipContent />}
                          labelFormatter={(label) => `Term: ${label}`}
                          formatter={(value) => [`${value}`, "Score"]}
                        />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke={subjectColors[subject]}
                          fill={subjectColors[subject]}
                          fillOpacity={0.6}
                          strokeWidth={2}
                        >
                          <LabelList
                            dataKey="value"
                            position="top"
                            style={{
                              fontSize: 12,
                              fill: subjectColors[subject],
                              textAnchor: "middle",
                            }}
                          />
                        </Area>
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <div className="text-center text-xs text-gray-500">Terminal</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Risk Assessment Section */}
        <div className="bg-white rounded-lg">
          {/* Blue Header */}
          <div className="bg-blue-600 text-white text-center py-4 rounded-t-lg">
            <h2 className="text-lg font-bold">
              Risk Assessment: Student's Theory Marks Performance Against Threshold of 25
            </h2>
          </div>

          <div className="p-6">
            {/* Student Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium mb-2">Name of Student</label>
              <Select value={selectedStudent} onValueChange={handleStudentChange}>
                <SelectTrigger className="w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {students.map((student) => (
                    <SelectItem key={student} value={student}>
                      {student}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Risk Analysis Charts Grid */}
            <div className="grid lg:grid-cols-2 gap-12">
              {Object.entries(riskData).map(([subject, data]) => (
                <div key={subject} className="bg-gray-50 p-6 rounded-lg min-h-[400px]">
                  <h3 className="text-center text-base font-medium mb-6 underline">Risk Analysis in {subject}</h3>
                  <div className="relative">
                    <ChartContainer
                      config={{
                        value: {
                          label: "Score",
                          color: "#3b82f6",
                        },
                        threshold: {
                          label: "Threshold",
                          color: "#ef4444",
                        },
                      }}
                      className="h-[320px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{ top: 30, right: 50, left: 30, bottom: 80 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="term" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={60} />
                          <YAxis domain={[0, 50]} tick={{ fontSize: 12 }} />
                          <ChartTooltip
                            content={<ChartTooltipContent />}
                            labelFormatter={(label) => `Term: ${label}`}
                            formatter={(value, name) => [
                              value === null ? "missing data" : value,
                              name === "value" ? "Score" : "Threshold",
                            ]}
                          />

                          {/* Threshold Line */}
                          <Line
                            type="monotone"
                            dataKey={() => 25}
                            stroke="#ef4444"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            dot={false}
                          />

                          {/* Performance Line */}
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                            connectNulls={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>

                      {/* Risk Zone Label positioned near the threshold line */}
                      <div className="absolute right-12 top-[48%] transform -translate-y-1/2">
                        <span className="text-sm text-red-600 font-medium bg-white px-2 py-1 rounded shadow-sm border">
                          Risk Zone
                        </span>
                      </div>
                    </ChartContainer>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
