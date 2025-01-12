create table venues (
    id uuid primary key default gen_random_uuid(),
    name text not null,

    -- TODO: add more fields/address/etc

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create trigger set_updated_at
    before update
    on venues
    for each row
execute procedure moddatetime(updated_at);

alter table venues enable row level security;

-- Everyone can read venues
create policy venues_select on venues for select using (true);

-- Insert/update/delete will be done with server side functions
