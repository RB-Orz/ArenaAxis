// Trang lịch sử đặt sân - hiển thị các lần đặt sân của người dùng
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import BookingHeader from "@/components/booking/BookingHeader"
import BookingTabs from "@/components/booking/BookingTabs"
import BookingCard from "@/components/booking/BookingCard"
import { getBookingHistory, cancelBooking } from "@/services/api"
import { Booking } from "@/types"

export default function BookingHistoryPage() {
  // State quản lý tab hiện tại
  const [activeTab, setActiveTab] = useState("Tất cả")

  // State quản lý dữ liệu booking
  const [bookings, setBookings] = useState<Booking[]>([])
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  // Danh sách các tab
  const tabs = ["Tất cả", "Sắp tới", "Đã xong", "Đã hủy"]

  // useEffect để fetch dữ liệu booking khi component mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingsData = await getBookingHistory()
        setBookings(bookingsData)
      } catch (error) {
        console.error('Error fetching booking history:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [])

  // useEffect để lọc booking theo tab đang active
  useEffect(() => {
    if (activeTab === "Tất cả") {
      setFilteredBookings(bookings)
    } else {
      // Map từ tab title sang status values
      const statusMap: { [key: string]: string } = {
        "Sắp tới": "confirmed",
        "Đã xong": "completed",
        "Đã hủy": "cancelled"
      }
      const statusValue = statusMap[activeTab]
      if (statusValue) {
        setFilteredBookings(bookings.filter(booking => booking.status === statusValue))
      }
    }
  }, [activeTab, bookings])

  // Xử lý thay đổi tab
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  // Xử lý các hành động trên booking (Chi tiết, Hủy đặt, Đặt lại)
  const handleBookingAction = async (bookingId: string, action: string) => {
    switch (action) {
      case "Chi tiết":
        // Navigate đến trang chi tiết booking
        console.log(`View details for booking ${bookingId}`)
        break

      case "Hủy đặt":
        // Gọi API hủy đặt sân
        if (confirm("Bạn có chắc chắn muốn hủy đặt sân này?")) {
          try {
            const success = await cancelBooking(bookingId)
            if (success) {
              // Cập nhật trạng thái booking trong state
              setBookings(prev =>
                prev.map(booking =>
                  booking.id === bookingId
                    ? {
                      ...booking,
                      status: "cancelled" as const,
                      statusColor: "bg-red-100 text-red-800",
                      actions: ["Chi tiết"]
                    }
                    : booking
                )
              )
              alert("Hủy đặt sân thành công!")
            } else {
              alert("Không thể hủy đặt sân. Vui lòng thử lại.")
            }
          } catch (error) {
            console.error('Error canceling booking:', error)
            alert("Có lỗi xảy ra. Vui lòng thử lại.")
          }
        }
        break

      case "Đặt lại":
        // Navigate đến trang đặt sân với thông tin tương tự
        console.log(`Rebook booking ${bookingId}`)
        break

      default:
        console.log(`Unknown action: ${action}`)
    }
  }

  // Hiển thị loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <BookingHeader />
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Đang tải lịch sử đặt sân...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  // Render giao diện chính
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header trang */}
      <BookingHeader />

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Tabs lọc theo trạng thái */}
        <BookingTabs
          activeTab={activeTab}
          onTabChange={handleTabChange}
          tabs={tabs}
        />

        {/* Danh sách booking */}
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onAction={handleBookingAction}
            />
          ))}
        </div>

        {/* Hiển thị message khi không có booking */}
        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📅</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {activeTab === "Tất cả"
                ? "Chưa có lịch đặt sân nào"
                : `Không có booking nào ở trạng thái "${activeTab}"`
              }
            </h3>
            <p className="text-gray-600 mb-6">
              {activeTab === "Tất cả"
                ? "Hãy đặt sân đầu tiên của bạn để bắt đầu chơi thể thao!"
                : "Thử chuyển sang tab khác để xem các booking khác."
              }
            </p>
            {activeTab === "Tất cả" && (
              <Link href="/fields">
                <Button className="bg-green-600 hover:bg-green-700">
                  Đặt sân ngay
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
