export interface CountryVisaEntry {
  processingTime: string;
  govtFee: number;
  serviceCharge: number;
  appointmentCharge?: number;
  insuranceRequired?: boolean;
  requirements: string[];
  documents: string[];
  faqs: { question: string; answer: string }[];
}

export interface CountryDetailData {
  description: string;
  categories: Partial<Record<string, CountryVisaEntry>>;
}

export const countryData: Record<string, CountryDetailData> = {
  "united-states": {
    description: "The United States offers a wide range of visa options for tourism, business, study, and work. ESTA visa waiver is available for eligible nationalities under the Visa Waiver Program.",
    categories: {
      tourist: {
        processingTime: "3-5 working days",
        govtFee: 21,
        serviceCharge: 79,
        requirements: [
          "Valid passport with at least 6 months validity beyond planned stay",
          "ESTA authorization (for VWP eligible nationalities) or valid B1/B2 visa",
          "Return or onward ticket",
          "Sufficient funds to cover stay",
          "Completed online application form",
        ],
        documents: [
          "Valid passport with 6+ months validity",
          "Digital photograph (white background)",
          "Travel itinerary and flight bookings",
          "Hotel reservations or accommodation proof",
          "Bank statements (last 3 months)",
          "Employment letter or proof of ties to home country",
        ],
        faqs: [
          { question: "Can I apply for a US visa without an interview?", answer: "Some applicants may qualify for interview waiver if they are renewing a visa in the same category within 48 months of expiry." },
          { question: "How long can I stay on a US tourist visa?", answer: "B1/B2 visa holders are typically admitted for up to 6 months. ESTA holders may stay up to 90 days." },
          { question: "What is ESTA and who can apply?", answer: "ESTA (Electronic System for Travel Authorization) is for citizens of Visa Waiver Program countries. It allows visa-free travel for up to 90 days." },
        ],
      },
      business: {
        processingTime: "5-10 working days",
        govtFee: 205,
        serviceCharge: 99,
        requirements: [
          "Valid passport with 6+ months validity",
          "Letter from employer detailing purpose of visit",
          "Invitation letter from US business partner",
          "Proof of business relationship",
          "Conference registration (if applicable)",
        ],
        documents: [
          "Valid passport with 6+ months validity",
          "Company registration certificate",
          "Invitation letter from US company",
          "Bank statements (company and personal)",
          "IT returns (last 2 years)",
          "Conference/trade show registration proof",
        ],
        faqs: [
          { question: "Can I attend meetings on a tourist visa?", answer: "No, business activities require a proper B1 business visa even if the meeting is short." },
          { question: "What is the maximum stay on a US business visa?", answer: "B1 visa holders are typically admitted for up to 6 months with possible extensions in some cases." },
        ],
      },
      student: {
        processingTime: "4-8 weeks",
        govtFee: 350,
        serviceCharge: 150,
        requirements: [
          "Valid admission offer from SEVP-certified US institution",
          "Form I-20 issued by the institution",
          "SEVIS fee payment confirmation",
          "Proof of financial resources for tuition and living expenses",
          "English language proficiency (TOEFL/IELTS scores)",
        ],
        documents: [
          "Valid passport",
          "Form I-20 (original)",
          "SEVIS fee receipt (I-901)",
          "University admission letter",
          "Academic transcripts and certificates",
          "English language test scores",
          "Bank statements and financial affidavits",
          "Statement of Purpose (SOP)",
        ],
        faqs: [
          { question: "Can I work while studying on an F-1 visa?", answer: "Yes, F-1 students can work on-campus up to 20 hours/week during semesters and full-time during breaks. Optional Practical Training (OPT) is available after completion." },
          { question: "What is the SEVIS fee?", answer: "The SEVIS I-901 fee is a mandatory US$350 fee for F and M visa applicants, paid before the visa interview." },
        ],
      },
      work: {
        processingTime: "2-6 months",
        govtFee: 460,
        serviceCharge: 250,
        requirements: [
          "Valid job offer from a US employer",
          "Employer must file petition (Form I-129) with USCIS",
          "Approved Labor Condition Application (LCA) for H-1B",
          "Educational qualifications matching the position",
          "Relevant work experience documentation",
        ],
        documents: [
          "Valid passport with 2+ years validity",
          "Approved I-129 petition notice",
          "Employment contract and offer letter",
          "Educational degrees and certificates",
          "Work experience letters",
          "Resume/CV",
          "Medical examination reports",
        ],
        faqs: [
          { question: "What is the H-1B visa lottery?", answer: "The H-1B visa has an annual cap of 65,000 regular visas plus 20,000 for US advanced degree holders. When demand exceeds supply, a lottery is conducted." },
          { question: "Can my family join me on a work visa?", answer: "Yes, H-4 dependent visas are available for spouses and unmarried children under 21 of H-1B holders." },
        ],
      },
      transit: {
        processingTime: "2-5 working days",
        govtFee: 205,
        serviceCharge: 50,
        requirements: [
          "Confirmed onward ticket to a third country",
          "Valid visa for final destination (if required)",
          "Valid passport with sufficient validity",
          "Transit through US en route to another country",
        ],
        documents: [
          "Valid passport with 6+ months validity",
          "Confirmed onward flight ticket",
          "Valid visa for final destination",
        ],
        faqs: [
          { question: "Do I need a transit visa for the US?", answer: "Yes, most travelers transiting through the US require a C-1 transit visa or ESTA (for VWP nationals), even for airside connections." },
        ],
      },
    },
  },
  "united-kingdom": {
    description: "The United Kingdom offers various visa categories for visitors, students, workers, and families. Applications are processed through UK Visas and Immigration (UKVI).",
    categories: {
      tourist: {
        processingTime: "10-15 working days",
        govtFee: 115,
        serviceCharge: 75,
        requirements: [
          "Valid passport with sufficient validity",
          "Clear travel history with no immigration violations",
          "Sufficient funds for the duration of stay",
          "Return or onward ticket",
          "Proof of accommodation",
        ],
        documents: [
          "Valid passport",
          "Passport-size photographs",
          "Travel itinerary",
          "Hotel bookings or accommodation proof",
          "Bank statements (last 6 months)",
          "Employment letter and leave approval",
          "Salary slips (last 3 months)",
        ],
        faqs: [
          { question: "How long can I stay on a UK visitor visa?", answer: "Standard visitor visas allow stays of up to 6 months. Long-term visas (2, 5, or 10 years) allow multiple visits of up to 6 months each." },
          { question: "Do I need to provide biometrics?", answer: "Yes, all UK visa applicants must provide fingerprints and a photograph at a visa application center." },
        ],
      },
      business: {
        processingTime: "10-15 working days",
        govtFee: 115,
        serviceCharge: 85,
        requirements: [
          "Valid passport",
          "Invitation letter from UK business partner",
          "Proof of business activities in the UK",
          "Company registration documents",
          "Bank statements showing business financials",
        ],
        documents: [
          "Valid passport",
          "Company registration certificate",
          "Invitation letter from UK company",
          "Bank statements (company and personal)",
          "IT returns (last 2 years)",
          "Conference/trade event registration",
        ],
        faqs: [
          { question: "Can I do business activities on a visitor visa?", answer: "Yes, the UK visitor visa allows limited business activities including meetings, conferences, and negotiations. Direct work or selling goods is not permitted." },
        ],
      },
      student: {
        processingTime: "3-6 weeks",
        govtFee: 490,
        serviceCharge: 150,
        requirements: [
          "Confirmed offer from a licensed student sponsor (CAS number)",
          "Proof of English language proficiency",
          "Sufficient funds for tuition and living costs (28-day maintenance rule)",
          "Academic qualifications for the course",
          "ATAS certificate (if required)",
        ],
        documents: [
          "Valid passport",
          "Confirmation of Acceptance for Studies (CAS)",
          "Academic transcripts and certificates",
          "English language test scores (IELTS/PTE)",
          "Bank statements showing funds for 28+ consecutive days",
          "Sponsorship letter (if applicable)",
          "ATAS certificate (if required)",
        ],
        faqs: [
          { question: "Can I work on a UK Student visa?", answer: "Yes, students can work up to 20 hours/week during term time and full-time during holidays. Dependents of postgraduate students may also work." },
          { question: "What is the maintenance requirement?", answer: "You must show funds covering tuition plus living costs (£1,334/month in London or £1,023/month outside London) for up to 9 months." },
        ],
      },
      work: {
        processingTime: "4-8 weeks",
        govtFee: 625,
        serviceCharge: 250,
        requirements: [
          "Valid job offer from a Home Office-approved sponsor",
          "Certificate of Sponsorship (CoS) from employer",
          "Role meets skill and salary thresholds (Skilled Worker visa)",
          "English language proficiency at B1 level",
          "Sufficient personal savings to support initial stay",
        ],
        documents: [
          "Valid passport",
          "Certificate of Sponsorship reference number",
          "Job offer letter and employment contract",
          "Educational qualifications and professional certificates",
          "English language test certificate",
          "Bank statements (last 28 days)",
        ],
        faqs: [
          { question: "What is the minimum salary for a Skilled Worker visa?", answer: "The general minimum salary is £26,200 per year or the 'going rate' for the specific occupation, whichever is higher." },
          { question: "Can I settle in the UK on a work visa?", answer: "Yes, Skilled Worker visa holders can apply for Indefinite Leave to Remain after 5 years of continuous residence." },
        ],
      },
      transit: {
        processingTime: "5-10 working days",
        govtFee: 35,
        serviceCharge: 40,
        requirements: [
          "Confirmed onward ticket to a third country",
          "Valid visa for final destination",
          "Valid passport with sufficient validity",
          "Same-day or next-day connecting flight",
        ],
        documents: [
          "Valid passport",
          "Confirmed onward flight ticket",
          "Valid visa for final destination (if required)",
        ],
        faqs: [
          { question: "When do I need a UK transit visa?", answer: "A Direct Airside Transit Visa (DATV) is required for nationals of certain countries. Check if your nationality requires one before booking." },
        ],
      },
    },
  },
  canada: {
    description: "Canada welcomes millions of visitors each year. The country offers visitor visas, study permits, work permits, and various immigration pathways for those seeking permanent residence.",
    categories: {
      tourist: {
        processingTime: "12-20 working days",
        govtFee: 100,
        serviceCharge: 75,
        requirements: [
          "Valid passport with sufficient validity",
          "Proof of ties to home country (employment, property, family)",
          "Sufficient funds for the stay",
          "Travel history (if applicable)",
          "Purpose of visit clearly stated",
        ],
        documents: [
          "Valid passport",
          "Digital photograph (35mm x 45mm)",
          "Travel itinerary",
          "Hotel bookings or accommodation proof",
          "Bank statements (last 4 months)",
          "Employment letter",
          "Property documents (if applicable)",
          "Previous passport and visas (if any)",
        ],
        faqs: [
          { question: "How long can I stay on a Canada visitor visa?", answer: "Most visitors are admitted for up to 6 months. The border officer determines the exact duration at the port of entry." },
          { question: "Do I need biometrics for Canada visa?", answer: "Yes, most applicants need to provide biometrics (fingerprints and photograph) at a designated Visa Application Centre." },
        ],
      },
      business: {
        processingTime: "12-20 working days",
        govtFee: 100,
        serviceCharge: 85,
        requirements: [
          "Valid passport",
          "Invitation letter from Canadian business partner",
          "Proof of business activities in Canada",
          "Company registration documents",
          "Travel itinerary for business meetings",
        ],
        documents: [
          "Valid passport",
          "Company registration certificate",
          "Invitation letter from Canadian company",
          "Bank statements",
          "IT returns (last 2 years)",
        ],
        faqs: [
          { question: "Can I do business on a visitor visa?", answer: "Yes, Canada allows business activities like attending meetings, conferences, and trade shows on a visitor visa." },
        ],
      },
      student: {
        processingTime: "8-12 weeks",
        govtFee: 150,
        serviceCharge: 150,
        requirements: [
          "Acceptance letter from a Designated Learning Institution (DLI)",
          "Proof of sufficient funds for tuition and living expenses",
          "No criminal record (police certificate may be required)",
          "Medical examination (if applicable based on country)",
          "Genuine intention to leave Canada after studies",
        ],
        documents: [
          "Valid passport",
          "Acceptance letter from DLI",
          "Academic transcripts and certificates",
          "English/French language test scores (IELTS/TOEFL)",
          "Proof of funds (bank statements, loan approval letters)",
          "Statement of Purpose (SOP)",
          "Medical examination report",
          "Police clearance certificate",
        ],
        faqs: [
          { question: "Can I work while studying in Canada?", answer: "Yes, study permit holders can work up to 20 hours/week off-campus during academic sessions and full-time during scheduled breaks." },
          { question: "Can I stay in Canada after graduation?", answer: "Yes, graduates can apply for a Post-Graduation Work Permit (PGWP) valid for up to 3 years, which can lead to permanent residence." },
        ],
      },
      work: {
        processingTime: "3-6 months",
        govtFee: 155,
        serviceCharge: 250,
        requirements: [
          "Valid job offer from a Canadian employer",
          "Employer needs LMIA (Labour Market Impact Assessment) or LMIA-exempt offer",
          "Valid passport with sufficient validity",
          "Work experience and qualifications for the position",
          "Meet health and character requirements",
        ],
        documents: [
          "Valid passport",
          "Job offer letter and employment contract",
          "LMIA document (if applicable)",
          "Educational degrees and certificates",
          "Work experience letters",
          "Medical examination report",
          "Police clearance certificate",
        ],
        faqs: [
          { question: "What is LMIA?", answer: "Labour Market Impact Assessment (LMIA) is a document from Employment and Social Development Canada confirming that no Canadian worker is available for the position." },
          { question: "Can my family accompany me on a work permit?", answer: "Yes, work permit holders can bring their spouse and dependent children. Spouses may be eligible for open work permits." },
        ],
      },
      transit: {
        processingTime: "5-10 working days",
        govtFee: 100,
        serviceCharge: 40,
        requirements: [
          "Confirmed onward ticket to a third country",
          "Valid visa for final destination",
          "Valid passport",
          "Transit through Canadian airport",
        ],
        documents: [
          "Valid passport",
          "Confirmed onward flight ticket",
          "Valid visa for final destination",
        ],
        faqs: [
          { question: "Do I need a visa to transit through Canada?", answer: "Yes, most foreign nationals need a transit visa or eTA to transit through Canada, even if not leaving the airport." },
        ],
      },
    },
  },
  australia: {
    description: "Australia offers diverse visa options for tourism, business, study, and work. The Department of Home Affairs manages all visa applications with efficient online processing.",
    categories: {
      tourist: {
        processingTime: "10-18 working days",
        govtFee: 195,
        serviceCharge: 85,
        requirements: [
          "Valid passport with sufficient validity",
          "Genuine intention to visit temporarily",
          "Sufficient funds for the stay",
          "Health insurance (recommended)",
          "No criminal record",
        ],
        documents: [
          "Valid passport",
          "Passport-size photographs",
          "Travel itinerary",
          "Hotel bookings or accommodation proof",
          "Bank statements (last 3 months)",
          "Employment letter and leave approval",
          "Family composition form",
        ],
        faqs: [
          { question: "How long can I stay on an Australia visitor visa?", answer: "The standard visitor visa (subclass 600) allows stays up to 3, 6, or 12 months depending on the visa conditions." },
          { question: "Can I apply for an Australian visa online?", answer: "Yes, most Australian visa applications are submitted online through the ImmiAccount portal." },
        ],
      },
      business: {
        processingTime: "10-18 working days",
        govtFee: 195,
        serviceCharge: 95,
        requirements: [
          "Valid passport",
          "Invitation letter from Australian business partner",
          "Proof of business activities",
          "Company registration documents",
          "Detailed itinerary of business meetings",
        ],
        documents: [
          "Valid passport",
          "Company registration certificate",
          "Invitation letter from Australian company",
          "Bank statements",
          "IT returns (last 2 years)",
          "Business meeting itinerary",
        ],
        faqs: [
          { question: "Can I attend business events on a visitor visa?", answer: "Yes, the Australia visitor visa allows attending conferences, business meetings, and negotiations. Direct employment is not permitted." },
        ],
      },
      student: {
        processingTime: "4-8 weeks",
        govtFee: 710,
        serviceCharge: 200,
        requirements: [
          "Confirmation of Enrolment (CoE) from an Australian institution",
          "Genuine Student (GS) requirement demonstration",
          "English language proficiency (IELTS 5.5-7.0 depending on course)",
          "Overseas Student Health Cover (OSHC)",
          "Sufficient funds for tuition and living expenses",
        ],
        documents: [
          "Valid passport",
          "Confirmation of Enrolment (CoE)",
          "Academic transcripts and certificates",
          "English language test scores",
          "Proof of funds (bank statements, loan approval)",
          "OSHC health insurance certificate",
          "Genuine Student statement",
        ],
        faqs: [
          { question: "Can I work on an Australian student visa?", answer: "Yes, student visa holders can work up to 48 hours per fortnight during study periods and unlimited hours during scheduled breaks." },
          { question: "What is the post-study work options?", answer: "Graduates can apply for a Temporary Graduate visa (subclass 485) allowing 2-4 years of work after completing their studies." },
        ],
      },
      work: {
        processingTime: "3-9 months",
        govtFee: 1370,
        serviceCharge: 350,
        requirements: [
          "Valid job offer from an approved Australian employer sponsor",
          "Skills assessment for your occupation (if required)",
          "English language proficiency (IELTS 5.0-7.0 depending on visa)",
          "Valid passport with sufficient validity",
          "Meet health and character requirements",
        ],
        documents: [
          "Valid passport",
          "Sponsorship approval notice",
          "Job offer letter and employment contract",
          "Skills assessment report",
          "Educational degrees and professional certificates",
          "English language test scores",
          "Medical examination report",
          "Police clearance certificate",
        ],
        faqs: [
          { question: "What is the Subclass 482 visa?", answer: "The Temporary Skill Shortage (TSS) visa (subclass 482) allows employers to sponsor skilled workers for positions they cannot fill locally. Valid for 2-4 years." },
          { question: "Can I apply for permanent residency through work?", answer: "Yes, many temporary work visas offer pathways to permanent residence through the Employer Nomination Scheme (subclass 186) or General Skilled Migration." },
        ],
      },
      transit: {
        processingTime: "2-5 working days",
        govtFee: 0,
        serviceCharge: 35,
        requirements: [
          "Confirmed onward ticket to a third country within 8 hours",
          "Valid visa for final destination (if required)",
          "Valid passport",
          "Staying within the airport transit area",
        ],
        documents: [
          "Valid passport",
          "Confirmed onward flight ticket",
          "Valid visa for final destination",
        ],
        faqs: [
          { question: "Do I need a visa to transit through Australia?", answer: "Citizens of certain countries need a Transit visa (subclass 771) even for airside connections. Check your nationality requirements." },
        ],
      },
    },
  },
  "new-zealand": {
    description: "New Zealand offers beautiful landscapes and welcoming visa policies. The country provides visitor visas, work visas, student visas, and residence pathways.",
    categories: {
      tourist: {
        processingTime: "15-25 working days",
        govtFee: 211,
        serviceCharge: 75,
        requirements: [
          "Valid passport with sufficient validity",
          "Proof of sufficient funds (NZD $1,000/month or NZD $400/month with prepaid accommodation)",
          "Onward travel ticket",
          "Genuine intention to visit",
          "No criminal record",
        ],
        documents: [
          "Valid passport",
          "Passport-size photographs",
          "Travel itinerary",
          "Accommodation bookings",
          "Bank statements (last 3 months)",
          "Employment letter",
          "Travel insurance",
        ],
        faqs: [
          { question: "How long can I stay on a NZ visitor visa?", answer: "Most visitor visas allow stays of up to 9 months within an 18-month period." },
          { question: "Do I need an NZeTA?", answer: "Citizens of visa waiver countries need an NZeTA (New Zealand Electronic Travel Authority) before traveling." },
        ],
      },
      student: {
        processingTime: "6-10 weeks",
        govtFee: 375,
        serviceCharge: 150,
        requirements: [
          "Offer of place from a New Zealand educational institution",
          "Proof of sufficient funds (NZD $15,000-$20,000 per year for living costs)",
          "Valid passport",
          "Onward travel arrangements",
          "Health insurance (mandatory for most students)",
        ],
        documents: [
          "Valid passport",
          "Offer letter from educational institution",
          "Academic transcripts and certificates",
          "English language test scores (IELTS/TOEFL)",
          "Proof of funds (bank statements, loan approval)",
          "Medical and travel insurance",
        ],
        faqs: [
          { question: "Can I work on a student visa in NZ?", answer: "Yes, full-time students can work up to 20 hours/week during term and full-time during holidays." },
        ],
      },
    },
  },
  schengen: {
    description: "The Schengen Area comprises 27 European countries allowing free movement across borders. A single Schengen visa grants access to all member countries for stays up to 90 days.",
    categories: {
      tourist: {
        processingTime: "7-15 working days",
        govtFee: 90,
        serviceCharge: 80,
        appointmentCharge: 20,
        insuranceRequired: true,
        requirements: [
          "Valid passport with at least 3 months validity beyond departure",
          "Travel medical insurance of minimum €30,000 coverage",
          "Proof of accommodation in Schengen area",
          "Return flight ticket",
          "Proof of sufficient funds (€50-100 per day)",
        ],
        documents: [
          "Valid passport with 3+ months post-departure validity",
          "Visa application form (signed)",
          "Passport-size photographs (ICAO compliant)",
          "Travel insurance certificate (€30,000+ coverage)",
          "Flight itinerary (round trip)",
          "Hotel bookings for entire stay",
          "Bank statements (last 3-6 months)",
          "Employment letter and leave approval",
          "Salary slips (last 3 months)",
        ],
        faqs: [
          { question: "Which countries are in the Schengen Area?", answer: "27 European countries including France, Germany, Italy, Spain, Netherlands, Switzerland, and more. A single visa allows travel to all." },
          { question: "How early should I apply for a Schengen visa?", answer: "You can apply up to 6 months before travel. Processing typically takes 7-15 days. Apply at least 3-4 weeks before departure." },
          { question: "Do I need travel insurance?", answer: "Yes, travel medical insurance with minimum €30,000 coverage is mandatory for all Schengen visa applications." },
        ],
      },
      business: {
        processingTime: "7-15 working days",
        govtFee: 90,
        serviceCharge: 90,
        appointmentCharge: 20,
        insuranceRequired: true,
        requirements: [
          "Valid passport with 3+ months validity",
          "Invitation letter from Schengen business partner",
          "Travel medical insurance (€30,000 minimum)",
          "Proof of business activities",
          "Company registration documents",
        ],
        documents: [
          "Valid passport",
          "Company registration certificate",
          "Invitation letter from Schengen company",
          "Bank statements (company and personal)",
          "IT returns (last 2 years)",
          "Travel insurance certificate",
          "Conference/trade event registration",
        ],
        faqs: [
          { question: "Is appointment charge mandatory?", answer: "Appointment charges apply at some visa application centers (VFS Global, TLScontact) for appointment booking and priority processing." },
        ],
      },
      student: {
        processingTime: "4-8 weeks",
        govtFee: 90,
        serviceCharge: 150,
        insuranceRequired: true,
        requirements: [
          "Admission letter from a recognized Schengen educational institution",
          "Proof of sufficient funds",
          "Valid passport",
          "Health insurance",
          "Accommodation arrangements",
        ],
        documents: [
          "Valid passport",
          "University admission letter",
          "Academic transcripts",
          "English/French/German language test scores",
          "Proof of funds (bank statements, scholarship letters)",
          "Health insurance",
          "Accommodation proof",
        ],
        faqs: [
          { question: "Do I need a separate visa for each Schengen country for study?", answer: "No, a student visa from one Schengen country allows study in that specific country. You may need a separate visa if studying in multiple Schengen countries." },
        ],
      },
      transit: {
        processingTime: "3-7 working days",
        govtFee: 90,
        serviceCharge: 40,
        insuranceRequired: false,
        requirements: [
          "Confirmed onward ticket to a non-Schengen country",
          "Valid visa for final destination",
          "Valid passport",
          "Staying within airport transit zone",
        ],
        documents: [
          "Valid passport",
          "Confirmed onward flight ticket",
          "Valid visa for final destination",
        ],
        faqs: [
          { question: "Do I need an airport transit visa?", answer: "Citizens of certain countries need an Airport Transit Visa (ATV) even if staying airside. Check the Schengen rules for your nationality." },
        ],
      },
    },
  },
  uae: {
    description: "The United Arab Emirates offers streamlined visa processes for tourists, business travelers, and workers. Dubai and Abu Dhabi are major global hubs with excellent connectivity.",
    categories: {
      tourist: {
        processingTime: "3-5 working days",
        govtFee: 100,
        serviceCharge: 60,
        requirements: [
          "Valid passport with at least 6 months validity",
          "Return ticket",
          "Hotel booking or accommodation proof",
          "Sufficient funds for the stay",
          "Travel insurance (recommended)",
        ],
        documents: [
          "Valid passport (scanned copy)",
          "Passport-size photograph (white background)",
          "Hotel booking confirmation",
          "Return flight ticket",
          "Bank statements (last 3 months)",
        ],
        faqs: [
          { question: "Can I get a visa on arrival in UAE?", answer: "Citizens of many countries get visa on arrival for 30-90 days. Check UAE immigration website for your nationality." },
          { question: "How long is a UAE tourist visa valid?", answer: "Standard tourist visas are valid for 30 days from entry, extendable for an additional 30 days." },
        ],
      },
      business: {
        processingTime: "3-5 working days",
        govtFee: 200,
        serviceCharge: 75,
        requirements: [
          "Valid passport with 6+ months validity",
          "Invitation letter from UAE company",
          "Proof of business relationship",
          "Company registration documents",
          "Business meeting itinerary",
        ],
        documents: [
          "Valid passport",
          "Company registration certificate",
          "Invitation letter from UAE company",
          "Bank statements",
          "Business profile",
        ],
        faqs: [
          { question: "Can I do business on a UAE tourist visa?", answer: "No, business activities require a proper business visa arranged by a UAE sponsor company." },
        ],
      },
      transit: {
        processingTime: "1-3 working days",
        govtFee: 50,
        serviceCharge: 35,
        requirements: [
          "Confirmed onward ticket to a third country",
          "Valid visa for final destination (if required)",
          "Valid passport",
          "Layover between connecting flights",
        ],
        documents: [
          "Valid passport",
          "Confirmed onward flight ticket",
          "Valid visa for final destination",
        ],
        faqs: [
          { question: "Can I leave the airport on a transit visa?", answer: "Yes, UAE offers a 48-hour transit visa that allows leaving the airport. Some nationalities get a free 96-hour visa with airline booking." },
        ],
      },
    },
  },
  japan: {
    description: "Japan offers rich cultural experiences and efficient visa processing. The country welcomes millions of tourists annually with streamlined application procedures.",
    categories: {
      tourist: {
        processingTime: "5-10 working days",
        govtFee: 30,
        serviceCharge: 65,
        requirements: [
          "Valid passport with sufficient validity",
          "Sufficient funds for the stay",
          "Return ticket",
          "Clear travel itinerary",
          "No criminal record",
        ],
        documents: [
          "Valid passport",
          "Visa application form (signed)",
          "Passport-size photographs (45mm x 45mm)",
          "Detailed travel itinerary",
          "Hotel bookings",
          "Bank statements (last 3 months)",
          "Employment letter",
          "Flight itinerary (round trip)",
        ],
        faqs: [
          { question: "Can I apply for a Japanese visa online?", answer: "Japan has introduced online visa applications for some countries through the JAPAN eVISA system. Traditional embassy applications are still available." },
          { question: "What is the maximum stay on a Japanese tourist visa?", answer: "Single-entry tourist visas typically allow stays of 15 or 30 days depending on your nationality." },
        ],
      },
    },
  },
  singapore: {
    description: "Singapore is a vibrant city-state with efficient visa processing. It offers visa-free entry to many nationalities and streamlined eVisa services.",
    categories: {
      tourist: {
        processingTime: "3-7 working days",
        govtFee: 30,
        serviceCharge: 55,
        requirements: [
          "Valid passport with at least 6 months validity",
          "Confirmed return ticket",
          "Sufficient funds for stay",
          "Proof of accommodation",
          "Travel itinerary",
        ],
        documents: [
          "Valid passport (scanned copy)",
          "Digital photograph (white background)",
          "Hotel booking confirmation",
          "Return flight ticket",
          "Bank statements (last 3 months)",
          "Employment letter",
        ],
        faqs: [
          { question: "Do I need a visa for Singapore?", answer: "Citizens of many countries enjoy visa-free entry for 30-90 days. Check if your nationality requires a visa before traveling." },
          { question: "How do I apply for a Singapore eVisa?", answer: "Singapore eVisas can be applied through authorized agents or overseas missions. Processing takes 3-5 working days." },
        ],
      },
    },
  },
  "south-korea": {
    description: "South Korea blends modern technology with ancient traditions. The country offers visa-free entry to many nationalities and K-ETA for visa waiver countries.",
    categories: {
      tourist: {
        processingTime: "5-12 working days",
        govtFee: 40,
        serviceCharge: 60,
        requirements: [
          "Valid passport with 6+ months validity",
          "Proof of sufficient funds",
          "Return ticket",
          "Proof of accommodation",
          "Travel itinerary",
        ],
        documents: [
          "Valid passport",
          "Visa application form",
          "Passport-size photographs",
          "Travel itinerary",
          "Hotel bookings",
          "Bank statements (last 3 months)",
          "Employment letter",
          "Flight reservation",
        ],
        faqs: [
          { question: "What is K-ETA?", answer: "Korea Electronic Travel Authorization is required for visa-free entry nationals before traveling to South Korea." },
          { question: "How long can I stay in South Korea visa-free?", answer: "Citizens of visa waiver countries can stay for 30-90 days depending on nationality." },
        ],
      },
    },
  },
  vietnam: {
    description: "Vietnam is a popular destination with convenient e-visa and visa on arrival options for tourists and business travelers.",
    categories: {
      tourist: {
        processingTime: "3-5 working days",
        govtFee: 25,
        serviceCharge: 45,
        requirements: [
          "Valid passport with 6+ months validity",
          "Digital photograph",
          "Travel itinerary",
          "Return ticket",
          "Hotel booking (recommended)",
        ],
        documents: [
          "Valid passport (scanned copy)",
          "Digital photograph (white background)",
          "Flight itinerary",
          "Hotel booking confirmation",
        ],
        faqs: [
          { question: "How do I get a Vietnam e-visa?", answer: "Vietnam e-visa is applied online at the official immigration website. Processing takes 3 working days. Valid for up to 90 days." },
          { question: "Can I get a visa on arrival?", answer: "Visa on arrival is available with a pre-approval letter obtained through travel agencies. Available at international airports." },
        ],
      },
    },
  },
  "saudi-arabia": {
    description: "Saudi Arabia has opened its doors to international tourists with the introduction of the tourist eVisa and easy online application process.",
    categories: {
      tourist: {
        processingTime: "2-5 working days",
        govtFee: 140,
        serviceCharge: 55,
        requirements: [
          "Valid passport with 6+ months validity",
          "Digital photograph",
          "Travel insurance (included in visa fee)",
          "Return ticket",
          "Accommodation booking",
        ],
        documents: [
          "Valid passport (scanned copy)",
          "Digital photograph",
          "Flight itinerary",
          "Hotel booking confirmation",
          "Travel insurance (included in visa fee)",
        ],
        faqs: [
          { question: "What is the Saudi tourist eVisa?", answer: "The Saudi tourist eVisa is a one-year multiple-entry visa allowing stays up to 90 days. It covers tourism, Umrah (non-Hajj), and family visits." },
          { question: "Do women need special permission to visit?", answer: "No, women can apply for tourist visas independently. There are no gender-based restrictions for tourism." },
        ],
      },
    },
  },
};
