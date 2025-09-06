// Component section tìm kiếm và bộ lọc cho trang fields  
// Bao gồm search bar, quick filters, view mode toggle

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Filter, Grid3X3, List } from "lucide-react"

interface FieldsSearchSectionProps {
    searchValue: string
    onSearchChange: (value: string) => void
    viewMode: "grid" | "list"
    onViewModeChange: (mode: "grid" | "list") => void
    selectedFilters: string[]
    onFiltersChange: (filters: string[]) => void
    onFilterClick: () => void
    filteredCount: number
}

export default function FieldsSearchSection({
    searchValue,
    onSearchChange,
    viewMode,
    onViewModeChange,
    selectedFilters,
    onFiltersChange,
    onFilterClick,
    filteredCount
}: FieldsSearchSectionProps) {
    const quickFilters = ["Bóng đá", "Tennis", "Bóng rổ", "Cầu lông", "Gần tôi", "Giá rẻ"]

    const toggleFilter = (filter: string) => {
        const newFilters = selectedFilters.includes(filter)
            ? selectedFilters.filter(f => f !== filter)
            : [...selectedFilters, filter]
        onFiltersChange(newFilters)
    }

    return (
        <Card className="mb-8 shadow-lg border-0 bg-white">
            <CardContent className="p-6">
                <div className="space-y-6">
                    {/* Search Bar */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                                placeholder="Tìm kiếm sân thể thao, địa điểm..."
                                className="pl-12 h-12 text-base border-2 focus:border-emerald-500 rounded-xl"
                                value={searchValue}
                                onChange={(e) => onSearchChange(e.target.value)}
                            />
                        </div>
                        <Button
                            variant="outline"
                            className="h-12 px-6 border-2 hover:border-emerald-500 hover:bg-emerald-50 rounded-xl whitespace-nowrap"
                            onClick={onFilterClick}
                        >
                            <Filter className="w-5 h-5 mr-2" />
                            Bộ lọc
                        </Button>
                    </div>

                    {/* Quick Filters */}
                    <div className="space-y-3">
                        <span className="text-sm font-medium text-gray-600 block">Lọc nhanh:</span>
                        <div className="flex flex-wrap gap-2">
                            {quickFilters.map((filter) => (
                                <Button
                                    key={filter}
                                    variant="outline"
                                    size="sm"
                                    className={`rounded-full transition-all ${selectedFilters.includes(filter)
                                        ? "bg-emerald-500 text-white border-emerald-500"
                                        : "hover:bg-emerald-50 hover:border-emerald-300"
                                        }`}
                                    onClick={() => toggleFilter(filter)}
                                >
                                    {filter}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Results and View Toggle */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            {searchValue && (
                                <p className="text-gray-600 text-sm sm:text-base">
                                    Tìm thấy <span className="font-bold text-emerald-600">{filteredCount}</span> kết quả cho "{searchValue}"
                                </p>
                            )}
                            {!searchValue && (
                                <p className="text-gray-600 text-sm sm:text-base">
                                    Hiển thị <span className="font-bold text-emerald-600">{filteredCount}</span> sân thể thao
                                </p>
                            )}
                        </div>

                        {/* View Mode Toggle */}
                        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => onViewModeChange("grid")}
                                className={`rounded-md px-4 py-2 transition-all ${viewMode === "grid"
                                    ? "bg-white shadow-sm text-emerald-600 font-medium"
                                    : "text-gray-600 hover:text-gray-800"
                                    }`}
                            >
                                <Grid3X3 className="w-4 h-4 mr-2" />
                                Lưới
                            </Button>
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => onViewModeChange("list")}
                                className={`rounded-md px-4 py-2 transition-all ${viewMode === "list"
                                    ? "bg-white shadow-sm text-emerald-600 font-medium"
                                    : "text-gray-600 hover:text-gray-800"
                                    }`}
                            >
                                <List className="w-4 h-4 mr-2" />
                                Danh sách
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
