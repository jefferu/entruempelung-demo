import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from './App';

vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

describe('A&G / RheinMain Räumprofis - Complete Functionality Test Suite', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders primary branding, hero section, and navigation', () => {
    render(<App />);

    // Brand elements in header and footer
    expect(screen.getAllByText('RheinMain Räumprofis').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Entrümpelung im Rhein-Main-Gebiet/i)).toBeInTheDocument();
    expect(screen.getByText(/Blitz-Angebot berechnen/i)).toBeInTheDocument();

    // Trust badge
    expect(screen.getByText(/Google-Bewertungen/i)).toBeInTheDocument();
  });

  describe('Quick Cost Estimator & Quote Flow', () => {
    it('calculates estimate and transfers details to contact form on click', async () => {
      render(<App />);

      // Check default estimate display
      const priceHeadings = screen.getAllByText(/Geschätzter Komplett-Festpreis/i);
      expect(priceHeadings.length).toBeGreaterThan(0);

      // Select "Einfamilienhaus"
      const houseButton = screen.getByRole('button', { name: /Einfamilienhaus/i });
      fireEvent.click(houseButton);

      // Check that "Angebot verbindlich anfordern" triggers transfer
      const requestButton = screen.getByRole('button', { name: /Angebot verbindlich anfordern/i });
      fireEvent.click(requestButton);

      // Notes textarea in contact form should now contain the estimate summary
      const notesTextarea = screen.getByPlaceholderText(
        /Beschreiben Sie kurz die Räumlichkeiten/i
      ) as HTMLTextAreaElement;
      expect(notesTextarea.value).toContain('HAUS');
    });
  });

  describe('Contact Form & GDPR Validation', () => {
    it('enforces required GDPR consent and validates inputs before submission', async () => {
      render(<App />);

      const submitButton = screen.getByRole('button', {
        name: /Kostenloses Angebot jetzt absenden/i,
      });

      // 1. Try submitting without name
      fireEvent.click(submitButton);
      expect(screen.getByText(/Bitte geben Sie Ihren Namen an/i)).toBeInTheDocument();

      // 2. Fill name but leave contact empty
      const nameInput = screen.getByPlaceholderText(/z.B. Maria Schmidt/i);
      await userEvent.type(nameInput, 'Erika Mustermann');
      fireEvent.click(submitButton);
      expect(
        screen.getByText(/Bitte geben Sie eine Telefonnummer oder eine E-Mail-Adresse/i)
      ).toBeInTheDocument();

      // 3. Fill phone but leave GDPR unchecked
      const phoneInput = screen.getByPlaceholderText(/z.B. 0173 1234567/i);
      await userEvent.type(phoneInput, '069 98765432');
      fireEvent.click(submitButton);
      expect(
        screen.getByText(/Bitte bestätigen Sie die Datenschutzerklärung gemäß DSGVO/i)
      ).toBeInTheDocument();

      // 4. Accept GDPR and submit
      const gdprCheckbox = screen.getByRole('checkbox', {
        name: /Ich willige ein, dass meine Angaben zur Bearbeitung meiner Anfrage/i,
      });
      await userEvent.click(gdprCheckbox);
      fireEvent.click(submitButton);

      // Verify success card is rendered
      await waitFor(
        () => {
          expect(screen.getByText(/Vielen Dank für Ihre Anfrage!/i)).toBeInTheDocument();
        },
        { timeout: 2000 }
      );
    });

    it('simulates photo upload and renders uploaded file badge', async () => {
      render(<App />);

      // Find hidden file input
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      expect(fileInput).not.toBeNull();

      const testFile = new File(['dummy photo'], 'zimmer_foto.jpg', { type: 'image/jpeg' });
      await userEvent.upload(fileInput, testFile);

      // Verify file badge is shown
      expect(screen.getByText('zimmer_foto.jpg')).toBeInTheDocument();
    });
  });

  describe('Legal Modals (Impressum & Datenschutzerklärung)', () => {
    it('opens and closes Impressum modal correctly', async () => {
      render(<App />);

      // Click Impressum in footer
      const impressumButtons = screen.getAllByRole('button', { name: /Impressum/i });
      fireEvent.click(impressumButtons[0]);

      // Verify modal content
      expect(screen.getAllByText(/Angaben gemäß § 5 DDG/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/EU-Streitschlichtung/i)).toBeInTheDocument();

      // Close modal
      const closeButtons = screen.getAllByRole('button', { name: /Schließen/i });
      fireEvent.click(closeButtons[0]);

      await waitFor(() => {
        expect(screen.queryByText(/EU-Streitschlichtung/i)).not.toBeInTheDocument();
      });
    });

    it('opens and closes Datenschutzerklärung modal correctly', async () => {
      render(<App />);

      // Click Datenschutz in footer
      const privacyButtons = screen.getAllByRole('button', { name: /Datenschutz/i });
      fireEvent.click(privacyButtons[0]);

      // Verify privacy modal
      expect(screen.getByText(/Informationen zur Datenverarbeitung nach Art. 13 DSGVO/i)).toBeInTheDocument();

      // Close with Escape key
      fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });

      await waitFor(() => {
        expect(
          screen.queryByText(/Informationen zur Datenverarbeitung nach Art. 13 DSGVO/i)
        ).not.toBeInTheDocument();
      });
    });
  });

  describe('TTDSG / DSGVO Cookie Banner', () => {
    it('persists essential cookie consent in localStorage upon dismissal', async () => {
      render(<App />);

      // Banner should be visible initially
      expect(screen.getByText(/Privatsphäre & Cookie-Einstellungen/i)).toBeInTheDocument();

      // Accept essential only
      const essentialButton = screen.getByRole('button', { name: /Nur essenzielle akzeptieren/i });
      fireEvent.click(essentialButton);

      // Banner disappears
      expect(screen.queryByText(/Privatsphäre & Cookie-Einstellungen/i)).not.toBeInTheDocument();

      // LocalStorage updated
      const saved = JSON.parse(localStorage.getItem('rm_cookie_consent_v1') || '{}');
      expect(saved.essential).toBe(true);
      expect(saved.analytics).toBe(false);
    });

    it('re-opens cookie settings via footer trigger', async () => {
      render(<App />);

      // Dismiss banner first
      fireEvent.click(screen.getByRole('button', { name: /Nur essenzielle akzeptieren/i }));

      // Click footer button to re-open
      const reopenButton = screen.getByRole('button', { name: /Cookie-Einstellungen/i });
      fireEvent.click(reopenButton);

      // Banner should re-appear with customizable settings
      expect(screen.getByText(/Technisch notwendig \(Essenziell\)/i)).toBeInTheDocument();
    });
  });

  describe('FAQ Accordion', () => {
    it('toggles accordion items smoothly on click', async () => {
      render(<App />);

      const firstQuestion = screen.getByText(/Fallen für die Besichtigung oder Anfahrt Kosten an\?/i);
      fireEvent.click(firstQuestion);

      expect(
        screen.getByText(/Die Besichtigung vor Ort sowie unsere An- und Abfahrt im gesamten Rhein-Main-Gebiet/i)
      ).toBeInTheDocument();
    });
  });
});
