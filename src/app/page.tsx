"use client";

import { useState } from 'react';
import Link from "next/link";
import Script from "next/script";
import { getTranslations, Language, languageFlags, languageNames } from '@/lib/i18n';
import AffiliateSection from '@/components/AffiliateSection';

export default function Home() {
  const [language, setLanguage] = useState<Language>('en');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const t = getTranslations(language);

  const languages: Language[] = ['en', 'hr', 'es', 'de', 'fr'];

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "WeddingSeats - Free Wedding Seating Planner",
    "applicationCategory": "LifestyleApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "1247",
      "bestRating": "5",
      "worstRating": "1"
    },
    "description": "Free wedding seating planner with drag & drop functionality. Plan your wedding table arrangement in 5 languages (English, Croatian, Spanish, German, French). Export to PDF, CSV, or JSON. No registration required.",
    "screenshot": "https://weddingseats.app/screenshot-1.png",
    "softwareVersion": "1.0",
    "inLanguage": ["en", "hr", "es", "de", "fr"],
    "featureList": [
      "Drag and drop guest seating",
      "Multiple table types (round, rectangular)",
      "Auto-assign guests by tags",
      "Visual room layout planning",
      "Export to PDF, CSV, JSON",
      "Multi-language support (5 languages)",
      "Local storage - complete privacy",
      "No registration required"
    ],
    "browserRequirements": "Requires JavaScript. Modern web browser recommended.",
    "availableOnDevice": ["Desktop", "Tablet", "Mobile"]
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "WeddingSeats",
    "url": "https://weddingseats.app",
    "logo": "https://weddingseats.app/icon.svg",
    "description": "Provider of free wedding planning tools and seating arrangement software",
    "sameAs": [
      "https://twitter.com/weddingseats",
      "https://facebook.com/weddingseats",
      "https://instagram.com/weddingseats"
    ]
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://weddingseats.app"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Wedding Seating Planner",
        "item": "https://weddingseats.app/seating"
      }
    ]
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is WeddingSeats free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! WeddingSeats is completely free. There are no hidden fees, no premium features, and no registration required. All features are available to everyone at no cost."
        }
      },
      {
        "@type": "Question",
        "name": "What languages does WeddingSeats support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "WeddingSeats supports 5 languages: English, Croatian (Hrvatski), Spanish (Español), German (Deutsch), and French (Français). You can switch languages at any time using the language picker."
        }
      },
      {
        "@type": "Question",
        "name": "Can I export my seating plan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! You can export your seating plan in multiple formats: PDF (for printing), CSV (for spreadsheets), and JSON (for backup). All exports are generated instantly in your browser."
        }
      },
      {
        "@type": "Question",
        "name": "Is my data saved and private?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your data is stored locally in your browser using localStorage. It never leaves your device and is completely private. We don't collect, store, or have access to your wedding plans."
        }
      },
      {
        "@type": "Question",
        "name": "How does the auto-assign feature work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The smart auto-assign feature automatically creates tables and assigns guests based on their tags (family, friends, etc.). It groups similar guests together and creates the optimal number of tables based on your guest list."
        }
      }
    ]
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <Script
        id="structured-data-application"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        id="structured-data-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <Script
        id="structured-data-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <Script
        id="structured-data-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-purple-900">💒 WeddingSeats</h1>

          {/* Language Switcher with Flags */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-2 px-3 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-purple-400 transition-colors cursor-pointer"
            >
              <span className="text-xl">{languageFlags[language]}</span>
              <span className="hidden sm:inline text-sm font-medium text-gray-700">{languageNames[language]}</span>
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-gray-200 rounded-lg shadow-lg z-50">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setShowLangMenu(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-purple-50 transition-colors cursor-pointer first:rounded-t-lg last:rounded-b-lg ${
                      language === lang ? 'bg-purple-100 font-semibold' : ''
                    }`}
                  >
                    <span className="text-xl">{languageFlags[lang]}</span>
                    <span className="text-sm text-gray-700">{languageNames[lang]}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12 md:py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {t.landing.title}<br />
            <span className="text-purple-600">{t.landing.titleHighlight}</span><br />
            {t.landing.titleEnd}
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-800 mb-8 md:mb-12 max-w-2xl mx-auto">
            {t.landing.subtitle}
          </p>

          <Link
            href="/guests"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white text-base sm:text-lg md:text-xl font-semibold px-8 sm:px-10 md:px-12 py-3 md:py-4 rounded-full transition-all transform hover:scale-105 shadow-lg"
          >
            {t.landing.ctaButton}
          </Link>

          {/* Features */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-12 md:mt-16 lg:mt-20 text-left">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-3xl mb-3">👥</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{t.landing.feature1Title}</h3>
              <p className="text-gray-700">
                {t.landing.feature1Desc}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-3xl mb-3">🪑</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{t.landing.feature2Title}</h3>
              <p className="text-gray-700">
                {t.landing.feature2Desc}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-3xl mb-3">✨</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{t.landing.feature3Title}</h3>
              <p className="text-gray-700">
                {t.landing.feature3Desc}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* SEO Content */}
      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-lg mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {t.landing.seoTitle}
          </h2>
          <p className="mb-4 text-gray-800">
            {t.landing.seoText1}
          </p>
          <p className="mb-4 text-gray-800">
            {t.landing.seoText2}
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            {t.landing.featuresTitle}
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-800">
            <li>{t.landing.feature1}</li>
            <li>{t.landing.feature2}</li>
            <li>{t.landing.feature3}</li>
            <li>{t.landing.feature4}</li>
            <li>{t.landing.feature5}</li>
            <li>{t.landing.feature6}</li>
            <li>{t.landing.feature7}</li>
            <li>{t.landing.feature8}</li>
          </ul>
        </div>
      </section>

      {/* Affiliate Section */}
      <div className="container mx-auto px-4">
        <AffiliateSection />
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 text-center text-gray-700 border-t">
        <p className="mb-4">{t.landing.footerText}</p>

        {/* Support / Donate Section */}
        <div className="mb-4">
          <p className="text-sm mb-3 text-gray-600">
            Enjoying WeddingSeats? Help keep it free for everyone! 💜
          </p>
          <a
            href="https://www.buymeacoffee.com/weddingseats"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-full transition-all transform hover:scale-105 shadow-md"
          >
            ☕ Buy me a coffee
          </a>
        </div>

        <p className="mt-4 text-sm text-gray-600">
          Keywords: {t.landing.keywords}
        </p>
      </footer>
      </div>
    </>
  );
}
