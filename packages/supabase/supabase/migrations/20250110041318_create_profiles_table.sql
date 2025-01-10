create table profiles (
    id uuid references auth.users(id) on delete cascade,
    name text not null,

    primary key (id)
)