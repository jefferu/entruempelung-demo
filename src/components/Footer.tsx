import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { COMPANY_INFO, SERVICES_LIST } from '../data/content';

interface FooterProps {
  onOpenImpressum: () => void;
  onOpenDatenschutz: () => void;
  onOpenCookieSettings: () => void;
}

/**
 * Footer component providing comprehensive site mapping, direct contact triggers,
 * regulatory legal disclosures (Impressum, Datenschutz) and cookie preference settings.
 *
 * @param onOpenImpressum - Opens the statutory Impressum modal
 * @param onOpenDatenschutz - Opens the GDPR Datenschutzerklärung modal
 * @param onOpenCookieSettings - Re-opens the cookie banner configuration
 */
export const Footer: React.FC<FooterProps> = ({
  onOpenImpressum,
  onOpenDatenschutz,
  onOpenCookieSettings,
}) => {
  return (
    <footer className="bg-[#FAF8F5] border-t border-[#E8E2DA] pt-16 pb-12 text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#E8E2DA]">
          
          {/* Brand & Address Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2D6A4F] text-white flex items-center justify-center font-bold text-xl shadow-sm">
                RR
              </div>
              <span className="font-black text-xl tracking-tight">
                {COMPANY_INFO.name}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-sm">
              Ihr zuverlässiger und erfahrener Partner für professionelle Haushaltsauflösungen,
              Entrümpelungen, Umzüge und Entkernungen im gesamten Rhein-Main-Gebiet.
            </p>

            <div className="space-y-2 text-xs text-neutral-700 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#2D6A4F] flex-shrink-0 mt-0.5" />
                <span>
                  {COMPANY_INFO.legalName}
                  <br />
                  {COMPANY_INFO.address}, {COMPANY_INFO.postalCode} {COMPANY_INFO.city}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#2D6A4F] flex-shrink-0" />
                <a href={`tel:${COMPANY_INFO.phoneClean}`} className="hover:text-[#2D6A4F] font-semibold">
                  Telefon: {COMPANY_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <a href={`tel:${COMPANY_INFO.mobileClean}`} className="hover:text-[#2D6A4F] font-semibold">
                  24/7 Mobil: {COMPANY_INFO.mobile}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#2D6A4F] flex-shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-[#2D6A4F]">
                  {COMPANY_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-[#2D6A4F]">
              Unsere Leistungen
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-neutral-600">
              {SERVICES_LIST.map((s) => (
                <li key={s.id}>
                  <a href="#leistungen" className="hover:text-[#2D6A4F] transition-colors">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Regional Areas Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-[#2D6A4F]">
              Einsatzregionen (0€ Anfahrt)
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-neutral-600">
              <li><a href="#einsatzgebiet" className="hover:text-[#2D6A4F]">Darmstadt & Umgebung</a></li>
              <li><a href="#einsatzgebiet" className="hover:text-[#2D6A4F]">Frankfurt am Main & Offenbach</a></li>
              <li><a href="#einsatzgebiet" className="hover:text-[#2D6A4F]">Wiesbaden & Mainz</a></li>
              <li><a href="#einsatzgebiet" className="hover:text-[#2D6A4F]">Groß-Gerau & Rüsselsheim</a></li>
              <li><a href="#einsatzgebiet" className="hover:text-[#2D6A4F]">Weiterstadt & Griesheim</a></li>
              <li><a href="#einsatzgebiet" className="hover:text-[#2D6A4F]">Dieburg & Landkreis Darmstadt-Dieburg</a></li>
            </ul>
          </div>

          {/* Legal and Guarantees Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-[#2D6A4F]">
              Rechtliches & DSGVO
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-neutral-600">
              <li>
                <button
                  type="button"
                  onClick={onOpenImpressum}
                  className="hover:text-[#2D6A4F] text-left underline"
                >
                  Impressum (§ 5 DDG)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenDatenschutz}
                  className="hover:text-[#2D6A4F] text-left underline"
                >
                  Datenschutzerklärung (DSGVO)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenCookieSettings}
                  className="hover:text-[#2D6A4F] text-left underline text-neutral-500"
                >
                  Cookie-Einstellungen
                </button>
              </li>
            </ul>

            <div className="pt-4 text-[11px] text-neutral-500 space-y-1">
              <span className="block font-bold text-neutral-700">Betriebshaftpflicht:</span>
              <span>Vollumfänglich versichert bei Personen- und Sachschäden.</span>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <div>
            © {new Date().getFullYear()} {COMPANY_INFO.name} · {COMPANY_INFO.address}, {COMPANY_INFO.postalCode} {COMPANY_INFO.city}.
            Alle Rechte vorbehalten.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onOpenImpressum} className="hover:text-[#2D6A4F]">
              Impressum
            </button>
            <span>·</span>
            <button onClick={onOpenDatenschutz} className="hover:text-[#2D6A4F]">
              Datenschutz
            </button>
            <span>·</span>
            <span>Made with precision</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
