
import { db } from "./db";
import { sql } from "drizzle-orm";

async function testConnection() {
    console.log("Testing database connection and inspecting columns...");
    try {
        const columns = await db.execute(sql`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'blog_posts'
        `);
        console.log("Columns in 'blog_posts' table:");
        console.table(columns.rows);

        // Check if excerpt exists in columns
        const hasExcerpt = columns.rows.some((c: any) => c.column_name === 'excerpt');
        console.log("Has 'excerpt' column:", hasExcerpt);

        if (hasExcerpt) {
            const posts = await db.execute(sql`SELECT * FROM blog_posts LIMIT 1`);
            console.log("Sample post:", JSON.stringify(posts.rows[0], null, 2));
        } else {
            console.log("Fetching what is available...");
            const posts = await db.execute(sql`SELECT * FROM blog_posts LIMIT 1`);
            console.log("Available columns content:", JSON.stringify(posts.rows[0], null, 2));
        }
    } catch (error) {
        console.error("Inspection failed:");
        console.error(error);
        process.exit(1);
    }
}

testConnection();
