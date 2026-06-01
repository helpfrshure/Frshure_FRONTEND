/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail, Instagram, Linkedin, Globe, Shield, Scale } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t bg-slate-50 border-light-border text-slate-600 transition-colors duration-200 dark:bg-dark-bg dark:border-dark-border dark:text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('landing')}>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-display font-bold text-sm">
                F
              </div>
              <span className="font-display font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                FRSHURE
              </span>
            </div>
            <p className="text-xs leading-relaxed max-w-xs text-slate-500 dark:text-slate-400">
              FRSHURE is India\'s ultimate student jobs and curated startup internships platform. Built for ambitious university students, designed to deliver elite hires for top founders.
            </p>
            
            {/* Socials & Contact Actions */}
            <div className="flex items-center space-x-3 pt-2">
              <a 
                href="https://www.instagram.com/frshure.in" 
                target="_blank" 
                rel="noreferrer referrer"
                className="rounded-lg p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-pink-600 transition-colors"
                title="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://www.linkedin.com/company/frshure/" 
                target="_blank" 
                rel="noreferrer referrer"
                className="rounded-lg p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-blue-700 transition-colors"
                title="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="mailto:helpfrshure@gmail.com"
                className="rounded-lg p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-blue-500 transition-colors"
                title="Email Support"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-xs uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Explore Jobs
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('landing')} className="hover:text-blue-500 transition-colors">
                  Engineering Internships
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('landing')} className="hover:text-blue-500 transition-colors">
                  UI/UX Design Postings
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('landing')} className="hover:text-blue-500 transition-colors">
                  Social Media & Writing
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pricing')} className="hover:text-blue-500 transition-colors">
                  Recruiter Packages (₹99)
                </button>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-xs uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Resources
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-blue-500 transition-colors">
                  About FRSHURE
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-blue-500 transition-colors">
                  FAQs & Guides
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-blue-500 transition-colors">
                  Get in Touch
                </button>
              </li>
            </ul>
          </div>

          {/* Legal / Protection */}
          <div>
            <h3 className="font-semibold text-xs uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Platform & Legal
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-blue-500 flex items-center transition-colors">
                  <Shield size={12} className="mr-1.5" /> Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-blue-500 flex items-center transition-colors">
                  <Scale size={12} className="mr-1.5" /> Terms & Conditions
                </button>
              </li>
              <li className="text-[10px] text-slate-400 dark:text-slate-500 leading-snug pt-2">
                All recruiter postings verified by FRSHURE administration. Payments secured via Razorpay.
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t pt-8 text-center text-xs text-slate-400 dark:border-dark-border">
          <p>© {new Date().getFullYear()} FRSHURE. All Rights Reserved. Built with ❤️ for college students.</p>
        </div>
      </div>
    </footer>
  );
};
