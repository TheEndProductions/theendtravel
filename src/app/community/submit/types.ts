export type SubmissionType = 'journal' | 'film' | 'photo';

export type WizardStep = 'type' | 'details' | 'meta' | 'review' | 'success';

export interface SubmissionTypeInfo {
  id: SubmissionType;
  label: string;
  tagline: string;
  description: string;
  accentColor: string;
  icon: string;
}

export const SUBMISSION_TYPES: SubmissionTypeInfo[] = [
  {
    id: 'journal',
    label: 'Journal Entry',
    tagline: 'Words from the road',
    description:
      'A written reflection — a story, a thought captured on a quiet morning, a lesson from a long road. Your entry may be bound into the library.',
    accentColor: '#5C3A1E',
    icon: '✒',
  },
  {
    id: 'film',
    label: 'Film',
    tagline: 'Motion, memory, movement',
    description:
      'A short film, a travel edit, a glimpse of somewhere worth holding onto. Share a YouTube or Vimeo link and the story behind it.',
    accentColor: '#3A2817',
    icon: '◉',
  },
  {
    id: 'photo',
    label: 'Photograph',
    tagline: 'A single frame, held still',
    description:
      'A photograph or a small set — a moment you felt the world slow down. Attach the image and tell us where it found you.',
    accentColor: '#4A3520',
    icon: '▣',
  },
];

export interface FormState {
  // which type of submission
  type: SubmissionType | null;

  // type-specific fields
  // journal:
  journalTitle: string;
  journalBody: string;
  // film:
  filmTitle: string;
  filmVideoUrl: string;
  filmDescription: string;
  // photo:
  photoCaption: string;
  photoFiles: File[];

  // shared fields (step 3)
  author: string;
  email: string;
  locationName: string;        // e.g. "Wasatch Mountains, Utah"
  locationCountry: string;     // e.g. "USA"
  locationLat: string;         // optional precise pin
  locationLng: string;         // optional precise pin
  dateTaken: string;           // when the moment happened
  gearUsed: string;            // optional, esp. for Endless Pack tie-in
  instagramHandle: string;     // optional credit
  websiteUrl: string;          // optional credit
  consentRelease: boolean;     // required — grants publishing rights
  consentPinGlobe: boolean;    // required if location provided
}

export const INITIAL_FORM_STATE: FormState = {
  type: null,
  journalTitle: '',
  journalBody: '',
  filmTitle: '',
  filmVideoUrl: '',
  filmDescription: '',
  photoCaption: '',
  photoFiles: [],
  author: '',
  email: '',
  locationName: '',
  locationCountry: '',
  locationLat: '',
  locationLng: '',
  dateTaken: '',
  gearUsed: '',
  instagramHandle: '',
  websiteUrl: '',
  consentRelease: false,
  consentPinGlobe: false,
};
