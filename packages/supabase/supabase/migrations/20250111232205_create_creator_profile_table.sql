create table creator_profiles
(
    id            uuid primary key default gen_random_uuid(),
    user_id       uuid not null references auth.users (id),
    first_name    text not null,
    last_name     text not null,
    bio           text not null,
    pronouns      text,
    web_url       text,
    instagram_url text,
    twitter_url   text,
    facebook_url  text,
    tiktok_url    text,

    created_at    timestamptz      default now(),
    updated_at    timestamptz      default now()
);

-- Get the profile of the logged in user
create or replace function is_creator()
    returns boolean
    language sql
as
$$
select exists(select 1 from creator_profiles where user_id = auth.uid());
$$;

create trigger set_updated_at
    before update
    on creator_profiles
    for each row
execute procedure moddatetime(updated_at);

alter table creator_profiles
    enable row level security;

-- Everyone can read profiles
create policy creator_profiles_select on creator_profiles for select using (true);

-- Users and admins can create their own profiles
create policy creator_profiles_insert on creator_profiles for insert with check (auth.uid() = user_id or is_admin());
-- Users and admins can update their own profiles
create policy creator_profiles_update on creator_profiles for update using (auth.uid() = user_id) with check (auth.uid() = user_id or is_admin());
-- Users and admins can delete their own profiles
create policy creator_profiles_delete on creator_profiles for delete using (auth.uid() = user_id or is_admin());