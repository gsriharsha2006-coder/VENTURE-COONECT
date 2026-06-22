import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from 'formidable';
import fs from 'fs';
import { supabaseAdmin } from '../../lib/supabaseClient';
import { getUserFromReq } from '../../lib/getUserFromReq';

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Only POST allowed');

  const { user, error: authError } = await getUserFromReq(req as any);
  if (!user) return res.status(401).json({ error: authError || 'Unauthorized' });

  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('formidable error', err);
      return res.status(500).json({ error: 'Failed to parse form' });
    }

    const uploaded = files.file as File | undefined;
    if (!uploaded) return res.status(400).json({ error: 'No file provided in field "file"' });

    try {
      const stream = fs.createReadStream(uploaded.filepath);
      const timestamp = Date.now();
      const originalFilename = (uploaded.originalFilename || `upload_${timestamp}`).replace(/\s+/g, '_');
      const storagePath = `${user.id}/${timestamp}_${originalFilename}`;

      const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
        .from('workspaces')
        .upload(storagePath, stream, {
          cacheControl: '3600',
          upsert: false,
          contentType: uploaded.mimetype || undefined
        });

      if (uploadError) {
        console.error('Supabase upload error', uploadError);
        return res.status(500).json({ error: uploadError });
      }

      const { data: publicData, error: publicErr } = await supabaseAdmin.storage
        .from('workspaces')
        .getPublicUrl(storagePath);

      const publicUrl = publicData?.publicUrl || null;

      const { data: fileRow, error: fileErr } = await supabaseAdmin
        .from('files')
        .insert([
          {
            owner_id: user.id,
            workspace_id: (fields.workspace_id as string) || null,
            key: storagePath,
            url: publicUrl,
            mime: uploaded.mimetype,
            size: uploaded.size
          }
        ])
        .select()
        .single();

      if (fileErr) {
        console.error('files insert error', fileErr);
        return res.status(500).json({ error: fileErr });
      }

      return res.status(201).json({ file: fileRow });
    } catch (uploadErr) {
      console.error('upload exception', uploadErr);
      return res.status(500).json({ error: 'Upload failed' });
    } finally {
      try {
        fs.unlinkSync((files.file as File).filepath);
      } catch (e) {
        // ignore
      }
    }
  });
}
