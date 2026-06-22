-- db/rls_policies.sql
-- Supabase Row Level Security (RLS) policies for Venture Connect core tables
-- Run these in the Supabase SQL editor. Review and adapt to your project's auth/role setup.

-- Helper: ensure users_profile exists with role column
create table if not exists public.users_profile (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  role text not null default 'founder'
);

-- 1) WORKSPACES: only owners can insert/update/delete; public workspaces are readable by anyone
alter table if exists public.workspaces enable row level security;

-- Allow owners to insert workspaces
create policy if not exists "workspaces_insert_owner" on public.workspaces
  for insert
  with check (auth.uid() = owner_id);

-- Allow owners to select/update/delete their workspaces
create policy if not exists "workspaces_owner_full_access" on public.workspaces
  for all
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

-- Allow read access for public workspaces (visibility = 'public') to authenticated and anonymous users
create policy if not exists "workspaces_public_select" on public.workspaces
  for select
  using (visibility = 'public');

-- 2) WORKSPACE_VERSIONS: only workspace owners can insert/select
alter table if exists public.workspace_versions enable row level security;

create policy if not exists "workspace_versions_owner" on public.workspace_versions
  for all
  using (exists (
    select 1 from public.workspaces w where w.id = workspace_versions.workspace_id and w.owner_id = auth.uid()
  ));

-- 3) FILES: owners (uploader) can manage; workspace owners can view files linked to their workspace
alter table if exists public.files enable row level security;

create policy if not exists "files_owner_access" on public.files
  for all
  using (
    auth.uid() = owner_id
  )
  with check (
    auth.uid() = owner_id
  );

create policy if not exists "files_workspace_owner_read" on public.files
  for select
  using (
    exists (
      select 1 from public.workspaces w where w.id = public.files.workspace_id and w.owner_id = auth.uid()
    )
  );

-- 4) REPORTS: only workspace owners and admins can read reports
alter table if exists public.reports enable row level security;

create policy if not exists "reports_workspace_owner" on public.reports
  for select
  using (
    exists (select 1 from public.workspaces w where w.id = public.reports.workspace_id and w.owner_id = auth.uid())
  );

-- allow insertion if generating user is the authed user
create policy if not exists "reports_insert_by_user" on public.reports
  for insert
  with check (auth.uid() = generated_by);

-- 5) TEMPLATES: readable by all; modifications restricted to admins
alter table if exists public.templates enable row level security;

create policy if not exists "templates_public_select" on public.templates
  for select
  using (true);

-- Helper: admin check using users_profile.role
-- Allow insert/update/delete only for users with role='admin' in users_profile
create policy if not exists "templates_admin_modify" on public.templates
  for all
  using (
    exists (select 1 from public.users_profile up where up.id = auth.uid() and up.role = 'admin')
  )
  with check (
    exists (select 1 from public.users_profile up where up.id = auth.uid() and up.role = 'admin')
  );

-- Notes:
-- - Replace auth.uid() checks with your preferred auth mechanism if using JWTs or a different provider.
-- - Review which tables should be accessible publicly vs authenticated users. The policies above are conservative.
-- - After adding policies, you may need to adjust service role usage for server-side operations (SUPABASE_SERVICE_ROLE_KEY) to bypass RLS when needed.
-- - Test each policy with different user roles (founder, investor, admin) using Supabase policies tester or a temporary client.
