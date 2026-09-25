# RheinMain Räumprofis — Moderner Webauftritt

Neugestaltung der Homepage für einen professionellen Entrümpelungsdienst im Rhein-Main-Gebiet (Frankfurt, Darmstadt, Wiesbaden, Mainz) mit modernstem, hochkonvertierenden Flat-Rate-UX-Konzept, strikter Einhaltung der **deutschen DSGVO- und TTDSG-Richtlinien** sowie Bereitstellung für **GitHub Pages**.

---

## 🌟 Highlights & Features

### 1. Optik & User Experience
- **Warme, organische Farbpalette**: Sand / Off-White (`#FAF8F5`), Waldgrün (`#2D6A4F`), Anthrazit (`#1A1A1A`) und warme Akzente.
- **Interaktiver 30-Sekunden-Blitz-Kalkulator**:
  - Auswahl des Objekttyps (Wohnung, Haus, Keller/Dachboden, Gewerbe/Büro, Einzelmöbel/Sperrmüll).
  - Dynamischer m²-Schieberegler mit Echtzeit-Preiserwartung.
  - Berücksichtigung von Stockwerk, Aufzug, Wertanrechnung, Entkernungsbedarf und Notdienst-Option.
  - Direkte Übernahme der Daten in die Schnellanfrage.
- **Transparente Richtpreis-Tabelle**: Transparente Beispielkalkulationen (Sofa, Keller, 2-Zimmer-Wohnung, Küche, Büro) mit All-Inclusive-Garantie (0 € Anfahrt, Tragearbeit, Entsorgungsnachweis, besenreine Übergabe).
- **"In 3 Schritten besenrein"**: Visueller Ablaufprozess von Foto/Besichtigung bis zur schlüsselfertigen Übergabe.
- **Social Proof Badges**: Google 4.9★ Bewertungspill, über 1.500+ geräumte Objekte, verifizierte Kundenstimmen aus Darmstadt, Frankfurt, Wiesbaden und Mainz.

### 2. Vollständiges Leistungsportfolio
- **7 Kernleistungen**:
  1. *Haushaltsauflösung & Nachlassräumung*
  2. *Entrümpelung & Entsorgung*
  3. *Umzüge & Seniorenumzüge*
  4. *Entkernung & kleine Abbrucharbeiten*
  5. *Betriebsauflösungen & Gewerberäumung*
  6. *Winterdienst & Grünanlagenpflege*
  7. *24/7 Express-Notdienst*
- **Einsatzgebiet mit 0,- € Anfahrtskosten**: Frankfurt am Main, Darmstadt, Wiesbaden, Mainz, Offenbach, Weiterstadt, Griesheim, Groß-Gerau, Rüsselsheim, Dieburg, Hanau, Bad Homburg etc.

### 3. Rechtssicherheit & DSGVO-Konformität (Deutschland)
- **Vollständiges Impressum gemäß § 5 DDG** (ehemals TMG) mit allen Pflichtangaben, Muster-Anbieterkennzeichnung, Haftungsausschluss und OS-Schlichtungslink.
- **Datenschutzerklärung nach Art. 13 & 14 DSGVO** mit Rechtsgrundlagen, Betroffenenrechten und Nennung der zuständigen Aufsichtsbehörde.
- **TTDSG-konformer Cookie-Consent-Banner**:
  - Keine Vorab-Aktivierung von Tracking-Cookies.
  - Gleichwertige Buttons („Nur essenzielle akzeptieren“ / „Alle akzeptieren“ – Vermeidung von Dark Patterns).
  - Granulare Einstellungsoptionen, jederzeit über den Footer reaktivierbar.
- **DSGVO-konformes Kontaktformular** mit Pflicht-Einwilligung und Widerrufshinweis.
- **Keine externen Font-CDNs**: Schriften und Icons werden lokal ausgeliefert, um rechtswidrige Datenübertragungen in Drittländer ohne Einwilligung auszuschließen.

---

## 🛠️ Technologie-Stack

- **Frontend**: React 18, TypeScript (Strict Mode)
- **Build Tool**: Vite 6 (Static Output für GitHub Pages mit relativen Pfaden `base: './'`)
- **Styling**: Tailwind CSS mit Glassmorphism-Utilities
- **Icons**: Lucide React
- **Animationen & Effekte**: Framer Motion, Canvas Confetti
- **CI/CD**: GitHub Actions Workflow (`.github/workflows/deploy.yml`)

---

## 🚀 Lokale Entwicklung

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev

# Produktionstauglichen Build erstellen
npm run build

# Gebauten Build lokal testen
npm run preview
```

---

## 🌐 Bereitstellung auf GitHub & GitHub Pages

1. Das Repository auf GitHub hochladen (`git push origin main`).
2. Unter **Settings > Pages** des Repositories:
   - **Source: GitHub Actions** auswählen (der enthaltene Workflow `.github/workflows/deploy.yml` baut und publiziert die Seite automatisch).
