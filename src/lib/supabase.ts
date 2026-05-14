import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wksiymbxbnwwalytpxns.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indrc2l5bWJ4Ym53d2FseXRweG5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzMzQ0MzQsImV4cCI6MjA5MzkxMDQzNH0.4BzDKTVMV88wLaijQRL1ec0FgAkPVetkKPP7Rn169jk';

export const supabase = createClient(supabaseUrl, supabaseKey);