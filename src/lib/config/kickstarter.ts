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
    description: 'Built for the long haul. 40L of thoughtfully organized space that carries everything you need for weeks on the road — and nothing you don\'t.',
    shopifyHandle: 'endless-pack',
    features: ['40L main compartment', 'Clamshell opening', 'Laptop sleeve (up to 16")', 'Hidden passport pocket', 'Compression straps', 'Daypack attachment points'],
    specs: { Volume: '40L', Weight: '1.4 kg', Dimensions: '55 × 35 × 25 cm', Material: '500D Cordura', Laptop: 'Up to 16"' },
    priceIndividual: 189,
  },
  {
    id: 'daypack', name: 'The Daypack', subtitle: 'Your daily carry companion',
    description: 'Slim enough for a day in the city, tough enough for a summit push. Attaches to the main pack or stands alone.',
    shopifyHandle: 'endless-daypack',
    features: ['18L capacity', 'Attaches to Endless Pack', 'Water bottle pockets', 'Quick-access front pocket', 'Padded back panel', 'Packable design'],
    specs: { Volume: '18L', Weight: '0.5 kg', Dimensions: '45 × 28 × 15 cm', Material: '500D Cordura' },
    priceIndividual: 89,
  },
  {
    id: 'sling', name: 'The Sling', subtitle: 'Essentials on the move',
    description: 'Phone, wallet, passport, camera. Everything you need at arm\'s reach for navigating new cities.',
    shopifyHandle: 'endless-sling',
    features: ['5L capacity', 'Cross-body wear', 'RFID-blocking pocket', 'Quick-swing access', 'Water-resistant', 'Adjustable strap'],
    specs: { Volume: '5L', Weight: '0.25 kg', Dimensions: '32 × 18 × 8 cm', Material: '500D Cordura' },
    priceIndividual: 59,
  },
  {
    id: 'kit', name: 'The Kit', subtitle: 'Organized from the inside out',
    description: 'Toiletry bag, tech organizer, first aid kit — whatever you need it to be. Fits inside any piece of the system.',
    shopifyHandle: 'endless-kit',
    features: ['3.5L capacity', 'Hanging hook', 'Clear TSA-friendly pocket', 'Mesh organizer dividers', 'Water-resistant lining', 'Fits inside all pieces'],
    specs: { Volume: '3.5L', Weight: '0.18 kg', Dimensions: '24 × 14 × 10 cm', Material: '500D Cordura' },
    priceIndividual: 39,
  },
];

export const BUNDLE_PRICE = 329;
export const BUNDLE_SAVINGS = ENDLESS_PIECES.reduce((sum, p) => sum + p.priceIndividual, 0) - BUNDLE_PRICE;
export const BUNDLE_HANDLE = 'endless-system';
