import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <h1 className="text-4xl font-bold mb-4">404 — Сторінку не знайдено</h1>
      <p className="text-muted-foreground text-lg mb-8">
        На жаль, запитувана стаття не існує або була видалена.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
        data-testid="link-back-home"
      >
        <ArrowLeft className="w-4 h-4" />
        Повернутися на головну
      </Link>
    </div>
  );
}
