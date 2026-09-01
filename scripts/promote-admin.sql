-- Promote the KITAABIA account to admin.
update public.user_roles
set role = 'admin'
where user_id = (
  select id
  from auth.users
  where email = 'Ducale2023@gmail.com'
);
