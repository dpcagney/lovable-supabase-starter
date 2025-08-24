
insert into storage.buckets (id, name, public)
values ('public-assets', 'public-assets', true)
on conflict (id) do nothing;

create policy "Public read assets" on storage.objects
  for select using (bucket_id = 'public-assets');
