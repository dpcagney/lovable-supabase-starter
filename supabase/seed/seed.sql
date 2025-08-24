
insert into public.metrics (ts, value)
select now() - (i || ' minutes')::interval, (random()*100)::int
from generate_series(60,1,-1) s(i)
on conflict do nothing;
