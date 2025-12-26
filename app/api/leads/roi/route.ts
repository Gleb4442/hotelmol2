import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { roiLeadSchema, leadSubmissions } from "@/shared/schema";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validated = roiLeadSchema.parse(body);

        const [lead] = await db.insert(leadSubmissions).values({ ...validated, type: "roi" }).returning();

        // Trigger n8n webhook if configured
        if (process.env.N8N_WEBHOOK_URL) {
            try {
                await fetch(process.env.N8N_WEBHOOK_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...validated, source: "roi_calculator", id: lead.id }),
                });
            } catch (e) {
                console.error("n8n webhook failed", e);
            }
        }

        return NextResponse.json(lead);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
