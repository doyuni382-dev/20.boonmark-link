"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Folder } from "./types";
import { createClient } from "@/utils/supabase/client";

interface FolderContextValue {
  folders: Folder[];
  isAdding: boolean;
  addFolder: (name: string) => Promise<void>;
  removeFolder: (id: string) => void;
  renameFolder: (id: string, name: string) => void;
}

const FolderContext = createContext<FolderContextValue | null>(null);

// 사이드바 상단에 항상 노출되는 가상 폴더. DB에는 저장되지 않는다.
const ALL_FOLDER: Folder = { id: "all", name: "전체", count: 0 };

interface FolderProviderProps {
  children: ReactNode;
}

export function FolderProvider({ children }: FolderProviderProps) {
  const supabase = useMemo(() => createClient(), []);
  const [folders, setFolders] = useState<Folder[]>([ALL_FOLDER]);

  // 마운트 시 folders 테이블에서 저장된 폴더를 불러온다.
  useEffect(() => {
    let active = true;

    supabase
      .from("folders")
      .select("id, name")
      .order("id", { ascending: true })
      .then(({ data, error }) => {
        if (!active || error || !data) return;
        setFolders([
          ALL_FOLDER,
          ...data.map((row) => ({
            id: String(row.id),
            name: row.name as string,
            count: 0,
          })),
        ]);
      });

    return () => {
      active = false;
    };
  }, [supabase]);

  // 중복 클릭으로 폴더가 여러 개 추가되는 것을 막는 플래그.
  const addingRef = useRef(false);
  const [isAdding, setIsAdding] = useState(false);

  const addFolder = useCallback(
    async (name: string) => {
      if (addingRef.current) return;
      addingRef.current = true;
      setIsAdding(true);

      try {
        const { data, error } = await supabase
          .from("folders")
          .insert({ name })
          .select("id, name")
          .single();

        if (error || !data) {
          console.error("폴더 추가 실패:", error?.message);
          return;
        }

        setFolders((prev) => [
          ...prev,
          { id: String(data.id), name: data.name as string, count: 0 },
        ]);
      } finally {
        addingRef.current = false;
        setIsAdding(false);
      }
    },
    [supabase],
  );

  const removeFolder = useCallback((id: string) => {
    setFolders((prev) => prev.filter((folder) => folder.id !== id));
  }, []);

  const renameFolder = useCallback((id: string, name: string) => {
    setFolders((prev) =>
      prev.map((folder) => (folder.id === id ? { ...folder, name } : folder)),
    );
  }, []);

  return (
    <FolderContext.Provider
      value={{ folders, isAdding, addFolder, removeFolder, renameFolder }}
    >
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
