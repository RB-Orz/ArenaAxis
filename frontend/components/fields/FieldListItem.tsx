// Component hiển thị thông tin sân dưới dạng list item
// Layout horizontal compact cho view danh sách

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Clock, Star } from "lucide-react"
import { Field } from "@/types"

interface FieldListItemProps {
    field: Field // Dữ liệu sân
    onFavoriteClick?: (fieldId: string) => void // Callback khi click yêu thích
}

export default function FieldListItem({
    field,
    onFavoriteClick
}: FieldListItemProps) {
    // Derive additional properties from Field data
    const fieldColor = field.sport === "Bóng đá" ? "bg-green-500" :
        field.sport === "Tennis" ? "bg-purple-500" :
            field.sport === "Bóng rổ" ? "bg-orange-500" :
                field.sport === "Cầu lông" ? "bg-blue-500" : "bg-gray-500"

    const fieldStatus = "available" // Default to available
    const fieldTime = "05:00 - 23:00" // Default hours
    const formattedPrice = field.price.toLocaleString('vi-VN') + "đ/h"

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
                <div className="flex">
                    {/* Colored border trái */}
                    <div className={`${fieldColor} w-2 flex-shrink-0`}></div>

                    {/* Nội dung chính */}
                    <div className="flex-1 p-6">
                        <div className="flex items-center justify-between">
                            {/* Thông tin sân */}
                            <div className="flex-1">
                                {/* Header với tên và status */}
                                <div className="flex items-center gap-4 mb-2">
                                    <h3 className="text-xl font-bold">{field.name}</h3>

                                    {/* Status tags */}
                                    <div className="flex gap-2">
                                        <span
                                            className={`px-2 py-1 rounded text-xs text-white ${fieldStatus === "available" ? "bg-green-500" : "bg-gray-500"
                                                }`}
                                        >
                                            {fieldStatus === "available" ? "Đang mở" : "Đã đóng"}
                                        </span>
                                        <span className="px-2 py-1 rounded text-xs bg-blue-500 text-white">
                                            {field.sport}
                                        </span>
                                    </div>
                                </div>

                                {/* Grid thông tin chi tiết - responsive */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                                    {/* Địa chỉ */}
                                    <div className="flex items-center">
                                        <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                                        <span>{field.location}</span>
                                    </div>

                                    {/* Giờ mở cửa */}
                                    <div className="flex items-center">
                                        <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                                        <span>{fieldTime}</span>
                                    </div>

                                    {/* Giá và rating */}
                                    <div className="flex items-center gap-4">
                                        <span className="font-bold text-lg text-black">{formattedPrice}</span>
                                        <div className="flex items-center">
                                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                            <span className="ml-1">{field.rating}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action section */}
                            <div className="ml-6 flex items-center gap-3">
                                {/* Nút yêu thích */}
                                <button
                                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                                    onClick={() => onFavoriteClick?.(field.id)}
                                    title="Thêm vào yêu thích"
                                >
                                    <span className="text-sm">♡</span>
                                </button>

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
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
