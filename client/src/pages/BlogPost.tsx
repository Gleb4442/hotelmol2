import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from "@/lib/TranslationContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, Tag } from "lucide-react";
import type { BlogPost } from "@shared/schema";

export default function BlogPostPage() {
  const { t } = useTranslation();
  const params = useParams<{ slug: string }>();

  const { data, isLoading, error } = useQuery<{ post: BlogPost }>({
    queryKey: [`/api/posts/${params.slug}`],
    queryFn: async () => {
      const response = await fetch(`/api/blog/posts/${params.slug}`);
      if (!response.ok) {
        throw new Error("Post not found");
      }
      return response.json();
    },
  });

  const post = data?.post;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">{t("blog.notFound")}</h1>
            <Link href="/blog">
              <Button variant="outline" data-testid="button-back-to-blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t("blog.backToBlog")}
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-20">
        <article className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Link href="/blog">
              <Button variant="ghost" className="mb-8" data-testid="button-back-to-blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t("blog.backToBlog")}
              </Button>
            </Link>

            <header className="mb-8">
              <div className="flex items-center gap-4 text-muted-foreground mb-4">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time data-testid="text-post-date">
                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ""}
                  </time>
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6" data-testid="heading-post-title">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="text-xl text-muted-foreground leading-relaxed" data-testid="text-post-excerpt">
                  {post.excerpt}
                </p>
              )}

              {post.keywords && post.keywords.length > 0 && (
                <div className="flex items-center gap-2 mt-6">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <div className="flex flex-wrap gap-2">
                    {post.keywords.map((keyword, index) => (
                      <Badge key={index} variant="secondary" data-testid={`badge-keyword-${index}`}>
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </header>

            <div
              className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-serif prose-a:text-primary"
              data-testid="content-post-body"
            >
              <div className="whitespace-pre-wrap">
                {post.content}
              </div>
            </div>

            <footer className="mt-12 pt-8 border-t">
              <Link href="/blog">
                <Button variant="outline" data-testid="button-back-to-blog-bottom">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t("blog.backToBlog")}
                </Button>
              </Link>
            </footer>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
