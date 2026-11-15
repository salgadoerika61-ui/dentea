import { useMemo, useRef, useState, type ReactNode } from 'react';
import { m, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { Star } from 'lucide-react';
import { images, type ImageName } from '../content/images';

const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <m.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </m.div>
  );
}

export function SmartImage({
  name,
  alt,
  sizes = '100vw',
  className = '',
  priority = false,
  objectPosition,
}: {
  name: ImageName;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
  objectPosition?: string;
}) {
  const asset = images[name];
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`smart-image ${loaded ? 'is-loaded' : ''} ${priority ? 'is-priority' : ''} ${className}`}
      style={{ backgroundImage: `url(${asset.lqip})` }}
    >
      <img
        src={asset.src}
        srcSet={asset.srcSet}
        sizes={sizes}
        width={asset.width}
        height={asset.height}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        style={objectPosition ? { objectPosition } : undefined}
      />
    </div>
  );
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M16 3.2c-7.4 0-12.3 5.7-12.3 12.6V29h5.6V16.1c0-4.4 2.6-7.4 6.7-7.4s6.7 3 6.7 7.4V29h5.6V15.8c0-6.9-4.9-12.6-12.3-12.6Z"
        fill="currentColor"
      />
      <circle cx="16" cy="23.4" r="2.1" fill="currentColor" opacity=".45" />
    </svg>
  );
}

export function SectionHead({
  index,
  label,
  className = '',
  light = false,
}: {
  index: string;
  label: string;
  className?: string;
  light?: boolean;
}) {
  return (
    <div className={`section-head ${light ? 'is-light' : ''} ${className}`}>
      <span className="section-index">{index}</span>
      <span className="section-rule" aria-hidden="true" />
      <span className="section-label">{label}</span>
    </div>
  );
}

export function Magnetic({
  children,
  strength = 6,
  className = '',
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 240, damping: 22, mass: 0.4 });
  const y = useSpring(my, { stiffness: 240, damping: 22, mass: 0.4 });

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <m.div
      ref={ref}
      className={className}
      style={{ x, y, display: 'inline-flex' }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width - 0.5) * strength * 2);
        my.set(((e.clientY - r.top) / r.height - 0.5) * strength * 2);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      {children}
    </m.div>
  );
}

export function ReservedStars({ label }: { label: string }) {
  const stars = useMemo(() => Array.from({ length: 5 }, (_, i) => i), []);
  return (
    <div className="reserved-stars" role="img" aria-label={label}>
      {stars.map((i) => (
        <Star key={i} size={15} strokeWidth={1.2} aria-hidden="true" />
      ))}
    </div>
  );
}
