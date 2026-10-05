export type ServiceCategory = 'aluminum' | 'iron';

export interface ServiceItem {
  id: number;
  slug: 'aluminum' | 'iron';
  title_ar: string;
  title_en: string;
  short_description: string;
  long_description: string;
  icon: string;
  cover_image: string;
  features: string[];
  sort_order: number;
  is_active: boolean;
}

export interface PhotoItem {
  id: number;
  album_id: number;
  path: string;
  thumb_path?: string;
  caption: string;
  alt_text: string;
  sort_order: number;
  is_cover: boolean;
  category: ServiceCategory;
}

export interface AlbumItem {
  id: number;
  service_id: number; // 1 for aluminum, 2 for iron
  slug: string;
  title_ar: string;
  title_en: string;
  description: string;
  cover_image: string;
  section: ServiceCategory;
  sort_order: number;
  is_active: boolean;
}

export interface ContactMessageItem {
  id: number;
  name: string;
  phone: string;
  email?: string;
  subject?: string;
  message: string;
  is_read: boolean;
  created_at: string;
  ip_address?: string;
}

export interface SiteSettings {
  site_name: string;
  owner_name: string;
  site_tagline: string;
  phone: string;
  whatsapp_number: string;
  whatsapp_message: string;
  email: string;
  address: string;
  working_hours: string;
  facebook_url?: string;
  instagram_url?: string;
  tiktok_url?: string;
}
