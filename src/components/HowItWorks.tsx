import React from 'react';
import { Camera, FileText, CheckCheck, ArrowRight, MessageSquare } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

interface HowItWorksProps {
  onOpenEstimator: () => void;
  onOpenContact: () => void;
}

/**
 * How it works section outlining the 3-step streamlined customer journey.
 * Outlines the seamless 3-step clearance standard: Foto senden -> Festpreis -> Besenrein.
 *
 * @param onOpenEstimator - Triggers calculation workflow
 * @param onOpenContact - Triggers consultation contact
 */
export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenEstimator, onOpenContact }) => {
  const steps = [
    {
      step: '01',
      title: 'Fotos senden oder Termin buchen',
      desc: 'Fotografieren Sie Ihre Räume bequem mit dem Smartphone und senden Sie uns die Bilder per WhatsApp, oder vereinbaren Sie eine 100% kostenlose Vor-Ort-Besichtigung.',
      icon: Camera,
      tag: 'Bequem & Unkompliziert',
    },
    {
      step: '02',
      title: 'Verbindliches Festpreisangebot',
      desc: 'Wir analysieren den Aufwand, prüfen mögliche Wertanrechnungen für Möbel und Antiquitäten und unterbreiten Ihnen ein verbindliches Pauschalangebot ohne versteckte Kosten.',
      icon: FileText,
      tag: '100% Planungssicherheit',
    },
    {
      step: '03',
      title: 'Räumung & besenreine Übergabe',
      desc: 'Unser eingespieltes Team räumt pünktlich, fachgerecht und sauber. Am Ende übergeben wir Ihnen die Räumlichkeiten besenrein – bereit für Vermieter oder Käufer.',
      icon: CheckCheck,
      tag: 'Stressfrei geschafft',
    },
  ];

  return (
    <section id="ablauf" className="py-16 md:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold text-[#2D6A4F] uppercase tracking-wider block mb-2">
            In 3 einfachen Schritten
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1A1A] tracking-tight">
            So einfach läuft Ihre Entrümpelung ab
          </h2>
          <p className="text-neutral-600 text-base sm:text-lg mt-4">
            Sie müssen vorab nichts schleppen oder abbauen. Wir nehmen Ihnen die gesamte Arbeit von A bis Z ab.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative mb-12">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative bg-white rounded-3xl p-8 border border-[#E8E2DA] shadow-soft hover:shadow-premium transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl font-black text-[#2D6A4F]/20 font-mono">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#2D6A4F] flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <span className="inline-block px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#E8E2DA] text-[11px] font-bold text-neutral-600 mb-3">
                    {item.tag}
                  </span>

                  <h3 className="text-xl font-black text-[#1A1A1A] mb-3">
                    {item.title}
                  </h3>

                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center text-xs font-bold text-[#2D6A4F]">
                  <span>Schritt {idx + 1} von 3</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick action bar */}
        <div className="bg-[#1B4332] rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-premium">
          <div>
            <h4 className="text-xl font-bold mb-1">
              Haben Sie Fotos Ihrer Räumlichkeiten parat?
            </h4>
            <p className="text-sm text-emerald-200">
              Senden Sie uns einfach 2–4 Schnappschüsse via WhatsApp für eine Ersteinschätzung in Rekordzeit.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <a
              href={`https://wa.me/${COMPANY_INFO.mobileClean.replace('+', '')}?text=${encodeURIComponent(
                'Hallo Räumprofis, ich habe Fotos für ein Räumungsangebot.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-sm transition-colors shadow flex-1 md:flex-initial"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp-Chat starten</span>
            </a>

            <button
              onClick={onOpenEstimator}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-neutral-100 text-[#1B4332] font-bold text-sm transition-colors flex-1 md:flex-initial"
            >
              <span>Kosten vorab schätzen</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenContact}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-colors flex-1 md:flex-initial"
            >
              <span>Besichtigung anfragen</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
