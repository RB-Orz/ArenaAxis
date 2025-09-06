// Component hiển thị thông tin sân dưới dạng grid card
// Hiển thị thông tin đầy đủ với layout card đẹp mắt

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Clock, Star } from "lucide-react"
import { Field } from "@/types"

interface FieldGridCardProps {
    field: Field // Dữ liệu sân
    onFavoriteClick?: (fieldId: string) => void // Callback khi click yêu thích
    onMenuClick?: (fieldId: string) => void // Callback khi click menu
}

export default function FieldGridCard({
    field,
    onFavoriteClick,
    onMenuClick
}: FieldGridCardProps) {
    // Derive additional properties from Field data
    const fieldColor = field.sport === "Bóng đá" ? "bg-green-500" :
        field.sport === "Tennis" ? "bg-purple-500" :
            field.sport === "Bóng rổ" ? "bg-orange-500" :
                field.sport === "Cầu lông" ? "bg-blue-500" : "bg-gray-500"

    const fieldStatus = "available" // Default to available, can be derived from booking data
    const fieldTime = "05:00 - 23:00" // Default hours, can be made configurable
    const formattedPrice = field.price.toLocaleString('vi-VN') + "đ/h"

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            {/* Header với màu theme */}
            <div className={`${fieldColor} p-6 text-white relative`}>
                {/* Tags và actions */}
                <div className="flex justify-between items-start mb-4">
                    {/* Status tags */}
                    <div className="flex gap-2">
                        <span className="bg-white/20 px-2 py-1 rounded text-xs">
                            {fieldStatus === "available" ? "Đang mở" : "Đã đóng"}
                        </span>
                        <span className="bg-white/20 px-2 py-1 rounded text-xs">{field.sport}</span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2">
                        {/* Nút yêu thích */}
                        <button
                            className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                            onClick={() => onFavoriteClick?.(field.id)}
                            title="Thêm vào yêu thích"
                        >
                            <span className="text-sm">♡</span>
                        </button>

                        {/* Nút menu */}
                        <button
                            className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                            onClick={() => onMenuClick?.(field.id)}
                            title="Tùy chọn khác"
                        >
                            <span className="text-sm">⋯</span>
                        </button>
                    </div>
                </div>

                {/* Tên sân */}
                <h3 className="text-2xl font-bold mb-2">{field.name}</h3>
            </div>

            {/* Nội dung thông tin chi tiết */}
            <CardContent className="p-6">
                {/* Thông tin sân */}
                <div className="space-y-3 mb-4">
                    {/* Địa chỉ */}
                    <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="text-sm">{field.location}</span>
                    </div>

                    {/* Giờ mở cửa */}
                    <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="text-sm">{fieldTime}</span>
                    </div>

                    {/* Tiện ích */}
                    <div className="flex items-center text-gray-600">
                        <span className="text-sm mr-2">Tiện ích:</span>
                        <span className="text-green-600 text-sm">
                            {field.amenities.slice(0, 2).join(", ")}
                        </span>
                    </div>
                </div>

                {/* Footer với giá và rating và nút đặt */}
                <div className="flex items-center justify-between">
                    {/* Giá và rating */}
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">{formattedPrice}</span>
                        <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm ml-1">{field.rating}</span>
                        </div>
                    </div>

                    {/* Nút đặt lịch */}
                    {fieldStatus === "available" ? (
                        <Link href={`/fields/${field.id}`}>
                            <Button className="bg-orange-500 hover:bg-orange-600">
                                ĐẶT LỊCH
                            </Button>
                        </Link>
                    ) : (
                        <Button disabled className="bg-gray-400">
                            KHÔNG KHẢ DỤNG
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
