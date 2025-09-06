// Dữ liệu mẫu cho ứng dụng
// Trong tương lai, dữ liệu này sẽ được fetch từ API
import { Field, Sport, Tournament, CommunityPost, Booking, ChatRoom, ChatMessage, Review, FieldReviewData, User } from '@/types'

// Dữ liệu user profile mẫu
export const currentUser: User = {
    id: "user1",
    name: "Nguyễn Văn An",
    email: "nguyenvanan@email.com",
    phone: "0123456789",
    avatar: "/placeholder-user.jpg",
    bio: "Yêu thích các môn thể thao, đặc biệt là bóng đá và tennis. Thích chơi thể thao với bạn bè vào cuối tuần.",
    location: "Quận 1, TP.HCM",
    favoriteSports: ["Bóng đá", "Tennis", "Cầu lông"],
    notifications: {
        booking: true,
        tournament: false,
        community: true,
        email: true,
        push: false
    },
    stats: {
        totalBookings: 25,
        totalTournaments: 3,
        totalPosts: 8
    },
    createdAt: "2024-01-15T00:00:00Z"
}

// Dữ liệu sân thể thao phổ biến
export const popularFields: Field[] = [
    {
        id: "1",
        name: "Journey Multi Sports Turf",
        location: "Phường Tân Bình",
        price: 300000,
        rating: 4.5,
        image: "/green-football-field.png",
        sport: "Bóng đá",
        amenities: ["Free WiFi", "Parking", "Ball Rental"],
        description: "Sân bóng đá hiện đại với cỏ nhân tạo chất lượng cao"
    },
    {
        id: "2",
        name: "Turf Up",
        location: "Khu vực Bình Thạnh",
        price: 400000,
        rating: 4.7,
        image: "/modern-football-turf-field.png",
        sport: "Bóng đá",
        amenities: ["Free WiFi", "Shower", "Locker"],
        description: "Sân bóng đá mini với trang thiết bị đầy đủ"
    },
    {
        id: "3",
        name: "Just Dribble",
        location: "Khu vực Gò Vấp",
        price: 350000,
        rating: 4.3,
        image: "/indoor-football-court.png",
        sport: "Bóng đá",
        amenities: ["Indoor", "Air Conditioning", "Security"],
        description: "Sân bóng đá trong nhà với hệ thống điều hòa"
    },
    {
        id: "4",
        name: "Bangkors Football Turf",
        location: "Khu vực Bình Tân",
        price: 500000,
        rating: 4.9,
        image: "/professional-football-field.png",
        sport: "Bóng đá",
        amenities: ["Professional Turf", "Lighting", "Changing Room"],
        description: "Sân bóng đá chuyên nghiệp với cỏ nhân tạo cao cấp"
    },
]

// Dữ liệu các môn thể thao
export const sports: Sport[] = [
    {
        id: "1",
        name: "Bóng đá",
        icon: "⚽",
        image: "/football-soccer-ball.png",
        description: "Môn thể thao vua phổ biến nhất thế giới",
        fieldCount: 25
    },
    {
        id: "2",
        name: "Bóng rổ",
        icon: "🏀",
        image: "/outdoor-basketball-court.png",
        description: "Môn thể thao đồng đội năng động",
        fieldCount: 12
    },
    {
        id: "3",
        name: "Tennis",
        icon: "🎾",
        image: "/outdoor-tennis-court.png",
        description: "Môn thể thao cá nhân đẳng cấp",
        fieldCount: 8
    },
    {
        id: "4",
        name: "Cầu lông",
        icon: "🏸",
        image: "/badminton-court.png",
        description: "Môn thể thao trong nhà phổ biến",
        fieldCount: 15
    },
    {
        id: "5",
        name: "Golf",
        icon: "⛳",
        image: "/lush-golf-course.png",
        description: "Môn thể thao cao cấp và thư giãn",
        fieldCount: 3
    },
]

// Dữ liệu giải đấu
export const tournaments: Tournament[] = [
    {
        id: "1",
        name: "Football Tournament",
        sport: "Bóng đá",
        startDate: "2025-10-15",
        endDate: "2025-10-20",
        location: "Quận 1, TP.HCM",
        prizePool: 20000000,
        maxTeams: 16,
        currentTeams: 12,
        image: "/football-tournament-poster.png",
        description: "Giải bóng đá lớn nhất năm với sự tham gia của các đội mạnh nhất thành phố"
    },
    {
        id: "2",
        name: "Basketball Championship",
        sport: "Bóng rổ",
        startDate: "2025-09-01",
        endDate: "2025-09-10",
        location: "Quận 7, TP.HCM",
        prizePool: 30000000,
        maxTeams: 12,
        currentTeams: 8,
        image: "/basketball-tournament-poster.png",
        description: "Giải bóng rổ chuyên nghiệp với format league hấp dẫn"
    },
    {
        id: "3",
        name: "Tennis Open",
        sport: "Tennis",
        startDate: "2025-11-20",
        endDate: "2025-11-25",
        location: "Quận 3, TP.HCM",
        prizePool: 20000000,
        maxTeams: 32,
        currentTeams: 24,
        image: "/tennis-tournament-poster.png",
        description: "Giải tennis mở rộng cho tất cả các tay vợt yêu thích môn thể thao này"
    },
    {
        id: "4",
        name: "Badminton Cup",
        sport: "Cầu lông",
        startDate: "2025-12-05",
        endDate: "2025-12-10",
        location: "Quận 5, TP.HCM",
        prizePool: 15000000,
        maxTeams: 24,
        currentTeams: 18,
        image: "/badminton-tournament-poster.png",
        description: "Giải cầu lông tranh cúp với nhiều hạng mục thi đấu"
    },
]

// Dữ liệu bài viết cộng đồng
export const communityPosts: CommunityPost[] = [
    {
        id: "1",
        title: "Cần 2 người chơi tennis giờ 18:00 tại Sân X",
        content: "Tìm 2 người chơi tennis cùng mình và bạn. Level trung cấp, chơi vui vẻ không cần quá cẳng thẳng. Chi phí chia đều cho 4 người.",
        author: {
            id: "1",
            name: "Nguyễn Văn An",
            avatar: "NA"
        },
        createdAt: "2025-08-29T16:00:00Z",
        tags: ["tennis", "trung cấp", "quận 1"],
        likes: 13,
        comments: 5,
        sport: "Tennis"
    },
    {
        id: "2",
        title: "Thiếu 1 người đá bóng sáng mai",
        content: "Team mình đang thiếu 1 người để đủ 11 vs 11. Chơi vui vẻ, không cần kỹ thuật quá cao. Ai có hứng thú inbox mình nhé!",
        author: {
            id: "2",
            name: "Trần Thị Bình",
            avatar: "TB"
        },
        createdAt: "2025-08-29T14:00:00Z",
        tags: ["bóng đá", "nghiệp dư", "quận 5"],
        likes: 8,
        comments: 3,
        sport: "Bóng đá"
    },
    {
        id: "3",
        title: "Tìm đối thủ cầu lông chiều nay",
        content: "Mình level khá cao, tìm người đánh để có trận đấu chất lượng. Sân có điều hòa, thông mát.",
        author: {
            id: "3",
            name: "Lê Minh Cường",
            avatar: "LC"
        },
        createdAt: "2025-08-29T11:00:00Z",
        tags: ["cầu lông", "cao cấp", "quận 7"],
        likes: 5,
        comments: 2,
        sport: "Cầu lông"
    },
]

// Dữ liệu lịch sử đặt sân
export const bookingHistory: Booking[] = [
    {
        id: "1",
        fieldId: "1",
        fieldName: "Sân bóng Thế Công",
        userId: "user1",
        date: "2025-08-30",
        time: "08:00 - 10:00",
        duration: 120,
        status: "confirmed",
        totalPrice: 300000,
        location: "123 Đường Lê Lợi, Quận 1",
        court: "Sân số 1",
        image: "/green-football-field.png"
    },
    {
        id: "2",
        fieldId: "2",
        fieldName: "Sân tennis Saigon",
        userId: "user1",
        date: "2025-08-28",
        time: "14:00 - 16:00",
        duration: 120,
        status: "completed",
        totalPrice: 400000,
        location: "789 Trần Hưng Đạo, Quận 5",
        court: "Sân tennis số 2",
        image: "/outdoor-tennis-court.png"
    },
    {
        id: "3",
        fieldId: "3",
        fieldName: "Sân cầu lông Sunrise",
        userId: "user1",
        date: "2025-08-31",
        time: "19:00 - 21:00",
        duration: 120,
        status: "confirmed",
        totalPrice: 160000,
        location: "321 Võ Văn Tần, Quận 3",
        court: "Sân cầu lông số 1",
        image: "/badminton-court.png"
    },
    {
        id: "4",
        fieldId: "4",
        fieldName: "Sân bóng đá Mini FC",
        userId: "user1",
        date: "2025-08-25",
        time: "16:00 - 18:00",
        duration: 120,
        status: "cancelled",
        totalPrice: 360000,
        location: "654 Pasteur, Quận 1",
        court: "Sân mini số 3",
        image: "/professional-football-field.png"
    },
    {
        id: "5",
        fieldId: "2",
        fieldName: "Sân tennis Vinhomes",
        userId: "user1",
        date: "2025-08-27",
        time: "10:00 - 12:00",
        duration: 120,
        status: "completed",
        totalPrice: 500000,
        location: "987 Nguyễn Văn Linh, Quận 7",
        court: "Sân tennis VIP",
        image: "/outdoor-tennis-court.png"
    },
    {
        id: "6",
        fieldId: "1",
        fieldName: "Sân bóng rổ Landmark",
        userId: "user1",
        date: "2025-08-31",
        time: "07:00 - 09:00",
        duration: 120,
        status: "confirmed",
        totalPrice: 240000,
        location: "456 Nguyễn Huệ, Quận 1",
        court: "Sân bóng rổ số 1",
        image: "/outdoor-basketball-court.png"
    },
]

// Dữ liệu phòng chat
export const chatRooms: ChatRoom[] = [
    {
        id: "1",
        name: "Tennis 18:00 - Sân X",
        type: "group",
        participants: [
            { id: "user1", name: "Nguyễn Văn An", avatar: "NA", isOnline: true },
            { id: "user2", name: "Lê Minh Cường", avatar: "LC", isOnline: false }
        ],
        lastMessage: {
            id: "last1",
            text: "Mình đã book sân rồi nè",
            senderId: "user1",
            timestamp: new Date()
        },
        unreadCount: 2
    },
    {
        id: "2",
        name: "Phạm Thu Hà",
        type: "private",
        participants: [
            { id: "user1", name: "Current User", avatar: "CU", isOnline: true },
            { id: "user2", name: "Phạm Thu Hà", avatar: "PH", isOnline: false }
        ],
        lastMessage: {
            id: "last2",
            text: "Cần có sân thi?",
            senderId: "user2",
            timestamp: new Date()
        },
        unreadCount: 0
    },
    {
        id: "3",
        name: "Bóng đá sáng mai",
        type: "group",
        participants: [
            { id: "user1", name: "Current User", avatar: "CU", isOnline: true },
            { id: "user3", name: "Trần Thị Bình", avatar: "TB", isOnline: true }
        ],
        lastMessage: {
            id: "last3",
            text: "Ai có thể đến sớm setup không?",
            senderId: "user3",
            timestamp: new Date()
        },
        unreadCount: 0
    },
]

// Dữ liệu tin nhắn
export const chatMessages: ChatMessage[] = [
    {
        id: "1",
        text: "Chào mọi người! Mình đã book sân rồi nè",
        senderId: "user1",
        roomId: "1",
        timestamp: new Date("2025-08-29T14:25:00Z"),
        type: "text"
    },
    {
        id: "2",
        text: "Lê Minh Cường đã tham gia nhóm",
        senderId: "system",
        roomId: "1",
        timestamp: new Date("2025-08-29T14:26:00Z"),
        type: "text"
    },
    {
        id: "3",
        text: "Xin chào! Mình có thể đến đúng giờ",
        senderId: "user2",
        roomId: "1",
        timestamp: new Date("2025-08-29T14:27:00Z"),
        type: "text"
    },
    {
        id: "4",
        text: "Sân có cho thuê vợt không các bạn?",
        senderId: "user3",
        roomId: "1",
        timestamp: new Date("2025-08-29T14:28:00Z"),
        type: "text"
    },
]

// Dữ liệu đánh giá cho các sân
export const fieldReviewsData: { [fieldId: string]: FieldReviewData } = {
    "1": {
        name: "Journey Multi Sports Turf",
        rating: 4.5,
        totalReviews: 127,
        ratingDistribution: {
            5: 76,
            4: 32,
            3: 13,
            2: 4,
            1: 2,
        }
    },
    "2": {
        name: "Turf Up",
        rating: 4.7,
        totalReviews: 89,
        ratingDistribution: {
            5: 58,
            4: 22,
            3: 7,
            2: 2,
            1: 0,
        }
    },
    "3": {
        name: "Just Dribble",
        rating: 4.3,
        totalReviews: 56,
        ratingDistribution: {
            5: 28,
            4: 18,
            3: 8,
            2: 2,
            1: 0,
        }
    },
    "4": {
        name: "Bangkors Football Turf",
        rating: 4.9,
        totalReviews: 234,
        ratingDistribution: {
            5: 198,
            4: 28,
            3: 6,
            2: 2,
            1: 0,
        }
    }
}

// Dữ liệu reviews cho từng sân
export const reviewsByField: { [fieldId: string]: Review[] } = {
    "1": [
        {
            id: "r1",
            fieldId: "1",
            user: "Nguyễn Văn A",
            avatar: "NA",
            rating: 4,
            comment: "Sân đẹp, thoáng mát, dịch vụ tốt. Sẽ quay lại lần sau!",
            timeAgo: "2 giờ trước",
            images: []
        },
        {
            id: "r2",
            fieldId: "1",
            user: "Trần Thị B",
            avatar: "TB",
            rating: 5,
            comment: "Sân chất lượng cao, nhân viên nhiệt tình",
            timeAgo: "1 ngày trước",
            images: []
        },
        {
            id: "r3",
            fieldId: "1",
            user: "Lê Văn C",
            avatar: "LC",
            rating: 5,
            comment: "Chơi vui, fair play",
            timeAgo: "3 ngày trước",
            images: []
        }
    ],
    "2": [
        {
            id: "r4",
            fieldId: "2",
            user: "Phạm Đức D",
            avatar: "PD",
            rating: 5,
            comment: "Sân rất đẹp, cỏ nhân tạo chất lượng cao!",
            timeAgo: "1 giờ trước",
            images: []
        },
        {
            id: "r5",
            fieldId: "2",
            user: "Hoàng Thị E",
            avatar: "HE",
            rating: 4,
            comment: "Giá hợp lý, dịch vụ tốt",
            timeAgo: "5 giờ trước",
            images: []
        }
    ],
    "3": [
        {
            id: "r6",
            fieldId: "3",
            user: "Vũ Minh F",
            avatar: "VF",
            rating: 4,
            comment: "Sân trong nhà mát mẻ, phù hợp chơi mùa hè",
            timeAgo: "2 ngày trước",
            images: []
        }
    ],
    "4": [
        {
            id: "r7",
            fieldId: "4",
            user: "Đỗ Thành G",
            avatar: "DG",
            rating: 5,
            comment: "Sân chuyên nghiệp nhất từng chơi!",
            timeAgo: "1 ngày trước",
            images: []
        },
        {
            id: "r8",
            fieldId: "4",
            user: "Bùi Hạnh H",
            avatar: "BH",
            rating: 5,
            comment: "Cơ sở vật chất hiện đại, tuyệt vời!",
            timeAgo: "3 ngày trước",
            images: []
        }
    ]
}

// Dữ liệu booking slots cho từng sân
export const fieldBookingSlots: Record<string, Array<{
    time: string;
    price: number;
    available: boolean;
    date?: string;
}>> = {
    "1": [
        { time: "05:00", price: 300000, available: true },
        { time: "07:00", price: 350000, available: true },
        { time: "09:00", price: 400000, available: false },
        { time: "11:00", price: 400000, available: true },
        { time: "13:00", price: 450000, available: true },
        { time: "15:00", price: 450000, available: true },
        { time: "17:00", price: 500000, available: true },
        { time: "19:00", price: 500000, available: false },
        { time: "21:00", price: 450000, available: true },
    ],
    "2": [
        { time: "06:00", price: 400000, available: true },
        { time: "08:00", price: 450000, available: false },
        { time: "10:00", price: 500000, available: true },
        { time: "12:00", price: 500000, available: true },
        { time: "14:00", price: 550000, available: true },
        { time: "16:00", price: 550000, available: true },
        { time: "18:00", price: 600000, available: false },
        { time: "20:00", price: 600000, available: true },
        { time: "22:00", price: 550000, available: true },
    ],
    "3": [
        { time: "05:30", price: 350000, available: true },
        { time: "07:30", price: 400000, available: true },
        { time: "09:30", price: 450000, available: true },
        { time: "11:30", price: 450000, available: false },
        { time: "13:30", price: 500000, available: true },
        { time: "15:30", price: 500000, available: true },
        { time: "17:30", price: 550000, available: true },
        { time: "19:30", price: 550000, available: true },
        { time: "21:30", price: 500000, available: false },
    ],
    "4": [
        { time: "06:00", price: 500000, available: true },
        { time: "08:00", price: 600000, available: true },
        { time: "10:00", price: 700000, available: false },
        { time: "12:00", price: 700000, available: true },
        { time: "14:00", price: 800000, available: true },
        { time: "16:00", price: 800000, available: true },
        { time: "18:00", price: 900000, available: true },
        { time: "20:00", price: 900000, available: false },
        { time: "22:00", price: 800000, available: true },
    ]
}
