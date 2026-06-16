export interface Country {
  id: string;
  name: string;
  slug: string;
  image: string;
  video?: string;
  visaType: string;
  processingTime: string;
  description: string;
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
}

export const countries: Country[] = [
  {
    id: "usa",
    name: "United States",
    slug: "united-states",
    image:
      "https://images.unsplash.com/photo-1485738422979-f5c176d33141?w=800&q=80",
    video:
      "https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_25fps.mp4",
    visaType: "B1/B2 Tourist & Business",
    processingTime: "15–30 days",
    description:
      "Expert guidance for US tourist, business, and student visa applications.",
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
  },
  {
    id: "canada",
    name: "Canada",
    slug: "canada",
    image:
      "https://images.unsplash.com/photo-1519832979-6f9920a0f4f0?w=800&q=80",
    visaType: "Visitor & Study Permit",
    processingTime: "12–20 days",
    description:
      "Complete support for Canadian visitor visas and study permits.",
  },
  {
    id: "australia",
    name: "Australia",
    slug: "australia",
    image:
      "https://images.unsplash.com/photo-1523482580695-30338a5f2376?w=800&q=80",
    video:
      "https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_25fps.mp4",
    visaType: "Subclass 600 Visitor",
    processingTime: "10–18 days",
    description:
      "End-to-end Australia visa assistance with high approval rates.",
  },
  {
    id: "germany",
    name: "Germany",
    slug: "germany",
    image:
      "https://images.unsplash.com/photo-1467269209834-02b093751204?w=800&q=80",
    visaType: "Schengen Visa",
    processingTime: "7–14 days",
    description:
      "Schengen visa expertise for Germany and EU travel destinations.",
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
  },
  {
    id: "singapore",
    name: "Singapore",
    slug: "singapore",
    image:
      "https://images.unsplash.com/photo-1525623000545-4ff378af679e?w=800&q=80",
    visaType: "Tourist Visa",
    processingTime: "3–7 days",
    description:
      "Quick Singapore visa applications with personalized consultation.",
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
  },
  {
    id: "business",
    title: "Business Visa",
    description: "Attend meetings, conferences, and trade events globally.",
    icon: "Briefcase",
    duration: "Up to 180 days",
  },
  {
    id: "student",
    title: "Student Visa",
    description: "Pursue education abroad with complete study visa support.",
    icon: "GraduationCap",
    duration: "Course duration",
  },
  {
    id: "work",
    title: "Work Visa",
    description: "Secure employment visas with employer sponsorship guidance.",
    icon: "Building2",
    duration: "1–5 years",
  },
  {
    id: "family",
    title: "Family Visa",
    description: "Reunite with loved ones through family reunion visa programs.",
    icon: "Heart",
    duration: "Varies",
  },
  {
    id: "transit",
    title: "Transit Visa",
    description: "Quick transit visa solutions for layovers and connecting flights.",
    icon: "ArrowRightLeft",
    duration: "Up to 72 hours",
  },
];

export const stats = [
  { label: "Visas Processed", value: "50,000+" },
  { label: "Countries Served", value: "120+" },
  { label: "Success Rate", value: "98%" },
  { label: "Years Experience", value: "15+" },
];
