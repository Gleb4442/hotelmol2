import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { db } from "@/lib/db";
import BlogClient from "./BlogClient";

export const metadata = {
    title: "Blog - Hotelmol",
    description: "Insights and news about AI in hospitality.",
};

export default async function BlogPage() {
    // Fetch posts directly from DB for SSG
    const posts = await db.query.blogPosts.findMany({
        orderBy: (posts: any, { desc }: any) => [desc(posts.publishedAt)],
    });

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-32 pb-20" style={{ paddingTop: 'calc(8rem + 30px)' }}>
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <BlogClient initialPosts={posts} />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
