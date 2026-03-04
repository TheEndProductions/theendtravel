export type PinCategory = 'film' | 'journal' | 'gear' | 'humanitarian' | 'story';

export interface GlobePin {
  id: string;
  title: string;
  category: PinCategory;
  latitude: number;
  longitude: number;
  locationName: string;
  country?: string;
  dateISO?: string;
  authorName?: string;
  excerpt: string;
  coverImageUrl?: string;
  videoUrl?: string;
  relatedLinks: {
    filmSlug?: string;
    journalSlug?: string;
    productHandle?: string;
    projectUrl?: string;
  };
  connectedToId?: string;
  gearUsed?: string[];
}

export interface GlobeState {
  pins: GlobePin[];
  filteredPins: GlobePin[];
  activeFilter: PinCategory | 'all';
  searchQuery: string;
  selectedPin: GlobePin | null;
  hoveredPin: GlobePin | null;
  cameraZoom: number;
}
