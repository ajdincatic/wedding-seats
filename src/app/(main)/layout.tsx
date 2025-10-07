"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { Guest, Table, SeatingPlan } from '@/types';
import { storage } from '@/lib/storage';
import { Language, getTranslations, languageFlags, languageNames } from '@/lib/i18n';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Modal from '@/components/Modal';
import GuestsIcon from '@/components/icons/GuestsIcon';
import TablesIcon from '@/components/icons/TablesIcon';
import SeatingIcon from '@/components/icons/SeatingIcon';
import LayoutIcon from '@/components/icons/LayoutIcon';
import PreviewIcon from '@/components/icons/PreviewIcon';
import BlogIcon from '@/components/icons/BlogIcon';

interface ModalState {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm?: () => void;
  type?: 'confirm' | 'alert';
  confirmText?: string;
  cancelText?: string;
}

interface AppContextType {
  guests: Guest[];
  tables: Table[];
  language: Language;
  setLanguage: (lang: Language) => void;
  t: ReturnType<typeof getTranslations>;
  showModal: (config: Omit<ModalState, 'isOpen'>) => void;
  showConfirm: (title: string, message: string, onConfirm: () => void) => void;
  showAlert: (title: string, message: string) => void;
  addGuest: (guest: Omit<Guest, 'id'>) => void;
  updateGuest: (id: string, guest: Partial<Guest>) => void;
  deleteGuest: (id: string) => void;
  addTable: (table: Omit<Table, 'id'>) => string;
  updateTable: (id: string, table: Partial<Table>) => void;
  updateTablePosition: (id: string, x: number, y: number) => void;
  deleteTable: (id: string) => void;
  assignGuestToTable: (guestId: string, tableId: string) => void;
  removeGuestFromTable: (guestId: string) => void;
  savePlan: () => void;
  loadPlan: () => void;
  clearAll: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

export default function AppLayout({ children }: { children: ReactNode }) {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [tables, setTables] = useState<Table[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    title: '',
    message: '',
    type: 'alert',
  });
  const pathname = usePathname();

  // Automatic language detection
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const supportedLangs: Language[] = ['en', 'hr', 'es', 'de', 'fr'];
    
    // 1. Check URL parameter first (?lang=hr)
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang') as Language;
    
    if (urlLang && supportedLangs.includes(urlLang)) {
      setLanguage(urlLang);
      localStorage.setItem('preferredLanguage', urlLang);
      return;
    }

    // 2. Check localStorage
    const savedLang = localStorage.getItem('preferredLanguage') as Language;
    if (savedLang && supportedLangs.includes(savedLang)) {
      setLanguage(savedLang);
      return;
    }

    // 3. Detect from browser language
    const browserLang = navigator.language.split('-')[0] as Language;
    if (supportedLangs.includes(browserLang)) {
      setLanguage(browserLang);
      localStorage.setItem('preferredLanguage', browserLang);
    }
  }, []);

  const t = getTranslations(language);

  const showModal = (config: Omit<ModalState, 'isOpen'>) => {
    setModalState({ ...config, isOpen: true });
  };

  const showConfirm = (title: string, message: string, onConfirm: () => void) => {
    setModalState({
      isOpen: true,
      title,
      message,
      onConfirm,
      type: 'confirm',
      confirmText: t.guests.delete,
      cancelText: t.guests.cancel,
    });
  };

  const showAlert = (title: string, message: string) => {
    setModalState({
      isOpen: true,
      title,
      message,
      type: 'alert',
      confirmText: 'OK',
    });
  };

  const closeModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  useEffect(() => {
    const plan = storage.loadPlan();
    if (plan) {
      setGuests(plan.guests);
      setTables(plan.tables);
    }
    setLoaded(true);
  }, []);

  // Update HTML lang attribute and localStorage when language changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    document.documentElement.lang = language;
    localStorage.setItem('preferredLanguage', language);
    
    // Update URL parameter without page reload
    const url = new URL(window.location.href);
    url.searchParams.set('lang', language);
    window.history.replaceState({}, '', url.toString());
  }, [language]);

  useEffect(() => {
    if (loaded) {
      const plan: SeatingPlan = {
        guests,
        tables,
        lastUpdated: new Date().toISOString(),
      };
      storage.savePlan(plan);
    }
  }, [guests, tables, loaded]);

  const addGuest = (guest: Omit<Guest, 'id'>) => {
    const newGuest: Guest = {
      ...guest,
      id: crypto.randomUUID(),
    };
    setGuests(prev => [...prev, newGuest]);
  };

  const updateGuest = (id: string, updates: Partial<Guest>) => {
    setGuests(prev => prev.map(g => g.id === id ? { ...g, ...updates } : g));
  };

  const deleteGuest = (id: string) => {
    setGuests(prev => prev.filter(g => g.id !== id));
    setTables(prev => prev.map(t => ({
      ...t,
      guests: t.guests.filter(gId => gId !== id)
    })));
  };

  const addTable = (table: Omit<Table, 'id'>): string => {
    const newTable: Table = {
      ...table,
      id: crypto.randomUUID(),
    };
    setTables(prev => [...prev, newTable]);
    return newTable.id;
  };

  const updateTable = (id: string, updates: Partial<Table>) => {
    setTables(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const updateTablePosition = (id: string, x: number, y: number) => {
    setTables(prev => prev.map(t =>
      t.id === id ? { ...t, position: { x, y } } : t
    ));
  };

  const deleteTable = (id: string) => {
    const table = tables.find(t => t.id === id);
    if (table) {
      setGuests(prev => prev.map(g =>
        table.guests.includes(g.id) ? { ...g, tableId: undefined } : g
      ));
    }
    setTables(prev => prev.filter(t => t.id !== id));
  };

  const assignGuestToTable = (guestId: string, tableId: string) => {
    // Remove from old table if exists
    setTables(prev => prev.map(t => ({
      ...t,
      guests: t.guests.filter(gId => gId !== guestId)
    })));

    // Add to new table
    setTables(prev => prev.map(t =>
      t.id === tableId ? { ...t, guests: [...t.guests, guestId] } : t
    ));

    // Update guest
    setGuests(prev => prev.map(g =>
      g.id === guestId ? { ...g, tableId } : g
    ));
  };

  const removeGuestFromTable = (guestId: string) => {
    setTables(prev => prev.map(t => ({
      ...t,
      guests: t.guests.filter(gId => gId !== guestId)
    })));
    setGuests(prev => prev.map(g =>
      g.id === guestId ? { ...g, tableId: undefined } : g
    ));
  };

  const savePlan = () => {
    const plan: SeatingPlan = {
      guests,
      tables,
      lastUpdated: new Date().toISOString(),
    };
    storage.savePlan(plan);
  };

  const loadPlan = () => {
    const plan = storage.loadPlan();
    if (plan) {
      setGuests(plan.guests);
      setTables(plan.tables);
    }
  };

  const clearAll = () => {
    showConfirm(
      t.preview.deleteAll,
      t.preview.deleteConfirm,
      () => {
        setGuests([]);
        setTables([]);
        storage.clearPlan();
      }
    );
  };

  const contextValue: AppContextType = {
    guests,
    tables,
    language,
    setLanguage,
    t,
    showModal,
    showConfirm,
    showAlert,
    addGuest,
    updateGuest,
    deleteGuest,
    addTable,
    updateTable,
    updateTablePosition,
    deleteTable,
    assignGuestToTable,
    removeGuestFromTable,
    savePlan,
    loadPlan,
    clearAll,
  };

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-12 w-12 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <div className="text-xl text-gray-800 font-semibold">{t.common.loading}</div>
        </div>
      </div>
    );
  }

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white border-b shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="text-xl font-bold text-purple-900">
                💒 WeddingSeats
              </Link>

              <div className="hidden md:flex gap-1 items-center">
                <Link
                  href="/guests"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    pathname === '/guests'
                      ? 'bg-purple-100 text-purple-900 font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <GuestsIcon className="w-5 h-5" />
                  <span>{t.nav.guests}</span>
                </Link>
                <Link
                  href="/tables"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    pathname === '/tables'
                      ? 'bg-purple-100 text-purple-900 font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <TablesIcon className="w-5 h-5" />
                  <span>{t.nav.tables}</span>
                </Link>
                <Link
                  href="/seating"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    pathname === '/seating'
                      ? 'bg-purple-100 text-purple-900 font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <SeatingIcon className="w-5 h-5" />
                  <span>{t.nav.seating}</span>
                </Link>
                <Link
                  href="/layout"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    pathname === '/layout'
                      ? 'bg-purple-100 text-purple-900 font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <LayoutIcon className="w-5 h-5" />
                  <span>{t.nav.layout}</span>
                </Link>
                <Link
                  href="/preview"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    pathname === '/preview'
                      ? 'bg-purple-100 text-purple-900 font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <PreviewIcon className="w-5 h-5" />
                  <span>{t.nav.preview}</span>
                </Link>
                <Link
                  href="/blog"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    pathname?.startsWith('/blog')
                      ? 'bg-purple-100 text-purple-900 font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <BlogIcon className="w-5 h-5" />
                  <span>Blog</span>
                </Link>

                {/* Language Switcher with Flags */}
                <div className="ml-4 border-l pl-4 relative">
                  <button
                    onClick={() => setShowLangMenu(!showLangMenu)}
                    className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:border-purple-400 transition-colors cursor-pointer"
                  >
                    <span className="text-lg">{languageFlags[language]}</span>
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showLangMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-gray-200 rounded-lg shadow-lg z-50">
                      {(['en', 'hr', 'es', 'de', 'fr'] as Language[]).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => {
                            setLanguage(lang);
                            setShowLangMenu(false);
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-purple-50 transition-colors cursor-pointer first:rounded-t-lg last:rounded-b-lg ${
                            language === lang ? 'bg-purple-100 font-semibold' : ''
                          }`}
                        >
                          <span className="text-lg">{languageFlags[lang]}</span>
                          <span className="text-sm text-gray-700">{languageNames[lang]}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden border-t py-4">
                <div className="flex flex-col space-y-2">
                  <Link
                    href="/guests"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                      pathname === '/guests' ? 'bg-purple-100 text-purple-900 font-semibold' : 'text-gray-700'
                    }`}
                  >
                    <GuestsIcon className="w-5 h-5" />
                    <span>{t.nav.guests}</span>
                  </Link>
                  <Link
                    href="/tables"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                      pathname === '/tables' ? 'bg-purple-100 text-purple-900 font-semibold' : 'text-gray-700'
                    }`}
                  >
                    <TablesIcon className="w-5 h-5" />
                    <span>{t.nav.tables}</span>
                  </Link>
                  <Link
                    href="/seating"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                      pathname === '/seating' ? 'bg-purple-100 text-purple-900 font-semibold' : 'text-gray-700'
                    }`}
                  >
                    <SeatingIcon className="w-5 h-5" />
                    <span>{t.nav.seating}</span>
                  </Link>
                  <Link
                    href="/layout"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                      pathname === '/layout' ? 'bg-purple-100 text-purple-900 font-semibold' : 'text-gray-700'
                    }`}
                  >
                    <LayoutIcon className="w-5 h-5" />
                    <span>{t.nav.layout}</span>
                  </Link>
                  <Link
                    href="/preview"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                      pathname === '/preview' ? 'bg-purple-100 text-purple-900 font-semibold' : 'text-gray-700'
                    }`}
                  >
                    <PreviewIcon className="w-5 h-5" />
                    <span>{t.nav.preview}</span>
                  </Link>
                  <Link
                    href="/blog"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                      pathname?.startsWith('/blog') ? 'bg-purple-100 text-purple-900 font-semibold' : 'text-gray-700'
                    }`}
                  >
                    <BlogIcon className="w-5 h-5" />
                    <span>Blog</span>
                  </Link>

                  <div className="px-4 pt-4 border-t">
                    <div className="text-xs font-medium text-gray-600 mb-2">Language / Jezik</div>
                    <div className="grid grid-cols-2 gap-2">
                      {(['en', 'hr', 'es', 'de', 'fr'] as Language[]).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setLanguage(lang)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer justify-center ${
                            language === lang ? 'bg-purple-600 text-white font-semibold' : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          <span className="text-base">{languageFlags[lang]}</span>
                          <span className="text-sm">{lang.toUpperCase()}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>

        {/* Modal */}
        <Modal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          onConfirm={modalState.onConfirm}
          title={modalState.title}
          message={modalState.message}
          type={modalState.type}
          confirmText={modalState.confirmText}
          cancelText={modalState.cancelText}
        />
      </div>
    </AppContext.Provider>
  );
}
