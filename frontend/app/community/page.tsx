// Trang cộng đồng - nơi người dùng tìm kiếm và tham gia các hoạt động thể thao
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import CommunitySearchFilters from "@/components/community/CommunitySearchFilters"
import CommunityPostCard from "@/components/community/CommunityPostCard"
import { getCommunityPosts } from "@/services/api"
import { CommunityPost } from "@/types"

export default function CommunityPage() {
  // State quản lý bộ lọc tìm kiếm
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSport, setSelectedSport] = useState("Tất cả")
  const [selectedDistance, setSelectedDistance] = useState("Tất cả")

  // State quản lý dữ liệu bài viết
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const [loading, setLoading] = useState(true)
  const [filteredPosts, setFilteredPosts] = useState<CommunityPost[]>([])

  // useEffect để fetch dữ liệu bài viết khi component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await getCommunityPosts()
        setPosts(postsData)
        setFilteredPosts(postsData) // Khởi tạo filtered posts
      } catch (error) {
        console.error('Error fetching community posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  // useEffect để lọc bài viết khi các filter thay đổi
  useEffect(() => {
    let filtered = posts

    // Lọc theo từ khóa tìm kiếm
    if (searchQuery.trim()) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.sport.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Lọc theo môn thể thao
    if (selectedSport !== "Tất cả") {
      filtered = filtered.filter(post => post.sport === selectedSport)
    }

    // Lọc theo khoảng cách (tạm thời mock - trong thực tế sẽ tính toán với GPS)
    // if (selectedDistance !== "Tất cả") {
    //   // Logic lọc theo khoảng cách sẽ được implement khi có API thực
    // }

    setFilteredPosts(filtered)
  }, [searchQuery, selectedSport, selectedDistance, posts])

  // Xử lý like bài viết
  const handleLike = (postId: string) => {
    setPosts(currentPosts =>
      currentPosts.map(post =>
        post.id === postId
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    )
  }

  // Xử lý comment bài viết
  const handleComment = (postId: string) => {
    // Navigate đến trang chi tiết hoặc mở modal comment
    console.log('Comment on post:', postId)
  }

  // Xử lý tham gia hoạt động
  const handleJoin = (postId: string) => {
    // Gọi API để tham gia hoạt động
    console.log('Join activity:', postId)
    // Có thể cập nhật số lượng participants hoặc navigate đến chat
  }

  // Hiển thị loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải bài viết...</p>
        </div>
      </div>
    )
  }
  // Render giao diện chính
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Bộ lọc tìm kiếm */}
        <CommunitySearchFilters
          searchQuery={searchQuery}
          selectedSport={selectedSport}
          selectedDistance={selectedDistance}
          onSearchQueryChange={setSearchQuery}
          onSportChange={setSelectedSport}
          onDistanceChange={setSelectedDistance}
        />

        {/* Danh sách bài viết */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <CommunityPostCard
              key={post.id}
              post={post}
              onLike={handleLike}
              onComment={handleComment}
              onJoin={handleJoin}
            />
          ))}
        </div>

        {/* Hiển thị message khi không có bài viết */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🏆</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Không tìm thấy bài viết nào
            </h3>
            <p className="text-gray-600 mb-6">
              Thử thay đổi bộ lọc hoặc tạo một bài viết mới!
            </p>
          </div>
        )}

        {/* Nút tạo bài viết mới - floating action button */}
        <div className="fixed bottom-6 right-6">
          <Link href="/community/create">
            <Button className="bg-green-600 hover:bg-green-700 rounded-full w-16 h-16 shadow-lg">
              <Plus className="w-6 h-6" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
