import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// 브라우저(클라이언트 컴포넌트)에서 사용하는 Supabase 클라이언트
export const createClient = () => createBrowserClient(supabaseUrl!, supabaseKey!);
