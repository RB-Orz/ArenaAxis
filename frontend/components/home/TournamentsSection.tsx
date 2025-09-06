// Component hiển thị các giải đấu
// Cho phép người dùng xem và tham gia các giải đấu

import Link from "next/link"
import TournamentCard from "@/components/common/TournamentCard"
import { Tournament } from "@/types"

interface TournamentsSectionProps {
    tournaments: Tournament[] // Danh sách giải đấu được truyền từ parent
}

export default function TournamentsSection({ tournaments }: TournamentsSectionProps) {
    return (
        <section className="py-16 container mx-auto px-4">
            {/* Header với tiêu đề và link xem tất cả */}
            <div className="flex justify-between items-center mb-12">
                <h2 className="text-3xl font-bold">Giải đấu</h2>
                <Link
                    href="/tournaments"
                    className="text-green-600 hover:text-green-700 font-medium text-sm hover:underline transition-colors"
                >
                    Xem tất cả →
                </Link>
            </div>

            {/* Grid hiển thị các giải đấu */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {tournaments.slice(0, 8).map((tournament, index) => (
                    <TournamentCard
                        key={tournament.id || index} // Ưu tiên dùng ID, fallback về index
                        tournament={tournament} // Truyền thông tin giải đấu
                    />
                ))}
            </div>

            {/* Hiển thị message nếu không có giải đấu nào */}
            {tournaments.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500">Không có giải đấu nào đang diễn ra</p>
                </div>
            )}
        </section>
    )
}
