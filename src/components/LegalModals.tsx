import React, { useEffect } from 'react';
import { X, ShieldCheck, Scale } from 'lucide-react';
import { LegalModalType } from '../types';
import { COMPANY_INFO } from '../data/content';

interface LegalModalsProps {
  modalType: LegalModalType;
  onClose: () => void;
}

/**
 * LegalModals rendering statutory German legal disclosures:
 * - Impressum according to § 5 DDG (Digitale-Dienste-Gesetz, formerly TMG)
 * - Datenschutzerklärung conforming strictly to EU-DSGVO (Art. 12, 13, 14, 21 DSGVO).
 *
 * @param modalType - Active modal ('impressum' | 'datenschutz' | null)
 * @param onClose - Modal dismiss callback
 */
export const LegalModals: React.FC<LegalModalsProps> = ({ modalType, onClose }) => {
  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (modalType) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [modalType, onClose]);

  if (!modalType) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-[#E8E2DA] flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-[#E8E2DA] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#2D6A4F] flex items-center justify-center">
              {modalType === 'impressum' ? (
                <Scale className="w-5 h-5" />
              ) : (
                <ShieldCheck className="w-5 h-5" />
              )}
            </div>
            <div>
              <h3 className="text-xl font-black text-[#1A1A1A]">
                {modalType === 'impressum' ? 'Impressum' : 'Datenschutzerklärung'}
              </h3>
              <span className="text-xs text-neutral-500 font-medium">
                {modalType === 'impressum'
                  ? 'Angaben gemäß § 5 DDG'
                  : 'Informationen zur Datenverarbeitung nach Art. 13 DSGVO'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-500 hover:text-[#1A1A1A] hover:bg-neutral-100 transition-colors"
            aria-label="Schließen"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto text-sm text-neutral-700 leading-relaxed space-y-6">
          {modalType === 'impressum' ? (
            /* Impressum Content */
            <>
              <div>
                <h4 className="font-bold text-base text-[#1A1A1A] mb-2">Angaben gemäß § 5 DDG:</h4>
                <p>
                  <strong>{COMPANY_INFO.legalName}</strong>
                  <br />
                  {COMPANY_INFO.address}
                  <br />
                  {COMPANY_INFO.postalCode} {COMPANY_INFO.city}
                  <br />
                  Deutschland
                </p>
              </div>

              <div>
                <h4 className="font-bold text-base text-[#1A1A1A] mb-2">Kontakt:</h4>
                <p>
                  Telefon: {COMPANY_INFO.phone}
                  <br />
                  Mobil (24/7 Notdienst): {COMPANY_INFO.mobile}
                  <br />
                  E-Mail:{' '}
                  <a href={`mailto:${COMPANY_INFO.email}`} className="text-[#2D6A4F] underline">
                    {COMPANY_INFO.email}
                  </a>
                  <br />
                  Webseite:{' '}
                  <a href={COMPANY_INFO.website} target="_blank" rel="noopener noreferrer" className="text-[#2D6A4F] underline">
                    {COMPANY_INFO.website}
                  </a>
                </p>
              </div>

              <div>
                <h4 className="font-bold text-base text-[#1A1A1A] mb-2">
                  Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV:
                </h4>
                <p>
                  {COMPANY_INFO.legalName}
                  <br />
                  {COMPANY_INFO.address}
                  <br />
                  {COMPANY_INFO.postalCode} {COMPANY_INFO.city}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-base text-[#1A1A1A] mb-2">
                  Angaben zur Betriebshaftpflichtversicherung:
                </h4>
                <p>
                  Es besteht eine vollumfängliche gewerbliche Betriebshaftpflichtversicherung für
                  sämtliche durchgeführte Entrümpelungs-, Demontage-, Transport- und Räumungsarbeiten
                  mit Geltungsbereich im gesamten Bundesgebiet.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-base text-[#1A1A1A] mb-2">
                  EU-Streitschlichtung:
                </h4>
                <p>
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
                  <br />
                  <a
                    href="https://ec.europa.eu/consumers/odr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2D6A4F] underline"
                  >
                    https://ec.europa.eu/consumers/odr/
                  </a>
                  <br />
                  Unsere E-Mail-Adresse finden Sie oben im Impressum.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-base text-[#1A1A1A] mb-2">
                  Verbraucherstreitbeilegung / Universalschlichtungsstelle:
                </h4>
                <p>
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-base text-[#1A1A1A] mb-2">Haftung für Inhalte:</h4>
                <p>
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG / DDG für eigene Inhalte auf diesen Seiten nach den
                  allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
                  verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
                  zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-base text-[#1A1A1A] mb-2">Haftung für Links:</h4>
                <p>
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
                  Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
                  verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                </p>
              </div>
            </>
          ) : (
            /* Datenschutzerklärung Content */
            <>
              <div>
                <h4 className="font-bold text-base text-[#1A1A1A] mb-2">
                  1. Datenschutz auf einen Blick
                </h4>
                <p>
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen
                  Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen
                  Sie persönlich identifiziert werden können.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-base text-[#1A1A1A] mb-2">
                  2. Verantwortliche Stelle
                </h4>
                <p>
                  Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der DSGVO ist:
                  <br />
                  <strong>{COMPANY_INFO.legalName}</strong>
                  <br />
                  {COMPANY_INFO.address}
                  <br />
                  {COMPANY_INFO.postalCode} {COMPANY_INFO.city}
                  <br />
                  Telefon: {COMPANY_INFO.phone}
                  <br />
                  E-Mail:{' '}
                  <a href={`mailto:${COMPANY_INFO.email}`} className="text-[#2D6A4F] underline">
                    {COMPANY_INFO.email}
                  </a>
                </p>
              </div>

              <div>
                <h4 className="font-bold text-base text-[#1A1A1A] mb-2">
                  3. Wie erfassen wir Ihre Daten?
                </h4>
                <p className="mb-2">
                  Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B.
                  um Daten handeln, die Sie in ein Kontaktformular eingeben oder uns per E-Mail / Telefon mitteilen.
                </p>
                <p>
                  Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere
                  IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder
                  Uhrzeit des Seitenaufrufs).
                </p>
              </div>

              <div>
                <h4 className="font-bold text-base text-[#1A1A1A] mb-2">
                  4. Wofür nutzen wir Ihre Daten?
                </h4>
                <p>
                  Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten.
                  Andere Daten (insbesondere Anfragedaten aus dem Kontakt- und Kostenschätzungsformular) werden zur
                  Angebotserstellung, Terminabsprache und Abwicklung der Dienstleistung verarbeitet
                  (Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO).
                </p>
              </div>

              <div>
                <h4 className="font-bold text-base text-[#1A1A1A] mb-2">
                  5. Kontaktformular & Angebotsanfrage
                </h4>
                <p>
                  Wenn Sie uns per Kontaktformular oder E-Mail Anfragen zukommen lassen, werden Ihre Angaben aus dem
                  Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage
                  und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre
                  Einwilligung weiter.
                </p>
                <p className="mt-2">
                  Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre
                  Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher
                  Maßnahmen erforderlich ist.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-base text-[#1A1A1A] mb-2">
                  6. Keine Übermittlung in unsichere Drittstaaten & Lokale Schriften
                </h4>
                <p>
                  Diese Website verzichtet bewusst auf die Einbindung von externen Schriftarten-Diensten (wie Google Fonts
                  über US-Server), um Ihre IP-Adresse nicht unkontrolliert an Drittstaaten zu übertragen. Sämtliche
                  Schriftarten und Ressourcen werden lokal über den eigenen Webserver bereitgestellt.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-base text-[#1A1A1A] mb-2">
                  7. Welche Rechte haben Sie bezüglich Ihrer Daten?
                </h4>
                <p className="mb-2">
                  Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer
                  gespeicherten personenbezogenen Daten zu erhalten (Art. 15 DSGVO). Sie haben außerdem ein Recht,
                  die Berichtigung (Art. 16 DSGVO) oder Löschung (Art. 17 DSGVO) dieser Daten zu verlangen.
                </p>
                <p>
                  Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu (Der Hessische
                  Beauftragte für Datenschutz und Informationsfreiheit, Gustav-Stresemann-Ring 1, 65189 Wiesbaden).
                </p>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-[#E8E2DA] bg-[#FAF8F5] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-bold text-sm transition-colors"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};
