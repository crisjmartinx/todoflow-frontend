export interface TagItem {
  id: number;
  name: string;
}

export interface TagCategory {
  id: number;
  name: string;
  color: string;
  items: TagItem[];
}
