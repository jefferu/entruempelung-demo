import {
  ServiceItem,
  PriceSample,
  CustomerReview,
  FAQItem,
  ServiceArea,
} from '../types';

/**
 * Company master contact and identity configuration.
 * Fully anonymized neutral placeholder brand for demo purposes.
 */
export const COMPANY_INFO = {
  name: 'RheinMain Räumprofis',
  legalName: 'RheinMain Räumprofis Dienstleistungen (Musterunternehmen)',
  address: 'Musterstraße 123',
  postalCode: '60311',
  city: 'Frankfurt am Main',
  country: 'Deutschland',
  phone: '069 - 123 456 70',
  phoneClean: '+496912345670',
  mobile: '0151 - 987 65 43',
  mobileClean: '+491519876543',
  email: 'kontakt@beispiel-raeumdienst.de',
  website: 'https://beispiel-raeumdienst.de',
  foundingYear: '2016',
  openingHours: '24/7 Notdienst — Rund um die Uhr erreichbar (auch Sonn- & Feiertags)',
  emergencyAvailable: true,
  googleRating: 4.9,
  reviewCount: 148,
  completedJobs: '1.500+',
} as const;

/**
 * Comprehensive list of services offered,
 * enriched with local customer expectations and clear feature highlights.
 */
export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'haushaltsaufloesung',
    title: 'Haushaltsauflösung & Nachlassräumung',
    shortDesc: 'Vollständige, diskrete und würdevolle Räumung von Wohnungen, Häusern und Nachlässen.',
    longDesc:
      'Vom Einzimmerappartement bis zur herrschaftlichen Villa: Wir übernehmen die komplette Haushaltsauflösung inklusive transparenter Wertanrechnung wiederverwertbarer Möbel und Gegenstände.',
    iconName: 'Home',
    startingPrice: 'ab 490 €',
    badge: 'Häufig gebucht',
    bullets: [
      'Kostenlose Vor-Ort-Besichtigung mit Festpreisgarantie',
      'Faire Wertanrechnung für Antiquitäten & intakte Möbel',
      'Fachgerechte Mülltrennung und lückenloser Entsorgungsnachweis',
      'Garantiert besenreine Übergabe zur Schlüsselabgabe',
    ],
  },
  {
    id: 'entruempelung',
    title: 'Entrümpelung & Entsorgung',
    shortDesc: 'Befreiung von Keller, Dachboden, Garage oder Gartenlaube von jahrelangem Ballast.',
    longDesc:
      'Im Laufe der Zeit sammelt sich unbemerkt viel an. Als erfahrener Entrümpelungsdienst im Rhein-Main-Gebiet schaffen wir im Handumdrehen wieder freien Raum und übernehmen alle Tragearbeiten.',
    iconName: 'Trash2',
    startingPrice: 'ab 180 €',
    badge: 'Express möglich',
    bullets: [
      'Keller, Speicher, Garagen, Scheunen & Außenbereiche',
      'Entsorgung von Sperrmüll, Altholz, Altmetall & Sondermüll',
      'Keine Vorarbeit Ihrerseits nötig — wir tragen alles selbst heraus',
      'Umweltfreundliches Recycling bei zertifizierten Entsorgern',
    ],
  },
  {
    id: 'umzuege',
    title: 'Umzüge & Seniorenumzüge',
    shortDesc: 'Stressfreie Privatumzüge, Firmenverlegungen und einfühlsame Seniorenumzüge.',
    longDesc:
      'Ein Wohnortwechsel bedeutet Veränderung. Unser geschultes Team packt, sichert, transportiert und montiert Ihre Möbel zuverlässig, vorsichtig und termintreu.',
    iconName: 'Truck',
    startingPrice: 'ab 350 €',
    bullets: [
      'Full-Service: Verpackungsmaterial, Einpacken, Transport & Montage',
      'Spezialisiert auf schonende Seniorenumzüge ins betreute Wohnen',
      'Bereitstellung von Halteverbotszonen für ungehindertes Laden',
      'Vollumfänglicher Transportschutz & Betriebshaftpflichtversicherung',
    ],
  },
  {
    id: 'entkernung',
    title: 'Entkernung & kleine Abbrucharbeiten',
    shortDesc: 'Fachgerechter Rückbau nicht-tragender Wände, Bodenbeläge, Fliesen und Decken.',
    longDesc:
      'Ob Sanierungsvorbereitung oder Renovierung: Wir entkernen Räumlichkeiten gründlich, lösen alte Fliesen, Teppiche und Deckenverkleidungen und hinterlassen saubere Bausubstanz.',
    iconName: 'Hammer',
    startingPrice: 'ab 25 € / m²',
    bullets: [
      'Entfernung von Tapeten, Teppichböden, Parkett und Laminat',
      'Rückbau alter Bäder, Sanitäranlagen und Wandfliesen',
      'Abbruch von Leichtbau- & Trockenbauwänden ohne Statikbeeinträchtigung',
      'Staubarme Arbeitsweise mit professionellen Absauganlagen',
    ],
  },
  {
    id: 'betriebsaufloesung',
    title: 'Betriebsauflösungen & Gewerberäumung',
    shortDesc: 'Diskrete Abwicklung von Büros, Praxen, Lagerhallen, Läden und Gastronomiebetrieben.',
    longDesc:
      'Für Geschäftskunden räumen wir Büroflächen, Werkstätten und Ladengeschäfte nach Firmenfusionen, Standortverlagerungen oder Liquidationen termingerecht und datenschutzkonform.',
    iconName: 'Building2',
    startingPrice: 'Nach Besichtigung',
    badge: 'B2B Express',
    bullets: [
      'Büromöbel, Schwergut, Werkstattmaschinen & Regaltechnik',
      'DSGVO-konforme Aktenvernichtung mit DIN 66399 Zertifikat',
      'Rückbau von Ladeneinbauten in den vertragsgemäßen Urzustand',
      'Flexibles Arbeiten an Wochenenden oder außerhalb der Bürozeiten',
    ],
  },
  {
    id: 'winterdienst-gruenpflege',
    title: 'Winterdienst & Grünanlagenpflege',
    shortDesc: 'Zuverlässige Schnee- & Eisbeseitigung sowie ganzjährige Pflege von Außenflächen.',
    longDesc:
      'Gerne halten wir Ihre Liegenschaften im Winter verkehrssicher und gepflegt. In den Frühlings- und Sommermonaten kümmern wir uns um Heckenschnitt, Rasenmähen und Baumpflege.',
    iconName: 'Snowflake',
    startingPrice: 'ab 75 € / Monat',
    bullets: [
      'Gesetzeskonforme Schneeräumung nach städtischen Satzungen',
      'Streudienst mit umweltverträglichen abstumpfenden Streumitteln',
      'Heckenschnitt, Rasenpflege, Unkrautbeseitigung & Laubentsorgung',
      'Feste Monatspauschalen oder flexible Einzelabrufe',
    ],
  },
  {
    id: 'notdienst',
    title: '24/7 Express-Notdienst',
    shortDesc: 'Soforthilfe bei plötzlichem Fristablauf, Wasser- oder Brandschäden und Notfällen.',
    longDesc:
      'Manchmal duldet eine Räumung keinen Aufschub. Bei unerwarteten Fristen oder plötzlichen Havarien rückt unser Notdienst-Einsatzteam binnen kürzester Zeit aus.',
    iconName: 'Clock',
    startingPrice: 'Auf Anfrage',
    badge: '24/7 erreichbar',
    bullets: [
      'Sofortige telefonische Einsatzkoordination unter unserer Notfallnummer',
      'Einsatzbereit an Samstagen, Sonntagen und gesetzlichen Feiertagen',
      'Direkte Vor-Ort-Begutachtung meist noch am selben Kalendertag',
      'Rechtssichere Eil-Dokumentation für Versicherungen oder Vermieter',
    ],
  },
];

/**
 * Benchmark price samples designed for maximum clarity and transparent flat-rate calculations.
 */
export const PRICE_SAMPLES: PriceSample[] = [
  {
    category: 'Einzelmöbel',
    service: 'Sofa / Couchgarnitur abholen & entsorgen',
    price: 'ab 79 €',
    duration: 'Ca. 20–30 Min.',
    scope: 'Inkl. Tragen aus jedem Stockwerk & fachgerechter Verwertung',
  },
  {
    category: 'Keller / Dachboden',
    service: 'Kellerraum / Dachboden bis 15 m²',
    price: 'ab 290 €',
    duration: 'Ca. 2–4 Stunden',
    scope: 'Inkl. Sortierung, Verladung, Sperrmüll-Abtransport & Kehren',
    highlight: true,
  },
  {
    category: 'Wohnungsräumung',
    service: '2-Zimmer-Wohnung (ca. 55 m²) komplett besenrein',
    price: 'ab 790 €',
    duration: '1 Arbeitstag',
    scope: 'Komplette Demontage, Entsorgung, Wertanrechnung & Endabnahme',
    highlight: true,
  },
  {
    category: 'Küche',
    service: 'Küchendemontage inkl. Elektrogeräte',
    price: 'ab 320 €',
    duration: 'Ca. 3–5 Stunden',
    scope: 'Wasser-/Stromabsicherung durch Fachpersonal, Abtransport',
  },
  {
    category: 'Großobjekt / Haus',
    service: 'Einfamilienhaus / Villa mit Garage & Schuppen',
    price: 'ab 1.450 €',
    duration: '1–2 Arbeitstage',
    scope: 'Gesamträumung vom Dach bis zum Keller mit Festpreisgarantie',
  },
  {
    category: 'Gewerbe / Büro',
    service: 'Büroetage (bis zu 8 Arbeitsplätze)',
    price: 'ab 890 €',
    duration: 'Termintreu',
    scope: 'Inkl. zertifizierter Akten- und Datenträgervernichtung',
  },
];

/**
 * Regional operational coverage with key city hubs across the Rhein-Main metropolitan area.
 */
export const SERVICE_AREAS: ServiceArea[] = [
  { name: 'Frankfurt am Main (Zentrale)', postalPrefix: '60306–60599', highlight: true, transitCost: '0,- € Anfahrt' },
  { name: 'Darmstadt & Umland', postalPrefix: '64283–64297', highlight: true, transitCost: '0,- € Anfahrt' },
  { name: 'Wiesbaden', postalPrefix: '65183–65207', highlight: true, transitCost: '0,- € Anfahrt' },
  { name: 'Mainz', postalPrefix: '55116–55131', highlight: true, transitCost: '0,- € Anfahrt' },
  { name: 'Offenbach am Main', postalPrefix: '63065–63075', highlight: false, transitCost: '0,- € Anfahrt' },
  { name: 'Weiterstadt & Griesheim', postalPrefix: '64331, 64347', highlight: false, transitCost: '0,- € Anfahrt' },
  { name: 'Groß-Gerau & Rüsselsheim', postalPrefix: '64521, 65428', highlight: false, transitCost: '0,- € Anfahrt' },
  { name: 'Dieburg & Groß-Umstadt', postalPrefix: '64807, 64823', highlight: false, transitCost: '0,- € Anfahrt' },
  { name: 'Hanau & Bad Homburg', postalPrefix: '63450, 61348', highlight: false, transitCost: '0,- € Anfahrt' },
  { name: 'Bensheim & Bergstraße', postalPrefix: '64625–64646', highlight: false, transitCost: '0,- € Anfahrt' },
];

/**
 * Key pillars and business values upholding the customer trust proposition.
 */
export const GUARANTEES = [
  {
    title: '100% Kostenlose Besichtigung',
    desc: 'Wir schauen uns Ihr Objekt unverbindlich vor Ort an und beraten Sie ehrlich und transparent.',
    icon: 'SearchCheck',
  },
  {
    title: '0,- € An- & Abfahrt',
    desc: 'Im gesamten Rhein-Main-Gebiet berechnen wir keinerlei Anfahrts- oder Kilometerpauschalen.',
    icon: 'MapPin',
  },
  {
    title: 'Verbindlicher Festpreis',
    desc: 'Pauschalpreis ohne Wenn und Aber. Bei uns gibt es garantiert keine bösen Überraschungen auf der Rechnung.',
    icon: 'BadgePercent',
  },
  {
    title: 'Besenreine Übergabe',
    desc: 'Wir verlassen jede geräumte Fläche gründlich gekehrt und übergabefertig für Eigentümer oder Hausverwaltung.',
    icon: 'Sparkles',
  },
  {
    title: 'Faire Wertanrechnung',
    desc: 'Gut erhaltene Möbel, Sammlerstücke oder Elektrogeräte ziehen wir transparent vom Gesamtpreis ab.',
    icon: 'Coins',
  },
  {
    title: '24/7 Notdienst rund um die Uhr',
    desc: 'Wenn es eilt, sind wir auch am späten Abend, am Wochenende oder an Feiertagen einsatzbereit.',
    icon: 'Clock',
  },
];

/**
 * Neutral customer reviews highlighting speed, reliability and fair pricing.
 */
export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    author: 'Klaus M.',
    city: 'Darmstadt',
    rating: 5,
    date: 'Vor 2 Wochen',
    serviceUsed: 'Haushaltsauflösung',
    text: 'Nach dem Todesfall meiner Tante stand ich vor einem riesigen Berg an Arbeit. Das Räumteam hat das Haus innerhalb von anderthalb Tagen komplett geleert und besenrein übergeben. Sehr pietätvoll, absolut pünktlich und der vereinbarte Festpreis wurde centgenau eingehalten. Große Empfehlung!',
  },
  {
    id: 'rev-2',
    author: 'Sabine W.',
    city: 'Frankfurt-Sachsenhausen',
    rating: 5,
    date: 'Vor 1 Monat',
    serviceUsed: 'Entrümpelung Dachboden',
    text: 'Dachboden im 4. Stock ohne Fahrstuhl entrümpeln lassen. Die Mitarbeiter haben geschleppt ohne zu klagen. Extrem schnell, freundlich und der Hof wurde nach der Verladung sogar noch gefegt. Vielen Dank für diesen Spitzen-Service!',
  },
  {
    id: 'rev-3',
    author: 'Michael B. (Architekturbüro)',
    city: 'Wiesbaden',
    rating: 5,
    date: 'Vor 3 Wochen',
    serviceUsed: 'Betriebsauflösung & Entkernung',
    text: 'Wir mussten eine 250 m² Gewerbefläche innerhalb von 4 Tagen zurückbauen. Das Team hat das Projekt exzellent koordiniert, Akten ordnungsgemäß vernichtet und den Estrich sauber hinterlassen. Höchste Verlässlichkeit!',
  },
  {
    id: 'rev-4',
    author: 'Elena T.',
    city: 'Mainz',
    rating: 5,
    date: 'Vor 2 Monaten',
    serviceUsed: 'Seniorenumzug & Teilräumung',
    text: 'Der Umzug meiner Mutter in die Seniorenresidenz lief absolut reibungslos. Nicht mehr benötigte Möbel wurden mit dem Festpreis fair verrechnet. Ein herzliches Team mit viel Feingefühl.',
  },
];

/**
 * Curated frequently asked questions clarifying practical, legal, and operational inquiries.
 */
export const FAQ_LIST: FAQItem[] = [
  {
    category: 'kosten',
    question: 'Wie setzt sich der Preis für eine Entrümpelung zusammen?',
    answer:
      'Der Preis richtet sich nach dem Volumen der Gegenstände (in Kubikmetern), den Materialarten (Sperrmüll, Holz, Bauschutt, Elektrogeräte), dem Stockwerk und dem Arbeitsaufwand. Nach einer kostenlosen Vor-Ort-Besichtigung erhalten Sie von uns ein verbindliches Festpreisangebot ohne nachträgliche Zusatzkosten.',
  },
  {
    category: 'kosten',
    question: 'Fallen für die Besichtigung oder Anfahrt Kosten an?',
    answer:
      'Nein, absolut nicht. Die Besichtigung vor Ort sowie unsere An- und Abfahrt im gesamten Rhein-Main-Gebiet (Darmstadt, Frankfurt, Wiesbaden, Mainz etc.) sind für Sie zu 100% kostenfrei und unverbindlich.',
  },
  {
    category: 'service',
    question: 'Was bedeutet die "Wertanrechnung" beim Entrümpelungsdienst?',
    answer:
      'Wenn sich in Ihrem Haushalt noch gut erhaltene Möbel, Designklassiker, Antiquitäten oder funktionstüchtige Elektrogeräte befinden, schätzen wir deren Wiederverkaufswert fair ein und ziehen diesen Betrag direkt von den Gesamtkosten der Räumung ab.',
  },
  {
    category: 'ablauf',
    question: 'Muss ich vorab schon etwas sortieren oder zur Straße stellen?',
    answer:
      'Nein. Sie müssen vorab nichts sortieren, packen oder schleppen. Unser geschultes Team übernimmt das Ausräumen von Schränken, das Tragen aus beliebigen Stockwerken und die fachgerechte Beladung unserer Fahrzeuge.',
  },
  {
    category: 'service',
    question: 'Wie schnell können Sie vor Ort sein?',
    answer:
      'Besichtigungstermine sind in der Regel innerhalb von 24 bis 48 Stunden möglich. In dringenden Notfällen oder bei Fristablauf erreichen Sie unseren 24/7 Notdienst mobil für einen Soforteinsatz.',
  },
  {
    category: 'dsgvo',
    question: 'Was passiert mit meinen Daten und persönlichen Dokumenten?',
    answer:
      'Wir arbeiten streng nach DSGVO-Richtlinien. Werden bei Räumungen vertrauliche Briefe oder Ausweispapiere gefunden, händigen wir diese diskret an Sie aus. Für Gewerbekunden bieten wir zertifizierte Aktenvernichtung nach DIN 66399 an.',
  },
  {
    category: 'service',
    question: 'Sind meine Räumlichkeiten und das Gebäude versichert?',
    answer:
      'Ja. Unser Betrieb verfügt über eine umfassende gewerbliche Betriebshaftpflichtversicherung. Sollte trotz aller Vorsicht im Treppenhaus oder an Türen ein Schaden entstehen, ist dieser vollumfänglich und unkompliziert abgesichert.',
  },
];
