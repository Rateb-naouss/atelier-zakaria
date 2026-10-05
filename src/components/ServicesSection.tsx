import React from 'react';
import { useWorkshop } from '../context/WorkshopContext';
import { Layers, Hammer, ArrowLeft, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

export const ServicesSection: React.FC = () => {
  const { services, setCurrentView, setSelectedAlbumSlug, getWhatsAppUrl } = useWorkshop();

  return (
    <section id="services" className="py-16 sm:py-24 border-b border-stone-200/80" style={{ backgroundColor: '#fefae0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs sm:text-sm font-bold mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span>خدماتنا المتخصصة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight mb-4">
            قسمان رئيسيان بخبرة هندسية وفنية عالية
          </h2>
          <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-medium">
            نجمع تحت سقف مشغلنا بين دقة وحداثة تصاميم الألمنيوم المعماري، وأصالة وقوة فن الحدادة الإفرنجية المشغولة يدوياً وتصاميم الليزر الحديثة.
          </p>
        </div>

        {/* 2 Main Service Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {services.map((service) => {
            const isAluminum = service.slug === 'aluminum';
            const Icon = isAluminum ? Layers : Hammer;

            return (
              <div
                key={service.id}
                className="group relative bg-white rounded-2xl border border-stone-200 hover:border-amber-400/80 shadow-lg overflow-hidden transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Image Banner with Overlay */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-900">
                  <img
                    src={service.cover_image}
                    alt={service.title_ar}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917] via-[#1c1917]/40 to-transparent" />

                  {/* Service Icon Badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-2 bg-[#1c1917]/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-stone-700 text-amber-400">
                    <Icon className="w-5 h-5 text-amber-400" />
                    <span className="text-xs font-bold text-white tracking-wide">
                      {isAluminum ? 'قسم الألمنيوم' : 'قسم الحدادة'}
                    </span>
                  </div>

                  {/* Title on bottom of image */}
                  <div className="absolute bottom-4 right-4 left-4">
                    <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-amber-400 transition-colors">
                      {service.title_ar}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-300 font-medium tracking-wider mt-1 opacity-90">
                      {service.title_en}
                    </p>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                      {service.long_description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-2.5 mb-8">
                      {service.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 text-stone-800 font-medium text-sm">
                          <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => {
                        setSelectedAlbumSlug(isAluminum ? 'aluminum-doors-windows' : 'iron-doors-windows');
                        setCurrentView('gallery');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-amber-400 font-bold text-sm py-3 px-4 rounded-xl shadow transition"
                    >
                      <span>تصفح ألبومات {isAluminum ? 'الألمنيوم' : 'الحدادة'}</span>
                      <ArrowLeft className="w-4 h-4" />
                    </button>

                    <a
                      href={getWhatsAppUrl(`مرحباً معلم زكريا، أود الاستفسار عن تفاصيل وأسعار ${service.title_ar}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm py-3 px-4 rounded-xl shadow transition"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-white" />
                      <span>طلب عرض سعر</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner CTA */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#1c1917] border border-stone-800 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-400/30">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-black text-white">هل تحتاج عملاً مشتركاً بين الحدادة والألمنيوم؟</h4>
              <p className="text-xs sm:text-sm text-stone-300 mt-1">
                ننفذ تصاميم مدمجة متكاملة كالأبواب الخارجية المصفحة مع زجاج عاكس، أو بوابات قص ليزر مع إطارات معزولة.
              </p>
            </div>
          </div>
          <a
            href={getWhatsAppUrl('مرحباً معلم زكريا، لدي مشروع يحتاج عملاً مشتركاً بين الألمنيوم والحدادة وأريد استشارتك.')}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg transition flex items-center gap-2"
          >
            <WhatsAppIcon className="w-4 h-4 text-white" />
            <span>استشر المعلم زكريا مباشرة</span>
          </a>
        </div>

      </div>
    </section>
  );
};
