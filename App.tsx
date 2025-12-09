import React, { useState, useEffect } from 'react';
import { LayoutGroup, motion, AnimatePresence } from 'framer-motion';
import { NavigationBar } from './components/NavigationBar';
import { HeroSection } from './components/HeroSection';
import { IntroductionBlock } from './components/IntroductionBlock';
import { ArchitectureSection } from './components/ArchitectureSection';
import { PresentationSection } from './components/PresentationSection';
import { LobbySection } from './components/LobbySection';
import { GlobalGallerySection } from './components/GlobalGallerySection';
import { AmenitiesSection } from './components/AmenitiesSection';
import { LocationSection } from './components/LocationSection';
import { FilterBar } from './components/FilterBar';
import { PriceSummary } from './components/PriceSummary';
import { ApartmentGrid } from './components/ApartmentGrid';
import { ApartmentDetailModal } from './components/ApartmentDetailModal';
import { PurchaseSection } from './components/PurchaseSection';
import { DeveloperSection } from './components/DeveloperSection';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import { AdminLoginModal } from './components/AdminLoginModal';
import { LegalModal } from './components/LegalModal'; // New
import { INITIAL_APARTMENTS } from './data/apartments';
import { Apartment, ApartmentStatus, Filters } from './types';

function App() {
  const [apartments, setApartments] = useState<Apartment[]>(INITIAL_APARTMENTS);
  const [isManagerMode, setIsManagerMode] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);

  // Legal Modals State
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'agreement'>('privacy');

  const [isDirty, setIsDirty] = useState(false);
  const [filters, setFilters] = useState<Filters>({ rooms: 'Все', status: 'all' });
  const [selectedApartmentId, setSelectedApartmentId] = useState<string | null>(null);

  useEffect(() => {
    const loadApartments = async () => {
      try {
        if (window.storage) {
          const stored = await window.storage.get('apartments_data');
          if (stored?.value) {
            setApartments(JSON.parse(stored.value));
          }
        }
      } catch (error) {
        console.log('No stored data, using defaults');
      }
    };
    loadApartments();
  }, []);

  useEffect(() => {
    const checkAdminSession = () => {
      const session = localStorage.getItem('admin_session');
      if (session === 'active') {
        setIsManagerMode(true);
      }
    };
    checkAdminSession();
  }, []);

  const handleStatusChange = (id: string, newStatus: ApartmentStatus) => {
    setApartments(prev =>
      prev.map(apt => apt.id === id ? { ...apt, status: newStatus } : apt)
    );
    setIsDirty(true);
  };

  const handleSave = async () => {
    try {
      if (window.storage) {
        await window.storage.set(
          'apartments_data',
          JSON.stringify(apartments),
          false
        );
        setIsDirty(false);
        alert('Изменения сохранены');
      }
    } catch (error) {
      console.error('Save failed:', error);
    }
  };

  const handleAdminLogin = () => {
    localStorage.setItem('admin_session', 'active');
    setIsManagerMode(true);
    setIsAdminLoginOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    setIsManagerMode(false);
  };

  const handleOpenLegal = (type: 'privacy' | 'agreement') => {
    setLegalModalType(type);
    setLegalModalOpen(true);
  };

  // Security Update: Ctrl + Shift + L
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'L' || e.key === 'l' || e.key === 'Д' || e.key === 'д')) {
        e.preventDefault();
        setIsAdminLoginOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const selectedApartment = apartments.find(a => a.id === selectedApartmentId) || null;

  return (
    <div className="relative bg-limestone text-charcoalOak min-h-screen selection:bg-deepMoss selection:text-white">

      <div
        className="fixed inset-0 z-[9999] opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
      />

      <NavigationBar
        isManagerMode={isManagerMode}
        toggleManagerMode={() => { }}
        onContactClick={() => document.getElementById('developer')?.scrollIntoView({ behavior: 'smooth' })}
      />

      <LayoutGroup>
        <motion.div layout className="min-h-screen">
          <AnimatePresence mode="wait">
            {!isManagerMode ? (
              <motion.div
                key="public"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <HeroSection />
                <IntroductionBlock />
                <ArchitectureSection />
                <PresentationSection />
                <LobbySection />
                <GlobalGallerySection />
                <AmenitiesSection />
                <LocationSection />

                <div id="apartments" className="relative z-10">
                  <FilterBar filters={filters} setFilters={setFilters} />
                  <PriceSummary />
                  <ApartmentGrid
                    apartments={apartments}
                    filters={filters}
                    onApartmentClick={setSelectedApartmentId}
                  />
                </div>

                <PurchaseSection />
                <DeveloperSection />

                <Footer
                  onOpenPrivacy={() => handleOpenLegal('privacy')}
                  onOpenAgreement={() => handleOpenLegal('agreement')}
                />
              </motion.div>
            ) : (
              <motion.div
                key="admin"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <AdminPanel
                  apartments={apartments}
                  setApartments={setApartments}
                  updateApartmentStatus={handleStatusChange}
                  saveChanges={handleSave}
                  isDirty={isDirty}
                  onLogout={handleLogout}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      <ApartmentDetailModal
        apartment={selectedApartment}
        onClose={() => setSelectedApartmentId(null)}
      />

      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLogin={handleAdminLogin}
      />

      <LegalModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        type={legalModalType}
      />

    </div>
  );
}

export default App;