import React from 'react';
import { Check, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { PRICE_SAMPLES } from '../data/content';

interface PriceExamplesProps {
  onOpenEstimator: () => void;
  onOpenContact: () => void;
}

/**
 * Price examples section providing crystal-clear transparency into baseline rates
 * across residential and commercial tasks with all-inclusive guarantee.
 *
 * @param onOpenEstimator - Triggers calculation workflow
 * @param onOpenContact - Triggers consultation contact
 */
export const PriceExamples: React.FC<PriceExamplesProps> = ({ onOpenEstimator, onOpenContact }) => {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-[#E8E2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-extrabold text-[#2D6A4F] uppercase tracking-wider block mb-2">
              Keine versteckten Gebühren
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] tracking-tight">
              Transparente Preisbeispiele aus der Praxis
            </h2>
            <p className="text-neutral-600 text-base sm:text-lg mt-3">
              Jeder Auftrag ist individuell – unsere Festpreise sind jedoch immer fair, nachvollziehbar
              und all-inclusive. Hier sind typische Richtwerte für das Rhein-Main-Gebiet.
            </p>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={onOpenEstimator}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FAF8F5] hover:bg-neutral-100 text-[#1B4332] font-bold text-sm border border-[#E8E2DA] transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Eigenen Fall kalkulieren</span>
              <ArrowRight className="w-4 h-4 text-[#2D6A4F]" />
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {PRICE_SAMPLES.map((sample, idx) => (
            <div
              key={idx}
              className={`relative rounded-3xl p-6 sm:p-7 transition-all duration-200 border flex flex-col justify-between ${
                sample.highlight
                  ? 'bg-[#FAF8F5] border-[#2D6A4F] shadow-soft ring-1 ring-[#2D6A4F]/20'
                  : 'bg-white border-[#E8E2DA] hover:border-neutral-300'
              }`}
            >
              {sample.highlight && (
                <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-[#2D6A4F] text-white text-[11px] font-extrabold uppercase tracking-wider shadow">
                  Beliebteste Wahl
                </div>
              )}

              <div>
                <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wider block mb-1">
                  {sample.category}
                </span>
                <h3 className="text-lg font-black text-[#1A1A1A] mb-2 leading-snug">
                  {sample.service}
                </h3>
                
                <div className="flex items-baseline gap-2 my-4">
                  <span className="text-3xl font-black text-[#1A1A1A]">
                    {sample.price}
                  </span>
                  <span className="text-xs text-neutral-500 font-semibold">Festpreis-Richtwert</span>
                </div>

                <div className="space-y-2 text-xs text-neutral-600 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-neutral-800">Dauer:</span>
                    <span>{sample.duration}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-neutral-800 flex-shrink-0">Leistung:</span>
                    <span>{sample.scope}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E2DA] flex items-center justify-between">
                <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  0 € Anfahrt inklusive
                </span>
                <button
                  onClick={onOpenContact}
                  className="text-xs font-bold text-[#2D6A4F] hover:underline flex items-center gap-1"
                >
                  <span>Anfragen</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* All-Inclusive Guarantee Box */}
        <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-8 border border-[#E8E2DA]">
          <h4 className="text-base font-black text-[#1A1A1A] mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#2D6A4F]" />
            Was bei unseren Festpreisangeboten im Rhein-Main-Gebiet IMMER enthalten ist:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-semibold text-neutral-700">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#2D6A4F] flex-shrink-0" />
              <span>Kostenlose An- & Abfahrt (Rhein-Main)</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#2D6A4F] flex-shrink-0" />
              <span>Komplette Trage- & Schlepparbeit</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#2D6A4F] flex-shrink-0" />
              <span>Fachgerechte Entsorgungsgebühren</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#2D6A4F] flex-shrink-0" />
              <span>Gründliche besenreine Endübergabe</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
