import React, { useState } from 'react';
import { useAuth } from '../App';

interface WorkspaceDraft {
  title: string;
  summary: string;
  status: 'Draft' | 'Submitted' | 'Reviewing' | 'Accepted' | 'Rejected';
}

export default function IdeaWorkspace() {
  const { user } = useAuth();

  const [workspace, setWorkspace] = useState<WorkspaceDraft>({
    title: 'Untitled Workspace',
    summary: '',
    status: 'Draft'
  });

  const updateTextField = (field: 'title' | 'summary', value: string) => {
    setWorkspace((prev) => ({ ...prev, [field]: value }));
  };

  const updateStatus = (value: WorkspaceDraft['status']) => {
    setWorkspace((prev) => ({ ...prev, status: value }));
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Idea Workspace</h1>
          <p className="text-sm text-slate-500">
            Create and organize startup ideas with a structured workspace experience.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
          Signed in as <span className="ml-1 font-semibold text-slate-900">{user?.name ?? 'Founder'}</span>
        </div>
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-5">
            <div>
              <label htmlFor="workspace-title" className="mb-2 block text-sm font-medium text-slate-700">
                Workspace title
              </label>
              <input
                id="workspace-title"
                value={workspace.title}
                onChange={(e) => updateTextField('title', e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                placeholder="My next startup idea"
              />
            </div>

            <div>
              <label htmlFor="workspace-summary" className="mb-2 block text-sm font-medium text-slate-700">
                Summary
              </label>
              <textarea
                id="workspace-summary"
                rows={8}
                value={workspace.summary}
                onChange={(e) => updateTextField('summary', e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                placeholder="Describe the problem, opportunity, and initial direction..."
              />
            </div>
          </div>

          <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-lg font-semibold text-slate-900">Workspace Status</h2>

            <div className="mt-4">
              <label htmlFor="workspace-status" className="mb-2 block text-sm font-medium text-slate-700">
                Current status
              </label>
              <select
                id="workspace-status"
                value={workspace.status}
                onChange={(e) => updateStatus(e.target.value as WorkspaceDraft['status'])}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="Draft">Draft</option>
                <option value="Submitted">Submitted</option>
                <option value="Reviewing">Reviewing</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50 p-4">
              <p className="text-sm font-medium text-indigo-700">Next step</p>
              <p className="mt-1 text-sm text-indigo-600">
                Use this workspace as the foundation for a VC Readiness Report and investor-ready materials.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
