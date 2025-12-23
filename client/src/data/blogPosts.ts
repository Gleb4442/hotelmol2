export interface BlogPost {
  id: string;
  titleKey: string;
  excerptKey: string;
  contentKey: string;
  date: string;
  category: "Technology" | "Best Practices" | "Industry News" | "Product Updates";
  tags: string[];
  authorKey: string;
  authorRole: string;
  image: string;
  readTime: number;
}

export const blogPosts: BlogPost[] = [
  {
    id: "ai-hospitality-revolution",
    titleKey: "blog.post1.title",
    excerptKey: "blog.post1.excerpt",
    contentKey: "blog.post1.content",
    date: "2025-03-15",
    category: "Technology",
    tags: ["AI", "Innovation", "Guest Experience"],
    authorKey: "blog.post1.author",
    authorRole: "blog.post1.authorRole",
    image: "/api/placeholder/800/450",
    readTime: 5
  },
  {
    id: "maximize-direct-bookings",
    titleKey: "blog.post2.title",
    excerptKey: "blog.post2.excerpt",
    contentKey: "blog.post2.content",
    date: "2025-03-10",
    category: "Best Practices",
    tags: ["Direct Bookings", "Revenue", "Strategy"],
    authorKey: "blog.post2.author",
    authorRole: "blog.post2.authorRole",
    image: "/api/placeholder/800/450",
    readTime: 7
  },
  {
    id: "multilingual-guest-communication",
    titleKey: "blog.post3.title",
    excerptKey: "blog.post3.excerpt",
    contentKey: "blog.post3.content",
    date: "2025-03-05",
    category: "Technology",
    tags: ["Multilingual", "Communication", "AI"],
    authorKey: "blog.post3.author",
    authorRole: "blog.post3.authorRole",
    image: "/api/placeholder/800/450",
    readTime: 6
  },
  {
    id: "hotel-industry-trends-2025",
    titleKey: "blog.post4.title",
    excerptKey: "blog.post4.excerpt",
    contentKey: "blog.post4.content",
    date: "2025-02-28",
    category: "Industry News",
    tags: ["Trends", "2025", "Hospitality"],
    authorKey: "blog.post4.author",
    authorRole: "blog.post4.authorRole",
    image: "/api/placeholder/800/450",
    readTime: 8
  },
  {
    id: "roomie-2-0-features",
    titleKey: "blog.post5.title",
    excerptKey: "blog.post5.excerpt",
    contentKey: "blog.post5.content",
    date: "2025-02-20",
    category: "Product Updates",
    tags: ["Roomie", "Features", "Update"],
    authorKey: "blog.post5.author",
    authorRole: "blog.post5.authorRole",
    image: "/api/placeholder/800/450",
    readTime: 4
  },
  {
    id: "upselling-automation-guide",
    titleKey: "blog.post6.title",
    excerptKey: "blog.post6.excerpt",
    contentKey: "blog.post6.content",
    date: "2025-02-15",
    category: "Best Practices",
    tags: ["Upselling", "Revenue", "Automation"],
    authorKey: "blog.post6.author",
    authorRole: "blog.post6.authorRole",
    image: "/api/placeholder/800/450",
    readTime: 6
  },
  {
    id: "integration-best-practices",
    titleKey: "blog.post7.title",
    excerptKey: "blog.post7.excerpt",
    contentKey: "blog.post7.content",
    date: "2025-02-10",
    category: "Technology",
    tags: ["Integration", "PMS", "Tech Stack"],
    authorKey: "blog.post7.author",
    authorRole: "blog.post7.authorRole",
    image: "/api/placeholder/800/450",
    readTime: 5
  },
  {
    id: "guest-satisfaction-metrics",
    titleKey: "blog.post8.title",
    excerptKey: "blog.post8.excerpt",
    contentKey: "blog.post8.content",
    date: "2025-02-05",
    category: "Best Practices",
    tags: ["Metrics", "Guest Satisfaction", "Analytics"],
    authorKey: "blog.post8.author",
    authorRole: "blog.post8.authorRole",
    image: "/api/placeholder/800/450",
    readTime: 7
  },
  {
    id: "data-privacy-security",
    titleKey: "blog.post9.title",
    excerptKey: "blog.post9.excerpt",
    contentKey: "blog.post9.content",
    date: "2025-01-28",
    category: "Technology",
    tags: ["Security", "Data Privacy", "AI"],
    authorKey: "blog.post9.author",
    authorRole: "blog.post9.authorRole",
    image: "/api/placeholder/800/450",
    readTime: 9
  },
  {
    id: "ai-human-balance",
    titleKey: "blog.post10.title",
    excerptKey: "blog.post10.excerpt",
    contentKey: "blog.post10.content",
    date: "2025-01-20",
    category: "Best Practices",
    tags: ["AI", "Chatbots", "Customer Service"],
    authorKey: "blog.post10.author",
    authorRole: "blog.post10.authorRole",
    image: "/api/placeholder/800/450",
    readTime: 6
  }
];
