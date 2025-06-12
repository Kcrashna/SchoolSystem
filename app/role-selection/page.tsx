"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Users, BookOpen, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Available classes and sections
const availableClasses = [
  { value: "grade-7", label: "Grade 7" },
  { value: "grade-8", label: "Grade 8" },
]

const availableSections = [
  { value: "chasers", label: "Chasers" },
  { value: "hercules", label: "Hercules" },
]

const availableSubjects = [
  { value: "mathematics", label: "Mathematics" },
  { value: "science", label: "Science" },
]

export default function RoleSelectionPage() {
  const [role, setRole] = useState("class-teacher")
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedSection, setSelectedSection] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedClasses, setSelectedClasses] = useState([])
  const [selectedSections, setSelectedSections] = useState([])
  const router = useRouter()

  const handleContinue = () => {
    if (role === "class-teacher" && selectedClass && selectedSection) {
      localStorage.setItem("teacherRole", role)
      localStorage.setItem("selectedClass", selectedClass)
      localStorage.setItem("selectedSection", selectedSection)
      router.push("/dashboard")
    } else if (
      role === "subject-teacher" &&
      selectedSubject &&
      selectedClasses.length > 0 &&
      selectedSections.length > 0
    ) {
      localStorage.setItem("teacherRole", role)
      localStorage.setItem("selectedSubject", selectedSubject)
      localStorage.setItem("selectedClasses", JSON.stringify(selectedClasses))
      localStorage.setItem("selectedSections", JSON.stringify(selectedSections))
      router.push("/subject-dashboard")
    }
  }

  const toggleClass = (classValue) => {
    setSelectedClasses((prev) => {
      if (prev.includes(classValue)) {
        return prev.filter((c) => c !== classValue)
      } else {
        return [...prev, classValue]
      }
    })
  }

  const toggleSection = (sectionValue) => {
    setSelectedSections((prev) => {
      if (prev.includes(sectionValue)) {
        return prev.filter((s) => s !== sectionValue)
      } else {
        return [...prev, sectionValue]
      }
    })
  }

  const isClassSelected = (classValue) => {
    return selectedClasses.includes(classValue)
  }

  const isSectionSelected = (sectionValue) => {
    return selectedSections.includes(sectionValue)
  }

  const isContinueDisabled = () => {
    if (role === "class-teacher") {
      return !selectedClass || !selectedSection
    } else {
      return !selectedSubject || selectedClasses.length === 0 || selectedSections.length === 0
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Select Your Role</CardTitle>
          <CardDescription>Welcome, Ram Thapa. Please select your teaching role.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Teacher Role</h3>
            <RadioGroup value={role} onValueChange={setRole} className="space-y-3">
              <div className="flex items-center space-x-3 p-4 border rounded-lg">
                <RadioGroupItem value="class-teacher" id="class-teacher" />
                <Users className="h-5 w-5 text-gray-600" />
                <div className="flex-1">
                  <Label htmlFor="class-teacher" className="font-medium">
                    Class Teacher
                  </Label>
                  <p className="text-sm text-gray-600">Manage a specific class and section</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 border rounded-lg">
                <RadioGroupItem value="subject-teacher" id="subject-teacher" />
                <BookOpen className="h-5 w-5 text-gray-600" />
                <div className="flex-1">
                  <Label htmlFor="subject-teacher" className="font-medium">
                    Subject Teacher
                  </Label>
                  <p className="text-sm text-gray-600">Teach a specific subject across classes</p>
                </div>
              </div>
            </RadioGroup>
          </div>

          {role === "class-teacher" ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="class" className="text-sm font-medium">
                  Class
                </Label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableClasses.map((cls) => (
                      <SelectItem key={cls.value} value={cls.value}>
                        {cls.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="section" className="text-sm font-medium">
                  Section
                </Label>
                <Select value={selectedSection} onValueChange={setSelectedSection}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSections.map((section) => (
                      <SelectItem key={section.value} value={section.value}>
                        {section.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <Label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </Label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSubjects.map((subject) => (
                      <SelectItem key={subject.value} value={subject.value}>
                        {subject.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Classes</Label>
                <div className="flex flex-wrap gap-2">
                  {availableClasses.map((cls) => (
                    <Button
                      key={cls.value}
                      type="button"
                      variant={isClassSelected(cls.value) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleClass(cls.value)}
                      className="flex items-center gap-1"
                    >
                      {isClassSelected(cls.value) && <Check className="h-3 w-3" />}
                      {cls.label}
                    </Button>
                  ))}
                </div>
                {selectedClasses.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {selectedClasses.map((cls) => {
                      const classLabel = availableClasses.find((c) => c.value === cls)?.label
                      return (
                        <Badge key={cls} variant="secondary">
                          {classLabel}
                        </Badge>
                      )
                    })}
                  </div>
                )}
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Sections</Label>
                <div className="flex flex-wrap gap-2">
                  {availableSections.map((section) => (
                    <Button
                      key={section.value}
                      type="button"
                      variant={isSectionSelected(section.value) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleSection(section.value)}
                      className="flex items-center gap-1"
                    >
                      {isSectionSelected(section.value) && <Check className="h-3 w-3" />}
                      {section.label}
                    </Button>
                  ))}
                </div>
                {selectedSections.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {selectedSections.map((section) => {
                      const sectionLabel = availableSections.find((s) => s.value === section)?.label
                      return (
                        <Badge key={section} variant="secondary">
                          {sectionLabel}
                        </Badge>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          <Button
            onClick={handleContinue}
            className="w-full bg-gray-600 hover:bg-gray-700"
            disabled={isContinueDisabled()}
          >
            Continue to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
