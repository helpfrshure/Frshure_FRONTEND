/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Job } from '../../types';
import { jobService } from '../../services/jobService';
import { 
  Bookmark, 
  BookmarkCheck, 
  MapPin, 
  DollarSign, 
  Briefcase, 
  Share2, 
  CheckCircle,
  Copy,
  Check
} from 'lucide-react';

interface JobCardProps {
  job: Job;
  onViewDetails: (jobId: string) => void;
  onApplyDirect?: (jobId: string) => void;
  isStudent?: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({ 
  job, 
  onViewDetails, 
  onApplyDirect,
  isStudent = true
}) => {
  const [isSaved, setIsSaved] = useState(jobService.isJobSavedLocal(job.id));
  const [copied, setCopied] = useState(false);

  const handleToggleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSaved) {
      jobService.unsaveJob(job.id);
      setIsSaved(false);
    } else {
      jobService.saveJob(job.id);
      setIsSaved(true);
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${window.location.origin}/jobs/${job.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      onClick={() => onViewDetails(job.id)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-dark-card dark:border-dark-border dark:hover:border-indigo-500/40"
    >
      
      {/* Dynamic Highlight Card Accent */}
      {job.verified && (
        <div className="absolute top-0 left-0 h-1.5 w-full bg-indigo-600"></div>
      )}

      {/* Card Header */}
      <div className="flex items-start justify-between space-x-4">
        
        {/* Company Avatar */}
        <div className="flex items-start space-x-3.5">
          <img 
            src={job.companyLogo || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=200'} 
            alt={`${job.companyName} logo`}
            className="h-12 w-12 rounded-xl object-cover bg-slate-100 dark:bg-slate-800"
          />
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm group-hover:text-indigo-600 transition-colors">
                {job.companyName}
              </span>
              {job.verified && (
                <CheckCircle size={14} className="text-indigo-500 fill-indigo-500/20" title="Verified Recruiter" />
              )}
            </div>
            <h3 className="font-display font-bold text-slate-900 group-hover:text-slate-800 dark:text-white dark:group-hover:text-slate-100 text-base leading-tight mt-0.5">
              {job.title}
            </h3>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center space-x-1.5 opacity-80 group-hover:opacity-100">
          
          <button 
            onClick={handleShare}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-white transition-colors"
            title="Copy Public Route"
          >
            {copied ? <Check size={16} className="text-emerald-500" /> : <Share2 size={16} />}
          </button>
          
          {isStudent && (
            <button 
              onClick={handleToggleSave}
              className={`rounded-lg p-2 transition-colors ${isSaved ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/20' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800'}`}
              title={isSaved ? 'Unsave Job' : 'Save Job'}
            >
              {isSaved ? <BookmarkCheck size={17} /> : <Bookmark size={17} />}
            </button>
          )}

        </div>
      </div>

      {/* Meta Pills */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        
        {/* Remote Type Badge */}
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium border ${
          job.remoteType === 'Remote' 
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200/50 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-950'
            : job.remoteType === 'Hybrid'
            ? 'bg-indigo-50 text-indigo-700 border-indigo-200/50 dark:bg-indigo-950/20 dark:text-indigo-400 dark:border-indigo-950'
            : 'bg-amber-50 text-amber-700 border-amber-200/50 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-950'
        }`}>
          <Briefcase size={12} className="mr-1" />
          {job.remoteType}
        </span>

        {/* Location Badge */}
        <span className="inline-flex items-center text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 px-2 py-0.5 rounded-lg border border-slate-100 dark:border-slate-800">
          <MapPin size={12} className="mr-1" />
          {job.location}
        </span>

        {/* Category Pill */}
        <span className="text-[10px] text-slate-400 dark:text-slate-500 ml-auto font-mono">
          {job.category}
        </span>

      </div>

      {/* Salary & Stipend section */}
      <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 mt-4 pt-3.5">
        <div>
          <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">stipend / month</span>
          <div className="flex items-center text-slate-900 dark:text-white font-bold text-sm">
            <DollarSign size={14} className="text-emerald-500" />
            <span>{job.salary}</span>
          </div>
        </div>

        {/* Dynamic CTA */}
        {onApplyDirect ? (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onApplyDirect(job.id);
            }}
            className="rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
          >
            Apply Now
          </button>
        ) : (
          <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 group-hover:underline flex items-center">
            View Details 
          </span>
        )}
      </div>

    </div>
  );
};
