import React, { useState } from 'react';
import { useWorkshop } from '../context/WorkshopContext';
import { Phone, Clock, MapPin, Send, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

export const ContactSection: React.FC = () => {
  const { settings, submitMessage, getWhatsAppUrl } = useWorkshop();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'طلب عرض سعر واستشارة',
    message: '',
    honeypot: '', // anti-bot
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = 'يرجى إدخال الاسم الكريم';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'يرجى إدخال رقم الهاتف أو الواتساب للتواصل';
    } else if (formData.phone.replace(/\D/g, '').length < 7) {
      errs.phone = 'يرجى إدخال رقم هاتف صحيح';
    }
    if (!formData.message.trim()) {
      errs.message = 'يرجى كتابة تفاصيل العمل المطلوب أو الاستفسار';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return; // bot detected
    if (!validate()) return;

    submitMessage({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    });

    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-stone-900/60 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-bold mb-4">
            <Sparkles className="w-4 h-4" />
            <span>جاهزون لخدمتكم فوراً</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            تواصل مع المعلم زكريا جواد
          </h2>
          <p className="text-base sm:text-lg text-stone-300 leading-relaxed">
            يسعدنا استقبال استفساراتكم، وتحديد مواعيد المعاينة المجانية وأخذ القياسات الدقيقة في موقع مشروعكم أو منزلكم.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Contact Details & Direct Actions (Left in LTR, Right in RTL) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct WhatsApp Callout */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-stone-900 border border-emerald-500/40 shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                  <WhatsAppIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">التواصل الفوري عبر واتساب</h3>
                  <p className="text-xs text-emerald-300">الرد سريع ومباشر من المعلم زكريا</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-stone-300 mb-5 leading-relaxed">
                أرسل لنا صور المكان، أو المقاسات المبدئية، أو أي تصميم ترغب بتنفيذه لنعطيك الرأي الفني والتكلفة التقريبية.
              </p>
              <a
                href={getWhatsAppUrl('مرحباً معلم زكريا، أود الاستفسار عن تفصيل أعمال حدادة وألمنيوم.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm py-3.5 px-4 rounded-xl shadow-lg transition duration-200"
              >
                <WhatsAppIcon className="w-5 h-5 text-white" />
                <span>محادثة واتساب سريعة (+961 71 206 898)</span>
              </a>
            </div>

            {/* Information Cards */}
            <div className="p-6 rounded-2xl bg-stone-900/90 border border-stone-800 shadow-xl space-y-6">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-400">الاتصال الهاتفي المباشر</h4>
                  <a
                    href={`tel:${settings.phone}`}
                    className="text-base sm:text-lg font-bold text-white hover:text-amber-400 transition"
                    dir="ltr"
                  >
                    +961 71 206 898
                  </a>
                  <p className="text-xs text-stone-400 mt-0.5">المعلم زكريا جواد</p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-400">ساعات العمل والورشة</h4>
                  <p className="text-sm font-bold text-white mt-0.5">9:00 صباحاً – 6:00 مساءً</p>
                  <p className="text-xs text-stone-400 mt-0.5">من الاثنين إلى السبت (الأحد عطلة أسبوعية)</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-400">مناطق الخدمة والتغطية</h4>
                  <p className="text-sm font-bold text-white mt-0.5">كافة الأراضي اللبنانية</p>
                  <p className="text-xs text-stone-400 mt-0.5">بيروت، جبل لبنان، الجنوب، الشمال، والبقاع</p>
                </div>
              </div>
            </div>

            {/* Interactive Map Visual Mockup */}
            <div className="rounded-2xl bg-stone-900 border border-stone-800 overflow-hidden shadow-lg">
              <div className="p-3 bg-stone-950 border-b border-stone-800 flex items-center justify-between text-xs text-stone-400">
                <span className="font-bold flex items-center gap-1.5 text-stone-200">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  موقع المشغل وتغطية الورش الميدانية
                </span>
                <span className="text-emerald-400 text-[11px] font-semibold">متاح للمعاينة الميدانية</span>
              </div>
              <div className="relative h-44 bg-stone-950 flex items-center justify-center p-4">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80"
                  alt="خريطة لبنان"
                  className="w-full h-full object-cover opacity-20"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-stone-950/70 backdrop-blur-[1px] flex flex-col items-center justify-center p-4 text-center">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mb-2 animate-bounce">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h5 className="text-xs sm:text-sm font-bold text-white">نصل إلى موقع مشروعكم</h5>
                  <p className="text-[11px] text-stone-400 max-w-xs mt-1">
                    فريق المشغل مجهّز لرفع القياسات في الورش والمنازل والفلل في مختلف المحافظات
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Contact Form (Right in LTR, Left in RTL) */}
          <div className="lg:col-span-7">
            <div className="bg-stone-900/90 rounded-2xl border border-stone-800 p-6 sm:p-8 shadow-2xl">
              <h3 className="text-2xl font-black text-white mb-2">
                أرسل رسالة أو استفساراً
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 mb-6">
                املأ النموذج وسيقوم المعلم زكريا بالرد عليك هاتفياً أو عبر واتساب بأسرع وقت.
              </p>

              {submitted ? (
                <div className="py-10 text-center animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">تم إرسال رسالتكم بنجاح!</h4>
                  <p className="text-stone-300 text-sm max-w-md mx-auto mb-6">
                    شكراً لتواصلك يا <strong className="text-amber-400">{formData.name}</strong>. تم تسجيل طلبك في نظام المشغل وسيتم التواصل معك على الرقم ({formData.phone}).
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <a
                      href={getWhatsAppUrl(`مرحباً معلم زكريا، قمت للتو بإرسال رسالة من موقعكم باسم (${formData.name}) بخصوص: ${formData.message}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-5 py-3 rounded-xl shadow transition"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-white" />
                      <span>متابعة الرسالة عبر واتساب الآن</span>
                    </a>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          phone: '',
                          email: '',
                          subject: 'طلب عرض سعر واستشارة',
                          message: '',
                          honeypot: '',
                        });
                      }}
                      className="px-4 py-3 rounded-xl bg-stone-800 text-stone-300 hover:text-white text-sm font-semibold transition"
                    >
                      إرسال رسالة أخرى
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot field (hidden from real users) */}
                  <input
                    type="text"
                    name="website_url_hp"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-300 mb-1.5">
                        الاسم الكريم <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: '' });
                        }}
                        placeholder="مثال: السيد كريم / المهندس علي"
                        className={`w-full bg-stone-950 border rounded-xl px-4 py-3 text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500 transition ${
                          errors.name ? 'border-red-500' : 'border-stone-800'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-300 mb-1.5">
                        رقم الهاتف / الواتساب <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: '' });
                        }}
                        placeholder="مثال: 71 206 898 أو 03 123 456"
                        dir="ltr"
                        className={`w-full bg-stone-950 border rounded-xl px-4 py-3 text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500 text-right transition ${
                          errors.phone ? 'border-red-500' : 'border-stone-800'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject & Optional Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-300 mb-1.5">
                        نوع الخدمة أو الاستفسار
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-stone-100 focus:outline-none focus:border-amber-500 transition"
                      >
                        <option value="طلب عرض سعر واستشارة">طلب عرض سعر واستشارة عامة</option>
                        <option value="قسم الألمنيوم (أبواب، شبابيك، واجهات)">قسم الألمنيوم (أبواب، شبابيك، واجهات)</option>
                        <option value="مطابخ وخزائن ألمنيوم">مطابخ وخزائن ألمنيوم</option>
                        <option value="قسم الحدادة الإفرنجية (بوابات، درابزين، ليزر)">قسم الحدادة الإفرنجية (بوابات، درابزين، ليزر)</option>
                        <option value="طلب موعد معاينة ورفع قياسات">طلب موعد معاينة ورفع قياسات</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-300 mb-1.5">
                        البريد الإلكتروني <span className="text-stone-500">(اختياري)</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="example@mail.com"
                        dir="ltr"
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500 text-right transition"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1.5">
                      تفاصيل الطلب أو العمل المراد تنفيذه <span className="text-amber-400">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: '' });
                      }}
                      placeholder="اذكر نوع العمل، المقاسات التقريبية، المنطقة، وأي تفاصيل ترغب بها..."
                      className={`w-full bg-stone-950 border rounded-xl px-4 py-3 text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500 transition resize-none ${
                        errors.message ? 'border-red-500' : 'border-stone-800'
                      }`}
                    ></textarea>
                    {errors.message && (
                      <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 active:from-amber-600 active:to-amber-700 text-stone-950 font-black text-base py-3.5 px-6 rounded-xl shadow-lg transition duration-200 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>إرسال الرسالة إلى المشغل</span>
                  </button>

                  <p className="text-center text-[11px] text-stone-500 pt-1">
                    🔒 معلوماتكم ورقم هاتفكم محمي ولا يتم مشاركته مع أي طرف ثالث.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
