import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '../../../lib/supabaseClient';
import { getUserFromReq } from '../../../lib/getUserFromReq';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Only POST');

  const { workspace_id, user_id } = req.body;
  const { user, error: authError } = await getUserFromReq(req as any);
  if (!user) return res.status(401).json({ error: authError || 'Unauthorized' });

  // Fetch workspace and ensure user can generate report (owner)
  const { data: ws, error: wsErr } = await supabaseAdmin
    .from('workspaces')
    .select('*')
    .eq('id', workspace_id)
    .maybeSingle();

  if (wsErr) return res.status(500).json({ error: wsErr });
  if (!ws) return res.status(404).json({ error: 'Workspace not found' });

  // Only owner can request report generation
  if (ws.owner_id !== user.id) return res.status(403).json({ error: 'Forbidden' });

  // TODO: Replace with call to AI pipeline that builds structured report based on template
  const stubReport = buildStubReport(ws.template, ws.current_snapshot);

  const { data: report, error: insertErr } = await supabaseAdmin
    .from('reports')
    .insert([
      {
        workspace_id,
        generated_by: user.id,
        template: ws.template,
        content: stubReport
      }
    ])
    .select()
    .single();

  if (insertErr) return res.status(500).json({ error: insertErr });

  return res.status(201).json(report);
}

function buildStubReport(templateKey: string, snapshot: any) {
  const baseScore = 65 + Math.floor(Math.random() * 25);
  const sections = [
    { title: 'Executive Summary', body: `Auto-generated executive summary for template ${templateKey}` },
    { title: 'SWOT', body: 'Sample SWOT analysis' },
    { title: 'Scorecard', body: { overall: baseScore } }
  ];
  if (templateKey === 'ai_project') {
    sections.push({ title: 'AI Feasibility', body: 'Model selection, dataset quality, infra needs' });
  } else if (templateKey === 'saas_product') {
    sections.push({ title: 'SaaS Metrics', body: 'ARR potential, CAC, LTV, Churn estimates' });
  } else if (templateKey === 'startup') {
    sections.push({ title: 'Market Analysis', body: 'TAM / SAM / SOM, competitor landscape' });
  } else if (templateKey === 'hackathon') {
    sections.push({ title: 'Demo Readiness', body: 'Technical execution & presentation readiness' });
  }
  return { generated_at: new Date().toISOString(), sections, version: '1.0' };
}
