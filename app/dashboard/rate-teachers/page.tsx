"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Star } from "lucide-react"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"

// Mock teachers data (replace with actual API call)
const teachers = [
  {
    id: 1,
    name: "Mr. Rajesh Kumar",
    department: "Science",
    subject: "Mathematics",
    currentRating: 4.5
  },
  {
    id: 2,
    name: "Mrs. Priya Sharma",
    department: "Languages",
    subject: "English Literature",
    currentRating: 4.8
  },
  {
    id: 3,
    name: "Mr. Anil Thapa",
    department: "Science",
    subject: "Physics",
    currentRating: 4.2
  },
  {
    id: 4,
    name: "Ms. Sarah Johnson",
    department: "Humanities",
    subject: "History",
    currentRating: 4.6
  },
  {
    id: 5,
    name: "Dr. Binod Adhikari",
    department: "Science",
    subject: "Chemistry",
    currentRating: 4.7
  }
]

const StarRating = ({ rating, onRatingChange, currentRating }: { rating: number; onRatingChange: (rating: number) => void; currentRating: number }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onRatingChange(star)}
            className="focus:outline-none transition-colors"
          >
            <Star
              className={`w-6 h-6 ${
                star <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
      <div className="text-sm text-gray-500">
        Current Rating: {currentRating.toFixed(1)}
      </div>
    </div>
  )
}

export default function RateTeachersPage() {
  const router = useRouter()
  const [ratings, setRatings] = useState<{ [key: number]: number }>({})
  const [feedback, setFeedback] = useState<{ [key: number]: string }>({})

  const handleRatingChange = (teacherId: number, rating: number) => {
    setRatings((prev) => ({ ...prev, [teacherId]: rating }))
  }

  const handleFeedbackChange = (teacherId: number, text: string) => {
    setFeedback((prev) => ({ ...prev, [teacherId]: text }))
  }

  const handleSubmitRating = async (teacherId: number) => {
    const rating = ratings[teacherId]
    const teacherFeedback = feedback[teacherId]
    
    // TODO: Implement API call to submit rating
    console.log(`Submitting rating for teacher ${teacherId}:`, { rating, feedback: teacherFeedback })
    
    // Show success message
    alert("Rating submitted successfully!")
    
    // Clear the rating and feedback for this teacher
    setRatings((prev) => {
      const newRatings = { ...prev }
      delete newRatings[teacherId]
      return newRatings
    })
    setFeedback((prev) => {
      const newFeedback = { ...prev }
      delete newFeedback[teacherId]
      return newFeedback
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Rate Teachers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Rate your fellow teachers and provide constructive feedback to help improve the teaching experience.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {teachers.map((teacher) => (
            <Card key={teacher.id}>
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-lg">{teacher.name}</h3>
                      <p className="text-sm text-gray-500">
                        {teacher.department} - {teacher.subject}
                      </p>
                    </div>
                    <StarRating
                      rating={ratings[teacher.id] || 0}
                      onRatingChange={(rating) => handleRatingChange(teacher.id, rating)}
                      currentRating={teacher.currentRating}
                    />
                  </div>
                  
                  <div>
                    <Textarea
                      placeholder="Add your feedback (optional)"
                      value={feedback[teacher.id] || ""}
                      onChange={(e) => handleFeedbackChange(teacher.id, e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={() => handleSubmitRating(teacher.id)}
                      disabled={!ratings[teacher.id]}
                      className="bg-purple-600 text-white hover:bg-purple-700"
                    >
                      Submit Rating
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 