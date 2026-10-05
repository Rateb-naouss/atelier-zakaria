import React, { useState, useMemo } from 'react';
import { useWorkshop } from '../context/WorkshopContext';
import { PhotoItem, AlbumItem } from '../types';
import { Sparkles, ZoomIn, Filter, Search, Image as ImageIcon, Layers, Hammer, ArrowLeft } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

export const GallerySection: React.FC = () => {
  const { albums, photos, openLightbox, getWhatsAppUrl } = useWorkshop();
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered photos
  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) => {
      const matchAlbum = selectedAlbumId === 'all' || photo.album_id === selectedAlbumId;
      const matchSearch =
        !searchQuery.trim() ||
        photo.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.alt_text.toLowerCase().includes(searchQuery.toLowerCase());
      return matchAlbum && matchSearch;
    });
  }, [photos, selectedAlbumId, searchQuery]);

  const activeAlbum = albums.find(a => a.id === selectedAlbumId);

  return (
    <section id="gallery" className="py-16 sm:py-24 border-b border-stone-200/80" style={{ backgroundColor: '#fefae0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs sm:text-sm font-bold mb-4 shadow-sm">
            <ImageIcon className="w-4 h-4 text-amber-700" />
            <span>معرض أعمالنا الحية</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight mb-4">
            إتقان هندسي ولمسات فنية في كل تفصيل
          </h2>
          <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-medium">
            استعرض ألبومات أعمالنا الخمسة المصنفة بين الألمنيوم والحدادة الإفرنجية. يمكنك الضغط على أي صورة لتكبيرها، أو مراسلتنا مباشرة للاستفسار عن نفس الموديل.
          </p>
        </div>

        {/* Album Overview Cards (5 Albums) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-10">
          <button
            onClick={() => setSelectedAlbumId('all')}
            className={`p-3.5 rounded-xl border text-right transition-all duration-200 flex flex-col justify-between ${
              selectedAlbumId === 'all'
                ? 'bg-stone-900 border-stone-950 text-white shadow-md'
                : 'bg-white border-stone-200 text-stone-800 hover:border-amber-400 hover:bg-stone-50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-mono font-bold ${selectedAlbumId === 'all' ? 'text-amber-400' : 'text-stone-500'}`}>الكل</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${selectedAlbumId === 'all' ? 'bg-stone-800 text-amber-300' : 'bg-stone-100 text-stone-700'}`}>
                {photos.length} صورة
              </span>
            </div>
            <div className="font-bold text-sm">جميع الألبومات والأعمال</div>
          </button>

          {albums.map((album) => {
            const albumPhotosCount = photos.filter(p => p.album_id === album.id).length;
            const isSelected = selectedAlbumId === album.id;
            const isAluminum = album.section === 'aluminum';

            return (
              <button
                key={album.id}
                onClick={() => setSelectedAlbumId(album.id)}
                className={`p-3.5 rounded-xl border text-right transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-stone-900 border-stone-950 text-white shadow-md'
                    : 'bg-white border-stone-200 text-stone-800 hover:border-amber-400 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[11px] font-bold flex items-center gap-1 ${isSelected ? 'text-amber-400' : 'text-stone-500'}`}>
                    {isAluminum ? <Layers className="w-3 h-3" /> : <Hammer className="w-3 h-3" />}
                    <span>{isAluminum ? 'ألمنيوم' : 'حدادة'}</span>
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${isSelected ? 'bg-stone-800 text-amber-300' : 'bg-stone-100 text-stone-700'}`}>
                    {albumPhotosCount}
                  </span>
                </div>
                <div className="font-bold text-xs sm:text-sm line-clamp-2">{album.title_ar}</div>
              </button>
            );
          })}
        </div>

        {/* Active Album Description & Search Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-right w-full md:w-auto">
            {activeAlbum ? (
              <div>
                <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                  <span>{activeAlbum.title_ar}</span>
                  <span className="text-xs font-bold text-amber-700">
                    ({activeAlbum.section === 'aluminum' ? 'قسم الألمنيوم' : 'قسم الحدادة الإفرنجية'})
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">{activeAlbum.description}</p>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-bold text-stone-900">استعراض كافة الصور والتصاميم</h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">تصفح {filteredPhotos.length} تصميماً منفذاً بأعلى دقة</p>
              </div>
            )}
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن: شباك، مطبخ، بوابة..."
              className="w-full bg-stone-50 border border-stone-200 rounded-xl pr-10 pl-4 py-2.5 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-500 transition shadow-inner"
            />
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredPhotos.length === 0 ? (
          <div className="text-center py-16 bg-white/80 rounded-2xl border border-dashed border-stone-300">
            <p className="text-stone-600 text-sm">لا توجد صور مطابقة لبحثك الحالي.</p>
            <button
              onClick={() => {
                setSelectedAlbumId('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-amber-700 hover:underline font-bold"
            >
              عرض جميع الصور
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo) => {
              const album = albums.find(a => a.id === photo.album_id);
              const isAluminum = photo.category === 'aluminum';

              return (
                <div
                  key={photo.id}
                  className="group relative bg-white rounded-2xl border border-stone-200 hover:border-amber-400/80 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {/* Image Container with Hover Overlay */}
                  <div
                    onClick={() => openLightbox(photo)}
                    className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-900 cursor-pointer"
                  >
                    <img
                      src={photo.path}
                      alt={photo.alt_text || photo.caption}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                      <div className="w-12 h-12 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300 font-bold">
                        <ZoomIn className="w-6 h-6 text-stone-950" />
                      </div>
                    </div>

                    {/* Badge */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-[#1c1917]/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-stone-700 text-[11px] font-bold text-white">
                      <span className={isAluminum ? 'text-cyan-300' : 'text-amber-400'}>
                        {isAluminum ? 'ألمنيوم' : 'حدادة'}
                      </span>
                      <span className="text-white/40">•</span>
                      <span className="truncate max-w-[120px]">{album?.title_ar}</span>
                    </div>
                  </div>

                  {/* Photo details & direct WhatsApp quote button */}
                  <div className="p-4 flex-1 flex flex-col justify-between bg-white">
                    <p className="text-stone-800 text-xs sm:text-sm font-bold leading-snug line-clamp-2 mb-3">
                      {photo.caption}
                    </p>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => openLightbox(photo)}
                        className="text-xs font-bold text-stone-600 hover:text-stone-900 transition flex items-center gap-1"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                        <span>تكبير الصورة</span>
                      </button>

                      <a
                        href={getWhatsAppUrl(`مرحباً معلم زكريا، أود الاستفسار عن تفصيل مثل هذا العمل (${photo.caption}) المعروض في موقعكم.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 px-3.5 py-1.5 rounded-lg shadow-sm transition"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
                        <span>طلب تسعيرة</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
