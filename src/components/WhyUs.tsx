import React from 'react';
import {
  SearchCheck,
  MapPin,
  BadgePercent,
  Sparkles,
  Coins,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { GUARANTEES, COMPANY_INFO } from '../data/content';

/**
 * Maps USP icon names to appropriate Lucide React icons.
 *
 * @param name - String representation of the guarantee icon
 */
const getGuaranteeIcon = (name: string) => {
  switch (name) {
    case 'SearchCheck':
      return SearchCheck;
    case 'MapPin':
      return MapPin;
    case 'BadgePercent':
      return BadgePercent;
    case 'Sparkles':
      return Sparkles;
    case 'Coins':
      return Coins;
    case 'Clock':
      return Clock;
    default:
      return ShieldCheck;
  }
};

/**
 * WhyUs component highlighting the core commitments and guarantees.
 * Reflects the values established since the company's founding in 2016.
 */
export const WhyUs: React.FC = () => {
  return (
    <section id="warum-wir" className="py-16 md:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold text-[#2D6A4F] uppercase tracking-wider block mb-2">
            Unsere Grundsätze seit {COMPANY_INFO.foundingYear}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1A1A] tracking-tight">
            Warum unsere Räumprofis im Rhein-Main-Gebiet?
          </h2>
          <p className="text-neutral-600 text-base sm:text-lg mt-4">
            Unser Team arbeitet nach festen Grundsätzen. Pünktlichkeit, ehrliche Beratung und transparente
            Pauschalpreise stehen bei uns an erster Stelle.
          </p>
        </div>

        {/* Guarantees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {GUARANTEES.map((item, idx) => {
            const Icon = getGuaranteeIcon(item.icon);
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 border border-[#E8E2DA] shadow-soft hover:shadow-premium transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#2D6A4F] flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-[#1A1A1A] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Trust Stats Counter Bar */}
        <div className="bg-white rounded-3xl p-8 border border-[#E8E2DA] shadow-soft grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <span className="text-3xl sm:text-4xl font-black text-[#2D6A4F] block">
              100%
            </span>
            <span className="text-xs sm:text-sm font-semibold text-neutral-600 mt-1 block">
              Kostenlose Besichtigung
            </span>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-black text-[#2D6A4F] block">
              0,- €
            </span>
            <span className="text-xs sm:text-sm font-semibold text-neutral-600 mt-1 block">
              Anfahrtskosten im Gebiet
            </span>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-black text-[#2D6A4F] block">
              1.500+
            </span>
            <span className="text-xs sm:text-sm font-semibold text-neutral-600 mt-1 block">
              Erfolgreich geräumte Objekte
            </span>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-black text-[#2D6A4F] block">
              Seit 2016
            </span>
            <span className="text-xs sm:text-sm font-semibold text-neutral-600 mt-1 block">
              Erfahrung & Zuverlässigkeit
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
