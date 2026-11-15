import { useRef, useState } from 'react';
import {
  AnimatePresence,
  m,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { services, waLink } from '../content/site';
import { Reveal, SectionHead, SmartImage } from '../components/ui';

const EASE = [0.16, 1, 0.3, 1] as const;

export function Services() {
  const [hovered, setHovered] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLUListElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 160, damping: 22, mass: 0.3 });
  const y = useSpring(my, { stiffness: 160, damping: 22, mass: 0.3 });

  const active = hovered !== null ? services[hovered] : null;

  return (
    <section className="section services" id="tratamientos" aria-labelledby="tratamientos-title">
      <div className="container">
        <SectionHead index="02" label="Tratamientos" />

        <div className="services-grid">
          <div className="services-intro">
            <Reveal>
              <h2 className="display" id="tratamientos-title">
                Precisión clínica.
                <br />
                <em>Sensibilidad estética.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="services-lead">
                Cada tratamiento empieza con una valoración honesta. Si algo no es necesario,
                te lo decimos; si hay alternativas, las verás explicadas.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="provisional services-note">
                Información orientativa. La indicación de cada tratamiento se confirma tras
                una valoración personalizada.
              </p>
            </Reveal>
          </div>

          <ul
            className="services-list"
            ref={listRef}
            onPointerMove={(e) => {
              if (e.pointerType !== 'mouse') return;
              const px = Math.min(e.clientX + 28, window.innerWidth - 268);
              const py = Math.max(16, Math.min(e.clientY - 205, window.innerHeight - 340));
              mx.set(px);
              my.set(py);
            }}
            onPointerLeave={() => setHovered(null)}
          >
            {services.map((s, i) => (
              <m.li
                key={s.id}
                className="service-row"
                onPointerEnter={(e) => {
                  if (e.pointerType === 'mouse') setHovered(i);
                }}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-12% 0px' }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.04 }}
              >
                <a
                  className="service-link"
                  href={waLink(`Hola DENTEA, me interesa el tratamiento de ${s.title.toLowerCase()}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="service-index" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="service-body">
                    <span className="service-title">{s.title}</span>
                    <span className="service-blurb">{s.blurb}</span>
                  </span>
                  <span className="service-arrow" aria-hidden="true">
                    <ArrowUpRight size={18} strokeWidth={1.6} />
                  </span>
                </a>
              </m.li>
            ))}
          </ul>
        </div>
      </div>

      {!reduce && (
        <AnimatePresence>
          {active && (
            <m.div
              className="service-preview"
              style={{ x, y }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35, ease: EASE }}
              aria-hidden="true"
            >
              <div className="service-preview-frame arch">
                <SmartImage
                  key={active.image}
                  name={active.image}
                  alt=""
                  sizes="260px"
                  objectPosition="center"
                />
              </div>
              <span className="service-preview-label">{active.title}</span>
            </m.div>
          )}
        </AnimatePresence>
      )}
    </section>
  );
}
