import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { roiLeadSchema, contactLeadSchema, demoLeadSchema, cookieConsentSchema, integrationLeadSchema } from "@shared/schema";
import { createHash } from "crypto";
import { db } from "./db";

import { sendToN8n } from "./n8n";

function hashIP(ip: string): string {
  return createHash('sha256').update(ip).digest('hex');
}

export async function registerRoutes(app: Express): Promise<Server> {

  // --- Contacts / Leads (Public Submissions) ---

  app.post("/api/leads/roi", async (req, res) => {
    try {
      const validatedData = roiLeadSchema.parse(req.body);
      const lead = await storage.createLeadSubmission({
        type: "roi",
        name: validatedData.name,
        email: null,
        phone: validatedData.phone,
        propertySize: validatedData.propertySize,
        dataProcessing: validatedData.dataProcessing,
        marketing: validatedData.marketing || false,
        language: validatedData.language || "en",
        utmSource: validatedData.utmSource,
        utmMedium: validatedData.utmMedium,
        utmCampaign: validatedData.utmCampaign,
        referrer: validatedData.referrer,
        role: null,
        property: null,
        comment: null,
        mailchimpStatus: "skipped",
      });
      // Fire and forget n8n webhook (lead)
      void sendToN8n(lead, "lead", "roi");

      res.json({ success: true, message: "ROI estimate request submitted successfully", leadId: lead.id });
    } catch (error: any) {
      if (error.errors) return res.status(400).json({ success: false, errors: error.errors });
      res.status(500).json({ success: false, message: "Failed to submit request" });
    }
  });

  app.post("/api/leads/contact", async (req, res) => {
    try {
      const validatedData = contactLeadSchema.parse(req.body);

      const lead = await storage.createLeadSubmission({
        type: "contact",
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        role: validatedData.role || null,
        property: validatedData.property || null,
        comment: validatedData.comment || null,
        dataProcessing: validatedData.dataProcessing,
        marketing: validatedData.marketing || false,
        language: validatedData.language || "en",
        utmSource: validatedData.utmSource,
        utmMedium: validatedData.utmMedium,
        utmCampaign: validatedData.utmCampaign,
        referrer: validatedData.referrer,
        propertySize: null,
        mailchimpStatus: "skipped",
      });
      // Fire and forget n8n webhook (lead)
      void sendToN8n(lead, "lead", "contact");

      res.json({ success: true, message: "Contact form submitted successfully", leadId: lead.id });
    } catch (error: any) {
      if (error.errors) return res.status(400).json({ success: false, errors: error.errors });
      res.status(500).json({ success: false, message: "Failed to submit contact form" });
    }
  });

  app.post("/api/leads/demo", async (req, res) => {
    try {
      const validatedData = demoLeadSchema.parse(req.body);

      const lead = await storage.createLeadSubmission({
        type: "demo",
        name: validatedData.name,
        email: validatedData.email,
        property: validatedData.property || null,
        dataProcessing: validatedData.dataProcessing,
        marketing: validatedData.marketing || false,
        language: validatedData.language || "en",
        phone: null,
        role: null,
        propertySize: null,
        comment: null,
        utmSource: null,
        utmMedium: null,
        utmCampaign: null,
        referrer: null,
        mailchimpStatus: null,
      });
      // Fire and forget n8n webhook (lead)
      void sendToN8n(lead, "lead", "demo");

      res.json({ success: true, message: "Demo request submitted successfully", leadId: lead.id });
    } catch (error: any) {
      if (error.errors) return res.status(400).json({ success: false, errors: error.errors });
      res.status(500).json({ success: false, message: "Failed to submit demo request" });
    }
  });

  app.post("/api/leads/integration", async (req, res) => {
    try {
      const validatedData = integrationLeadSchema.parse(req.body);

      const lead = await storage.createLeadSubmission({
        type: "integration",
        name: validatedData.name,
        phone: validatedData.phone,
        property: validatedData.property,
        email: null,
        role: null,
        comment: null,
        dataProcessing: true,
        marketing: false,
        language: "en",
        utmSource: null,
        utmMedium: null,
        utmCampaign: null,
        referrer: null,
        propertySize: null,
        mailchimpStatus: "skipped",
      });
      // Fire and forget n8n webhook (lead)
      void sendToN8n(lead, "lead", "integration");

      res.json({ success: true, message: "Integration request submitted successfully", leadId: lead.id });
    } catch (error: any) {
      if (error.errors) return res.status(400).json({ success: false, errors: error.errors });
      res.status(500).json({ success: false, message: "Failed to submit integration request" });
    }
  });

  // --- Cookie Consents ---

  app.post("/api/cookie-consents", async (req, res) => {
    try {
      const validatedData = cookieConsentSchema.parse(req.body);
      const clientIP = req.ip || req.headers['x-forwarded-for'] as string || 'unknown';
      const ipHash = clientIP !== 'unknown' ? hashIP(clientIP) : null;
      const userAgent = (req.headers['user-agent'] || null) as string | null;

      const consent = await storage.createCookieConsent({
        language: validatedData.language,
        categories: validatedData.categories,
        ipHash: ipHash,
        userAgent: userAgent,
      });

      // Fire and forget n8n webhook (cookie)
      void sendToN8n(consent, "cookie");

      res.json({ success: true, message: "Cookie consent saved successfully", consentId: consent.id });
    } catch (error: any) {
      if (error.errors) return res.status(400).json({ success: false, errors: error.errors });
      res.status(500).json({ success: false, message: "Failed to save cookie consent" });
    }
  });

  // --- Blog Posts (Public Read-Only) ---

  app.get("/api/posts", async (req, res) => {
    try {
      const posts = await storage.getPublishedBlogPosts();
      res.json({ success: true, posts });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch posts" });
    }
  });

  // --- Health ---
  app.get("/api/health", (req, res) => {
    res.json({ status: 'ok', database: 'connected' });
  });


  const httpServer = createServer(app);
  return httpServer;
}
