// Định nghĩa các interface cho dữ liệu ứng dụng
// Giúp TypeScript kiểm tra kiểu dữ liệu và IDE hỗ trợ autocomplete

// Interface cho thông tin sân thể thao
export interface Field {
    id: string // Thay đổi từ number sang string để đồng bộ
    name: string
    location: string
    price: number // Thay đổi từ string sang number
    rating: number
    image: string
    sport: string // Bắt buộc
    amenities: string[] // Bắt buộc
    description: string // Thêm description
}

// Interface cho các môn thể thao
export interface Sport {
    id: string // Thêm id
    name: string
    icon: string
    description: string // Thêm description
    fieldCount: number // Thêm fieldCount
    image: string
}

// Interface cho giải đấu
export interface Tournament {
    id: string // Thay đổi từ number sang string
    name: string
    sport: string // Thêm sport
    startDate: string // Bắt buộc
    endDate: string // Bắt buộc
    location: string // Bắt buộc
    prizePool: number // Thêm prizePool
    maxTeams: number // Thêm maxTeams
    currentTeams: number // Thêm currentTeams
    image: string
    description: string // Bắt buộc
}

// Interface cho participant trong chat
export interface ChatParticipant {
    id: string
    name: string
    avatar: string
    isOnline: boolean
}

// Interface cho tin nhắn trong chat
export interface ChatMessage {
    id: string // Thay đổi từ number sang string
    text: string // Thay đổi từ content sang text
    senderId: string // Thay đổi từ sender sang senderId
    roomId: string // Thêm roomId
    timestamp: Date // Thay đổi từ time sang timestamp
    type: "text" | "image" | "file" // Thêm type
}

// Interface cho phòng chat
export interface ChatRoom {
    id: string // Thay đổi từ number sang string
    name: string
    type: "group" | "private" // Thêm type
    participants: ChatParticipant[] // Thay đổi structure
    lastMessage: {
        id: string
        text: string
        senderId: string
        timestamp: Date
    } // Thay đổi structure
    unreadCount: number // Thay đổi từ unread sang unreadCount
}

// Interface cho author trong community
export interface CommunityAuthor {
    id: string
    name: string
    avatar: string
}

// Interface cho bài viết cộng đồng
export interface CommunityPost {
    id: string // Thay đổi từ number sang string
    title: string
    content: string // Thêm content
    author: CommunityAuthor // Sửa structure
    createdAt: string // Thay đổi từ timeAgo
    tags: string[] // Thêm tags
    likes: number
    comments: number
    sport: string
}

// Interface cho lịch sử đặt sân
export interface Booking {
    id: string // Thay đổi từ number sang string
    fieldId: string // Thêm fieldId
    fieldName: string // Thay đổi từ name sang fieldName
    userId: string // Thêm userId
    date: string
    time: string
    duration: number // Thay đổi sang number (minutes)
    status: "confirmed" | "pending" | "completed" | "cancelled" // Sửa values
    totalPrice: number // Thay đổi từ price sang totalPrice (number)
    location?: string // Thêm location (optional)
    court?: string // Thêm court (optional)
    image?: string // Thêm image (optional)
}

// Interface cho user
export interface User {
    id: string
    name: string
    email: string
    phone: string
    avatar?: string
    bio?: string
    location?: string
    favoriteSports: string[]
    notifications: {
        booking: boolean
        tournament: boolean
        community: boolean
        email: boolean
        push: boolean
    }
    stats: {
        totalBookings: number
        totalTournaments: number
        totalPosts: number
    }
    createdAt: string
}

// Interface cho API response chung
export interface ApiResponse<T> {
    success: boolean
    data?: T
    message?: string
    error?: string
}

// Interface cho review/đánh giá
export interface Review {
    id: string
    fieldId: string
    user: string
    avatar: string
    rating: number
    comment: string
    timeAgo: string
    images: string[]
}

// Interface cho dữ liệu review của sân
export interface FieldReviewData {
    name: string
    rating: number
    totalReviews: number
    ratingDistribution: {
        5: number
        4: number
        3: number
        2: number
        1: number
    }
}

// Interface cho Update User Profile
export interface UpdateUserData {
    name?: string
    email?: string
    phone?: string
    bio?: string
    location?: string
    favoriteSports?: string[]
    notifications?: Partial<User['notifications']>
}
