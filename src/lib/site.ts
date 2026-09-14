export const SITE = {
  name: "Pixel Studio",
  legalName: "PIXEL STUDIO WEB DEVELOPMENT AGENCY",
  tagline: "We Build Websites That Make You Famous.",
  shortDescription:
    "Hyper-modern website development agency in Bangalore. Custom websites, e-commerce, PWAs, AI chatbots, SEO — built with cutting-edge tech to dominate your market.",
  phone: "+919620024812",
  phoneHref: "tel:+919620024812",
  whatsapp: "919620024812",
  email: "digitalpixelstudio@gmail.com",
  address: "No 1, Pixel Studio, Halasuru, MG Road, Bangalore, Karnataka 560008",
  area: "Halasuru, Bangalore",
  city: "Bangalore",
  pincode: "560008",
  state: "Karnataka",
  country: "IN",
  hours: "10:00 AM – 8:00 PM (Mon – Sat)",
  hoursSchema: "Mo-Sa 10:00-20:00",
  geo: { lat: 12.9716, lng: 77.5946 },
  rating: "4.9",
  ratingCount: "150+",
  yearsActive: "3+",
  projectsCompleted: "200+",
  clientsServed: "75+",
  satisfactionRate: "99%",
  mapsUrl: "https://maps.google.com/?q=Pixel+Studio+Halasuru+MG+Road+Bangalore",
  mapsEmbed: "https://www.google.com/maps?q=Pixel+Studio+Halasuru+MG+Road+Bangalore&z=16&output=embed",
  github: "https://github.com/DigitalPixelStudio",
  baseUrl: "https://pixel-studio.vercel.app",
} as const;

export const SERVICES = [
  { id: "business", name: "Business Websites", icon: "globe" as const, desc: "Professional corporate sites that build trust and convert visitors into customers.", price: "From ₹3,999", market: "₹12,000" },
  { id: "ecommerce", name: "E-Commerce Stores", icon: "shopping-cart" as const, desc: "Full online stores with payments, inventory, and order management.", price: "From ₹7,999", market: "₹25,000" },
  { id: "pwa", name: "PWA Web Apps", icon: "rocket" as const, desc: "Progressive Web Apps that feel like native mobile apps on any device.", price: "From ₹5,999", market: "₹20,000" },
  { id: "landing", name: "Landing Pages", icon: "target" as const, desc: "High-converting single-page sites for product launches and campaigns.", price: "From ₹1,999", market: "₹8,000" },
  { id: "chatbot", name: "AI Chatbots", icon: "bot" as const, desc: "Intelligent chatbots that handle support, qualify leads, and work 24/7.", price: "From ₹2,999", market: "₹15,000" },
  { id: "seo", name: "SEO & Performance", icon: "trending-up" as const, desc: "Technical SEO, Core Web Vitals optimization, and speed tuning.", price: "From ₹1,999/mo", market: "₹8,000/mo" },
  { id: "redesign", name: "Website Redesign", icon: "refresh" as const, desc: "Modernize outdated sites with fresh design and better UX.", price: "From ₹3,999", market: "₹18,000" },
  { id: "maintenance", name: "Maintenance Plans", icon: "shield" as const, desc: "Monthly updates, security patches, backups, and priority support.", price: "From ₹799/mo", market: "₹3,000/mo" },
] as const;

export const PRICING = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Perfect for new businesses",
    price: "₹3,999",
    priceNote: "one-time",
    market: "₹12,000",
    features: ["Responsive single-page website", "Contact form + WhatsApp button", "Basic SEO setup", "Mobile-first design", "2 revisions included", "3-day delivery"],
    cta: "Get Started",
    popular: false,
  },
  {
    id: "business",
    name: "Business",
    tagline: "Most popular for growing brands",
    price: "₹7,999",
    priceNote: "one-time",
    market: "₹25,000",
    features: ["Multi-page website (up to 8 pages)", "Custom design + animations", "AI chatbot integration", "Advanced SEO + analytics", "Admin dashboard", "1-month free maintenance", "5 revisions included", "7-day delivery"],
    cta: "Start Building",
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Full-scale digital presence",
    price: "₹14,999",
    priceNote: "one-time",
    market: "₹50,000",
    features: ["Unlimited pages + CMS", "E-commerce / booking system", "Custom animations + 3D effects", "PWA + push notifications", "Full SEO + Google Business", "3-month maintenance included", "Priority WhatsApp support", "Unlimited revisions", "14-day delivery"],
    cta: "Go Premium",
    popular: false,
  },
] as const;

export const MARKET_COMPARISON = [
  { service: "Landing Page", market: "₹8,000", ours: "₹1,999", save: "75%" },
  { service: "Business Website", market: "₹12,000", ours: "₹3,999", save: "67%" },
  { service: "E-Commerce Store", market: "₹25,000", ours: "₹7,999", save: "68%" },
  { service: "PWA Web App", market: "₹20,000", ours: "₹5,999", save: "70%" },
  { service: "AI Chatbot", market: "₹15,000", ours: "₹2,999", save: "80%" },
  { service: "SEO Package", market: "₹8,000/mo", ours: "₹1,999/mo", save: "75%" },
  { service: "Website Redesign", market: "₹18,000", ours: "₹3,999", save: "78%" },
  { service: "Maintenance", market: "₹3,000/mo", ours: "₹799/mo", save: "73%" },
] as const;

export const TESTIMONIALS = [
  { name: "Red Apple Mobile Repair Store", role: "iPhone Repair Specialist, Bangalore", text: "Pixel Studio built our entire website in 5 days. The AI concierge alone has brought us 3x more walk-ins. Incredible work.", rating: 5 },
  { name: "Shreya Patel", role: "Founder, Bloom Boutique", text: "They transformed our outdated site into a stunning e-commerce platform. Sales jumped 40% in the first month after launch.", rating: 5 },
  { name: "Arjun Mehta", role: "CEO, TechNova Solutions", text: "Professional, fast, and creative. The PWA they built for us loads in under 2 seconds. Our users love it.", rating: 5 },
  { name: "Priya Sharma", role: "Director, GreenLeaf Organics", text: "Best investment we made for our business. The website pays for itself with the leads we get every week.", rating: 5 },
] as const;

export const FAQS = [
  { q: "How long does a typical website project take?", a: "Landing pages: 2-3 days. Business websites: 5-7 days. E-commerce stores: 7-14 days. Rush delivery available for all plans." },
  { q: "Do you build mobile-friendly websites?", a: "Every site we build is mobile-first and responsive across all devices — phones, tablets, and desktops." },
  { q: "What tech stack do you use?", a: "We specialize in Next.js, React, Tailwind CSS, and modern web technologies. This ensures blazing fast performance and SEO." },
  { q: "Can you integrate AI features?", a: "Yes! We build custom AI chatbots, smart forms, and AI-powered content systems into any website." },
  { q: "Do you provide hosting?", a: "We deploy all sites on Vercel (enterprise-grade) with free SSL, global CDN, and 99.99% uptime. Hosting is included." },
  { q: "What about after-launch support?", a: "Every project includes 1-3 months of free maintenance. After that, our monthly plans start at just ₹799/mo." },
  { q: "How do payments work?", a: "50% advance to start, 50% on delivery. We accept UPI, bank transfer, and Razorpay." },
  { q: "Why are you so much cheaper than agencies?", a: "We use cutting-edge automation and modern tools that cut development time by 80%. You get the same quality at a fraction of the cost." },
] as const;

export const STATS = [
  { icon: "check-circle" as const, value: "200+", label: "Projects Delivered" },
  { icon: "star" as const, value: "4.9", label: "Client Rating" },
  { icon: "clock" as const, value: "2-14 Days", label: "Typical Delivery" },
  { icon: "shield" as const, value: "99%", label: "On-Time Delivery" },
] as const;
