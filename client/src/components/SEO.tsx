import { useEffect } from "react";
import { useTranslation } from "@/lib/TranslationContext";

interface SEOProps {
  title: string;
  description: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: object;
  noindex?: boolean;
}

export default function SEO({ 
  title, 
  description, 
  ogImage = "/og-image.jpg",
  ogType = "website",
  structuredData,
  noindex = false
}: SEOProps) {
  const { language } = useTranslation();

  useEffect(() => {
    // Update document title
    document.title = `${title} | hotelmol`;
    
    // Update HTML lang attribute
    document.documentElement.lang = language;

    // Update or create meta tags
    const updateMetaTag = (property: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${property}"]`) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Standard meta tags
    updateMetaTag('description', description);
    
    // Robots meta tag - always set to ensure proper value
    updateMetaTag('robots', noindex ? 'noindex, nofollow' : 'index, follow');
    
    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:locale', language === 'ru' ? 'ru_RU' : language === 'ua' ? 'uk_UA' : 'en_US', true);
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);

    // Add structured data if provided
    if (structuredData) {
      let scriptElement = document.querySelector('script[type="application/ld+json"][data-page-schema]') as HTMLScriptElement;
      
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.type = 'application/ld+json';
        scriptElement.setAttribute('data-page-schema', 'true');
        document.head.appendChild(scriptElement);
      }
      scriptElement.text = JSON.stringify(structuredData);
    }

    // Cleanup function to remove page-specific schema when unmounting
    return () => {
      const scriptElement = document.querySelector('script[type="application/ld+json"][data-page-schema]');
      if (scriptElement) {
        scriptElement.remove();
      }
    };
  }, [title, description, ogImage, ogType, structuredData, language, noindex]);

  return null;
}

// Structured data helpers
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "hotelmol",
  "description": "AI-powered guest communication for modern hotels",
  "url": "https://hotelmol.com",
  "logo": "https://hotelmol.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+380 93 160 3830",
    "contactType": "Customer Service",
    "email": "partnerships@hotelmol.com",
    "availableLanguage": ["English", "Russian", "Ukrainian"]
  },
  "sameAs": [
    "https://linkedin.com/company/hotelmol",
    "https://twitter.com/hotelmol"
  ]
};

export const productSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Roomie",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "description": "AI assistant that handles guest communications 24/7 in 100+ languages",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "150"
  }
};

export const faqSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});
