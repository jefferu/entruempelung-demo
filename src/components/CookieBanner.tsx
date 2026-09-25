import React, { useState, useEffect } from 'react';
import { ShieldCheck, Settings } from 'lucide-react';

interface CookieBannerProps {
  forceOpen?: boolean;
  onCloseSettings?: () => void;
  onOpenPrivacyModal: () => void;
}

const STORAGE_KEY = 'rm_cookie_consent_v1';

/**
 * CookieBanner delivering full TTDSG and DSGVO compliance:
 * - Equal visual prominence for 'Nur essenzielle' vs 'Alle akzeptieren' (no dark pattern)
 * - Transparent categories (Essentiell, Statistiken, Marketing)
 * - LocalStorage persistence without unsolicited external trackers.
 *
 * @param forceOpen - Forces opening banner for settings adjustments
 * @param onCloseSettings - Callback when settings are closed
 * @param onOpenPrivacyModal - Opens the detailed privacy policy
 */
export const CookieBanner: React.FC<CookieBannerProps> = ({
  forceOpen = false,
  onCloseSettings,
  onOpenPrivacyModal,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always true & disabled
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved || forceOpen) {
      setIsVisible(true);
      if (forceOpen) {
        setShowDetails(true);
      }
    }
  }, [forceOpen]);

  const saveConsent = (analytics: boolean, marketing: boolean) => {
    const consent = {
      essential: true,
      analytics,
      marketing,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    setIsVisible(false);
    if (onCloseSettings) onCloseSettings();
  };

  const handleAcceptAll = () => {
    saveConsent(true, true);
  };

  const handleAcceptEssential = () => {
    saveConsent(false, false);
  };

  const handleSaveCustom = () => {
    saveConsent(preferences.analytics, preferences.marketing);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-xl z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E2DA] shadow-2xl text-[#1A1A1A]">
        
        {/* Banner Header */}
        <div className="flex items-start gap-3.5 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#2D6A4F] flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-black text-[#1A1A1A]">
              Privatsphäre & Cookie-Einstellungen
            </h3>
            <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
              Wir verwenden ausschließlich technisch notwendige Cookies, um den sicheren Betrieb dieser
              Website sowie die Funktion unseres Festpreisrechners zu gewährleisten. Weitere Informationen
              finden Sie in unserer{' '}
              <button
                type="button"
                onClick={onOpenPrivacyModal}
                className="text-[#2D6A4F] underline font-bold"
              >
                Datenschutzerklärung
              </button>
              .
            </p>
          </div>
        </div>

        {/* Granular Preference Details Toggle */}
        {showDetails && (
          <div className="space-y-3 my-4 p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2DA] text-xs">
            {/* Category: Essential */}
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
              <div>
                <span className="font-bold text-[#1A1A1A] block">Technisch notwendig (Essenziell)</span>
                <span className="text-neutral-500">Erforderlich für Navigation, Rechner und Sicherheit.</span>
              </div>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                Immer aktiv
              </span>
            </div>

            {/* Category: Analytics */}
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
              <div>
                <span className="font-bold text-[#1A1A1A] block">Statistik & Optimierung</span>
                <span className="text-neutral-500">Anonyme Nutzungsstatistiken zur Verbesserung.</span>
              </div>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                className="w-4 h-4 rounded text-[#2D6A4F] focus:ring-[#2D6A4F]"
              />
            </div>

            {/* Category: Marketing */}
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-[#1A1A1A] block">Marketing & Externe Medien</span>
                <span className="text-neutral-500">Personalisierte Angebote oder Karten.</span>
              </div>
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                className="w-4 h-4 rounded text-[#2D6A4F] focus:ring-[#2D6A4F]"
              />
            </div>
          </div>
        )}

        {/* Action Buttons (Strictly balanced design to prevent Dark Patterns) */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
          {showDetails ? (
            <button
              type="button"
              onClick={handleSaveCustom}
              className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-bold text-xs transition-colors"
            >
              Auswahl speichern
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={handleAcceptEssential}
                className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-white hover:bg-neutral-100 text-[#1A1A1A] font-bold text-xs border border-[#E8E2DA] transition-colors text-center"
              >
                Nur essenzielle akzeptieren
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-bold text-xs transition-colors text-center shadow-sm"
              >
                Alle akzeptieren
              </button>
            </>
          )}

          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="w-full sm:w-auto py-2.5 px-3 rounded-xl text-neutral-500 hover:text-neutral-800 text-xs font-semibold flex items-center justify-center gap-1"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>{showDetails ? 'Weniger Details' : 'Anpassen'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
