'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockCoupleData, mockTimelines, mockAlbums, mockBucketList, mockGuestbook } from './mockData';
import { supabase, isDbConnected } from './supabase';

const MemoryContext = createContext(null);

export function MemoryProvider({ children }) {
  // Trạng thái dữ liệu cục bộ ban đầu
  const [couple, setCouple] = useState(mockCoupleData);
  const [timelines, setTimelines] = useState(mockTimelines);
  const [albums, setAlbums] = useState(mockAlbums);
  const [bucketList, setBucketList] = useState(mockBucketList);
  const [guestbook, setGuestbook] = useState(mockGuestbook);
  const [theme, setTheme] = useState('pink');
  
  // Trạng thái phát nhạc toàn cục
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.5);

  // 1. Tải dữ liệu ban đầu (SWR logic: Load Local Storage trước -> Sync Supabase DB sau)
  useEffect(() => {
    // Bước A: Đọc nhanh từ localStorage
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

    // Bước B: Đồng bộ hóa cơ sở dữ liệu online Supabase DB (nếu có kết nối)
    const syncWithSupabase = async () => {
      if (!isDbConnected()) return;

      try {
        // Lấy cấu hình couple mặc định (Slug 'linh-minh' hoặc dòng đầu tiên)
        let { data: dbCouple, error: coupleErr } = await supabase
          .from('couples')
          .select('*')
          .eq('slug', 'linh-minh')
          .single();

        // Nếu chưa có, lấy dòng đầu tiên
        if (coupleErr || !dbCouple) {
          const { data: allCouples } = await supabase.from('couples').select('*').limit(1);
          if (allCouples && allCouples.length > 0) {
            dbCouple = allCouples[0];
          }
        }

        if (dbCouple) {
          const coupleId = dbCouple.id;
          
          // Map ngược từ các tên cột DB sang các trường Frontend
          const mappedCouple = {
            id: dbCouple.id,
            slug: dbCouple.slug,
            partner1: dbCouple.partner1,
            partner2: dbCouple.partner2,
            anniversaryDate: dbCouple.anniversary_date,
            theme: dbCouple.theme,
            musicUrl: dbCouple.music_url,
            secretLetterKey: dbCouple.secret_letter_key,
            secretLetterContent: dbCouple.secret_letter_content,
            futureLetterContent: dbCouple.future_letter_content,
            futureLetterOpenDate: dbCouple.future_letter_open_date,
            spotifyPlaylistUrl: dbCouple.spotify_playlist_url,
            mapsEmbedUrl: dbCouple.maps_embed_url,
            avatar1: dbCouple.avatar1_url,
            avatar2: dbCouple.avatar2_url,
            coverImage: dbCouple.cover_image_url,
            introGreeting: dbCouple.intro_greeting,
            introMessage: dbCouple.intro_message,
            introSignOff: dbCouple.intro_sign_off,
            introSender: dbCouple.intro_sender,
            introStampUrl: dbCouple.intro_stamp_url,
            introEnvelopeText: dbCouple.intro_envelope_text,
            introEnvelopeLabel: dbCouple.intro_envelope_label,
            introLetterNote: dbCouple.intro_letter_note,
            introButtonText: dbCouple.intro_button_text
          };

          setCouple(mappedCouple);
          setTheme(mappedCouple.theme || 'pink');
          localStorage.setItem('dmc_couple', JSON.stringify(mappedCouple));

          // Đồng bộ các bảng con tương ứng theo couple_id
          const [timelinesRes, albumsRes, bucketRes, guestRes] = await Promise.all([
            supabase.from('timelines').select('*').eq('couple_id', coupleId).order('date', { ascending: true }),
            supabase.from('albums').select('*').eq('couple_id', coupleId).order('date', { ascending: true }),
            supabase.from('bucket_list').select('*').eq('couple_id', coupleId).order('created_at', { ascending: true }),
            supabase.from('guestbook').select('*').eq('couple_id', coupleId).order('created_at', { ascending: false })
          ]);

          if (timelinesRes.data) {
            setTimelines(timelinesRes.data);
            localStorage.setItem('dmc_timelines', JSON.stringify(timelinesRes.data));
          }
          if (albumsRes.data) {
            setAlbums(albumsRes.data);
            localStorage.setItem('dmc_albums', JSON.stringify(albumsRes.data));
          }
          if (bucketRes.data) {
            const mappedBucket = bucketRes.data.map(i => ({
              id: i.id,
              couple_id: i.couple_id,
              task: i.task,
              is_completed: i.is_completed
            }));
            setBucketList(mappedBucket);
            localStorage.setItem('dmc_bucketlist', JSON.stringify(mappedBucket));
          }
          if (guestRes.data) {
            setGuestbook(guestRes.data);
            localStorage.setItem('dmc_guestbook', JSON.stringify(guestRes.data));
          }
        }
      } catch (err) {
        console.warn("Lỗi đồng bộ Supabase DB (Sử dụng dữ liệu offline):", err);
      }
    };

    syncWithSupabase();
  }, []);

  // 2. Đồng bộ hóa Theme lên body tag CSS
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const body = document.body;
      const themeClasses = Array.from(body.classList).filter(c => c.startsWith('theme-'));
      themeClasses.forEach(c => body.classList.remove(c));
      body.classList.add(`theme-${theme}`);
    }
  }, [theme]);

  // -------------------------------------------------------------
  // CÁC HÀM CRUD ĐỒNG BỘ (State + LocalStorage + Supabase Background Sync)
  // -------------------------------------------------------------

  // Cập nhật cấu hình chung của Cặp đôi
  const updateCoupleInfo = async (data) => {
    const updated = { ...couple, ...data };
    
    // Ghi tức thời ở Client
    setCouple(updated);
    setTheme(updated.theme || 'pink');
    localStorage.setItem('dmc_couple', JSON.stringify(updated));

    // Đẩy bất đồng bộ lên Supabase DB
    if (isDbConnected()) {
      try {
        await supabase
          .from('couples')
          .update({
            partner1: updated.partner1,
            partner2: updated.partner2,
            anniversary_date: updated.anniversaryDate,
            theme: updated.theme,
            music_url: updated.musicUrl,
            secret_letter_key: updated.secretLetterKey,
            secret_letter_content: updated.secretLetterContent,
            future_letter_content: updated.futureLetterContent,
            future_letter_open_date: updated.futureLetterOpenDate || null,
            spotify_playlist_url: updated.spotifyPlaylistUrl,
            maps_embed_url: updated.mapsEmbedUrl,
            avatar1_url: updated.avatar1,
            avatar2_url: updated.avatar2,
            cover_image_url: updated.coverImage,
            intro_greeting: updated.introGreeting,
            intro_message: updated.introMessage,
            intro_sign_off: updated.introSignOff,
            intro_sender: updated.introSender,
            intro_stamp_url: updated.introStampUrl,
            intro_envelope_text: updated.introEnvelopeText,
            intro_envelope_label: updated.introEnvelopeLabel,
            intro_letter_note: updated.introLetterNote,
            intro_button_text: updated.introButtonText
          })
          .eq('id', couple.id);
      } catch (err) {
        console.error("Supabase update error:", err);
      }
    }
  };

  // Timeline
  const addTimelineItem = async (item) => {
    const tempId = 'timeline_' + Date.now();
    const newItem = {
      id: tempId,
      couple_id: couple.id,
      ...item
    };

    const updated = [...timelines, newItem].sort((a, b) => new Date(a.date) - new Date(b.date));
    setTimelines(updated);
    localStorage.setItem('dmc_timelines', JSON.stringify(updated));

    if (isDbConnected()) {
      try {
        const { data } = await supabase
          .from('timelines')
          .insert({
            couple_id: couple.id,
            title: item.title,
            location: item.location,
            date: item.date,
            description: item.description,
            media_url: item.mediaUrl,
            media_type: item.mediaType
          })
          .select()
          .single();
        
        if (data) {
          // Cập nhật lại ID thực của Supabase thay cho ID tạm thời
          setTimelines(prev => prev.map(x => x.id === tempId ? data : x));
        }
      } catch (err) {
        console.error("Supabase add timeline error:", err);
      }
    }
  };

  const updateTimelineItem = async (id, updatedItem) => {
    const updated = timelines.map(item => item.id === id ? { ...item, ...updatedItem } : item);
    setTimelines(updated);
    localStorage.setItem('dmc_timelines', JSON.stringify(updated));

    if (isDbConnected() && !id.startsWith('timeline_')) {
      try {
        await supabase
          .from('timelines')
          .update({
            title: updatedItem.title,
            location: updatedItem.location,
            date: updatedItem.date,
            description: updatedItem.description,
            media_url: updatedItem.mediaUrl,
            media_type: updatedItem.mediaType
          })
          .eq('id', id);
      } catch (err) {
        console.error("Supabase update timeline error:", err);
      }
    }
  };

  const deleteTimelineItem = async (id) => {
    const updated = timelines.filter(item => item.id !== id);
    setTimelines(updated);
    localStorage.setItem('dmc_timelines', JSON.stringify(updated));

    if (isDbConnected() && !id.startsWith('timeline_')) {
      try {
        await supabase.from('timelines').delete().eq('id', id);
      } catch (err) {
        console.error("Supabase delete timeline error:", err);
      }
    }
  };

  // Album
  const addAlbumItem = async (item) => {
    const tempId = 'album_' + Date.now();
    const newItem = {
      id: tempId,
      couple_id: couple.id,
      ...item,
      year: new Date(item.date).getFullYear()
    };

    const updated = [...albums, newItem].sort((a, b) => new Date(a.date) - new Date(b.date));
    setAlbums(updated);
    localStorage.setItem('dmc_albums', JSON.stringify(updated));

    if (isDbConnected()) {
      try {
        const { data } = await supabase
          .from('albums')
          .insert({
            couple_id: couple.id,
            url: item.url,
            caption: item.caption,
            date: item.date,
            year: new Date(item.date).getFullYear()
          })
          .select()
          .single();
        
        if (data) {
          setAlbums(prev => prev.map(x => x.id === tempId ? data : x));
        }
      } catch (err) {
        console.error("Supabase add album error:", err);
      }
    }
  };

  const updateAlbumItem = async (id, updatedItem) => {
    const updated = albums.map(item => {
      if (item.id === id) {
        const merged = { ...item, ...updatedItem };
        merged.year = new Date(merged.date).getFullYear();
        return merged;
      }
      return item;
    });
    setAlbums(updated);
    localStorage.setItem('dmc_albums', JSON.stringify(updated));

    if (isDbConnected() && !id.startsWith('album_')) {
      try {
        await supabase
          .from('albums')
          .update({
            url: updatedItem.url,
            caption: updatedItem.caption,
            date: updatedItem.date,
            year: new Date(updatedItem.date).getFullYear()
          })
          .eq('id', id);
      } catch (err) {
        console.error("Supabase update album error:", err);
      }
    }
  };

  const deleteAlbumItem = async (id) => {
    const updated = albums.filter(item => item.id !== id);
    setAlbums(updated);
    localStorage.setItem('dmc_albums', JSON.stringify(updated));

    if (isDbConnected() && !id.startsWith('album_')) {
      try {
        await supabase.from('albums').delete().eq('id', id);
      } catch (err) {
        console.error("Supabase delete album error:", err);
      }
    }
  };

  // Bucket list
  const addBucketItem = async (taskName) => {
    const tempId = 'bucket_' + Date.now();
    const newItem = {
      id: tempId,
      couple_id: couple.id,
      task: taskName,
      is_completed: false
    };

    const updated = [...bucketList, newItem];
    setBucketList(updated);
    localStorage.setItem('dmc_bucketlist', JSON.stringify(updated));

    if (isDbConnected()) {
      try {
        const { data } = await supabase
          .from('bucket_list')
          .insert({
            couple_id: couple.id,
            task: taskName,
            is_completed: false
          })
          .select()
          .single();
        
        if (data) {
          setBucketList(prev => prev.map(x => x.id === tempId ? {
            id: data.id,
            couple_id: data.couple_id,
            task: data.task,
            is_completed: data.is_completed
          } : x));
        }
      } catch (err) {
        console.error("Supabase add bucket list error:", err);
      }
    }
  };

  const toggleBucketItem = async (id) => {
    const itemToToggle = bucketList.find(i => i.id === id);
    if (!itemToToggle) return;

    const nextCompleted = !itemToToggle.is_completed;
    const updated = bucketList.map(item => 
      item.id === id ? { ...item, is_completed: nextCompleted } : item
    );
    setBucketList(updated);
    localStorage.setItem('dmc_bucketlist', JSON.stringify(updated));

    if (isDbConnected() && !id.toString().startsWith('bucket_')) {
      try {
        await supabase
          .from('bucket_list')
          .update({ is_completed: nextCompleted })
          .eq('id', id);
      } catch (err) {
        console.error("Supabase toggle bucket error:", err);
      }
    }
  };

  const deleteBucketItem = async (id) => {
    const updated = bucketList.filter(item => item.id !== id);
    setBucketList(updated);
    localStorage.setItem('dmc_bucketlist', JSON.stringify(updated));

    if (isDbConnected() && !id.toString().startsWith('bucket_')) {
      try {
        await supabase.from('bucket_list').delete().eq('id', id);
      } catch (err) {
        console.error("Supabase delete bucket error:", err);
      }
    }
  };

  // Guestbook
  const addGuestbookMessage = async (sender_name, message, emoji) => {
    const tempId = 'guest_' + Date.now();
    const newMessage = {
      id: tempId,
      couple_id: couple.id,
      sender_name,
      message,
      emoji,
      created_at: new Date().toISOString()
    };

    const updated = [newMessage, ...guestbook];
    setGuestbook(updated);
    localStorage.setItem('dmc_guestbook', JSON.stringify(updated));

    if (isDbConnected()) {
      try {
        const { data } = await supabase
          .from('guestbook')
          .insert({
            couple_id: couple.id,
            sender_name,
            message,
            emoji
          })
          .select()
          .single();
        
        if (data) {
          setGuestbook(prev => prev.map(x => x.id === tempId ? data : x));
        }
      } catch (err) {
        console.error("Supabase add guest message error:", err);
      }
    }
  };

  // Khôi phục cài đặt gốc (Reset)
  const resetToDefault = async () => {
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

    // Nếu có kết nối online, tự động xóa các bản ghi phụ trên database
    if (isDbConnected()) {
      try {
        await Promise.all([
          supabase.from('timelines').delete().eq('couple_id', couple.id),
          supabase.from('albums').delete().eq('couple_id', couple.id),
          supabase.from('bucket_list').delete().eq('couple_id', couple.id),
          supabase.from('guestbook').delete().eq('couple_id', couple.id)
        ]);
        
        // Cập nhật lại dòng couple mặc định
        await updateCoupleInfo(mockCoupleData);
      } catch (err) {
        console.warn("Lỗi reset dữ liệu DB:", err);
      }
    }
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
      musicVolume,
      setMusicVolume,
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
