'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const dictionary: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.packages': 'Packages',
    'nav.about': 'About Us',
    // Hero
    'hero.slogan': '#CeylonForEveryone',
    'hero.subtext': 'Meaningful Journeys, Lasting Memories.',
    'hero.cta': 'Explore Your Ceylon Escape',
    // Home Values
    'home.values.title': 'What Defines Our Journeys',
    'home.values.sub': "We don't just organize trips; we create memories by honoring Sri Lanka's heritage and biodiversity.",
    'home.values.hospitality.title': 'Ayubowan Hospitality',
    'home.values.hospitality.desc': 'From the traditional palm-joined greeting to boutique homestays, experience warmth that feels like coming home.',
    'home.values.eco.title': 'Eco-Conscious Travel',
    'home.values.eco.desc': "We are committed to preserving Ceylon's ecosystems, supporting reef rehab and wild elephant sanctuaries.",
    'home.values.authentic.title': 'Authentic Experiences',
    'home.values.authentic.desc': 'Journey beyond generic routes. Engage in tea pluckings, stilt fishing, and historic temple rites led by locals.',
    // Home Featured
    'home.featured.tag': 'Signature Expeditions',
    'home.featured.title': 'Featured Sri Lanka Packages',
    'home.featured.view_all': 'View All Packages',
    // Feedbacks
    'feedback.title': 'Loved by Travelers',
    'feedback.sub': 'Real stories from guests who explored Sri Lanka with us',
    'feedback.swipe': 'Swipe left or right to change feedback',
    // Slider
    'slider.title': 'Captivating Moments in Ceylon',
    'slider.sub': 'A glimpse into the sights, nature, and cultural highlights of Sri Lanka',
    // Packages page
    'packages.title': 'Sri Lanka Expedition Catalog',
    'packages.sub': 'Find the perfect journey through palm-fringed coastlines, sacred golden shrines, misty valleys, and wild elephant habitats.',
    'packages.category': 'Package',
    'packages.reviews': 'reviews',
    'packages.destinations': 'Places Visited (Highlights):',
    'packages.included_note': 'Private AC taxi & Berty Tours guide lecturer included',
    'packages.view_details': 'View Expedition Details',
    // Package detail page
    'detail.back': 'Back to Catalog',
    'detail.book_now': 'Book / Inquire Now',
    'detail.about': 'About this Expedition',
    'detail.itinerary': 'Expedition Destinations & Itinerary',
    'detail.itinerary_sub': 'Explore the places visited in this package, formatted with custom highlights',
    'detail.experience': 'Things to Watch & Experience:',
    'detail.ready_title': 'Ready to Book Your Custom Expedition?',
    'detail.ready_desc': 'Request a free quote based on your traveler count. Custom routes and private transfers are fully customizable.',
    'detail.inquire': 'Inquire / Book this Tour',
    'detail.not_found': 'Expedition Not Found',
    'detail.not_found_desc': "We couldn't find the tour package you are looking for. It may have been renamed or removed.",
    // About Page
    'about.vision.tag': 'Our Vision & Roots',
    'about.vision.title': 'Ayubowan & Welcome to Berty Tours',
    'about.vision.p1': "Founded on the golden coast of Ahungalla, Berty Tours is a boutique Sri Lankan travel agency run by passionate local experts. We believe travel should leave a positive trace. That's why we coordinate directly with remote communities, organic spice gardens, and local wildlife rangers.",
    'about.vision.p2': "Whether you want to climb the historic Sigiriya Rock Fortress, cruise through the mangrove tunnels of the Madu River, or relax on the golden shores of Bentota, our mission is to deliver authentic, custom, and safe island expeditions.",
    'about.services.title': 'Our Premium Services',
    'about.services.sub': 'What makes traveling with Berty Tours a first-class adventure',
    'about.services.fleet.title': 'Premium Private AC Fleet',
    'about.services.fleet.desc': 'Travel across Sri Lanka in total comfort. Our fleet of modern cars, luxury vans, and SUVs are equipped with dual air-conditioning, passenger safety insurance, and baby seats on request.',
    'about.services.guides.title': 'Licensed Guide Lecturers',
    'about.services.guides.desc': 'Our tours are guided by Berty and our team of SLTDA-licensed English-speaking chauffeur guides. Deeply knowledgeable about local history, wildlife, culture, and folklore, they show you the true heart of Ceylon.',
    'about.pillars.title': 'Our Foundational Pillars',
    'about.pillars.sub': 'The rules that guide how we organize our travel experiences',
    'about.pillars.p1.title': 'Licensed & Secure',
    'about.pillars.p1.desc': 'Registered under the Sri Lanka Tourism Development Authority (SLTDA). Premium private AC vehicles and expert drivers.',
    'about.pillars.p2.title': 'Community First',
    'about.pillars.p2.desc': '60% of all tour bookings go directly to small family-owned guesthouses, local boat rowers, and rural guides.',
    'about.pillars.p3.title': 'Bespoke Customization',
    'about.pillars.p3.desc': 'No two travelers are alike. We fine-tune every package to match your dates, physical capacities, and dietary needs.',
    'about.testimonials.tag': 'Guest Testimonials',
    'about.testimonials.title': 'Loved by Travelers',
    'about.testimonials.sub': 'Read real feedback and stories from guests who explored Sri Lanka with Berty Tours',
    // Berty Profile Section
    'about.berty.tag': 'Meet Your Host & Guide',
    'about.berty.title': 'D. D. A. De Silva',
    'about.berty.role': 'Tourist Guide Lecturer',
    'about.berty.licence': 'Licence No: A587',
    'about.berty.bio': 'Welcome to Sri Lanka! My name is D. D. A. De Silva, widely known as Berty. As a certified Tourist Guide Lecturer licensed by the Sri Lanka Tourism Development Authority (SLTDA), I have spent decades showcasing the unparalleled beauty, rich culture, and hidden treasures of our island.',
    'about.berty.contact_title': 'Contact Details',
    'about.berty.services_title': 'Services Provided',
    'about.berty.service_insurance': 'Full Insurance Coverage',
    'about.berty.service_taxi': 'Full Air-Conditioned Taxi',
    'about.berty.service_tuktuk': 'Traditional Tuk Tuk Rides',
    // Card
    'card.destinations': 'Destinations Included:',
    'card.view': 'View Expedition',
    // Footer
    'footer.desc': 'Discover the wonder of Sri Lanka. We specialize in curating boutique travel experiences across beautiful beaches, ancient ruins, misty tea hills, and tropical safaris.',
    'footer.links': 'Quick Links',
    'footer.tours': 'Signature Tours',
    'footer.contact': 'Contact Us',
    'footer.rights': 'All rights reserved.',
  },
  de: {
    // Nav
    'nav.home': 'Startseite',
    'nav.packages': 'Touren',
    'nav.about': 'Über Uns',
    // Hero
    'hero.slogan': '#CeylonFürAlle',
    'hero.subtext': 'Bedeutungsvolle Reisen, Bleibende Erinnerungen.',
    'hero.cta': 'Entdecken Sie Ceylon',
    // Home Values
    'home.values.title': 'Was Unsere Reisen Auszeichnet',
    'home.values.sub': 'Wir organisieren nicht nur Reisen; wir schaffen Erinnerungen, indem wir das Erbe und die Artenvielfalt Sri Lankas ehren.',
    'home.values.hospitality.title': 'Ayubowan-Gastfreundschaft',
    'home.values.hospitality.desc': 'Vom traditionellen Gruß mit gefalteten Händen bis hin zu Boutique-Gastfamilien – erleben Sie eine Wärme, die sich wie nach Hause kommen anfühlt.',
    'home.values.eco.title': 'Umweltbewusstes Reisen',
    'home.values.eco.desc': 'Wir setzen uns für den Erhalt der Ökosysteme Ceylons ein und unterstützen die Riffsanierung sowie Schutzgebiete für wilde Elefanten.',
    'home.values.authentic.title': 'Authentische Erlebnisse',
    'home.values.authentic.desc': 'Reisen Sie abseits ausgetretener Pfade. Beteiligen Sie sich am Teepflücken, Stelzenfischen und historischen Tempelriten unter lokaler Führung.',
    // Home Featured
    'home.featured.tag': 'Signature Touren',
    'home.featured.title': 'Empfohlene Sri Lanka Touren',
    'home.featured.view_all': 'Alle Touren Anzeigen',
    // Feedbacks
    'feedback.title': 'Von Reisenden Geliebt',
    'feedback.sub': 'Echte Geschichten von Gästen, die mit uns Sri Lanka erkundet haben',
    'feedback.swipe': 'Wischen Sie nach links oder rechts, um das Feedback zu ändern',
    // Slider
    'slider.title': 'Faszinierende Momente in Ceylon',
    'slider.sub': 'Ein Blick auf die atemberaubenden Sehenswürdigkeiten, die Natur und die kulturellen Highlights Sri Lankas',
    // Packages page
    'packages.title': 'Sri Lanka Expeditionskatalog',
    'packages.sub': 'Finden Sie die perfekte Reise durch palmengesäumte Küsten, heilige goldene Schreine, neblige Täler und Lebensräume wilder Elefanten.',
    'packages.category': 'Tour',
    'packages.reviews': 'Bewertungen',
    'packages.destinations': 'Besuchte Orte (Highlights):',
    'packages.included_note': 'Privates klimatisiertes Taxi & Berty Tours Reiseleiter inklusive',
    'packages.view_details': 'Tour-Details Anzeigen',
    // Package detail page
    'detail.back': 'Zurück zum Katalog',
    'detail.book_now': 'Jetzt Buchen / Anfragen',
    'detail.about': 'Über diese Expedition',
    'detail.itinerary': 'Reiseziele & Route der Expedition',
    'detail.itinerary_sub': 'Entdecken Sie die besuchten Orte dieser Tour mit Highlights',
    'detail.experience': 'Sehenswürdigkeiten & Erlebnisse:',
    'detail.ready_title': 'Bereit, Ihre maßgeschneiderte Expedition zu buchen?',
    'detail.ready_desc': 'Fordern Sie ein kostenloses Angebot basierend auf Ihrer Gruppengröße an. Eigene Routen und private Transfers sind flexibel anpassbar.',
    'detail.inquire': 'Diese Tour anfragen / buchen',
    'detail.not_found': 'Expedition nicht gefunden',
    'detail.not_found_desc': 'Die gesuchte Tour wurde leider nicht gefunden. Möglicherweise wurde sie umbenannt oder entfernt.',
    // About Page
    'about.vision.tag': 'Unsere Vision & Wurzeln',
    'about.vision.title': 'Ayubowan & Willkommen bei Berty Tours',
    'about.vision.p1': 'Gegründet an der goldenen Küste von Ahungalla, ist Berty Tours eine kleine sri-lankische Reiseagentur, die von leidenschaftlichen lokalen Experten geführt wird. Wir glauben, dass Reisen positive Spuren hinterlassen sollten. Deshalb arbeiten wir direkt mit abgelegenen Gemeinden, Bio-Kräutergärten und lokalen Rangern zusammen.',
    'about.vision.p2': 'Ob Sie die historische Felsenfestung Sigiriya besteigen, durch die Mangroventunnel des Madu-Flusses fahren oder an den goldenen Stränden von Bentota entspannen möchten – unser Ziel ist es, authentische, maßgeschneiderte und sichere Insel-Expeditionen anzubieten.',
    'about.services.title': 'Unsere Premium-Leistungen',
    'about.services.sub': 'Was das Reisen mit Berty Tours zu einem erstklassigen Abenteuer macht',
    'about.services.fleet.title': 'Klimatisierte Premium-Flotte',
    'about.services.fleet.desc': 'Reisen Sie in absolutem Komfort durch Sri Lanka. Unsere Flotte aus modernen Autos, Luxus-Vans und SUVs ist mit doppelter Klimaanlage, Fahrgastsicherheitsversicherung und auf Anfrage mit Kindersitzen ausgestattet.',
    'about.services.guides.title': 'Lizenzierte Reiseleiter',
    'about.services.guides.desc': 'Unsere Touren werden von Berty und unserem team aus SLTDA-lizenzierten, englischsprachigen Chauffeur-Guides geleitet. Sie verfügen über tiefes Wissen über lokale Geschichte, Tierwelt, Kultur und Folklore und zeigen Ihnen das wahre Herz von Ceylon.',
    'about.pillars.title': 'Unsere Grundpfeiler',
    'about.pillars.sub': 'Die Richtlinien, nach denen wir unsere Reiseerlebnisse gestalten',
    'about.pillars.p1.title': 'Lizenziert & Sicher',
    'about.pillars.p1.desc': 'Registriert bei der Sri Lanka Tourism Development Authority (SLTDA). Erstklassige private klimatisierte Fahrzeuge und erfahrene Fahrer.',
    'about.pillars.p2.title': 'Gemeinschaft Zuerst',
    'about.pillars.p2.desc': '60% aller Buchungen gehen direkt an kleine Familienpensionen, lokale Bootsführer und ländliche Guides.',
    'about.pillars.p3.title': 'Individuelle Anpassung',
    'about.pillars.p3.desc': 'Kein Reisender ist wie der andere. Wir passen jede Tour an Ihre Termine, körperlichen Voraussetzungen und Ernährungsbedürfnisse an.',
    'about.testimonials.tag': 'Gästestimmen',
    'about.testimonials.title': 'Von Reisenden Geliebt',
    'about.testimonials.sub': 'Lesen Sie echtes Feedback von Gästen, die mit Berty Tours gereist sind',
    // Berty Profile Section
    'about.berty.tag': 'Lernen Sie Ihren Reiseleiter kennen',
    'about.berty.title': 'D. D. A. De Silva',
    'about.berty.role': 'Reiseleiter-Dozent',
    'about.berty.licence': 'Lizenz-Nr: A587',
    'about.berty.bio': 'Willkommen in Sri Lanka! Mein Name ist D. D. A. De Silva, weithin bekannt als Berty. Als zertifizierter und von der Tourismusbehörde Sri Lankas (SLTDA) lizenzierter Reiseleiter zeige ich Besuchern seit Jahrzehnten die unvergleichliche Schönheit, reiche Kultur und die verborgenen Schätze unserer Insel.',
    'about.berty.contact_title': 'Kontaktdaten',
    'about.berty.services_title': 'Angebotene Dienstleistungen',
    'about.berty.service_insurance': 'Voller Versicherungsschutz',
    'about.berty.service_taxi': 'Voll klimatisiertes Taxi',
    'about.berty.service_tuktuk': 'Traditionelle Tuk-Tuk-Fahrten',
    // Card
    'card.destinations': 'Inkludierte Ziele:',
    'card.view': 'Tour ansehen',
    // Footer
    'footer.desc': 'Entdecken Sie das Wunder von Sri Lanka. Wir sind auf maßgeschneiderte Reiseerlebnisse an wunderschönen Stränden, antiken Ruinen, nebligen Teehügeln und tropischen Safaris spezialisiert.',
    'footer.links': 'Quick Links',
    'footer.tours': 'Unsere Touren',
    'footer.contact': 'Kontakt',
    'footer.rights': 'Alle Rechte vorbehalten.',
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  // Load language preference from localStorage if available
  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang === 'en' || savedLang === 'de') {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return dictionary[language][key] || dictionary['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
