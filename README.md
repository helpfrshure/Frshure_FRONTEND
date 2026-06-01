
/src/
├── api/
│   ├── ApiConstants.ts         # Unified Route Contract endpoints
│   └── axios.ts                # Configured Axios instance with JWT Authorization injects
├── components/
│   └── layout/
│       ├── Navbar.tsx          # Dynamic Sticky Navbar + Role Switcher widget
│       └── Footer.tsx          # Unified links, socials, policies disclosure
├── context/
│   └── AuthContext.tsx         # Central User Session controller mapping Student/Employer logins
├── pages/
│   ├── PublicPages.tsx         # Consolidated landing boards, pricing tables, contact, FAQs
│   ├── AuthPages.tsx           # Multi-role Login/Signup panels + Seed login shortcuts
│   ├── StudentPortal.tsx       # Search filter grids, match analysis, and student chat logs
│   ├── EmployerPortal.tsx      # Recruiter posting metrics, applicants screener, Razorpay overlay
│   └── AdminPortal.tsx         # Platform governance dashboard and audit approval grids
├── services/
│   ├── authService.ts          # Integrations layer for profile sync and fallback
│   ├── jobService.ts           # State-backed retrieval, direct apply triggers, saved posts
│   ├── chatService.ts          # recuiters chat logs history + automated bot replies
│   ├── notificationService.ts  # Chronological notification alerts centers
│   ├── paymentService.ts       # Razorpay ₹99 plan order creation and verified signatures
│   └── adminService.ts         # Platform dashboard summaries and moderation flags
├── types.ts                    # Global TypeScript data structures contract
├── index.css                   # Tailwind v4 custom theme definitions
└── main.tsx                    # React bootstrap root
```
