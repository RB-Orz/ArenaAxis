// Component hiển thị danh sách sân phổ biến
// Nhận props là danh sách sân để hiển thị

import Link from "next/link"
import FieldCard from "@/components/common/FieldCard"
import { Field } from "@/types"

interface PopularFieldsSectionProps {
    fields: Field[] // Danh sách sân được truyền từ parent component
}

export default function PopularFieldsSection({ fields }: PopularFieldsSectionProps) {
    return (
        <section className="py-16 container mx-auto px-4">
            {/* Header với tiêu đề và link "Xem tất cả" */}
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Các sân phổ biến</h2>

                {/* Link đến trang danh sách đầy đủ */}
                <Link href="/fields" className="text-green-600 hover:underline">
                    Xem tất cả
                </Link>
            </div>

            {/* Grid hiển thị các sân */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {fields.map((field) => (
                    <FieldCard
                        key={field.id} // Key unique cho React
                        field={field} // Truyền thông tin sân vào component con
                    />
                ))}
            </div>

            {/* Hiển thị message nếu không có sân nào */}
            {fields.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500">Không có sân phổ biến nào để hiển thị</p>
                </div>
            )}
        </section>
    )
}
