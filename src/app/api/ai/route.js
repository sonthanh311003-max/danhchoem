import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { prompt, type, apiKey } = await request.json();

    // 1. Xác định API Key để dùng
    // Ưu tiên key gửi từ client (lưu local của người dùng), sau đó đến biến môi trường server
    const activeKey = apiKey || process.env.GEMINI_API_KEY;

    if (!activeKey) {
      return NextResponse.json(
        { error: 'Chưa cấu hình Gemini API Key. Vui lòng điền Key ở tab Cấu hình chung trên Dashboard.' },
        { status: 400 }
      );
    }

    // 2. Thiết lập prompt chi tiết gửi tới AI
    let systemInstruction = '';
    if (type === 'poem') {
      systemInstruction = `Bạn là một nhà thơ lãng mạn, đáng yêu. Hãy viết một bài thơ tình cảm ngọt ngào, ấm áp dựa trên kỷ niệm ngắn được cung cấp dưới đây. Bài thơ nên chia làm 2-3 khổ thơ, có vần điệu dễ thương, sử dụng các đại từ xưng hô tự nhiên như anh/em hoặc tụi mình. Tránh sáo rỗng. Hãy chèn một vài emoji phù hợp.`;
    } else if (type === 'letter') {
      systemInstruction = `Bạn là một người tình sâu sắc, lãng mạn. Hãy viết một bức thư tình chân thành, đầy xúc cảm để gửi cho nửa kia của mình dựa trên câu chuyện được chia sẻ. Bức thư cần mang giọng điệu ấm áp, ngọt ngào, chân thật, thể hiện lòng biết ơn và tình yêu thương vô bờ bến.`;
    } else {
      systemInstruction = `Hãy gợi ý 3 caption cực kỳ đáng yêu, bắt trend, lãng mạn hoặc pha chút hài hước kèm emoji để đăng ảnh lên mạng xã hội (Instagram, Facebook) dựa trên sự kiện được cung cấp. Cung cấp trực tiếp 3 caption, đánh số 1, 2, 3 rõ ràng.`;
    }

    const fullPrompt = `${systemInstruction}\n\nKỷ niệm/Cảm xúc của người dùng: "${prompt}"`;

    // 3. Gọi trực tiếp API Gemini của Google
    // Sử dụng model gemini-1.5-flash miễn phí và tốc độ phản hồi cực nhanh
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${activeKey}`;

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: fullPrompt
              }
            ]
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini API Error details:', data);
      return NextResponse.json(
        { error: data.error?.message || 'Lỗi khi gọi API Gemini từ Google. Vui lòng kiểm tra lại API Key.' },
        { status: response.status }
      );
    }

    // Trích xuất nội dung từ phản hồi của Gemini
    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!aiText) {
      return NextResponse.json(
        { error: 'Không nhận được kết quả xử lý từ AI.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ result: aiText.trim() });

  } catch (error) {
    console.error('API AI Route Error:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra trong quá trình xử lý yêu cầu.' },
      { status: 500 }
    );
  }
}
