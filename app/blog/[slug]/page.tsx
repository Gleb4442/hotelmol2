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
    const { slug } = await params;
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
    if (!post) return { title: "Post Not Found" };

    return {
        title: `${post.seoTitle || post.title} - Hotelmol Blog`,
        description: post.seoDescription || post.description || "",
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);

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
