
import { log } from "./vite";

type WebhookType = "cookie" | "lead";

interface N8nPayload {
    type: string;
    source?: string; // specific form source like "roi", "contact"
    timestamp: string;
    data: Record<string, any>;
}

export async function sendToN8n(data: Record<string, any>, webhookType: WebhookType, sourceType?: string): Promise<void> {
    const url = webhookType === "cookie"
        ? process.env.N8N_COOKIE_WEBHOOK_URL
        : process.env.N8N_LEAD_WEBHOOK_URL;

    if (!url) {
        log(`[n8n] Skipped: No webhook URL configured for ${webhookType}`);
        return;
    }

    const payload: N8nPayload = {
        type: webhookType, // "cookie" or "lead"
        source: sourceType, // e.g. "roi", "contact", undefined for cookies if not needed
        timestamp: new Date().toISOString(),
        data
    };

    try {
        log(`[n8n] Sending ${webhookType} event to ${url}`);

        // Set a timeout of 5 seconds to prevent hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            log(`[n8n] Error: ${response.status} ${response.statusText}`);
            // We log but don't throw, so we don't break the user flow
        } else {
            log(`[n8n] Success: Event delivered`);
        }
    } catch (error: any) {
        log(`[n8n] Failed to send webhook: ${error.message}`);
    }
}
