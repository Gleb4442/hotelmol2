# HotelMind Website Design Guidelines

## Design Approach

**Selected Approach:** Reference-Based (Premium B2B SaaS)
- Primary references: Linear (clean typography, generous spacing), Stripe (sophisticated simplicity), Notion (content hierarchy)
- Industry positioning: Premium enterprise software with contemporary minimalism
- Key principle: "Expensive studio" aesthetic - restrained, confident, spacious

## Core Design Elements

### A. Color Palette

**Strict Brand Compliance - Single Accent System:**

Primary Accent:
- HotelMind Blue: 207 83% 32% (HSL: #0752A0)

Accent Shades (for hover states, borders, backgrounds):
- Light Blue 1: 207 45% 48% (#4778A8)
- Light Blue 2: 207 48% 56% (#5989B6)  
- Light Blue 3: 207 52% 60% (#709DC4)
- Light Blue 4: 207 45% 68% (#92B4CD)
- Light Blue 5: 207 58% 76% (#ACCAE0)

Neutrals:
- Charcoal: 0 0% 7% (#111111) - Dark backgrounds, primary text
- Graphite: 0 0% 12% (#1F1F1F) - Card backgrounds, secondary surfaces
- Grey: 0 0% 54% (#8A8A8A) - Secondary text, borders
- Off-White: 40 20% 96% (#F6F6F4) - Light backgrounds, subtle contrast
- Pure White: 0 0% 100% (#FFFFFF) - Primary light backgrounds

**Critical Rule:** NO other accent colors permitted. No gold, yellow, green, or secondary brand colors. Monochrome integration logos only.

### B. Typography

**Heading Font:** Fraunces (serif, elegant, premium feel)
- H1: 3.5rem (56px) / leading-tight / font-semibold / tracking-tight
- H2: 2.5rem (40px) / leading-tight / font-semibold
- H3: 2rem (32px) / leading-snug / font-medium
- H4: 1.5rem (24px) / leading-snug / font-medium

**Body & UI Font:** Inter (clean, professional)
- Body: 1.125rem (18px) / leading-relaxed (1.75) / font-normal
- UI Elements: 1rem (16px) / leading-normal / font-medium
- Small Text: 0.875rem (14px) / leading-normal

### C. Layout System

**Spacing Primitives:** Use Tailwind units 4, 6, 8, 12, 16, 20, 24, 32
- Component padding: p-8 to p-12
- Section vertical spacing: py-20 (mobile) to py-32 (desktop)
- Card spacing: p-6 to p-8
- Button padding: px-6 py-3 to px-8 py-4

**Container Strategy:**
- Full-width sections: w-full with max-w-7xl mx-auto px-4
- Content sections: max-w-6xl mx-auto
- Text content: max-w-4xl for readability
- Grid gaps: gap-6 to gap-12

**Breakpoints:** 
- Mobile: 360px (sm)
- Tablet: 768px (md)
- Desktop: 1024px (lg)
- Large: 1280px (xl)
- XL: 1536px (2xl)

### D. Component Library

**Navigation:**
- Fixed header with subtle backdrop-blur
- Logo left, navigation center, "Try Demo" + Language switcher right
- Mobile: Hamburger menu with slide-in drawer
- Link states: underline-offset-4 on hover with HotelMind Blue

**Buttons:**
- Primary: bg-[#0752A0] text-white with hover:bg-[#4778A8] transition
- Secondary: border-2 border-[#0752A0] text-[#0752A0] hover:bg-[#0752A0] hover:text-white
- Outline on images: backdrop-blur-md bg-white/10 border-white/30 (no custom hover states)
- Sizing: Large CTAs (h-14), Standard (h-12), Small (h-10)
- Rounded: rounded-lg (8px)

**Cards:**
- Soft shadow: shadow-lg with hover:shadow-xl transition
- Background: bg-white (light) or bg-[#1F1F1F] (dark)
- Border: border border-grey/10
- Padding: p-8 to p-12
- Rounded: rounded-xl (12px)

**Forms:**
- Input fields: h-12, border-2 border-grey/20, rounded-lg, focus:border-[#0752A0]
- Labels: text-sm font-medium text-charcoal mb-2
- Checkboxes: Custom styled with HotelMind Blue accent
- Error states: border-red-500 with text-red-600 message

**Integration Ticker:**
- Monochrome/outline logos only (no blue/cyan tones)
- Horizontal scroll on mobile, CSS loop on desktop
- "Coming soon" micro-badges: text-xs bg-grey/10 text-grey px-2 py-1 rounded-full
- Pause on hover, respect prefers-reduced-motion

**Icons:**
- Use Lucide React or Heroicons (outline style)
- Size: w-6 h-6 for standard, w-8 h-8 for feature icons
- Color: text-[#0752A0] for accent, text-grey for secondary

### E. Animations

**Minimal & Purposeful:**
- Fade-in on scroll: opacity transitions with IntersectionObserver
- Hover transitions: 200ms ease-in-out for buttons, cards
- Hero parallax: Subtle (max 20px shift)
- Counter animations: On viewport entry for benefit numbers
- "Typing" indicator: Three dots animation for Roomie context
- NO complex animations, page transitions, or scroll-jacking

## Page-Specific Guidelines

### Home Page

**Hero Section (100vh):**
- Large hero image: High-quality hotel lobby/reception photo with subtle overlay (bg-charcoal/30)
- Headline: Fraunces 56px, centered, white text with subtle text-shadow
- Subtitle: Inter 20px, max-w-2xl, centered
- CTAs: Two buttons side-by-side - "Request a Demo" (primary) + "See Case Studies" (outline with backdrop-blur)
- Layout: Centered content, generous whitespace

**How Roomie Works Section:**
- 5-step horizontal timeline (vertical on mobile)
- Each step: Icon (w-12 h-12, HotelMind Blue) → Title → Description
- Connector lines between steps (border-t-2 border-blue/20)
- Background: bg-off-white

**Integration Ticker:**
- Height: h-20
- Logos: 8 platforms, monochrome, h-8 to h-12
- Infinite loop with smooth scrolling
- "Coming soon" badges on WhatsApp/Instagram

**Benefits Section (3-column grid):**
- Cards with icon, number (counter animation), title, description
- Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Shadowed cards on white background

**Case Studies Preview:**
- 2-3 featured cases in card format
- Each card: Client logo, quote snippet, result numbers, "Read more" link
- Masonry or staggered layout for visual interest

**ROI Estimate CTA:**
- Full-width section with bg-graphite, white text
- Mini-form inline: Name, Email, Property Size, Submit
- Headline: "Calculate Your Potential ROI"

### Roomie Product Page

**Product Overview:**
- Split layout: Left (description, features list), Right (Roomie UI mockup/screenshot)
- Feature modules: Accordion or tabbed interface
- Architecture diagram: SVG illustration, simplified for non-tech audience
- On-page ROI calculator: Interactive widget with sliders

### Solutions Pages

**Three Variants:** Single Hotel / Chain / Hostel-Apart-hotel
- Hero with specific use-case headline
- Process flow diagram (horizontal on desktop, vertical on mobile)
- Feature comparison table
- Integration highlights specific to segment

### Case Studies & Testimonials

**Card Grid Layout:**
- Filterable by industry/property type
- Each card: Problem statement, Solution, Results (with metrics)
- Video testimonials: Embedded with custom play button (HotelMind Blue)
- Quote format: Large quote marks, client photo, name, title, property

### Blog

**Magazine-style layout:**
- Featured post: Large card with image, category tag, excerpt
- Recent posts: 2-column grid with smaller cards
- Sidebar: Categories, popular posts, search
- Article page: max-w-prose for optimal reading

### Contact Page

**Two-column layout:**
- Left: Contact form (name, role, property, phone, email, comment, checkboxes)
- Right: Map, office info, demo calendar embed
- Form success: Modal with thank-you message

### Legal Pages

**Simple text-focused:**
- Single column, max-w-4xl
- Headings hierarchy, clear sections
- Table of contents for longer documents
- Last updated date prominent

## Images Strategy

**Hero Images:**
- Home: Luxury hotel lobby/reception (wide angle, professional photography)
- Roomie: Roomie chat interface mockup overlaid on hotel room
- Solutions: Segment-specific (chain = multiple properties, hostel = common area)
- About: Team photo or HotelMind office

**Supporting Images:**
- Case studies: Client property photos
- Blog: Featured images for each post (1200x630px)
- Benefits: Abstract illustrations or Roomie UI screenshots
- ROI sections: Charts, graphs in brand colors

**Image Treatment:**
- Format: WebP/AVIF with fallbacks
- Lazy loading with IntersectionObserver
- Aspect ratios: 16:9 for hero, 4:3 for cards, 1:1 for logos
- Overlays on hero images: bg-charcoal/30 to bg-charcoal/50

## Accessibility & Quality

- WCAG 2.1 AA compliance: 4.5:1 contrast minimum
- Keyboard navigation: Focus visible with ring-2 ring-[#0752A0]
- Screen reader: Semantic HTML, ARIA labels, alt texts
- Motion: Respect prefers-reduced-motion
- Dark mode: Consistent implementation across forms, inputs, modals

## Multilingual Considerations

- Language switcher: Flag icons + EN/RU/UA labels in header
- RTL support: Not required (all languages LTR)
- Text expansion: Design with 30% buffer for longer translations
- Locale-specific formatting: Dates, numbers, currency