// Component hiển thị các môn thể thao
// Cho phép người dùng browse theo từng môn thể thao

import SportCard from "@/components/common/SportCard"
import { Sport } from "@/types"

interface SportsCategoriesSectionProps {
    sports: Sport[] // Danh sách môn thể thao được truyền từ parent
}

export default function SportsCategoriesSection({ sports }: SportsCategoriesSectionProps) {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                {/* Tiêu đề section */}
                <h2 className="text-3xl font-bold text-center mb-12">Thể loại</h2>

                {/* Grid responsive hiển thị các môn thể thao */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {sports.map((sport, index) => (
                        <SportCard
                            key={index} // Key unique cho React (có thể dùng sport.name nếu unique)
                            sport={sport} // Truyền thông tin môn thể thao
                        />
                    ))}
                </div>

                {/* Hiển thị message nếu không có môn thể thao nào */}
                {sports.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Không có môn thể thao nào để hiển thị</p>
                    </div>
                )}
            </div>
        </section>
    )
}
