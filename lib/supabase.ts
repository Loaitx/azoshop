import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://onvecykmqtmnkpphjsmu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9udmVjeWttcXRtbmtwcGhqc211Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzMTE2MzEsImV4cCI6MjA4MDg4NzYzMX0.EJ4tG3pfNCkSlY-NvQ7kOphTz3BhXbwM3dJ0PsQHopM';

export const supabase = createClient(supabaseUrl, supabaseKey);