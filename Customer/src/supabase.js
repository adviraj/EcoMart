import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fsoixtvttnzdoceaxqxg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzb2l4dHZ0dG56ZG9jZWF4cXhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5OTQ1MDAsImV4cCI6MjA5NDU3MDUwMH0.RbRzxW1g3yhaLIQJqToRQuKaqs3V-aqQbUqs78wVlJE'

export const supabase = createClient(supabaseUrl, supabaseKey)