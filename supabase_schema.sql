-- Create the timeline_config table
create table timeline_config (
  id bigint primary key generated always as identity,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  duration integer not null,
  type text not null,
  "startDate" text not null -- Using double quotes to preserve camelCase to match the frontend property name
);

-- Optional: Enable Row Level Security (RLS)
alter table timeline_config enable row level security;

-- Optional: Create a policy to allow public access (Simplest for this demo, but NOT recommended for production)
-- For production, you should use authenticated policies.
create policy "Enable all access for all users" on timeline_config
for all
using (true)
with check (true);
