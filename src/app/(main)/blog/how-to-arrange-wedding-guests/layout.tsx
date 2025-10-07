import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Arrange Wedding Guests So Everyone Is Happy - Complete Guide | WeddingSeats',
  description: 'Complete guide to creating the ideal wedding seating arrangement. Learn how to group guests, balance tables, and create an atmosphere everyone will enjoy. Available in English, Croatian, Spanish, German, and French.',
  keywords: 'how to arrange wedding guests, wedding seating guide, guest seating tips, wedding table arrangement, how to seat guests, wedding seating plan guide, make guests happy wedding, kako rasporediti goste, cómo organizar invitados',
  openGraph: {
    title: 'How to Arrange Wedding Guests So Everyone Is Happy - Complete Guide',
    description: 'Complete guide to creating the ideal wedding seating arrangement. Learn how to group guests, balance tables, and create an atmosphere everyone will enjoy.',
    type: 'article',
    url: 'https://weddingseats.app/blog/how-to-arrange-wedding-guests',
    publishedTime: '2025-10-07T00:00:00Z',
    authors: ['WeddingSeats Team'],
    tags: ['wedding planning', 'seating arrangement', 'guest arrangement', 'wedding tips', 'happy guests'],
    locale: 'en_US',
  },
  alternates: {
    canonical: 'https://weddingseats.app/blog/how-to-arrange-wedding-guests',
    languages: {
      'en': 'https://weddingseats.app/blog/how-to-arrange-wedding-guests?lang=en',
      'hr': 'https://weddingseats.app/blog/how-to-arrange-wedding-guests?lang=hr',
      'es': 'https://weddingseats.app/blog/how-to-arrange-wedding-guests?lang=es',
      'de': 'https://weddingseats.app/blog/how-to-arrange-wedding-guests?lang=de',
      'fr': 'https://weddingseats.app/blog/how-to-arrange-wedding-guests?lang=fr',
      'x-default': 'https://weddingseats.app/blog/how-to-arrange-wedding-guests',
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

