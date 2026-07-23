import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'Không tìm thấy file tải lên.' }, { status: 400 });
    }

    // 1. Kiểm tra biến môi trường Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ 
        error: 'Chưa cấu hình cơ sở dữ liệu Supabase trên Vercel. Chuyển sang chế độ lưu trữ cục bộ tạm thời.' 
      }, { status: 400 });
    }

    // 2. Khởi tạo Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Chuyển file thành buffer để upload
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Tạo tên file ngẫu nhiên tránh trùng lặp
    const fileExtension = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExtension}`;
    const filePath = `uploads/${fileName}`;

    // 3. Upload file lên bucket 'memories' của Supabase Storage
    // Lưu ý: Bucket 'memories' cần được đặt cấu hình là 'Public' trên Supabase Dashboard
    const { data, error } = await supabase.storage
      .from('memories')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true
      });

    if (error) {
      console.error('Supabase Storage Upload Error:', error);
      return NextResponse.json({ error: `Lỗi khi tải file lên Storage: ${error.message}` }, { status: 500 });
    }

    // 4. Lấy link URL công khai của file vừa upload
    const { data: { publicUrl } } = supabase.storage
      .from('memories')
      .getPublicUrl(filePath);

    return NextResponse.json({ 
      success: true,
      url: publicUrl 
    });

  } catch (error) {
    console.error('API Upload Route Error:', error);
    return NextResponse.json({ error: 'Có lỗi xảy ra trong quá trình upload file.' }, { status: 500 });
  }
}
