import { type LeadSubmission, type InsertLead, type CookieConsent, type InsertCookieConsent, type WaitlistSubmission, type InsertWaitlist, type BlogPost, type InsertBlogPost, type SiteSetting, leadSubmissions, cookieConsents, waitlistSubmissions, blogPosts, siteSettings } from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { desc, eq, and } from "drizzle-orm";

export interface IStorage {


  createLeadSubmission(lead: InsertLead): Promise<LeadSubmission>;
  getLeadSubmissions(): Promise<LeadSubmission[]>;
  getLeadSubmissionById(id: string): Promise<LeadSubmission | undefined>;

  createCookieConsent(consent: InsertCookieConsent): Promise<CookieConsent>;
  getCookieConsents(): Promise<CookieConsent[]>;

  createWaitlistSubmission(waitlist: InsertWaitlist): Promise<WaitlistSubmission>;
  getWaitlistSubmissions(): Promise<WaitlistSubmission[]>;

  // Blog posts

  getBlogPosts(): Promise<BlogPost[]>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  getBlogPostById(id: string): Promise<BlogPost | undefined>;
  getBlogPost(slug: string): Promise<BlogPost | undefined>;


  // Site settings
  getSiteSetting(key: string): Promise<string | null>;

}

export class MemStorage implements IStorage {

  private leadSubmissions: Map<string, LeadSubmission>;

  constructor() {

    this.leadSubmissions = new Map();
  }



  async createLeadSubmission(insertLead: InsertLead): Promise<LeadSubmission> {
    const id = randomUUID();
    const lead: LeadSubmission = {
      id,
      type: insertLead.type,
      name: insertLead.name,
      email: insertLead.email ?? null,
      phone: insertLead.phone ?? null,
      role: insertLead.role ?? null,
      property: insertLead.property ?? null,
      propertySize: insertLead.propertySize ?? null,
      comment: insertLead.comment ?? null,
      dataProcessing: insertLead.dataProcessing ?? false,
      marketing: insertLead.marketing ?? false,
      language: insertLead.language ?? null,
      utmSource: insertLead.utmSource ?? null,
      utmMedium: insertLead.utmMedium ?? null,
      utmCampaign: insertLead.utmCampaign ?? null,
      referrer: insertLead.referrer ?? null,
      mailchimpStatus: insertLead.mailchimpStatus ?? null,
      createdAt: new Date(),
    };
    this.leadSubmissions.set(id, lead);
    return lead;
  }

  async getLeadSubmissions(): Promise<LeadSubmission[]> {
    return Array.from(this.leadSubmissions.values());
  }

  async getLeadSubmissionById(id: string): Promise<LeadSubmission | undefined> {
    return this.leadSubmissions.get(id);
  }

  async createCookieConsent(): Promise<CookieConsent> {
    throw new Error("Cookie consent not implemented in MemStorage");
  }

  async getCookieConsents(): Promise<CookieConsent[]> {
    return [];
  }

  async createWaitlistSubmission(): Promise<WaitlistSubmission> {
    throw new Error("Waitlist not implemented in MemStorage");
  }

  async getWaitlistSubmissions(): Promise<WaitlistSubmission[]> {
    return [];
  }



  async getBlogPosts(): Promise<BlogPost[]> {
    return [];
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return [];
  }

  async getBlogPostById(): Promise<BlogPost | undefined> {
    return undefined;
  }

  async getBlogPost(slug: string): Promise<BlogPost | undefined> {
    return undefined;
  }



  async getSiteSetting(): Promise<string | null> {
    return null;
  }


}

export class PostgresStorage implements IStorage {


  async createLeadSubmission(insertLead: InsertLead): Promise<LeadSubmission> {
    const [lead] = await db.insert(leadSubmissions).values(insertLead).returning();
    return lead;
  }

  async getLeadSubmissions(): Promise<LeadSubmission[]> {
    return await db.select().from(leadSubmissions).orderBy(desc(leadSubmissions.createdAt));
  }

  async getLeadSubmissionById(id: string): Promise<LeadSubmission | undefined> {
    const [lead] = await db.select().from(leadSubmissions).where(eq(leadSubmissions.id, id));
    return lead || undefined;
  }

  async createCookieConsent(insertConsent: InsertCookieConsent): Promise<CookieConsent> {
    const [consent] = await db.insert(cookieConsents).values(insertConsent).returning();
    return consent;
  }

  async getCookieConsents(): Promise<CookieConsent[]> {
    return await db.select().from(cookieConsents).orderBy(desc(cookieConsents.consentedAt));
  }

  async createWaitlistSubmission(insertWaitlist: InsertWaitlist): Promise<WaitlistSubmission> {
    const [waitlist] = await db.insert(waitlistSubmissions).values(insertWaitlist).returning();
    return waitlist;
  }

  async getWaitlistSubmissions(): Promise<WaitlistSubmission[]> {
    return await db.select().from(waitlistSubmissions).orderBy(desc(waitlistSubmissions.createdAt));
  }



  async getBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).where(eq(blogPosts.status, 'published')).orderBy(desc(blogPosts.publishedAt));
  }

  async getBlogPost(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(and(eq(blogPosts.slug, slug), eq(blogPosts.status, 'published')));
    return post;
  }

  async getBlogPostById(id: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post || undefined;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post || undefined;
  }



  async getSiteSetting(key: string): Promise<string | null> {
    const [setting] = await db.select().from(siteSettings).where(eq(siteSettings.key, key));
    return setting?.value || null;
  }


}

export const storage = new PostgresStorage();
