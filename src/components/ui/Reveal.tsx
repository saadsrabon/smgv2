import type { ElementType, ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';

type RevealProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: 'none' | 'sm' | 'md' | 'lg';
};

const delayClass = {
  none: '',
  sm: 'reveal-delay-sm',
  md: 'reveal-delay-md',
  lg: 'reveal-delay-lg',
} as const;

export function Reveal({ as: Tag = 'div', children, className = '', delay = 'none' }: RevealProps) {
  const { ref, inView } = useInView();

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${inView ? 'reveal-visible' : ''} ${delayClass[delay]} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
  fontClass = '',
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'center' | 'left';
  className?: string;
  fontClass?: string;
}) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';
  return (
    <header className={`section-header max-w-3xl ${alignClass} ${className}`}>
      {eyebrow ? <p className={`section-eyebrow ${fontClass}`}>{eyebrow}</p> : null}
      <h2 className={`section-title ${fontClass}`}>{title}</h2>
      {description ? <p className={`section-lead ${fontClass}`}>{description}</p> : null}
    </header>
  );
}
