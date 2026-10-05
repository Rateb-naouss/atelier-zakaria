import React from 'react';
import { useWorkshop } from '../context/WorkshopContext';
import { Award, CheckCircle2, Hammer, ShieldCheck, UserCheck } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

export const AboutSection: React.FC = () => {
  const { settings, getWhatsAppUrl, setCurrentView } = useWorkshop();

  return (
    <section id="about" className="py-16 sm:py-24 border-b border-stone-200/80" style={{ backgroundColor: '#fefae0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Image & Craftsmanship Vignette */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-2xl overflow-hidden border-2 border-stone-700 shadow-2xl bg-stone-900 group">
                <img
                  src="https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80"
                  alt="المعلم زكريا جواد في المشغل"
                  className="w-full h-[420px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
                
                <div className="absolute bottom-6 right-6 left-6 p-4 rounded-xl bg-stone-900/90 backdrop-blur-md border border-stone-700 text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center font-black text-xl shrink-0">
                      <Hammer className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">{settings.owner_name}</h4>
                      <p className="text-xs text-amber-400">معلم حدادة افرنجية وألمنيوم معماري</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Experience Badge */}
              <div className="absolute -top-4 -left-4 bg-gradient-to-br from-amber-400 to-amber-600 text-stone-950 font-black p-4 rounded-2xl shadow-xl flex flex-col items-center justify-center w-24 h-24 border-2 border-white">
                <span className="text-2xl leading-none font-black">+20</span>
                <span className="text-[11px] font-bold mt-1 text-center">عاماً من الخبرة</span>
              </div>
            </div>
          </div>

          {/* Text Story & Values */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold mb-4">
              <UserCheck className="w-4 h-4 text-amber-700" />
              <span>من نحن • مشغل المعلم زكريا جواد</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight mb-6">
              حرفة أصيلة تُبنى على الثقة،
              <span className="text-amber-700 block mt-1">ودقة متناهية تدوم لسنوات طويلة</span>
            </h2>

            <p className="text-stone-700 text-base sm:text-lg leading-relaxed mb-6 font-normal">
              تأسس مشغلنا على يد <strong className="text-stone-950 font-bold">المعلم زكريا جواد</strong> كوجهة رائدة في لبنان تجمع بين
              عراقة الحدادة الإفرنجية اليدوية وتطور الهندسة المعمارية الحديثة للألمنيوم. نؤمن بأن كل باب أو شباك أو درابزين ليس مجرد قطعة معدنية، بل هو أمان لمنزلك وعنوان لجماله وأناقته.
            </p>

            <blockquote className="p-4 my-6 border-r-4 border-amber-500 bg-amber-50/80 rounded-l-xl text-stone-800 text-sm sm:text-base italic border border-amber-200/60">
              "السمعة الطيبة ورضا الزبون هما رأس مالنا الحقيقي، والقطعة التي نركبها في منزلك نعتبرها توقيعاً لاسمنا، لذلك لا نتهاون في سماكة، أو تفصيل، أو موعد تسليم."
              <span className="block text-amber-700 font-bold text-xs mt-2 not-italic">— المعلم زكريا جواد</span>
            </blockquote>

            {/* Core craft values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-stone-900 text-sm">دقة متناهية في المواعيد</h5>
                  <p className="text-xs text-stone-600 mt-0.5">جدول زمني محدد وتثبيت يوم وساعة التركيب بدقة تامة.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-stone-900 text-sm">ألمنيوم ومقاطع أصلية معتمدة</h5>
                  <p className="text-xs text-stone-600 mt-0.5">نستخدم أفضل مقاطع السيدم والتكنال والزجاج المزدوج العازل.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-stone-900 text-sm">حدادة إفرنجية وليزر CNC</h5>
                  <p className="text-xs text-stone-600 mt-0.5">تطويع يدوي للحديد المشغول وقص ليزر عالي الدقة بدون أي تعرجات.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-stone-900 text-sm">كفالة ومتابعة بعد التركيب</h5>
                  <p className="text-xs text-stone-600 mt-0.5">خدمة ما بعد البيع وصيانة فورية متى احتجتم إلينا.</p>
                </div>
              </div>
            </div>

            {/* Direct buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={getWhatsAppUrl('مرحباً معلم زكريا، قرأت نبذة عن المشغل وأود التواصل معك للاتفاق على عمل.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-md transition"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>تواصل مع المعلم زكريا مباشرة</span>
              </a>

              <a
                href={getWhatsAppUrl('مرحباً معلم زكريا، أود طلب موعد معاينة وأخذ قياسات في منزلي أو مشروعي.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-amber-400 font-bold text-sm px-5 py-3 rounded-xl shadow-md transition"
              >
                <WhatsAppIcon className="w-4 h-4 text-amber-400" />
                <span>طلب موعد معاينة وأخذ قياسات</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
