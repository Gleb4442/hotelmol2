import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string | null): string {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function generateSeoTitle(title: string, keyword?: string): string {
  const seoKeyword = keyword || 'AI технології';
  return `${title} | ${seoKeyword} для готелів Україна`;
}

export function generateSeoDescription(excerpt: string | null, keyword?: string): string {
  const seoKeyword = keyword || 'AI технології';
  const base = excerpt || 'Читайте корисні статті про AI-технології для готельного бізнесу України.';
  return `${base} ${seoKeyword} для готелів Україна.`;
}
