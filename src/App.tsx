import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { QuickEstimator } from './components/QuickEstimator';
import { PriceExamples } from './components/PriceExamples';
import { HowItWorks } from './components/HowItWorks';
import { ServicesSection } from './components/ServicesSection';
import { WhyUs } from './components/WhyUs';
import { ServiceAreas } from './components/ServiceAreas';
import { ReviewsSection } from './components/ReviewsSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { LegalModals } from './components/LegalModals';
import { CookieBanner } from './components/CookieBanner';
import { LegalModalType } from './types';

/**
 * Root Application component orchestrating page flow, inter-component state transfer
 * and statutory GDPR/impressum modal lifecycles.
 */
export const App: React.FC = () => {
  const [legalModal, setLegalModal] = useState<LegalModalType>(null);
  const [cookieSettingsOpen, setCookieSettingsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('Haushaltsauflösung & Nachlassräumung');
  const [estimateNotes, setEstimateNotes] = useState<string>('');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (title: string) => {
    setSelectedService(title);
    scrollToSection('kontakt');
  };

  const handleEstimateTransfer = (summary: string) => {
    setEstimateNotes(summary);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1A1A1A]">
      {/* Navigation Header */}
      <Header
        onOpenEstimator={() => scrollToSection('preise')}
        onOpenContact={() => scrollToSection('kontakt')}
      />

      <main className="flex-grow">
        {/* Hero Section */}
        <Hero
          onOpenEstimator={() => scrollToSection('preise')}
          onOpenContact={() => scrollToSection('kontakt')}
          onSelectCategory={(category) => {
            setEstimateNotes((prev) => `${prev}\nGewählter Gegenstand / Kategorie: ${category}`.trim());
            scrollToSection('kontakt');
          }}
        />

        {/* Instant Quote Estimator */}
        <QuickEstimator
          onSelectEstimate={handleEstimateTransfer}
          onScrollToContact={() => scrollToSection('kontakt')}
        />

        {/* Transparent Sample Pricing Table */}
        <PriceExamples
          onOpenEstimator={() => scrollToSection('preise')}
          onOpenContact={() => scrollToSection('kontakt')}
        />

        {/* 3-Step Process */}
        <HowItWorks
          onOpenEstimator={() => scrollToSection('preise')}
          onOpenContact={() => scrollToSection('kontakt')}
        />

        {/* Services Catalog */}
        <ServicesSection
          onSelectService={handleSelectService}
          onOpenContact={() => scrollToSection('kontakt')}
        />

        {/* Values & Guarantees */}
        <WhyUs />

        {/* Regional Service Areas */}
        <ServiceAreas
          onSelectCity={(city) => {
            setEstimateNotes((prev) => `${prev}\nEinsatzort: ${city}`.trim());
            scrollToSection('kontakt');
          }}
        />

        {/* Customer Reviews & Google Rating */}
        <ReviewsSection />

        {/* Searchable FAQ Accordion */}
        <FAQSection onOpenContact={() => scrollToSection('kontakt')} />

        {/* Lead Inquiry & Photo Upload Form with GDPR Validation */}
        <ContactSection
          initialService={selectedService}
          initialEstimateNote={estimateNotes}
          onOpenPrivacyModal={() => setLegalModal('datenschutz')}
        />
      </main>

      {/* Footer with statutory disclosures and cookie preferences */}
      <Footer
        onOpenImpressum={() => setLegalModal('impressum')}
        onOpenDatenschutz={() => setLegalModal('datenschutz')}
        onOpenCookieSettings={() => setCookieSettingsOpen(true)}
      />

      {/* Statutory Legal Modals (Impressum & Datenschutzerklärung) */}
      <LegalModals modalType={legalModal} onClose={() => setLegalModal(null)} />

      {/* TTDSG / GDPR Cookie Consent Banner */}
      <CookieBanner
        forceOpen={cookieSettingsOpen}
        onCloseSettings={() => setCookieSettingsOpen(false)}
        onOpenPrivacyModal={() => setLegalModal('datenschutz')}
      />
    </div>
  );
};
