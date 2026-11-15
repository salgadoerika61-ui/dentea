import { useRef } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { values } from '../content/site';
import { Reveal, SectionHead, SmartImage } from '../components/ui';

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], [40, reduce ? 40 : -40]);

  return (
    <section className="section manifesto" id="filosofia" aria-labelledby="filosofia-title">
      <div className="container">
        <SectionHead index="01" label="Filosofía" />

        <div className="manifesto-grid">
          <div className="manifesto-copy">
            <Reveal>
              <h2 className="display" id="filosofia-title">
                Una sonrisa no se impone.
                <br />
                <em>Se estudia, se cuida y se revela.</em>
              </h2>
            </Reveal>

            <div className="manifesto-text">
              <Reveal delay={0.08}>
                <p>
                  Trabajamos con una idea sencilla: la mejor sonrisa es la que sigue siendo
                  tuya. Por eso empezamos escuchando, medimos dos veces y tratamos solo lo
                  necesario.
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <p>
                  Un equipo pequeño, tiempos de consulta reales y un espacio pensado para que
                  venir al dentista deje de parecer un trámite.
                </p>
              </Reveal>
            </div>

            <ul className="values">
              {values.map((v, i) => (
                <li className="value" key={v.title}>
                  <Reveal delay={0.1 + i * 0.06} className="value-inner" y={14}>
                    <span className="value-index">{String(i + 1).padStart(2, '0')}</span>
                    <span>
                      <strong>{v.title}</strong>
                      <span className="value-text">{v.text}</span>
                    </span>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>

          <div className="manifesto-media" ref={ref}>
            <m.div className="manifesto-image" style={{ y: imageY }}>
              <SmartImage
                name="care"
                alt="Profesional dental atendiendo a un paciente (fotografía provisional)"
                sizes="(max-width: 900px) 90vw, 34vw"
              />
            </m.div>
            <div className="manifesto-quote">
              <span className="quote-mark" aria-hidden="true">
                “
              </span>
              <p>Menos intervención. Más intención.</p>
              <span className="quote-sign">— Filosofía DENTEA</span>
            </div>
            <p className="media-note">Fotografía provisional</p>
          </div>
        </div>
      </div>
    </section>
  );
}
