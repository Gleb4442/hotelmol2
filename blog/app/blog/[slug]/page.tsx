import { getPostBySlug, getAllPostSlugs } from '@/lib/db';
import { getMDXContent } from '@/lib/mdx';
import { formatDate, generateSeoTitle, generateSeoDescription } from '@/lib/utils';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import type { Metadata } from 'next';

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Стаття не знайдена',
    };
  }

  const mainKeyword = post.keywords?.[0] || 'AI технології';
  const title = generateSeoTitle(post.title, mainKeyword);
  const description = generateSeoDescription(post.excerpt, mainKeyword);

  return {
    title,
    description,
    keywords: post.keywords || [],
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt?.toISOString(),
      authors: ['Roomie'],
      locale: 'uk_UA',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { content } = await getMDXContent(post.content);
  const mainKeyword = post.keywords?.[0] || 'AI для готелів';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || post.metaDescription,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt?.toISOString(),
    author: {
      '@type': 'Organization',
      name: 'Roomie',
      url: 'https://roomie.com.ua',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Roomie',
      logo: {
        '@type': 'ImageObject',
        url: 'https://roomie.com.ua/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://blog.roomie.com.ua/blog/${post.slug}`,
    },
    keywords: post.keywords?.join(', '),
  };

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
        data-testid="link-back-to-blog"
      >
        <ArrowLeft className="w-4 h-4" />
        Назад до блогу
      </Link>

      <header className="mb-8">
        <h1 
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          data-testid="text-article-title"
        >
          {post.title} — {mainKeyword} для готелів Україна
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
          {post.publishedAt && (
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(post.publishedAt)}
            </span>
          )}
          {post.keywords && post.keywords.length > 0 && (
            <span className="flex items-center gap-1">
              <Tag className="w-4 h-4" />
              {post.keywords[0]}
            </span>
          )}
        </div>
      </header>

      {post.excerpt && (
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          {post.excerpt}
        </p>
      )}

      <div className="prose max-w-none" data-testid="article-content">
        {content}
      </div>

      {post.keywords && post.keywords.length > 0 && (
        <div className="mt-12 pt-8 border-t border-border">
          <h2 className="text-lg font-semibold mb-4">Теги</h2>
          <div className="flex flex-wrap gap-2">
            {post.keywords.map((keyword) => (
              <span
                key={keyword}
                className="bg-muted px-3 py-1 rounded-full text-sm text-muted-foreground"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-12 p-6 bg-card border border-border rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Хочете автоматизувати ваш готель?</h2>
        <p className="text-muted-foreground mb-4">
          Roomie — AI-асистент, який допомагає готелям України збільшувати прибуток та покращувати сервіс.
        </p>
        <a
          href="https://roomie.com.ua"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
          data-testid="link-cta-main-site"
        >
          Дізнатися більше про Roomie
        </a>
      </div>
    </article>
  );
}
