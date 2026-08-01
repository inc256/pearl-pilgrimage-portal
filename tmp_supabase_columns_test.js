import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const envText = fs.readFileSync('.env', 'utf8');
const env = envText.split(/\r?\n/).reduce((acc, line) => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    acc[match[1]] = match[2].replace(/^"|"$/g, '');
  }
  return acc;
}, {});

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

(async () => {
  const { data, error } = await supabase
    .from('information_schema.columns')
    .select('column_name')
    .eq('table_name', 'bookings');
  console.log(JSON.stringify({ data, error }, null, 2));
})();
