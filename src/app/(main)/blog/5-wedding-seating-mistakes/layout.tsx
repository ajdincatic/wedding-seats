import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '5 Wedding Guest Seating Mistakes (And How to Avoid Them) | WeddingSeats',
  description: 'Discover the 5 most common mistakes couples make when arranging wedding guests and how to avoid them for a perfect atmosphere. Practical tips from wedding planning experts. Available in English, Croatian, Spanish, German, and French.',
  keywords: 'wedding seating mistakes, seating plan errors, wedding planning mistakes, guest arrangement tips, wedding seating chart, how to seat wedding guests, wedding table plan mistakes, greške raspored gostiju, errores mesas boda',
  openGraph: {
    title: '5 Wedding Guest Seating Mistakes (And How to Avoid Them)',
    description: 'Discover the 5 most common mistakes couples make when arranging wedding guests and how to avoid them for a perfect atmosphere. Practical tips from wedding planning experts.',
    type: 'article',
    url: 'https://weddingseats.app/blog/5-wedding-seating-mistakes',
    publishedTime: '2025-10-06T00:00:00Z',
    authors: ['WeddingSeats Team'],
    tags: ['wedding planning', 'seating arrangement', 'wedding tips', 'guest seating'],
    locale: 'en_US',
  },
  alternates: {
    canonical: 'https://weddingseats.app/blog/5-wedding-seating-mistakes',
    languages: {
      'en': 'https://weddingseats.app/blog/5-wedding-seating-mistakes?lang=en',
      'hr': 'https://weddingseats.app/blog/5-wedding-seating-mistakes?lang=hr',
      'es': 'https://weddingseats.app/blog/5-wedding-seating-mistakes?lang=es',
      'de': 'https://weddingseats.app/blog/5-wedding-seating-mistakes?lang=de',
      'fr': 'https://weddingseats.app/blog/5-wedding-seating-mistakes?lang=fr',
      'x-default': 'https://weddingseats.app/blog/5-wedding-seating-mistakes',
    },
  },
};

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

