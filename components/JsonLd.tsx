"use client";

import type { BlogPost, authors } from '@/shared/schema';
import Script from 'next/script';

type Author = typeof authors.$inferSelect;
type PostWithAuthor = BlogPost & { author: Author | null };

type LocalizedPost = {
  title: string;
  content: string;
  seoTitle: string;
  seoDescription?: string | null;
};

type JsonLdProps = {
  post: PostWithAuthor;
  localizedPost: LocalizedPost;
};

const JsonLd = ({ post, localizedPost }: JsonLdProps) => {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://hotelmol.com/blog/${post.slug}`,
    },
    headline: localizedPost.seoTitle || localizedPost.title,
    description: localizedPost.seoDescription || '',
    image: post.featuredImage || 'https://hotelmol.com/default-og-image.png', // Fallback image
    author: {
      '@type': 'Person',
      name: post.author?.name,
      image: post.author?.photo_url,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Hotelmol',
      logo: {
        '@type': 'ImageObject',
        url: 'https://hotelmol.com/logo-url.png', // IMPORTANT: Replace with your actual logo URL
      },
    },
    datePublished: post.publishedAt ? new Date(post.publishedAt).toISOString() : '',
    dateModified: post.updatedAt ? new Date(post.updatedAt).toISOString() : '',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Как Hotelmol помогает отелям?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Hotelmol предоставляет комплексные решения для автоматизации управления отелем, включая Channel Manager, Booking Engine и PMS. Это помогает увеличить доход, оптимизировать рабочие процессы и улучшить качество обслуживания гостей.',
        },
      },
      {
        '@type': 'Question',
        name: 'Что такое Channel Manager и зачем он нужен?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Channel Manager — это инструмент, который автоматически синхронизирует цены и доступность номеров на всех онлайн-площадках (таких как Booking.com, Expedia). Это исключает овербукинг и экономит время персонала.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema, null, 2) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema, null, 2) }}
      />
    </>
  );
};

export default JsonLd;
