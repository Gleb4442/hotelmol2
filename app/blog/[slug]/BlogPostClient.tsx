"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowLeft, Tag } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/lib/TranslationContext";
import type { BlogPost } from "@/shared/schema";

export default function BlogPostClient({ post }: { post: BlogPost }) {
    const { t } = useTranslation();

    return (
        <article className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
                <Link href="/blog">
                    <Button variant="ghost" className="mb-8">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {t("blog.backToBlog")}
                    </Button>
                </Link>

                <header className="mb-8">
                    <div className="flex items-center gap-4 text-muted-foreground mb-4">
                        <span className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <time>
                                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ""}
                            </time>
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
                        {post.seoTitle || post.title}
                    </h1>

                    {Array.isArray(post.tags) && post.tags.length > 0 ? (
                        <div className="flex items-center gap-2 mt-6">
                            <Tag className="h-4 w-4 text-muted-foreground" />
                            <div className="flex flex-wrap gap-2">
                                {(post.tags as string[]).map((tag, index) => (
                                    <Badge key={index} variant="secondary">
                                        {String(tag)}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    ) : null}
                </header>

                <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-serif prose-a:text-primary">
                    <div className="whitespace-pre-wrap">
                        {post.content}
                    </div>
                </div>

                <footer className="mt-12 pt-8 border-t">
                    <Link href="/blog">
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            {t("blog.backToBlog")}
                        </Button>
                    </Link>
                </footer>
            </div>
        </article>
    );
}
