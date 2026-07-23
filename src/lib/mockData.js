export const mockCoupleData = {
  id: "linh-minh",
  slug: "linh-minh",
  partner1: "Linh",
  partner2: "Minh",
  anniversaryDate: "2024-04-23", // 23.04.2024
  theme: "pink", // Mặc định
  musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Nhạc mặc định chạy thử
  secretLetterKey: "23042024",
  secretLetterContent: `Dear Minh,\n\nCảm ơn vì đã xuất hiện trong cuộc đời của Linh. Từ Highlands Coffee ngày đầu tiên gặp gỡ cho đến chuyến đi Đà Lạt đầy ắp tiếng cười, mỗi khoảnh khắc bên Minh đều là món quà quý giá nhất mà Linh có được.\n\nNgười ta thường nói tình yêu cần thời gian thử thách, nhưng với Linh, mỗi giây phút được nhìn thấy Minh cười đã là một sự khẳng định ngọt ngào nhất rồi. Hãy cùng nhau đi tiếp hành trình này và hoàn thành tất cả những mục tiêu trong bucket list của tụi mình nhé!\n\nThương Minh rất nhiều ❤️`,
  futureLetterContent: `Chào hai đứa ở năm 2030!\n\nKhông biết khi các bạn đọc được những dòng này thì hai đứa đã về chung một nhà chưa nhỉ? Liệu chú mèo tụi mình ước mơ cùng nuôi giờ có mập ú không? chuyến đi Nhật Bản đã thực hiện được chưa?\n\nĐây là bức thư viết từ ngày 23/04/2026, lúc hai đứa vẫn đang yêu nhau nồng nàn. Hy vọng dù thời gian có trôi qua thế nào, hai bạn vẫn luôn giữ được ngọn lửa tình yêu như những ngày đầu tiên. Hãy ôm nhau thật chặt sau khi đọc xong bức thư này nhé!`,
  futureLetterOpenDate: "2030-04-23",
  spotifyPlaylistUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DX4g8Gs5nNNki?utm_source=generator", // Playlist Lofi/Love
  mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4607738221896!2d106.69741547469721!3d10.776019559203673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4705555555%3A0xe10f930e461b6b55!2sHighlands%20Coffee!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s",
  avatar1: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop", // Ảnh mẫu Linh
  avatar2: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop", // Ảnh mẫu Minh
  coverImage: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1200&auto=format&fit=crop", // Ảnh nền tình yêu
  aiApiKey: "", // Admin sẽ cấu hình
  
  // Các trường cấu hình Bức thư mở đầu (Intro Letter)
  introGreeting: "Hey Samira,",
  introMessage: "Love is in the air, so I'm taking this chance to spill the beans! You know, you've been my classroom buddy for a while now, and I gotta say, I've developed a pretty strong crush on you. Every time I see you, my heart does a little dance, and I can't help feeling lucky to be around you.\n\nSo here's the deal: I want to take you out on a date and get to know you better. What do you say? Ready to be swept off your feet?",
  introSignOff: "Fingers crossed,",
  introSender: "Aaron",
  introStampUrl: "https://images.unsplash.com/photo-1555448248-2571daf6344b?q=80&w=200&auto=format&fit=crop", // Ảnh gấu con làm con tem
  introEnvelopeText: "To the Love of My Life",
  introEnvelopeLabel: "CLICK TO OPEN 💖",
  introLetterNote: "Pause to read 📖",
  introButtonText: "Bước vào thế giới của chúng mình"
};

export const mockTimelines = [
  {
    id: "t1",
    couple_id: "linh-minh",
    title: "Lần đầu gặp nhau",
    location: "Highlands Coffee Nhà Thờ",
    date: "2023-08-20",
    description: "Một chiều mưa Hà Nội, hai ánh mắt vô tình chạm nhau bên ly cafe sữa đá. Khoảnh khắc ấy, thời gian như ngưng đọng lại.",
    mediaUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=600&auto=format&fit=crop",
    mediaType: "image",
    orderIndex: 0
  },
  {
    id: "t2",
    couple_id: "linh-minh",
    title: "Sinh nhật đầu tiên bên nhau",
    location: "Home Sweet Home",
    date: "2023-11-15",
    description: "Tự tay làm chiếc bánh kem tuy hơi méo mó một chút nhưng ngập tràn tình yêu. Lời cầu nguyện dưới ánh nến lung linh.",
    mediaUrl: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=600&auto=format&fit=crop",
    mediaType: "image",
    orderIndex: 1
  },
  {
    id: "t3",
    couple_id: "linh-minh",
    title: "Chuyến du lịch Đà Lạt",
    location: "Đà Lạt - Thành phố sương mù",
    date: "2024-05-12",
    description: "Cùng nhau đón bình minh trên đỉnh Hòn Bồ, đi qua những đồi thông reo và hít hà cái không khí se lạnh dễ chịu.",
    mediaUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop",
    mediaType: "image",
    orderIndex: 2
  }
];

export const mockAlbums = [
  {
    id: "a1",
    couple_id: "linh-minh",
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500&auto=format&fit=crop",
    caption: "Nụ cười rạng rỡ của Linh dưới nắng chiều",
    date: "2023-09-05",
    year: 2023,
    orderIndex: 0
  },
  {
    id: "a2",
    couple_id: "linh-minh",
    url: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=500&auto=format&fit=crop",
    caption: "Minh đang ngơ ngác khi bị chụp trộm",
    date: "2023-10-12",
    year: 2023,
    orderIndex: 1
  },
  {
    id: "a3",
    couple_id: "linh-minh",
    url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=500&auto=format&fit=crop",
    caption: "Cầm tay nhau đi khắp thế gian",
    date: "2024-01-01",
    year: 2024,
    orderIndex: 2
  },
  {
    id: "a4",
    couple_id: "linh-minh",
    url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=500&auto=format&fit=crop",
    caption: "Đà Lạt ngày nắng xanh trong trẻo",
    date: "2024-05-13",
    year: 2024,
    orderIndex: 3
  },
  {
    id: "a5",
    couple_id: "linh-minh",
    url: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=500&auto=format&fit=crop",
    caption: "Dưới bóng thông già Đà Lạt",
    date: "2024-05-14",
    year: 2024,
    orderIndex: 4
  },
  {
    id: "a6",
    couple_id: "linh-minh",
    url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=500&auto=format&fit=crop",
    caption: "Kỷ niệm 1 năm yêu nhau ấm áp",
    date: "2025-04-23",
    year: 2025,
    orderIndex: 5
  }
];

export const mockBucketList = [
  { id: "b1", couple_id: "linh-minh", task: "Đi du lịch Đà Lạt cùng nhau", is_completed: true, orderIndex: 0 },
  { id: "b2", couple_id: "linh-minh", task: "Cùng nuôi một chú mèo mập", is_completed: false, orderIndex: 1 },
  { id: "b3", couple_id: "linh-minh", task: "Đi ngắm hoa anh đào ở Nhật Bản", is_completed: false, orderIndex: 2 },
  { id: "b4", couple_id: "linh-minh", task: "Học chung một lớp làm gốm", is_completed: false, orderIndex: 3 },
  { id: "b5", couple_id: "linh-minh", task: "Cùng ngắm tuyết rơi đêm Giáng sinh", is_completed: false, orderIndex: 4 }
];

export const mockGuestbook = [
  { id: "g1", couple_id: "linh-minh", sender_name: "Bạn thân", message: "Chúc hai bạn mãi hạnh phúc nha! Siêu đáng yêu luôn.", emoji: "❤️", created_at: "2024-04-24T12:00:00.000Z" },
  { id: "g2", couple_id: "linh-minh", sender_name: "Em gái", message: "Khi nào ăn cưới đây hai bác ơi, mong chờ quá!", emoji: "🎉", created_at: "2024-05-01T15:30:00.000Z" }
];
