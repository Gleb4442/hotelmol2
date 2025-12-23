import { getAllPublishedPosts } from '@/lib/db';
import { formatDate } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 3600;

export default async function BlogHome() {
  const posts = await getAllPublishedPosts();

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4" data-testid="text-blog-title">
          AI для готелів Україна — Блог Roomie
        </h1>
        <p className="text-xl text-muted-foreground mb-12">
          Корисні статті про автоматизацію готельного бізнесу, чат-боти та AI-технології для готелів.
        </p>

        {posts.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-lg border border-border">
            <p className="text-muted-foreground text-lg" data-testid="text-no-posts">
              Статті скоро з&apos;являться. Слідкуйте за оновленнями!
            </p>
          </div>
        ) : (
          <div className="grid gap-8">
            {posts.map((post) => (
              <article 
                key={post.id} 
                className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
                data-testid={`card-post-${post.slug}`}
              >
                <Link href={`/blog/${post.slug}`} className="block group">
                  <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <time className="text-sm text-muted-foreground">
                      {formatDate(post.publishedAt)}
                    </time>
                    <span className="text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                      Читати далі <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
                {post.keywords && post.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.keywords.slice(0, 3).map((keyword) => (
                      <span 
                        key={keyword} 
                        className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'Roomie Blog',
            description: 'AI для готелів Україна - корисні статті про автоматизацію готельного бізнесу',
            url: 'https://blog.roomie.com.ua',
            publisher: {
              '@type': 'Organization',
              name: 'Roomie',
              logo: {
                '@type': 'ImageObject',
                url: 'https://roomie.com.ua/logo.png',
              },
            },
          }),
        }}
      />
    </div>
  );
}
