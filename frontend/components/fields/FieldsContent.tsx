// Component hiển thị nội dung danh sách sân
// Hỗ trợ cả grid view và list view

import { Field } from "@/types"
import FieldGridCard from "./FieldGridCard"
import FieldListItem from "./FieldListItem"

interface FieldsContentProps {
    fields: Field[]
    viewMode: "grid" | "list"
    onFavoriteClick: (fieldId: string) => void
    onMenuClick?: (fieldId: string) => void
}

export default function FieldsContent({
    fields,
    viewMode,
    onFavoriteClick,
    onMenuClick
}: FieldsContentProps) {
    return (
        <div className="mb-8">
            {viewMode === "grid" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {fields.map((field) => (
                        <FieldGridCard
                            key={field.id}
                            field={field}
                            onFavoriteClick={onFavoriteClick}
                            onMenuClick={onMenuClick}
                        />
                    ))}
                </div>
            )}

            {viewMode === "list" && (
                <div className="space-y-4">
                    {fields.map((field) => (
                        <FieldListItem
                            key={field.id}
                            field={field}
                            onFavoriteClick={onFavoriteClick}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
