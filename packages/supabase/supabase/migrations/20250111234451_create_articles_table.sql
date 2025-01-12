create table articles
(
    id            uuid primary key,
    title         text        not null,
    date          date        not null,
    body_markdown text        not null,
    artists       text[],
    venue         uuid        references venues (id) on delete set null,
    author        uuid        references creator_profiles (id) on delete set null,
    photographer  uuid        references creator_profiles (id) on delete set null,

    created_at    timestamptz not null default now(),
    updated_at    timestamptz not null default now()
);

create trigger set_updated_at
    before update
    on articles
    for each row
execute procedure moddatetime(updated_at);

alter table articles
    enable row level security;

-- Everyone can read articles
create policy articles_select on articles for select using (true);

-- Only creators or admins can update articles
create policy articles_update on articles for update using (is_creator() or is_admin());

-- Only the creators or admins can insert articles
create policy articles_insert on articles for insert with check (is_creator() is not null or is_admin());

-- Only the creators or admins can delete articles
create policy articles_delete on articles for delete using (is_creator() is not null or is_admin());

