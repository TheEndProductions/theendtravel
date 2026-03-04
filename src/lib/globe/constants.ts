export const CATEGORY_COLORS: Record<string, string> = {
  film: '#C4530A', journal: '#F5F2ED', gear: '#8B7355', humanitarian: '#2A4B5E', story: '#D4CFC7',
};

export const CATEGORY_LABELS: Record<string, string> = {
  film: 'Film Location', journal: 'Journal Entry', gear: 'Gear in the Wild', humanitarian: 'Humanitarian', story: 'Travel Story',
};

export const GLOBE_CAMERA = { minDistance: 1.5, maxDistance: 4.0, defaultDistance: 2.8, autoRotateSpeed: 0.3 };
export const MARKER = { baseSize: 0.02, pulseAmplitude: 0.003, pulseSpeed: 2.0, maxVisible: 200 };
export const CLUSTERING = { minZoom: 0, maxZoom: 12, radius: 40 };
