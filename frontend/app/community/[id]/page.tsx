"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, ArrowLeft, Send } from "lucide-react"
import Link from "next/link"
import { getCommunityPostById } from "@/services/api"
import { CommunityPost } from "@/types"

export default function CommunityPostPage({ params }: { params: Promise<{ id: string }> }) {
  const [newComment, setNewComment] = useState("")
  const [isJoined, setIsJoined] = useState(false)
  const [post, setPost] = useState<CommunityPost | null>(null)
  const [loading, setLoading] = useState(true)

  // Unwrap params Promise using React.use()
  const { id } = React.use(params)

  // Fetch post data on component mount
  React.useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await getCommunityPostById(id)
        setPost(fetchedPost)
      } catch (error) {
        console.error('Error fetching post:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>Loading...</div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Bài viết không tìm thấy</h1>
          <Link href="/community">
            <Button>Quay lại cộng đồng</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Helper functions để derive values từ post data
  const getSportColor = (sport: string) => {
    const sportLower = sport.toLowerCase()
    if (sportLower.includes("tennis")) return "bg-purple-600"
    if (sportLower.includes("bóng đá")) return "bg-green-600"
    if (sportLower.includes("cầu lông")) return "bg-blue-600"
    return "bg-gray-600"
  }

  const getAuthorAvatar = (name: string) => {
    return name.charAt(0).toUpperCase()
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

  // Mock data for additional fields not in the interface
  const mockData = {
    date: "20/01/2024",
    time: "18:00 - 20:00",
    participants: "2/4 người",
    location: "Sân tennis Saigon, Quận 1",
    level: "Trung cấp",
    price: "50k/người",
    members: [
      { name: post.author.name, avatar: getAuthorAvatar(post.author.name), isHost: true, timeJoined: `Tham gia ${formatTimeAgo(post.createdAt)}` },
      { name: "Trần Thị Bình", avatar: "TB", isHost: false, timeJoined: "Tham gia 1 giờ trước" },
    ],
    comments: [
      {
        id: 1,
        author: { name: "Lê Minh Cường", avatar: "LC" },
        content: "Mình có thể tham gia được không? Level khá ổn 😊",
        timeAgo: "30 phút trước",
        replies: 2,
      },
      {
        id: 2,
        author: { name: "Phạm Thu Hà", avatar: "PH" },
        content: "Sân này có chỗ đậu xe không bạn?",
        timeAgo: "15 phút trước",
        replies: 0,
      },
    ],
    relatedPosts: [
      {
        title: "Thiếu 1 người đá bóng sáng mai",
        sport: "Bóng đá",
        time: "07:00 - 09:00",
        location: "Sân bóng Thể Công",
      },
      {
        title: "Tìm đối thủ cầu lông chiều nay",
        sport: "Cầu lông",
        time: "15:00 - 17:00",
        location: "Sân cầu lông Sunrise",
      },
    ],
  }

  const handleJoin = () => {
    setIsJoined(!isJoined)
  }

  const handleComment = () => {
    if (newComment.trim()) {
      // Add comment logic here
      setNewComment("")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-500 opacity-90"></div>
        <div className="container mx-auto px-4 py-12 relative z-10">
          <Link href="/community" className="inline-flex items-center gap-2 text-purple-200 hover:text-white mb-6">
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <Badge className="bg-red-500 text-white px-3 py-1">Đã hết hạn</Badge>
            <Badge className={`${getSportColor(post.sport)} text-white px-3 py-1`}>{post.sport}</Badge>
          </div>
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-4 text-gray-300">
              {post.sport === "Tennis" ? "Tennis Court" :
                post.sport === "Bóng đá" ? "Football Field" :
                  "Sports Court"}
            </h1>
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            <div className="flex items-center justify-center gap-6 text-purple-200">
              <span>
                {mockData.date} • {mockData.time}
              </span>
              <span>{mockData.participants}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {post.author.avatar}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-semibold">{post.author.name}</h3>
                  <Badge className="bg-green-600 text-white">Host</Badge>
                </div>
                <p className="text-gray-600">{formatTimeAgo(post.createdAt)}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5" />
                <span>{mockData.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Star className="w-5 h-5" />
                <span>Trình độ: {mockData.level}</span>
              </div>
              <div className="flex items-center gap-2 text-green-600 font-medium">
                <span>💰</span>
                <span>{mockData.price}</span>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-lg mb-3">Mô tả</h4>
              <p className="text-gray-700 leading-relaxed">{post.content}</p>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-lg mb-4">Thành viên tham gia {mockData.participants}</h4>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="space-y-3">
                  {mockData.members.map((member, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                        {member.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{member.name}</span>
                          {member.isHost && (
                            <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                              Host
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{member.timeJoined}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Bình luận ({mockData.comments.length})</h4>

              <div className="space-y-4 mb-6">
                {mockData.comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {comment.author.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">{comment.author.name}</span>
                          <span className="text-xs text-gray-500">{comment.timeAgo}</span>
                        </div>
                        <p className="text-gray-700 mb-2">{comment.content}</p>
                        {comment.replies > 0 && (
                          <button className="text-sm text-blue-600 hover:text-blue-700">
                            {comment.replies} phản hồi
                          </button>
                        )}
                      </div>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 h-8 px-3">
                        <Send className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comment Input */}
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold">
                  U
                </div>
                <div className="flex-1 flex gap-2">
                  <Input
                    placeholder="Viết bình luận..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleComment} className="bg-green-600 hover:bg-green-700">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h4 className="font-semibold text-lg mb-4">Bài tuyển tương tự</h4>
            <div className="space-y-3">
              {mockData.relatedPosts.map((relatedPost, index) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <h5 className="font-medium mb-2">{relatedPost.title}</h5>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>
                      {relatedPost.sport} • {relatedPost.time}
                    </div>
                    <div>{relatedPost.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
