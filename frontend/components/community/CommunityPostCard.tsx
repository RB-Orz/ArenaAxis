// Component hiển thị một bài viết trong cộng đồng
// Cho phép người dùng xem thông tin chi tiết và tương tác

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Heart, MessageCircle, Users } from "lucide-react"
import { CommunityPost } from "@/types"

interface CommunityPostCardProps {
    post: CommunityPost // Props nhận thông tin bài viết
    onLike?: (postId: string) => void // Callback khi like bài viết (optional)
    onComment?: (postId: string) => void // Callback khi comment (optional)
    onJoin?: (postId: string) => void // Callback khi tham gia (optional)
}

export default function CommunityPostCard({
    post,
    onLike,
    onComment,
    onJoin
}: CommunityPostCardProps) {
    // Helper functions để derive các giá trị từ CommunityPost data
    const getSportColor = (sport: string) => {
        const sportLower = sport.toLowerCase()
        if (sportLower.includes("bóng đá")) return "bg-green-500"
        if (sportLower.includes("tennis")) return "bg-blue-500"
        if (sportLower.includes("cầu lông")) return "bg-purple-500"
        if (sportLower.includes("bóng rổ")) return "bg-orange-500"
        return "bg-gray-500"
    }

    const formatTimeAgo = (createdAt: string) => {
        const now = new Date()
        const created = new Date(createdAt)
        const diffInMinutes = Math.floor((now.getTime() - created.getTime()) / (1000 * 60))

        if (diffInMinutes < 1) return "Vừa xong"
        if (diffInMinutes < 60) return `${diffInMinutes} phút trước`
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} giờ trước`
        return `${Math.floor(diffInMinutes / 1440)} ngày trước`
    }

    const getAuthorAvatar = (name: string) => {
        return name.charAt(0).toUpperCase()
    }

    // Derive values từ content hoặc sử dụng mock data
    const location = "Hà Nội" // Could be derived from content or tags
    const time = "19:00 - 21:00" // Could be derived from content
    const level = "Trung bình" // Could be derived from content or tags 
    const price = "150.000 VNĐ" // Could be derived from content
    const duration = "Còn 3 ngày" // Could be calculated from createdAt
    const participants = Math.floor(Math.random() * 10) + 1 // Mock data
    return (
        <Card className="hover:shadow-md transition-shadow bg-white">
            <CardContent className="p-6">
                {/* Thông tin tác giả */}
                <div className="flex items-center gap-3 mb-4">
                    {/* Avatar tác giả */}
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {getAuthorAvatar(post.author.name)}
                    </div>

                    {/* Tên và thời gian */}
                    <div>
                        <h4 className="font-semibold text-lg">{post.author.name}</h4>
                        <p className="text-sm text-gray-500">{formatTimeAgo(post.createdAt)}</p>
                    </div>
                </div>

                {/* Tiêu đề bài viết - có thể click để xem chi tiết */}
                <Link href={`/community/${post.id}`}>
                    <h3 className="text-xl font-bold mb-3 hover:text-green-600 cursor-pointer">
                        {post.title}
                    </h3>
                </Link>

                {/* Thông tin môn thể thao, địa điểm, thời gian */}
                <div className="flex items-center gap-4 mb-3 text-sm flex-wrap">
                    {/* Badge môn thể thao */}
                    <Badge className={`${getSportColor(post.sport)} text-white border-0`}>
                        {post.sport}
                    </Badge>

                    {/* Địa điểm */}
                    <div className="flex items-center gap-1 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span className="truncate">{location}</span>
                    </div>

                    {/* Thời gian */}
                    <div className="flex items-center gap-1 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{time}</span>
                    </div>
                </div>

                {/* Mô tả bài viết */}
                <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>

                {/* Thông tin chi tiết: level, chi phí, thời hạn */}
                <div className="flex items-center gap-3 mb-4 text-sm flex-wrap">
                    <span className="text-gray-600">
                        Level: <span className="font-medium">{level}</span>
                    </span>
                    <span className="text-gray-600">
                        Chi phí: <span className="font-medium text-green-600">{price}</span>
                    </span>
                    <span className="text-red-600 font-medium">{duration}</span>
                </div>

                {/* Hình ảnh minh họa cho bài viết */}
                <div className={`${getSportColor(post.sport)} text-white p-8 rounded-lg mb-4 text-center`}>
                    <h4 className="text-3xl font-bold">
                        {post.sport === "Tennis"
                            ? "🎾 Tennis Court"
                            : post.sport === "Bóng đá"
                                ? "⚽ Football Field"
                                : post.sport === "Cầu lông"
                                    ? "🏸 Badminton Court"
                                    : "🏆 Sports Court"}
                    </h4>
                </div>

                {/* Hành động: like, comment, tham gia */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        {/* Nút Like */}
                        <button
                            onClick={() => onLike?.(post.id)}
                            className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
                        >
                            <Heart className="w-4 h-4" />
                            <span>{post.likes}</span>
                        </button>

                        {/* Nút Comment */}
                        <button
                            onClick={() => onComment?.(post.id)}
                            className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors"
                        >
                            <MessageCircle className="w-4 h-4" />
                            <span>{post.comments}</span>
                        </button>

                        {/* Hiển thị số người đã tham gia */}
                        <span className="text-sm text-gray-600">{participants} đã tham gia</span>

                        {/* Nút Tham gia */}
                        <Button
                            size="sm"
                            onClick={() => onJoin?.(post.id)}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 h-8"
                        >
                            Tham gia
                        </Button>
                    </div>

                    {/* Số lượng thành viên */}
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium">{participants}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
