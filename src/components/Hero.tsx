import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Star,
  ArrowRight,
  Camera,
  Truck,
  Armchair,
  Refrigerator,
  Tv,
  Archive,
  Piano,
  Boxes,
  Zap,
  Clock,
  Euro,
  Building,
  Shield,
  MapPin,
  Search,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

interface HeroProps {
  onOpenEstimator: () => void;
  onOpenContact: () => void;
  onSelectCategory?: (categoryName: string) => void;
}

/**
 * Animated phrases cycling through the typewriter effect.
 */
const TYPEWRITER_PHRASES = [
  'in 7 Sekunden kalkuliert.',
  'garantiert zum Festpreis.',
  '100% besenrein übergeben.',
  'mit 0,- € Anfahrtskosten.',
];

/**
 * 6 primary item categories for the quick selection grid.
 */
const QUICK_ITEMS = [
  {
    id: 'moebel',
    title: 'Möbel & Sofas',
    desc: 'Couch, Schrank, Bett',
    icon: Armchair,
    badgeColor: 'bg-emerald-100 text-emerald-800',
    estimateHint: 'ab 79 €',
  },
  {
    id: 'geraete',
    title: 'Haushaltsgeräte',
    desc: 'Kühlschrank, Waschmaschine',
    icon: Refrigerator,
    badgeColor: 'bg-blue-100 text-blue-800',
    estimateHint: 'ab 65 €',
  },
  {
    id: 'elektronik',
    title: 'TV & Elektronik',
    desc: 'Fernseher, PC, Monitore',
    icon: Tv,
    badgeColor: 'bg-indigo-100 text-indigo-800',
    estimateHint: 'ab 45 €',
  },
  {
    id: 'raeumung',
    title: 'Keller & Wohnung',
    desc: 'Komplette Räumungen',
    icon: Archive,
    badgeColor: 'bg-amber-100 text-amber-800',
    estimateHint: 'ab 290 €',
  },
  {
    id: 'spezial',
    title: 'Schwergut & Spezial',
    desc: 'Klavier, Tresor, Heizkörper',
    icon: Piano,
    badgeColor: 'bg-purple-100 text-purple-800',
    estimateHint: 'Auf Anfrage',
  },
  {
    id: 'bauschutt',
    title: 'Schutt & Renovierung',
    desc: 'Fliesen, Holz, Sanierung',
    icon: Boxes,
    badgeColor: 'bg-orange-100 text-orange-800',
    estimateHint: 'ab 25 € / m²',
  },
];

/**
 * High-conversion Hero section featuring modern visual UX:
 * - Animated typewriter headline with blinking cursor
 * - Social-proof Google star rating pill
 * - Feature pills row (Instant quotes, Same-day, 0€ Anfahrt, etc.)
 * - Right-hand interactive 'Blitz-Angebot' container with Truck capacity,
 *   Photo upload and 6-grid item selectors with micro-interactions.
 *
 * @param onOpenEstimator - Triggers scroll or modal for full volume calculator
 * @param onOpenContact - Triggers navigation to contact inquiry
 * @param onSelectCategory - Pre-populates selected category into the inquiry flow
 */
export const Hero: React.FC<HeroProps> = ({
  onOpenEstimator,
  onOpenContact,
  onSelectCategory,
}) => {
  // Typewriter state
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Cycling Typewriter Effect
  useEffect(() => {
    const fullText = TYPEWRITER_PHRASES[phraseIdx];
    const speed = isDeleting ? 35 : 70;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setPhraseIdx((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIdx]);

  const handleItemClick = (title: string) => {
    if (onSelectCategory) {
      onSelectCategory(title);
    } else {
      onOpenEstimator();
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (onSelectCategory) {
        onSelectCategory(`Suchanfrage: ${searchQuery.trim()}`);
      } else {
        onOpenContact();
      }
    }
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-16 md:pt-10 md:pb-24 bg-[#FAF8F5]">
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-100/35 via-amber-50/20 to-transparent pointer-events-none rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Headings, Typewriter, Social Proof & Micro-Pills */}
          <div className="lg:col-span-6 xl:col-span-6 pt-2">
            
            {/* Google Review Badge Pill */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E2DA] shadow-sm mb-6"
            >
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-[#1A1A1A]">
                {COMPANY_INFO.googleRating} · {COMPANY_INFO.reviewCount} Google-Bewertungen
              </span>
            </motion.div>

            {/* Main Headline with Animated Typewriter Effect */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1A1A1A] tracking-tight leading-[1.08] mb-6">
              Entrümpelung im Rhein-Main-Gebiet.
              <span className="block text-[#2D6A4F] mt-2 min-h-[1.25em]">
                {currentText}
                <span className="inline-block w-[3px] h-[0.9em] bg-[#2D6A4F] ml-1 animate-pulse align-middle" />
              </span>
            </h1>

            {/* Subhead / Value Proposition */}
            <p className="text-base sm:text-lg text-[#374151] font-semibold leading-relaxed max-w-xl mb-4">
              Wohnungsauflösungen, Keller, Häuser & Gewerbe in Frankfurt, Darmstadt, Mainz & Wiesbaden.
              Passend für enge Treppenhäuser, Aufzüge und Halteverbotszonen.
            </p>

            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-lg mb-8">
              Wir ermitteln für Sie den besten Festpreis – transparent, besenrein und garantiert 
              ohne versteckte Nachforderungen oder Überraschungszuschläge.
            </p>

            {/* Micro-Pills Feature Row */}
            <div className="flex flex-wrap gap-2 pt-2 mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E8E2DA] text-xs font-bold text-neutral-700 shadow-sm">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                Sofort-Schätzung
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E8E2DA] text-xs font-bold text-neutral-700 shadow-sm">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                Express 24/48h möglich
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E8E2DA] text-xs font-bold text-neutral-700 shadow-sm">
                <Euro className="w-3.5 h-3.5 text-[#2D6A4F]" />
                Faire Festpreise
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E8E2DA] text-xs font-bold text-neutral-700 shadow-sm">
                <Building className="w-3.5 h-3.5 text-neutral-500" />
                Kein Etagenzuschlag
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E8E2DA] text-xs font-bold text-neutral-700 shadow-sm">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                Voll versichert
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E8E2DA] text-xs font-bold text-neutral-700 shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                0 € Anfahrt im Gebiet
              </span>
            </div>

            {/* Quick Consultation Button for Direct Contact */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={onOpenContact}
                className="text-xs font-bold text-[#2D6A4F] hover:text-[#1B4332] underline flex items-center gap-1.5"
              >
                <span>Lieber persönlich sprechen? Kostenlose Beratung vereinbaren</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* RIGHT COLUMN: The Interactive Blitz-Angebot Card */}
          <div className="lg:col-span-6 xl:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-3xl border border-[#E8E2DA] shadow-premium p-6 sm:p-7 relative"
            >
              {/* Card Title */}
              <div className="text-center mb-6">
                <h2 className="text-xl sm:text-2xl font-black text-[#1A1A1A]">
                  Blitz-Angebot berechnen
                </h2>
                <p className="text-xs text-neutral-500 mt-1">
                  Wählen Sie die passende Option für Ihre Räumung
                </p>
              </div>

              {/* OPTION 1: Price based on truck capacity (LKW Ladevolumen) */}
              <motion.div
                whileHover={{ scale: 1.015, y: -2 }}
                whileTap={{ scale: 0.99 }}
                onClick={onOpenEstimator}
                className="group cursor-pointer p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/90 hover:border-emerald-500/80 transition-all shadow-sm flex items-center justify-between gap-4 mb-4"
              >
                <div className="flex items-center gap-3.5">
                  {/* Stylized Illustrated Truck */}
                  <div className="w-14 h-12 rounded-xl bg-white border border-emerald-200 flex items-center justify-center text-[#2D6A4F] shadow-sm relative group-hover:bg-[#2D6A4F] group-hover:text-white transition-colors flex-shrink-0">
                    <Truck className="w-7 h-7" />
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-base font-extrabold text-[#1A1A1A] group-hover:text-[#2D6A4F] transition-colors leading-snug">
                      Preis nach Ladevolumen (m³)
                    </h3>
                    <p className="text-xs text-neutral-600">
                      Ideal für Wohnungen, Keller oder gemischten Sperrmüll
                    </p>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-white border border-emerald-200 text-[#2D6A4F] flex items-center justify-center flex-shrink-0 group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>

              {/* DIVIDER 1 */}
              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-neutral-200" />
                <span className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-neutral-400">
                  Oder Foto senden
                </span>
                <div className="flex-grow border-t border-neutral-200" />
              </div>

              {/* OPTION 2: Upload a photo (AI / WhatsApp instant estimate) */}
              <motion.div
                whileHover={{ scale: 1.015, y: -2 }}
                whileTap={{ scale: 0.99 }}
                onClick={onOpenContact}
                className="group cursor-pointer p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/90 hover:border-emerald-500/80 transition-all shadow-sm flex items-center justify-between gap-4 mb-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-12 rounded-xl bg-white border border-emerald-200 flex items-center justify-center text-[#2D6A4F] shadow-sm group-hover:bg-[#2D6A4F] group-hover:text-white transition-colors flex-shrink-0">
                    <Camera className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-base font-extrabold text-[#1A1A1A] group-hover:text-[#2D6A4F] transition-colors leading-snug">
                      Foto hochladen oder per WhatsApp
                    </h3>
                    <p className="text-xs text-neutral-600">
                      Blitz-Einschätzung anhand Ihrer Schnappschüsse
                    </p>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-white border border-emerald-200 text-[#2D6A4F] flex items-center justify-center flex-shrink-0 group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>

              {/* DIVIDER 2 */}
              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-neutral-200" />
                <span className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-neutral-400">
                  Oder nach Gegenstand wählen
                </span>
                <div className="flex-grow border-t border-neutral-200" />
              </div>

              {/* OPTION 3: 6-Grid of Items */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-5">
                {QUICK_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.id}
                      type="button"
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleItemClick(item.title)}
                      className="p-3 rounded-2xl border border-[#E8E2DA] bg-[#FAF8F5] hover:bg-white hover:border-[#2D6A4F] transition-all text-center flex flex-col items-center justify-center shadow-xs hover:shadow-soft group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white border border-[#E8E2DA] text-[#2D6A4F] flex items-center justify-center mb-2 shadow-xs group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-extrabold text-[#1A1A1A] block leading-tight">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-neutral-500 block mt-0.5 font-medium">
                        {item.estimateHint}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* OPTION 4: Search input "Gegenstand nicht gefunden? Hier eingeben..." */}
              <form onSubmit={handleSearchSubmit} className="relative mb-4">
                <input
                  type="text"
                  placeholder="Gegenstand nicht dabei? Hier eingeben..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-24 py-2.5 rounded-xl border border-[#E8E2DA] bg-[#FAF8F5] text-xs font-medium text-[#1A1A1A] placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white transition-all"
                />
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-[11px] font-bold rounded-lg transition-colors"
                >
                  Anfragen
                </button>
              </form>

              {/* Bottom Support Callout */}
              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500 font-medium">
                <span>Fragen zum Ablauf?</span>
                <a
                  href={`tel:${COMPANY_INFO.phoneClean}`}
                  className="font-bold text-[#2D6A4F] hover:underline flex items-center gap-1"
                >
                  <span>Zentrale: {COMPANY_INFO.phone}</span>
                </a>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
