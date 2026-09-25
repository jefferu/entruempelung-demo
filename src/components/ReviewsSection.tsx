import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { CUSTOMER_REVIEWS, COMPANY_INFO } from '../data/content';

/**
 * ReviewsSection rendering authentic customer testimonials and Google review aggregate badges.
 */
export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-[#FAF8F5] border-b border-[#E8E2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-3">
            <span className="text-amber-500">★★★★★</span>
            <span>{COMPANY_INFO.googleRating} Sterne auf Google</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1A1A] tracking-tight">
            Das sagen unsere Kunden im Rhein-Main-Gebiet
          </h2>
          <p className="text-neutral-600 text-base sm:text-lg mt-4">
            Echte Bewertungen von Privatkunden, Hausverwaltungen und Gewerbetreibenden.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {CUSTOMER_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-3xl p-8 border border-[#E8E2DA] shadow-soft flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-neutral-400 font-medium">
                    {review.date}
                  </span>
                </div>

                <p className="text-neutral-700 text-sm sm:text-base leading-relaxed mb-6 italic">
                  "{review.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-[#1A1A1A] text-sm">
                    {review.author}
                  </h4>
                  <span className="text-xs text-neutral-500">
                    {review.city} · {review.serviceUsed}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Verifizierter Auftrag</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges Bar */}
        <div className="text-center text-xs text-neutral-500 font-medium">
          Basierend auf {COMPANY_INFO.reviewCount} verifizierten Bewertungen und über {COMPANY_INFO.completedJobs} realisierten Projekten.
        </div>

      </div>
    </section>
  );
};
