import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '../../../lib/supabaseClient';
import { getUserFromReq } from '../../../lib/getUserFromReq';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { user, error: authError } = await getUserFromReq(req);

  if (req.method === 'GET') {
    const { data, error } = await supabaseAdmin
      .from('workspaces')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    if (error) return res.status(500).json({ error });
    return res.status(200).json(data);
  } else if (req.method === 'PUT') {
    if (!user) return res.status(401).json({ error: authError || 'Unauthorized' });
    const payload = req.body;
    const { content, title, template, visibility } = payload;

    // Ensure the authenticated user is the owner of the workspace
    const { data: ws, error: wsErr } = await supabaseAdmin
      .from('workspaces')
      .select('owner_id')
      .eq('id', id)
      .maybeSingle();
    if (wsErr) return res.status(500).json({ error: wsErr });
    if (!ws) return res.status(404).json({ error: 'Workspace not found' });
    if (ws.owner_id !== user.id) return res.status(403).json({ error: 'Forbidden' });

    const { data: upd, error: updErr } = await supabaseAdmin
      .from('workspaces')
      .update({
        title,
        template,
        visibility,
        current_snapshot: content,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
    if (updErr) return res.status(500).json({ error: updErr });

    const { data: ver, error: verErr } = await supabaseAdmin
      .from('workspace_versions')
      .insert([{ workspace_id: id, snapshot: content, created_by: user.id }])
      .select()
      .single();
    if (verErr) return res.status(500).json({ error: verErr });

    return res.status(200).json({ workspace: upd, version: ver });
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
