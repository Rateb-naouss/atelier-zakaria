import React, { useEffect } from 'react';
import { useWorkshop } from '../context/WorkshopContext';
import { X, ChevronRight, ChevronLeft, ExternalLink } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

export const LightboxModal: React.FC = () => {
  const { lightboxPhoto, closeLightbox, nextPhoto, prevPhoto, albums, getWhatsAppUrl } = useWorkshop();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxPhoto) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto(); // RTL: next is right or left
      if (e.key === 'ArrowLeft') prevPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxPhoto, closeLightbox, nextPhoto, prevPhoto]);

  if (!lightboxPhoto) return null;

  const album = albums.find(a => a.id === lightboxPhoto.album_id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 animate-fadeIn">
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={closeLightbox} />

      {/* Main Lightbox Box */}
      <div className="relative z-10 max-w-5xl w-full bg-stone-950 rounded-2xl border border-stone-800 overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between p-4 border-b border-stone-800 bg-stone-900/80">
          <div>
            <span className="text-xs text-amber-400 font-bold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
              {album?.title_ar || 'معرض الأعمال'}
            </span>
            <span className="text-stone-400 text-xs mr-2">
              {lightboxPhoto.category === 'aluminum' ? 'ألمنيوم معماري' : 'حدادة إفرنجية'}
            </span>
          </div>

          <button
            onClick={closeLightbox}
            className="p-2 rounded-xl bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 transition"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image Display Area with Nav Controls */}
        <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[350px] sm:min-h-[500px]">
          <img
            src={lightboxPhoto.path}
            alt={lightboxPhoto.alt_text || lightboxPhoto.caption}
            className="max-h-[65vh] w-auto max-w-full object-contain mx-auto"
            referrerPolicy="no-referrer"
          />

          {/* Prev / Next controls */}
          <button
            onClick={prevPhoto}
            className="absolute right-4 p-3 rounded-full bg-stone-900/80 text-white hover:bg-amber-500 hover:text-stone-950 transition-all border border-stone-700 shadow-lg"
            aria-label="الصورة السابقة"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <button
            onClick={nextPhoto}
            className="absolute left-4 p-3 rounded-full bg-stone-900/80 text-white hover:bg-amber-500 hover:text-stone-950 transition-all border border-stone-700 shadow-lg"
            aria-label="الصورة التالية"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>

        {/* Bottom Details & Direct WhatsApp CTA */}
        <div className="p-4 sm:p-6 bg-stone-900 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-right w-full sm:w-auto">
            <h4 className="text-sm sm:text-base font-bold text-white mb-1">
              {lightboxPhoto.caption}
            </h4>
            <p className="text-xs text-stone-400">
              كفالة بعد التركيب ودقة تامة في المقاسات والمواعيد
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <a
              href={getWhatsAppUrl(`مرحباً معلم زكريا، أرغب بالاستفسار عن تفصيل مثل هذا العمل (${lightboxPhoto.caption})، هل يمكن معرفة السعر والمقاسات؟`)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow transition"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>اطلب تسعيرة هذا العمل عبر واتساب</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
