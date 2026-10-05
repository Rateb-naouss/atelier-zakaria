import React, { useState } from 'react';
import { useWorkshop } from '../context/WorkshopContext';
import { X } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

export const FloatingWhatsApp: React.FC = () => {
  const { getWhatsAppUrl, settings } = useWorkshop();
  const [showTooltip, setShowTooltip] = useState(true);

  const url = getWhatsAppUrl('مرحباً معلم زكريا، أريد الاستفسار عن خدمات وأسعار ورشة الحدادة والألمنيوم.');

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center gap-3" dir="rtl">
      {/* Tooltip Popup */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-stone-900 text-stone-100 text-xs py-2 px-3.5 rounded-2xl border border-stone-700 shadow-2xl animate-bounce">
          <div className="flex flex-col">
            <span className="font-bold text-emerald-400">تواصل فوري مع المعلم زكريا</span>
            <span className="text-[11px] text-stone-400">واتساب: 96171206898</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-stone-500 hover:text-stone-300 p-0.5 rounded-full"
            aria-label="إغلاق التلميح"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-white flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all duration-300"
        aria-label="محادثة واتساب سريعة مع المعلم زكريا جواد"
        title="محادثة واتساب سريعة"
      >
        {/* Pulsing ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/40 animate-ping pointer-events-none opacity-75"></span>

        <WhatsAppIcon className="w-7 h-7 text-white relative z-10" />
      </a>
    </div>
  );
};
