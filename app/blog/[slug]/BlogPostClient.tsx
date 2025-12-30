"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowLeft, Tag, Sparkles, Loader2, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ShareButton from "@/components/ShareButton";
import { useTranslation } from "@/lib/TranslationContext";
import type { BlogPost } from "@/shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import JsonLd from "@/components/JsonLd";

export default function BlogPostClient({ post }: { post: BlogPost }) {
    const { t, language } = useTranslation();
    const router = useRouter();
    const [summaryData, setSummaryData] = useState<{ summary: string; keyPoints: string[] } | null>(null);

    // Выбор контента по языку с fallback на украинский
    const getLocalizedContent = () => {
        const langMap: Record<string, 'ua' | 'ru' | 'en' | 'pl'> = {
            'ua': 'ua',
            'ru': 'ru',
            'en': 'en',
            'pl': 'pl'
        };

        const currentLang = langMap[language] || 'ua';

        if (currentLang === 'ua') {
            return {
                title: post.title,
                content: post.content,
                seoTitle: post.seoTitle || post.title,
                seoDescription: post.seoDescription
            };
        }

        if (currentLang === 'ru') {
            return {
                title: post.titleRu || post.title,
                content: post.contentRu || post.content,
                seoTitle: post.seoTitleRu || post.titleRu || post.seoTitle || post.title,
                seoDescription: post.seoDescriptionRu || post.seoDescription
            };
        }

        if (currentLang === 'en') {
            return {
                title: post.titleEn || post.title,
                content: post.contentEn || post.content,
                seoTitle: post.seoTitleEn || post.titleEn || post.seoTitle || post.title,
                seoDescription: post.seoDescriptionEn || post.seoDescription
            };
        }

        // Polish
        return {
            title: post.titlePl || post.title,
            content: post.contentPl || post.content,
            seoTitle: post.seoTitlePl || post.titlePl || post.seoTitle || post.title,
            seoDescription: post.seoDescriptionPl || post.seoDescription
        };
    };

    const localizedPost = getLocalizedContent();

    const summaryMutation = useMutation({
        mutationFn: async () => {
            const res = await apiRequest("POST", "/api/blog/summarize", {
                content: localizedPost.content,
                language: language
            });
            return res.json();
        },
        onSuccess: (data) => {
            setSummaryData(data);
        }
    });

    return (
        <>
            <JsonLd post={post} localizedPost={localizedPost} />
            <article className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <Button variant="ghost" className="mb-8" onClick={() => router.push('/blog')}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                    {t("blog.backToBlog")}
                </Button>

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
                        {localizedPost.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4">
                        <Button
                            variant="outline"
                            size="sm"
                            className="bg-primary/5 border-primary/20 hover:bg-primary/10"
                            onClick={() => summaryMutation.mutate()}
                            disabled={summaryMutation.isPending}
                        >
                            {summaryMutation.isPending ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Sparkles className="mr-2 h-4 w-4 text-primary" />
                            )}
                            {t("blog.aiSummary") || "Summarize with AI"}
                        </Button>

                        <ShareButton
                            title={localizedPost.title}
                            text={localizedPost.seoDescription || ""}
                            url={typeof window !== 'undefined' ? window.location.href : ''}
                        />

                        {Array.isArray(post.tags) && post.tags.length > 0 ? (
                            <div className="flex items-center gap-2">
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
                    </div>
                </header>

                {summaryData && (
                    <div className="mb-12 p-6 rounded-2xl bg-gradient-to-br from-primary/5 via-primary/10 to-transparent border border-primary/20 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="flex items-center gap-2 mb-4 text-primary">
                            <Sparkles className="h-5 w-5" />
                            <h3 className="font-semibold text-lg">{t("blog.summaryTitle") || "AI Summary"}</h3>
                        </div>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                            {summaryData.summary}
                        </p>
                        {summaryData.keyPoints.length > 0 && (
                            <div className="space-y-3">
                                <h4 className="font-medium text-sm text-foreground uppercase tracking-wider">{t("blog.keyPoints") || "Key Takeaways"}</h4>
                                <div className="grid gap-2">
                                    {summaryData.keyPoints.map((point, i) => (
                                        <div key={i} className="flex gap-3 items-start">
                                            <CheckCircle className="h-5 w-5 text-primary/60 mt-0.5 flex-shrink-0" />
                                            <span>{point}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-serif prose-a:text-primary">
                    <div className="whitespace-pre-wrap">
                        {localizedPost.content}
                    </div>
                </div>

                <footer className="mt-12 pt-8 border-t">
                    <Button variant="outline" asChild>
                        <Link href="/blog">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            {t("blog.backToBlog")}
                        </Link>
                    </Button>
                </footer>
            </div>
        </article>
    </>
    );
}
