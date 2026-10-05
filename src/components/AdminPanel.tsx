import React, { useState } from 'react';
import { useWorkshop } from '../context/WorkshopContext';
import { AlbumItem, PhotoItem, ServiceCategory } from '../types';
import {
  LayoutDashboard,
  FolderOpen,
  Image as ImageIcon,
  Mail,
  Settings as SettingsIcon,
  Layers,
  Hammer,
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  ExternalLink,
  ArrowRight,
  Eye,
  Save,
  Code2,
  Filter
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

export const AdminPanel: React.FC = () => {
  const {
    settings,
    updateSettings,
    albums,
    photos,
    messages,
    services,
    setCurrentView,
    addAlbum,
    updateAlbum,
    deleteAlbum,
    addPhoto,
    deletePhoto,
    markMessageAsRead,
    deleteMessage,
    getWhatsAppUrl,
  } = useWorkshop();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'albums' | 'photos' | 'messages' | 'settings'>('dashboard');

  // Form states for new album
  const [newAlbumTitle, setNewAlbumTitle] = useState('');
  const [newAlbumSection, setNewAlbumSection] = useState<ServiceCategory>('aluminum');
  const [newAlbumDesc, setNewAlbumDesc] = useState('');
  const [newAlbumImage, setNewAlbumImage] = useState('');
  const [showAddAlbum, setShowAddAlbum] = useState(false);

  // Form states for new photo
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoCaption, setNewPhotoCaption] = useState('');
  const [newPhotoAlbumId, setNewPhotoAlbumId] = useState<number>(albums[0]?.id || 1);
  const [showAddPhoto, setShowAddPhoto] = useState(false);

  // Settings form state
  const [tempSettings, setTempSettings] = useState(settings);
  const [settingsSavedToast, setSettingsSavedToast] = useState(false);

  const unreadMessagesCount = messages.filter(m => !m.is_read).length;

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(tempSettings);
    setSettingsSavedToast(true);
    setTimeout(() => setSettingsSavedToast(false), 3000);
  };

  const handleCreateAlbum = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlbumTitle.trim()) return;
    const slug = newAlbumTitle.toLowerCase().replace(/\s+/g, '-');
    addAlbum({
      service_id: newAlbumSection === 'aluminum' ? 1 : 2,
      slug,
      title_ar: newAlbumTitle,
      title_en: newAlbumTitle,
      description: newAlbumDesc || 'ألبوم أعمال جديد',
      cover_image: newAlbumImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      section: newAlbumSection,
      sort_order: albums.length + 1,
      is_active: true,
    });
    setNewAlbumTitle('');
    setNewAlbumDesc('');
    setNewAlbumImage('');
    setShowAddAlbum(false);
  };

  const handleCreatePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoUrl.trim() || !newPhotoCaption.trim()) return;
    const targetAlbum = albums.find(a => a.id === Number(newPhotoAlbumId));
    addPhoto({
      album_id: Number(newPhotoAlbumId),
      path: newPhotoUrl,
      caption: newPhotoCaption,
      alt_text: newPhotoCaption,
      sort_order: photos.length + 1,
      is_cover: false,
      category: targetAlbum?.section || 'aluminum',
    });
    setNewPhotoUrl('');
    setNewPhotoCaption('');
    setShowAddPhoto(false);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col md:flex-row" dir="rtl">
      
      {/* Filament-style Sidebar */}
      <aside className="w-full md:w-64 bg-stone-900 border-l border-stone-800 flex flex-col justify-between shrink-0">
        <div>
          {/* Brand header */}
          <div className="p-4 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
                <Hammer className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-black text-white">Filament v3 Admin</div>
                <div className="text-[11px] text-amber-400">مشغل زكريا جواد</div>
              </div>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="p-3 space-y-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition ${
                activeTab === 'dashboard'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow'
                  : 'text-stone-300 hover:bg-stone-800 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>لوحة المؤشرات</span>
            </button>

            <button
              onClick={() => setActiveTab('albums')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition ${
                activeTab === 'albums'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow'
                  : 'text-stone-300 hover:bg-stone-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <FolderOpen className="w-4 h-4" />
                <span>إدارة الألبومات</span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === 'albums' ? 'bg-stone-950/20 text-stone-950' : 'bg-stone-800 text-stone-300'}`}>
                {albums.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('photos')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition ${
                activeTab === 'photos'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow'
                  : 'text-stone-300 hover:bg-stone-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <ImageIcon className="w-4 h-4" />
                <span>معرض الصور</span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === 'photos' ? 'bg-stone-950/20 text-stone-950' : 'bg-stone-800 text-stone-300'}`}>
                {photos.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition ${
                activeTab === 'messages'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow'
                  : 'text-stone-300 hover:bg-stone-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <span>رسائل الزبائن</span>
              </div>
              {unreadMessagesCount > 0 ? (
                <span className="text-xs px-2 py-0.5 rounded-full bg-red-500 text-white font-bold animate-pulse">
                  {unreadMessagesCount}
                </span>
              ) : (
                <span className="text-xs px-2 py-0.5 rounded-full bg-stone-800 text-stone-400">
                  {messages.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition ${
                activeTab === 'settings'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow'
                  : 'text-stone-300 hover:bg-stone-800 hover:text-white'
              }`}
            >
              <SettingsIcon className="w-4 h-4" />
              <span>إعدادات الموقع وتواصل</span>
            </button>

            <div className="pt-4 border-t border-stone-800/80 mt-4">
              <button
                onClick={() => setCurrentView('laravel-hub')}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-mono font-bold text-red-400 hover:bg-red-950/30 border border-red-900/30 transition"
              >
                <Code2 className="w-4 h-4" />
                <span>ملفات مشروع Laravel 11</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Return to Public Site Button */}
        <div className="p-4 border-t border-stone-800 bg-stone-950/50">
          <button
            onClick={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-400 text-xs font-bold transition"
          >
            <ArrowRight className="w-4 h-4" />
            <span>معاينة الموقع العام</span>
          </button>
          <div className="text-[10px] text-stone-500 text-center mt-2">
            مستخدم الإدارة: admin@zakaria-workshop.com
          </div>
        </div>
      </aside>

      {/* Main Panel Content Area */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-stone-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {activeTab === 'dashboard' && 'لوحة المعلومات والمؤشرات'}
              {activeTab === 'albums' && 'إدارة الألبومات وتصنيفات الأعمال'}
              {activeTab === 'photos' && 'إدارة صور المعرض ورفع النماذج'}
              {activeTab === 'messages' && 'صندوق رسائل واستفسارات الزبائن'}
              {activeTab === 'settings' && 'إعدادات المشغل وأرقام التواصل'}
            </h1>
            <p className="text-xs sm:text-sm text-stone-400 mt-1">
              مشغل حدادة افرنجية وألمنيوم — المعلم زكريا جواد
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 text-stone-200 text-xs font-bold transition"
            >
              <Eye className="w-4 h-4 text-amber-500" />
              <span>مشاهدة الموقع الحي</span>
            </button>
          </div>
        </div>

        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-stone-400">إجمالي الألبومات</span>
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                    <FolderOpen className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-white">{albums.length} ألبومات</div>
                <div className="text-xs text-stone-500 mt-1">3 ألمنيوم • 2 حدادة إفرنجية</div>
              </div>

              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-stone-400">إجمالي الصور الحية</span>
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-white">{photos.length} نموذج</div>
                <div className="text-xs text-stone-500 mt-1">معروضة للزبائن مع لايت بوكس</div>
              </div>

              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-stone-400">رسائل الزبائن</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-white">{messages.length} رسالة</div>
                <div className="text-xs text-emerald-400 mt-1 font-bold">
                  {unreadMessagesCount} بحاجة للمتابعة
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-stone-400">حالة واتساب المباشر</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>
                <div className="text-base font-black text-emerald-400" dir="ltr">+961 71 206 898</div>
                <div className="text-xs text-stone-500 mt-1">زر عائم شغال بجميع الصفحات</div>
              </div>
            </div>

            {/* Recent Messages Preview */}
            <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-white text-base">أحدث استفسارات الزبائن الواصلة</h3>
                <button
                  onClick={() => setActiveTab('messages')}
                  className="text-xs text-amber-400 hover:underline font-bold"
                >
                  عرض جميع الرسائل ({messages.length})
                </button>
              </div>

              <div className="divide-y divide-stone-800">
                {messages.slice(0, 3).map((msg) => (
                  <div key={msg.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{msg.name}</span>
                        {!msg.is_read && (
                          <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                            جديد
                          </span>
                        )}
                        <span className="text-xs text-stone-500" dir="ltr">{msg.phone}</span>
                      </div>
                      <p className="text-xs text-stone-300 mt-1 line-clamp-1">{msg.message}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={getWhatsAppUrl(`مرحباً ${msg.name}، معك المعلم زكريا جواد بخصوص استفسارك.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white transition text-xs font-bold flex items-center gap-1"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400" />
                        <span>رد واتساب</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ALBUMS MANAGEMENT */}
        {activeTab === 'albums' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">قائمة الألبومات الخمسة (Albums)</h3>
                <p className="text-xs text-stone-400">يمكنك تعديل أسماء الألبومات أو إضافة ألبومات جديدة لقسمي الألمنيوم والحدادة</p>
              </div>
              <button
                onClick={() => setShowAddAlbum(!showAddAlbum)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow transition"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة ألبوم جديد</span>
              </button>
            </div>

            {/* Add Album Form Drawer */}
            {showAddAlbum && (
              <form onSubmit={handleCreateAlbum} className="p-6 rounded-2xl bg-stone-900 border border-amber-500/40 space-y-4">
                <h4 className="font-bold text-white text-sm">بيانات الألبوم الجديد</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-stone-300 mb-1">اسم الألبوم بالعربية *</label>
                    <input
                      type="text"
                      value={newAlbumTitle}
                      onChange={(e) => setNewAlbumTitle(e.target.value)}
                      placeholder="مثال: واجهات زجاجية ومحلات"
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-stone-300 mb-1">القسم التابع له *</label>
                    <select
                      value={newAlbumSection}
                      onChange={(e) => setNewAlbumSection(e.target.value as ServiceCategory)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="aluminum">قسم الألمنيوم المعماري</option>
                      <option value="iron">قسم الحدادة الإفرنجية</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-stone-300 mb-1">وصف مختصر للألبوم</label>
                  <textarea
                    rows={2}
                    value={newAlbumDesc}
                    onChange={(e) => setNewAlbumDesc(e.target.value)}
                    placeholder="اكتب وصفاً لطبيعة الأعمال المعروضة في هذا الألبوم..."
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs text-stone-300 mb-1">رابط صورة الغلاف (URL أو مسار)</label>
                  <input
                    type="url"
                    value={newAlbumImage}
                    onChange={(e) => setNewAlbumImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddAlbum(false)}
                    className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 text-xs font-semibold"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs"
                  >
                    حفظ الألبوم
                  </button>
                </div>
              </form>
            )}

            {/* Albums List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {albums.map((album) => {
                const count = photos.filter(p => p.album_id === album.id).length;
                return (
                  <div key={album.id} className="p-4 rounded-2xl bg-stone-900 border border-stone-800 flex gap-4">
                    <img
                      src={album.cover_image}
                      alt={album.title_ar}
                      className="w-24 h-24 rounded-xl object-cover shrink-0 bg-stone-950"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${album.section === 'aluminum' ? 'bg-blue-500/10 text-blue-400' : 'bg-amber-500/10 text-amber-400'}`}>
                            {album.section === 'aluminum' ? 'قسم الألمنيوم' : 'قسم الحدادة'}
                          </span>
                          <span className="text-xs text-stone-400 font-bold">{count} صورة</span>
                        </div>
                        <h4 className="font-bold text-white text-base mt-1">{album.title_ar}</h4>
                        <p className="text-xs text-stone-400 line-clamp-1 mt-0.5">{album.description}</p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-stone-800/80 mt-2">
                        <span className="text-[11px] text-stone-500 font-mono">slug: {album.slug}</span>
                        <button
                          onClick={() => deleteAlbum(album.id)}
                          className="text-red-400 hover:text-red-300 p-1 transition"
                          title="حذف الألبوم"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: PHOTOS MANAGEMENT */}
        {activeTab === 'photos' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">إدارة صور النماذج والأعمال</h3>
                <p className="text-xs text-stone-400">إضافة صور وتعديل الوصف وتحديد الألبوم التابع له</p>
              </div>
              <button
                onClick={() => setShowAddPhoto(!showAddPhoto)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow transition"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة صورة نموذج جديد</span>
              </button>
            </div>

            {/* Add Photo Form */}
            {showAddPhoto && (
              <form onSubmit={handleCreatePhoto} className="p-6 rounded-2xl bg-stone-900 border border-amber-500/40 space-y-4">
                <h4 className="font-bold text-white text-sm">إضافة صورة جديدة للمعرض</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-stone-300 mb-1">اختر الألبوم التابع له *</label>
                    <select
                      value={newPhotoAlbumId}
                      onChange={(e) => setNewPhotoAlbumId(Number(e.target.value))}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                    >
                      {albums.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.title_ar} ({a.section === 'aluminum' ? 'ألمنيوم' : 'حدادة'})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-stone-300 mb-1">رابط الصورة (URL أو مسار تخزين) *</label>
                    <input
                      type="url"
                      value={newPhotoUrl}
                      onChange={(e) => setNewPhotoUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-stone-300 mb-1">وصف العمل (يظهر للزبون عند التكبير والواتساب) *</label>
                  <input
                    type="text"
                    value={newPhotoCaption}
                    onChange={(e) => setNewPhotoCaption(e.target.value)}
                    placeholder="مثال: باب أمان حديد صلب مع تطعيم خشب طبيعي ودهان حراري"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddPhoto(false)}
                    className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 text-xs font-semibold"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs"
                  >
                    إضافة للصورة للمعرض
                  </button>
                </div>
              </form>
            )}

            {/* Photos Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((photo) => {
                const album = albums.find(a => a.id === photo.album_id);
                return (
                  <div key={photo.id} className="rounded-xl bg-stone-900 border border-stone-800 overflow-hidden flex flex-col justify-between">
                    <div className="relative h-40 bg-stone-950">
                      <img
                        src={photo.path}
                        alt={photo.caption}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-2 right-2 text-[10px] font-bold bg-stone-950/80 px-2 py-0.5 rounded text-amber-400">
                        {album?.title_ar}
                      </span>
                    </div>

                    <div className="p-3 flex-1 flex flex-col justify-between">
                      <p className="text-xs text-stone-300 line-clamp-2 mb-2">{photo.caption}</p>
                      <div className="flex items-center justify-between pt-2 border-t border-stone-800">
                        <span className="text-[10px] text-stone-500 font-mono">ID: {photo.id}</span>
                        <button
                          onClick={() => deletePhoto(photo.id)}
                          className="text-red-400 hover:text-red-300 p-1"
                          title="حذف الصورة"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: CONTACT MESSAGES */}
        {activeTab === 'messages' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-lg font-bold text-white">صندوق رسائل نموذج الموقع</h3>
                <p className="text-xs text-stone-400">يمكنك الرد مباشرة على أي زبون عبر واتساب بضغطة واحدة</p>
              </div>
            </div>

            {messages.length === 0 ? (
              <div className="text-center py-12 bg-stone-900 rounded-2xl border border-stone-800 text-stone-400">
                لا توجد رسائل جديدة حالياً.
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      msg.is_read
                        ? 'bg-stone-900 border-stone-800 text-stone-300'
                        : 'bg-stone-900/90 border-amber-500/50 shadow-lg text-white'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-black text-base text-white">{msg.name}</span>
                        {!msg.is_read && (
                          <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                            غير مقروء
                          </span>
                        )}
                        <span className="text-xs text-stone-400">{msg.created_at}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={getWhatsAppUrl(`مرحباً أستاذ ${msg.name}، معك المعلم زكريا جواد من مشغل الحدادة والألمنيوم. استلمت رسالتك بخصوص: "${msg.subject || 'الاستفسار'}"، ويسعدني إفادتك.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg shadow transition"
                        >
                          <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
                          <span>محادثة واتساب سريعة</span>
                        </a>

                        <a
                          href={getWhatsAppUrl(`مرحباً ${msg.name}، استلمت رسالتك بخصوص "${msg.subject || 'الطلب'}" عبر موقع ورشة المعلم زكريا جواد.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-bold bg-stone-800 hover:bg-stone-700 text-emerald-400 px-3 py-1.5 rounded-lg border border-stone-700 transition"
                          dir="ltr"
                        >
                          <WhatsAppIcon className="w-3 h-3 text-emerald-400" />
                          <span>{msg.phone}</span>
                        </a>

                        {!msg.is_read && (
                          <button
                            onClick={() => markMessageAsRead(msg.id)}
                            className="p-1.5 text-stone-400 hover:text-emerald-400 transition"
                            title="تحديد كمقروء"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}

                        <button
                          onClick={() => deleteMessage(msg.id)}
                          className="p-1.5 text-stone-500 hover:text-red-400 transition"
                          title="حذف الرسالة"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {msg.subject && (
                      <div className="text-xs font-bold text-amber-400 mb-2">
                        الموضوع: {msg.subject}
                      </div>
                    )}

                    <p className="text-sm text-stone-200 bg-stone-950/60 p-3.5 rounded-xl border border-stone-800/80 leading-relaxed">
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl animate-fadeIn">
            <form onSubmit={handleSaveSettings} className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                <div>
                  <h3 className="text-lg font-bold text-white">إعدادات الموقع ومعلومات المعلم زكريا</h3>
                  <p className="text-xs text-stone-400">أي تعديل هنا سينعكس فوراً على الموقع والزر العائم وروابط الواتساب</p>
                </div>
                {settingsSavedToast && (
                  <span className="text-xs text-emerald-400 font-bold bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-800">
                    تم الحفظ بنجاح ✓
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">اسم المشغل التجاري</label>
                  <input
                    type="text"
                    value={tempSettings.site_name}
                    onChange={(e) => setTempSettings({ ...tempSettings, site_name: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">اسم المعلم / المالك</label>
                  <input
                    type="text"
                    value={tempSettings.owner_name}
                    onChange={(e) => setTempSettings({ ...tempSettings, owner_name: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">شعار المشغل (Tagline)</label>
                <input
                  type="text"
                  value={tempSettings.site_tagline}
                  onChange={(e) => setTempSettings({ ...tempSettings, site_tagline: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">رقم الواتساب (مع رمز الدولة)</label>
                  <input
                    type="text"
                    value={tempSettings.whatsapp_number}
                    onChange={(e) => setTempSettings({ ...tempSettings, whatsapp_number: e.target.value })}
                    dir="ltr"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 text-right"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">رقم الهاتف للاتصال</label>
                  <input
                    type="text"
                    value={tempSettings.phone}
                    onChange={(e) => setTempSettings({ ...tempSettings, phone: e.target.value })}
                    dir="ltr"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 text-right"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">ساعات العمل والدوام</label>
                <input
                  type="text"
                  value={tempSettings.working_hours}
                  onChange={(e) => setTempSettings({ ...tempSettings, working_hours: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">العنوان ومناطق التغطية</label>
                <input
                  type="text"
                  value={tempSettings.address}
                  onChange={(e) => setTempSettings({ ...tempSettings, address: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-4 border-t border-stone-800 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm px-6 py-3 rounded-xl shadow transition"
                >
                  <Save className="w-4 h-4" />
                  <span>حفظ التعديلات</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </main>
    </div>
  );
};
