import React from 'react';
import { Clock, Award, ShieldCheck, Sparkles } from 'lucide-react';

export const WhyUsSection: React.FC = () => {
  const pillars = [
    {
      id: 1,
      title: 'دقة في المواعيد',
      subtitle: 'احترام وقت العميل والتزام صارم بجدول التنفيذ',
      description: 'ندرك أن وقتكم ومشاريعكم لا تحتمل التأخير. يلتزم المعلم زكريا جواد بالموعد المتفق عليه بالساعة واليوم لأخذ القياسات، وتاريخ التسليم والتركيب النهائي دون أي مماطلة.',
      icon: Clock,
      highlight: 'التزام بنسبة 100% بالمواعيد',
    },
    {
      id: 2,
      title: 'عمل متقن إبداعي',
      subtitle: 'خبرة عريقة في الحدادة الإفرنجية وأحدث تقنيات الألمنيوم',
      description: 'نعتمد أفضل سماكات الألمنيوم الأصلية والزجاج المزدوج العازل، وتطويع الحديد المشغول يدوياً بدقة هندسية راقية مع تقنيات قص الليزر CNC ودهان أساس مضاد للصدأ يدوم لسنوات.',
      icon: Award,
      highlight: 'سماكات معتمدة وتشطيب أوروبي',
    },
    {
      id: 3,
      title: 'كفالة ومتابعة بعد التركيب',
      subtitle: 'نرافقكم بضمان حقيقي وخدمة صيانة مستمرة',
      description: 'لا تنتهي علاقتنا بالزبون بانتهاء التركيب؛ بل نمنحكم كفالة رسمية على متانة العمل، ونظام العزل، والأقفال والمفصلات مع جاهزية تامة لأي تعديل أو صيانة دورية فورية.',
      icon: ShieldCheck,
      highlight: 'ضمان ومتابعة دورية مستمرة',
    },
  ];

  return (
    <section className="py-16 sm:py-24 border-b border-stone-200/80" style={{ backgroundColor: '#fefae0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs sm:text-sm font-bold mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span>قيمنا ومبادئنا</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight mb-4">
            لماذا تختار مشغل المعلم زكريا جواد؟
          </h2>
          <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-medium">
            ثلاث ركائز أساسية نبني عليها كل مشروع ننجزه، لنضمن لكم راحة البال وأعلى مستويات الفخامة والأمان.
          </p>
        </div>

        {/* 3 Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="group relative bg-white p-8 rounded-2xl border border-stone-200 hover:border-amber-400/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon Circle */}
                  <div className="w-16 h-16 rounded-2xl bg-amber-100 border border-amber-300/80 flex items-center justify-center text-amber-800 mb-6 group-hover:scale-110 group-hover:bg-stone-900 group-hover:text-amber-400 transition-all duration-300 shadow-sm">
                    <Icon className="w-8 h-8" />
                  </div>

                  <span className="text-xs font-bold text-amber-700 block mb-2">{pillar.highlight}</span>
                  <h3 className="text-2xl font-black text-stone-900 mb-2 group-hover:text-amber-700 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-bold text-stone-500 mb-4">
                    {pillar.subtitle}
                  </p>
                  <p className="text-sm text-stone-600 leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <span className="font-semibold text-stone-700">المعلم زكريا جواد</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">كفالة أكيدة</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
