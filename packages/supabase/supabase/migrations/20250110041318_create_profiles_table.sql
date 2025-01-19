create extension if not exists moddatetime schema extensions;

create table profiles
(
    id         uuid primary key default gen_random_uuid(),
    user_id    uuid not null references auth.users (id) on delete cascade unique,
    first_name text not null,
    last_name  text not null,
    username   text not null unique,
    bio        text,
    pronouns   text,
    admin      boolean          default false,
    creator    boolean          default false,

    created_at timestamptz      default now(),
    updated_at timestamptz      default now()
);

-- Determine if the current user is an admin
create or replace function is_admin()
    returns boolean
    language sql
    set search_path=''
as
$$
select admin
from public.profiles
where user_id = auth.uid();
$$;

-- Determine if the current user is a creator
create or replace function is_creator()
    returns boolean
    language sql
    set search_path=''
as
$$
select creator
from public.profiles
where user_id = auth.uid();
$$;

create trigger set_updated_at
    before update
    on profiles
    for each row
execute procedure moddatetime(updated_at);

alter table profiles
    enable row level security;

-- Everyone can read profiles
create policy profiles_select on profiles for select using (true);

-- Users can create their own profiles, but not as an admin or creator
create policy profiles_insert on profiles for insert with check (auth.uid() = user_id and admin = false and creator = false);
-- Users can update their own profiles, but only if they are not changing the admin or creator status
create policy profiles_update on profiles for update using (auth.uid() = user_id)
    with check (
            auth.uid() = user_id and
            admin = (select admin
                     from profiles
                     where user_id = user_id)
        and creator = (select creator
                       from profiles
                       where user_id = user_id));
-- Users and admins can delete their own profiles
create policy profiles_delete on profiles for delete using (auth.uid() = user_id or is_admin());

-- Admins can create any profile
create policy profiles_admin_insert on profiles for insert with check (is_admin());
-- Admins can update any profile
create policy profiles_admin_update on profiles for update using (is_admin());
