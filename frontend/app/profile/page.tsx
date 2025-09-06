"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Camera, Edit } from "lucide-react"
import Link from "next/link"
import { getCurrentUser } from "@/services/api"
import { User } from "@/types"

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Lấy dữ liệu user từ API
  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getCurrentUser()
        setUser(userData)
      } catch (error) {
        console.error("Error fetching user:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>Đang tải...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>Không thể tải thông tin người dùng</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-sm text-gray-600 mb-2">Home &gt; Profile</div>
        <h1 className="text-3xl font-bold mb-8">Hồ sơ cá nhân</h1>

        {/* Profile Information */}
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Thông tin cá nhân</CardTitle>
            <Link href="/profile/edit">
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Cập nhật thông tin
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  NA
                </div>
                <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div>
                <h3 className="font-semibold text-lg">{user.name}</h3>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-gray-600">{user.phone}</p>
              </div>
            </div>

            {/* User Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{user.stats.totalBookings}</div>
                <div className="text-sm text-gray-600">Lượt đặt sân</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{user.stats.totalTournaments}</div>
                <div className="text-sm text-gray-600">Giải đấu</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{user.stats.totalPosts}</div>
                <div className="text-sm text-gray-600">Bài viết</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Cài đặt thông báo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Nhắc nhở đặt sân</h4>
                <p className="text-sm text-gray-600">Nhận thông báo nhắc nhở về lịch đặt sân của bạn</p>
              </div>
              <Switch
                checked={user.notifications.booking}
                disabled
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Cập nhật giải đấu</h4>
                <p className="text-sm text-gray-600">Nhận thông báo về các giải đấu và sự kiện mới</p>
              </div>
              <Switch
                checked={user.notifications.tournament}
                disabled
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Tin nhắn cộng đồng</h4>
                <p className="text-sm text-gray-600">Nhận thông báo về tin nhắn từ cộng đồng thể thao</p>
              </div>
              <Switch
                checked={user.notifications.community}
                disabled
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Email</h4>
                <p className="text-sm text-gray-600">Nhận thông báo qua email</p>
              </div>
              <Switch
                checked={user.notifications.email}
                disabled
              />
            </div>
          </CardContent>
        </Card>

        {/* Bio và thông tin khác */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin cá nhân</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">Giới thiệu</Label>
              <p className="text-gray-600 mt-1">{user.bio || "Chưa có thông tin giới thiệu"}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Địa chỉ</Label>
              <p className="text-gray-600 mt-1">{user.location || "Chưa cập nhật địa chỉ"}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Môn thể thao yêu thích</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {user.favoriteSports.map((sport, index) => (
                  <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {sport}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
