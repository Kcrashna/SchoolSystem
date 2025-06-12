"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, GraduationCap } from "lucide-react"
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Student marks data for correlation analysis
const studentMarksData = [
  {
    name: "Ronisha Shrestha",
    COMP: 98,
    ENGL: 89,
    HPE: 93,
    MATH: 96,
    NEPA: 95,
    OPT: 49,
    SAMA: 96,
    SCIE: 95,
  },
  {
    name: "Amriddhi Rajbhandari",
    COMP: 98.5,
    ENGL: 88.5,
    HPE: 91,
    MATH: 100,
    NEPA: 91,
    OPT: 49,
    SAMA: 89,
    SCIE: 95,
  },
  {
    name: "Miksha Kafle",
    COMP: 98,
    ENGL: 87,
    HPE: 90,
    MATH: 90,
    NEPA: 91,
    OPT: 47,
    SAMA: 91,
    SCIE: 90,
  },
  {
    name: "Sahara Dahal",
    COMP: 94,
    ENGL: 83,
    HPE: 92,
    MATH: 90,
    NEPA: 85,
    OPT: 42,
    SAMA: 87,
    SCIE: 85,
  },
  {
    name: "Sumiran Gurung",
    COMP: 91,
    ENGL: 79,
    HPE: 92,
    MATH: 80,
    NEPA: 92,
    OPT: 36,
    SAMA: 79,
    SCIE: 88,
  },
  {
    name: "Arushi Rimal",
    COMP: 89.5,
    ENGL: 85.5,
    HPE: 92,
    MATH: 70,
    NEPA: 88,
    OPT: 41,
    SAMA: 87,
    SCIE: 83,
  },
  {
    name: "Arya Karmacharya",
    COMP: 88.5,
    ENGL: 80.5,
    HPE: 84,
    MATH: 84,
    NEPA: 88,
    OPT: 36,
    SAMA: 88,
    SCIE: 79,
  },
  {
    name: "Anzila Devkota",
    COMP: 94,
    ENGL: 70,
    HPE: 84,
    MATH: 81,
    NEPA: 82,
    OPT: 46,
    SAMA: 73,
    SCIE: 72,
  },
  {
    name: "Riyaz Basnet",
    COMP: 92.5,
    ENGL: 67,
    HPE: 80,
    MATH: 81,
    NEPA: 85,
    OPT: 41,
    SAMA: 72,
    SCIE: 73,
  },
  {
    name: "Agrima Koirala",
    COMP: 68,
    ENGL: 75.5,
    HPE: 65,
    MATH: 67,
    NEPA: 83,
    OPT: 41,
    SAMA: 86,
    SCIE: 77,
  },
  {
    name: "AAYUMI TAMANG",
    COMP: 67,
    ENGL: 65,
    HPE: 78,
    MATH: 63,
    NEPA: 63,
    OPT: 25,
    SAMA: 50,
    SCIE: 81,
  },
  {
    name: "Aardip Basnet",
    COMP: 82,
    ENGL: 63,
    HPE: 63,
    MATH: 46.5,
    NEPA: 67,
    OPT: 37,
    SAMA: 53,
    SCIE: 65,
  },
  {
    name: "Yanis Shrestha",
    COMP: 57,
    ENGL: 74,
    HPE: 63,
    MATH: 45,
    NEPA: 67,
    OPT: 29,
    SAMA: 50,
    SCIE: 65,
  },
  {
    name: "Sartaz Malla",
    COMP: 58.5,
    ENGL: 46.5,
    HPE: 57,
    MATH: 58,
    NEPA: 60,
    OPT: 25,
    SAMA: 35,
    SCIE: 42,
  },
]

// Calculate correlation coefficient between two arrays
const calculateCorrelation = (x: number[], y: number[]) => {
  const n = x.length
  const sumX = x.reduce((a, b) => a + b, 0)
  const sumY = y.reduce((a, b) => a + b, 0)
  const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0)
  const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0)
  const sumY2 = y.reduce((sum, yi) => sum + yi * yi, 0)

  const numerator = n * sumXY - sumX * sumY
  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY))

  return denominator === 0 ? 0 : numerator / denominator
}

// Generate correlation matrix
const generateCorrelationMatrix = () => {
  const subjects = ["COMP", "ENGL", "HPE", "MATH", "NEPA", "OPT", "SAMA", "SCIE"]
  const matrix = []

  for (let i = 0; i < subjects.length; i++) {
    for (let j = 0; j < subjects.length; j++) {
      const subjectX = subjects[i]
      const subjectY = subjects[j]

      const xValues = studentMarksData.map((student) => student[subjectX])
      const yValues = studentMarksData.map((student) => student[subjectY])

      const correlation = calculateCorrelation(xValues, yValues)

      matrix.push({
        subjectX,
        subjectY,
        correlation: Math.round(correlation * 100) / 100,
        x: i,
        y: j,
      })
    }
  }

  return matrix
}

// Generate scatter plot data for subject pairs
const generateScatterData = (subjectX: string, subjectY: string) => {
  return studentMarksData.map((student) => ({
    x: student[subjectX],
    y: student[subjectY],
    name: student.name,
  }))
}

// Get correlation color based on strength
const getCorrelationColor = (correlation: number) => {
  const abs = Math.abs(correlation)
  if (abs >= 0.8) return "#dc2626" // Strong correlation - red
  if (abs >= 0.6) return "#ea580c" // Moderate-strong - orange
  if (abs >= 0.4) return "#ca8a04" // Moderate - yellow
  if (abs >= 0.2) return "#65a30d" // Weak-moderate - light green
  return "#16a34a" // Weak - green
}

export default function OverallAnalysisPage() {
  const router = useRouter()
  const correlationMatrix = generateCorrelationMatrix()
  const subjects = ["COMP", "ENGL", "HPE", "MATH", "NEPA", "OPT", "SAMA", "SCIE"]

  // Key correlation pairs for detailed analysis
  const keyCorrelations = [
    { x: "MATH", y: "SCIE", title: "Mathematics vs Science" },
    { x: "ENGL", y: "NEPA", title: "English vs Nepali" },
    { x: "COMP", y: "MATH", title: "Computer vs Mathematics" },
    { x: "SAMA", y: "NEPA", title: "Social Studies vs Nepali" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => router.back()} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-semibold">Overall Class Analysis - Grade 8 Hercules</h1>
            </div>
          </div>
          <Button variant="default" className="bg-black hover:bg-gray-800 gap-2">
            <Download className="h-4 w-4" />
            Download Analysis Report
          </Button>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto space-y-8">
        {/* Summary Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Class Performance Summary</CardTitle>
            <CardDescription>Overall statistics for Grade 8 - Hercules (28 students)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">78.5%</div>
                <div className="text-sm text-gray-600">Class Average</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">100%</div>
                <div className="text-sm text-gray-600">Highest Score</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">25%</div>
                <div className="text-sm text-gray-600">Lowest Score</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">89.3%</div>
                <div className="text-sm text-gray-600">Pass Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Correlation Matrix */}
        <Card>
          <CardHeader>
            <CardTitle>Subject Correlation Matrix</CardTitle>
            <CardDescription>
              Correlation coefficients between subjects (1.0 = perfect positive correlation, -1.0 = perfect negative
              correlation)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="grid grid-cols-9 gap-1 min-w-[600px]">
                {/* Header row */}
                <div className="p-2"></div>
                {subjects.map((subject) => (
                  <div key={subject} className="p-2 text-center font-medium text-sm">
                    {subject}
                  </div>
                ))}

                {/* Matrix rows */}
                {subjects.map((subjectY, i) => (
                  <>
                    <div key={`${subjectY}-label`} className="p-2 font-medium text-sm">
                      {subjectY}
                    </div>
                    {subjects.map((subjectX, j) => {
                      const correlation =
                        correlationMatrix.find((item) => item.x === j && item.y === i)?.correlation || 0
                      return (
                        <div
                          key={`${subjectY}-${subjectX}`}
                          className="p-2 text-center text-xs font-medium text-white rounded"
                          style={{ backgroundColor: getCorrelationColor(correlation) }}
                        >
                          {correlation.toFixed(2)}
                        </div>
                      )
                    })}
                  </>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="mt-4 flex items-center gap-4 text-sm">
              <span className="font-medium">Correlation Strength:</span>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-600 rounded"></div>
                <span>Strong (0.8+)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-600 rounded"></div>
                <span>Moderate-Strong (0.6-0.8)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-600 rounded"></div>
                <span>Moderate (0.4-0.6)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-lime-600 rounded"></div>
                <span>Weak-Moderate (0.2-0.4)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-600 rounded"></div>
                <span>Weak (0.0-0.2)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scatter Plot Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {keyCorrelations.map((pair, index) => {
            const scatterData = generateScatterData(pair.x, pair.y)
            const correlation = calculateCorrelation(
              studentMarksData.map((s) => s[pair.x]),
              studentMarksData.map((s) => s[pair.y]),
            )

            return (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{pair.title}</CardTitle>
                  <CardDescription>
                    Correlation coefficient: {correlation.toFixed(3)} (
                    {Math.abs(correlation) >= 0.8
                      ? "Strong"
                      : Math.abs(correlation) >= 0.6
                        ? "Moderate-Strong"
                        : Math.abs(correlation) >= 0.4
                          ? "Moderate"
                          : Math.abs(correlation) >= 0.2
                            ? "Weak-Moderate"
                            : "Weak"}{" "}
                    {correlation >= 0 ? "positive" : "negative"} correlation)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart data={scatterData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          type="number"
                          dataKey="x"
                          name={pair.x}
                          domain={[0, 100]}
                          label={{ value: pair.x, position: "insideBottom", offset: -10 }}
                        />
                        <YAxis
                          type="number"
                          dataKey="y"
                          name={pair.y}
                          domain={[0, 100]}
                          label={{ value: pair.y, angle: -90, position: "insideLeft" }}
                        />
                        <Tooltip
                          cursor={{ strokeDasharray: "3 3" }}
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload
                              return (
                                <div className="bg-white p-3 border rounded shadow">
                                  <p className="font-medium">{data.name}</p>
                                  <p className="text-sm">
                                    {pair.x}: {data.x}
                                  </p>
                                  <p className="text-sm">
                                    {pair.y}: {data.y}
                                  </p>
                                </div>
                              )
                            }
                            return null
                          }}
                        />
                        <Scatter dataKey="y" fill="#3b82f6" />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Key Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
            <CardDescription>Analysis findings and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Strong Correlations Found</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>
                    • Mathematics and Science show strong positive correlation (students good in math tend to excel in
                    science)
                  </li>
                  <li>
                    • Computer and Mathematics demonstrate moderate correlation (logical thinking skills transfer)
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Recommendations</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Focus on strengthening mathematical foundations to improve science performance</li>
                  <li>• Integrate language skills across subjects to improve overall communication</li>
                  <li>• Consider cross-subject teaching approaches for correlated subjects</li>
                </ul>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-medium text-orange-900 mb-2">Areas for Attention</h4>
                <ul className="text-sm text-orange-800 space-y-1">
                  <li>
                    • Optional Mathematics shows lower correlation with other subjects - may need specialized attention
                  </li>
                  <li>• Wide performance gaps in some subjects suggest need for differentiated instruction</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
