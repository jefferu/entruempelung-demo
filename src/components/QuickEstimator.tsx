import React, { useState, useMemo } from 'react';
import {
  Home,
  Building,
  Archive,
  Layers,
  Sofa,
  ArrowRight,
  Sparkles,
  Phone,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';
import { EstimatorState, EstimateResult } from '../types';
import { COMPANY_INFO } from '../data/content';

interface QuickEstimatorProps {
  onSelectEstimate?: (summary: string) => void;
  onScrollToContact: () => void;
}

/**
 * Interactive fast-quote cost estimator for instant price ranges.
 * Dynamically computes a realistic market estimate based on property type, area, floor and options.
 *
 * @param onSelectEstimate - Optional handler to transfer estimate data to the contact form
 * @param onScrollToContact - Scrolls page down to the contact inquiry form
 */
export const QuickEstimator: React.FC<QuickEstimatorProps> = ({
  onSelectEstimate,
  onScrollToContact,
}) => {
  const [state, setState] = useState<EstimatorState>({
    propertyType: 'wohnung',
    approximateArea: 50,
    floor: 1,
    hasElevator: false,
    needsDemolition: false,
    hasValuableItems: false,
    urgentService: false,
  });

  // Dynamically calculate estimated price bracket based on inputs
  const result: EstimateResult = useMemo(() => {
    let baseRatePerSqm = 14; // Default base per m²
    let fixedBase = 150;

    switch (state.propertyType) {
      case 'wohnung':
        baseRatePerSqm = 13;
        fixedBase = 180;
        break;
      case 'haus':
        baseRatePerSqm = 12;
        fixedBase = 350;
        break;
      case 'keller':
        baseRatePerSqm = 16;
        fixedBase = 140;
        break;
      case 'gewerbe':
        baseRatePerSqm = 15;
        fixedBase = 280;
        break;
      case 'einzelteile':
        baseRatePerSqm = 9;
        fixedBase = 75;
        break;
    }

    let calculated = fixedBase + state.approximateArea * baseRatePerSqm;

    // Floor without elevator surcharge
    if (state.floor > 1 && !state.hasElevator) {
      calculated += (state.floor - 1) * 45;
    }

    // Demolition surcharge
    if (state.needsDemolition) {
      calculated += state.approximateArea * 4.5;
    }

    // Urgent surcharge
    if (state.urgentService) {
      calculated += 80;
    }

    // Value offset discount
    if (state.hasValuableItems) {
      calculated = Math.max(75, calculated * 0.85); // 15% estimated offset
    }

    const min = Math.round(calculated * 0.9);
    const max = Math.round(calculated * 1.15);

    let suggestedHours = '3–5 Stunden';
    let recommendedTeamSize = 2;

    if (state.approximateArea > 90 || state.propertyType === 'haus') {
      suggestedHours = '1–2 Arbeitstage';
      recommendedTeamSize = 4;
    } else if (state.approximateArea < 20 || state.propertyType === 'einzelteile') {
      suggestedHours = '1–2 Stunden';
      recommendedTeamSize = 2;
    }

    return {
      minPrice: Math.max(75, min),
      maxPrice: Math.max(95, max),
      suggestedHours,
      recommendedTeamSize,
    };
  }, [state]);

  const handleRequestOffer = () => {
    const summary = `Kostenschätzung: ${state.propertyType.toUpperCase()} mit ca. ${state.approximateArea} m², Etage ${state.floor} (${state.hasElevator ? 'mit Fahrstuhl' : 'ohne Fahrstuhl'}). Richtpreis: ca. ${result.minPrice} € – ${result.maxPrice} €`;
    if (onSelectEstimate) {
      onSelectEstimate(summary);
    }
    onScrollToContact();
  };

  return (
    <section id="preise" className="py-16 md:py-24 bg-[#F4EFEA]/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/80 text-[#2D6A4F] text-xs font-extrabold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Transparente Online-Kalkulation
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1A1A] tracking-tight">
            Blitz-Kostenschätzung in 30 Sekunden
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 mt-4">
            Keine versteckten Aufschläge, keine bösen Überraschungen. 
            Wählen Sie Ihre Rahmendaten und erhalten Sie sofort eine realistische Preiserwartung.
          </p>
        </div>

        {/* Interactive Estimator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (Left) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2DA] shadow-soft">
            
            {/* Step 1: Property Type */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-[#1A1A1A] mb-3">
                1. Was soll geräumt oder entrümpelt werden?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: 'wohnung', label: 'Wohnung', icon: Home },
                  { id: 'haus', label: 'Einfamilienhaus', icon: Building },
                  { id: 'keller', label: 'Keller / Speicher', icon: Archive },
                  { id: 'gewerbe', label: 'Gewerbe / Büro', icon: Layers },
                  { id: 'einzelteile', label: 'Möbel / Sperrmüll', icon: Sofa },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = state.propertyType === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setState({ ...state, propertyType: item.id as any })}
                      className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border-2 transition-all ${
                        isSelected
                          ? 'border-[#2D6A4F] bg-emerald-50/70 text-[#1B4332] shadow-sm font-bold'
                          : 'border-[#E8E2DA] bg-[#FAF8F5] text-neutral-700 hover:border-neutral-300 font-medium'
                      }`}
                    >
                      <Icon className={`w-6 h-6 mb-2 ${isSelected ? 'text-[#2D6A4F]' : 'text-neutral-500'}`} />
                      <span className="text-xs text-center">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Approximate Area Slider */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-[#1A1A1A]">
                  2. Ungefähre Fläche / Raumgröße
                </label>
                <span className="px-3 py-1 rounded-xl bg-emerald-100 text-[#1B4332] font-black text-sm">
                  {state.approximateArea} m²
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="250"
                step="5"
                value={state.approximateArea}
                onChange={(e) => setState({ ...state, approximateArea: parseInt(e.target.value) })}
                className="w-full h-2.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#2D6A4F]"
              />
              <div className="flex justify-between text-xs text-neutral-400 mt-2 font-medium">
                <span>5 m² (Kleinraum)</span>
                <span>50 m² (2-Zi.)</span>
                <span>120 m² (Haus)</span>
                <span>250+ m²</span>
              </div>
            </div>

            {/* Step 3: Floor and Accessibility */}
            <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-[#1A1A1A] mb-2">
                  3. Stockwerk / Lage
                </label>
                <select
                  value={state.floor}
                  onChange={(e) => setState({ ...state, floor: parseInt(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2DA] bg-[#FAF8F5] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                >
                  <option value={0}>Erdgeschoss / Parterre / Keller</option>
                  <option value={1}>1. Obergeschoss</option>
                  <option value={2}>2. Obergeschoss</option>
                  <option value={3}>3. Obergeschoss</option>
                  <option value={4}>4. Obergeschoss oder höher</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1A1A1A] mb-2">
                  Fahrstuhl vorhanden?
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setState({ ...state, hasElevator: true })}
                    className={`flex-1 py-2.5 rounded-xl border text-sm font-bold transition-all ${
                      state.hasElevator
                        ? 'border-[#2D6A4F] bg-emerald-50 text-[#1B4332]'
                        : 'border-[#E8E2DA] bg-[#FAF8F5] text-neutral-600'
                    }`}
                  >
                    Ja, Aufzug nutzbar
                  </button>
                  <button
                    type="button"
                    onClick={() => setState({ ...state, hasElevator: false })}
                    className={`flex-1 py-2.5 rounded-xl border text-sm font-bold transition-all ${
                      !state.hasElevator
                        ? 'border-[#2D6A4F] bg-emerald-50 text-[#1B4332]'
                        : 'border-[#E8E2DA] bg-[#FAF8F5] text-neutral-600'
                    }`}
                  >
                    Nein, nur Treppen
                  </button>
                </div>
              </div>
            </div>

            {/* Step 4: Additional checkboxes */}
            <div>
              <label className="block text-sm font-bold text-[#1A1A1A] mb-3">
                4. Spezielle Anforderungen (Optional)
              </label>
              <div className="space-y-2.5">
                <label className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E2DA] cursor-pointer hover:bg-neutral-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={state.hasValuableItems}
                    onChange={(e) => setState({ ...state, hasValuableItems: e.target.checked })}
                    className="w-4 h-4 rounded text-[#2D6A4F] focus:ring-[#2D6A4F]"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-[#1A1A1A] block">
                      Wertgegenstände vorhanden (Wertanrechnung)
                    </span>
                    <span className="text-neutral-500">
                      Gut erhaltene Möbel oder Antiquitäten verringern die Gesamtkosten.
                    </span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E2DA] cursor-pointer hover:bg-neutral-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={state.needsDemolition}
                    onChange={(e) => setState({ ...state, needsDemolition: e.target.checked })}
                    className="w-4 h-4 rounded text-[#2D6A4F] focus:ring-[#2D6A4F]"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-[#1A1A1A] block">
                      Demontage & Entkernung gewünscht
                    </span>
                    <span className="text-neutral-500">
                      Küche abbauen, Tapeten ablösen, Bodenbeläge oder Wandverkleidungen entfernen.
                    </span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E2DA] cursor-pointer hover:bg-neutral-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={state.urgentService}
                    onChange={(e) => setState({ ...state, urgentService: e.target.checked })}
                    className="w-4 h-4 rounded text-[#2D6A4F] focus:ring-[#2D6A4F]"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-[#1A1A1A] block">
                      24/48h Eil-Service oder Notdienst erforderlich
                    </span>
                    <span className="text-neutral-500">
                      Soforteinsatz bei akutem Fristablauf oder Wohnungsübergabe am selben/nächsten Tag.
                    </span>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* Dynamic Estimate Summary Result Card (Right) */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="bg-[#1B4332] text-white rounded-3xl p-6 sm:p-8 border border-emerald-800 shadow-premium relative overflow-hidden">
              
              {/* Background badge decoration */}
              <div className="absolute top-0 right-0 p-8 text-emerald-700/20 pointer-events-none">
                <Sparkles className="w-32 h-32" />
              </div>

              <div className="relative">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Kostenlose Vor-Ort-Garantie
                </div>

                <h3 className="text-xl font-black text-white mb-1">
                  Ihre unverbindliche Richtpreis-Schätzung:
                </h3>
                <p className="text-xs text-emerald-200/80 mb-6">
                  Basierend auf Ihren Angaben im gesamten Rhein-Main-Gebiet.
                </p>

                {/* Price Display */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 mb-6 text-center">
                  <span className="text-xs uppercase font-bold tracking-wider text-emerald-300 block mb-1">
                    Geschätzter Komplett-Festpreis
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-amber-300 tracking-tight">
                    {result.minPrice} € – {result.maxPrice} €
                  </div>
                  <span className="text-[11px] text-emerald-100/70 block mt-1.5">
                    Inkl. gesetzl. MwSt. · Inkl. 0 € Anfahrt · Inkl. besenreine Übergabe
                  </span>
                </div>

                {/* Scope details */}
                <div className="space-y-3 mb-6 text-xs text-emerald-100">
                  <div className="flex items-center justify-between pb-2 border-b border-emerald-700/60">
                    <span className="text-emerald-300">Voraussichtlicher Zeitbedarf:</span>
                    <span className="font-bold text-white">{result.suggestedHours}</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-emerald-700/60">
                    <span className="text-emerald-300">Empfohlenes Fachpersonal:</span>
                    <span className="font-bold text-white">{result.recommendedTeamSize} Mitarbeiter</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-emerald-700/60">
                    <span className="text-emerald-300">Entsorgungsnachweis:</span>
                    <span className="font-bold text-white">Inklusive</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-300">Anfahrtskosten:</span>
                    <span className="font-bold text-emerald-300">0,00 € (Geschenkt)</span>
                  </div>
                </div>

                {/* High-Impact Actions */}
                <button
                  type="button"
                  onClick={handleRequestOffer}
                  className="w-full py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-[#1A1A1A] font-extrabold text-base transition-transform transform hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2 mb-3"
                >
                  <span>Angebot verbindlich anfordern</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <a
                    href={`tel:${COMPANY_INFO.phoneClean}`}
                    className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-300" />
                    <span>{COMPANY_INFO.phone}</span>
                  </a>
                  <a
                    href={`https://wa.me/${COMPANY_INFO.mobileClean.replace('+', '')}?text=${encodeURIComponent(
                      `Hallo RheinMain Räumprofis, ich habe eine Kostenschätzung gerechnet (${state.propertyType}, ca. ${state.approximateArea} m²). Ich möchte gerne Fotos senden.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-amber-300" />
                    <span>WhatsApp-Fotos</span>
                  </a>
                </div>

                <p className="text-[11px] text-emerald-200/60 text-center mt-4">
                  Die Schätzung ist unverbindlich. Der endgültige Festpreis wird bei der kostenlosen 
                  Vor-Ort-Besichtigung transparent fixiert.
                </p>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
