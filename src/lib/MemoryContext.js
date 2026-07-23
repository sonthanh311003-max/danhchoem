'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockCoupleData, mockTimelines, mockAlbums, mockBucketList, mockGuestbook } from './mockData';

const MemoryContext = createContext(null);

export function MemoryProvider({ children }) {
  // Trạng thái dữ liệu
  const [couple, setCouple] = useState(mockCoupleData);
  const [timelines, setTimelines] = useState(mockTimelines);
  const [albums, setAlbums] = useState(mockAlbums);
  const [bucketList, setBucketList] = useState(mockBucketList);
  const [guestbook, setGuestbook] = useState(mockGuestbook);
  const [theme, setTheme] = useState('pink');
  
  // Trạng thái phát nhạc toàn cục
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  // Khôi phục dữ liệu từ localStorage khi khởi động
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localCouple = localStorage.getItem('dmc_couple');
      const localTimelines = localStorage.getItem('dmc_timelines');
      const localAlbums = localStorage.getItem('dmc_albums');
      const localBucketList = localStorage.getItem('dmc_bucketlist');
      const localGuestbook = localStorage.getItem('dmc_guestbook');

      if (localCouple) {
        const parsedCouple = JSON.parse(localCouple);
        setCouple(parsedCouple);
        setTheme(parsedCouple.theme || 'pink');
      }
      if (localTimelines) setTimelines(JSON.parse(localTimelines));
      if (localAlbums) setAlbums(JSON.parse(localAlbums));
      if (localBucketList) setBucketList(JSON.parse(localBucketList));
      if (localGuestbook) setGuestbook(JSON.parse(localGuestbook));
    }
  }, []);

  // Đồng bộ hóa Theme lên body tag
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const body = document.body;
      // Xóa tất cả class theme cũ
      const themeClasses = Array.from(body.classList).filter(c => c.startsWith('theme-'));
      themeClasses.forEach(c => body.classList.remove(c));
      // Thêm class theme mới
      body.classList.add(`theme-${theme}`);
    }
  }, [theme]);

  // Các hàm lưu trữ dữ liệu
  const saveCouple = (updatedCouple) => {
    setCouple(updatedCouple);
    setTheme(updatedCouple.theme);
    localStorage.setItem('dmc_couple', JSON.stringify(updatedCouple));
  };

  const saveTimelines = (updatedTimelines) => {
    const sorted = [...updatedTimelines].sort((a, b) => new Date(a.date) - new Date(b.date));
    setTimelines(sorted);
    localStorage.setItem('dmc_timelines', JSON.stringify(sorted));
  };

  const saveAlbums = (updatedAlbums) => {
    const sorted = [...updatedAlbums].sort((a, b) => new Date(a.date) - new Date(b.date));
    setAlbums(sorted);
    localStorage.setItem('dmc_albums', JSON.stringify(sorted));
  };

  const saveBucketList = (updatedBucketList) => {
    setBucketList(updatedBucketList);
    localStorage.setItem('dmc_bucketlist', JSON.stringify(updatedBucketList));
  };

  const saveGuestbook = (updatedGuestbook) => {
    setGuestbook(updatedGuestbook);
    localStorage.setItem('dmc_guestbook', JSON.stringify(updatedGuestbook));
  };

  // -------------------------------------------------------------
  // CHI TIẾT CÁC HÀM THAO TÁC DỮ LIỆU (CRUD)
  // -------------------------------------------------------------

  // Cập nhật cấu hình chung của Cặp đôi
  const updateCoupleInfo = (data) => {
    const updated = { ...couple, ...data };
    saveCouple(updated);
  };

  // Timeline
  const addTimelineItem = (item) => {
    const newItem = {
      id: 'timeline_' + Date.now(),
      couple_id: couple.id,
      ...item
    };
    saveTimelines([...timelines, newItem]);
  };

  const updateTimelineItem = (id, updatedItem) => {
    const updated = timelines.map(item => item.id === id ? { ...item, ...updatedItem } : item);
    saveTimelines(updated);
  };

  const deleteTimelineItem = (id) => {
    const updated = timelines.filter(item => item.id !== id);
    saveTimelines(updated);
  };

  // Album
  const addAlbumItem = (item) => {
    const newItem = {
      id: 'album_' + Date.now(),
      couple_id: couple.id,
      ...item,
      year: new Date(item.date).getFullYear()
    };
    saveAlbums([...albums, newItem]);
  };

  const updateAlbumItem = (id, updatedItem) => {
    const updated = albums.map(item => {
      if (item.id === id) {
        const merged = { ...item, ...updatedItem };
        merged.year = new Date(merged.date).getFullYear();
        return merged;
      }
      return item;
    });
    saveAlbums(updated);
  };

  const deleteAlbumItem = (id) => {
    const updated = albums.filter(item => item.id !== id);
    saveAlbums(updated);
  };

  // Bucket list
  const addBucketItem = (taskName) => {
    const newItem = {
      id: 'bucket_' + Date.now(),
      couple_id: couple.id,
      task: taskName,
      is_completed: false,
      orderIndex: bucketList.length
    };
    saveBucketList([...bucketList, newItem]);
  };

  const toggleBucketItem = (id) => {
    const updated = bucketList.map(item => 
      item.id === id ? { ...item, is_completed: !item.is_completed } : item
    );
    saveBucketList(updated);
  };

  const deleteBucketItem = (id) => {
    const updated = bucketList.filter(item => item.id !== id);
    saveBucketList(updated);
  };

  // Guestbook
  const addGuestbookMessage = (sender_name, message, emoji) => {
    const newMessage = {
      id: 'guest_' + Date.now(),
      couple_id: couple.id,
      sender_name,
      message,
      emoji,
      created_at: new Date().toISOString()
    };
    saveGuestbook([newMessage, ...guestbook]); // Hiện tin nhắn mới lên đầu
  };

  // Khôi phục cài đặt gốc (Reset)
  const resetToDefault = () => {
    localStorage.removeItem('dmc_couple');
    localStorage.removeItem('dmc_timelines');
    localStorage.removeItem('dmc_albums');
    localStorage.removeItem('dmc_bucketlist');
    localStorage.removeItem('dmc_guestbook');
    
    setCouple(mockCoupleData);
    setTimelines(mockTimelines);
    setAlbums(mockAlbums);
    setBucketList(mockBucketList);
    setGuestbook(mockGuestbook);
    setTheme(mockCoupleData.theme);
  };

  return (
    <MemoryContext.Provider value={{
      couple,
      timelines,
      albums,
      bucketList,
      guestbook,
      theme,
      setTheme,
      isPlayingMusic,
      setIsPlayingMusic,
      updateCoupleInfo,
      addTimelineItem,
      updateTimelineItem,
      deleteTimelineItem,
      addAlbumItem,
      updateAlbumItem,
      deleteAlbumItem,
      addBucketItem,
      toggleBucketItem,
      deleteBucketItem,
      addGuestbookMessage,
      resetToDefault
    }}>
      {children}
    </MemoryContext.Provider>
  );
}

export function useMemory() {
  const context = useContext(MemoryContext);
  if (!context) {
    throw new Error('useMemory must be used within a MemoryProvider');
  }
  return context;
}
