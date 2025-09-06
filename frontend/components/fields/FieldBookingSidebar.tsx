// Component sidebar đặt sân
// Hiển thị form đặt sân với khung giờ và các action buttons

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import Link from "next/link"

interface FieldBookingSidebarProps {
    fieldId: string
}

interface TimeSlot {
    time: string
    price: string
    available: boolean
}

export default function FieldBookingSidebar({ fieldId }: FieldBookingSidebarProps) {
    const timeSlots: TimeSlot[] = [
        { time: "05:00", price: "₫ 300.000", available: true },
        { time: "07:00", price: "₫ 350.000", available: true },
        { time: "09:00", price: "₫ 400.000", available: false },
        { time: "11:00", price: "₫ 400.000", available: true },
        { time: "13:00", price: "₫ 450.000", available: true },
        { time: "15:00", price: "₫ 450.000", available: true },
        { time: "17:00", price: "₫ 500.000", available: true },
        { time: "19:00", price: "₫ 500.000", available: false },
        { time: "21:00", price: "₫ 450.000", available: true },
    ]

    const getEndTime = (startTime: string) => {
        const hour = Number.parseInt(startTime.split(":")[0])
        return hour === 23 ? "00:00" : `${hour + 1}:00`
    }

    return (
        <Card className="sticky top-8 shadow-xl border-0 bg-gradient-to-br from-emerald-50 to-blue-50">
            <CardContent className="p-6">
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Calendar className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Đặt sân ngay</h3>
                    <p className="text-gray-600 mt-1">Chọn ngày và giờ phù hợp</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">Chọn ngày</label>
                        <input
                            type="date"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                            defaultValue="2024-01-15"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-3 text-gray-700">Khung giờ có sẵn</label>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                            {timeSlots.map((slot, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-white hover:shadow-md transition-all"
                                >
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-gray-800">{slot.time}</span>
                                            <span className="text-gray-500">- {getEndTime(slot.time)}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold text-emerald-600 text-lg">{slot.price}</span>
                                        {slot.available ? (
                                            <Link href={`/booking/${fieldId}`}>
                                                <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-medium px-4">
                                                    ĐẶT NGAY
                                                </Button>
                                            </Link>
                                        ) : (
                                            <Button size="sm" disabled className="bg-gray-400 text-gray-600">
                                                Đã đặt
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3 mt-6 pt-4 border-t border-gray-200">
                        <Link href={`/reviews/${fieldId}`}>
                            <Button
                                variant="outline"
                                className="w-full border-2 border-purple-500 text-purple-600 hover:bg-purple-50 bg-transparent font-medium"
                            >
                                📝 Xem đánh giá sân
                            </Button>
                        </Link>
                        <Link href={`/booking/${fieldId}`}>
                            <Button className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-medium">
                                📅 Xem lịch đặt chi tiết
                            </Button>
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
