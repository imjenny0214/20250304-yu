import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qnnauezebieqnzxwdvbx.supabase.co'; // 替換為你的 Supabase URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFubmF1ZXplYmllcW56eHdkdmJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5MDEzMTEsImV4cCI6MjA1ODQ3NzMxMX0.9KxoPXhmKvlqqr1R9njdgxIRLPgfCOwK364fSvutTnc'; // 替換為你的 Supabase 匿名金鑰

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
