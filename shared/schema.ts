import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, serial, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";





export const leadSubmissions = pgTable("lead_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  type: text("type").notNull(), // 'roi', 'contact', 'demo'
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  role: text("role"),
  property: text("property"),
  propertySize: text("property_size"),
  comment: text("comment"),
  dataProcessing: boolean("data_processing").notNull().default(false),
  marketing: boolean("marketing").notNull().default(false),
  language: text("language").default('en'),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  referrer: text("referrer"),
  mailchimpStatus: text("mailchimp_status"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const cookieConsents = pgTable("cookie_consents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  consentedAt: timestamp("consented_at").defaultNow().notNull(),
  language: text("language").default('en'),
  categories: jsonb("categories").notNull(), // { essential: true, analytics: boolean, marketing: boolean }
  ipHash: text("ip_hash"), // hashed IP for GDPR compliance
  userAgent: text("user_agent"),
});

export const waitlistSubmissions = pgTable("waitlist_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  budget: text("budget").notNull(), // 'upTo100', 'upTo500', 'upTo1000', 'over1000'
  hotelName: text("hotel_name"),
  language: text("language").default('en'),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});



export const insertLeadSchema = createInsertSchema(leadSubmissions).omit({
  id: true,
  createdAt: true,
});

export const insertCookieConsentSchema = createInsertSchema(cookieConsents).omit({
  id: true,
  consentedAt: true,
});

export const cookieConsentSchema = z.object({
  language: z.string().default('en'),
  categories: z.object({
    essential: z.boolean().default(true),
    analytics: z.boolean(),
    marketing: z.boolean(),
  }),
  ipHash: z.string().optional(),
  userAgent: z.string().optional(),
});

export const roiLeadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  propertySize: z.string().min(1, "Property size is required"),
  dataProcessing: z.boolean().refine((val) => val === true, {
    message: "You must agree to data processing",
  }),
  marketing: z.boolean().optional(),
  language: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  referrer: z.string().optional(),
});

export const contactLeadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  role: z.string().optional(),
  property: z.string().optional(),
  comment: z.string().optional(),
  dataProcessing: z.boolean().refine((val) => val === true, {
    message: "You must agree to data processing",
  }),
  marketing: z.boolean().optional(),
  language: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  referrer: z.string().optional(),
});

export const demoLeadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  property: z.string().optional(),
  dataProcessing: z.boolean().refine((val) => val === true, {
    message: "You must agree to data processing",
  }),
  marketing: z.boolean().optional(),
  language: z.string().optional(),
});

export const integrationLeadSchema = z.object({
  name: z.string().optional(),
  phone: z.string().min(1, "Phone is required"),
  property: z.string().optional(),
  language: z.string().optional(),
});

export const waitlistSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  budget: z.string().min(1, "Budget is required"),
  hotelName: z.string().optional(),
  language: z.string().optional(),
});

export const insertWaitlistSchema = createInsertSchema(waitlistSubmissions).omit({
  id: true,
  createdAt: true,
});


export type InsertLead = z.infer<typeof insertLeadSchema>;
export type LeadSubmission = typeof leadSubmissions.$inferSelect;
export type ROILead = z.infer<typeof roiLeadSchema>;
export type ContactLead = z.infer<typeof contactLeadSchema>;
export type DemoLead = z.infer<typeof demoLeadSchema>;
export type InsertCookieConsent = z.infer<typeof insertCookieConsentSchema>;
export type CookieConsent = typeof cookieConsents.$inferSelect;
export type CookieConsentInput = z.infer<typeof cookieConsentSchema>;
export type WaitlistSubmission = typeof waitlistSubmissions.$inferSelect;
export type InsertWaitlist = z.infer<typeof insertWaitlistSchema>;
export type Waitlist = z.infer<typeof waitlistSchema>;

// Blog Posts table for SEO-optimized blog
export const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(), // MDX content
  excerpt: text("excerpt"), // Short description for listing
  coverImage: text("cover_image"), // Cover image URL
  keywords: text("keywords").array(), // SEO keywords array
  metaTitle: text("meta_title"), // Custom meta title
  metaDescription: text("meta_description"), // Custom meta description
  published: boolean("published").notNull().default(false),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;

// Site Settings table for global configuration
export const siteSettings = pgTable("site_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertSiteSettingSchema = createInsertSchema(siteSettings).omit({
  id: true,
  updatedAt: true,
});

export type SiteSetting = typeof siteSettings.$inferSelect;
export type InsertSiteSetting = z.infer<typeof insertSiteSettingSchema>;
