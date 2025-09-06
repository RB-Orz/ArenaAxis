// Component Hero Section - phần banner chính của trang chủ
// Hiển thị tiêu đề, mô tả và các nút đăng nhập/đăng ký

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
    return (
        <section className="relative bg-black text-white py-20">
            {/* Background image với overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30">
                <img
                    src="/football-player-kicking-ball-stadium-lights.png"
                    alt="Hero background"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Nội dung chính */}
            <div className="relative container mx-auto px-4 text-center">
                {/* Tiêu đề chính */}
                <h1 className="text-5xl font-bold mb-4">SportBooking</h1>

                {/* Mô tả */}
                <p className="text-xl mb-8">Choose the ideal court according to your playing style and budget</p>

                {/* Các nút call-to-action */}
                <div className="flex gap-4 justify-center">
                    {/* Nút đăng nhập */}
                    <Link href="/login">
                        <Button size="lg" className="bg-green-600 hover:bg-green-700">
                            Sign In
                        </Button>
                    </Link>

                    {/* Nút đăng ký */}
                    <Link href="/signup">
                        <Button
                            size="lg"
                            variant="outline"
                            className="text-white border-white hover:bg-white hover:text-black bg-transparent"
                        >
                            Sign Up
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
