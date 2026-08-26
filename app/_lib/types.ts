export interface Folder {
  id: string;
  name: string;
  count: number;
}

export interface Bookmark {
  id: string;
  folderId: string;
  title: string;
  url: string;
  description?: string;
  thumbnail?: string | null;
}
