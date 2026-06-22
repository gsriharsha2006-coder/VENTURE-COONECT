import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '../../../lib/supabaseClient';
import { getUserFromReq } from '../../../lib/getUserFromReq';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user, error: authError } = await getUserFromReq(req);

  try {
    if (req.method === 'GET') {
      const { data, error } = await supabaseAdmin.from('templates').select('*').order('key');
      if (error) return res.status(500).json({ error });
      return res.status(200).json(data);
    } else if (req.method === 'POST') {
      if (!user) return res.status(401).json({ error: authError || 'Unauthorized' });

      // Only admin users may create/modify templates
      const { data: profile } = await supabaseAdmin
        .from('users_profile')
        .select('role')
        .eq('id', user.id)
        .maybeSingle();

      if (!profile || profile.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden: admin only' });
      }

      const payload = req.body;
      if (!payload || !payload.key || !payload.schema) {
        return res.status(400).json({ error: 'Missing key or schema' });
      }
      const insert = {
        key: payload.key,
        name: payload.name || payload.key,
        description: payload.description || '',
        schema: payload.schema
      };
      const { data, error } = await supabaseAdmin.from('templates').upsert(insert).select().single();
      if (error) return res.status(500).json({ error });
      return res.status(201).json(data);
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unexpected error' });
  }
}
