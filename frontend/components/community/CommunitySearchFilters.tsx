// Component bộ lọc tìm kiếm cho trang cộng đồng
// Cho phép tìm kiếm theo từ khóa, môn thể thao và khoảng cách

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface CommunitySearchFiltersProps {
    searchQuery: string // Từ khóa tìm kiếm hiện tại
    selectedSport: string // Môn thể thao được chọn
    selectedDistance: string // Khoảng cách được chọn
    onSearchQueryChange: (query: string) => void // Callback khi thay đổi từ khóa
    onSportChange: (sport: string) => void // Callback khi thay đổi môn thể thao
    onDistanceChange: (distance: string) => void // Callback khi thay đổi khoảng cách
}

export default function CommunitySearchFilters({
    searchQuery,
    selectedSport,
    selectedDistance,
    onSearchQueryChange,
    onSportChange,
    onDistanceChange
}: CommunitySearchFiltersProps) {
    // Danh sách các môn thể thao có sẵn
    const sports = ["Tất cả", "Tennis", "Bóng đá", "Cầu lông", "Bóng rổ"]

    // Danh sách các khoảng cách có sẵn
    const distances = ["Tất cả", "< 1km", "1-5km", "5-10km", "> 10km"]

    return (
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="space-y-4">
                {/* Ô tìm kiếm chính */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                        placeholder="Tìm bài tuyển theo môn/vị trí..."
                        value={searchQuery}
                        onChange={(e) => onSearchQueryChange(e.target.value)}
                        className="pl-10 h-12"
                    />
                </div>

                {/* Bộ lọc môn thể thao và khoảng cách */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Dropdown chọn môn thể thao */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Môn thể thao:
                        </label>
                        <select
                            value={selectedSport}
                            onChange={(e) => onSportChange(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg bg-white h-10 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        >
                            {sports.map((sport) => (
                                <option key={sport} value={sport}>
                                    {sport}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Dropdown chọn khoảng cách */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Khoảng cách:
                        </label>
                        <select
                            value={selectedDistance}
                            onChange={(e) => onDistanceChange(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg bg-white h-10 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        >
                            {distances.map((distance) => (
                                <option key={distance} value={distance}>
                                    {distance}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}
