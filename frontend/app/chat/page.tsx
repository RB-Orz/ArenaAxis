// Trang chat - nơi người dùng trao đổi tin nhắn với nhau
"use client"

import { useState, useEffect, useRef } from "react"
import ChatSidebar from "@/components/chat/ChatSidebar"
import ChatHeader from "@/components/chat/ChatHeader"
import MessageBubble from "@/components/chat/MessageBubble"
import MessageInput from "@/components/chat/MessageInput"
import { getChatRooms, getChatMessages, sendMessage } from "@/services/api"
import { ChatRoom, ChatMessage } from "@/types"

export default function ChatPage() {
  // State quản lý danh sách phòng chat
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])
  const [selectedChat, setSelectedChat] = useState<ChatRoom | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // State quản lý tin nhắn
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [sendingMessage, setSendingMessage] = useState(false)

  // Ref để auto scroll xuống tin nhắn mới nhất
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // useEffect để fetch danh sách phòng chat khi component mount
  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const roomsData = await getChatRooms()
        setChatRooms(roomsData)

        // Tự động chọn phòng chat đầu tiên
        if (roomsData.length > 0) {
          setSelectedChat(roomsData[0])
        }
      } catch (error) {
        console.error('Error fetching chat rooms:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchChatRooms()
  }, [])

  // useEffect để fetch tin nhắn khi thay đổi phòng chat
  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedChat) {
        try {
          const messagesData = await getChatMessages(selectedChat.id)
          setMessages(messagesData)
        } catch (error) {
          console.error('Error fetching messages:', error)
        }
      }
    }

    fetchMessages()
  }, [selectedChat])

  // useEffect để auto scroll xuống tin nhắn mới nhất
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Xử lý chọn phòng chat
  const handleSelectChat = (room: ChatRoom) => {
    setSelectedChat(room)
  }

  // Xử lý gửi tin nhắn
  const handleSendMessage = async (content: string) => {
    if (!selectedChat || !content.trim()) return

    setSendingMessage(true)
    try {
      // Gọi API gửi tin nhắn
      const success = await sendMessage(selectedChat.id, content)

      if (success) {
        // Thêm tin nhắn mới vào state (giả lập real-time)
        const newMessage: ChatMessage = {
          id: Date.now().toString(), // Tạm thời dùng timestamp làm ID
          text: content,
          senderId: "current-user", // Sẽ được thay thế bằng user ID thực
          roomId: selectedChat.id,
          timestamp: new Date(),
          type: "text"
        }

        setMessages(prev => [...prev, newMessage])

        // Cập nhật last message trong sidebar
        setChatRooms(prev =>
          prev.map(room =>
            room.id === selectedChat.id
              ? {
                ...room,
                lastMessage: {
                  id: newMessage.id,
                  text: newMessage.text,
                  senderId: newMessage.senderId,
                  timestamp: newMessage.timestamp
                }
              }
              : room
          )
        )
      }
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setSendingMessage(false)
    }
  }

  // Lọc phòng chat theo từ khóa tìm kiếm
  const filteredChatRooms = chatRooms.filter(room =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.lastMessage.text.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Hiển thị loading state
  if (loading) {
    return (
      <div className="h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải tin nhắn...</p>
        </div>
      </div>
    )
  }

  // Render giao diện chat chính
  return (
    <div className="h-screen bg-white flex">
      {/* Sidebar danh sách phòng chat */}
      <ChatSidebar
        chatRooms={filteredChatRooms}
        selectedChatId={selectedChat?.id || ""}
        onSelectChat={handleSelectChat}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Khu vực chat chính */}
      {selectedChat ? (
        <div className="flex-1 flex flex-col">
          {/* Header phòng chat */}
          <ChatHeader
            selectedChat={selectedChat}
            memberCount={4}
            onMembersClick={() => console.log('Show members')}
            onMoreClick={() => console.log('Show more options')}
          />

          {/* Danh sách tin nhắn */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isMe={message.senderId === "current-user"}
              />
            ))}

            {/* Div để auto scroll xuống tin nhắn mới nhất */}
            <div ref={messagesEndRef} />
          </div>

          {/* Thanh nhập tin nhắn */}
          <MessageInput
            onSendMessage={handleSendMessage}
            placeholder="Nhập tin nhắn..."
            disabled={sendingMessage}
          />
        </div>
      ) : (
        // Hiển thị khi chưa chọn phòng chat nào
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center text-gray-500">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-lg font-medium mb-2">Chọn một cuộc trò chuyện</h3>
            <p>Chọn một phòng chat để bắt đầu nhắn tin</p>
          </div>
        </div>
      )}
    </div>
  )
}
