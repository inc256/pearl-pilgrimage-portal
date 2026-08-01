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
  const columns = ['package_id','first_name','second_name','email','travelers_no','total_amount','payment_method','booking_status'];
  const selectResult = await supabase.from('bookings').select('*').limit(1);
  console.log(JSON.stringify({ selectResult }, null, 2));
  for (const column of columns) {
    let payload;
    if (column === 'booking_status') payload = { [column]: 'pending' };
    else if (column === 'package_id') payload = { [column]: 1 };
    else if (column === 'travelers_no') payload = { [column]: 1 };
    else if (column === 'total_amount') payload = { [column]: 100 };
    else if (column === 'payment_method') payload = { [column]: { method: 'Cash', details: { phone: '000', note: 'test' } } };
    else payload = { [column]: `test_${column}` };

    const { data, error, status, statusText } = await supabase.from('bookings').insert([payload]);
    console.log(JSON.stringify({ payload, data, error: error ? { message: error.message, details: error.details, hint: error.hint, code: error.code } : null, status, statusText }, null, 2));
  }

  const projectionTests = [
    'package_id',
    'first_name',
    'second_name',
    'email',
    'travelers_no',
    'total_amount',
    'payment_method',
    'booking_status',
  ];

  for (const proj of projectionTests) {
    const { data, error, status, statusText } = await supabase.from('bookings').select(proj).limit(1);
    console.log(JSON.stringify({ projection: proj, data, error: error ? { message: error.message, details: error.details, hint: error.hint, code: error.code } : null, status, statusText }, null, 2));
  }
})();
