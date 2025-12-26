"use client";

import { useTranslation } from "@/lib/TranslationContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { BlogPost } from "@/shared/schema";

export default function BlogClient({ initialPosts }: { initialPosts: BlogPost[] }) {
    const { t } = useTranslation();

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                    {t("blog.title")}
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    {t("blog.subtitle")}
                </p>
            </div>

            {initialPosts.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-muted-foreground text-lg">
                        {t("blog.empty")}
                    </p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {initialPosts.map((post) => (
                        <Link key={post.id} href={`/blog/${post.slug}`}>
                            <Card className="hover-elevate cursor-pointer transition-all duration-300">
                                <CardHeader>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                        <Calendar className="h-4 w-4" />
                                        <span>
                                            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ""}
                                        </span>
                                    </div>
                                    <CardTitle className="text-xl md:text-2xl hover:text-primary transition-colors">
                                        {post.seoTitle || post.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-wrap gap-2">
                                            {Array.isArray(post.tags) && (post.tags as string[]).slice(0, 3).map((tag, index) => (
                                                <Badge key={index} variant="secondary" className="text-xs">
                                                    {String(tag)}
                                                </Badge>
                                            ))}
                                        </div>
                                        <span className="text-primary flex items-center gap-1 text-sm font-medium">
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
    );
}
