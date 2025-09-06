"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Camera, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { getCurrentUser, updateUserProfile } from "@/services/api"
import { User, UpdateUserData } from "@/types"

export default function EditProfilePage() {
  const [profile, setProfile] = useState({
    name: "Nguyễn Văn An",
    email: "nguyenvanan@email.com",
    phone: "0123456789",
  })

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  })

  const [notifications, setNotifications] = useState({
    booking: true,
    tournament: false,
    community: true,
  })

  const handleSaveProfile = () => {
    // Save profile logic here
    console.log("Profile saved:", profile)
  }

  const handleChangePassword = () => {
    // Change password logic here
    console.log("Password changed")
    setPasswords({ current: "", new: "", confirm: "" })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/profile">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <div className="text-sm text-gray-600">đổi mật khẩu</div>
            <h1 className="text-2xl font-bold">Cập nhật thông tin</h1>
          </div>
        </div>

        {/* Profile Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Thông tin cá nhân
              <Button variant="ghost" size="sm">
                Hủy
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  NA
                </div>
                <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center text-white">
                  <Camera className="w-3 h-3" />
                </button>
              </div>
              <div>
                <h3 className="font-medium">Họ và tên</h3>
                <p className="text-sm text-gray-600">Đổi ảnh đại diện</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Email</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="email">Số điện thoại</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>
            </div>

            <Button onClick={handleSaveProfile} className="bg-green-600 hover:bg-green-700">
              Lưu thay
            </Button>
          </CardContent>
        </Card>

        {/* Change Password */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Đổi mật khẩu
              <Button variant="ghost" size="sm">
                Ẩn
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
              <Input
                id="current-password"
                type="password"
                placeholder="Nhập mật khẩu hiện tại"
                value={passwords.current}
                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="new-password">Mật khẩu mới</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="Nhập mật khẩu mới"
                value={passwords.new}
                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="confirm-password">Nhập lại mật khẩu mới</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Nhập lại mật khẩu mới"
                value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
              />
            </div>
            <Button onClick={handleChangePassword} className="bg-green-600 hover:bg-green-700">
              Đổi mật khẩu
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Quản lý thông báo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Nhắc nhở đặt sân</h4>
                <p className="text-sm text-gray-600">Nhận thông báo nhắc nhở về lịch đặt sân của bạn</p>
              </div>
              <Switch
                checked={notifications.booking}
                onCheckedChange={(checked) => setNotifications({ ...notifications, booking: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Cập nhật giải đấu</h4>
                <p className="text-sm text-gray-600">Nhận thông báo về các giải đấu và sự kiện mới</p>
              </div>
              <Switch
                checked={notifications.tournament}
                onCheckedChange={(checked) => setNotifications({ ...notifications, tournament: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Tin nhắn cộng đồng</h4>
                <p className="text-sm text-gray-600">Nhận thông báo về tin nhắn từ cộng đồng thể thao</p>
              </div>
              <Switch
                checked={notifications.community}
                onCheckedChange={(checked) => setNotifications({ ...notifications, community: checked })}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
