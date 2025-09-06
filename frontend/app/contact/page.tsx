'use client'

// Import các components đã tách riêng
import ContactForm from "@/components/contact/ContactForm"
import ContactInfo from "@/components/contact/ContactInfo"
import ContactMap from "@/components/contact/ContactMap"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Phần header giới thiệu trang liên hệ */}
      <section className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Liên hệ với chúng tôi</h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Có câu hỏi hoặc cần hỗ trợ? Chúng tôi luôn sẵn sàng giúp đỡ bạn
            </p>
          </div>
        </div>
      </section>

      {/* Main Content - Nội dung chính với form và thông tin liên hệ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Information - Sử dụng component ContactInfo */}
            <div className="lg:col-span-1">
              <ContactInfo />
            </div>

            {/* Contact Form - Sử dụng component ContactForm */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section - Sử dụng component ContactMap */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Vị trí của chúng tôi</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Đến thăm văn phòng của chúng tôi hoặc tìm hiểu về các sân thể thao gần bạn
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <ContactMap
              title="Vị trí văn phòng"
              address="123 Đường Nguyễn Văn Cừ, Quận 1, TP.HCM"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section - Phần câu hỏi thường gặp */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Câu hỏi thường gặp</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tìm câu trả lời cho những câu hỏi phổ biến nhất
            </p>
          </div>

          <div className="max-w-3xl mx-auto grid gap-6">
            {/* Danh sách FAQ - có thể tách thành component riêng sau */}
            {[
              {
                question: "Làm thế nào để đặt sân thể thao?",
                answer: "Bạn có thể đặt sân thông qua ứng dụng hoặc website của chúng tôi. Chọn loại sân, thời gian và thanh toán trực tuyến."
              },
              {
                question: "Có thể hủy đặt sân không?",
                answer: "Có, bạn có thể hủy đặt sân trước 24 giờ để được hoàn tiền 100%. Hủy trong vòng 24 giờ sẽ tính phí 50%."
              },
              {
                question: "Ứng dụng có hỗ trợ thanh toán online không?",
                answer: "Có, chúng tôi hỗ trợ nhiều phương thức thanh toán: thẻ tín dụng, ví điện tử, chuyển khoản ngân hàng."
              },
              {
                question: "Làm sao để tham gia giải đấu?",
                answer: "Theo dõi trang giải đấu trên ứng dụng, đăng ký tham gia và thanh toán lệ phí. Chúng tôi sẽ gửi thông tin chi tiết qua email."
              }
            ].map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
