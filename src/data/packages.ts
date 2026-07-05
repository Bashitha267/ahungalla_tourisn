export interface PlaceVisit {
  name: string;
  tagline: string;
  description: string;
  activities: string[];
  image: string;
}

export interface TourPackage {
  id: string;
  title: string;
  tagline: string;
  duration: string;
  price: number;
  rating: number;
  reviewsCount: number;
  category: 'half-day' | '1-day' | '2-day';
  description: string;
  shortDescription: string;
  highlights: string[];
  coverImageMobile: string;
  coverImageDesktop: string;
  images: string[];
  included: string[];
  excluded: string[];
  places: PlaceVisit[];
}

export const tourPackages: TourPackage[] = [
  {
    id: "half-day-tour",
    title: "Half-Day Tour Excursions",
    tagline: "Experience the magic of mangrove safaris and turtle conservation in just half a day.",
    duration: "Half Day / 6 Hours",
    price: 45,
    rating: 4.80,
    reviewsCount: 98,
    category: "half-day",
    shortDescription: "A compact 6-hour private expedition covering the Madu River boat safari, cinnamon extraction, and the Kosgoda sea turtle sanctuary.",
    description: "Ideal for travelers looking for a shorter, relaxing excursion that fits perfectly into a morning or afternoon. Witness local conservation efforts at the turtle hatchery, cruise through the rich ecosystems of the Madu River mangroves, and try traditional fish therapy—all in one convenient half-day trip with Berty Tours.",
    highlights: [
      "Cruising the Madu River mangrove canals",
      "Traditional cinnamon peeling demonstration on Cinnamon Island",
      "Visiting the sea turtle hatchery & conservation project in Kosgoda",
      "Relaxing fish foot therapy massage",
      "Private transport in an air-conditioned car/van"
    ],
    coverImageMobile: "https://res.cloudinary.com/dnfbik3if/image/upload/v1782981456/madu_fuiovg.avif",
    coverImageDesktop: "https://res.cloudinary.com/dnfbik3if/image/upload/v1782981456/madu_fuiovg.avif",
    images: [
      "https://res.cloudinary.com/dnfbik3if/image/upload/v1782981454/benthota_pxd0g6.jpg",
      "https://res.cloudinary.com/dnfbik3if/image/upload/v1782981456/madu_fuiovg.avif"
    ],
    included: [
      "Private transport in an air-conditioned car/van",
      "All fuel and toll charges",
      "Licensed English-speaking tourist guide lecturer (Berty Tours)",
      "Free hotel pickup and drop-off from Ahungalla/Bentota areas",
      "Full passenger insurance coverage"
    ],
    excluded: [
      "Entrance tickets (e.g. Turtle farm, River Safari boat rent)",
      "Lunch, snacks, or alcoholic beverages",
      "Tips for local guides/boatmen",
      "Personal shopping and souvenirs"
    ],
    places: [
      {
        name: "Bentota & Kosgoda Coastline",
        tagline: "Beaches, Sea Turtles, and Local Handicrafts",
        description: "Kosgoda is world-famous for its turtle conservation projects, where you can watch green and leatherback turtles hatching safely. You will also get to see the beautiful Bentota coastline and explore local crafts.",
        image: "https://res.cloudinary.com/dnfbik3if/image/upload/v1782981454/benthota_pxd0g6.jpg",
        activities: [
          "Visit the Sea Turtle Hatchery & release baby turtles",
          "Explore the Matale/Bentota Spice and Herbal Garden",
          "Shop for authentic local batiks and wood carvings"
        ]
      },
      {
        name: "Madu River Safari (Balapitiya)",
        tagline: "Mangrove Estuary Boat Safari",
        description: "The Madu Ganga is a pristine wetland estuary containing 64 islands. Board a private boat to weave through dense mangrove cave tunnels, watch local cinnamon peeling, and relax with a natural fish foot therapy massage.",
        image: "https://res.cloudinary.com/dnfbik3if/image/upload/v1782981456/madu_fuiovg.avif",
        activities: [
          "Take a scenic boat safari passing minor islets",
          "Step onto Cinnamon Island to watch traditional processing",
          "Try the floating fish massage pedicure experience"
        ]
      }
    ]
  },
  {
    id: "1-day-tour",
    title: "01 Day Tour Excursions",
    tagline: "Explore the golden beaches, river safaris, and rainforests of Sri Lanka in one day.",
    duration: "1 Day / 12 Hours",
    price: 85,
    rating: 4.85,
    reviewsCount: 220,
    category: "1-day",
    shortDescription: "Bespoke single-day private expeditions spanning Bentota Water Sports, Galle Fort, Madu River Boat Safari, and Sinharaja Rain Forest.",
    description: "Ideal for travelers seeking focused, high-impact day trips across the southern and central regions of Sri Lanka. Accompanied by Berty Tours' licensed chauffeur guides, you can discover colonial castles, cruise through mangrove channels, spot blue whales in the deep ocean, or hike through prehistoric rainforests—all inside a single, comfortably paced day.",
    highlights: [
      "Cruising the Madu River mangrove canals",
      "Strolling Galle Dutch Fort UNESCO site",
      "Snorkeling and marine turtles in Kosgoda/Bentota",
      "Spotting whales in Mirissa deep sea",
      "Trekking through Sinharaja UNESCO biosphere",
      "Temple of the Tooth Relic in hill country Kandy"
    ],
    coverImageMobile: "https://res.cloudinary.com/dnfbik3if/image/upload/v1782981291/pkg1mb_ye9rsd.jpg",
    coverImageDesktop: "https://res.cloudinary.com/dnfbik3if/image/upload/w_1200,c_scale/v1782980763/pkg1_pvbouz.jpg",
    images: [
      "https://res.cloudinary.com/dnfbik3if/image/upload/v1782327437/gLle_qhep0k.jpg", // Galle Dutch Fort
      "https://res.cloudinary.com/dnfbik3if/image/upload/v1782327437/miriss_j5g6dw.jpg"  // River Safari
    ],
    included: [
      "Private transport in an air-conditioned car/van",
      "All fuel and toll charges",
      "Licensed English-speaking tourist guide lecturer (Berty Tours)",
      "Traditional Sri Lankan village lunch",
      "Free hotel pickup and drop-off from Ahungalla/Bentota areas",
      "Full passenger insurance coverage"
    ],
    excluded: [
      "Entrance tickets (e.g. Turtle farm, River Safari boat rent, Kandy Temple)",
      "Tips for local guides/boatmen",
      "Personal shopping and souvenirs",
      "Alcoholic beverages"
    ],
    places: [
      {
        name: "Bentota & Kosgoda Coastline",
        tagline: "Beaches, Sea Turtles, and Local Handicrafts",
        description: "Bentota is Sri Lanka's leading beach destination, renowned for golden sands and water sports. Kosgoda is world-famous for its turtle conservation projects, where you can watch green and leatherback turtles hatching safely.",
        image: "https://res.cloudinary.com/dnfbik3if/image/upload/v1782981454/benthota_pxd0g6.jpg",
        activities: [
          "Visit the Sea Turtle Hatchery & release baby turtles",
          "Explore the Matale/Bentota Spice and Herbal Garden",
          "Shop for authentic local gems, batiks, and textiles",
          "Tour traditional wood carving and mask workshop",
          "Taste single-estate Ceylon tea at local tea shops"
        ]
      },
      {
        name: "Galle Dutch Fortified City",
        tagline: "A 16th-Century Portuguese and Dutch Masterpiece",
        description: "Galle Fort is a UNESCO World Heritage site blending European architecture and South Asian traditions. Walk past colonial mansions, historical lighthouses, and trendy boutique stores along the fortification walls.",
        image: "https://res.cloudinary.com/dnfbik3if/image/upload/v1782327437/gLle_qhep0k.jpg",
        activities: [
          "Walk the historic Galle Fort ramparts and visit the lighthouse",
          "Visit an authentic Sri Lankan mask factory in Ambalangoda",
          "Tour a Moonstone Mine and see gem-cutting artisans",
          "Snorkel or ride a glass-bottom boat in Hikkaduwa coral sanctuary",
          "Explore silk factories and colonial jewelry shops"
        ]
      },
      {
        name: "Madu River Safari (Balapitiya)",
        tagline: "Mangrove Estuary Boat Safari",
        description: "The Madu Ganga is a pristine wetland estuary containing 64 islands. Board a private boat to weave through dense mangrove cave tunnels, watch local cinnamon peeling, and relax with a natural fish foot therapy massage.",
        image: "https://res.cloudinary.com/dnfbik3if/image/upload/v1782981456/madu_fuiovg.avif",
        activities: [
          "Take a scenic boat safari passing minor islets",
          "Step onto Cinnamon Island to watch traditional processing",
          "Visit Kothduwa temple island dating back to ancient kings",
          "Try the floating fish massage pedicure experience"
        ]
      },
      {
        name: "Sinharaja Rain Forest Wilderness",
        tagline: "Trekking Sri Lanka's Prehistoric Biosphere",
        description: "Sinharaja is a virgin tropical rainforest and UNESCO biosphere reserve. It contains over 60% of Sri Lanka's endemic tree species and is home to rare birds, leopards, tree frogs, and diverse orchids.",
        image: "https://res.cloudinary.com/dnfbik3if/image/upload/v1782981455/sinharaja_wu6npm.jpg",
        activities: [
          "Guided trek with a naturalist guide to search for endemic birds",
          "Spot rare species of lizards, tree frogs, and butterflies",
          "Swim in a refreshing natural waterfall pool inside the jungle",
          "Learn about endangered medicinal tropical flora"
        ]
      },
      {
        name: "Kandy Cultural Capital",
        tagline: "The Sacred Hill Kingdom",
        description: "Nestled among green mountains, Kandy is the spiritual heart of the island. Home to the Temple of the Sacred Tooth Relic, it is the last capital of the ancient kings, featuring botanical gardens and tea factories.",
        image: "https://res.cloudinary.com/dnfbik3if/image/upload/v1782981454/kandy_nyxllc.jpg",
        activities: [
          "Visit the Pinnawala Elephant Orphanage (feeding and river bathing)",
          "Tour a local tea plantation and watch processing at the tea factory",
          "Pay respects at the Temple of the Sacred Tooth Relic",
          "Walk through the Royal Botanic Gardens in Peradeniya",
          "Take a spice garden walking tour in Matale"
        ]
      }
    ]
  },
  {
    id: "2-days-tour",
    title: "02 Days Tour Expeditions",
    tagline: "Immerse in ancient fortresses, misty tea estates, and leopard safaris.",
    duration: "2 Days / 1 Night",
    price: 175,
    rating: 4.95,
    reviewsCount: 164,
    category: "2-day",
    shortDescription: "A premium 2-day itinerary linking Kandy, Sigiriya Rock, Nuwara Eliya tea hills, and Yala/Udawalawe National Park safaris.",
    description: "Experience the ultimate Sri Lankan overnight escape. Designed for active travelers, these 2-day journeys bridge the cultural triangle's grand rock fortresses with the central tea highlands or the wildlife national parks of the south. Travel in style and luxury with complete insurance cover.",
    highlights: [
      "Climbing Sigiriya Lion Rock Fortress at dawn",
      "Strolling Gregory Lake in misty Nuwara Eliya",
      "Feeding baby elephants at Udawalawe Transit Home",
      "Jeep safaris searching for Yala Leopards",
      "White-water rafting down the Kithulgala rapids",
      "Dambulla UNESCO gold cave temples"
    ],
    coverImageMobile: "https://res.cloudinary.com/dnfbik3if/image/upload/v1782981291/pkg2_mob_wz0inj.jpg",
    coverImageDesktop: "https://res.cloudinary.com/dnfbik3if/image/upload/v1782981291/pkg2_q4hhdv.jpg",
    images: [
      "https://res.cloudinary.com/dnfbik3if/image/upload/v1782327437/nuwa_xnpith.jpg", // Tea fields Nuwara Eliya
      "https://res.cloudinary.com/dnfbik3if/image/upload/v1782981453/yala_lliszn.jpg"  // Leopard Yala
    ],
    included: [
      "1 Night stay in 4-star boutique hotel/lodge",
      "Chauffeur guide lecturer and private AC transport (Berty Tours)",
      "Daily breakfast and dinner (half board)",
      "Free hotel pickup/drop-off",
      "All national expressway tolls & fuel costs",
      "Full insurance coverage for vehicle & occupants"
    ],
    excluded: [
      "National Park entrance permit fees",
      "Sigiriya & Dambulla entry tickets",
      "Lunch, snacks, and private beverages",
      "Adventure gear hire fees (rafting, zip lines)"
    ],
    places: [
      {
        name: "Sigiriya",
        tagline: "Fortresses, Cave Temples, and Cultural Dances",
        description: "Embark on an epic exploration of ancient kingdoms. Climb the Sigiriya Lion Rock, explore Dambulla's cave temple paintings, and experience the cultural energy of Kandy—complete with traditional dances and sacred relics.",
        image: "https://res.cloudinary.com/dnfbik3if/image/upload/v1782327438/sigiria_i9mige.jpg",
        activities: [
          "Climb the 200m high Sigiriya Rock Fortress",
          "Explore the Dambulla Rock Cave Temples dating to 1st century BC",
         
          "Visit the Pinnawala Elephant Orphanage and Botanical Gardens"
        ]
      },
      {
        name: "Nuwara Eliya ",
        tagline: "Waterfalls, colonial valleys, and Ceylon Tea trails",
        description: "Travel from Kandy into Nuwara Eliya (Little England). Walk through manicured English gardens, view cascading waterfalls, and watch tea pluckers on rolling hills before visiting a working tea factory.",
        image: "https://res.cloudinary.com/dnfbik3if/image/upload/v1782981656/images_wpz6hr.jpg",
        activities: [
          "Walk through Gregory Lake Park and Gregory colonial estates",
          "Tour a tea plantation and watch tea processing at a factory",
          "View Ravana / Devon waterfall cascades in the highlands",
          "Visit the Peradeniya Botanical Gardens in Kandy",
          "Shop for authentic spices in Matale Herbal Gardens"
        ]
      },
      {
        name: "Udawalawe Elephant Sanctuary",
        tagline: "Elephants, Lakes, and Orphan Care",
        description: "Udawalawe is a sanctuary for wild elephants and birds. Visit the Elephant Transit Home to watch feeding sessions of orphaned baby elephants, then ride 4x4 jeeps to spot massive herds bathing in the wild.",
        image: "https://res.cloudinary.com/dnfbik3if/image/upload/v1782981453/udawala_kqzh7k.jpg",
        activities: [
          "Watch baby elephants feeding at the Transit Home (ETH)",
          "Take a private 4x4 jeep safari around the Udawalawe Reservoir",
          "Spot crocodiles, deer, wild buffaloes, and peacocks",
          "Stay overnight in an eco-lodge bordering the park"
        ]
      },
      {
        name: "Yala National Park Safari",
        tagline: "Leopard Hunting Grounds & Wild Horizons",
        description: "Yala National Park contains the highest density of leopards in the world. Its coastal scrub jungles and lagoons host massive wild elephants, deer, sloth bears, wild boars, and hundreds of tropical bird species.",
        image: "https://res.cloudinary.com/dnfbik3if/image/upload/v1782981453/yala_lliszn.jpg",
        activities: [
          "Track leopards with an expert tracker on a 4x4 safari drive",
          "Spot wild elephants, spotted deer, wild boars, and sloth bears",
          "See the ancient stick fishermen of the southern coast",
          "Camp under the stars in a luxury safari tent"
        ]
      },
      {
        name: "Kithulgala & Bentota Adventure",
        tagline: "Water Rafting, Jet-skiing, and Deep Sea Fishing",
        description: "For thrill-seekers, this package blends the raging rapids of Kithulgala with the ocean sports of Bentota. Tackle river rafting, jet-ski on the Bentota lagoon, or go deep-sea fishing.",
        image: "https://res.cloudinary.com/dnfbik3if/image/upload/v1782981453/kithulaga_sbqeqc.jpg",
        activities: [
          "Tackle white-water rafting down Kithulgala river rapids",
          "Enjoy jet-skiing, banana boats, and speedboating in Bentota",
          "Go deep-sea sport fishing with professional gear",
          "Explore the Madu River mangroves by speedboat"
        ]
      }
    ]
  }
];
