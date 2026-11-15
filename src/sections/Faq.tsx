import { useState } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { faqs } from '../content/site';
import { Reveal, SectionHead } from '../components/ui';

const EASE = [0.16, 1, 0.3, 1] as const;

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section className="section faq" id="preguntas" aria-labelledby="faq-title">
      <div className="container">
        <SectionHead index="07" label="Preguntas" />

        <div className="faq-grid">
          <div className="faq-intro">
            <Reveal>
              <h2 className="display" id="faq-title">
                Antes de
                <br />
                <em>la primera cita.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p>
                Si tu duda no aparece aquí, escríbenos. Responder forma parte de nuestro
                trabajo, aunque todavía no seas paciente.
              </p>
            </Reveal>
          </div>

          <ul className="faq-list">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
                <m.li
                  key={item.q}
                  className={`faq-item ${isOpen ? 'is-open' : ''}`}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-8% 0px' }}
                  transition={{ duration: 0.6, ease: EASE, delay: i * 0.03 }}
                >
                    <h3>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${i}`}
                        id={`faq-button-${i}`}
                        onClick={() => setOpen(isOpen ? null : i)}
                      >
                        <span className="faq-index">{String(i + 1).padStart(2, '0')}</span>
                        <span className="faq-q">{item.q}</span>
                        <span className="faq-icon" aria-hidden="true">
                          <Plus size={17} strokeWidth={1.6} />
                        </span>
                      </button>
                    </h3>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <m.div
                          id={`faq-panel-${i}`}
                          role="region"
                          aria-labelledby={`faq-button-${i}`}
                          className="faq-panel"
                          initial={reduce ? false : { height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: EASE }}
                        >
                          <p>{item.a}</p>
                        </m.div>
                      )}
                    </AnimatePresence>
                </m.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
