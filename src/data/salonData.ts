import { Service, ServiceCategory, Review, GalleryItem, SpecialOffer, FaqItem, Stylist } from '../types';
import beardSculptingImg from '../assets/images/beard_sculpting_1787310521147.jpg';
import luxuryPedicureImg from '../assets/images/luxury_pedicure_1787310553356.jpg';
import facialScrubImg from '../assets/images/facial_scrub_1787310568161.jpg';
import headMassageImg from '../assets/images/head_massage_1787310583608.jpg';
import charcoalMaskImg from '../assets/images/charcoal_mask_1787310601943.jpg';
import hairRitualImg from '../assets/images/hair_ritual_1787310613978.jpg';

export const SALON_INFO = {
  name: 'Afroza Gents Salon',
  legalName: 'Afroza Gents Salon LLC',
  tagline: 'Dubai’s Premier Gents Grooming Atelier & Barbershop',
  category: 'Luxury Gents Salon & Barbershop',
  address: 'Shop 8, Ground Floor, Al Marsoumy Building, 43 Street, Warsan 4, International City Phase 2, Dubai, United Arab Emirates',
  shortLocation: 'International City Phase 2 (Warsan 4), Dubai',
  phone: '+971 56 717 9467',
  phoneDisplay: '+971 56 717 9467',
  whatsapp: '+971 56 717 9467',
  whatsappRaw: '971567179467',
  email: 'afrozabilkis2026@gmail.com',
  openingHours: 'Mon – Sun: 10:00 AM – 12:00 AM (Midnight)',
  openingHoursFull: [
    { days: 'Monday – Thursday', hours: '10:00 AM – 12:00 AM' },
    { days: 'Friday – Sunday', hours: '10:00 AM – 12:00 AM' },
  ],
  rating: 4.9,
  reviewCount: 328,
  googleMapsUrl: 'https://maps.app.goo.gl/YyXHMtRJQ3N5eZqc8',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14449.12!2d55.4194!3d25.1582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f63d76e48c081%3A0x7d021c17242d54e4!2sAfroza%20Gents%20Salon!5e0!3m2!1sen!2sae!4v1710000000000!5m2!1sen!2sae',
  valetParking: 'Ample dedicated customer parking in front of Al Marsoumy Building',
  instagram: 'https://instagram.com',
  languages: ['English', 'Arabic', 'Hindi', 'Urdu', 'Bengali'],
};

export const CATEGORIES: ServiceCategory[] = [
  {
    id: 'hair-cuts',
    name: 'Executive Haircuts & Fades',
    tagline: 'Precision Fades, Classic Scissor Cuts & Modern Men’s Styling',
    description: 'Master barbers crafting crisp skin fades, textured crops, classic gentlemen cuts, and personalized beard-matching contours.',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'beard-shave',
    name: 'Royal Beard Sculpting & Shave',
    tagline: 'Hot Towel Steaming, Razor Line-ups & Nourishing Elixirs',
    description: 'Traditional straight razor shaves, sharp cheek and neck edge detailing, and deep beard softening treatments.',
    image: beardSculptingImg,
  },
  {
    id: 'hair-treatments',
    name: 'Hair Treatments & Keratin',
    tagline: 'Nanoplastia Smoothing, Hair Botox & Scalp Detox Spa',
    description: 'Advanced men’s hair repair treatments designed to eliminate frizz, restore strength, and combat Dubai climate damage.',
    image: hairRitualImg,
  },
  {
    id: 'facials-skin',
    name: 'Men’s Facial & Skin Grooming',
    tagline: 'Charcoal Deep Detox, Hydra-Cleanse & 24K Gold Masks',
    description: 'Specialized aesthetic skincare protocols designed specifically for men’s skin texture, blackhead removal, and sun defense.',
    image: facialScrubImg,
  },
  {
    id: 'manicure-pedicure',
    name: 'Executive Mani-Pedi for Men',
    tagline: 'Medical Foot Spa, Callus Smoothing & Clean Nail Architecture',
    description: 'Clean, hygienic hand and foot care tailored for gentlemen, removing calluses and relieving deep foot exhaustion.',
    image: luxuryPedicureImg,
  },
  {
    id: 'massage-waxing',
    name: 'Massage, Waxing & Threading',
    tagline: 'Deep Tissue Relief, Neck Acupressure & Crisp Threading',
    description: 'Revitalizing tension-release massages, painless nose & ear waxing, and crisp facial eyebrow threading.',
    image: headMassageImg,
  },
  {
    id: 'groom-packages',
    name: 'VIP & Grooming Combos',
    tagline: 'Wedding Packages, Executive Makeovers & Complete Resets',
    description: 'Comprehensive head-to-toe grooming packages for special events, business executives, and grooms.',
    image: charcoalMaskImg,
  },
];

export const SERVICES: Service[] = [
  // Haircuts & Fades
  {
    id: 'executive-master-haircut',
    slug: 'executive-master-haircut',
    name: 'Executive Master Haircut & Thermal Style',
    category: 'hair-cuts',
    categoryName: 'Executive Haircuts & Fades',
    priceAED: 45,
    durationMinutes: 40,
    shortDescription: 'Precision haircut customized to your face shape, followed by hair wash, scalp massage, and premium matte styling.',
    fullDescription: 'Our signature cut delivered by experienced master barbers. Includes an initial hair density consultation, precision scissor or clipper work, invigorating shampoo wash, tension-relieving scalp massage, and custom finishing with imported pomades or matte clays.',
    featured: true,
    benefits: [
      'Tailored architectural shape that grows out evenly and gracefully',
      'Includes invigorating hair wash and scalp pressure massage',
      'Finished with professional matte clay, wax, or sea salt spray',
      'Clean neck razor line-up and aftershave splash'
    ],
    ritualSteps: [
      'Face shape, hairline, and hair density consultation',
      'Precision sectioning and scissor / clipper cutting',
      'Purifying shampoo wash & mint scalp stimulation',
      'Blow-dry architecture and premium product styling'
    ],
    productsUsed: ['Uppercut Deluxe', 'Reuzel Matte Clay', 'American Crew Fiber', 'Morgan’s Pomade UK'],
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'skin-fade-razor-edge',
    slug: 'skin-fade-razor-edge',
    name: 'Precision Skin Fade & Straight Razor Line-Up',
    category: 'hair-cuts',
    categoryName: 'Executive Haircuts & Fades',
    priceAED: 55,
    durationMinutes: 45,
    shortDescription: 'Seamless zero or foil skin fade with ultra-crisp straight razor hairline detailing and cooling splash.',
    fullDescription: 'A masterclass in technical fading. Our master barbers execute a flawless gradient from bare skin (zero/foil shaver) into your chosen top length, framed with surgical razor sharp edges around the forehead, temples, and neck.',
    featured: true,
    benefits: [
      'Seamless gradient blending with zero harsh weight lines',
      'Foil shaver finish for long-lasting ultra-close smoothness',
      'Crisp straight razor perimeter detailing with warm lather'
    ],
    ritualSteps: [
      'Fade level consultation (Low, Mid, High, or Drop Fade)',
      'Bulk removal and progressive clipper guard blending',
      'Foil shaver detailing at the base',
      'Straight razor perimeter line-up and cooling antiseptic splash'
    ],
    productsUsed: ['Wahl Professional 5-Star', 'Andis ProFoil', 'Proraso Menthol Aftershave'],
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'classic-gentleman-cut',
    slug: 'classic-gentleman-cut',
    name: 'Classic Gentleman Scissor Cut & Head Wash',
    category: 'hair-cuts',
    categoryName: 'Executive Haircuts & Fades',
    priceAED: 40,
    durationMinutes: 35,
    shortDescription: 'Traditional shear-over-comb classic haircut with soft tapered edges and refreshing hair wash.',
    fullDescription: 'Perfect for business professionals desiring a sophisticated, timeless silhouette. Crafted predominantly with shears and combs to maintain natural texture and effortless styling at home.',
    featured: false,
    benefits: [
      'Natural flowing texture suited for executive environments',
      'Gentle shear work preserves hair thickness',
      'Includes botanical shampoo and conditioning wash'
    ],
    ritualSteps: [
      'Texture and parting analysis',
      'Hand-crafted shear cutting and perimeter tapering',
      'Head wash with invigorating tea tree shampoo',
      'Classic blow dry and light grooming cream'
    ],
    productsUsed: ['Tea Tree Special Shampoo', 'Layrite Grooming Cream'],
    image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'junior-gentleman-cut',
    slug: 'junior-gentleman-cut',
    name: 'Junior Gentleman / Kids Haircut',
    category: 'hair-cuts',
    categoryName: 'Executive Haircuts & Fades',
    priceAED: 35,
    durationMinutes: 30,
    shortDescription: 'Patient, attentive, stylish haircuts for young gentlemen and boys up to 12 years old.',
    fullDescription: 'Our barbers ensure a comfortable, welcoming experience for children with stylish, easy-to-manage haircuts tailored to their preferences.',
    featured: false,
    benefits: [
      'Friendly, patient barbers experienced with kids',
      'Trendy or school-friendly styles',
      'Quick and stress-free service'
    ],
    ritualSteps: [
      'Child and parent consultation',
      'Gentle scissor and low-noise clipper styling',
      'Light styling product finish'
    ],
    productsUsed: ['Child-safe organic styling paste'],
    image: 'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'royal-head-shave',
    slug: 'royal-head-shave',
    name: 'Royal Razor Head Shave & Scalp Polish',
    category: 'hair-cuts',
    categoryName: 'Executive Haircuts & Fades',
    priceAED: 40,
    durationMinutes: 35,
    shortDescription: 'Hot towel prep, rich warm lather, straight razor zero shave, and cooling scalp moisturizing treatment.',
    fullDescription: 'The smoothest shave possible. Warm botanical towels soften the scalp before our master barber glides a fresh single-use straight razor across the scalp with the grain and across. Finished with cold compress and hydrating balm.',
    featured: false,
    benefits: [
      'Silky smooth results with zero razor burn or stubble',
      'Warm towel and cold towel therapy stimulates scalp blood flow',
      'Protective SPF scalp hydration balm finish'
    ],
    ritualSteps: [
      'Hot towel steam wrap with eucalyptus oils',
      'Warm lather brush application',
      'Straight razor precision scalp shave',
      'Cold towel compress and calming balm massage'
    ],
    productsUsed: ['Proraso Sandalwood Shaving Cream', 'Nivea Men Sensitive Post Shave Balm'],
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&auto=format&fit=crop&q=80'
  },

  // Beard Grooming & Shave
  {
    id: 'royal-hot-towel-beard-trim',
    slug: 'royal-hot-towel-beard-trim',
    name: 'Royal Hot Towel Beard Sculpting & Razor Edge',
    category: 'beard-shave',
    categoryName: 'Royal Beard Sculpting & Shave',
    priceAED: 35,
    durationMinutes: 30,
    shortDescription: 'Beard trimming, clipper sculpting, steam towel wrap, razor cheek & neck lines, and premium beard oil.',
    fullDescription: 'Sculpt your facial hair into sharp symmetry. Our barbers balance your beard profile with your jawline structure, apply relaxing hot towels, carve ultra-sharp lines with a straight razor, and condition with organic argan & cedarwood beard oil.',
    featured: true,
    benefits: [
      'Enhances jawline definition and fills visual symmetry',
      'Hot towel opens pores and prevents razor bumps / ingrown hairs',
      'Nourishing beard oil eliminates beard itch and dry skin'
    ],
    ritualSteps: [
      'Beard length and silhouette consultation',
      'Freehand clipper sculpting and weight de-bulking',
      'Aromatherapy hot towel steam infusion',
      'Straight razor cheek and neckline crisp edge work',
      'Beard oil brushing and shaping balm finish'
    ],
    productsUsed: ['Captain Fawcett Beard Oil', 'Clubman Pinaud Shave Butter', 'Proraso Beard Balm'],
    image: beardSculptingImg
  },
  {
    id: 'classic-straight-razor-shave',
    slug: 'classic-straight-razor-shave',
    name: 'Traditional Straight Razor Clean Shave',
    category: 'beard-shave',
    categoryName: 'Royal Beard Sculpting & Shave',
    priceAED: 30,
    durationMinutes: 30,
    shortDescription: 'The quintessential barbershop experience with hot towels, badger brush lather, precision blade, and cold wrap.',
    fullDescription: 'Relax in our vintage leather barber chair while warm towels soften your whiskers. Enjoy a traditional badger hair brush lathering, followed by a close, comfortable straight razor shave and cooling post-shave balm.',
    featured: false,
    benefits: [
      'Closest possible shave without redness or irritation',
      'Dual hot and cold towel thermal therapy',
      'Restores clear, fresh facial complexion'
    ],
    ritualSteps: [
      'Pre-shave essential oil application',
      'Hot steaming towel compress',
      'Rich warm foam application with brush',
      'Single-blade straight razor shave',
      'Cold towel pore sealing and aftershave splash'
    ],
    productsUsed: ['Proraso Pre-Shave Cream', 'Taylor of Old Bond Street Sandalwood'],
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'royal-beard-spa-conditioning',
    slug: 'royal-beard-spa-conditioning',
    name: 'Executive Beard Spa & Deep Conditioning Ritual',
    category: 'beard-shave',
    categoryName: 'Royal Beard Sculpting & Shave',
    priceAED: 60,
    durationMinutes: 45,
    shortDescription: 'Deep beard shampoo wash, facial steam, intensive keratin beard mask, shaping, and high-gloss conditioning.',
    fullDescription: 'The ultimate luxury service for medium to long beards. Cleanses trapped pollutants, softens coarse beard hair with hot ozone steam, infuses deep keratin proteins, and finishes with precision shaping and detailing.',
    featured: true,
    benefits: [
      'Transforms coarse, prickly beard hair into touchable softness',
      'Exfoliates dry skin beneath the beard to prevent beard dandruff',
      'Deep steam hydration stimulates healthy follicle density'
    ],
    ritualSteps: [
      'Deep clarifying beard wash & exfoliation',
      'Facial ozone steam softens beard bristles',
      'Intensive protein and argan oil beard mask',
      'Precision trimming, line-up, and butter seal'
    ],
    productsUsed: ['Murdock London Beard Care', 'Percy Nobleman Beard Conditioning Mask'],
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'beard-color-camouflage',
    slug: 'beard-color-camouflage',
    name: 'Beard Color Camouflage & Grey Blending',
    category: 'beard-shave',
    categoryName: 'Royal Beard Sculpting & Shave',
    priceAED: 45,
    durationMinutes: 25,
    shortDescription: 'Subtle, natural ammonia-free beard tinting to conceal grey hair and provide a denser, sharper look.',
    fullDescription: 'Custom-mixed shade matching your natural hair color. Delivers a natural, non-artificial finish that gently blends grey hairs and gives your beard a fuller, sharper silhouette in just 15 minutes.',
    featured: false,
    benefits: [
      'Natural seamless color match without artificial shoe-polish look',
      'Quick 15-minute processing time',
      'Gentle ammonia-free formula safe for sensitive facial skin'
    ],
    ritualSteps: [
      'Color tone matching consultation',
      'Targeted beard color application',
      'Gentle rinse and conditioning wash',
      'Beard oil application'
    ],
    productsUsed: ['Just For Men Control GX', 'L’Oréal Men Expert BarberClub Color'],
    image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&auto=format&fit=crop&q=80'
  },

  // Hair Treatments & Keratin
  {
    id: 'nanoplastia-keratin-smoothing',
    slug: 'nanoplastia-keratin-smoothing',
    name: 'Nanoplastia & Keratin Hair Smoothing for Men',
    category: 'hair-treatments',
    categoryName: 'Hair Treatments & Keratin',
    priceAED: 250,
    durationMinutes: 90,
    shortDescription: 'Formaldehyde-free organic straightening that tames stubborn curly hair, eliminates frizz, and adds silky manageability.',
    fullDescription: 'Engineered specifically for Dubai’s humidity. Our 100% formaldehyde-free Nanoplastia formula infuses amino acids and liquid keratin deep into the hair cortex, straightening unmanageable waves and leaving hair smooth and easy to style for 3 to 4 months.',
    featured: true,
    benefits: [
      'Eliminates morning styling hassle and unruly humidity frizz',
      'Formaldehyde-free and odor-free formula',
      'Lasts up to 4 months with natural regrowth'
    ],
    ritualSteps: [
      'Clarifying hair wash to open hair cuticles',
      'Section-by-section Nanoplastia infusion',
      'Thermal sealing with titanium flat irons',
      'Hydrating rinse and blow-dry styling'
    ],
    productsUsed: ['Nanoplastia Brazilian Silk', 'GK Hair Keratin Global'],
    image: hairRitualImg
  },
  {
    id: 'hair-botox-protein-therapy',
    slug: 'hair-botox-protein-therapy',
    name: 'Hair Botox & Intensive Protein Repair',
    category: 'hair-treatments',
    categoryName: 'Hair Treatments & Keratin',
    priceAED: 180,
    durationMinutes: 60,
    shortDescription: 'Deep conditioning and strand replumping treatment for dry, heat-damaged, or chemically treated hair.',
    fullDescription: 'Fills structural gaps in weak hair strands with collagen, hyaluronic acid, and silk proteins. Restores natural elasticity, shine, and fullness without stripping natural curl pattern.',
    featured: false,
    benefits: [
      'Repairs split ends and brittle texture from sun and hard water',
      'Adds mirror-like natural shine and volume',
      'Safe for colored or highlighted hair'
    ],
    ritualSteps: [
      'Deep cleansing wash',
      'Botox protein serum application under steam cap',
      'Cool rinse and thermal blowout'
    ],
    productsUsed: ['Inoar Hair Botox', 'Kérastase Homme Genesis'],
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'scalp-detox-anti-dandruff',
    slug: 'scalp-detox-anti-dandruff',
    name: 'Anti-Dandruff & Scalp Detox Spa Ritual',
    category: 'hair-treatments',
    categoryName: 'Hair Treatments & Keratin',
    priceAED: 90,
    durationMinutes: 45,
    shortDescription: 'Deep micro-exfoliation, high-frequency ozone therapy, mint scalp massage, and anti-dandruff serum.',
    fullDescription: 'A facial for your scalp. Removes stubborn dandruff flakes, dead skin, and mineral build-up from hard water. Stimulates hair follicle microcirculation with high-frequency ozone treatment and organic tea tree oil.',
    featured: true,
    benefits: [
      'Instantly relieves scalp itching, flaking, and excess oiliness',
      'Unclogs hair follicles to promote thicker hair growth',
      'Refreshing cool menthol sensation that lasts all day'
    ],
    ritualSteps: [
      'Scalp analysis diagnostic',
      'Volcanic clay exfoliating scalp scrub',
      'Ozone steam & high-frequency wand stimulation',
      'Cool water rinse and anti-dandruff peptide tonic'
    ],
    productsUsed: ['Nioxin Scalp Recovery', 'Davines Purifying Scalp System'],
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&auto=format&fit=crop&q=80'
  },

  // Men's Facials & Skincare
  {
    id: 'charcoal-deep-detox-facial',
    slug: 'charcoal-deep-detox-facial',
    name: 'Charcoal Deep Detox & Blackhead Extraction Facial',
    category: 'facials-skin',
    categoryName: 'Men’s Facial & Skin Grooming',
    priceAED: 120,
    durationMinutes: 50,
    shortDescription: 'Pore opening steam, ultrasonic blackhead extraction, volcanic scrub, and activated charcoal peel-off mask.',
    fullDescription: 'Our most requested men’s skincare service. Utilizes deep facial steam to open congested pores, ultrasonic skin scrubbers for painless blackhead removal on the nose and forehead, and an activated charcoal mask to draw out environmental toxins.',
    featured: true,
    benefits: [
      'Completely clears congested pores and blackheads on nose/chin',
      'Controls excess shine and reduces visible pore size',
      'Leaves facial skin refreshed, smooth, and noticeably cleaner'
    ],
    ritualSteps: [
      'Purifying botanical facial cleanse',
      'Warm herbal steam and dead skin scrub',
      'Ultrasonic vacuum blackhead extractions',
      'Activated charcoal peel mask & icy toner mist',
      'Oil-free mattifying hydration barrier'
    ],
    productsUsed: ['Dermalogica Active Clay Cleanser', 'Clinique For Men Charcoal Face Scrub'],
    image: charcoalMaskImg
  },
  {
    id: '24k-gold-royal-facial',
    slug: '24k-gold-royal-facial',
    name: '24K Gold Royal Radiance Facial for Men',
    category: 'facials-skin',
    categoryName: 'Men’s Facial & Skin Grooming',
    priceAED: 180,
    durationMinutes: 60,
    shortDescription: 'Luxury anti-aging facial with pure 24K gold foil mask, micro-current lifting, and collagen hydration.',
    fullDescription: 'The ultimate executive rejuvenation treatment before weddings and important events. Real 24K gold particles boost blood circulation and cellular renewal while facial massage reduces puffiness under eyes and firms jawline contours.',
    featured: true,
    benefits: [
      'Instant bright radiance with zero redness or downtime',
      'Lifts tired facial muscles and reduces dark under-eye circles',
      'Deep peptide and collagen replenishment'
    ],
    ritualSteps: [
      'Double cleanse & diamond micro-exfoliation',
      'Facial lymph drainage and contour massage',
      '24K gold sheet mask application',
      'Cold cryo-globe tightening and peptide sunscreen'
    ],
    productsUsed: ['Peter Thomas Roth 24K Gold Mask', 'Tom Ford Men Skin Rejuvenator'],
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'hydra-glow-refresh-facial',
    slug: 'hydra-glow-refresh-facial',
    name: 'Hydra-Glow Instant Refresh Facial',
    category: 'facials-skin',
    categoryName: 'Men’s Facial & Skin Grooming',
    priceAED: 150,
    durationMinutes: 45,
    shortDescription: 'Hydro-dermabrasion deep pore suction, oxygen infusion, and cooling hyaluronic soothing mask.',
    fullDescription: 'Non-invasive vortex technology cleanses, extracts, and hydrates simultaneously. Saturates skin with hyaluronic acid and antioxidants to counteract sun exposure and air conditioning dehydration.',
    featured: false,
    benefits: [
      'Deeply hydrates thirsty skin and smooths fine texture lines',
      'Immediate glow suitable before photoshoots and events',
      'Soothes shaving irritation and razor sensitivity'
    ],
    ritualSteps: [
      'Hydro-dermabrasion cleansing suction',
      'Oxygen spray infusion with botanical peptides',
      'Soothing aloe vera & hyaluronic sheet mask',
      'Hydrating moisturizer and eye cream'
    ],
    productsUsed: ['SkinCeuticals Phyto Corrective', 'Kiehl’s Facial Fuel'],
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80'
  },

  // Executive Manicure & Pedicure for Men
  {
    id: 'royal-men-pedicure',
    slug: 'royal-men-pedicure',
    name: 'Royal Men’s Medical Pedicure & Foot Spa',
    category: 'manicure-pedicure',
    categoryName: 'Executive Mani-Pedi for Men',
    priceAED: 85,
    durationMinutes: 50,
    shortDescription: 'Warm magnesium foot soak, callus smoothing, nail shaping, cuticle care, and lower leg massage.',
    fullDescription: 'Designed for men who stand, run, or work on their feet. Softens rough heel calluses without harsh blades, trims toenails correctly to prevent ingrowns, cleans cuticles, and revitalizes calves with a deep pressure massage.',
    featured: true,
    benefits: [
      'Smooths cracked heels and rough calluses completely',
      'Prevents painful ingrown toenails with correct trimming',
      'Relieves heavy foot and calf fatigue with reflexology massage'
    ],
    ritualSteps: [
      'Aromatic sea salt and eucalyptus warm foot soak',
      'E-file podiatry heel buffing and callus smoothing',
      'Nail clipping, filing, and cuticle detailing',
      'Invigorating peppermint foot scrub',
      'Lower leg & foot tension relief massage'
    ],
    productsUsed: ['Footlogix Professional Callus Softener', 'Gehwol Men Herbal Balm'],
    image: luxuryPedicureImg
  },
  {
    id: 'executive-men-manicure',
    slug: 'executive-men-manicure',
    name: 'Executive Gentleman’s Hand & Nail Manicure',
    category: 'manicure-pedicure',
    categoryName: 'Executive Mani-Pedi for Men',
    priceAED: 55,
    durationMinutes: 35,
    shortDescription: 'Precision nail trimming, shaping, dry cuticle detailing, matte nail buffing, and hand massage.',
    fullDescription: 'Clean hands make a powerful business impression. We trim and shape fingernails, remove overgrown dry cuticles, buff the nail plate to a natural clean matte sheen, and finish with a relaxing hand and forearm massage.',
    featured: false,
    benefits: [
      'Immaculate, professional hand appearance for meetings and handshakes',
      'Eliminates painful hangnails and ragged cuticles',
      'Nourishing shea butter hand and wrist massage'
    ],
    ritualSteps: [
      'Hand sanitize and nail length consultation',
      'Precision trimming, filing, and e-file cuticle care',
      'Natural nail plate buffing (matte or satin finish)',
      'Hydrating hand and wrist massage'
    ],
    productsUsed: ['Margaret Dabbs London', 'OPI ProSpa Exfoliating Hand Polish'],
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80'
  },

  // Men's Massage, Waxing & Threading
  {
    id: 'deep-tissue-back-massage',
    slug: 'deep-tissue-back-massage',
    name: 'Deep Tissue Back & Shoulder Tension Relief',
    category: 'massage-waxing',
    categoryName: 'Massage, Waxing & Threading',
    priceAED: 120,
    durationMinutes: 45,
    shortDescription: 'Targeted deep pressure massage to release chronic stiffness in neck, shoulder blades, and lower back.',
    fullDescription: 'Ideal for desk workers and gym enthusiasts. Uses firm pressure techniques and warm botanical massage oils to release muscle knots, increase range of motion, and melt away daily tension.',
    featured: true,
    benefits: [
      'Dissolves stubborn knots in upper back, traps, and neck',
      'Improves posture and relieves computer fatigue',
      'Warm herbal compress application at conclusion'
    ],
    ritualSteps: [
      'Tension zone assessment',
      'Warm herbal oil application',
      'Deep thumb and forearm pressure point work',
      'Warm towel wipe down and cooling herbal rub'
    ],
    productsUsed: ['Organic Arnica & Eucalyptus Massage Oil'],
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'indian-head-neck-massage',
    slug: 'indian-head-neck-massage',
    name: 'Traditional Head, Neck & Scalp Acupressure',
    category: 'massage-waxing',
    categoryName: 'Massage, Waxing & Threading',
    priceAED: 50,
    durationMinutes: 25,
    shortDescription: 'Champing acupressure massage with warm almond oil to relieve headache, stress, and eye strain.',
    fullDescription: 'A classic relaxation ritual. Focuses on the acupressure points across the scalp, temples, neck, and shoulders to stimulate blood circulation and promote mental relaxation.',
    featured: false,
    benefits: [
      'Instantly clears mental brain fog and stress',
      'Stimulates blood supply to hair roots',
      'Can be added during any haircut or shave'
    ],
    ritualSteps: [
      'Warm almond or coconut oil scalp drip',
      'Rhythmic acupressure and scalp mobilization',
      'Neck and shoulder friction massage',
      'Warm towel compress'
    ],
    productsUsed: ['Pure Sweet Almond Oil', 'KTC Brahmi Scalp Oil'],
    image: headMassageImg
  },
  {
    id: 'face-threading-eyebrow-sculpt',
    slug: 'face-threading-eyebrow-sculpt',
    name: 'Full Face Threading & Eyebrow Detailing',
    category: 'massage-waxing',
    categoryName: 'Massage, Waxing & Threading',
    priceAED: 35,
    durationMinutes: 20,
    shortDescription: 'Crisp masculine eyebrow clean-up, forehead, cheekbones, and ear edge thread detailing.',
    fullDescription: 'Removes fine stray hairs from the unibrow, cheekbones, forehead, and earlobes with organic antibacterial cotton thread, leaving sharp, clean masculine facial borders.',
    featured: false,
    benefits: [
      'Creates clean eyebrow separation while keeping natural masculine shape',
      'Removes fuzz and stray cheek hairs cleanly',
      'Gentle aloe vera soothing gel applied after'
    ],
    ritualSteps: [
      'Eyebrow symmetry mapping',
      'Precision cotton thread removal',
      'Soothing witch hazel and aloe vera application'
    ],
    productsUsed: ['Organic 100% Cotton Thread', 'Holika Holika Aloe Gel'],
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'nose-ear-waxing',
    slug: 'nose-ear-waxing',
    name: 'Nose & Ear Waxing Hygiene Clean',
    category: 'massage-waxing',
    categoryName: 'Massage, Waxing & Threading',
    priceAED: 25,
    durationMinutes: 15,
    shortDescription: 'Quick, virtually painless hard wax removal of visible nose and ear hair lasting up to 4 weeks.',
    fullDescription: 'Uses low-temperature stripless hard wax specially formulated for sensitive nostrils and ear canals. Clears unsightly hairs in seconds with long-lasting cleanliness.',
    featured: false,
    benefits: [
      'Lasts significantly longer than trimmer clipping (3-4 weeks)',
      'Removes hair from the root with minimal discomfort',
      'Clean hygienic finish'
    ],
    ritualSteps: [
      'Antiseptic cleansing',
      'Hard wax application on safety applicator sticks',
      'Swift removal and soothing balm'
    ],
    productsUsed: ['Perron Rigot Cirépil Hard Wax'],
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&auto=format&fit=crop&q=80'
  },

  // VIP Grooming Packages
  {
    id: 'royal-groom-vip-wedding-package',
    slug: 'royal-groom-vip-wedding-package',
    name: 'The Royal Groom & VIP Wedding Package',
    category: 'groom-packages',
    categoryName: 'VIP & Grooming Combos',
    priceAED: 380,
    durationMinutes: 180,
    shortDescription: 'Full VIP head-to-toe makeover: Master Haircut, Royal Shave, 24K Gold Facial, Mani-Pedi, and Head Massage.',
    fullDescription: 'The ultimate royal treatment for grooms, dignitaries, and men preparing for major celebrations. Includes our top-tier master haircut, precision beard styling with hot towels, 24K gold radiance facial, medical mani-pedi duo, tension-relieving head massage, and Turkish coffee service.',
    featured: true,
    benefits: [
      'Complete head-to-toe transformation for wedding photos and events',
      'Exclusive priority chair and dedicated senior master barber',
      'Complimentary refreshments, styling consultation, and take-home beard oil'
    ],
    ritualSteps: [
      'VIP consultation & welcome beverage',
      'Master Precision Haircut & Beard Sculpting with Hot Towels',
      '24K Gold Royal Radiance Facial with blackhead removal',
      'Executive Hand & Foot Spa Mani-Pedi',
      'Traditional Head, Neck & Shoulder Massage',
      'Thermal blowout & luxury fragrance finish'
    ],
    productsUsed: ['Uppercut Deluxe', 'Peter Thomas Roth 24K Gold', 'Footlogix', 'Proraso'],
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'executive-complete-makeover',
    slug: 'executive-complete-makeover',
    name: 'The Executive Complete Makeover Combo',
    category: 'groom-packages',
    categoryName: 'VIP & Grooming Combos',
    priceAED: 190,
    durationMinutes: 90,
    shortDescription: 'Master Fade Haircut + Royal Beard Shave + Charcoal Detox Facial + Head Massage.',
    fullDescription: 'Our most popular comprehensive package. Covers all core essentials for an executive reset: haircut, beard sculpting, deep blackhead extraction facial, and relaxing scalp massage.',
    featured: true,
    benefits: [
      'Best value all-in-one grooming combo',
      'Saves over AED 50 compared to individual services',
      'Leaves hair, beard, and skin pristine in under 90 minutes'
    ],
    ritualSteps: [
      'Master Precision Haircut with hair wash',
      'Royal Hot Towel Beard Trim & Straight Razor Line-up',
      'Charcoal Deep Detox Facial & blackhead peel',
      'Relaxing Head & Neck Acupressure Massage'
    ],
    productsUsed: ['Uppercut Deluxe', 'Dermalogica', 'Proraso Sandalwood'],
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&auto=format&fit=crop&q=80'
  }
];

export const SPECIAL_OFFERS: SpecialOffer[] = [
  {
    id: 'executive-gentleman-duo',
    slug: 'executive-gentleman-duo',
    title: 'The Executive Reset Duo',
    subtitle: 'Master Haircut + Royal Hot Towel Beard Sculpting',
    description: 'The definitive grooming pairing for crisp hair and immaculate beard definition.',
    originalPriceAED: 80,
    offerPriceAED: 65,
    validUntil: 'Available This Month',
    durationMinutes: 65,
    inclusions: [
      'Precision Master Haircut with Scissor / Clipper Styling',
      'Shampoo Hair Wash with Mint Scalp Stimulation',
      'Hot Towel Beard Trimming & Straight Razor Cheek Lines',
      'Organic Beard Oil & Matte Clay Styling'
    ],
    tag: 'Most Popular',
    image: beardSculptingImg
  },
  {
    id: 'royal-makeover-trio',
    slug: 'royal-makeover-trio',
    title: 'The Weekend Gentleman Package',
    subtitle: 'Haircut + Beard Styling + Charcoal Detox Facial',
    description: 'Look razor sharp for the weekend with fresh hair, sculpted beard, and glowing skin.',
    originalPriceAED: 200,
    offerPriceAED: 160,
    validUntil: 'Friday – Sunday Special',
    durationMinutes: 100,
    inclusions: [
      'Executive Master Haircut & Thermal Style',
      'Royal Hot Towel Beard Sculpt & Razor Line-up',
      'Charcoal Deep Detox Facial with Blackhead Extraction',
      'Complimentary Scalp Acupressure Massage'
    ],
    tag: 'Weekend Special',
    image: charcoalMaskImg
  },
  {
    id: 'head-to-toe-gent-spa',
    slug: 'head-to-toe-gent-spa',
    title: 'Executive Head-to-Toe Spa Combo',
    subtitle: 'Haircut + Beard Shave + Royal Pedicure + Manicure',
    description: 'Complete hands, feet, beard, and hair restoration in one relaxed session.',
    originalPriceAED: 220,
    offerPriceAED: 175,
    validUntil: 'Limited Availability',
    durationMinutes: 120,
    inclusions: [
      'Master Haircut with Mint Scalp Wash',
      'Royal Hot Towel Beard Line-Up',
      'Medical Foot Spa & Callus Removal Pedicure',
      'Executive Hand & Nail Grooming Manicure'
    ],
    tag: 'Full Pampering',
    image: luxuryPedicureImg
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Tariq Al Mansoori',
    rating: 5,
    date: '3 days ago',
    text: 'Afroza Gents Salon is easily the best barbershop in International City Phase 2. The skin fade is razor sharp and the hot towel beard sculpting is top notch. Very clean salon, friendly barbers, and open until midnight which is super convenient.',
    serviceMentioned: 'Precision Skin Fade & Royal Beard Trim',
    isGoogleVerified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 'rev-2',
    author: 'Ahmed Raza',
    rating: 5,
    date: '1 week ago',
    text: 'Been coming to Afroza Gents Salon in Warsan 4 for months now. The barbers take their time and really understand face shapes and beard symmetry. Tried the charcoal detox facial last week and my skin felt amazing. Highly recommend to everyone in Dubai!',
    serviceMentioned: 'Charcoal Deep Detox Facial & Haircut',
    isGoogleVerified: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 'rev-3',
    author: 'David Mitchell',
    rating: 5,
    date: '2 weeks ago',
    text: 'Great experience! Excellent scissor cut, straight razor edges, and the head massage relieved all my work stress. Very clean tools, hygienic setup, and plenty of parking right outside Al Marsoumy Building.',
    serviceMentioned: 'Classic Gentleman Cut & Scalp Massage',
    isGoogleVerified: true,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 'rev-4',
    author: 'Mohammed Al Kaabi',
    rating: 5,
    date: '3 weeks ago',
    text: 'Booked the Royal Groom package before my engagement party. My hair, beard, facial, and nails were done to perfection. The team made me look and feel like a king. Unbeatable quality in International City.',
    serviceMentioned: 'The Royal Groom & VIP Wedding Package',
    isGoogleVerified: true,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 'rev-5',
    author: 'Bilal Khan',
    rating: 5,
    date: '1 month ago',
    text: 'Keratin smoothing and beard shaping done perfectly. No harsh smells and hair stays smooth even with the humidity. Best gents salon in the Warsan / International City area.',
    serviceMentioned: 'Nanoplastia Keratin & Beard Sculpting',
    isGoogleVerified: true,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Afroza Gents Salon Barbershop Interior',
    category: 'interior',
    categoryLabel: 'Salon Interior',
    image: beardSculptingImg,
    caption: 'Modern luxury barber stations, premium leather chairs, and sterile hygienic grooming tools.'
  },
  {
    id: 'g-2',
    title: 'Precision Mid Skin Fade & Textured Crop',
    category: 'hair',
    categoryLabel: 'Haircuts & Fades',
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=1000&auto=format&fit=crop&q=85',
    caption: 'Seamless zero gradient fade with razor-sharp temple lines and matte texture styling.'
  },
  {
    id: 'g-3',
    title: 'Royal Hot Towel Beard Sculpting',
    category: 'beard',
    categoryLabel: 'Beard Grooming',
    image: beardSculptingImg,
    caption: 'Aromatherapy hot towel steam wrap, razor cheek line-up, and organic sandalwood beard oil.'
  },
  {
    id: 'g-4',
    title: 'Hot Towel Steaming & Men’s Facial Care',
    category: 'treatments',
    categoryLabel: 'Facial Skincare',
    image: facialScrubImg,
    caption: 'Ultrasonic blackhead extractions and hot herbal towel detox facial for gentlemen.'
  },
  {
    id: 'g-5',
    title: 'Executive Grooming & Nail Station',
    category: 'spa',
    categoryLabel: 'Mani-Pedi Spa',
    image: luxuryPedicureImg,
    caption: 'Hygienic foot bath, callus removal, and revitalizing lower calf pressure massage.'
  },
  {
    id: 'g-6',
    title: 'Charcoal Deep Detox Facial & Mask',
    category: 'treatments',
    categoryLabel: 'Detox Facial',
    image: charcoalMaskImg,
    caption: 'Active charcoal detox clay peel-off mask and pore purification treatment.'
  },
  {
    id: 'g-7',
    title: 'Therapeutic Scalp & Head Acupressure',
    category: 'spa',
    categoryLabel: 'Head Spa',
    image: headMassageImg,
    caption: 'Tension-relieving scalp acupressure massage and essential oil treatment.'
  },
  {
    id: 'g-8',
    title: 'Nanoplastia Keratin & Hair Repair',
    category: 'hair',
    categoryLabel: 'Hair Treatments',
    image: hairRitualImg,
    caption: 'Formaldehyde-free smoothing and deep strand reconstruction for men’s hair.'
  }
];

export const STYLISTS: Stylist[] = [
  {
    id: 'st-1',
    name: 'Master Tariq',
    role: 'Senior Master Barber & Fade Specialist',
    specialty: 'Skin Fades, Textured Crops & Razor Architecture',
    experienceYears: 12,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'st-2',
    name: 'Ustad Rashid',
    role: 'Royal Shave & Beard Artisan',
    specialty: 'Hot Towel Straight Razor Shaves & Beard Symmetry',
    experienceYears: 14,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'st-3',
    name: 'Hamza Alvi',
    role: 'Gents Aesthetician & Keratin Specialist',
    specialty: 'Charcoal Detox Facials & Nanoplastia Straightening',
    experienceYears: 9,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&auto=format&fit=crop&q=80'
  }
];

export const FAQS: FaqItem[] = [
  {
    question: 'Where is Afroza Gents Salon located in Dubai?',
    answer: 'Afroza Gents Salon is located in International City Phase 2 (Warsan 4), Dubai, at Shop 8 on the Ground Floor of Al Marsoumy Building, 43 Street. We have ample customer parking right in front of the building.',
    category: 'Location'
  },
  {
    question: 'What are the salon opening hours?',
    answer: 'We are open 7 days a week from 10:00 AM to 12:00 AM (Midnight), making it effortless to visit after work or late in the evening.',
    category: 'Hours'
  },
  {
    question: 'Do I need an appointment or do you accept walk-ins?',
    answer: 'We welcome both walk-ins and scheduled appointments. For peak evening hours and VIP grooming packages, we recommend booking in advance via our website or instant WhatsApp (+971 56 717 9467).',
    category: 'Appointments'
  },
  {
    question: 'What hygiene and sterilization standards do you maintain?',
    answer: 'We enforce hospital-grade sanitation protocols. All clippers, shears, and razor handles are UV and Barbicide sterilized between every single client, and we use single-use disposable straight razor blades for every shave.',
    category: 'Hygiene'
  },
  {
    question: 'What men’s facial and skin treatments do you provide?',
    answer: 'We provide deep pore charcoal detox facials, ultrasonic blackhead extractions, 24K gold royal radiance facials, hydra-glow skin refreshes, and anti-dandruff scalp detox treatments tailored specifically for men.',
    category: 'Skincare'
  },
  {
    question: 'Do you offer wedding and groom grooming packages?',
    answer: 'Yes! Our Royal Groom & VIP Wedding Package includes haircut, royal beard shaping, 24K gold facial, mani-pedi, and head massage to ensure you look immaculate on your big day.',
    category: 'Groom & VIP'
  }
];
