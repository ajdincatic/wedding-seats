import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap', // Better font loading performance
  preload: true,
  weight: ['400', '600', '700'], // Only load needed weights
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  weight: ['400'], // Only regular weight
});

export const metadata: Metadata = {
  title: "Free Wedding Seating Planner | Plan Stolova Vjenčanje | Planificador Mesas Boda",
  description: "FREE Wedding Seating Planner with Drag & Drop ✨ Plan table arrangements for your wedding in 5 languages. Export PDF, CSV. No registration needed! 🎉 Besplatno planiranje rasporeda sjedenja za vjenčanje. Planificador gratuito de mesas para bodas.",
  keywords: [
    // English
    "wedding seating planner", "wedding seating chart", "wedding table planner", "free wedding seating chart",
    "wedding floor plan", "seating arrangement wedding", "wedding table layout", "wedding guest seating",
    "wedding seating plan template", "online wedding seating planner", "drag and drop wedding seating",
    "wedding reception seating", "wedding table arrangement", "wedding seating chart maker",
    // Croatian
    "raspored sjedenja vjenčanje", "plan stolova vjenčanje", "raspored sjedenja svadba", "plan stolova svadba",
    "raspored gostiju vjenčanje", "prikaz sale vjenčanje", "organizacija vjenčanja", "raspored za vjenčanje",
    "besplatni alat za vjenčanje", "raspored sjedenja online", "plan stolova online",
    // Spanish
    "planificador mesas boda", "distribución mesas boda", "plan de mesa matrimonio", "seating plan boda",
    "organizador de mesas boda", "diseño de salon boda", "planificador asientos boda", "plan mesa boda gratis",
    // German
    "hochzeitssitzordnung", "tischplan hochzeit", "sitzplan hochzeit", "hochzeit tischordnung",
    "hochzeitsplanung tische", "hochzeit sitzordnung erstellen", "tischplan hochzeit kostenlos",
    // French
    "plan de table mariage", "disposition tables mariage", "organisation tables mariage", "plan salle mariage",
    "planificateur table mariage", "arrangement tables mariage", "plan de table mariage gratuit"
  ],
  authors: [{ name: "WeddingSeats Team" }],
  creator: "WeddingSeats",
  publisher: "WeddingSeats",
  metadataBase: new URL('https://wedding-seats.com'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: "FREE Wedding Seating Planner - Plan Your Perfect Wedding Layout ✨",
    description: "Create your wedding seating chart in minutes! Free drag & drop tool for planning table arrangements. Export to PDF. Works in 5 languages. No sign-up required! 🎉",
    type: "website",
    locale: "en_US",
    siteName: "WeddingSeats - Free Wedding Seating Planner",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'WeddingSeats - Free Wedding Seating Planner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "FREE Wedding Seating Planner ✨ Drag & Drop Table Planning",
    description: "Plan your wedding seating arrangement in minutes! Free tool with drag & drop. Export PDF/CSV. 5 languages. No registration! 🎉",
    images: ['/og-image.png'],
    creator: '@weddingseats',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  other: {
    'msvalidate.01': 'your-bing-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS prefetch for potential external resources */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Multi-language support hints */}
        <meta name="available-languages" content="en,hr,es,de,fr" />
        <meta name="default-language" content="en" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
