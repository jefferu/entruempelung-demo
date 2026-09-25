import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { SERVICE_AREAS, COMPANY_INFO } from '../data/content';

interface ServiceAreasProps {
  onSelectCity?: (city: string) => void;
}

/**
 * ServiceAreas component displaying all regional coverage zones across the Rhein-Main metropolitan area.
 * Clarifies the 0 € transit policy across Frankfurt, Darmstadt, Mainz, Wiesbaden and neighboring counties.
 *
 * @param onSelectCity - Optional handler when user clicks a specific operational hub
 */
export const ServiceAreas: React.FC<ServiceAreasProps> = ({ onSelectCity }) => {
  return (
    <section id="einsatzgebiet" className="py-16 md:py-24 bg-white border-b border-[#E8E2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold text-[#2D6A4F] uppercase tracking-wider block mb-2">
            Regional verwurzelt
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1A1A] tracking-tight">
            Unser Einsatzgebiet: Das gesamte Rhein-Main-Gebiet
          </h2>
          <p className="text-neutral-600 text-base sm:text-lg mt-4">
            Von unserer zentralen Einsatzbasis im Rhein-Main-Gebiet bedienen wir alle Städte und Gemeinden 
            schnell und ohne Anfahrtskosten.
          </p>
        </div>

        {/* Hubs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {SERVICE_AREAS.map((area, idx) => (
            <div
              key={idx}
              onClick={() => onSelectCity && onSelectCity(area.name)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                area.highlight
                  ? 'bg-emerald-50/60 border-emerald-300 shadow-sm hover:border-[#2D6A4F]'
                  : 'bg-[#FAF8F5] border-[#E8E2DA] hover:border-neutral-300'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E8E2DA] text-[#2D6A4F] flex items-center justify-center flex-shrink-0 shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#1A1A1A] text-sm sm:text-base">
                    {area.name}
                  </h4>
                  <span className="text-xs text-neutral-500 font-medium">
                    PLZ {area.postalPrefix}
                  </span>
                </div>
              </div>

              <span className="text-xs font-bold text-emerald-800 bg-white px-2.5 py-1 rounded-lg border border-emerald-200">
                {area.transitCost}
              </span>
            </div>
          ))}
        </div>

        {/* Reassurance Banner */}
        <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-8 border border-[#E8E2DA] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#2D6A4F] text-white flex items-center justify-center flex-shrink-0">
              <Navigation className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-black text-[#1A1A1A]">
                Ihre Ortschaft ist nicht explizit aufgeführt?
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 mt-0.5">
                Wir fahren jeden Ort im Umkreis von bis zu 60 km im Rhein-Main-Gebiet an – rufen Sie uns einfach an!
              </p>
            </div>
          </div>

          <a
            href={`tel:${COMPANY_INFO.phoneClean}`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-neutral-50 text-[#1B4332] font-bold text-xs sm:text-sm border border-[#E8E2DA] shadow-sm transition-colors flex-shrink-0"
          >
            <span>{COMPANY_INFO.phone} anrufen</span>
          </a>
        </div>

      </div>
    </section>
  );
};
