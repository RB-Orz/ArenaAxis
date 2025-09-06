"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, MapPin, Upload, Clock } from "lucide-react"
import Link from "next/link"
import { getSports, createCommunityPost } from "@/services/api"
import { Sport } from "@/types"

export default function CreatePostPage() {
  const [formData, setFormData] = useState({
    title: "",
    sport: "",
    location: "",
    date: "",
    time: "",
    level: "",
    costType: "free", // free, split, total
    costAmount: "",
    description: "",
  })

  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [sports, setSports] = useState<Sport[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Fetch sports data on component mount
  useEffect(() => {
    const fetchSports = async () => {
      try {
        const sportsData = await getSports()
        setSports(sportsData)
      } catch (error) {
        console.error('Error fetching sports:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSports()
  }, [])

  const levels = ["Mới bắt đầu", "Nghiệp dư", "Trung cấp", "Cao cấp", "Chuyên nghiệp"]
  const bookingHistory = ["Sân tennis Saigon, Quận 1", "Sân bóng Thể Công, Quận 5", "Sân cầu lông Sunrise, Quận 7"]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    handleFileUpload(files)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const newPost = {
        title: formData.title,
        content: formData.description,
        author: {
          id: "current-user-id", // This should come from auth context
          name: "Current User",
          avatar: "/placeholder-user.jpg"
        },
        sport: formData.sport,
        location: formData.location,
        date: formData.date ? new Date(formData.date) : new Date(),
        time: formData.time,
        level: formData.level,
        participants: 0,
        maxParticipants: 20, // Default value
        cost: formData.costType === 'free' ? 'Miễn phí' : `${formData.costAmount}k VND`,
        likes: 0,
        comments: 0,
        tags: [formData.sport, formData.level].filter(Boolean),
        createdAt: new Date().toISOString()
      }

      const success = await createCommunityPost(newPost)

      if (success) {
        // Redirect to community page or show success message
        alert("Tạo bài viết thành công!")
        // You can add router.push("/community") here if using useRouter
      } else {
        alert("Có lỗi xảy ra khi tạo bài viết")
      }
    } catch (error) {
      console.error("Error creating post:", error)
      alert("Có lỗi xảy ra khi tạo bài viết")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Link href="/community" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Quay lại cộng đồng
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Tạo bài tuyển người chơi</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title" className="text-base font-medium">
                  Tiêu đề <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="VD: Tuyển thêm 2 người tennis 18:00"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="mt-2"
                  maxLength={80}
                  required
                />
                <div className="text-right text-sm text-gray-500 mt-1">{formData.title.length}/80</div>
              </div>

              <div>
                <Label htmlFor="sport" className="text-base font-medium">
                  Môn thể thao <span className="text-red-500">*</span>
                </Label>
                <select
                  id="sport"
                  value={formData.sport}
                  onChange={(e) => handleInputChange("sport", e.target.value)}
                  className="w-full mt-2 px-3 py-2 border rounded-lg bg-gray-100 text-gray-700"
                  required
                >
                  <option value="">Chọn môn thể thao</option>
                  {sports.map((sport) => (
                    <option key={sport.id} value={sport.name}>
                      {sport.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date" className="text-base font-medium">
                    Ngày <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    className="mt-2"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="time" className="text-base font-medium">
                    Giờ <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange("time", e.target.value)}
                    className="mt-2"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location" className="text-base font-medium">
                  Địa điểm <span className="text-red-500">*</span>
                </Label>
                <div className="relative mt-2">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="location"
                    placeholder="Nhập địa điểm hoặc chọn từ lịch sử đặt sân"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>

                <div className="mt-2">
                  <Label className="text-sm text-gray-600">Lịch sử đặt sân của bạn:</Label>
                  <select
                    value=""
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100 text-gray-700"
                  >
                    <option value="">Chọn trình độ</option>
                    {bookingHistory.map((location, index) => (
                      <option key={index} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <Label className="text-base font-medium">Chi phí</Label>
                <div className="mt-2 space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="free"
                      name="costType"
                      value="free"
                      checked={formData.costType === "free"}
                      onChange={(e) => handleInputChange("costType", e.target.value)}
                      className="w-4 h-4"
                    />
                    <Label htmlFor="free">Miễn phí</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="split"
                      name="costType"
                      value="split"
                      checked={formData.costType === "split"}
                      onChange={(e) => handleInputChange("costType", e.target.value)}
                      className="w-4 h-4"
                    />
                    <Label htmlFor="split">Chia đều</Label>
                    {formData.costType === "split" && (
                      <div className="flex items-center gap-2 ml-4">
                        <Input
                          placeholder="Số tiền/người"
                          value={formData.costAmount}
                          onChange={(e) => handleInputChange("costAmount", e.target.value)}
                          className="w-32"
                        />
                        <span className="text-sm text-gray-600">đ/người</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="total"
                      name="costType"
                      value="total"
                      checked={formData.costType === "total"}
                      onChange={(e) => handleInputChange("costType", e.target.value)}
                      className="w-4 h-4"
                    />
                    <Label htmlFor="total">Tổng chi phí</Label>
                    {formData.costType === "total" && (
                      <div className="flex items-center gap-2 ml-4">
                        <Input
                          placeholder="Tổng số tiền"
                          value={formData.costAmount}
                          onChange={(e) => handleInputChange("costAmount", e.target.value)}
                          className="w-32"
                        />
                        <span className="text-sm text-gray-600">đ</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description" className="text-base font-medium">
                  Mô tả
                </Label>
                <Textarea
                  id="description"
                  placeholder="Mô tả về buổi chơi, yêu cầu về trình độ, ghi chú đặc biệt..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="mt-2 min-h-[120px]"
                />
              </div>

              <div>
                <Label className="text-base font-medium">Hình ảnh/Video</Label>
                <div
                  className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">
                    <span className="font-medium">Kéo thả file hoặc </span>
                    <span className="text-blue-600 underline">chọn file</span>
                  </p>
                  <p className="text-sm text-gray-500">JPG, PNG, MP4 • Tối đa 50MB/file • Tối đa 5 file</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="hidden"
                  />
                </div>

                {isUploading && (
                  <div className="mt-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Đang tải lên...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 h-12">
                  Đăng bài tuyển người
                </Button>
                <Button type="button" variant="outline" className="px-6 h-12 bg-white border-gray-300 hover:bg-gray-50">
                  <Clock className="w-4 h-4 mr-2" />
                  Thời hạn bài
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
