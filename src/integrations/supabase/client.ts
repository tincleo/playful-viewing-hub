// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = "https://abgigsksmwwvurkrsmnk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiZ2lnc2tzbXd3dnVya3JzbW5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5NjQzMTAsImV4cCI6MjA0NjU0MDMxMH0.jiAWeEZvZLQGUWLKAP4_MPWhsF6AddgxD114dFq4neM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);