import React from 'react';
import { BrainCircuit, Sparkles, ShieldCheck, BarChart3, ArrowRight } from 'lucide-react';
import { useAuth } from '../App';

type ReportCardProps = {
  title: string;
  value: string;
  hint: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

const reportCards: ReportCardProps[] = [
  {
    title: 'Readiness Score',
    value: '82 / 100',
    hint: 'Strong evidence of product-market fit and investor readiness.',
    icon: BarChart3
  },
  {
    title: 'Investor Signal',
    value: 'High',
    hint: 'Clear traction, defensible positioning, and strong narrative.',
    icon: Sparkles
  },
  {
    title: 'Risk Profile',
    value: 'Moderate',
    hint: 'Execution and fundraising discipline should remain a priority.',
    icon: ShieldCheck
  }
];

export default function VCReadinessReport() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">VC Readiness Report</h1>
          <p className="text-sm text-slate-500">
            A structured investor-style readiness review for founders preparing to raise capital.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
          Signed in as <span className="ml-1 font-semibold text-slate-900">{user?.name ?? 'Founder'}</span>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {reportCards.map((card) => {
          const Icon = card.icon;
          return (
            <article key={card.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-900">{card.title}</h2>
                <div className="rounded-xl bg-indigo-50 p-2 text-indigo-600">
                  <Icon size={18} />
                </div>
              </div>
              <p className="text-2xl font-bold tracking-tight text-slate-900">{card.value}</p>
              <p className="mt-2 text-sm text-slate-500">{card.hint}</p>
            </article>
          );
        })}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-indigo-50 p-2 text-indigo-600">
            <BrainCircuit size={20} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Investor Summary</h2>
            <p className="text-sm text-slate-500">
              This report is designed to be used alongside a polished workspace draft and supporting materials.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Strengths</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <ArrowRight size={16} className="mt-0.5 shrink-0 text-indigo-500" />
                Clear product narrative and founder readiness.
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight size={16} className="mt-0.5 shrink-0 text-indigo-500" />
                Strong clarity around problem, target customer, and value proposition.
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight size={16} className="mt-0.5 shrink-0 text-indigo-500" />
                Convincing growth and execution roadmap.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Focus Areas</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <ArrowRight size={16} className="mt-0.5 shrink-0 text-indigo-500" />
                Tighten data-backed traction and customer evidence.
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight size={16} className="mt-0.5 shrink-0 text-indigo-500" />
                Strengthen unit economics and fundraising milestones.
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight size={16} className="mt-0.5 shrink-0 text-indigo-500" />
                Prepare a sharper investor narrative for the next round.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
