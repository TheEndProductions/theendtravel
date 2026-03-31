export interface JournalPage {
  type: 'text' | 'photo';
  content: string;
  photoSrc?: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  author: string;
  location: string;
  date: string;
  coverColor: string;
  spineColor: string;
  pages: JournalPage[];
}
