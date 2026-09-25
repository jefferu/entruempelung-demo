import React, { useState, useRef } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  ShieldCheck,
  FileCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { COMPANY_INFO, SERVICES_LIST } from '../data/content';
import { InquiryPayload } from '../types';

interface ContactSectionProps {
  initialService?: string;
  initialEstimateNote?: string;
  onOpenPrivacyModal: () => void;
}

/**
 * ContactSection handling inquiries, photo uploads and explicit GDPR/DSGVO consent verification.
 * Adheres strictly to Art. 6 Abs. 1 lit. a/b DSGVO requirements for lead submission.
 *
 * @param initialService - Pre-selected service passed from service selection cards
 * @param initialEstimateNote - Pre-filled estimate notes passed from the quick calculator
 * @param onOpenPrivacyModal - Opens the interactive GDPR privacy policy modal
 */
export const ContactSection: React.FC<ContactSectionProps> = ({
  initialService = 'Haushaltsauflösung & Nachlassräumung',
  initialEstimateNote = '',
  onOpenPrivacyModal,
}) => {
  const [formData, setFormData] = useState<InquiryPayload>({
    name: '',
    email: '',
    phone: '',
    city: 'Frankfurt am Main',
    service: initialService,
    estimatedArea: '',
    preferredDate: '',
    notes: initialEstimateNote,
    gdprAccepted: false,
  });

  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update notes if passed from outside
  React.useEffect(() => {
    if (initialEstimateNote) {
      setFormData((prev) => ({
        ...prev,
        notes: prev.notes ? `${prev.notes}\n${initialEstimateNote}` : initialEstimateNote,
      }));
    }
  }, [initialEstimateNote]);

  // Handle local file preview selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((f) => f.name);
      setUploadedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Strict validation
    if (!formData.name.trim()) {
      setErrorMsg('Bitte geben Sie Ihren Namen an.');
      return;
    }
    if (!formData.phone.trim() && !formData.email.trim()) {
      setErrorMsg('Bitte geben Sie eine Telefonnummer oder eine E-Mail-Adresse für den Rückruf an.');
      return;
    }
    if (!formData.gdprAccepted) {
      setErrorMsg(
        'Bitte bestätigen Sie die Datenschutzerklärung gemäß DSGVO, um Ihre Anfrage absenden zu können.'
      );
      return;
    }

    setIsSubmitting(true);

    // Simulate reliable dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#2D6A4F', '#52B788', '#F59E0B'],
        });
      } catch (err) {
        // Safe fallback
      }
    }, 800);
  };

  return (
    <section id="kontakt" className="py-16 md:py-24 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold text-[#2D6A4F] uppercase tracking-wider block mb-2">
            Unverbindlich & Kostenlos
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1A1A] tracking-tight">
            Kostenloses Angebot & Besichtigung anfragen
          </h2>
          <p className="text-neutral-600 text-base sm:text-lg mt-4">
            Beschreiben Sie Ihr Anliegen oder senden Sie uns Fotos für ein verbindliches Festpreisangebot.
            Wir melden uns in der Regel innerhalb von 2 Stunden zurück.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Direct Contact Information Cards (Left) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Call Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2DA] shadow-soft">
              <h3 className="text-xl font-black text-[#1A1A1A] mb-4">
                Schnellkontakt per Telefon & WhatsApp
              </h3>

              <div className="space-y-4 text-sm">
                <a
                  href={`tel:${COMPANY_INFO.phoneClean}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2DA] hover:border-[#2D6A4F] transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#2D6A4F] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500 font-semibold block">Zentrale Darmstadt</span>
                    <span className="text-base font-extrabold text-[#1A1A1A] group-hover:text-[#2D6A4F]">
                      {COMPANY_INFO.phone}
                    </span>
                  </div>
                </a>

                <a
                  href={`tel:${COMPANY_INFO.mobileClean}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2DA] hover:border-[#2D6A4F] transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500 font-semibold block">24/7 Notdienst & Mobil</span>
                    <span className="text-base font-extrabold text-[#1A1A1A] group-hover:text-[#2D6A4F]">
                      {COMPANY_INFO.mobile}
                    </span>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${COMPANY_INFO.mobileClean.replace('+', '')}?text=${encodeURIComponent(
                    'Hallo Räumprofis, ich möchte gerne Fotos von meiner Wohnung/meinem Keller für ein Angebot senden.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-500 text-white hover:bg-emerald-600 transition-all shadow group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-emerald-100 font-semibold block">Direkt via WhatsApp</span>
                    <span className="text-base font-extrabold">
                      Fotos senden & Festpreis erhalten
                    </span>
                  </div>
                </a>
              </div>

              {/* Postal Address */}
              <div className="mt-8 pt-6 border-t border-[#E8E2DA] space-y-3 text-xs text-neutral-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#2D6A4F] flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>{COMPANY_INFO.legalName}</strong>
                    <br />
                    {COMPANY_INFO.address}, {COMPANY_INFO.postalCode} {COMPANY_INFO.city}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#2D6A4F] flex-shrink-0" />
                  <a href={`mailto:${COMPANY_INFO.email}`} className="hover:underline font-semibold">
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            {/* GDPR Trust reassurance card */}
            <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#2D6A4F] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block mb-0.5">DSGVO-zertifizierter Datenschutz:</strong>
                Ihre Daten werden verschlüsselt übertragen, ausschließlich zur Bearbeitung Ihrer Räumungsanfrage
                genutzt und niemals an unbefugte Dritte weitergegeben.
              </div>
            </div>

          </div>

          {/* Interactive Inquiry Form (Right) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E2DA] shadow-premium">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#2D6A4F] flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-[#1A1A1A]">
                  Vielen Dank für Ihre Anfrage!
                </h3>
                <p className="text-neutral-600 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
                  Wir haben Ihre Daten erfolgreich erhalten. Ein Mitarbeiter unseres Teams 
                  wird sich in Kürze telefonisch oder per E-Mail für die kostenlose Besichtigung bei Ihnen melden.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setUploadedFiles([]);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E2DA] text-xs font-bold text-neutral-700 hover:bg-neutral-100"
                  >
                    Weitere Anfrage senden
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div>
                  <h3 className="text-xl font-black text-[#1A1A1A] mb-1">
                    Anfrageformular für Festpreisangebot
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Felder mit * sind Pflichtangaben. 100% kostenfrei und unverbindlich.
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Service Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-600 mb-2">
                    Gewünschte Leistung *
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8E2DA] bg-[#FAF8F5] text-sm font-semibold text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                  >
                    {SERVICES_LIST.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Name & City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-600 mb-2">
                      Ihr vollständiger Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="z.B. Maria Schmidt"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E8E2DA] bg-[#FAF8F5] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-600 mb-2">
                      Ort / PLZ des Objekts *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="z.B. 64287 Darmstadt"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E8E2DA] bg-[#FAF8F5] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                    />
                  </div>
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-600 mb-2">
                      Telefonnummer (für Rückfragen) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="z.B. 0173 1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E8E2DA] bg-[#FAF8F5] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-600 mb-2">
                      E-Mail-Adresse
                    </label>
                    <input
                      type="email"
                      placeholder="name@beispiel.de"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E8E2DA] bg-[#FAF8F5] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                    />
                  </div>
                </div>

                {/* Approximate Area & Preferred Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-600 mb-2">
                      Geschätzte Fläche (m²) / Umfang
                    </label>
                    <input
                      type="text"
                      placeholder="z.B. ca. 60 m² / 3 Zimmer"
                      value={formData.estimatedArea}
                      onChange={(e) => setFormData({ ...formData, estimatedArea: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E8E2DA] bg-[#FAF8F5] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-600 mb-2">
                      Wunschtermin / Frist
                    </label>
                    <input
                      type="text"
                      placeholder="z.B. So schnell wie möglich / KW 42"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E8E2DA] bg-[#FAF8F5] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                    />
                  </div>
                </div>

                {/* Notes & Description */}
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-600 mb-2">
                    Nachricht & Besonderheiten (z.B. Etage, Aufzug, Wertanrechnung)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Beschreiben Sie kurz die Räumlichkeiten oder welche Gegenstände vorhanden sind..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8E2DA] bg-[#FAF8F5] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                  />
                </div>

                {/* Instant Photo Upload Dropzone */}
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-600 mb-2">
                    Fotos hochladen (Optional – für Sofort-Schätzung)
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="p-5 border-2 border-dashed border-[#E8E2DA] hover:border-[#2D6A4F] bg-[#FAF8F5] rounded-2xl text-center cursor-pointer transition-colors"
                  >
                    <UploadCloud className="w-8 h-8 text-[#2D6A4F] mx-auto mb-2" />
                    <span className="text-xs font-bold text-[#1A1A1A] block">
                      Klicken oder Fotos hierher ziehen
                    </span>
                    <span className="text-[11px] text-neutral-500">
                      JPG, PNG bis max. 10 MB pro Bild
                    </span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {uploadedFiles.map((fn, idx) => (
                        <div
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 text-[#1B4332] text-xs font-semibold flex items-center gap-1.5 border border-emerald-200"
                        >
                          <FileCheck className="w-3.5 h-3.5 text-[#2D6A4F]" />
                          <span>{fn}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Strict GDPR/DSGVO Compliance Checkbox according to German Law */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      required
                      checked={formData.gdprAccepted}
                      onChange={(e) => setFormData({ ...formData, gdprAccepted: e.target.checked })}
                      className="w-4 h-4 rounded text-[#2D6A4F] focus:ring-[#2D6A4F] mt-1"
                    />
                    <span className="text-xs text-neutral-600 leading-relaxed">
                      Ich willige ein, dass meine Angaben zur Bearbeitung meiner Anfrage erhoben,
                      gespeichert und verarbeitet werden. Hinweis: Sie können Ihre Einwilligung jederzeit 
                      für die Zukunft per E-Mail an{' '}
                      <span className="text-[#1A1A1A] font-semibold">{COMPANY_INFO.email}</span> widerrufen. 
                      Ausführliche Hinweise finden Sie in unserer{' '}
                      <button
                        type="button"
                        onClick={onOpenPrivacyModal}
                        className="text-[#2D6A4F] underline font-bold hover:text-[#1B4332]"
                      >
                        Datenschutzerklärung
                      </button>
                      .*
                    </span>
                  </label>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-[#2D6A4F] hover:bg-[#1B4332] disabled:opacity-60 text-white font-extrabold text-base shadow-premium transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                >
                  <Send className="w-5 h-5" />
                  <span>
                    {isSubmitting ? 'Wird übermittelt...' : 'Kostenloses Angebot jetzt absenden'}
                  </span>
                </button>

                <div className="text-center text-[11px] text-neutral-400">
                  Ihre Anfrage ist zu 100% unverbindlich. Es entstehen Ihnen keinerlei Kosten.
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
