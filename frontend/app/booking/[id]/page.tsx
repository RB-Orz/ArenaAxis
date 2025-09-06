"use client"

import { useState, useEffect } from "react"
import { Calendar, MapPin, Star } from "lucide-react"
import { getFieldById } from "@/services/api"
import { Field } from "@/types"
import PageHeader from "@/components/layout/PageHeader"
import {
  BookingLoadingState,
  BookingNotFound,
  BookingDateSelector,
  BookingLegend,
  BookingGrid,
  BookingSummary
} from "@/components/booking"

interface SubCourt {
  id: string
  name: string
  type: string
  color: string
  rating: number
  price: number
}

export default function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  const [selectedDate, setSelectedDate] = useState("2024-01-15")
  const [selectedSlots, setSelectedSlots] = useState<string[]>([])
  const [field, setField] = useState<Field | null>(null)
  const [loading, setLoading] = useState(true)
  const [fieldId, setFieldId] = useState<string>("")

  // Fetch field data on component mount
  useEffect(() => {
    const fetchField = async () => {
      try {
        const resolvedParams = await params
        const id = resolvedParams.id
        setFieldId(id)
        const fieldData = await getFieldById(id)
        setField(fieldData)
      } catch (error) {
        console.error('Error fetching field:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchField()
  }, [])

  if (loading) {
    return <BookingLoadingState />
  }

  if (!field) {
    return <BookingNotFound />
  }

  // Generate time slots from 5:00 to 22:00
  const timeSlots: string[] = []
  for (let hour = 5; hour <= 22; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, "0")}:00`)
    if (hour < 22) {
      timeSlots.push(`${hour.toString().padStart(2, "0")}:30`)
    }
  }

  // Mock booking data
  const bookingData: { [key: string]: { [key: string]: "available" | "booked" | "locked" | "selected" } } = {
    "court-1": {
      "05:00": "available",
      "05:30": "available",
      "06:00": "booked",
      "06:30": "booked",
      "07:00": "available",
      "07:30": "available",
      "08:00": "available",
      "08:30": "booked",
      "09:00": "booked",
      "09:30": "available",
      "10:00": "available",
      "10:30": "available",
      "11:00": "available",
      "11:30": "booked",
      "12:00": "available",
      "12:30": "available",
      "13:00": "booked",
      "13:30": "booked",
      "14:00": "available",
      "14:30": "available",
      "15:00": "available",
      "15:30": "available",
      "16:00": "booked",
      "16:30": "booked",
      "17:00": "available",
      "17:30": "available",
      "18:00": "booked",
      "18:30": "available",
      "19:00": "booked",
      "19:30": "booked",
      "20:00": "available",
      "20:30": "available",
      "21:00": "available",
      "21:30": "available",
      "22:00": "available",
    },
    "court-2": {
      "05:00": "available",
      "05:30": "locked",
      "06:00": "available",
      "06:30": "available",
      "07:00": "booked",
      "07:30": "available",
      "08:00": "booked",
      "08:30": "booked",
      "09:00": "available",
      "09:30": "booked",
      "10:00": "booked",
      "10:30": "available",
      "11:00": "booked",
      "11:30": "available",
      "12:00": "booked",
      "12:30": "booked",
      "13:00": "available",
      "13:30": "available",
      "14:00": "booked",
      "14:30": "available",
      "15:00": "booked",
      "15:30": "booked",
      "16:00": "available",
      "16:30": "available",
      "17:00": "booked",
      "17:30": "booked",
      "18:00": "available",
      "18:30": "booked",
      "19:00": "available",
      "19:30": "available",
      "20:00": "booked",
      "20:30": "booked",
      "21:00": "booked",
      "21:30": "available",
      "22:00": "available",
    },
  }

  // Generate sub-courts cho field
  const subCourts: SubCourt[] = [
    { id: "court-1", name: "Sân A", type: "A", color: "bg-emerald-500", rating: 4.7, price: 400000 },
    { id: "court-2", name: "Sân B", type: "B", color: "bg-blue-500", rating: 4.8, price: 450000 },
    { id: "court-3", name: "Sân C", type: "C", color: "bg-orange-500", rating: 4.6, price: 380000 },
    { id: "court-4", name: "Sân D", type: "D", color: "bg-purple-500", rating: 4.7, price: 420000 },
    { id: "court-5", name: "Sân E", type: "E", color: "bg-rose-500", rating: 4.5, price: 360000 },
    { id: "court-6", name: "Sân F", type: "F", color: "bg-indigo-500", rating: 4.9, price: 480000 },
  ]

  // Fill in booking data cho sub-courts
  subCourts.forEach((court) => {
    if (!bookingData[court.id]) {
      bookingData[court.id] = {}
      timeSlots.forEach((slot, index) => {
        // Tạo pattern ổn định thay vì random
        const isBooked = (index + court.id.charCodeAt(court.id.length - 1)) % 3 === 0
        const isLocked = (index + court.id.charCodeAt(court.id.length - 1)) % 11 === 0

        if (isLocked) {
          bookingData[court.id][slot] = "locked"
        } else if (isBooked) {
          bookingData[court.id][slot] = "booked"
        } else {
          bookingData[court.id][slot] = "available"
        }
      })
    }
  })

  const handleSlotClick = (courtId: string, timeSlot: string) => {
    const status = bookingData[courtId][timeSlot]
    if (status === "available") {
      const slotKey = `${courtId}:${timeSlot}`
      setSelectedSlots((prev) => {
        if (prev.includes(slotKey)) {
          return prev.filter((s) => s !== slotKey)
        } else {
          return [...prev, slotKey]
        }
      })
    }
  }

  const handleClearSlots = () => {
    setSelectedSlots([])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <PageHeader
          title="Đặt lịch sân bóng"
          subtitle={`Chọn thời gian phù hợp để đặt sân tại ${field.name}`}
          breadcrumbs={[
            { label: "Sân bóng", href: "/fields" },
            { label: field.name, href: `/fields/${fieldId}` },
            { label: "Đặt lịch", isActive: true }
          ]}
          gradientFrom="emerald-500"
          gradientTo="blue-600"
          icon={<Calendar className="w-6 h-6" />}
          badge={`${field.location} • ⭐ ${field.rating}/5`}
          actions={
            <div className="hidden md:flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-full">
                <MapPin className="w-4 h-4" />
                <span>{field.location}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-full">
                <Star className="w-4 h-4" />
                <span>{field.rating}/5</span>
              </div>
            </div>
          }
        />

        {/* Date Selector */}
        <BookingDateSelector
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />

        {/* Legend */}
        <BookingLegend />

        {/* Booking Grid */}
        <BookingGrid
          selectedDate={selectedDate}
          selectedSlots={selectedSlots}
          onSlotClick={handleSlotClick}
          subCourts={subCourts}
          timeSlots={timeSlots}
          bookingData={bookingData}
        />

        {/* Selected Slots Summary */}
        <BookingSummary
          selectedSlots={selectedSlots}
          selectedDate={selectedDate}
          subCourts={subCourts}
          onClearSlots={handleClearSlots}
        />
      </div>
    </div>
  )
}
