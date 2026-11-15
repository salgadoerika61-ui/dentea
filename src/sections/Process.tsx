import { useRef } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { process } from '../content/site';
import { Reveal, SectionHead } from '../components/ui';

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="section process" id="proceso" aria-labelledby="proceso-title">
      <div className="container">
        <SectionHead index="05" label="El proceso" />

        <div className="process-head">
          <Reveal>
            <h2 className="display" id="proceso-title">
              Cuatro pasos,
              <br />
              <em>ninguna sorpresa.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p>
              Sabemos lo que es sentarse en un sillón sin entender qué va a pasar. Nuestro
              proceso está pensado para que siempre sepas dónde estás y qué viene después.
            </p>
          </Reveal>
        </div>

        <div className="process-track" ref={ref}>
          <div className="process-line" aria-hidden="true">
            <m.div className="process-line-fill" style={{ scaleX: reduce ? 1 : lineScale }} />
          </div>

          <ol className="process-list">
            {process.map((p, i) => (
              <li key={p.step} className="process-step">
                <Reveal delay={i * 0.08} y={18}>
                  <span className="process-dot" aria-hidden="true">
                    <span />
                  </span>
                  <span className="process-num">{p.step}</span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
