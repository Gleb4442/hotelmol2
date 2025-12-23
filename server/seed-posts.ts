
import { db } from "./db";
import { blogPosts } from "../shared/schema";

async function main() {
    console.log("Seeding blog posts...");

    try {
        const posts = [
            {
                title: "Welcome to Hotelmol Blog",
                slug: "welcome-to-hotelmol",
                content: `
# Welcome to Hotelmol

This is the first post on the Hotelmol blog. We are excited to share insights about hospitality automation and AI.

## Why AI?

AI is transforming the hotel industry by:
- Automating guest communication
- Increasing revenue through upsells
- Improving operational efficiency

Stay tuned for more!
        `,
                excerpt: "Welcome to the new Hotelmol blog. Discover how AI is transforming hospitality.",
                coverImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000",
                keywords: ["hotel", "ai", "automation"],
                metaTitle: "Welcome to Hotelmol Blog",
                metaDescription: "The first post on the Hotelmol blog about hotel automation.",
                published: true,
                publishedAt: new Date(),
            }
        ];

        for (const post of posts) {
            await db.insert(blogPosts).values(post).onConflictDoNothing();
        }

        console.log("Seeding completed successfully.");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding posts:", error);
        process.exit(1);
    }
}

main();
