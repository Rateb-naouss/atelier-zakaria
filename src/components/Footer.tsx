import React from 'react';
import { useWorkshop } from '../context/WorkshopContext';
import { Hammer, MapPin, Settings, Code2 } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

export const Footer: React.FC = () => {
  const { settings, setCurrentView, getWhatsAppUrl } = useWorkshop();

  return (
    <footer className="bg-[#1c1917] text-stone-300 border-t-2 border-stone-800">
      {/* Upper footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center border border-amber-400/30">
                <Hammer className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-white text-base leading-tight">
                  {settings.site_name}
                </h3>
                <p className="text-xs text-amber-400 font-medium mt-0.5">
                  بإشراف {settings.owner_name}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              مشغل متخصص في تنفيذ أرقى أعمال الحدادة الإفرنجية المشغولة يدوياً وتصاميم الليزر CNC، وكافة تفصيلات الألمنيوم المعماري الحديث والزجاج المزدوج.
            </p>

            <div className="text-xs font-semibold text-amber-400 pt-1">
              {settings.site_tagline}
            </div>
          </div>

          {/* Col 2: Services Quick links */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4 border-b border-stone-800 pb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              خدماتنا المتخصصة
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-300">
              <li>
                <button
                  onClick={() => {
                    setCurrentView('gallery');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition"
                >
                  أبواب وشبابيك ألمنيوم (سحاب ومفصل)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('gallery');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition"
                >
                  مطابخ ألمنيوم عصرية ومقاومة للرطوبة
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('gallery');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition"
                >
                  واجهات زجاجية وتسكير شرفات
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('gallery');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition"
                >
                  أبواب وحمايات حدادة إفرنجية
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('gallery');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition"
                >
                  بوابات قص ليزر ودرابزين سلالم
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4 border-b border-stone-800 pb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              روابط الموقع
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-300">
              <li>
                <button
                  onClick={() => {
                    setCurrentView('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition"
                >
                  الصفحة الرئيسية
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition"
                >
                  عن المعلم زكريا جواد
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition"
                >
                  أقسام الألمنيوم والحدادة
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('gallery');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition"
                >
                  معرض الصور والألبومات (5 ألبومات)
                </button>
              </li>
              <li>
                <a
                  href={getWhatsAppUrl('مرحباً معلم زكريا، أريد طلب معاينة وتفصيل أعمال حدادة وألمنيوم.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 text-emerald-400 font-bold transition flex items-center gap-1.5"
                >
                  <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                  <span>تواصل مباشر عبر واتساب</span>
                </a>
              </li>
              <li className="pt-1">
                <button
                  onClick={() => {
                    setCurrentView('admin');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>لوحة التحكم (Filament Admin)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm mb-4 border-b border-stone-800 pb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              معلومات الاتصال المباشر
            </h4>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-xs sm:text-sm text-emerald-400 hover:text-emerald-300 font-bold"
            >
              <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
              <span>واتساب: 96171206898</span>
            </a>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-300 hover:text-white"
              dir="ltr"
            >
              <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
              <span>+961 71 206 898</span>
            </a>

            <div className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-400">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>لبنان — تنفيذ وتركيب بكافة المناطق</span>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setCurrentView('laravel-hub');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full text-center py-2 px-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700 text-xs font-mono transition"
              >
                📁 استعراض كود مشروع Laravel 11
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom copyright line */}
      <div className="border-t border-stone-800 bg-[#141210] py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-400 text-center md:text-right">
          <div>
            جميع الحقوق محفوظة © {new Date().getFullYear()}
          </div>

          <div
            className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs text-stone-400 bg-stone-900/60 px-3 py-1 rounded-full border border-stone-800/80"
            dir="ltr"
          >
            <Code2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>
              developed by <span className="font-semibold text-stone-300">CodeCraft Studio</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
