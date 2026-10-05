import React from 'react';
import { useWorkshop } from '../context/WorkshopContext';
import { ArrowLeft, ShieldCheck, Clock, Award, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

export const Hero: React.FC = () => {
  const { settings, setCurrentView, getWhatsAppUrl } = useWorkshop();

  return (
    <section className="relative overflow-hidden bg-[#1c1917] border-b-2 border-stone-800">
      {/* Background imagery with warm metallic charcoal gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1920&q=80"
          alt="مشغل حدادة وألمنيوم"
          className="w-full h-full object-cover object-center opacity-25 scale-105 transform hover:scale-100 transition-transform duration-10000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917] via-[#1c1917]/90 to-[#1c1917]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-16 sm:pb-24">
        <div className="max-w-3xl">
          {/* Subtle badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>الحرفة اللبنانية الأصيلة • جودة تدوم لأجيال</span>
          </div>

          {/* Main heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-4">
            {settings.site_name}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 mt-2">
              بإشراف {settings.owner_name}
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-lg sm:text-2xl font-bold text-stone-200 mb-6 flex flex-wrap items-center gap-2">
            <span className="text-amber-400">دقة في المواعيد</span>
            <span className="text-stone-600">•</span>
            <span className="text-amber-300">عمل متقن إبداعي</span>
            <span className="text-stone-600">•</span>
            <span className="text-amber-400">كفالة بعد التركيب</span>
          </p>

          <p className="text-base sm:text-lg text-stone-300 leading-relaxed mb-8 max-w-2xl font-normal">
            تنفيذ كافة أعمال الألمنيوم المعماري والحديث (أبواب، شبابيك، مطابخ، واجهات زجاجية)
            وأعمال الحدادة الإفرنجية المشغولة يدوياً وتصاميم الليزر CNC بأعلى معايير المتانة والجمال في كافة أرجاء لبنان.
          </p>

          {/* CTAs with WhatsApp icon */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-12">
            <a
              href={getWhatsAppUrl('مرحباً معلم زكريا، أريد الاستفسار عن تفصيل وتركيب أعمال حدادة وألمنيوم وأخذ قياسات.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-white font-bold text-base px-6 py-4 rounded-xl shadow-xl shadow-emerald-500/25 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="w-5 h-5 text-white" />
              <span>تواصل واتساب مباشرة</span>
            </a>

            <button
              onClick={() => {
                setCurrentView('gallery');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-stone-100 border border-stone-700 hover:border-amber-500/50 font-bold text-base px-6 py-4 rounded-xl transition-all duration-200 group"
            >
              <span>استعرض معرض الأعمال (5 ألبومات)</span>
              <ArrowLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-1 transition-transform" />
            </button>

            <a
              href={getWhatsAppUrl('مرحباً معلم زكريا، أود الاستفسار عن تفصيل أعمال حدادة وألمنيوم.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-stone-900/90 hover:bg-stone-800 text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 font-semibold text-sm px-4 py-3 rounded-xl transition"
            >
              <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
              <span dir="ltr">واتساب: +961 71 206 898</span>
            </a>
          </div>

          {/* 3 Core Value Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-stone-800">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-900/80 border border-stone-800">
              <div className="w-10 h-10 rounded-lg bg-amber-400/20 flex items-center justify-center text-amber-300 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">دقة في المواعيد</h4>
                <p className="text-xs text-stone-400">التزام حازم بيوم وساعة التسليم</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-900/80 border border-stone-800">
              <div className="w-10 h-10 rounded-lg bg-amber-400/20 flex items-center justify-center text-amber-300 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">عمل متقن إبداعي</h4>
                <p className="text-xs text-stone-400">سماكات أصلية وتشطيب هندسي</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-900/80 border border-stone-800">
              <div className="w-10 h-10 rounded-lg bg-amber-400/20 flex items-center justify-center text-amber-300 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">كفالة بعد التركيب</h4>
                <p className="text-xs text-stone-400">ضمان حقيقي ومتابعة وصيانة</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
