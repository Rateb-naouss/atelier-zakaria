import React, { createContext, useContext, useState, useEffect } from 'react';
import { AlbumItem, PhotoItem, ServiceItem, SiteSettings, ContactMessageItem, ServiceCategory } from '../types';
import { initialAlbums, initialMessages, initialPhotos, initialServices, initialSettings } from '../data/initialData';

interface WorkshopContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  services: ServiceItem[];
  albums: AlbumItem[];
  photos: PhotoItem[];
  messages: ContactMessageItem[];
  currentView: string;
  setCurrentView: (view: string) => void;
  selectedAlbumSlug: string | null;
  setSelectedAlbumSlug: (slug: string | null) => void;
  currentLang: 'ar' | 'en';
  setLang: (lang: 'ar' | 'en') => void;

  // Lightbox
  lightboxPhoto: PhotoItem | null;
  openLightbox: (photo: PhotoItem) => void;
  closeLightbox: () => void;
  nextPhoto: () => void;
  prevPhoto: () => void;

  // Album actions
  addAlbum: (album: Omit<AlbumItem, 'id'>) => void;
  updateAlbum: (id: number, album: Partial<AlbumItem>) => void;
  deleteAlbum: (id: number) => void;

  // Photo actions
  addPhoto: (photo: Omit<PhotoItem, 'id'>) => void;
  deletePhoto: (id: number) => void;

  // Message actions
  submitMessage: (msg: { name: string; phone: string; email?: string; subject?: string; message: string }) => boolean;
  markMessageAsRead: (id: number) => void;
  deleteMessage: (id: number) => void;

  // Helpers
  getWhatsAppUrl: (customMsg?: string) => string;
}

const WorkshopContext = createContext<WorkshopContextType | undefined>(undefined);

export const WorkshopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('zakaria_workshop_settings');
    return saved ? JSON.parse(saved) : initialSettings;
  });

  const [services] = useState<ServiceItem[]>(initialServices);

  const [albums, setAlbums] = useState<AlbumItem[]>(() => {
    const saved = localStorage.getItem('zakaria_workshop_albums');
    return saved ? JSON.parse(saved) : initialAlbums;
  });

  const [photos, setPhotos] = useState<PhotoItem[]>(() => {
    const saved = localStorage.getItem('zakaria_workshop_photos');
    return saved ? JSON.parse(saved) : initialPhotos;
  });

  const [messages, setMessages] = useState<ContactMessageItem[]>(() => {
    const saved = localStorage.getItem('zakaria_workshop_messages');
    return saved ? JSON.parse(saved) : initialMessages;
  });

  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedAlbumSlug, setSelectedAlbumSlug] = useState<string | null>(null);
  const [currentLang, setLang] = useState<'ar' | 'en'>('ar');

  // Lightbox
  const [lightboxPhoto, setLightboxPhoto] = useState<PhotoItem | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('zakaria_workshop_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('zakaria_workshop_albums', JSON.stringify(albums));
  }, [albums]);

  useEffect(() => {
    localStorage.setItem('zakaria_workshop_photos', JSON.stringify(photos));
  }, [photos]);

  useEffect(() => {
    localStorage.setItem('zakaria_workshop_messages', JSON.stringify(messages));
  }, [messages]);

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const addAlbum = (newAlbum: Omit<AlbumItem, 'id'>) => {
    const id = Date.now();
    const item: AlbumItem = { ...newAlbum, id };
    setAlbums(prev => [item, ...prev]);
  };

  const updateAlbum = (id: number, updated: Partial<AlbumItem>) => {
    setAlbums(prev => prev.map(a => (a.id === id ? { ...a, ...updated } : a)));
  };

  const deleteAlbum = (id: number) => {
    setAlbums(prev => prev.filter(a => a.id !== id));
    setPhotos(prev => prev.filter(p => p.album_id !== id));
  };

  const addPhoto = (newPhoto: Omit<PhotoItem, 'id'>) => {
    const id = Date.now();
    const item: PhotoItem = { ...newPhoto, id };
    setPhotos(prev => [item, ...prev]);
  };

  const deletePhoto = (id: number) => {
    setPhotos(prev => prev.filter(p => p.id !== id));
  };

  const submitMessage = (msg: { name: string; phone: string; email?: string; subject?: string; message: string }) => {
    const newMsg: ContactMessageItem = {
      id: Date.now(),
      name: msg.name,
      phone: msg.phone,
      email: msg.email,
      subject: msg.subject,
      message: msg.message,
      is_read: false,
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };
    setMessages(prev => [newMsg, ...prev]);
    return true;
  };

  const markMessageAsRead = (id: number) => {
    setMessages(prev => prev.map(m => (m.id === id ? { ...m, is_read: true } : m)));
  };

  const deleteMessage = (id: number) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  const openLightbox = (photo: PhotoItem) => {
    setLightboxPhoto(photo);
  };

  const closeLightbox = () => {
    setLightboxPhoto(null);
  };

  const nextPhoto = () => {
    if (!lightboxPhoto) return;
    const currentList = photos.filter(p => p.album_id === lightboxPhoto.album_id || photos);
    const idx = currentList.findIndex(p => p.id === lightboxPhoto.id);
    if (idx !== -1 && idx < currentList.length - 1) {
      setLightboxPhoto(currentList[idx + 1]);
    } else if (idx !== -1 && idx === currentList.length - 1) {
      setLightboxPhoto(currentList[0]);
    }
  };

  const prevPhoto = () => {
    if (!lightboxPhoto) return;
    const currentList = photos.filter(p => p.album_id === lightboxPhoto.album_id || photos);
    const idx = currentList.findIndex(p => p.id === lightboxPhoto.id);
    if (idx > 0) {
      setLightboxPhoto(currentList[idx - 1]);
    } else if (idx === 0) {
      setLightboxPhoto(currentList[currentList.length - 1]);
    }
  };

  const getWhatsAppUrl = (customMsg?: string) => {
    const rawNumber = settings.whatsapp_number.replace(/\D/g, '');
    const cleanNumber = rawNumber.startsWith('961') ? rawNumber : `961${rawNumber.replace(/^0+/, '')}`;
    const text = customMsg || settings.whatsapp_message;
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <WorkshopContext.Provider
      value={{
        settings,
        updateSettings,
        services,
        albums,
        photos,
        messages,
        currentView,
        setCurrentView,
        selectedAlbumSlug,
        setSelectedAlbumSlug,
        currentLang,
        setLang,
        lightboxPhoto,
        openLightbox,
        closeLightbox,
        nextPhoto,
        prevPhoto,
        addAlbum,
        updateAlbum,
        deleteAlbum,
        addPhoto,
        deletePhoto,
        submitMessage,
        markMessageAsRead,
        deleteMessage,
        getWhatsAppUrl,
      }}
    >
      {children}
    </WorkshopContext.Provider>
  );
};

export const useWorkshop = () => {
  const context = useContext(WorkshopContext);
  if (!context) {
    throw new Error('useWorkshop must be used within a WorkshopProvider');
  }
  return context;
};
