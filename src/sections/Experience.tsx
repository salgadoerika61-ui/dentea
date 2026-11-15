import { useRef } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { benefits } from '../content/site';
import { Reveal, SectionHead, SmartImage } from '../components/ui';

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], [30, reduce ? 30 : -30]);

  return (
    <section className="section experience" aria-labelledby="experiencia-title">
      <div className="container">
        <div className="experience-panel">
          <div className="experience-glow" aria-hidden="true" />
          <SectionHead index="03" label="La experiencia" light />

          <div className="experience-grid">
            <div className="experience-copy">
              <Reveal>
                <h2 className="display light" id="experiencia-title">
                  Un ritmo distinto,
                  <br />
                  <em>desde que entras.</em>
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="experience-lead">
                  La tecnología solo tiene sentido si hace la experiencia más humana. Aquí
                  se nota en los detalles: menos ruido, más tiempo y explicaciones que se
                  entienden.
                </p>
              </Reveal>

              <ul className="benefits">
                {benefits.map((b, i) => (
                  <li key={b.title}>
                    <Reveal delay={0.06 * i} y={16} className="benefit-inner">
                      <span className="benefit-num">{String(i + 1).padStart(2, '0')}</span>
                      <span>
                        <strong>{b.title}</strong>
                        <span className="benefit-text">{b.text}</span>
                      </span>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>

            <div className="experience-media" ref={ref}>
              <m.div className="experience-frame" style={{ y: imageY }}>
                <div className="arch arch-light">
                  <SmartImage
                    name="smile"
                    alt="Sonrisa natural de una persona (imagen ilustrativa)"
                    sizes="(max-width: 900px) 80vw, 30vw"
                  />
                </div>
              </m.div>
              <span className="experience-caption">Imagen ilustrativa</span>
              <span className="experience-seal" aria-hidden="true">
                <span>DENTEA</span>
                <small>clínica dental</small>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
