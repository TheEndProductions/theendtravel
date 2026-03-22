export type KickstarterPhase = 'pre-launch' | 'active' | 'post-campaign';

export const KICKSTARTER_CONFIG = {
  phase: 'pre-launch' as KickstarterPhase,
  campaignUrl: 'https://kickstarter.com/projects/theendproductions/endless-backpack',
  launchDate: '2026-06-01T00:00:00Z',
  fundingPercent: 0,
  fundingGoal: 50000,
  fundingCurrent: 0,
  backersCount: 0,
};

export const ENDLESS_PIECES = [
  {
    id: 'pack', name: 'The Endless Pack', subtitle: 'The main expedition backpack',
    description: 'Built for the long haul & tested in the wild. 45L of thoughtfully organized space that carries everything you need for weeks on the road.',
    shopifyHandle: 'endless-pack',
    features: ['Attaches to all Endless ecosystem bags', 'Magnetic buckles', 'Optional camera cube insert', 'Dirty clothes pouch', 'Sternum & waist straps', 'Fits any size laptop'],
    specs: { Volume: '45L', Material: '900D recycled nylon + PU coating', Water: 'Waterproof w/ Aqua-Guard zippers', Laptop: 'Any size' },
    priceIndividual: 250,
    media: { type: 'image', src: '' },
  },
  {
    id: 'daypack', name: 'The Daypack', subtitle: 'Your daily carry companion',
    description: 'Slim enough for a day in the city, when extended, it transforms into a camera cube-backpack. Tough enough for a long hike. Attaches to the main pack, goes inside as a camera cube option & stands alone.',
    shopifyHandle: 'endless-daypack',
    features: ['Camera cube capability', 'Back zipper opening', 'Extendable zipper feature', 'Magnetic buckles', '"Girlfriend Backpack"', 'Fits 14–15" laptops'],
    specs: { Volume: '24L', Material: '900D recycled nylon + PU coating', Water: 'Waterproof w/ Aqua-Guard zippers', Laptop: '14–15"' },
    priceIndividual: 70,
    media: { type: 'image', src: '' },
  },
  {
    id: 'sling', name: 'The Sling', subtitle: 'Essentials on the move',
    description: 'Phone, wallet, passport, cash, film camera, playing cards. Everything you need at arm\'s reach for navigating new cities & making new friends.',
    shopifyHandle: 'endless-sling',
    features: ['Attaches to main pack', 'Magnetic buckles', 'Soft shoulder strap', 'Aqua-Guard zippers', 'Built-in dividers', 'Adjustable strap'],
    specs: { Material: '900D recycled nylon + PU coating', Water: 'Waterproof w/ Aqua-Guard zippers' },
    priceIndividual: 45,
    media: { type: 'image', src: '' },
  },
  {
    id: 'kit', name: 'The Kit', subtitle: 'Organized from the inside out',
    description: 'Toiletry bag, tech organizer, first aid kit — whatever you need it to be. Attaches to the main pack and fits inside the daypack seamlessly.',
    shopifyHandle: 'endless-kit',
    features: ['Opens like a book', 'Built-in dividers', 'Magnetic attachment', 'Quick-access — lives outside main pack', 'Lots of pockets', 'Travel tested & versatile'],
    specs: { Material: '900D recycled nylon + PU coating', Water: 'Waterproof w/ Aqua-Guard zippers' },
    priceIndividual: 35,
    media: { type: 'image', src: '' },
  },
];

export const BUNDLE_PRICE = 350;
export const BUNDLE_SAVINGS = ENDLESS_PIECES.reduce((sum, p) => sum + p.priceIndividual, 0) - BUNDLE_PRICE;
export const BUNDLE_HANDLE = 'endless-system';
