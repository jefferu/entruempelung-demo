import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Menu, X, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

interface HeaderProps {
  onOpenEstimator: () => void;
  onOpenContact: () => void;
}

/**
 * Sticky glassmorphic header navigation bar with top emergency banner,
 * fast-action contact buttons, and responsive mobile navigation.
 *
 * @param onOpenEstimator - Callback to trigger the instant price estimator
 * @param onOpenContact - Callback to scroll or focus the contact inquiry form
 */
export const Header: React.FC<HeaderProps> = ({ onOpenEstimator, onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor window scroll to apply elevated glassmorphism styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Notification Bar for 24/7 Emergency Dispatch */}
      <div className="bg-[#1B4332] text-[#D8F3DC] text-xs sm:text-sm font-medium py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white">24/7 Notdienst & Eilräumung:</span>
            <span>Rhein-Main-Gebiet (Darmstadt, FFM, WI, MZ)</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs font-semibold">
            <a
              href={`tel:${COMPANY_INFO.mobileClean}`}
              className="text-white hover:text-amber-300 transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              Mobil: {COMPANY_INFO.mobile}
            </a>
            <span className="text-emerald-300/40">|</span>
            <span className="text-emerald-200">0,- € Anfahrtskosten</span>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'glass-panel shadow-soft py-3'
            : 'bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8E2DA] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#2D6A4F] text-white flex items-center justify-center font-bold text-xl shadow-md transition-transform group-hover:scale-105">
              RR
            </div>
            <div>
              <span className="block font-black text-lg sm:text-xl text-[#1A1A1A] tracking-tight leading-none">
                RheinMain Räumprofis
              </span>
              <span className="block text-[11px] sm:text-xs text-[#2D6A4F] font-semibold tracking-wide uppercase mt-0.5">
                Rhein-Main · Musterbetrieb
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-[#1A1A1A]">
            <a href="#leistungen" className="hover:text-[#2D6A4F] transition-colors">
              Leistungen
            </a>
            <a href="#preise" className="hover:text-[#2D6A4F] transition-colors">
              Preise
            </a>
            <a href="#ablauf" className="hover:text-[#2D6A4F] transition-colors">
              Ablauf
            </a>
            <a href="#warum-wir" className="hover:text-[#2D6A4F] transition-colors">
              Garantien
            </a>
            <a href="#einsatzgebiet" className="hover:text-[#2D6A4F] transition-colors">
              Einsatzgebiet
            </a>
            <a href="#faq" className="hover:text-[#2D6A4F] transition-colors">
              FAQ
            </a>
            <button
              onClick={onOpenContact}
              className="hover:text-[#2D6A4F] transition-colors font-semibold"
            >
              Kontakt
            </button>
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${COMPANY_INFO.phoneClean}`}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold text-[#1B4332] bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#2D6A4F]" />
              <span className="hidden xl:inline">{COMPANY_INFO.phone}</span>
              <span className="xl:hidden">Anrufen</span>
            </a>

            <button
              onClick={onOpenEstimator}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-[#2D6A4F] hover:bg-[#1B4332] shadow-sm hover:shadow transition-all duration-200"
            >
              <span>Blitz-Angebot</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href={`tel:${COMPANY_INFO.phoneClean}`}
              className="p-2 rounded-lg bg-emerald-50 text-[#2D6A4F] border border-emerald-200"
              aria-label="Telefon anrufen"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#1A1A1A] hover:bg-neutral-100 transition-colors"
              aria-label="Menü öffnen"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden glass-panel border-b border-[#E8E2DA] px-4 pt-3 pb-6 animate-fadeIn">
          <div className="flex flex-col gap-3 font-semibold text-base text-[#1A1A1A]">
            <a
              href="#leistungen"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-neutral-100 hover:text-[#2D6A4F]"
            >
              Unsere Leistungen
            </a>
            <a
              href="#preise"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-neutral-100 hover:text-[#2D6A4F]"
            >
              Preise & Richtwerte
            </a>
            <a
              href="#ablauf"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-neutral-100 hover:text-[#2D6A4F]"
            >
              In 3 Schritten besenrein
            </a>
            <a
              href="#einsatzgebiet"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-neutral-100 hover:text-[#2D6A4F]"
            >
              Einsatzgebiet Rhein-Main
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-neutral-100 hover:text-[#2D6A4F]"
            >
              Häufige Fragen (FAQ)
            </a>

            <div className="pt-3 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEstimator();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#2D6A4F] text-white font-bold text-center shadow-md"
              >
                <span>Kosten in 30 Sek. berechnen</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`tel:${COMPANY_INFO.phoneClean}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#2D6A4F] text-[#2D6A4F] font-bold bg-white text-center"
              >
                <Phone className="w-4 h-4" />
                <span>{COMPANY_INFO.phone}</span>
              </a>

              <a
                href={`https://wa.me/${COMPANY_INFO.mobileClean.replace('+', '')}?text=Hallo%20R%C3%A4umprofis,%20ich%20interessiere%20mich%20f%C3%BCr%20ein%20Angebot.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-center"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Fotoupload</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
