import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { blogPosts } from "@/shared/schema";
import BlogPostClient from "./BlogPostClient";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const posts = await db.select({ slug: blogPosts.slug }).from(blogPosts);
    return posts.map((post: any) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug: encodedSlug } = await params;
    const slug = decodeURIComponent(encodedSlug);
    const post = await db.query.blogPosts.findFirst({
        where: (posts: any, { eq }: any) => eq(posts.slug, slug),
        with: {
            author: true,
        },
    });
    if (!post) return { title: "Post Not Found" };

    const metadata: any = {
        title: `${post.seoTitle || post.title} - Hotelmol Blog`,
        description: post.seoDescription || post.description || "",
    };

    if (post.author) {
        metadata.authors = [{ name: post.author.name }];
    }

    return metadata;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug: encodedSlug } = await params;
    const slug = decodeURIComponent(encodedSlug);
    const post = await db.query.blogPosts.findFirst({
        where: (posts: any, { eq }: any) => eq(posts.slug, slug),
        with: {
            author: true,
        },
    });

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-32 pb-20">
                <BlogPostClient post={post} />
            </main>
            <Footer />
        </div>
    );
}
