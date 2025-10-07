import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Wedding Planning Tips & Guides | WeddingSeats',
  description: 'Expert wedding planning advice and guides. Learn how to arrange guests, avoid common mistakes, and create an unforgettable atmosphere. Available in 5 languages: English, Croatian, Spanish, German, French.',
  keywords: 'wedding planning blog, seating arrangement tips, wedding planning guides, wedding advice, planiranje venčanja, consejos para bodas, hochzeitsplanung tipps, conseils mariage',
  openGraph: {
    title: 'Blog - Wedding Planning Tips & Guides | WeddingSeats',
    description: 'Expert wedding planning advice and guides. Learn how to arrange guests, avoid common mistakes, and create an unforgettable atmosphere.',
    type: 'website',
    url: 'https://weddingseats.app/blog',
  },
  alternates: {
    canonical: 'https://weddingseats.app/blog',
    languages: {
      'en': 'https://weddingseats.app/blog?lang=en',
      'hr': 'https://weddingseats.app/blog?lang=hr',
      'es': 'https://weddingseats.app/blog?lang=es',
      'de': 'https://weddingseats.app/blog?lang=de',
      'fr': 'https://weddingseats.app/blog?lang=fr',
      'x-default': 'https://weddingseats.app/blog',
    },
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

