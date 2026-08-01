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

const candidates = [
  'client_id',
  'package_id',
  'travelers_no',
  'travellers_no',
  'number_of_travelers',
  'num_travelers',
  'adults',
  'amount',
  'price',
  'payment',
  'payment_details',
  'payment_method',
  'payment_info',
  'method',
  'details',
  'status',
  'booking_date',
  'date',
  'created_at',
  'updated_at',
  'customer_name',
  'customer_email',
  'name',
  'email',
  'phone',
  'mobile',
  'phone_number',
  'mobile_number',
  'note',
  'comments',
  'reference',
  'transaction_id',
  'payment_status',
  'payment_method',
  'payment_details',
];

(async () => {
  for (const candidate of candidates) {
    const { data, error, status, statusText } = await supabase.from('bookings').select(candidate).limit(1);
    console.log(JSON.stringify({ candidate, status, statusText, error: error ? { message:error.message, code:error.code } : null, data }, null, 2));
  }
})();
