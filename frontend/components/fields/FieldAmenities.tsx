// Component hiển thị tiện ích và cơ sở vật chất
// Hiển thị danh sách các tiện ích có sẵn và không có

import { Card, CardContent } from "@/components/ui/card"
import { Wifi, Car, Users, Utensils, Shield } from "lucide-react"
import { Field } from "@/types"

interface FieldAmenitiesProps {
    field: Field
}

export default function FieldAmenities({ field }: FieldAmenitiesProps) {
    const amenities = [
        { name: "Free WiFi", icon: Wifi, available: true },
        { name: "Free Parking", icon: Car, available: false },
        { name: "Ball Rental", icon: Users, available: true },
        { name: "Shower Room", icon: Shield, available: true },
        { name: "Lockers", icon: Shield, available: false },
        { name: "Food & Drinks", icon: Utensils, available: true },
    ]

    return (
        <Card className="mb-8 shadow-lg border-0">
            <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Tiện ích & Cơ sở vật chất</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {amenities.map((amenity, index) => {
                        const isAvailable = field.amenities.includes(amenity.name)
                        return (
                            <div key={index} className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all hover:shadow-md ${isAvailable
                                ? "bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200 hover:border-emerald-300"
                                : "bg-gray-50 border-gray-200"
                                }`}>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isAvailable ? "bg-emerald-500" : "bg-gray-400"
                                    }`}>
                                    <amenity.icon className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                    <span className={`font-medium ${isAvailable ? "text-gray-900" : "text-gray-500"}`}>
                                        {amenity.name}
                                    </span>
                                    {isAvailable ? (
                                        <div className="text-xs text-emerald-600 font-medium">Có sẵn</div>
                                    ) : (
                                        <div className="text-xs text-gray-400">Không có</div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}
