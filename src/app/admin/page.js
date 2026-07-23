'use client';

import React, { useState, useEffect } from 'react';
import { useMemory } from '@/lib/MemoryContext';
import { 
  Settings, Calendar, Image, Music, MapPin, Heart, Plus, Trash2, 
  Sparkles, Save, BookOpen, CheckSquare, MessageSquare, Key, ArrowLeft, RefreshCw, Eye, Upload
} from 'lucide-react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

const THEME_OPTIONS = [
  { id: 'pink', name: '🌸 Pink (Lãng mạn)', color: 'bg-pink-300' },
  { id: 'galaxy', name: '🌌 Galaxy (Vũ trụ)', color: 'bg-purple-900 text-white' },
  { id: 'nature', name: '🌿 Nature (Tự nhiên)', color: 'bg-emerald-200' },
  { id: 'christmas', name: '🎄 Christmas (Noel)', color: 'bg-red-600 text-white' },
  { id: 'pixel', name: '🎮 Pixel (Cổ điển)', color: 'bg-gray-800 text-green-400 font-mono' },
  { id: 'dark', name: '🖤 Dark (Tối giản)', color: 'bg-black text-white' },
  { id: 'luxury', name: '✨ Luxury (Quý tộc)', color: 'bg-amber-100 text-amber-800 border-amber-400' },
  { id: 'anime', name: '🌸 Anime (Pastel)', color: 'bg-rose-100 text-purple-900' },
];

export default function AdminDashboard() {
  const {
    couple, updateCoupleInfo,
    timelines, addTimelineItem, deleteTimelineItem,
    albums, addAlbumItem, deleteAlbumItem,
    bucketList, addBucketItem, deleteBucketItem,
    guestbook, resetToDefault
  } = useMemory();

  const [activeTab, setActiveTab] = useState('general');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form states cho Cấu hình chung
  const [partner1, setPartner1] = useState('');
  const [partner2, setPartner2] = useState('');
  const [anniversaryDate, setAnniversaryDate] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');
  const [musicUrl, setMusicUrl] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [avatar1, setAvatar1] = useState('');
  const [avatar2, setAvatar2] = useState('');
  const [spotifyPlaylistUrl, setSpotifyPlaylistUrl] = useState('');
  const [mapsEmbedUrl, setMapsEmbedUrl] = useState('');
  const [secretLetterKey, setSecretLetterKey] = useState('');
  const [secretLetterContent, setSecretLetterContent] = useState('');
  const [futureLetterContent, setFutureLetterContent] = useState('');
  const [futureLetterOpenDate, setFutureLetterOpenDate] = useState('');
  const [localGeminiKey, setLocalGeminiKey] = useState('');

  // States cho Bức thư mở đầu (Intro Letter)
  const [introGreeting, setIntroGreeting] = useState('');
  const [introMessage, setIntroMessage] = useState('');
  const [introSignOff, setIntroSignOff] = useState('');
  const [introSender, setIntroSender] = useState('');
  const [introStampUrl, setIntroStampUrl] = useState('');
  const [introEnvelopeText, setIntroEnvelopeText] = useState('');
  const [introEnvelopeLabel, setIntroEnvelopeLabel] = useState('');
  const [introLetterNote, setIntroLetterNote] = useState('');
  const [introButtonText, setIntroButtonText] = useState('');

  // Đồng bộ states từ Context khi tải trang hoặc khi couple đổi
  useEffect(() => {
    if (couple) {
      setPartner1(couple.partner1 || '');
      setPartner2(couple.partner2 || '');
      setAnniversaryDate(couple.anniversaryDate || '');
      setSelectedTheme(couple.theme || 'pink');
      setMusicUrl(couple.musicUrl || '');
      setCoverImage(couple.coverImage || '');
      setAvatar1(couple.avatar1 || '');
      setAvatar2(couple.avatar2 || '');
      setSpotifyPlaylistUrl(couple.spotifyPlaylistUrl || '');
      setMapsEmbedUrl(couple.mapsEmbedUrl || '');
      setSecretLetterKey(couple.secretLetterKey || '');
      setSecretLetterContent(couple.secretLetterContent || '');
      setFutureLetterContent(couple.futureLetterContent || '');
      setFutureLetterOpenDate(couple.futureLetterOpenDate || '');
      
      setIntroGreeting(couple.introGreeting || '');
      setIntroMessage(couple.introMessage || '');
      setIntroSignOff(couple.introSignOff || '');
      setIntroSender(couple.introSender || '');
      setIntroStampUrl(couple.introStampUrl || '');
      setIntroEnvelopeText(couple.introEnvelopeText || '');
      setIntroEnvelopeLabel(couple.introEnvelopeLabel || '');
      setIntroLetterNote(couple.introLetterNote || '');
      setIntroButtonText(couple.introButtonText || '');
      
      const storedKey = localStorage.getItem('dmc_gemini_key') || '';
      setLocalGeminiKey(storedKey);
    }
  }, [couple]);

  // Form states cho Timeline mới
  const [newTimeline, setNewTimeline] = useState({
    title: '', date: '', location: '', description: '', mediaUrl: '', mediaType: 'image'
  });

  // Form states cho Album mới
  const [newPhoto, setNewPhoto] = useState({
    url: '', caption: '', date: ''
  });

  // Form states cho Bucket List mới
  const [newBucketTask, setNewBucketTask] = useState('');

  // States và hàm xử lý tải ảnh lên trực tiếp
  const [uploadingField, setUploadingField] = useState(null);

  const compressImage = (file) => {
    return new Promise((resolve) => {
      if (!file.type.startsWith('image/')) {
        resolve(file);
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX_WIDTH = 1200;
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob((blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now()
              });
              resolve(compressedFile);
            } else {
              resolve(file);
            }
          }, 'image/jpeg', 0.75);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async (e, setUrlCallback, fieldId) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 25 * 1024 * 1024) {
      alert("Kích thước file quá lớn (tối đa 25MB). Vui lòng chọn file nhẹ hơn.");
      return;
    }

    setUploadingField(fieldId);

    try {
      // Tu dong nen anh truoc khi gui di
      const processedFile = await compressImage(file);

      const formData = new FormData();
      formData.append('file', processedFile);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (response.ok && data.url) {
        setUrlCallback(data.url);
        alert("Tải file lên thành công!");
      } else {
        // Fallback Base64 khi chua cau hinh Supabase
        const reader = new FileReader();
        reader.onloadend = () => {
          setUrlCallback(reader.result);
          alert("Đã lưu file cục bộ thành công! (Chế độ chạy thử nghiệm offline)");
        };
        reader.readAsDataURL(processedFile);
      }
    } catch (err) {
      console.error("Upload error:", err);
      // Fallback
      const reader = new FileReader();
      reader.onloadend = () => {
        setUrlCallback(reader.result);
        alert("Đã lưu file cục bộ thành công! (Chế độ chạy thử nghiệm offline)");
      };
      reader.readAsDataURL(file);
    } finally {
      setUploadingField(null);
    }
  };

  const FileUploadButton = ({ label, onUploadComplete, fieldId, accept }) => {
    return (
      <div className="mt-2">
        <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold rounded-xl border border-rose-200 transition-colors shadow-sm active:scale-95">
          <Upload className="w-3.5 h-3.5" />
          <span>{uploadingField === fieldId ? "Đang tải lên..." : (label || "Tải ảnh từ máy")}</span>
          <input
            type="file"
            accept={accept || "image/*,video/*"}
            disabled={uploadingField !== null}
            onChange={(e) => handleFileUpload(e, onUploadComplete, fieldId)}
            className="hidden"
          />
        </label>
      </div>
    );
  };

  // States cho AI Memory Assistant
  const [aiInput, setAiInput] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [aiType, setAiType] = useState('poem'); // poem, letter, caption
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');

  // Hàm Lưu Cấu hình chung
  const handleSaveGeneral = (e) => {
    e.preventDefault();
    updateCoupleInfo({
      partner1, partner2, anniversaryDate, theme: selectedTheme, musicUrl,
      coverImage, avatar1, avatar2, spotifyPlaylistUrl, mapsEmbedUrl,
      secretLetterKey, secretLetterContent, futureLetterContent, futureLetterOpenDate,
      introGreeting, introMessage, introSignOff, introSender, introStampUrl,
      introEnvelopeText, introEnvelopeLabel, introLetterNote, introButtonText
    });
    
    localStorage.setItem('dmc_gemini_key', localGeminiKey);

    setSaveSuccess(true);
    confetti({ particleCount: 30, spread: 40 });
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Timeline handlers
  const handleAddTimeline = (e) => {
    e.preventDefault();
    if (!newTimeline.title || !newTimeline.date || !newTimeline.description) return;
    addTimelineItem(newTimeline);
    setNewTimeline({ title: '', date: '', location: '', description: '', mediaUrl: '', mediaType: 'image' });
    confetti({ particleCount: 20, spread: 30 });
  };

  // Album handlers
  const handleAddPhoto = (e) => {
    e.preventDefault();
    if (!newPhoto.url || !newPhoto.date || !newPhoto.caption) return;
    addAlbumItem(newPhoto);
    setNewPhoto({ url: '', caption: '', date: '' });
    confetti({ particleCount: 20, spread: 30 });
  };

  // Bucket list handlers
  const handleAddBucket = (e) => {
    e.preventDefault();
    if (!newBucketTask.trim()) return;
    addBucketItem(newBucketTask.trim());
    setNewBucketTask('');
  };

  // Reset dữ liệu mẫu
  const handleReset = () => {
    if (window.confirm("Bạn có chắc chắn muốn khôi phục dữ liệu về mặc định (Linh ❤️ Minh)? Toàn bộ dữ liệu bạn đã thay đổi sẽ bị xóa.")) {
      resetToDefault();
      localStorage.removeItem('dmc_gemini_key');
      setLocalGeminiKey('');
      alert("Đã khôi phục thành công! F5 lại trang để cập nhật giao diện.");
      window.location.reload();
    }
  };

  // Gọi Gemini AI để sinh thư tình/thơ tình/caption
  const handleGenerateAI = async () => {
    if (!aiInput.trim()) return;
    setIsAiLoading(true);
    setAiError('');
    setAiResult('');

    try {
      // 1. Gửi request lên API nội bộ Next.js
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: aiInput.trim(),
          type: aiType,
          apiKey: localGeminiKey // Gửi key local (nếu có)
        })
      });

      const data = await response.json();
      if (response.ok) {
        setAiResult(data.result);
      } else {
        setAiError(data.error || 'Có lỗi xảy ra khi gọi AI.');
      }
    } catch (err) {
      setAiError('Không thể kết nối đến server AI.');
      console.error(err);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Lưu nhanh văn bản AI vào Thư tình bí mật hoặc Timeline
  const handleSaveAiToSecretLetter = () => {
    if (!aiResult) return;
    setSecretLetterContent(aiResult);
    alert('Đã đưa bài viết vào Thư tình bí mật. Nhớ bấm "Lưu cấu hình" ở tab Cấu hình chung để lưu vĩnh viễn!');
    setActiveTab('general');
  };

  const handleSaveAiToTimeline = () => {
    if (!aiResult) return;
    setNewTimeline({
      title: aiType === 'poem' ? 'Bài thơ tình yêu' : 'Lá thư tâm sự',
      date: new Date().toISOString().split('T')[0],
      location: 'Trợ lý AI viết hộ',
      description: aiResult,
      mediaUrl: '',
      mediaType: 'image'
    });
    setActiveTab('timeline');
    alert('Đã sao chép nội dung AI vào form thêm Timeline mới bên dưới!');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row text-gray-800">
      
      {/* Sidebar điều hướng */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 flex flex-col p-6 space-y-8 flex-shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
            <h1 className="text-xl font-bold font-display text-gray-900">Capsule Admin</h1>
          </div>
          <p className="text-xs text-gray-500 font-medium">Bảng điều khiển không cần code</p>
        </div>

        {/* Menu Tabs */}
        <nav className="flex flex-col space-y-1.5 flex-1">
          <button
            onClick={() => setActiveTab('general')}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2.5 transition-all
              ${activeTab === 'general' ? 'bg-rose-500 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Settings className="w-4.5 h-4.5" />
            <span>Cấu hình chung</span>
          </button>
          
          <button
            onClick={() => setActiveTab('timeline')}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2.5 transition-all
              ${activeTab === 'timeline' ? 'bg-rose-500 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <BookOpen className="w-4.5 h-4.5" />
            <span>Hành trình kỷ niệm</span>
          </button>

          <button
            onClick={() => setActiveTab('album')}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2.5 transition-all
              ${activeTab === 'album' ? 'bg-rose-500 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Image className="w-4.5 h-4.5" />
            <span>Album kỷ niệm</span>
          </button>

          <button
            onClick={() => setActiveTab('bucket')}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2.5 transition-all
              ${activeTab === 'bucket' ? 'bg-rose-500 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <CheckSquare className="w-4.5 h-4.5" />
            <span>Mục tiêu & Lưu bút</span>
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2.5 transition-all
              ${activeTab === 'ai' ? 'bg-rose-500 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Sparkles className="w-4.5 h-4.5" />
            <span>Trợ lý tình yêu AI</span>
          </button>
        </nav>

        {/* Footer sidebar */}
        <div className="pt-6 border-t border-gray-100 flex flex-col gap-2">
          <Link
            href="/"
            className="w-full py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-bold text-gray-600 flex items-center justify-center gap-1.5 transition-all"
          >
            <Eye className="w-4 h-4" />
            <span>Xem trang kỷ niệm</span>
          </Link>
          <button
            onClick={handleReset}
            className="w-full py-2.5 rounded-xl border border-red-200 hover:bg-red-50 text-xs font-bold text-red-600 flex items-center justify-center gap-1.5 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Khôi phục mẫu gốc</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-4xl overflow-y-auto">
        {saveSuccess && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold rounded-2xl flex items-center gap-2 animate-bounce">
            <Sparkles className="w-5 h-5 text-emerald-500" />
            Đã lưu tất cả thay đổi thành công! Quay lại trang chủ để cảm nhận.
          </div>
        )}

        {/* ----------------- TAB: CẤU HÌNH CHUNG ----------------- */}
        {activeTab === 'general' && (
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-bold font-display text-gray-900 mb-6 flex items-center gap-2">
              <Settings className="w-6 h-6 text-rose-500" />
              Cấu hình chung
            </h2>

            <form onSubmit={handleSaveGeneral} className="space-y-6">
              
              {/* Tên hai người */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Tên người 1</label>
                  <input
                    type="text" required value={partner1} onChange={(e) => setPartner1(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Tên người 2</label>
                  <input
                    type="text" required value={partner2} onChange={(e) => setPartner2(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-gray-50"
                  />
                </div>
              </div>

              {/* Ngày kỷ niệm & Theme */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Ngày bắt đầu yêu nhau</label>
                  <input
                    type="date" required value={anniversaryDate} onChange={(e) => setAnniversaryDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Giao diện (Theme)</label>
                  <select
                    value={selectedTheme} onChange={(e) => setSelectedTheme(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-gray-50"
                  >
                    {THEME_OPTIONS.map(opt => (
                      <option key={opt.id} value={opt.id}>{opt.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Ảnh đại diện & Ảnh bìa */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Ảnh người 1 (Link URL)</label>
                  <input
                    type="text" value={avatar1} onChange={(e) => setAvatar1(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-gray-50"
                  />
                  <FileUploadButton label="Tải ảnh lên trực tiếp" onUploadComplete={setAvatar1} fieldId="avatar1" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Ảnh người 2 (Link URL)</label>
                  <input
                    type="text" value={avatar2} onChange={(e) => setAvatar2(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-gray-50"
                  />
                  <FileUploadButton label="Tải ảnh lên trực tiếp" onUploadComplete={setAvatar2} fieldId="avatar2" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Ảnh nền trang bìa (Link URL)</label>
                  <input
                    type="text" value={coverImage} onChange={(e) => setCoverImage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-gray-50"
                  />
                  <FileUploadButton label="Tải ảnh lên trực tiếp" onUploadComplete={setCoverImage} fieldId="coverImage" />
                </div>
              </div>

              {/* Nhạc nền & Embed */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Link nhạc mp3 nền (Chạy tự động)</label>
                  <input
                    type="text" value={musicUrl} onChange={(e) => setMusicUrl(e.target.value)}
                    placeholder="https://server.com/song.mp3"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-gray-50"
                  />
                  <FileUploadButton 
                    label="Tải nhạc mp3 lên trực tiếp" 
                    onUploadComplete={setMusicUrl} 
                    fieldId="musicUrl" 
                    accept="audio/*" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Link nhúng Spotify Playlist (Iframe src)</label>
                  <input
                    type="text" value={spotifyPlaylistUrl} onChange={(e) => setSpotifyPlaylistUrl(e.target.value)}
                    placeholder="https://open.spotify.com/embed/playlist/..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-gray-50"
                  />
                </div>
              </div>

              {/* Google Maps Embed */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Link nhúng bản đồ Google Maps (Iframe src)</label>
                <input
                  type="text" value={mapsEmbedUrl} onChange={(e) => setMapsEmbedUrl(e.target.value)}
                  placeholder="https://www.google.com/maps/embed?..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-gray-50"
                />
              </div>

              {/* Thư tình bí mật */}
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-sm font-bold text-gray-900 mb-4">Lá thư tình bí mật</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-1">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Mật khẩu mở thư</label>
                    <input
                      type="text" value={secretLetterKey} onChange={(e) => setSecretLetterKey(e.target.value)}
                      placeholder="Ví dụ: 23042024"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-gray-50"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nội dung thư tình</label>
                    <textarea
                      rows="4" value={secretLetterContent} onChange={(e) => setSecretLetterContent(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-gray-50 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Thư gửi tương lai */}
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-sm font-bold text-gray-900 mb-4">Thư gửi tương lai</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-1">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Ngày được phép mở</label>
                    <input
                      type="date" value={futureLetterOpenDate} onChange={(e) => setFutureLetterOpenDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-gray-50"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nội dung gửi tương lai</label>
                    <textarea
                      rows="4" value={futureLetterContent} onChange={(e) => setFutureLetterContent(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-gray-50 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Bức thư tình mở đầu (Intro Letter) */}
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-sm font-bold text-gray-900 mb-4">Bức thư tình mở đầu (Intro Letter)</h3>
                <p className="text-xs text-gray-500 mb-4">
                  Bức thư này sẽ hiển thị dưới dạng phong bì đóng kín ngay khi truy cập trang web. Người thương của bạn click mở phong bì sẽ đọc được những dòng này.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Lời chào đầu thư</label>
                    <input
                      type="text" value={introGreeting} onChange={(e) => setIntroGreeting(e.target.value)}
                      placeholder="Ví dụ: Hey Samira,"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Lời kết thư</label>
                    <input
                      type="text" value={introSignOff} onChange={(e) => setIntroSignOff(e.target.value)}
                      placeholder="Ví dụ: Fingers crossed,"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Người gửi (Ký tên)</label>
                    <input
                      type="text" value={introSender} onChange={(e) => setIntroSender(e.target.value)}
                      placeholder="Ví dụ: Aaron"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-gray-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nội dung thư nhắn nhủ</label>
                    <textarea
                      rows="5" value={introMessage} onChange={(e) => setIntroMessage(e.target.value)}
                      placeholder="Nhập nội dung thư..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-gray-50 resize-none"
                    />
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Ảnh con tem thư (Link URL)</label>
                    <input
                      type="text" value={introStampUrl} onChange={(e) => setIntroStampUrl(e.target.value)}
                      placeholder="Link ảnh làm tem thư..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-gray-50"
                    />
                    <FileUploadButton label="Tải ảnh tem thư lên" onUploadComplete={setIntroStampUrl} fieldId="introStamp" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-dashed border-gray-100">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Chữ thò ra từ phong bì</label>
                    <input
                      type="text" value={introEnvelopeText} onChange={(e) => setIntroEnvelopeText(e.target.value)}
                      placeholder="Mặc định: To the Love of My Life"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Chữ nhấp nháy dưới phong bì</label>
                    <input
                      type="text" value={introEnvelopeLabel} onChange={(e) => setIntroEnvelopeLabel(e.target.value)}
                      placeholder="Mặc định: CLICK TO OPEN 💖"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Chữ góc trái trên lá thư</label>
                    <input
                      type="text" value={introLetterNote} onChange={(e) => setIntroLetterNote(e.target.value)}
                      placeholder="Mặc định: Pause to read 📖"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Chữ trên nút bước vào trang chủ</label>
                    <input
                      type="text" value={introButtonText} onChange={(e) => setIntroButtonText(e.target.value)}
                      placeholder="Mặc định: Bước vào thế giới của chúng mình"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-gray-50"
                    />
                  </div>
                </div>
              </div>

              {/* Cấu hình Gemini API Key cho AI (Lưu local) */}
              <div className="border-t border-gray-100 pt-6 bg-rose-50/50 p-4 rounded-2xl border border-rose-100">
                <h3 className="text-sm font-bold text-rose-900 mb-2 flex items-center gap-1.5">
                  <Key className="w-4 h-4 text-rose-500" />
                  Gemini API Key (Không bắt buộc)
                </h3>
                <p className="text-xs text-rose-700/80 mb-4">
                  Dùng để chạy tính năng AI viết thư tình/làm thơ. Khóa này chỉ lưu trữ cục bộ trên máy duyệt web của bạn, bảo mật tuyệt đối. Nếu không nhập, hệ thống sẽ sử dụng key mặc định từ biến môi trường của server (nếu đã cấu hình).
                </p>
                <input
                  type="password" value={localGeminiKey} onChange={(e) => setLocalGeminiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full px-4 py-2.5 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-white"
                />
              </div>

              {/* Nút lưu */}
              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-md active:scale-95"
                >
                  <Save className="w-5 h-5" />
                  <span>Lưu cấu hình</span>
                </button>
              </div>

              {/* Box Chia Sẻ QR Code */}
              <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row gap-6 items-center bg-gray-50 p-6 rounded-2xl border border-gray-100 mt-6">
                <div className="w-40 h-40 bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center flex-shrink-0">
                  <img
                    src={typeof window !== 'undefined' ? `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(window.location.href.replace('/admin', ''))}` : ''}
                    alt="QR Code chia sẻ"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h4 className="font-bold text-gray-900 mb-1">Mã QR Chia Sẻ Trang Web</h4>
                  <p className="text-xs text-gray-500 leading-relaxed mb-3">
                    Người thương của bạn chỉ cần quét mã QR này bằng điện thoại là có thể mở ngay trang kỷ niệm tình yêu. Bạn cũng có thể tải ảnh QR này về để gửi đi.
                  </p>
                  <div className="flex justify-center md:justify-start">
                    <a
                      href={typeof window !== 'undefined' ? window.location.href.replace('/admin', '') : '#'}
                      target="_blank"
                      className="px-4 py-2 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl shadow-sm transition-all"
                    >
                      Mở link trực tiếp
                    </a>
                  </div>
                </div>
              </div>

            </form>
          </div>
        )}

        {/* ----------------- TAB: HÀNH TRÌNH KỶ NIỆM (TIMELINE) ----------------- */}
        {activeTab === 'timeline' && (
          <div className="space-y-6">
            
            {/* Form thêm mốc mới */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-bold font-display text-gray-900 mb-6 flex items-center gap-2">
                <Plus className="w-6 h-6 text-rose-500" />
                Thêm mốc kỷ niệm mới
              </h2>

              <form onSubmit={handleAddTimeline} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Tiêu đề mốc kỷ niệm</label>
                    <input
                      type="text" required placeholder="Ví dụ: Lần đầu gặp gỡ"
                      value={newTimeline.title}
                      onChange={(e) => setNewTimeline({...newTimeline, title: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Thời gian xảy ra</label>
                    <input
                      type="date" required
                      value={newTimeline.date}
                      onChange={(e) => setNewTimeline({...newTimeline, date: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-gray-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Địa điểm</label>
                    <input
                      type="text" placeholder="Ví dụ: Highlands Coffee"
                      value={newTimeline.location}
                      onChange={(e) => setNewTimeline({...newTimeline, location: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-gray-50"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Đường dẫn ảnh/video kỷ niệm (Link URL)</label>
                    <input
                      type="text" placeholder="https://unsplash.com/... hoặc link ảnh của bạn"
                      value={newTimeline.mediaUrl}
                      onChange={(e) => setNewTimeline({...newTimeline, mediaUrl: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-gray-50"
                    />
                    <FileUploadButton 
                      label="Tải ảnh/video lên trực tiếp" 
                      onUploadComplete={(url) => setNewTimeline({...newTimeline, mediaUrl: url, mediaType: url.includes('video') || url.includes('mp4') || url.includes('data:video') ? 'video' : 'image'})} 
                      fieldId="newTimelineMedia" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Câu chuyện chi tiết</label>
                  <textarea
                    rows="4" required placeholder="Kể lại câu chuyện lúc đó..."
                    value={newTimeline.description}
                    onChange={(e) => setNewTimeline({...newTimeline, description: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-gray-50 resize-none"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-md"
                  >
                    <Plus className="w-5 h-5" />
                    Thêm sự kiện
                  </button>
                </div>
              </form>
            </div>

            {/* Danh sách mốc kỷ niệm hiện tại */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Các mốc kỷ niệm hiện có ({timelines.length})</h2>
              
              <div className="space-y-4">
                {timelines.map(item => (
                  <div key={item.id} className="flex gap-4 p-4 border border-gray-100 bg-gray-50/50 rounded-2xl items-start justify-between">
                    <div className="flex gap-4">
                      {item.mediaUrl && (
                        <img src={item.mediaUrl} alt="" className="w-16 h-16 rounded-xl object-cover border border-gray-200" />
                      )}
                      <div>
                        <h4 className="font-bold text-gray-900">{item.title}</h4>
                        <span className="text-xs text-gray-500 font-semibold block mb-1">
                          {new Date(item.date).toLocaleDateString('vi-VN')} {item.location ? `| ${item.location}` : ''}
                        </span>
                        <p className="text-xs text-gray-600 line-clamp-2">{item.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteTimelineItem(item.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ----------------- TAB: ALBUM KỶ NIỆM (ALBUM) ----------------- */}
        {activeTab === 'album' && (
          <div className="space-y-6">
            
            {/* Form thêm ảnh mới */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-bold font-display text-gray-900 mb-6 flex items-center gap-2">
                <Plus className="w-6 h-6 text-rose-500" />
                Thêm ảnh mới vào Album
              </h2>

              <form onSubmit={handleAddPhoto} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Đường dẫn ảnh (Link URL)</label>
                    <input
                      type="text" required placeholder="https://unsplash.com/... hoặc link ảnh của bạn"
                      value={newPhoto.url}
                      onChange={(e) => setNewPhoto({...newPhoto, url: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-gray-50"
                    />
                    <FileUploadButton 
                      label="Tải ảnh lên trực tiếp" 
                      onUploadComplete={(url) => setNewPhoto({...newPhoto, url: url})} 
                      fieldId="newAlbumPhoto" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Ngày chụp</label>
                    <input
                      type="date" required
                      value={newPhoto.date}
                      onChange={(e) => setNewPhoto({...newPhoto, date: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-gray-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Chú thích ảnh (Caption)</label>
                  <input
                    type="text" required placeholder="Ví dụ: Nụ cười ngơ ngác khi bị chụp lén"
                    value={newPhoto.caption}
                    onChange={(e) => setNewPhoto({...newPhoto, caption: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-gray-50"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-md"
                  >
                    <Plus className="w-5 h-5" />
                    Thêm ảnh
                  </button>
                </div>
              </form>
            </div>

            {/* Danh sách ảnh hiện tại */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Tất cả ảnh trong Album ({albums.length})</h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {albums.map(photo => (
                  <div key={photo.id} className="relative group border border-gray-100 rounded-2xl overflow-hidden bg-gray-50">
                    <img src={photo.url} alt="" className="w-full h-32 object-cover" />
                    <div className="p-2">
                      <p className="text-[10px] text-gray-500 font-semibold mb-0.5">{new Date(photo.date).toLocaleDateString('vi-VN')}</p>
                      <p className="text-xs text-gray-800 font-bold line-clamp-1">{photo.caption}</p>
                    </div>
                    <button
                      onClick={() => deleteAlbumItem(photo.id)}
                      className="absolute top-2 right-2 p-1.5 bg-white/95 border border-gray-200 hover:text-red-500 rounded-lg shadow-sm transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ----------------- TAB: BUCKET LIST & GUESTBOOK ----------------- */}
        {activeTab === 'bucket' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Quản lý Bucket List */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col">
              <h2 className="text-xl font-bold font-display text-gray-900 mb-4 flex items-center gap-2">
                <CheckSquare className="w-5.5 h-5.5 text-rose-500" />
                Mục tiêu chung (Bucket List)
              </h2>

              <form onSubmit={handleAddBucket} className="flex gap-2 mb-4">
                <input
                  type="text" required placeholder="Thêm mục tiêu mới..."
                  value={newBucketTask}
                  onChange={(e) => setNewBucketTask(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-gray-50"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl flex items-center justify-center transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </form>

              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                {bucketList.map(item => (
                  <div key={item.id} className="flex justify-between items-center p-3 border border-gray-100 bg-gray-50/50 rounded-xl">
                    <span className={`text-sm ${item.is_completed ? 'line-through text-gray-400 font-medium' : 'text-gray-800 font-semibold'}`}>
                      {item.task}
                    </span>
                    <button
                      onClick={() => deleteBucketItem(item.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Xem danh sách lưu bút Guestbook */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col">
              <h2 className="text-xl font-bold font-display text-gray-900 mb-4 flex items-center gap-2">
                <MessageSquare className="w-5.5 h-5.5 text-rose-500" />
                Lời chúc của bạn bè ({guestbook.length})
              </h2>

              <div className="space-y-3 max-h-[460px] overflow-y-auto pr-2">
                {guestbook.map(note => (
                  <div key={note.id} className="p-4 border border-gray-100 bg-gray-50/30 rounded-xl relative">
                    <div className="absolute top-3 right-3 text-lg">{note.emoji}</div>
                    <div className="mb-1">
                      <span className="font-bold text-sm text-gray-800">{note.sender_name}</span>
                      <span className="block text-[9px] text-gray-400">
                        {new Date(note.created_at).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">{note.message}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ----------------- TAB: AI MEMORY HELPER (AI ASSISTANT) ----------------- */}
        {activeTab === 'ai' && (
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-bold font-display text-gray-900 mb-2 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-rose-500 animate-pulse" />
              AI Trợ lý tình yêu
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Nhập một số từ khóa hoặc cảm xúc ngắn của ngày hôm nay, AI sẽ tự động biên dịch nó thành một tác phẩm nghệ thuật tình cảm để lưu giữ!
            </p>

            <div className="space-y-6">
              
              {/* Cấu hình Input */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Hôm nay hai bạn có kỷ niệm gì?</label>
                  <textarea
                    rows="3"
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    placeholder="Ví dụ: Hôm nay anh đèo em đi lòng vòng quanh Hồ Tây ăn kem dừa dưới hoàng hôn cực lãng mạn..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-gray-50 resize-none placeholder-gray-400"
                  />
                </div>

                {/* Loại định dạng sinh ra */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">AI hãy sinh ra:</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button" onClick={() => setAiType('poem')}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all
                        ${aiType === 'poem' 
                          ? 'bg-rose-50 border-rose-300 text-rose-600 scale-102' 
                          : 'bg-white border-gray-200 hover:bg-gray-50'}`}
                    >
                      🌸 Bài thơ tình yêu
                    </button>
                    <button
                      type="button" onClick={() => setAiType('letter')}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all
                        ${aiType === 'letter' 
                          ? 'bg-rose-50 border-rose-300 text-rose-600 scale-102' 
                          : 'bg-white border-gray-200 hover:bg-gray-50'}`}
                    >
                      💌 Thư tình ngọt ngào
                    </button>
                    <button
                      type="button" onClick={() => setAiType('caption')}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all
                        ${aiType === 'caption' 
                          ? 'bg-rose-50 border-rose-300 text-rose-600 scale-102' 
                          : 'bg-white border-gray-200 hover:bg-gray-50'}`}
                    >
                      ✨ Caption đăng mạng
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGenerateAI}
                  disabled={isAiLoading || !aiInput.trim()}
                  className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 text-amber-200 animate-spin" style={{ animationDuration: '3s' }} />
                  <span>{isAiLoading ? 'AI Đang suy nghĩ...' : 'Tạo cảm xúc bằng AI'}</span>
                </button>
              </div>

              {/* Hiển thị kết quả của AI */}
              {aiError && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-semibold">
                  ⚠️ Lỗi: {aiError}
                </div>
              )}

              {aiResult && (
                <div className="border border-dashed border-rose-200 bg-rose-50/20 rounded-2xl p-6 space-y-4 animate-fade-in">
                  <h4 className="text-xs font-bold text-rose-500 uppercase tracking-widest flex items-center gap-1">
                    ✨ Tác phẩm của AI dành cho bạn
                  </h4>
                  <div className="bg-white border border-rose-100 rounded-xl p-5 shadow-inner leading-relaxed text-sm text-gray-700 font-serif whitespace-pre-line">
                    {aiResult}
                  </div>

                  {/* Nút lưu nhanh */}
                  <div className="flex flex-wrap gap-2 justify-end">
                    <button
                      onClick={handleSaveAiToSecretLetter}
                      className="px-4 py-2 border border-rose-300 text-rose-600 hover:bg-rose-50 text-xs font-bold rounded-xl transition-colors"
                    >
                      Dán vào thư tình bí mật
                    </button>
                    <button
                      onClick={handleSaveAiToTimeline}
                      className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                    >
                      Dùng làm mốc kỷ niệm mới
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </main>

    </div>
  );
}
