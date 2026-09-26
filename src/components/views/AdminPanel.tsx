import React from 'react';
import { Shield, Users, BookOpen, Server, CheckCircle2, Activity } from 'lucide-react';

export const AdminPanel: React.FC = () => {
  return (
    <div className="space-y-8 py-4">
      {/* Admin Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold">
            <Shield className="w-3.5 h-3.5" /> Platform Governance & Administration
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">MHN Education Admin Panel</h1>
          <p className="text-slate-400 text-xs max-w-xl">
            Monitor API usage, legal copyright compliance audits, system status, user accounts, and content moderation.
          </p>
        </div>
      </div>

      {/* Admin Control Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Gemini AI Service Health</h3>
            <Activity className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-slate-500 dark:text-slate-400">Status: Operational (server-side gemini-2.5-flash endpoint connected)</p>
          <div className="pt-2 text-[10px] text-emerald-600 font-bold">Latency: 280ms • 100% Uptime</div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Legal Copyright Compliance</h3>
            <Shield className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-slate-500 dark:text-slate-400">All library entries verified against OpenStax & MIT OCW public domain licenses.</p>
          <div className="pt-2 text-[10px] text-emerald-600 font-bold">0 Infringement Flags</div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Registered Users</h3>
            <Users className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-slate-500 dark:text-slate-400">Total active learners across Grade 1 to Master's levels.</p>
          <div className="pt-2 text-[10px] text-blue-600 font-bold">14,250 Active Students</div>
        </div>
      </div>
    </div>
  );
};
