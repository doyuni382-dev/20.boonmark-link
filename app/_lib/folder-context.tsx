"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { Folder } from "./types";

interface FolderContextValue {
  folders: Folder[];
  addFolder: (name: string) => void;
  removeFolder: (id: string) => void;
}

const FolderContext = createContext<FolderContextValue | null>(null);

interface FolderProviderProps {
  initialFolders: Folder[];
  children: ReactNode;
}

export function FolderProvider({
  initialFolders,
  children,
}: FolderProviderProps) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);

  const addFolder = useCallback((name: string) => {
    setFolders((prev) => [
      ...prev,
      { id: `folder-${Date.now()}`, name, count: 0 },
    ]);
  }, []);

  const removeFolder = useCallback((id: string) => {
    setFolders((prev) => prev.filter((folder) => folder.id !== id));
  }, []);

  return (
    <FolderContext.Provider value={{ folders, addFolder, removeFolder }}>
      {children}
    </FolderContext.Provider>
  );
}

export function useFolders() {
  const context = useContext(FolderContext);
  if (!context) {
    throw new Error("useFolders must be used within a FolderProvider");
  }
  return context;
}
