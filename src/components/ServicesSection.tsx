import React, { useState } from 'react';
import {
  Home,
  Trash2,
  Truck,
  Hammer,
  Building2,
  Snowflake,
  Clock,
  Check,
  ArrowRight,
  Phone,
} from 'lucide-react';
import { SERVICES_LIST, COMPANY_INFO } from '../data/content';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
  onOpenContact: () => void;
}

/**
 * Maps icon name strings from data to functional Lucide React components.
 *
 * @param name - The icon name string
 */
const getServiceIcon = (name: string) => {
  switch (name) {
    case 'Home':
      return Home;
    case 'Trash2':
      return Trash2;
    case 'Truck':
      return Truck;
    case 'Hammer':
      return Hammer;
    case 'Building2':
      return Building2;
    case 'Snowflake':
      return Snowflake;
    case 'Clock':
      return Clock;
    default:
      return Trash2;
  }
};

/**
 * Complete services portfolio showcasing all 7 core offerings
 * rendered in responsive cards with bulleted deliverables and direct booking CTAs.
 *
 * @param onSelectService - Sets the selected service in inquiry form state
 * @param onOpenContact - Navigates to the contact form
 */
export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onOpenContact,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredServices =
    activeCategory === 'all'
      ? SERVICES_LIST
      : SERVICES_LIST.filter((s) => {
          if (activeCategory === 'privat') {
            return ['haushaltsaufloesung', 'entruempelung', 'umzuege'].includes(s.id);
          }
          if (activeCategory === 'gewerbe') {
            return ['betriebsaufloesung', 'entkernung'].includes(s.id);
          }
          if (activeCategory === 'special') {
            return ['winterdienst-gruenpflege', 'notdienst'].includes(s.id);
          }
          return true;
        });

  return (
    <section id="leistungen" className="py-16 md:py-24 bg-white border-b border-[#E8E2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold text-[#2D6A4F] uppercase tracking-wider block mb-2">
            Unser Leistungsspektrum
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1A1A] tracking-tight">
            Alles aus einer Hand – vom Keller bis zum Dach
          </h2>
          <p className="text-neutral-600 text-base sm:text-lg mt-4">
            Als erfahrenes Entrümpelungsunternehmen im gesamten Rhein-Main-Gebiet befreien wir Sie von Ballast. 
            Wir räumen, reinigen, transportieren und übergeben Ihre Immobilie termingerecht und besenrein.
          </p>

          {/* Quick Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: 'all', label: 'Alle Leistungen (7)' },
              { id: 'privat', label: 'Privathaushalte & Umzüge' },
              { id: 'gewerbe', label: 'Gewerbe & Entkernung' },
              { id: 'special', label: 'Winterdienst & Notdienst' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeCategory === tab.id
                    ? 'bg-[#2D6A4F] text-white shadow-sm'
                    : 'bg-[#FAF8F5] text-neutral-600 hover:bg-neutral-100 border border-[#E8E2DA]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service: ServiceItem) => {
            const Icon = getServiceIcon(service.iconName);
            return (
              <div
                key={service.id}
                className="bg-[#FAF8F5] rounded-3xl p-7 border border-[#E8E2DA] hover:border-[#2D6A4F]/40 shadow-soft hover:shadow-premium transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Header with Icon and Badge */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-white text-[#2D6A4F] border border-[#E8E2DA] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    {service.badge && (
                      <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#1B4332] text-[11px] font-extrabold uppercase tracking-wider">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-black text-[#1A1A1A] mb-2 group-hover:text-[#2D6A4F] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs text-neutral-600 font-semibold mb-4 leading-relaxed">
                    {service.shortDesc}
                  </p>

                  <p className="text-xs text-neutral-500 mb-6 leading-relaxed">
                    {service.longDesc}
                  </p>

                  {/* Bullet points */}
                  <div className="space-y-2 mb-6">
                    {service.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2 text-xs text-neutral-700">
                        <Check className="w-4 h-4 text-[#2D6A4F] flex-shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer with Starting Price & CTA */}
                <div className="pt-4 border-t border-[#E8E2DA] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                      Richtpreis
                    </span>
                    <span className="text-sm font-black text-[#1A1A1A]">
                      {service.startingPrice}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectService(service.title);
                      onOpenContact();
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-[#2D6A4F] text-[#1B4332] hover:text-white font-bold text-xs border border-[#E8E2DA] hover:border-transparent transition-all shadow-sm"
                  >
                    <span>Anfragen</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Emergency Callout Card */}
        <div className="mt-12 bg-amber-50 rounded-3xl p-6 sm:p-8 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-[#1A1A1A] flex items-center justify-center flex-shrink-0 font-bold">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-black text-[#1A1A1A]">
                Brauchen Sie eine Räumung in den nächsten 24 bis 48 Stunden?
              </h4>
              <p className="text-xs sm:text-sm text-neutral-700 mt-0.5">
                Unser Notdienst steht Ihnen auch am Wochenende und Feiertagen ohne Zusatzgebühren zur Seite.
              </p>
            </div>
          </div>

          <a
            href={`tel:${COMPANY_INFO.mobileClean}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1A1A1A] hover:bg-neutral-800 text-white font-bold text-sm flex-shrink-0 transition-colors shadow"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            <span>Notruf: {COMPANY_INFO.mobile}</span>
          </a>
        </div>

      </div>
    </section>
  );
};
