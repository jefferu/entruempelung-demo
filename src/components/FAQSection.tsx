import React, { useState } from 'react';
import { ChevronDown, Phone, ArrowRight } from 'lucide-react';
import { FAQ_LIST, COMPANY_INFO } from '../data/content';

interface FAQSectionProps {
  onOpenContact: () => void;
}

/**
 * FAQSection providing an accessible accordion interface addressing pricing,
 * procedural execution, GDPR handling and insurance coverage.
 *
 * @param onOpenContact - Navigation callback to contact form
 */
export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenContact }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-white border-b border-[#E8E2DA]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-extrabold text-[#2D6A4F] uppercase tracking-wider block mb-2">
            Häufige Fragen
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1A1A] tracking-tight">
            Alles, was Sie vorab wissen möchten
          </h2>
          <p className="text-neutral-600 text-base sm:text-lg mt-4">
            Transparente Antworten auf die wichtigsten Fragen rund um Ablauf, Kosten und Rechtssicherheit.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4 mb-12">
          {FAQ_LIST.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#FAF8F5] rounded-2xl border border-[#E8E2DA] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-[#1A1A1A] hover:text-[#2D6A4F] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <div
                    className={`w-8 h-8 rounded-full bg-white border border-[#E8E2DA] flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-emerald-50 text-[#2D6A4F]' : 'text-neutral-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-neutral-600 leading-relaxed border-t border-neutral-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support callout */}
        <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-8 border border-[#E8E2DA] text-center">
          <h3 className="text-lg font-black text-[#1A1A1A] mb-2">
            Haben Sie eine spezielle Frage zu Ihrem Auftrag?
          </h3>
          <p className="text-sm text-neutral-600 max-w-xl mx-auto mb-6">
            Unser Beraterteam beantwortet Ihre Fragen gerne persönlich am Telefon oder unverbindlich per E-Mail.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`tel:${COMPANY_INFO.phoneClean}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-bold text-sm shadow transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{COMPANY_INFO.phone} anrufen</span>
            </a>

            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-neutral-100 text-[#1B4332] font-bold text-sm border border-[#E8E2DA] transition-colors"
            >
              <span>Nachricht schreiben</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
