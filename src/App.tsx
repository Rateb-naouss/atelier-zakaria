import React from 'react';
import { WorkshopProvider, useWorkshop } from './context/WorkshopContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { GallerySection } from './components/GallerySection';
import { WhyUsSection } from './components/WhyUsSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { LightboxModal } from './components/LightboxModal';
import { AdminPanel } from './components/AdminPanel';
import { LaravelHub } from './components/LaravelHub';

const MainContent: React.FC = () => {
  const { currentView } = useWorkshop();

  if (currentView === 'admin') {
    return <AdminPanel />;
  }

  if (currentView === 'laravel-hub') {
    return <LaravelHub />;
  }

  return (
    <div 
      className="min-h-screen flex flex-col selection:bg-amber-300 selection:text-stone-900 font-sans"
      style={{ backgroundColor: '#fefae0' }}
    >
      <Header />

      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <Hero />
            <ServicesSection />
            <GallerySection />
            <WhyUsSection />
            <AboutSection />
          </>
        )}

        {currentView === 'services' && (
          <div className="pt-4">
            <ServicesSection />
            <GallerySection />
          </div>
        )}

        {currentView === 'gallery' && (
          <div className="pt-4">
            <GallerySection />
          </div>
        )}

        {currentView === 'about' && (
          <div className="pt-4">
            <AboutSection />
            <WhyUsSection />
          </div>
        )}
      </main>

      <Footer />
      <FloatingWhatsApp />
      <LightboxModal />
    </div>
  );
};

export default function App() {
  return (
    <WorkshopProvider>
      <MainContent />
    </WorkshopProvider>
  );
}

