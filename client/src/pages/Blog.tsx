import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from "@/lib/TranslationContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";
import type { BlogPost } from "@shared/schema";

export default function Blog() {
  const { t } = useTranslation();

  const { data, isLoading } = useQuery<{ posts: BlogPost[] }>({
    queryKey: ["/api/posts"],
  });

  const posts = data?.posts || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-20" style={{ paddingTop: 'calc(8rem + 30px)' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4" data-testid="heading-blog-title">
                {t("blog.title")}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-blog-subtitle">
                {t("blog.subtitle")}
              </p>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg" data-testid="text-blog-empty">
                  {t("blog.empty")}
                </p>
              </div>
            ) : (
              <div className="grid gap-6">
                {posts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <Card className="hover-elevate cursor-pointer transition-all duration-300" data-testid={`card-blog-post-${post.id}`}>
                      <CardHeader>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Calendar className="h-4 w-4" />
                          <span data-testid={`text-post-date-${post.id}`}>
                            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ""}
                          </span>
                        </div>
                        <CardTitle className="text-xl md:text-2xl hover:text-primary transition-colors" data-testid={`text-post-title-${post.id}`}>
                          {post.seoTitle || post.title}
                        </CardTitle>

                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {Array.isArray(post.tags) && post.tags.slice(0, 3).map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs" data-testid={`badge-tag-${post.id}-${index}`}>
                                {String(tag)}
                              </Badge>
                            ))}
                          </div>
                          <span className="text-primary flex items-center gap-1 text-sm font-medium" data-testid={`link-read-more-${post.id}`}>
                            {t("blog.readMore")} <ArrowRight className="h-4 w-4" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
