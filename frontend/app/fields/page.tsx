"use client"

import { useState, useEffect } from "react"
import { getFields } from "@/services/api"
import { Field } from "@/types"
import FieldsLoadingState from "@/components/fields/FieldsLoadingState"
import FieldsHeader from "@/components/fields/FieldsHeader"
import FieldsStats from "@/components/fields/FieldsStats"
import FieldsSearchSection from "@/components/fields/FieldsSearchSection"
import FieldsContent from "@/components/fields/FieldsContent"

export default function FieldsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchValue, setSearchValue] = useState("")
  const [fields, setFields] = useState<Field[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  useEffect(() => {
    async function fetchFields() {
      try {
        const apiFields = await getFields()
        setFields(apiFields)
      } catch (error) {
        console.error("Error fetching fields:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFields()
  }, [])

  const filteredFields = fields.filter(field =>
    field.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    field.location.toLowerCase().includes(searchValue.toLowerCase())
  )

  const handleFilterClick = () => {
    console.log("Open filter modal")
  }

  const handleFavoriteClick = (fieldId: string) => {
    console.log("Toggle favorite for field:", fieldId)
  }

  const handleMenuClick = (fieldId: string) => {
    console.log("Open menu for field:", fieldId)
  }

  const handleFiltersChange = (filters: string[]) => {
    setSelectedFilters(filters)
  }

  if (loading) {
    return <FieldsLoadingState />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Header */}
      <FieldsHeader totalFields={filteredFields.length} />

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <FieldsStats fields={fields} />

        {/* Search and Filter Section */}
        <FieldsSearchSection
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          selectedFilters={selectedFilters}
          onFiltersChange={handleFiltersChange}
          onFilterClick={handleFilterClick}
          filteredCount={filteredFields.length}
        />

        {/* Content Display */}
        <FieldsContent
          fields={filteredFields}
          viewMode={viewMode}
          onFavoriteClick={handleFavoriteClick}
          onMenuClick={handleMenuClick}
        />
      </div>
    </div>
  )
}
