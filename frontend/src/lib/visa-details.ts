export interface VisaDetail {
  id: string;
  title: string;
  slug: string;
  heroDescription: string;
  benefits: string[];
  requirements: string[];
  process: { step: string; description: string }[];
  documents: string[];
  processingTime: string;
  validity: string;
  fee: number;
  feeNote: string;
  eligibility: string[];
  faq: { question: string; answer: string }[];
}

export const visaDetails: Record<string, VisaDetail> = {
  tourist: {
    id: "tourist",
    title: "Tourist Visa",
    slug: "tourist",
    heroDescription:
      "Explore the world with hassle-free tourist visa processing. Our expert consultants handle everything from document preparation to embassy submission.",
    benefits: [
      "Hassle-free application process with end-to-end support",
      "Document review and verification before submission",
      "Interview preparation and mock sessions",
      "Real-time application tracking",
      "Multi-country tourist visa assistance",
    ],
    requirements: [
      "Must be 18 years or older (minors require guardian consent)",
      "Valid passport with at least 6 months validity",
      "Sufficient funds to cover travel expenses",
      "Return ticket or confirmed travel itinerary",
      "No prior visa violations or overstays",
    ],
    process: [
      {
        step: "Initial Consultation",
        description:
          "Meet with our visa consultant to assess your eligibility and discuss travel plans.",
      },
      {
        step: "Document Collection",
        description:
          "We provide a complete checklist and help you gather all required documents.",
      },
      {
        step: "Application Preparation",
        description:
          "Our team fills out the application forms and reviews all documents for accuracy.",
      },
      {
        step: "Submission",
        description:
          "We submit your application to the respective embassy or consulate on your behalf.",
      },
      {
        step: "Follow-up & Collection",
        description:
          "We track your application status and collect your passport with the visa stamp.",
      },
    ],
    documents: [
      "Valid passport (6+ months validity, 2+ blank pages)",
      "Passport-size photographs (as per embassy specifications)",
      "Bank statements (last 3-6 months)",
      "Income tax returns (last 2 years)",
      "Travel itinerary and flight bookings",
      "Hotel reservations or accommodation proof",
      "Travel insurance policy",
      "Employment letter or business registration",
      "Leave approval letter from employer",
      "NOC (No Objection Certificate) if applicable",
    ],
    processingTime: "7–15 working days",
    validity: "Up to 90 days (depending on country)",
    fee: 5000,
    feeNote: "Excludes embassy fee which varies by country",
    eligibility: [
      "Indian citizen with valid passport",
      "Minimum 18 years of age",
      "Stable source of income or sufficient funds",
      "Clean travel history with no visa violations",
      "Genuine intention to return after visit",
    ],
    faq: [
      {
        question: "What is the success rate for tourist visa applications?",
        answer:
          "Our success rate for tourist visa applications exceeds 95% when all documents are properly prepared. We review every application thoroughly before submission.",
      },
      {
        question: "How long does the tourist visa process take?",
        answer:
          "Processing time varies by country but typically ranges from 7 to 15 working days. Some countries offer express processing for an additional fee.",
      },
      {
        question: "Can I apply for a tourist visa without confirmed travel plans?",
        answer:
          "While some embassies accept applications without confirmed bookings, having a clear itinerary significantly improves your chances of approval.",
      },
      {
        question: "What if my tourist visa application is rejected?",
        answer:
          "If your application is rejected, we analyze the rejection reasons and help you address them for reapplication. Many rejections can be resolved with proper documentation.",
      },
      {
        question: "Do I need travel insurance for a tourist visa?",
        answer:
          "Travel insurance is mandatory for most countries, especially Schengen nations. We can help you purchase comprehensive travel insurance.",
      },
    ],
  },
  business: {
    id: "business",
    title: "Business Visa",
    slug: "business",
    heroDescription:
      "Attend meetings, conferences, and trade events globally with our streamlined business visa solutions.",
    benefits: [
      "Priority processing for business travelers",
      "Corporate documentation support",
      "Multiple-entry visa assistance",
      "Invitation letter drafting service",
      "Expedited appointment scheduling",
    ],
    requirements: [
      "Valid passport with at least 6 months validity",
      "Company registration documents",
      "Invitation letter from host company or organization",
      "Proof of business relationship with host",
      "Sufficient funds for travel and stay",
    ],
    process: [
      {
        step: "Business Assessment",
        description:
          "Understand your business purpose, destination, and travel requirements.",
      },
      {
        step: "Invitation & Documentation",
        description:
          "We assist in obtaining invitation letters and preparing corporate documents.",
      },
      {
        step: "Application Filing",
        description:
          "Complete application with all business-specific documentation for submission.",
      },
      {
        step: "Embassy Coordination",
        description:
          "Liaise with the embassy for any clarifications or additional document requests.",
      },
      {
        step: "Visa Collection",
        description:
          "Collect and deliver your passport with the business visa approval.",
      },
    ],
    documents: [
      "Valid passport (6+ months validity)",
      "Company registration certificate",
      "GST registration certificate",
      "Invitation letter from foreign company",
      "Board resolution or authorization letter",
      "Bank statements (company and personal)",
      "IT returns of the company (last 2 years)",
      "Conference/trade show registration (if applicable)",
      "Proof of business transactions with host",
      "Travel insurance",
    ],
    processingTime: "10–20 working days",
    validity: "Up to 180 days (multiple entry)",
    fee: 8000,
    feeNote: "Excludes embassy fee and express processing charges",
    eligibility: [
      "Business owner or employed professional",
      "Valid business registration in home country",
      "Genuine business purpose for travel",
      "Financial stability demonstrated",
      "No prior immigration violations",
    ],
    faq: [
      {
        question: "Can I attend business meetings on a tourist visa?",
        answer:
          "No, attending business meetings requires a proper business visa. Using a tourist visa for business purposes can lead to visa cancellation.",
      },
      {
        question: "How long can I stay on a business visa?",
        answer:
          "Business visa validity varies by country, ranging from 30 days to 180 days. Multiple-entry options are available for frequent travelers.",
      },
      {
        question: "Do I need an invitation letter for a business visa?",
        answer:
          "Yes, most countries require a formal invitation letter from the host company or organization you plan to visit.",
      },
    ],
  },
  student: {
    id: "student",
    title: "Student Visa",
    slug: "student",
    heroDescription:
      "Pursue education abroad with complete study visa support. From university admission to visa approval, we guide you every step of the way.",
    benefits: [
      "University admission guidance and application support",
      "Student visa documentation and interview preparation",
      "Scholarship and financial aid information",
      "Pre-departure orientation and counseling",
      "Post-arrival support and accommodation assistance",
    ],
    requirements: [
      "Admission letter from a recognized educational institution",
      "Valid passport with sufficient validity",
      "Proof of financial resources for tuition and living expenses",
      "English language proficiency (IELTS/TOEFL scores)",
      "Genuine intention to return after completing studies",
    ],
    process: [
      {
        step: "University Selection",
        description:
          "We help you choose the right university and course based on your academic profile and career goals.",
      },
      {
        step: "Admission Application",
        description:
          "Assist with university applications, SOP writing, and document submission.",
      },
      {
        step: "Offer Acceptance",
        description:
          "Guidance on accepting the offer letter and paying the tuition deposit.",
      },
      {
        step: "Visa Application",
        description:
          "Complete student visa application with all required documents and financial proofs.",
      },
      {
        step: "Pre-departure",
        description:
          "Orientation session covering accommodation, travel, banking, and cultural adaptation.",
      },
    ],
    documents: [
      "Valid passport and previous visas (if any)",
      "University admission/offer letter",
      "Academic transcripts and certificates",
      "English language test scores (IELTS/TOEFL/PTE)",
      "Statement of Purpose (SOP)",
      "Financial documents (bank statements, loan approval)",
      "Sponsorship letter (if applicable)",
      "Passport-size photographs",
      "Medical insurance and health certificates",
      "Visa application fee receipt",
    ],
    processingTime: "4–8 weeks",
    validity: "Duration of the course",
    fee: 10000,
    feeNote: "Excludes university application fees and tuition",
    eligibility: [
      "Admission offer from recognized institution abroad",
      "Minimum academic qualifications as required by university",
      "Required English language proficiency scores",
      "Sufficient funds for tuition and living expenses",
      "Genuine student intent (no immigration intent)",
    ],
    faq: [
      {
        question: "Can I work while studying on a student visa?",
        answer:
          "Most countries allow part-time work (typically 20 hours/week) during academic sessions and full-time during breaks. Specific rules vary by country.",
      },
      {
        question: "What is the minimum IELTS score required for a student visa?",
        answer:
          "Requirements vary by country and institution. Generally, undergraduate programs require 6.0-6.5 and postgraduate programs require 6.5-7.0 bands.",
      },
      {
        question: "Can my family accompany me on a student visa?",
        answer:
          "Dependent visas are available for spouses and children in most countries. Requirements vary, and you may need to show additional financial resources.",
      },
    ],
  },
  work: {
    id: "work",
    title: "Work Visa",
    slug: "work",
    heroDescription:
      "Secure employment visas with employer sponsorship guidance. Our experts streamline the work permit and visa process for global careers.",
    benefits: [
      "Employer sponsorship documentation support",
      "Labour market impact assessment assistance",
      "Work permit and visa application processing",
      "Contract review and compliance guidance",
      "Family dependent visa support",
    ],
    requirements: [
      "Valid job offer from an employer abroad",
      "Employer sponsorship or labor certification",
      "Valid passport with sufficient validity",
      "Educational and professional credentials",
      "Relevant work experience documentation",
    ],
    process: [
      {
        step: "Job Offer Review",
        description:
          "Review the employment offer and ensure it meets visa sponsorship requirements.",
      },
      {
        step: "Sponsorship Documentation",
        description:
          "Coordinate with your employer to obtain necessary sponsorship documents.",
      },
      {
        step: "Labor Certification",
        description:
          "Assist with labor market testing and certification if required by the destination country.",
      },
      {
        step: "Visa Petition Filing",
        description:
          "File the work visa petition with the immigration authorities.",
      },
      {
        step: "Visa Stamping",
        description:
          "Complete the visa stamping process and prepare for relocation.",
      },
    ],
    documents: [
      "Valid passport with 2+ years validity",
      "Employment contract and offer letter",
      "Sponsorship letter from employer",
      "Educational degrees and professional certifications",
      "Work experience letters from previous employers",
      "Resume/CV and cover letter",
      "Passport-size photographs",
      "Medical examination reports",
      "Police clearance certificate",
      "Proof of professional license (if applicable)",
    ],
    processingTime: "2–6 months",
    validity: "1–5 years (renewable)",
    fee: 15000,
    feeNote: "Excludes government processing fees and legal charges",
    eligibility: [
      "Valid job offer from employer abroad",
      "Employer willing to sponsor work visa",
      "Required qualifications and experience for the position",
      "No adverse immigration history",
      "Meet health and character requirements",
    ],
    faq: [
      {
        question: "Can I switch employers on a work visa?",
        answer:
          "This depends on the country. Some countries allow switching with a new sponsorship, while others require a new visa application.",
      },
      {
        question: "Does a work visa lead to permanent residency?",
        answer:
          "Many countries offer pathways to permanent residency through work visas, often after 2-5 years of continuous employment.",
      },
      {
        question: "Can my family join me on a work visa?",
        answer:
          "Yes, most countries allow dependents (spouse and children) to accompany or join the primary work visa holder.",
      },
    ],
  },
  family: {
    id: "family",
    title: "Family Visa",
    slug: "family",
    heroDescription:
      "Reunite with loved ones through family reunion visa programs. Compassionate guidance for family-based immigration.",
    benefits: [
      "Family sponsorship documentation assistance",
      "Relationship proof documentation support",
      "Interview preparation for family visa applications",
      "Dependent visa processing for spouse and children",
      "Parent and elder family member visa options",
    ],
    requirements: [
      "Verifiable family relationship with the sponsor",
      "Sponsor must be a legal resident or citizen",
      "Proof of genuine relationship (marriage/birth certificates)",
      "Financial stability of the sponsor",
      "Adequate accommodation for family members",
    ],
    process: [
      {
        step: "Eligibility Assessment",
        description:
          "Evaluate your eligibility and identify the appropriate family visa category.",
      },
      {
        step: "Sponsorship Application",
        description:
          "Help the sponsor file the necessary sponsorship paperwork with immigration authorities.",
      },
      {
        step: "Document Collection",
        description:
          "Gather all relationship proof documents including marriage, birth, and adoption certificates.",
      },
      {
        step: "Visa Application",
        description:
          "Submit the family visa application with complete documentation.",
      },
      {
        step: "Visa Approval & Travel",
        description:
          "Coordinate visa collection and travel arrangements for family reunification.",
      },
    ],
    documents: [
      "Valid passports for all family members",
      "Marriage certificate (for spouse visa)",
      "Birth certificates of children",
      "Sponsor's residency/citizenship proof",
      "Sponsor's employment and income documents",
      "Sponsor's accommodation proof",
      "Family photographs and correspondence",
      "Adoption papers (if applicable)",
      "Medical insurance for family members",
      "Police clearance certificates",
    ],
    processingTime: "3–12 months",
    validity: "Varies by country and relationship",
    fee: 12000,
    feeNote: "Excludes government application fees and medical examination costs",
    eligibility: [
      "Genuine family relationship with sponsor",
      "Sponsor is a legal resident or citizen of destination country",
      "Sponsor meets minimum income requirements",
      "No adverse immigration history for any family member",
      "All family members meet health and character requirements",
    ],
    faq: [
      {
        question: "How long does family visa processing take?",
        answer:
          "Processing times vary significantly by country, ranging from 3 months to over 12 months for some family visa categories.",
      },
      {
        question: "Can I work on a family visa?",
        answer:
          "In most countries, family visa holders are granted the right to work. Some countries impose restrictions or require separate work authorization.",
      },
      {
        question: "What happens if my family visa application is rejected?",
        answer:
          "Rejection reasons are provided by the immigration authorities. We can help address the issues and assist with reapplication or appeal.",
      },
    ],
  },
  transit: {
    id: "transit",
    title: "Transit Visa",
    slug: "transit",
    heroDescription:
      "Quick transit visa solutions for layovers and connecting flights. Smooth processing for hassle-free airport transits.",
    benefits: [
      "Fast-track processing for urgent transit needs",
      "Airside and land transit visa assistance",
      "Multi-country transit coordination",
      "Document checklist and verification",
      "24/7 customer support for travel changes",
    ],
    requirements: [
      "Confirmed onward ticket to a third country",
      "Valid visa for final destination (if required)",
      "Valid passport with sufficient validity",
      "Layover duration within permissible limits",
      "No intention to leave the transit area",
    ],
    process: [
      {
        step: "Travel Itinerary Review",
        description:
          "Review your flight itinerary and determine transit visa requirements.",
      },
      {
        step: "Document Verification",
        description:
          "Verify all required documents including onward tickets and destination visas.",
      },
      {
        step: "Application Submission",
        description:
          "Submit transit visa application with minimal documentation.",
      },
      {
        step: "Visa Collection",
        description:
          "Collect your transit visa before travel or at the port of entry.",
      },
    ],
    documents: [
      "Valid passport with 6+ months validity",
      "Confirmed onward flight ticket",
      "Valid visa for final destination (if required)",
      "Passport-size photographs",
      "Travel insurance (recommended)",
      "Hotel booking (if overnight layover)",
    ],
    processingTime: "2–5 working days",
    validity: "Up to 72 hours (typically single-entry)",
    fee: 3000,
    feeNote: "Some countries offer free transit visas for certain nationalities",
    eligibility: [
      "Traveling through a country to a third destination",
      "Confirmed onward booking within transit period",
      "Valid documents for final destination",
      "No intention to stay beyond transit period",
      "No adverse immigration history",
    ],
    faq: [
      {
        question: "Do I always need a transit visa?",
        answer:
          "Not always. Many countries offer visa-free transit for short layovers (usually 8-24 hours) if you stay airside. Countries like the US, Canada, UK, and Australia require transit visas even for airside connections.",
      },
      {
        question: "Can I leave the airport on a transit visa?",
        answer:
          "It depends on the type of transit visa. Airside transit visas do not allow leaving the airport. Some countries offer 'visitor transit' visas that permit short excursions.",
      },
      {
        question: "How early should I apply for a transit visa?",
        answer:
          "Apply at least 2-3 weeks before your travel date. While processing is quick, unexpected delays can affect your itinerary.",
      },
    ],
  },
};
