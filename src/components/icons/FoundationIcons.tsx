import type { ReactNode, SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  accent?: string;
};

const defaults = {
  viewBox: '0 0 48 48',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  'aria-hidden': true,
} as const;

/** Education & digital literacy */
export function EducationProgramIcon({ accent = '#0ea5e9', className, ...props }: IconProps) {
  return (
    <svg {...defaults} className={className} {...props}>
      <rect x="8" y="22" width="14" height="18" rx="2" stroke={accent} strokeWidth="2" />
      <path d="M15 22V14l9-4 9 4v8" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 10v12M33 14v16" stroke={accent} strokeWidth="2" strokeLinecap="round" />
      <rect x="28" y="24" width="12" height="9" rx="1.5" stroke={accent} strokeWidth="2" />
      <path d="M31 30h6" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="34" cy="27" r="1" fill={accent} />
    </svg>
  );
}

/** Community health */
export function HealthProgramIcon({ accent = '#14b8a6', className, ...props }: IconProps) {
  return (
    <svg {...defaults} className={className} {...props}>
      <path
        d="M24 38c-8-6-12-10.5-12-16a6 6 0 0112-2 6 6 0 0112 2c0 5.5-4 10-12 16z"
        stroke={accent}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M24 22v8M20 26h8" stroke={accent} strokeWidth="2" strokeLinecap="round" />
      <path d="M10 12h6M13 9v6" stroke={accent} strokeWidth="1.75" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
}

/** Social engagement */
export function SocialProgramIcon({ accent = '#f97316', className, ...props }: IconProps) {
  return (
    <svg {...defaults} className={className} {...props}>
      <circle cx="24" cy="14" r="4" stroke={accent} strokeWidth="2" />
      <circle cx="12" cy="28" r="4" stroke={accent} strokeWidth="2" />
      <circle cx="36" cy="28" r="4" stroke={accent} strokeWidth="2" />
      <path
        d="M21 17l-6 8M27 17l6 8M16 28h16"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M18 36h12" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
    </svg>
  );
}

/** Economic empowerment / skills */
export function EconomicProgramIcon({ accent = '#ec4899', className, ...props }: IconProps) {
  return (
    <svg {...defaults} className={className} {...props}>
      <circle cx="30" cy="18" r="7" stroke={accent} strokeWidth="2" />
      <path d="M30 11v14M26 15h8M26 21h8" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M14 34l6-18 4 6 6-2"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="14" cy="34" r="2" fill={accent} />
    </svg>
  );
}

export function IconTile({
  children,
  variant = 'square',
  size = 'md',
}: {
  children: ReactNode;
  variant?: 'square' | 'round';
  size?: 'sm' | 'md';
}) {
  const dim = size === 'sm' ? 'h-12 w-12' : 'h-[4.25rem] w-[4.25rem]';
  const inner = size === 'sm' ? 'h-8 w-8' : 'h-11 w-11';
  const shape = variant === 'round' ? 'rounded-full aspect-square' : 'rounded-2xl';
  return (
    <div
      className={`relative flex ${dim} shrink-0 items-center justify-center border border-light-border bg-light-bg shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] ${shape}`}
    >
      <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_30%_20%,#0ea5e9,transparent_55%)]" />
      <div className={`relative ${inner}`}>{children}</div>
    </div>
  );
}

/** Impact: families served */
export function FamiliesImpactIcon({ accent = '#0ea5e9', className, ...props }: IconProps) {
  return (
    <svg {...defaults} className={className} {...props}>
      <path d="M10 34V22l8-6 8 6v12" stroke={accent} strokeWidth="2" strokeLinejoin="round" />
      <path d="M18 16v4M14 34h8" stroke={accent} strokeWidth="2" strokeLinecap="round" />
      <path d="M30 34V26l6-4 6 4v8" stroke={accent} strokeWidth="2" strokeLinejoin="round" opacity="0.75" />
      <circle cx="36" cy="22" r="2" fill={accent} opacity="0.75" />
    </svg>
  );
}

/** Impact: students trained */
export function StudentsImpactIcon({ accent = '#14b8a6', className, ...props }: IconProps) {
  return (
    <svg {...defaults} className={className} {...props}>
      <rect x="10" y="14" width="28" height="20" rx="2" stroke={accent} strokeWidth="2" />
      <path d="M10 20h28" stroke={accent} strokeWidth="2" />
      <path d="M16 26h8M16 30h12" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M32 12l4-3 4 3v4h-8v-4z" stroke={accent} strokeWidth="1.75" strokeLinejoin="round" />
    </svg>
  );
}

/** Impact: lives impacted */
export function LivesImpactIcon({ accent = '#f97316', className, ...props }: IconProps) {
  return (
    <svg {...defaults} className={className} {...props}>
      <path d="M24 38V22" stroke={accent} strokeWidth="2" strokeLinecap="round" />
      <path d="M24 22c-4-6-10-6-10-2s4 8 10 14c6-6 10-10 10-14s-6-4-10 2z" stroke={accent} strokeWidth="2" strokeLinejoin="round" />
      <path d="M18 10c2-3 6-3 6 0M30 12c1-2 4-2 5 0" stroke={accent} strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

/** Impact: partners */
export function PartnersImpactIcon({ accent = '#ec4899', className, ...props }: IconProps) {
  return (
    <svg {...defaults} className={className} {...props}>
      <circle cx="16" cy="24" r="6" stroke={accent} strokeWidth="2" />
      <circle cx="32" cy="24" r="6" stroke={accent} strokeWidth="2" />
      <path d="M22 24h4" stroke={accent} strokeWidth="2" strokeLinecap="round" />
      <path d="M24 20v8" stroke={accent} strokeWidth="2" strokeLinecap="round" />
      <path d="M12 34l4-6M36 34l-4-6" stroke={accent} strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

/** Vogdaburi community center */
export function CommunityCenterIcon({ accent = '#0ea5e9', className, ...props }: IconProps) {
  return (
    <svg {...defaults} className={className} {...props}>
      <path d="M24 8L8 20v18h32V20L24 8z" stroke={accent} strokeWidth="2" strokeLinejoin="round" />
      <path d="M20 38V28h8v10" stroke={accent} strokeWidth="2" strokeLinejoin="round" />
      <path d="M16 24h16M16 30h10" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M24 8v4" stroke={accent} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
