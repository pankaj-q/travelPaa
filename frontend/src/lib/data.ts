export interface Country {
  id: string;
  name: string;
  slug: string;
  image: string;
  video?: string;
  visaType: string;
  processingTime: string;
  description: string;
  price: number;
  rating?: string;
  processing?: string;
  visaCategories?: string[];
  approvalRate?: string;
  popular?: boolean;
  featured?: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface VisaCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  duration: string;
  price: number;
}

export const countries: Country[] = [
  {
    id: "usa",
    name: "United States",
    slug: "united-states",
    image:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80",
    video:
      "https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_25fps.mp4",
    visaType: "B1/B2 Tourist & Business",
    processingTime: "15–30 days",
    description:
      "Expert guidance for US tourist, business, and student visa applications.",
    price: 18500,
  },
  {
    id: "uk",
    name: "United Kingdom",
    slug: "united-kingdom",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
    video:
      "https://videos.pexels.com/video-files/2547258/2547258-uhd_2560_1440_25fps.mp4",
    visaType: "Standard Visitor Visa",
    processingTime: "10–15 days",
    description:
      "Streamlined UK visa processing with document review and interview prep.",
    price: 16000,
  },
  {
    id: "canada",
    name: "Canada",
    slug: "canada",
    image:
      "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?w=800&q=80",
    visaType: "Visitor & Study Permit",
    processingTime: "12–20 days",
    description:
      "Complete support for Canadian visitor visas and study permits.",
    price: 12000,
  },
  {
    id: "australia",
    name: "Australia",
    slug: "australia",
    image:
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80",
    visaType: "Subclass 600 Visitor",
    processingTime: "10–18 days",
    description:
      "End-to-end Australia visa assistance with high approval rates.",
    price: 14000,
  },
  {
    id: "germany",
    name: "Germany",
    slug: "germany",
    image:
      "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800&q=80",
    visaType: "Schengen Visa",
    processingTime: "7–14 days",
    description:
      "Schengen visa expertise for Germany and EU travel destinations.",
    price: 11000,
  },
  {
    id: "uae",
    name: "United Arab Emirates",
    slug: "uae",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    visaType: "Tourist & Transit",
    processingTime: "3–5 days",
    description:
      "Fast-track UAE tourist and transit visa processing services.",
    price: 7500,
  },
  {
    id: "singapore",
    name: "Singapore",
    slug: "singapore",
    image:
      "https://images.pexels.com/photos/777059/pexels-photo-777059.jpeg?auto=compress&cs=tinysrgb&w=800",
    visaType: "Tourist Visa",
    processingTime: "3–7 days",
    description:
      "Quick Singapore visa applications with personalized consultation.",
    price: 6000,
  },
  {
    id: "japan",
    name: "Japan",
    slug: "japan",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
    visaType: "Short-Term Stay",
    processingTime: "5–10 days",
    description:
      "Japan visa guidance including documentation and embassy coordination.",
    price: 9000,
  },
];

export const sourceCountries = [
  "India",
  "Pakistan",
  "Bangladesh",
  "Nepal",
  "Sri Lanka",
  "Philippines",
  "Nigeria",
  "Kenya",
  "UAE",
  "United Kingdom",
];

export const services: Service[] = [
  {
    id: "consultation",
    title: "Free Consultation",
    description:
      "One-on-one sessions with certified visa consultants to assess your eligibility.",
    icon: "MessageCircle",
  },
  {
    id: "documentation",
    title: "Document Preparation",
    description:
      "Complete document checklist, review, and formatting to meet embassy standards.",
    icon: "FileText",
  },
  {
    id: "application",
    title: "Application Filing",
    description:
      "End-to-end application submission with real-time tracking and status updates.",
    icon: "Send",
  },
  {
    id: "interview",
    title: "Interview Coaching",
    description:
      "Mock interviews and personalized coaching to boost your visa approval chances.",
    icon: "Users",
  },
  {
    id: "express",
    title: "Express Processing",
    description:
      "Priority handling for urgent travel with expedited document processing.",
    icon: "Zap",
  },
  {
    id: "support",
    title: "24/7 Support",
    description:
      "Round-the-clock assistance via phone, email, and live chat for all queries.",
    icon: "Headphones",
  },
];

export const visaCategories: VisaCategory[] = [
  {
    id: "tourist",
    title: "Tourist Visa",
    description: "Explore the world with hassle-free tourist visa processing.",
    icon: "Plane",
    duration: "Up to 90 days",
    price: 5000,
  },
  {
    id: "business",
    title: "Business Visa",
    description: "Attend meetings, conferences, and trade events globally.",
    icon: "Briefcase",
    duration: "Up to 180 days",
    price: 8000,
  },
  {
    id: "student",
    title: "Student Visa",
    description: "Pursue education abroad with complete study visa support.",
    icon: "GraduationCap",
    duration: "Course duration",
    price: 10000,
  },
  {
    id: "work",
    title: "Work Visa",
    description: "Secure employment visas with employer sponsorship guidance.",
    icon: "Building2",
    duration: "1–5 years",
    price: 15000,
  },
  {
    id: "family",
    title: "Family Visa",
    description: "Reunite with loved ones through family reunion visa programs.",
    icon: "Heart",
    duration: "Varies",
    price: 12000,
  },
  {
    id: "transit",
    title: "Transit Visa",
    description: "Quick transit visa solutions for layovers and connecting flights.",
    icon: "ArrowRightLeft",
    duration: "Up to 72 hours",
    price: 3000,
  },
];

export const stats = [
  { label: "Visas Processed", value: "50,000+" },
  { label: "Countries Served", value: "120+" },
  { label: "Success Rate", value: "98%" },
  { label: "Years Experience", value: "15+" },
];
