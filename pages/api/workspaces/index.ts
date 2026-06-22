import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '../../../lib/supabaseClient';
import { getUserFromReq } from '../../../lib/getUserFromReq';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user, error: authError } = await getUserFromReq(req);
  if (!user) return res.status(401).json({ error: authError || 'Unauthorized' });

  if (req.method === 'POST') {
    const payload = req.body;
    const { title, template } = payload;
    const { data, error } = await supabaseAdmin
      .from('workspaces')
      .insert([{ title, template, owner_id: user.id, current_snapshot: {} }])
      .select()
      .single();
    if (error) return res.status(500).json({ error });
    return res.status(201).json(data);
  } else if (req.method === 'GET') {
    // list workspaces for user
    const { data, error } = await supabaseAdmin
      .from('workspaces')
      .select('*')
      .eq('owner_id', user.id)
      .order('updated_at', { ascending: false });
    if (error) return res.status(500).json({ error });
    return res.status(200).json(data);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
