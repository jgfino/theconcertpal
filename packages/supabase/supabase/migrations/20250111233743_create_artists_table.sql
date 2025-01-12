create table artists
(
    id         uuid primary key     default gen_random_uuid(),
    name       text        not null,

    created_at timestamptz not null default now()
);

create trigger set_updated_at
    before update
    on artists
    for each row
execute procedure moddatetime(updated_at);

alter table artists
    enable row level security;

-- Everyone can read artists
create policy artists_select on artists for select using (true);

-- Insert/update/delete will be done with server side functions

