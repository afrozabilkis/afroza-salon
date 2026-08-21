import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://yfbwtoptmxmrclvdvnua.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_s6lLYSCiljGQI2vVkoI4Xw_98Jw96WH';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
