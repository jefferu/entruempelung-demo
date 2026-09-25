/**
 * Core type definitions for the RheinMain Räumprofis platform.
 * Follows strict TypeScript guidelines to ensure end-to-end type safety.
 */

/**
 * Service offering details structured for cards, detail views and quote calculations.
 */
export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  iconName: string;
  bullets: string[];
  startingPrice: string;
  badge?: string;
}

/**
 * Representative pricing example for transparent customer reference.
 */
export interface PriceSample {
  category: string;
  service: string;
  price: string;
  duration: string;
  scope: string;
  highlight?: boolean;
}

/**
 * Customer review schema conforming to aggregate rating and social proof metrics.
 */
export interface CustomerReview {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  text: string;
  serviceUsed: string;
}

/**
 * FAQ item structure for searchable accordion modules.
 */
export interface FAQItem {
  question: string;
  answer: string;
  category: 'kosten' | 'ablauf' | 'service' | 'dsgvo';
}

/**
 * Rhein-Main regional coverage zones with focal service hubs.
 */
export interface ServiceArea {
  name: string;
  postalPrefix: string;
  highlight: boolean;
  transitCost: string;
}

/**
 * State representation for the instant quote calculator.
 */
export interface EstimatorState {
  propertyType: 'wohnung' | 'haus' | 'keller' | 'gewerbe' | 'einzelteile';
  approximateArea: number; // in square meters or piece count
  floor: number;
  hasElevator: boolean;
  needsDemolition: boolean;
  hasValuableItems: boolean;
  urgentService: boolean;
}

/**
 * Calculation result containing conservative and fair market estimates.
 */
export interface EstimateResult {
  minPrice: number;
  maxPrice: number;
  suggestedHours: string;
  recommendedTeamSize: number;
}

/**
 * Contact and inquiry form submission payload including GDPR agreement state.
 */
export interface InquiryPayload {
  name: string;
  email: string;
  phone: string;
  city: string;
  service: string;
  estimatedArea?: string;
  preferredDate?: string;
  notes: string;
  gdprAccepted: boolean;
}

/**
 * Active view state for legal policy modals (Impressum vs. Datenschutzerklärung).
 */
export type LegalModalType = 'impressum' | 'datenschutz' | null;
