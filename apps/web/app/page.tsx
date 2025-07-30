// apps/web/app/test-supa/page.tsx
import { supabase } from '@/lib/db';

export default async function Page() {
  const { data, error } = await supabase.from('your_table_name').select('*');
  return (
    <pre>{JSON.stringify(data || error, null, 2)}</pre>
  );
}
