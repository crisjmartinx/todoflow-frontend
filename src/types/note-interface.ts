export interface ApiResponse {
  notes: Note[];
  total: number;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isArchived: boolean;
  isPinned: boolean;
  color: string;
  tag: string[];
  tagItem: string;
}
