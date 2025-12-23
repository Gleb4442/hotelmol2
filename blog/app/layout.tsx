import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: {
    default: 'Roomie Blog | AI для готелів Україна',
    template: '%s | Roomie Blog',
  },
  description: 'Корисні статті про AI-технології для готельного бізнесу України. Автоматизація, чат-боти, підвищення прибутку готелів.',
  keywords: ['AI для готелів', 'автоматизація готелів', 'чат-бот для готелю', 'готельний бізнес Україна', 'Roomie'],
  authors: [{ name: 'Roomie' }],
  creator: 'Roomie',
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    siteName: 'Roomie Blog',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-border">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <a href="/" className="text-xl font-bold text-primary" data-testid="link-blog-home">
                Roomie Blog
              </a>
              <nav className="flex gap-4">
                <a 
                  href="https://roomie.com.ua" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-main-site"
                >
                  Головний сайт
                </a>
              </nav>
            </div>
          </header>
          <main className="flex-1">
            {children}
          </main>
          <footer className="border-t border-border py-8 mt-12">
            <div className="container mx-auto px-4 text-center text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} Roomie. AI-асистент для готелів України.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
