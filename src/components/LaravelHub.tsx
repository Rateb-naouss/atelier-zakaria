import React, { useState } from 'react';
import { useWorkshop } from '../context/WorkshopContext';
import { laravelFiles, LaravelFile } from '../data/laravelCodebase';
import {
  Code2,
  FileCode,
  Copy,
  Check,
  Download,
  ArrowRight,
  FolderTree,
  Terminal,
  ShieldCheck,
  ExternalLink,
  BookOpen,
  Layers,
  Database
} from 'lucide-react';

export const LaravelHub: React.FC = () => {
  const { setCurrentView } = useWorkshop();
  const [selectedFile, setSelectedFile] = useState<LaravelFile>(laravelFiles[0]);
  const [copied, setCopied] = useState(false);

  const categories = [
    { id: 'all', label: 'كافة الملفات' },
    { id: 'config', label: 'التثبيت والإعداد' },
    { id: 'routes', label: 'المسارات (Routes)' },
    { id: 'models', label: 'النماذج (Models)' },
    { id: 'controllers', label: 'المتحكمات (Controllers)' },
    { id: 'migrations', label: 'التهجيرات (Migrations)' },
    { id: 'seeders', label: 'تغذية البيانات (Seeders)' },
    { id: 'views', label: 'قوالب العرض (Blade Views)' },
    { id: 'support', label: 'المساعدات (Support)' },
  ];

  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredFiles = laravelFiles.filter(
    f => activeCategory === 'all' || f.category === activeCategory
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([selectedFile.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = selectedFile.path.split('/').pop() || 'file.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 p-4 sm:p-8" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-stone-900 border border-stone-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-600/20 text-red-500 border border-red-600/40 flex items-center justify-center font-bold">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white">
                  حزمة مشروع Laravel 11 + Filament v3
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-red-950/60 border border-red-700/50 text-red-400 font-mono text-xs font-bold">
                  PHP 8.2+
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-400 mt-1">
                استعراض وتنزيل كافة ملفات المشروع: الموديلات، التهجيرات، المتحكمات، قوالب Blade، ودليل التثبيت.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة للموقع الحي</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('admin');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition"
            >
              <span>لوحة تحكم Filament</span>
            </button>
          </div>
        </div>

        {/* Quick Credentials Callout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 flex items-center gap-3">
            <Terminal className="w-5 h-5 text-amber-500 shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-white block">أمر التشغيل المباشر:</span>
              <code className="text-stone-300 font-mono">php artisan migrate --seed</code>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-white block">حساب الإدارة (Filament):</span>
              <span className="text-stone-300 font-mono">admin@zakaria-workshop.com</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 flex items-center gap-3">
            <Database className="w-5 h-5 text-blue-500 shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-white block">كلمة مرور التجربة:</span>
              <span className="text-stone-300 font-mono">password123</span>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                activeCategory === cat.id
                  ? 'bg-amber-500 text-stone-950 font-bold'
                  : 'bg-stone-900 text-stone-300 hover:bg-stone-800 hover:text-white border border-stone-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Main Code Viewer Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* File Tree List */}
          <div className="lg:col-span-4 bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-3.5 bg-stone-950 border-b border-stone-800 flex items-center justify-between text-xs font-bold text-stone-300">
              <span className="flex items-center gap-2">
                <FolderTree className="w-4 h-4 text-amber-500" />
                <span>شجرة ملفات المشروع ({filteredFiles.length})</span>
              </span>
            </div>

            <div className="p-2 space-y-1 max-h-[600px] overflow-y-auto">
              {filteredFiles.map((file) => {
                const isSelected = selectedFile.path === file.path;
                return (
                  <button
                    key={file.path}
                    onClick={() => setSelectedFile(file)}
                    className={`w-full text-right p-3 rounded-xl transition flex flex-col gap-1 ${
                      isSelected
                        ? 'bg-amber-500/15 border border-amber-500 text-white'
                        : 'hover:bg-stone-800 text-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-mono text-xs font-bold text-amber-400 truncate max-w-[220px]" dir="ltr">
                        {file.path}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-800 text-stone-400 uppercase">
                        {file.category}
                      </span>
                    </div>
                    <span className="text-[11px] text-stone-400 line-clamp-1">{file.description}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active File Content Viewer */}
          <div className="lg:col-span-8 bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-xl flex flex-col">
            {/* Top Toolbar */}
            <div className="p-4 bg-stone-950 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="font-mono text-sm font-bold text-white flex items-center gap-2" dir="ltr">
                  <FileCode className="w-4 h-4 text-amber-500" />
                  <span>{selectedFile.path}</span>
                </div>
                <p className="text-xs text-stone-400 mt-0.5">{selectedFile.description}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">تم النسخ!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>نسخ الكود</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleDownloadFile}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>تنزيل الملف</span>
                </button>
              </div>
            </div>

            {/* Code Block */}
            <div className="p-4 bg-stone-950/90 overflow-x-auto max-h-[580px] overflow-y-auto">
              <pre className="font-mono text-xs sm:text-sm text-stone-200 leading-relaxed text-left" dir="ltr">
                <code>{selectedFile.content}</code>
              </pre>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
