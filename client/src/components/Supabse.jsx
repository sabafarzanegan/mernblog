import { createClient } from "@supabase/supabase-js";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14emRyYXFncHJ1ZGpza2JuYWxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc0MDk5MDgsImV4cCI6MjAzMjk4NTkwOH0.j-Q6WEj6ovLzRi0NIELQZhIUy3yR6uvMWdEx52XTh6Q";
const URL = "https://mxzdraqgprudjskbnalf.supabase.co";
export const supabase = createClient(URL, supabaseKey);
