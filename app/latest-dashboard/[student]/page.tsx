"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Download } from "lucide-react"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

const addressList = [
  'Kathmandu', 'Bhaktapur', 'Lalitpur', 'Pokhara', 'Butwal', 'Biratnagar', 'Dharan', 'Nepalgunj', 'Hetauda', 'Janakpur',
  'Dhangadhi', 'Bharatpur', 'Itahari', 'Birgunj', 'Gorkha', 'Chitwan', 'Palpa', 'Bhairahawa', 'Tansen', 'Damak', 'Banepa',
  'Bardiya', 'Surkhet', 'Kanchanpur', 'Syangja', 'Parsa', 'Makwanpur', 'Nawalparasi', 'Kavre', 'Rupandehi', 'Sunsari'
];

// Student marks data from the provided table
let studentMarksData: any[] = [
  {
    name: "Ronisha Shrestha",
    rank: 1,
    percentage: 94.8,
    grade: "A",
    result: "PASS",
    rollNo: "01",
    address: "Kathmandu",
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
    rollNo: "02",
    address: "Bhaktapur",
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
    name: "Miksha Kafle",
    rank: 3,
    percentage: 91.0,
    grade: "A",
    result: "PASS",
    rollNo: "03",
    address: "Lalitpur",
    subjects: {
      COMP: { TH: 49, PR: 49, Total: 98 },
      ENGL: { TH: 40, PR: 47, Total: 87 },
      HPE: { TH: 45, PR: 45, Total: 90 },
      MATH: { TH: 40, PR: 50, Total: 90 },
      NEPA: { TH: 41, PR: 50, Total: 91 },
      OPT: { TH: 47, PR: 0, Total: 47 },
      SAMA: { TH: 44, PR: 47, Total: 91 },
      SCIE: { TH: 42, PR: 48, Total: 90 },
    },
  },
  {
    name: "Sahara Dahal",
    rank: 4,
    percentage: 88.5,
    grade: "A",
    result: "PASS",
    subjects: {
      COMP: { TH: 49, PR: 45, Total: 94 },
      ENGL: { TH: 36, PR: 47, Total: 83 },
      HPE: { TH: 47, PR: 45, Total: 92 },
      MATH: { TH: 40, PR: 50, Total: 90 },
      NEPA: { TH: 40, PR: 45, Total: 85 },
      OPT: { TH: 42, PR: 0, Total: 42 },
      SAMA: { TH: 42, PR: 45, Total: 87 },
      SCIE: { TH: 40, PR: 45, Total: 85 },
    },
  },
  {
    name: "Sumiran Gurung",
    rank: 5,
    percentage: 85.1,
    grade: "A",
    result: "PASS",
    subjects: {
      COMP: { TH: 45, PR: 46, Total: 91 },
      ENGL: { TH: 34, PR: 45, Total: 79 },
      HPE: { TH: 47, PR: 45, Total: 92 },
      MATH: { TH: 35, PR: 45, Total: 80 },
      NEPA: { TH: 44, PR: 48, Total: 92 },
      OPT: { TH: 36, PR: 0, Total: 36 },
      SAMA: { TH: 36, PR: 43, Total: 79 },
      SCIE: { TH: 44, PR: 44, Total: 88 },
    },
  },
  {
    name: "Arushi Rimal",
    rank: 6,
    percentage: 83.1,
    grade: "A",
    result: "PASS",
    subjects: {
      COMP: { TH: 41.5, PR: 48, Total: 89.5 },
      ENGL: { TH: 38.5, PR: 47, Total: 85.5 },
      HPE: { TH: 47, PR: 45, Total: 92 },
      MATH: { TH: 23, PR: 47, Total: 70 },
      NEPA: { TH: 40, PR: 48, Total: 88 },
      OPT: { TH: 41, PR: 0, Total: 41 },
      SAMA: { TH: 42, PR: 45, Total: 87 },
      SCIE: { TH: 38, PR: 45, Total: 83 },
    },
  },
  {
    name: "Arya Karmacharya",
    rank: 7,
    percentage: 82.8,
    grade: "A",
    result: "PASS",
    subjects: {
      COMP: { TH: 40.5, PR: 48, Total: 88.5 },
      ENGL: { TH: 33.5, PR: 47, Total: 80.5 },
      HPE: { TH: 44, PR: 40, Total: 84 },
      MATH: { TH: 37, PR: 47, Total: 84 },
      NEPA: { TH: 40, PR: 48, Total: 88 },
      OPT: { TH: 36, PR: 0, Total: 36 },
      SAMA: { TH: 43, PR: 45, Total: 88 },
      SCIE: { TH: 34, PR: 45, Total: 79 },
    },
  },
  {
    name: "Anzila Devkota",
    rank: 8,
    percentage: 78.5,
    grade: "B",
    result: "PASS",
    subjects: {
      COMP: { TH: 46, PR: 48, Total: 94 },
      ENGL: { TH: 30, PR: 40, Total: 70 },
      HPE: { TH: 44, PR: 40, Total: 84 },
      MATH: { TH: 36, PR: 45, Total: 81 },
      NEPA: { TH: 37, PR: 45, Total: 82 },
      OPT: { TH: 46, PR: 0, Total: 46 },
      SAMA: { TH: 35, PR: 38, Total: 73 },
      SCIE: { TH: 32, PR: 40, Total: 72 },
    },
  },
  {
    name: "Riyaz Basnet",
    rank: 9,
    percentage: 77.9,
    grade: "B",
    result: "PASS",
    subjects: {
      COMP: { TH: 44.5, PR: 48, Total: 92.5 },
      ENGL: { TH: 32, PR: 35, Total: 67 },
      HPE: { TH: 40, PR: 40, Total: 80 },
      MATH: { TH: 36, PR: 45, Total: 81 },
      NEPA: { TH: 40, PR: 45, Total: 85 },
      OPT: { TH: 41, PR: 0, Total: 41 },
      SAMA: { TH: 34, PR: 38, Total: 72 },
      SCIE: { TH: 34, PR: 39, Total: 73 },
    },
  },
  {
    name: "Agrima Koirala",
    rank: 10,
    percentage: 75.6,
    grade: "B",
    result: "PASS",
    subjects: {
      COMP: { TH: 33, PR: 35, Total: 68 },
      ENGL: { TH: 35.5, PR: 40, Total: 75.5 },
      HPE: { TH: 35, PR: 30, Total: 65 },
      MATH: { TH: 27, PR: 40, Total: 67 },
      NEPA: { TH: 38, PR: 45, Total: 83 },
      OPT: { TH: 41, PR: 0, Total: 41 },
      SAMA: { TH: 41, PR: 45, Total: 86 },
      SCIE: { TH: 34, PR: 43, Total: 77 },
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
    name: "Aardip Basnet",
    rank: 18,
    percentage: 65.3,
    grade: "B",
    result: "PASS",
    subjects: {
      COMP: { TH: 37, PR: 45, Total: 82 },
      ENGL: { TH: 33, PR: 30, Total: 63 },
      HPE: { TH: 33, PR: 30, Total: 63 },
      MATH: { TH: 16.5, PR: 30, Total: 46.5 },
      NEPA: { TH: 27, PR: 40, Total: 67 },
      OPT: { TH: 37, PR: 0, Total: 37 },
      SAMA: { TH: 23, PR: 30, Total: 53 },
      SCIE: { TH: 28, PR: 37, Total: 65 },
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
      ENGL: { TH: 26.5, PR: 20, Total: 46.5 },
      HPE: { TH: 27, PR: 30, Total: 57 },
      MATH: { TH: 23, PR: 35, Total: 58 },
      NEPA: { TH: 20, PR: 40, Total: 60 },
      OPT: { TH: 25, PR: 0, Total: 25 },
      SAMA: { TH: 15, PR: 20, Total: 35 },
      SCIE: { TH: 12, PR: 30, Total: 42 },
    },
  },
];
studentMarksData = studentMarksData.map((student, idx) => ({
  ...student,
  rollNo: student.rollNo || String(student.rank || idx + 1).padStart(2, '0'),
  address: student.address || addressList[idx % addressList.length],
}));

// Rank grade data for each student and subject
const rankGradeData = {
  "AAYUMI TAMANG": {
    "OPT. MATHS": "D",
    NEPALI: "D",
    SCIENCE: "B",
    "SAMAJIK ADHYAN": "D",
    MATHEMATICS: "C",
    COMPUTER: "D",
    ENGLISH: "C",
    HPE: "B",
  },
  "Aabhushan Acharya": {
    COMPUTER: "C",
    NEPALI: "D",
    "OPT. MATHS": "D",
    SCIENCE: "D",
    MATHEMATICS: "C",
    "SAMAJIK ADHYAN": "D",
    ENGLISH: "D",
    HPE: "D",
  },
  "Aardip Basnet": {
    "SAMAJIK ADHYAN": "D",
    MATHEMATICS: "D",
    NEPALI: "C",
    "OPT. MATHS": "B",
    HPE: "D",
    SCIENCE: "C",
    COMPUTER: "B",
    ENGLISH: "C",
  },
  "Aayush Chhantyal": {
    "OPT. MATHS": "D",
    NEPALI: "E",
    SCIENCE: "D",
    "SAMAJIK ADHYAN": "E",
    ENGLISH: "D",
    COMPUTER: "C",
    MATHEMATICS: "D",
    HPE: "D",
  },
  "Abinam Lama": {
    MATHEMATICS: "D",
    NEPALI: "E",
    ENGLISH: "E",
    HPE: "D",
    SCIENCE: "D",
    COMPUTER: "D",
    "OPT. MATHS": "E",
    "SAMAJIK ADHYAN": "C",
  },
  "Agrima Koirala": {
    HPE: "D",
    MATHEMATICS: "C",
    COMPUTER: "D",
    ENGLISH: "B",
    "SAMAJIK ADHYAN": "B",
    SCIENCE: "B",
    NEPALI: "B",
    "OPT. MATHS": "B",
  },
  "Amriddhi Rajbhandari": {
    NEPALI: "A",
    MATHEMATICS: "A",
    SCIENCE: "A",
    "OPT. MATHS": "A",
    COMPUTER: "A",
    "SAMAJIK ADHYAN": "A",
    HPE: "A",
    ENGLISH: "A",
  },
  "Anuva Giri": {
    "SAMAJIK ADHYAN": "E",
    SCIENCE: "D",
    ENGLISH: "D",
    "OPT. MATHS": "E",
    HPE: "C",
    MATHEMATICS: "E",
    COMPUTER: "D",
    NEPALI: "D",
  },
  "Anzila Devkota": {
    HPE: "B",
    ENGLISH: "B",
    COMPUTER: "A",
    MATHEMATICS: "A",
    "SAMAJIK ADHYAN": "B",
    SCIENCE: "C",
    NEPALI: "B",
    "OPT. MATHS": "A",
  },
  "Aric Kunwar": {
    "OPT. MATHS": "B",
    "SAMAJIK ADHYAN": "D",
    SCIENCE: "C",
    NEPALI: "C",
    COMPUTER: "D",
    ENGLISH: "C",
    HPE: "B",
    MATHEMATICS: "B",
  },
  "Arushi Rimal": {
    "SAMAJIK ADHYAN": "A",
    "OPT. MATHS": "B",
    NEPALI: "A",
    SCIENCE: "A",
    HPE: "A",
    ENGLISH: "A",
    COMPUTER: "B",
    MATHEMATICS: "C",
  },
  "Arya Karmacharya": {
    COMPUTER: "B",
    NEPALI: "A",
    "SAMAJIK ADHYAN": "A",
    SCIENCE: "B",
    MATHEMATICS: "A",
    ENGLISH: "A",
    "OPT. MATHS": "B",
    HPE: "B",
  },
  "Lakshya Thapa": {
    HPE: "C",
    MATHEMATICS: "E",
    COMPUTER: "E",
    ENGLISH: "C",
    NEPALI: "D",
    SCIENCE: "E",
    "SAMAJIK ADHYAN": "C",
    "OPT. MATHS": "E",
  },
  "Manish Raj Giri": {
    MATHEMATICS: "B",
    COMPUTER: "C",
    ENGLISH: "C",
    HPE: "C",
    "SAMAJIK ADHYAN": "C",
    SCIENCE: "B",
    NEPALI: "B",
    "OPT. MATHS": "A",
  },
  "Miksha Kafle": {
    "OPT. MATHS": "A",
    NEPALI: "A",
    SCIENCE: "A",
    "SAMAJIK ADHYAN": "A",
    ENGLISH: "A",
    COMPUTER: "A",
    MATHEMATICS: "A",
    HPE: "A",
  },
  "Pratik Bhattarai": {
    "OPT. MATHS": "B",
    NEPALI: "C",
    SCIENCE: "C",
    "SAMAJIK ADHYAN": "B",
    ENGLISH: "D",
    COMPUTER: "C",
    MATHEMATICS: "C",
    HPE: "D",
  },
  "Rajkumar Rawat": {
    "OPT. MATHS": "C",
    "SAMAJIK ADHYAN": "C",
    SCIENCE: "E",
    HPE: "D",
    MATHEMATICS: "E",
    NEPALI: "C",
    ENGLISH: "D",
    COMPUTER: "E",
  },
  "Riyaz Basnet": {
    HPE: "B",
    MATHEMATICS: "A",
    "SAMAJIK ADHYAN": "B",
    ENGLISH: "B",
    SCIENCE: "B",
    COMPUTER: "A",
    NEPALI: "B",
    "OPT. MATHS": "B",
  },
  "Riyaz Chhetri": {
    ENGLISH: "C",
    "SAMAJIK ADHYAN": "B",
    SCIENCE: "C",
    COMPUTER: "B",
    "OPT. MATHS": "C",
    HPE: "C",
    MATHEMATICS: "B",
    NEPALI: "C",
  },
  "Ronisha Shrestha": {
    "SAMAJIK ADHYAN": "A",
    SCIENCE: "A",
    HPE: "A",
    MATHEMATICS: "A",
    NEPALI: "A",
    "OPT. MATHS": "A",
    COMPUTER: "A",
    ENGLISH: "A",
  },
  "Sahara Dahal": {
    "OPT. MATHS": "A",
    "SAMAJIK ADHYAN": "A",
    ENGLISH: "A",
    COMPUTER: "A",
    HPE: "A",
    NEPALI: "B",
    MATHEMATICS: "A",
    SCIENCE: "A",
  },
  "Sajjan Adhikari": {
    HPE: "C",
    ENGLISH: "D",
    SCIENCE: "D",
    MATHEMATICS: "D",
    "SAMAJIK ADHYAN": "C",
    "OPT. MATHS": "D",
    NEPALI: "D",
    COMPUTER: "C",
  },
  "Sartaz Malla": {
    HPE: "E",
    ENGLISH: "E",
    COMPUTER: "D",
    "OPT. MATHS": "D",
    "SAMAJIK ADHYAN": "E",
    MATHEMATICS: "D",
    NEPALI: "E",
    SCIENCE: "E",
  },
  "Spandan Joshi": {
    "SAMAJIK ADHYAN": "D",
    SCIENCE: "C",
    ENGLISH: "B",
    "OPT. MATHS": "B",
    HPE: "B",
    MATHEMATICS: "C",
    NEPALI: "B",
    COMPUTER: "C",
  },
  "Sumiran Gurung": {
    "SAMAJIK ADHYAN": "B",
    "OPT. MATHS": "B",
    COMPUTER: "B",
    SCIENCE: "A",
    ENGLISH: "B",
    HPE: "A",
    NEPALI: "A",
    MATHEMATICS: "B",
  },
  "Suzix Balampaki Magar": {
    ENGLISH: "E",
    NEPALI: "C",
    MATHEMATICS: "B",
    HPE: "C",
    "OPT. MATHS": "C",
    COMPUTER: "B",
    SCIENCE: "B",
    "SAMAJIK ADHYAN": "C",
  },
  "Yanis Shrestha": {
    ENGLISH: "B",
    HPE: "D",
    "SAMAJIK ADHYAN": "D",
    COMPUTER: "E",
    "OPT. MATHS": "D",
    SCIENCE: "C",
    MATHEMATICS: "D",
    NEPALI: "C",
  },
}

// Helper function to get rank grade color
const getRankGradeColor = (grade: string) => {
  switch (grade) {
    case "A":
      return "bg-green-500"
    case "B":
      return "bg-blue-500"
    case "C":
      return "bg-orange-500"
    case "D":
      return "bg-yellow-500"
    case "E":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

// Helper function to get subject name mapping
const getSubjectMapping = (subject: string) => {
  const mapping = {
    COMP: "COMPUTER",
    ENGL: "ENGLISH",
    HPE: "HPE",
    MATH: "MATHEMATICS",
    NEPA: "NEPALI",
    OPT: "OPT. MATHS",
    SAMA: "SAMAJIK ADHYAN",
    SCIE: "SCIENCE",
  }
  return mapping[subject] || subject
}

// Calculate class highest and average marks
const calculateClassStats = () => {
  const highestMarks = {
    COMP: 0,
    ENGL: 0,
    HPE: 0,
    MATH: 0,
    NEPA: 0,
    OPT: 0,
    SAMA: 0,
    SCIE: 0,
  }

  const totalStudents = studentMarksData.length
  const totalMarks = {
    COMP: 0,
    ENGL: 0,
    HPE: 0,
    MATH: 0,
    NEPA: 0,
    OPT: 0,
    SAMA: 0,
    SCIE: 0,
  }

  studentMarksData.forEach((student) => {
    Object.keys(student.subjects).forEach((subject) => {
      if ((student.subjects as any)[subject].Total > (highestMarks as any)[subject]) {
        (highestMarks as any)[subject] = (student.subjects as any)[subject].Total
      }
      (totalMarks as any)[subject] += (student.subjects as any)[subject].Total
    })
  })

  const averageMarks = {}
  Object.keys(totalMarks).forEach((subject) => {
    averageMarks[subject] = Math.round(((totalMarks as any)[subject] / totalStudents) * 10) / 10
  })

  return { highestMarks, averageMarks }
}

const { highestMarks, averageMarks } = calculateClassStats()

// Marksheet component for the template
function Marksheet({ student }: { student: any }) {
  // Map subject keys to display names and order
  const subjectOrder = [
    { key: 'ENGL', label: 'English' },
    { key: 'MATH', label: 'Math' },
    { key: 'SCIE', label: 'Science' },
    { key: 'COMP', label: 'Computer' },
    { key: 'NEPA', label: 'Nepali' },
    { key: 'SAMA', label: 'Social' },
  ];

  // Helper to get value or dash
  const getVal = (val: any) => (val !== undefined && val !== null ? val : '-');

  // Calculate totals
  let grandTotal = 0;
  subjectOrder.forEach(({ key }) => {
    if (student.subjects[key]) grandTotal += student.subjects[key].Total;
  });

  // Attendance
  const attendance = student.attendance || '325 days';
  // GPA (if not present, calculate from percentage)
  const gpa = student.gpa || (student.percentage ? (Math.round((student.percentage / 25) * 100) / 100).toFixed(2) : '-');

  return (
    <div className="max-w-3xl mx-auto border p-6 bg-white text-black text-sm leading-tight font-serif mb-8">
      {/* Logo and school name/address */}
      <div className="flex items-center mb-2">
        <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center">
          <img src="/api-school-logo.png" alt="API School Logo" className="w-16 h-16 object-contain" />
        </div>
        <div className="flex-1 text-center">
          <div className="font-bold text-base">API School</div>
          <div>Dhapasi Height, Kathmandu</div>
        </div>
      </div>
      <h2 className="text-center text-lg font-bold uppercase underline mb-2">FINAL EXAMINATION MARKSHEET</h2>
      <div className="flex justify-between mb-2">
        <div>
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Section:</strong> A</p>
        </div>
        <div className="text-right">
          <p><strong>Roll No:</strong> {getVal(student.rollNo) || student.rank}</p>
          <p><strong>Address:</strong> {getVal(student.address) || 'Kathmandu'}</p>
        </div>
      </div>
      <table className="w-full border border-collapse mb-4">
        <thead>
          <tr className="bg-gray-200 text-center">
            <th rowSpan={2} className="border p-1">Subjects</th>
            <th colSpan={2} className="border p-1">Full Marks</th>
            <th colSpan={2} className="border p-1">Pass Marks</th>
            <th colSpan={2} className="border p-1">Marks Obtained</th>
            <th rowSpan={2} className="border p-1">Total</th>
          </tr>
          <tr className="bg-gray-200 text-center">
            <th className="border p-1">Prac.</th>
            <th className="border p-1">Final</th>
            <th className="border p-1">Prac.</th>
            <th className="border p-1">Final</th>
            <th className="border p-1">Prac.</th>
            <th className="border p-1">Final</th>
          </tr>
        </thead>
        <tbody>
          {subjectOrder.map(({ key, label }) => {
            const subj = student.subjects[key] || {};
            // Assume full marks/prac/final: 25/75, pass: 8/32 for all, adjust as needed
            return (
              <tr key={key} className="text-center">
                <td className="border p-1 text-left">{label}</td>
                <td className="border p-1">25</td>
                <td className="border p-1">75</td>
                <td className="border p-1">8</td>
                <td className="border p-1">32</td>
                <td className="border p-1">{getVal(subj.PR)}</td>
                <td className="border p-1">{getVal(subj.TH)}</td>
                <td className="border p-1 font-semibold">{getVal(subj.Total)}</td>
              </tr>
            );
          })}
          {/* Attendance */}
          <tr className="text-center">
            <td className="border p-1 text-left">Attendance</td>
            <td className="border p-1" colSpan={6}>{attendance}</td>
            <td className="border p-1 font-semibold">{attendance}</td>
          </tr>
        </tbody>
      </table>
      <div className="flex flex-wrap justify-between gap-2">
        <p><strong>Grand Total:</strong> {grandTotal}</p>
        <p><strong>GPA:</strong> {gpa}</p>
        <p><strong>Grade:</strong> {getVal(student.grade)}</p>
        <p><strong>Position Secured:</strong> {student.rank}<sup>{student.rank === 1 ? 'st' : student.rank === 2 ? 'nd' : student.rank === 3 ? 'rd' : 'th'}</sup></p>
      </div>
      <div className="flex flex-wrap justify-between gap-2">
        <p><strong>Percentage:</strong> {getVal(student.percentage)}%</p>
        <p><strong>Result:</strong> {student.result === 'PASS' ? 'Passed' : 'Failed'}</p>
      </div>
    </div>
  );
}

export default function LatestDashboardPage() {
  const params = useParams()
  const router = useRouter()
  const studentName = decodeURIComponent(params.student as string)
  const [studentData, setStudentData] = useState<any>(null)

  useEffect(() => {
    const student = studentMarksData.find((s) => s.name === studentName)
    if (student) {
      setStudentData(student)
    } else {
      // Default to first student if not found
      setStudentData(studentMarksData[0])
    }
  }, [studentName])

  if (!studentData) {
    return <div className="p-8 text-center">Loading...</div>
  }

  // Prepare radar chart data
  const radarData = Object.keys((studentData as any).subjects).map((subject) => {
    const percentage = ((studentData as any).subjects[subject].Total / 100) * 100
    return {
      subject,
      value: Math.min(percentage, 100),
    }
  })

  // Prepare comparison with highest score data
  const highestScoreData = Object.keys((studentData as any).subjects).map((subject) => {
    const studentTotal = (studentData as any).subjects[subject].Total
    const highestTotal = highestMarks[subject]
    const deviation = studentTotal - highestTotal

    return {
      subject,
      "Total Marks Obtained": studentTotal,
      "Highest Marks of the Class": highestTotal,
      "Deviation from Highest Marks": deviation,
    }
  })

  // Prepare comparison with average score data
  const averageScoreData = Object.keys((studentData as any).subjects).map((subject) => {
    const studentTotal = (studentData as any).subjects[subject].Total
    const avgTotal = averageMarks[subject]
    const deviation = studentTotal - avgTotal

    return {
      subject,
      "Total Marks Obtained": studentTotal,
      "Average Score of Class": avgTotal,
      "Deviation from Average Marks": deviation,
    }
  })

  const handleBackClick = () => {
    router.push("/dashboard?tab=student-report")
  }

  // Get subject teacher reviews - Enhanced to show all available subject reviews
  const getAllSubjectReviews = () => {
    const allReviews: any[] = []
    const subjects = ["mathematics", "science"] // Available subjects with teachers

    subjects.forEach((subject) => {
      const reviews = JSON.parse(localStorage.getItem(`reviews_${subject}_${(studentData as any).name}`) || "[]")
      reviews.forEach((review: any) => {
        allReviews.push({
          ...review,
          subject: subject,
          subjectName: subject.charAt(0).toUpperCase() + subject.slice(1),
        })
      })
    })

    // Sort by date (newest first)
    return allReviews.sort((a, b) => new Date(b.date) - new Date(a.date))
  }

  const allSubjectReviews = getAllSubjectReviews()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* First Page: Marksheet */}
      <Marksheet student={studentData} />
      <div className="break-after-page" />

      {/* Second Page: Red Header, then Info Cards, then Analysis */}
      <header className="bg-red-600 text-white px-6 py-4">
        <h1 className="text-xl font-bold text-center flex-1">
          MARKSHEET ANALYSIS OF SECOND TERMINAL EXAM OF GRADE 8 (HERCULES)
        </h1>
      </header>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Student Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="p-4">
            <CardContent className="p-0">
              <h3 className="text-sm text-gray-500 mb-1">Name of Student</h3>
              <p className="text-lg font-bold text-blue-600">{studentData.name}</p>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardContent className="p-0">
              <h3 className="text-sm text-gray-500 mb-1">Grade</h3>
              <p className="text-lg font-bold">{studentData.grade}</p>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardContent className="p-0">
              <h3 className="text-sm text-gray-500 mb-1">Rank</h3>
              <p className="text-lg font-bold text-blue-600">{studentData.rank}</p>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardContent className="p-0">
              <h3 className="text-sm text-gray-500 mb-1">Result</h3>
              <p className="text-lg font-bold text-green-600">{studentData.result}</p>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardContent className="p-0">
              <h3 className="text-sm text-gray-500 mb-1">Percentage</h3>
              <p className="text-lg font-bold text-blue-600">{studentData.percentage}%</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <Card className="p-6">
            <h2 className="text-lg font-bold mb-4">Determining a Student's Rank in Each Subject Within the Class</h2>

            <div className="mb-6">
              <h3 className="text-center mb-2">Scale</h3>
              <div className="flex w-full">
                <div className="h-8 bg-green-500 flex-1 flex items-center justify-center text-white font-bold">A</div>
                <div className="h-8 bg-blue-500 flex-1 flex items-center justify-center text-white font-bold">B</div>
                <div className="h-8 bg-orange-500 flex-1 flex items-center justify-center text-white font-bold">C</div>
                <div className="h-8 bg-yellow-500 flex-1 flex items-center justify-center text-white font-bold">D</div>
                <div className="h-8 bg-red-500 flex-1 flex items-center justify-center text-white font-bold">E</div>
              </div>
              <div className="flex w-full text-xs text-gray-600 mt-1">
                <div className="flex-1 text-center">1</div>
                <div className="flex-1 text-center">6</div>
                <div className="flex-1 text-center">12</div>
                <div className="flex-1 text-center">18</div>
                <div className="flex-1 text-center">24</div>
                <div className="flex-1 text-center">30</div>
              </div>
              <div className="flex items-center mt-2">
                <div className="text-sm font-medium mr-2">Rank</div>
                <div className="h-1 bg-blue-500 flex-grow relative">
                  <div className="absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/2">
                    <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-blue-500"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subject Marks Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="p-2 text-left">Subject</th>
                    <th className="p-2 text-center">Theory Marks</th>
                    <th className="p-2 text-center">Practical Marks</th>
                    <th className="p-2 text-center">Total</th>
                    <th className="p-2 text-center">Ranking</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries((studentData as any).subjects).map(([subject, marks], index) => {
                    const mappedSubject = getSubjectMapping(subject)
                    const rankGrade = rankGradeData[(studentData as any).name]?.[mappedSubject as any] || "A"

                    return (
                      <tr key={subject} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="p-2 border">{subject}</td>
                        <td className="p-2 border text-center">{(marks as any).TH}</td>
                        <td className="p-2 border text-center">{(marks as any).PR}</td>
                        <td className="p-2 border text-center">{(marks as any).Total}</td>
                        <td className="p-2 border text-center">
                          <span
                            className={`inline-block px-3 py-1 ${getRankGradeColor(rankGrade)} text-white font-bold rounded`}
                          >
                            {rankGrade}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Right Column - Radar Chart */}
          <Card className="p-6">
            <h2 className="text-lg font-bold mb-4">Radar Chart Analysis- Subject Wise Performance</h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius="80%" data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                  <Radar name="Performance" dataKey="value" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.6} dot />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Comparison Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Comparison with Highest Score */}
          <Card className="p-6">
            <h2 className="text-lg font-bold mb-4">Comparison with the Highest Score of Class</h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={highestScoreData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" angle={-45} textAnchor="end" height={70} />
                  <YAxis domain={[-30, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Total Marks Obtained" fill="#22c55e" />
                  <Bar dataKey="Highest Marks of the Class" fill="#3b82f6" />
                  <Bar dataKey="Deviation from Highest Marks" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Comparison with Average Score */}
          <Card className="p-6">
            <h2 className="text-lg font-bold mb-4">Comparison with the Average Score of Class</h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={averageScoreData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" angle={-45} textAnchor="end" height={70} />
                  <YAxis domain={[-30, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Total Marks Obtained" fill="#22c55e" />
                  <Bar dataKey="Average Score of Class" fill="#f97316" />
                  <Bar dataKey="Deviation from Average Marks" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Subject Teacher Reviews - Enhanced to show all reviews */}
        <Card className="p-6">
          <h2 className="text-lg font-bold mb-4">Subject Teacher Reviews</h2>
          <div className="space-y-6">
            {allSubjectReviews.length > 0 ? (
              allSubjectReviews.map((review) => (
                <div key={`${review.subject}-${review.id}`} className="border-l-4 border-blue-500 pl-4">
                  <div className="bg-blue-50 p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded">
                        {review.subjectName} Teacher
                      </span>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-800">{review.text}</p>
                    <div className="mt-2 text-xs text-gray-500">
                      <span>By: {review.teacher}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mathematics Reviews */}
                <div>
                  <h3 className="text-md font-medium mb-3 text-blue-600">Mathematics Teacher</h3>
                  <p className="text-gray-500 text-sm">No reviews available from Mathematics teacher.</p>
                </div>

                {/* Science Reviews */}
                <div>
                  <h3 className="text-md font-medium mb-3 text-green-600">Science Teacher</h3>
                  <p className="text-gray-500 text-sm">No reviews available from Science teacher.</p>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Download Button */}
        <div className="flex justify-start mt-6">
          <Button variant="default" className="bg-black hover:bg-gray-800 gap-2">
            <Download className="h-4 w-4" />
            Download Detailed Report
          </Button>
        </div>
      </div>
    </div>
  )
}
