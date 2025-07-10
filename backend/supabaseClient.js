import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://lkwwetyqrrsriispksaf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxrd3dldHlxcnJzcmlpc3Bza2FmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxNDMzNzQsImV4cCI6MjA2NzcxOTM3NH0.rU-PMg02Cfi8b6MTPosF2JjtpBnwH5mpW1QJswv-vlU'
);

export default supabase; 