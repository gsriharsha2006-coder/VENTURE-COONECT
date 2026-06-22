import React, { useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import { IdeaWorkspace } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { uploadFileToApi } from '../lib/uploadClient';
import { supabase } from '../lib/supabaseClient';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function WorkspaceEditor({
  workspace,
  onChange
}: {
  workspace: IdeaWorkspace;
  onChange: (w: IdeaWorkspace) => void;
}) {
  const [local, setLocal] = useState<IdeaWorkspace>(workspace);
  const [activeSection, setActiveSection] = useState<string | null>(local.sections[0]?.id || null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => setLocal(workspace), [workspace]);

  useEffect(() => {
    const t = setInterval(() => autosave(), 6000);
    return () => clearInterval(t);
  }, [local]);

  const autosave = useCallback(async () => {
    setIsSaving(true);
    try {
      await axios.put(`/api/workspaces/${local.id}`, {
        content: local,
        title: local.title,
        template: local.template,
        visibility: local.visibility
      });
      setIsSaving(false);
      onChange(local);
    } catch (err) {
      console.error('Autosave failed', err);
      setIsSaving(false);
    }
  }, [local, onChange]);

  function updateSectionContent(id: string, value: string) {
    const next = { ...local, sections: local.sections.map(s => (s.id === id ? { ...s, content: value } : s)) };
    setLocal(next);
  }

  function addSection(title = 'New Section') {
    const s = { id: uuidv4(), title, content: '', order: local.sections.length + 1 };
    const next = { ...local, sections: [...local.sections, s] };
    setLocal(next);
  }

  async function uploadFile(file: File) {
    try {
      const { data } = await supabase.auth.getSession();
      const token = data?.session?.access_token || null;
      const res = await uploadFileToApi(file, { workspaceId: local.id, authToken: token, onProgress: (p) => console.log('upload', p) });
      console.log('upload result', res);
      return res;
    } catch (err) {
      console.error('uploadFile failed', err);
      throw err;
    }
  }

  const active = local.sections.find(s => s.id === activeSection) || local.sections[0];

  return (
    <div className="flex gap-6">
      <aside className="w-80 border rounded-xl p-4 bg-white/50">
        <div className="mb-4">
          <input
            value={local.title}
            onChange={e => setLocal({ ...local, title: e.target.value })}
            className="w-full text-xl font-semibold bg-transparent outline-none"
            placeholder="Untitled idea"
          />
          <div className="text-xs text-gray-500">Template: {local.template}</div>
        </div>

        <div className="space-y-2">
          {local.sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`w-full text-left p-2 rounded-md ${s.id === active?.id ? 'bg-vcblue/10' : 'hover:bg-gray-50'}`}
            >
              <div className="font-medium truncate">{s.title}</div>
              <div className="text-xs text-gray-400 truncate">{s.content.slice(0, 80)}</div>
            </button>
          ))}
        </div>

        <div className="mt-4">
          <button onClick={() => addSection()} className="px-4 py-2 bg-vcblue text-white rounded-md">Add Section</button>
        </div>

        <div className="mt-4 text-xs text-gray-500">{isSaving ? 'Saving…' : 'Saved'}</div>
      </aside>

      <main className="flex-1">
        {active ? (
          <div>
            <div className="mb-2 flex justify-between items-center">
              <h2 className="text-lg font-semibold">{active.title}</h2>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="mb-2 text-sm text-gray-600">Rich Text Editor</div>
                <ReactQuill value={active.content} onChange={(v: any) => updateSectionContent(active.id, v)} />
              </div>

              <div>
                <div className="mb-2 text-sm text-gray-600">Markdown Preview</div>
                <div className="prose max-h-[70vh] overflow-auto p-4 border rounded-md bg-white">
                  <ReactMarkdown>{active.content}</ReactMarkdown>
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => autosave()}
                className="px-4 py-2 bg-darknavy text-white rounded-md"
              >
                Save Now
              </button>
              <button
                onClick={() => {
                  const blob = new Blob([JSON.stringify(local, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${local.title || 'workspace'}.json`;
                  a.click();
                }}
                className="px-4 py-2 border rounded-md"
              >
                Export JSON
              </button>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">Upload file / image</label>
              <input
                type="file"
                onChange={async (e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  try {
                    const result = await uploadFile(f);
                    // Insert link to the active section content (simple markdown link)
                    const link = `![${result.key}](${result.url})`;
                    updateSectionContent(active.id, (active.content || '') + "\n" + link);
                  } catch (err) {
                    console.error('file upload error', err);
                  }
                }}
              />
            </div>
          </div>
        ) : (
          <div>Select a section</div>
        )}
      </main>
    </div>
  );
}
