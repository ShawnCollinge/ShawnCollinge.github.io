import { createClient } from '@supabase/supabase-js'



if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    throw new Error('Supabase credentials not found in environment variables');
}
  
export const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);