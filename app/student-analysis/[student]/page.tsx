"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, GraduationCap, Plus, ChevronDown, ChevronUp } from "lucide-react"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface SubjectMarks {
  COMP: number;
  ENGL: number;
  HPE: number;
  MATH: number;
  NEPA: number;
  OPT: number;
  SAMA: number;
  SCIE: number;
  [key: string]: number;
}

interface TermData {
  term: string;
  COMP: number;
  ENGL: number;
  HPE: number;
  MATH: number;
  NEPA: number;
  OPT: number;
  SAMA: number;
  SCIE: number;
  [key: string]: string | number;
}

interface StudentData {
  currentTerm: SubjectMarks;
  previousTerms: TermData[];
}

interface StudentMarksDataType {
  [key: string]: StudentData;
}

interface MisconductRecord {
  id: number;
  date: string;
  type: string;
  description: string;
  reportedBy: string;
  actionTaken: string;
  remarks?: string;
}

interface HealthRecord {
  id: number;
  date: string;
  type: string;
  condition: string;
  symptoms: string;
  treatment: string;
  medication?: string;
  notes?: string;
  recordedBy: string;
}

// Student marks data for individual analysis
const studentMarksData: StudentMarksDataType = {
  "Ronisha Shrestha": {
    currentTerm: { COMP: 98, ENGL: 89, HPE: 93, MATH: 96, NEPA: 95, OPT: 49, SAMA: 96, SCIE: 95 },
    previousTerms: [
      { term: "First Term", COMP: 95, ENGL: 85, HPE: 90, MATH: 92, NEPA: 90, OPT: 45, SAMA: 92, SCIE: 90 },
      { term: "Mid Term", COMP: 96, ENGL: 87, HPE: 91, MATH: 94, NEPA: 92, OPT: 47, SAMA: 94, SCIE: 92 },
    ],
  },
  "Amriddhi Rajbhandari": {
    currentTerm: { COMP: 98.5, ENGL: 88.5, HPE: 91, MATH: 100, NEPA: 91, OPT: 49, SAMA: 89, SCIE: 95 },
    previousTerms: [
      { term: "First Term", COMP: 94, ENGL: 84, HPE: 88, MATH: 96, NEPA: 87, OPT: 46, SAMA: 85, SCIE: 91 },
      { term: "Mid Term", COMP: 96, ENGL: 86, HPE: 89, MATH: 98, NEPA: 89, OPT: 47, SAMA: 87, SCIE: 93 },
    ],
  },
  "Miksha Kafle": {
    currentTerm: { COMP: 98, ENGL: 87, HPE: 90, MATH: 90, NEPA: 91, OPT: 47, SAMA: 91, SCIE: 90 },
    previousTerms: [
      { term: "First Term", COMP: 92, ENGL: 82, HPE: 85, MATH: 85, NEPA: 86, OPT: 43, SAMA: 86, SCIE: 85 },
      { term: "Mid Term", COMP: 95, ENGL: 84, HPE: 87, MATH: 87, NEPA: 88, OPT: 45, SAMA: 88, SCIE: 87 },
    ],
  },
  "AAYUMI TAMANG": {
    currentTerm: { COMP: 67, ENGL: 65, HPE: 78, MATH: 63, NEPA: 63, OPT: 25, SAMA: 50, SCIE: 81 },
    previousTerms: [
      { term: "First Term", COMP: 60, ENGL: 58, HPE: 70, MATH: 55, NEPA: 58, OPT: 20, SAMA: 45, SCIE: 75 },
      { term: "Mid Term", COMP: 63, ENGL: 61, HPE: 74, MATH: 59, NEPA: 60, OPT: 22, SAMA: 47, SCIE: 78 },
    ],
  },
  "Yanis Shrestha": {
    currentTerm: { COMP: 57, ENGL: 74, HPE: 63, MATH: 45, NEPA: 67, OPT: 29, SAMA: 50, SCIE: 65 },
    previousTerms: [
      { term: "First Term", COMP: 52, ENGL: 68, HPE: 58, MATH: 40, NEPA: 62, OPT: 25, SAMA: 45, SCIE: 60 },
      { term: "Mid Term", COMP: 54, ENGL: 71, HPE: 60, MATH: 42, NEPA: 64, OPT: 27, SAMA: 47, SCIE: 62 },
    ],
  },
  "Sartaz Malla": {
    currentTerm: { COMP: 58.5, ENGL: 46.5, HPE: 57, MATH: 58, NEPA: 60, OPT: 25, SAMA: 35, SCIE: 42 },
    previousTerms: [
      { term: "First Term", COMP: 50, ENGL: 40, HPE: 50, MATH: 50, NEPA: 52, OPT: 20, SAMA: 30, SCIE: 35 },
      { term: "Mid Term", COMP: 54, ENGL: 43, HPE: 53, MATH: 54, NEPA: 56, OPT: 22, SAMA: 32, SCIE: 38 },
    ],
  },
}

// Default data for students not in the detailed dataset
const getDefaultStudentData = (studentName: string) => ({
  currentTerm: { COMP: 75, ENGL: 70, HPE: 80, MATH: 72, NEPA: 74, OPT: 35, SAMA: 68, SCIE: 76 },
  previousTerms: [
    { term: "First Term", COMP: 70, ENGL: 65, HPE: 75, MATH: 67, NEPA: 69, OPT: 30, SAMA: 63, SCIE: 71 },
    { term: "Mid Term", COMP: 72, ENGL: 67, HPE: 77, MATH: 69, NEPA: 71, OPT: 32, SAMA: 65, SCIE: 73 },
  ],
})

// Calculate correlation coefficient between two arrays
const calculateCorrelation = (x: number[], y: number[]) => {
  const n = x.length
  if (n === 0) return 0

  const sumX = x.reduce((a, b) => a + b, 0)
  const sumY = y.reduce((a, b) => a + b, 0)
  const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0)
  const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0)
  const sumY2 = y.reduce((sum, yi) => sum + yi * yi, 0)

  const numerator = n * sumXY - sumX * sumY
  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY))

  return denominator === 0 ? 0 : numerator / denominator
}

// Generate correlation heatmap data for a student
const generateStudentCorrelationMatrix = (studentData: any) => {
  const subjects = ["COMP", "ENGL", "HPE", "MATH", "NEPA", "OPT", "SAMA", "SCIE"]
  const allTermsData = [studentData.currentTerm, ...studentData.previousTerms]

  const matrix = []

  for (let i = 0; i < subjects.length; i++) {
    for (let j = 0; j < subjects.length; j++) {
      const subjectX = subjects[i]
      const subjectY = subjects[j]

      // Get values across all terms for correlation
      const xValues = allTermsData.map((termData) => termData[subjectX] || 0)
      const yValues = allTermsData.map((termData) => termData[subjectY] || 0)

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

// Get correlation color based on strength
const getCorrelationColor = (correlation: number) => {
  const abs = Math.abs(correlation)
  if (abs >= 0.8) return "#dc2626" // Strong correlation - red
  if (abs >= 0.6) return "#ea580c" // Moderate-strong - orange
  if (abs >= 0.4) return "#ca8a04" // Moderate - yellow
  if (abs >= 0.2) return "#65a30d" // Weak-moderate - light green
  return "#16a34a" // Weak - green
}

// Calculate student performance metrics
const calculatePerformanceMetrics = (studentData: any) => {
  const currentMarks = Object.values(studentData.currentTerm) as number[]
  const average = currentMarks.reduce((a, b) => a + b, 0) / currentMarks.length
  const highest = Math.max(...currentMarks)
  const lowest = Math.min(...currentMarks)

  // Calculate improvement from first term
  const firstTermMarks = Object.values(studentData.previousTerms[0]) as number[]
  const firstTermAverage = firstTermMarks.reduce((a, b) => a + b, 0) / firstTermMarks.length
  const improvement = average - firstTermAverage

  return {
    average: Math.round(average * 10) / 10,
    highest,
    lowest,
    improvement: Math.round(improvement * 10) / 10,
  }
}

export default function StudentAnalysisPage() {
  const params = useParams()
  const router = useRouter()
  const studentName = decodeURIComponent(params.student as string)
  const [studentData, setStudentData] = useState<StudentData | null>(null)
  const [currentUser] = useState("Ram Thapa") // This would normally come from your auth system
  const [incidentDate, setIncidentDate] = useState("")
  const [misconductType, setMisconductType] = useState("")
  const [description, setDescription] = useState("")
  const [actionTaken, setActionTaken] = useState("")
  const [remarks, setRemarks] = useState("")
  const [showMisconductForm, setShowMisconductForm] = useState(false)
  const [misconductRecords, setMisconductRecords] = useState<MisconductRecord[]>([])
  const [showHealthForm, setShowHealthForm] = useState(false)
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([])
  const [healthDate, setHealthDate] = useState("")
  const [healthType, setHealthType] = useState("")
  const [condition, setCondition] = useState("")
  const [symptoms, setSymptoms] = useState("")
  const [treatment, setTreatment] = useState("")
  const [medication, setMedication] = useState("")
  const [healthNotes, setHealthNotes] = useState("")

  useEffect(() => {
    const data = studentMarksData[studentName] || getDefaultStudentData(studentName)
    setStudentData(data)
  }, [studentName])

  if (!studentData) {
    return <div className="p-8 text-center">Loading...</div>
  }

  const correlationMatrix = generateStudentCorrelationMatrix(studentData)
  const performanceMetrics = calculatePerformanceMetrics(studentData)
  const subjects = ["COMP", "ENGL", "HPE", "MATH", "NEPA", "OPT", "SAMA", "SCIE"]

  // Prepare radar chart data
  const radarData = subjects.map((subject) => ({
    subject,
    current: studentData.currentTerm[subject],
    previous: studentData.previousTerms[studentData.previousTerms.length - 1][subject],
  }))

  const handleBackClick = () => {
    router.push("/dashboard?tab=student-report")
  }

  const handleSaveMisconduct = () => {
    // Validate required fields
    if (!incidentDate || !misconductType || !description || !actionTaken) {
      alert("Please fill in all required fields")
      return
    }

    const newRecord: MisconductRecord = {
      id: Date.now(),
      date: incidentDate,
      type: misconductType,
      description,
      reportedBy: currentUser,
      actionTaken,
      remarks: remarks || undefined,
    }

    setMisconductRecords((prev) => [newRecord, ...prev])

    // Reset form
    setIncidentDate("")
    setMisconductType("")
    setDescription("")
    setActionTaken("")
    setRemarks("")
    setShowMisconductForm(false)
    alert("Misconduct record saved successfully!")
  }

  const handleSaveHealth = () => {
    // Validate required fields
    if (!healthDate || !healthType || !condition || !symptoms || !treatment) {
      alert("Please fill in all required fields")
      return
    }

    const newRecord: HealthRecord = {
      id: Date.now(),
      date: healthDate,
      type: healthType,
      condition,
      symptoms,
      treatment,
      medication: medication || undefined,
      notes: healthNotes || undefined,
      recordedBy: currentUser,
    }

    setHealthRecords((prev) => [newRecord, ...prev])

    // Reset form
    setHealthDate("")
    setHealthType("")
    setCondition("")
    setSymptoms("")
    setTreatment("")
    setMedication("")
    setHealthNotes("")
    setShowHealthForm(false)
    alert("Health record saved successfully!")
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
              <h1 className="text-xl font-semibold">Student Analysis - {studentName}</h1>
            </div>
          </div>
          <Button variant="default" className="bg-black hover:bg-gray-800 gap-2">
            <Download className="h-4 w-4" />
            Download Analysis Report
          </Button>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto space-y-8">
        {/* Insights and Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>Insights and Recommendations</CardTitle>
            <CardDescription>Personalized analysis for {studentName}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Strengths</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>
                    • Highest performing subject:{" "}
                    {subjects.find((s) => studentData.currentTerm[s] === performanceMetrics.highest)}
                  </li>
                  <li>
                    • Shows {performanceMetrics.improvement >= 0 ? "positive" : "negative"} overall trend from first
                    term
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-medium text-orange-900 mb-2">Areas for Improvement</h4>
                <ul className="text-sm text-orange-800 space-y-1">
                  <li>
                    • Focus needed in: {subjects.find((s) => studentData.currentTerm[s] === performanceMetrics.lowest)}
                  </li>
                  <li>• Consider additional support for subjects showing declining trends</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Recommendations</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Leverage strengths in high-performing subjects to support weaker areas</li>
                  <li>• Monitor correlation patterns to identify subject relationships</li>
                  <li>• Set specific targets for improvement in lowest-performing subjects</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add Misconduct Record */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle 
                  className="flex items-center gap-2 cursor-pointer" 
                  onClick={() => setShowMisconductForm(!showMisconductForm)}
                >
                  {showMisconductForm ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <Plus className="h-5 w-5" />
                  )}
                  Add Misconduct Record
                </CardTitle>
                <CardDescription>Record and view misconduct incidents for {studentName}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Misconduct Records List */}
            {misconductRecords.length > 0 && !showMisconductForm && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Previous Misconduct Records</h3>
                <div className="space-y-4">
                  {misconductRecords.map((record) => (
                    <div key={record.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-2">
                        <div>
                          <span className="text-sm text-gray-600">Date:</span>
                          <p className="font-medium">{new Date(record.date).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Type:</span>
                          <p className="font-medium capitalize">{record.type.replace('-', ' ')}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Action Taken:</span>
                          <p className="font-medium capitalize">{record.actionTaken.replace('-', ' ')}</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="text-sm text-gray-600">Description:</span>
                        <p className="text-sm mt-1">{record.description}</p>
                      </div>
                      {record.remarks && (
                        <div className="mt-2">
                          <span className="text-sm text-gray-600">Remarks:</span>
                          <p className="text-sm mt-1">{record.remarks}</p>
                        </div>
                      )}
                      <div className="mt-2 text-sm text-gray-600">
                        Reported by {record.reportedBy}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Misconduct Form */}
            {showMisconductForm && (
              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="incident-date">Date of Incident *</Label>
                    <Input
                      id="incident-date"
                      type="date"
                      value={incidentDate}
                      onChange={(e) => setIncidentDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="misconduct-type">Type of Misconduct *</Label>
                    <Select value={misconductType} onValueChange={setMisconductType} required>
                      <SelectTrigger id="misconduct-type">
                        <SelectValue placeholder="Select type of misconduct" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="disobedience">Disobedience</SelectItem>
                        <SelectItem value="late-arrival">Late Arrival</SelectItem>
                        <SelectItem value="cheating">Cheating</SelectItem>
                        <SelectItem value="bullying">Bullying</SelectItem>
                        <SelectItem value="vandalism">Vandalism</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the incident in detail..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="reported-by">Reported By</Label>
                    <Input id="reported-by" value={currentUser} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="action-taken">Action Taken *</Label>
                    <Select value={actionTaken} onValueChange={setActionTaken} required>
                      <SelectTrigger id="action-taken">
                        <SelectValue placeholder="Select action taken" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="verbal-warning">Verbal Warning</SelectItem>
                        <SelectItem value="written-warning">Written Warning</SelectItem>
                        <SelectItem value="parent-notified">Parent Notified</SelectItem>
                        <SelectItem value="suspension">Suspension</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="remarks">Remarks (Optional)</Label>
                  <Textarea
                    id="remarks"
                    placeholder="Any additional remarks..."
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                  />
                </div>

                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setShowMisconductForm(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveMisconduct} className="gap-2">
                    ✅ Save Record
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add Health Record */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle 
                  className="flex items-center gap-2 cursor-pointer" 
                  onClick={() => setShowHealthForm(!showHealthForm)}
                >
                  {showHealthForm ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <Plus className="h-5 w-5" />
                  )}
                  Add Health Record
                </CardTitle>
                <CardDescription>Record and view health incidents for {studentName}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Health Records List */}
            {healthRecords.length > 0 && !showHealthForm && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Previous Health Records</h3>
                <div className="space-y-4">
                  {healthRecords.map((record) => (
                    <div key={record.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-2">
                        <div>
                          <span className="text-sm text-gray-600">Date:</span>
                          <p className="font-medium">{new Date(record.date).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Type:</span>
                          <p className="font-medium capitalize">{record.type.replace('-', ' ')}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Condition:</span>
                          <p className="font-medium">{record.condition}</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="text-sm text-gray-600">Symptoms:</span>
                        <p className="text-sm mt-1">{record.symptoms}</p>
                      </div>
                      <div className="mt-2">
                        <span className="text-sm text-gray-600">Treatment:</span>
                        <p className="text-sm mt-1">{record.treatment}</p>
                      </div>
                      {record.medication && (
                        <div className="mt-2">
                          <span className="text-sm text-gray-600">Medication:</span>
                          <p className="text-sm mt-1">{record.medication}</p>
                        </div>
                      )}
                      {record.notes && (
                        <div className="mt-2">
                          <span className="text-sm text-gray-600">Additional Notes:</span>
                          <p className="text-sm mt-1">{record.notes}</p>
                        </div>
                      )}
                      <div className="mt-2 text-sm text-gray-600">
                        Recorded by {record.recordedBy}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Health Form */}
            {showHealthForm && (
              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="health-date">Date of Record *</Label>
                    <Input
                      id="health-date"
                      type="date"
                      value={healthDate}
                      onChange={(e) => setHealthDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="health-type">Type of Record *</Label>
                    <Select value={healthType} onValueChange={setHealthType} required>
                      <SelectTrigger id="health-type">
                        <SelectValue placeholder="Select type of health record" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="routine-checkup">Routine Checkup</SelectItem>
                        <SelectItem value="illness">Illness</SelectItem>
                        <SelectItem value="injury">Injury</SelectItem>
                        <SelectItem value="vaccination">Vaccination</SelectItem>
                        <SelectItem value="mental-health">Mental Health</SelectItem>
                        <SelectItem value="emergency">Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="condition">Medical Condition *</Label>
                  <Input
                    id="condition"
                    placeholder="Enter the medical condition or diagnosis"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="symptoms">Symptoms/Observations *</Label>
                  <Textarea
                    id="symptoms"
                    placeholder="Describe the symptoms or observations..."
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="treatment">Treatment/Action Taken *</Label>
                  <Textarea
                    id="treatment"
                    placeholder="Describe the treatment or actions taken..."
                    value={treatment}
                    onChange={(e) => setTreatment(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medication">Medication (Optional)</Label>
                  <Input
                    id="medication"
                    placeholder="Enter prescribed medications if any"
                    value={medication}
                    onChange={(e) => setMedication(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="health-notes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="health-notes"
                    placeholder="Any additional notes or follow-up instructions..."
                    value={healthNotes}
                    onChange={(e) => setHealthNotes(e.target.value)}
                  />
                </div>

                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setShowHealthForm(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveHealth} className="gap-2">
                    ✅ Save Record
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Student Performance Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
            <CardDescription>Current term performance metrics for {studentName}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{performanceMetrics.average}%</div>
                <div className="text-sm text-gray-600">Current Average</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{performanceMetrics.highest}%</div>
                <div className="text-sm text-gray-600">Highest Score</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{performanceMetrics.lowest}%</div>
                <div className="text-sm text-gray-600">Lowest Score</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div
                  className={`text-2xl font-bold ${performanceMetrics.improvement >= 0 ? "text-green-600" : "text-red-600"}`}
                >
                  {performanceMetrics.improvement >= 0 ? "+" : ""}
                  {performanceMetrics.improvement}%
                </div>
                <div className="text-sm text-gray-600">Term Improvement</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Comparison and Correlation Heatmap */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Radar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Subject Performance Comparison</CardTitle>
              <CardDescription>Current vs Previous Term Performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart outerRadius="80%" data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                    <Radar
                      name="Current Term"
                      dataKey="current"
                      stroke="#2563eb"
                      fill="#3b82f6"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                    <Radar
                      name="Previous Term"
                      dataKey="previous"
                      stroke="#dc2626"
                      fill="#ef4444"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Correlation Heatmap */}
          <Card>
            <CardHeader>
              <CardTitle>Subject Correlation Heatmap</CardTitle>
              <CardDescription>How performance in different subjects correlates for {studentName}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="grid grid-cols-9 gap-1 min-w-[400px]">
                  {/* Header row */}
                  <div className="p-2"></div>
                  {subjects.map((subject) => (
                    <div key={subject} className="p-2 text-center font-medium text-xs">
                      {subject}
                    </div>
                  ))}

                  {/* Matrix rows */}
                  {subjects.map((subjectY, i) => (
                    <>
                      <div key={`${subjectY}-label`} className="p-2 font-medium text-xs">
                        {subjectY}
                      </div>
                      {subjects.map((subjectX, j) => {
                        const correlation =
                          correlationMatrix.find((item) => item.x === j && item.y === i)?.correlation || 0
                        return (
                          <div
                            key={`${subjectY}-${subjectX}`}
                            className="p-1 text-center text-xs font-medium text-white rounded"
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
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                <span className="font-medium">Correlation:</span>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-red-600 rounded"></div>
                  <span>Strong</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-orange-600 rounded"></div>
                  <span>Mod-Strong</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-yellow-600 rounded"></div>
                  <span>Moderate</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-lime-600 rounded"></div>
                  <span>Weak-Mod</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-600 rounded"></div>
                  <span>Weak</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subject-wise Performance Table */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Subject Performance</CardTitle>
            <CardDescription>Performance across all terms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">Subject</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">First Term</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">Mid Term</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">Current Term</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((subject, index) => {
                    const firstTerm = studentData.previousTerms[0][subject] as number
                    const midTerm = studentData.previousTerms[1][subject] as number
                    const currentTerm = studentData.currentTerm[subject] as number
                    const trend = currentTerm - firstTerm

                    return (
                      <tr key={subject} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border border-gray-300 px-4 py-2 font-medium">{subject}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">{firstTerm}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">{midTerm}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center font-medium">{currentTerm}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          <span className={`font-medium ${trend >= 0 ? "text-green-600" : "text-red-600"}`}>
                            {trend >= 0 ? "+" : ""}
                            {trend}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
