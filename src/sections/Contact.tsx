import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { clinic, WHATSAPP_DISPLAY, waLink } from '../content/site';
import { Reveal, SectionHead } from '../components/ui';

export function Contact() {
  return (
    <section className="section contact" id="cita" aria-labelledby="cita-title">
      <div className="container">
        <div className="contact-panel">
          <div className="contact-glow" aria-hidden="true" />
          <SectionHead index="08" label="Empecemos" light />

          <div className="contact-grid">
            <div className="contact-copy">
              <Reveal>
                <h2 className="display light" id="cita-title">
                  Tu primera conversación
                  <br />
                  <em>no tiene prisa.</em>
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="contact-lead">
                  Cuéntanos qué te gustaría mejorar. Te responderemos por WhatsApp para
                  encontrar el momento que mejor te venga.
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <div className="contact-actions">
                  <a
                    className="btn btn-light"
                    href={waLink('Hola DENTEA, me gustaría agendar una primera cita.')}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle size={17} strokeWidth={1.7} />
                    Escribir por WhatsApp
                  </a>
                  <a className="btn btn-outline-light" href="#preguntas">
                    Ver preguntas
                    <ArrowUpRight size={16} strokeWidth={1.6} />
                  </a>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="contact-provisional">
                  Número de WhatsApp provisional · {WHATSAPP_DISPLAY}
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.12} className="contact-card-wrap">
              <div className="contact-card">
                <span className="contact-card-eyebrow">Datos de la clínica</span>

                <dl className="contact-list">
                  <div>
                    <dt>Dirección</dt>
                    <dd>
                      {clinic.address}
                      <span className="tag">Provisional</span>
                    </dd>
                  </div>
                  <div>
                    <dt>Ciudad</dt>
                    <dd>
                      {clinic.city}
                      <span className="tag">Provisional</span>
                    </dd>
                  </div>
                  <div>
                    <dt>Horario</dt>
                    <dd>
                      {clinic.hours}
                      <span className="tag">Provisional</span>
                    </dd>
                  </div>
                  <div>
                    <dt>Correo</dt>
                    <dd>
                      {clinic.email}
                      <span className="tag">Provisional</span>
                    </dd>
                  </div>
                </dl>

                <div className="contact-card-note">
                  <span className="dot" aria-hidden="true" />
                  <p>
                    Estos datos son marcadores de posición. Sustitúyelos por los reales antes
                    de publicar la web.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
