/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { adminService, AdminEmployer, AdminAnalytics } from '../services/adminService';
import { 
  ShieldCheck, 
  Users, 
  TrendingUp, 
  DollarSign, 
  CheckCircle, 
  AlertTriangle, 
  RefreshCw, 
  Sparkles,
  Search,
  Building,
  Flag,
  FileSpreadsheet
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const [summary, setSummary] = useState<any>(null);
  const [employers, setEmployers] = useState<AdminEmployer[]>([]);
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const loadAdminDashboard = async () => {
      setLoading(true);
      const sum = await adminService.getDashboardSummary();
      const emps = await adminService.getAdminEmployers();
      const analy = await adminService.getAnalytics();
      const rep = await adminService.getModerationReports();
      
      setSummary(sum);
      setEmployers(emps);
      setAnalytics(analy);
      setReports(rep);
      setLoading(false);
    };
    loadAdminDashboard();
  }, [refreshKey]);

  const handleApproveEmployer = async (empId: string) => {
    await adminService.approveEmployer(empId);
    
    // Smooth inline state mutation
    setEmployers(prev => prev.map(e => e.id === empId ? { ...e, verified: true } : e));
    setSummary(prev => ({
      ...prev,
      pendingApprovals: Math.max(0, prev.pendingApprovals - 1)
    }));
  };

  const handleManualSync = () => {
    setRefreshKey(prev => prev + 1);
  };

  if (loading) {
    return (
      <div className="text-center py-24 text-xs dark:text-slate-100">
        <RefreshCw size={22} className="mx-auto animate-spin text-blue-500 mb-3" />
        <span>Loading secure administrative metadata logs...</span>
      </div>
    );
  }

  const pendingApprovalsCount = employers.filter(e => !e.verified).length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 dark:text-slate-100 text-xs">
      
      {/* Header bar controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b dark:border-slate-805 pb-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-red-500 font-bold uppercase tracking-widest text-[10px]">
            <ShieldCheck size={14} />
            <span>Platform Admin Command Deck</span>
          </div>
          <h1 className="font-display font-black text-2xl tracking-tight text-slate-900 dark:text-white mt-1">FRSHURE Governance Center</h1>
        </div>

        <button 
          onClick={handleManualSync}
          className="rounded-xl border border-light-border bg-white px-4 py-2.5 hover:bg-slate-50 text-[11px] font-bold dark:bg-dark-card dark:border-dark-border flex items-center shadow-xs"
        >
          <RefreshCw size={13} className="mr-1.5" /> Force Database Sync
        </button>
      </div>

      {/* Main Admin Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border bg-white p-4.5 dark:bg-dark-card dark:border-dark-border">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-400">Total Scholars</span>
            <Users size={16} className="text-blue-500" />
          </div>
          <div className="font-display font-black text-2xl text-slate-900 dark:text-white mt-1">+{summary?.studentsCount || 1420}</div>
          <p className="text-[10px] text-slate-500">Active university candidates</p>
        </div>

        <div className="rounded-2xl border bg-white p-4.5 dark:bg-dark-card dark:border-dark-border">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-400">Partner Employers</span>
            <Building size={16} className="text-indigo-500" />
          </div>
          <div className="font-display font-black text-2xl text-slate-900 dark:text-white mt-1">{summary?.employersCount || 84}</div>
          <p className="text-[10px] text-slate-500">Registered company logos</p>
        </div>

        <div className="rounded-2xl border bg-white p-4.5 dark:bg-dark-card dark:border-dark-border">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-400">Awaiting Approval</span>
            <AlertTriangle size={16} className="text-amber-500" />
          </div>
          <div className={`font-display font-black text-2xl mt-1 ${pendingApprovalsCount > 0 ? 'text-amber-500' : 'text-slate-900 dark:text-white'}`}>
            {pendingApprovalsCount}
          </div>
          <p className="text-[10px] text-slate-500">Employers pending audit</p>
        </div>

        <div className="rounded-2xl border bg-white p-4.5 dark:bg-dark-card dark:border-dark-border">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-400">Razorpay Fees Gross</span>
            <DollarSign size={16} className="text-emerald-500" />
          </div>
          <div className="font-display font-black text-2xl text-emerald-500 mt-1">₹{summary?.grossEarnings || 15840}</div>
          <p className="text-[10px] text-slate-500">Direct ₹99 payments settled</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left column: Approvals and Reports Table */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Employers pending validation table */}
          <div className="rounded-2xl border bg-white p-5 dark:bg-dark-card dark:border-dark-border shadow-sm space-y-4">
            <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white flex items-center">
              <Sparkles size={14} className="text-blue-500 mr-2" /> Pending Verification Audits
            </h3>

            {pendingApprovalsCount === 0 ? (
              <div className="text-center py-6 text-slate-400 border border-dashed rounded-xl">All recruiter signups successfully audited and active!</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b dark:border-slate-800 text-[10px] uppercase font-bold text-slate-400">
                      <th className="pb-3">Company Name</th>
                      <th className="pb-3">Registered Contact</th>
                      <th className="pb-3">Hq Location</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employers.filter(e => !e.verified).map(e => (
                      <tr key={e.id} className="border-b dark:border-slate-800 last:border-b-0">
                        <td className="py-3.5 font-bold text-slate-900 dark:text-white">{e.companyName}</td>
                        <td className="py-3.5">
                          <p>{e.email}</p>
                          <a href={e.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{e.website}</a>
                        </td>
                        <td className="py-3.5 text-slate-500">{e.location}</td>
                        <td className="py-3.5 text-right">
                          <button 
                            onClick={() => handleApproveEmployer(e.id)}
                            className="rounded-lg bg-emerald-600 text-white font-bold px-3 py-1.5 hover:bg-emerald-500 transition-colors"
                          >
                            Approve Account
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Active Moderation reports */}
          <div className="rounded-2xl border bg-white p-5 dark:bg-dark-card dark:border-dark-border shadow-sm space-y-4">
            <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white flex items-center">
              <Flag size={14} className="text-red-500 mr-2" /> Anti-Spam Security Auditing Logs
            </h3>

            <div className="space-y-3">
              {reports.map(r => (
                <div key={r.id} className="p-3.5 rounded-xl border dark:border-slate-800 flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-900 dark:text-white">{r.type}</span>
                      <span className="rounded bg-red-100 text-[8px] text-red-500 font-bold px-1.5 py-0.5 uppercase dark:bg-red-950/20">{r.status}</span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-300">{r.description}</p>
                  </div>
                  <span className="text-[9px] text-slate-400">{r.date}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right column: Distribution Charts */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-2xl border bg-white p-5 dark:bg-dark-card dark:border-dark-border shadow-sm space-y-4">
            <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white flex items-center">
              <TrendingUp size={14} className="text-blue-500 mr-2" /> Global Category Volume
            </h3>

            <div className="space-y-3.5">
              {analytics?.jobsDistribution.map((dist, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-300">
                    <span>{dist.category}</span>
                    <span className="font-bold text-slate-950 dark:text-white">{dist.count} roles</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full dark:bg-slate-800">
                    <div 
                      className={`h-1.5 rounded-full ${idx % 2 === 0 ? 'bg-blue-500' : 'bg-indigo-500'}`} 
                      style={{ width: `${(dist.count / 45) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border p-4 bg-slate-50 dark:bg-dark-card/30 dark:border-dark-border space-y-2">
            <p className="font-bold uppercase tracking-wider text-[9px] flex items-center"><FileSpreadsheet size={12} className="mr-1 text-emerald-500" /> Platform Financial Ledger</p>
            <p>Admin payouts are automatically aggregated every calendar Friday. Settlement balances processed cleanly via Razorpay Verified Ledger feeds.</p>
          </div>
        </div>

      </div>

    </div>
  );
};
