// API Service layer - nơi tập trung tất cả các API calls
// Giúp dễ dàng quản lý và thay đổi API endpoints

import { Field, Sport, Tournament, CommunityPost, Booking, ChatRoom, ChatMessage, ApiResponse, Review, FieldReviewData, User, UpdateUserData } from '@/types'
import {
    popularFields,
    sports,
    tournaments,
    communityPosts,
    bookingHistory,
    chatRooms,
    chatMessages,
    fieldReviewsData,
    reviewsByField,
    currentUser,
    fieldBookingSlots
} from '@/data/mockData'

// Interface cho Payment API
interface PaymentData {
    accountNumber: string
    ifscCode: string
    name: string
    expiryDate?: string
    cvv?: string
}

interface PaymentResponse {
    success: boolean
    transactionId?: string
    message: string
}

// Base URL cho API - có thể thay đổi tùy environment
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

// Utility function để xử lý API calls
async function apiCall<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
            ...options,
        })

        const data = await response.json()

        if (!response.ok) {
            return {
                success: false,
                error: data.message || 'Có lỗi xảy ra'
            }
        }

        return {
            success: true,
            data: data
        }
    } catch (error) {
        return {
            success: false,
            error: 'Không thể kết nối tới server'
        }
    }
}

// =================
// FIELD SERVICES
// =================

// Lấy danh sách sân phổ biến
export async function getPopularFields(): Promise<Field[]> {
    // Tạm thời import dữ liệu mock, sau này sẽ thay bằng API call
    const { popularFields } = await import('@/data/mockData')
    return popularFields

    // Khi có API, uncomment đoạn code dưới:
    // const result = await apiCall<Field[]>('/fields/popular')
    // return result.success ? result.data! : []
}

// Lấy tất cả sân theo filter
export async function getFields(filters?: { sport?: string, location?: string }): Promise<Field[]> {
    const { popularFields } = await import('@/data/mockData')
    return popularFields

    // API call version:
    // const queryParams = new URLSearchParams(filters as any).toString()
    // const result = await apiCall<Field[]>(`/fields?${queryParams}`)
    // return result.success ? result.data! : []
}

// Lấy chi tiết một sân
export async function getFieldById(id: string): Promise<Field | null> {
    const { popularFields } = await import('@/data/mockData')
    return popularFields.find((field: Field) => field.id === id) || null

    // API call version:
    // const result = await apiCall<Field>(`/fields/${id}`)
    // return result.success ? result.data! : null
}

// Lấy các slot booking cho một sân cụ thể
export async function getFieldBookingSlots(fieldId: string, date?: string): Promise<Array<{
    time: string;
    price: number;
    available: boolean;
    date?: string;
}>> {
    const { fieldBookingSlots } = await import('@/data/mockData')
    return fieldBookingSlots[fieldId] || []

    // API call version:
    // const queryParams = date ? `?date=${date}` : ''
    // const result = await apiCall<Array<any>>(`/fields/${fieldId}/slots${queryParams}`)
    // return result.success ? result.data! : []
}

// =================
// SPORT SERVICES
// =================

// Lấy danh sách môn thể thao
export async function getSports(): Promise<Sport[]> {
    const { sports } = await import('@/data/mockData')
    return sports

    // API call version:
    // const result = await apiCall<Sport[]>('/sports')
    // return result.success ? result.data! : []
}

// =================
// TOURNAMENT SERVICES
// =================

// Lấy danh sách giải đấu
export async function getTournaments(): Promise<Tournament[]> {
    const { tournaments } = await import('@/data/mockData')
    return tournaments

    // API call version:
    // const result = await apiCall<Tournament[]>('/tournaments')
    // return result.success ? result.data! : []
}

// =================
// COMMUNITY SERVICES
// =================

// Lấy bài viết cộng đồng
export async function getCommunityPosts(filters?: { sport?: string, distance?: string }): Promise<CommunityPost[]> {
    const { communityPosts } = await import('@/data/mockData')
    return communityPosts

    // API call version:
    // const queryParams = new URLSearchParams(filters as any).toString()
    // const result = await apiCall<CommunityPost[]>(`/community/posts?${queryParams}`)
    // return result.success ? result.data! : []
}

// Lấy bài viết cộng đồng theo ID
export async function getCommunityPostById(id: string): Promise<CommunityPost | null> {
    try {
        const post = communityPosts.find(p => p.id === id) || null
        return post
    } catch (error) {
        console.error('Error fetching community post:', error)
        return null
    }
}

// Tạo bài viết mới
export async function createCommunityPost(post: Omit<CommunityPost, 'id'>): Promise<boolean> {
    // Mock success response
    return true

    // API call version:
    // const result = await apiCall<CommunityPost>('/community/posts', {
    //   method: 'POST',
    //   body: JSON.stringify(post)
    // })
    // return result.success
}

// =================
// BOOKING SERVICES
// =================

// Lấy lịch sử đặt sân
export async function getBookingHistory(status?: string): Promise<Booking[]> {
    const { bookingHistory } = await import('@/data/mockData')

    if (status && status !== 'Tất cả') {
        return bookingHistory.filter(booking => booking.status === status)
    }

    return bookingHistory

    // API call version:
    // const queryParams = status ? `?status=${status}` : ''
    // const result = await apiCall<Booking[]>(`/bookings${queryParams}`)
    // return result.success ? result.data! : []
}

// Đặt sân mới
export async function createBooking(bookingData: any): Promise<boolean> {
    // Mock success response
    return true

    // API call version:
    // const result = await apiCall<Booking>('/bookings', {
    //   method: 'POST',
    //   body: JSON.stringify(bookingData)
    // })
    // return result.success
}

// Lấy thông tin đặt sân theo ID
export async function getBookingById(id: string): Promise<Booking | null> {
    try {
        const booking = bookingHistory.find(b => b.id === id) || null
        return booking
    } catch (error) {
        console.error('Error fetching booking:', error)
        return null
    }
}

// Hủy đặt sân
export async function cancelBooking(bookingId: string): Promise<boolean> {
    // Mock success response
    return true

    // API call version:
    // const result = await apiCall<void>(`/bookings/${bookingId}/cancel`, {
    //   method: 'POST'
    // })
    // return result.success
}

// =================
// CHAT SERVICES
// =================

// Lấy danh sách phòng chat
export async function getChatRooms(): Promise<ChatRoom[]> {
    const { chatRooms } = await import('@/data/mockData')
    return chatRooms

    // API call version:
    // const result = await apiCall<ChatRoom[]>('/chat/rooms')
    // return result.success ? result.data! : []
}

// Lấy tin nhắn trong phòng
export async function getChatMessages(roomId: string): Promise<ChatMessage[]> {
    const { chatMessages } = await import('@/data/mockData')
    return chatMessages

    // API call version:
    // const result = await apiCall<ChatMessage[]>(`/chat/rooms/${roomId}/messages`)
    // return result.success ? result.data! : []
}

// Gửi tin nhắn
export async function sendMessage(roomId: string, content: string): Promise<boolean> {
    // Mock success response
    return true

    // API call version:
    // const result = await apiCall<ChatMessage>(`/chat/rooms/${roomId}/messages`, {
    //   method: 'POST',
    //   body: JSON.stringify({ content })
    // })
    // return result.success
}

// === PAYMENT SERVICES ===
// API liên quan đến thanh toán

// Xử lý thanh toán
export async function processPayment(
    bookingId: string,
    paymentData: PaymentData,
    method: string
): Promise<PaymentResponse> {
    // Mock processing time
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Giả lập xử lý thanh toán với 90% success rate
    const success = Math.random() > 0.1

    if (success) {
        return {
            success: true,
            transactionId: `TXN_${Date.now()}`,
            message: "Thanh toán thành công!"
        }
    } else {
        return {
            success: false,
            message: "Thanh toán thất bại. Vui lòng thử lại."
        }
    }

    // API call version:
    // const result = await apiCall<PaymentResponse>('/payment/process', {
    //   method: 'POST',
    //   body: JSON.stringify({ bookingId, paymentData, method })
    // })
    // return result.data!
}

// Lấy lịch sử thanh toán
export async function getPaymentHistory(userId: string): Promise<any[]> {
    const mockPaymentHistory = [
        {
            id: "PAY_001",
            bookingId: "1",
            amount: 650000,
            method: "card",
            status: "completed",
            transactionId: "TXN_1699123456789",
            createdAt: "2024-11-05T10:30:00Z"
        },
        {
            id: "PAY_002",
            bookingId: "2",
            amount: 1200000,
            method: "bank",
            status: "pending",
            transactionId: "TXN_1699234567890",
            createdAt: "2024-11-08T15:45:00Z"
        }
    ]

    return mockPaymentHistory

    // API call version:
    // const result = await apiCall<any[]>(`/payment/history/${userId}`)
    // return result.success ? result.data! : []
}

// === TOURNAMENTS SERVICES ===
// API liên quan đến giải đấu

// Lấy chi tiết giải đấu
export async function getTournamentById(id: string): Promise<Tournament | null> {
    const { tournaments } = await import('@/data/mockData')
    return tournaments.find((tournament: Tournament) => tournament.id?.toString() === id) || null

    // API call version:
    // const result = await apiCall<Tournament>(`/tournaments/${id}`)
    // return result.success ? result.data! : null
}

// Đăng ký tham gia giải đấu
export async function registerTournament(tournamentId: string, userId: string): Promise<boolean> {
    // Mock success response
    return true

    // API call version:
    // const result = await apiCall<any>('/tournaments/register', {
    //   method: 'POST',
    //   body: JSON.stringify({ tournamentId, userId })
    // })
    // return result.success
}

// === REVIEWS SERVICES ===
// API liên quan đến đánh giá

// Lấy đánh giá theo field ID
export async function getFieldReviews(fieldId: string): Promise<{ fieldData: FieldReviewData | null, reviews: Review[] }> {
    try {
        const fieldData = fieldReviewsData[fieldId] || null
        const reviews = reviewsByField[fieldId] || []

        return { fieldData, reviews }
    } catch (error) {
        console.error('Error fetching field reviews:', error)
        return { fieldData: null, reviews: [] }
    }
}

// Thêm đánh giá mới
export async function addReview(fieldId: string, reviewData: Omit<Review, 'id' | 'fieldId'>): Promise<boolean> {
    try {
        // Trong production, sẽ gọi API để lưu đánh giá
        // const result = await apiCall(`/fields/${fieldId}/reviews`, {
        //     method: 'POST',
        //     body: JSON.stringify(reviewData)
        // })
        // return result.success

        // Mock implementation
        return true
    } catch (error) {
        console.error('Error adding review:', error)
        return false
    }
}

// === USER/PROFILE SERVICES ===
// API liên quan đến user profile

// Lấy thông tin user hiện tại
export async function getCurrentUser(): Promise<User | null> {
    try {
        const { currentUser } = await import('@/data/mockData')
        return currentUser
    } catch (error) {
        console.error('Error fetching current user:', error)
        return null
    }

    // API call version:
    // const result = await apiCall<User>('/user/profile')
    // return result.success ? result.data! : null
}

// Cập nhật thông tin user
export async function updateUserProfile(userData: UpdateUserData): Promise<boolean> {
    try {
        // Mock implementation - trong production sẽ gọi API
        // const result = await apiCall<User>('/user/profile', {
        //     method: 'PUT',
        //     body: JSON.stringify(userData)
        // })
        // return result.success

        return true
    } catch (error) {
        console.error('Error updating user profile:', error)
        return false
    }
}

// Thay đổi mật khẩu
export async function changePassword(currentPassword: string, newPassword: string): Promise<boolean> {
    try {
        // Mock implementation
        // const result = await apiCall<void>('/user/change-password', {
        //     method: 'POST',
        //     body: JSON.stringify({ currentPassword, newPassword })
        // })
        // return result.success

        return true
    } catch (error) {
        console.error('Error changing password:', error)
        return false
    }
}

// Upload avatar
export async function uploadAvatar(file: File): Promise<string | null> {
    try {
        // Mock implementation - trả về URL ảnh
        // const formData = new FormData()
        // formData.append('avatar', file)
        // const result = await apiCall<{url: string}>('/user/avatar', {
        //     method: 'POST',
        //     body: formData
        // })
        // return result.success ? result.data!.url : null

        return "/placeholder-user.jpg"
    } catch (error) {
        console.error('Error uploading avatar:', error)
        return null
    }
}
