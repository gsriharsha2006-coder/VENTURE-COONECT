// lib/getUserFromReq.ts
import { NextApiRequest } from 'next';
import { supabaseAdmin } from './supabaseClient';

export async function getUserFromReq(req: NextApiRequest) {
  const authHeader = (req.headers.authorization || req.headers['authorization'] || '') as string;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { user: null, error: 'Missing Authorization header' };
  }
  const token = authHeader.replace('Bearer ', '').trim();
  try {
    const { data, error } = await supabaseAdmin.auth.getUser(token);
    if (error) return { user: null, error };
    // data has shape { user }
    return { user: data.user || null, error: null };
  } catch (err) {
    return { user: null, error: err };
  }
}
