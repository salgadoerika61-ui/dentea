import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { SectionHead, Reveal, ReservedStars } from '../components/ui';
import { waLink } from '../content/site';

export function Testimonials() {
  return (
    <section className="section testimonials" aria-labelledby="confianza-title">
      <div className="container">
        <SectionHead index="06" label="Confianza" />

        <div className="testimonials-grid">
          <div className="testimonials-copy">
            <Reveal>
              <h2 className="display" id="confianza-title">
                Las historias
                <br />
                <em>se escriben con tiempo.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p>
                Todavía no publicamos reseñas. Preferimos dejar el espacio vacío antes que
                inventar voces que no existen. Cuando nuestros pacientes quieran compartir su
                experiencia, aparecerán aquí, verificadas.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <a
                className="link-arrow"
                href={waLink('Hola DENTEA, me gustaría conocer la clínica antes de agendar.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                Conocer DENTEA
                <ArrowUpRight size={16} strokeWidth={1.7} />
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="review-wrap">
            <div className="review-card">
              <span className="review-tag">Sección reservada</span>
              <span className="review-quote" aria-hidden="true">
                “
              </span>
              <p className="review-text">Tu historia podría estar aquí.</p>
              <div className="review-foot">
                <ReservedStars label="Valoración pendiente de reseñas verificadas" />
                <span className="review-status">
                  Pendiente de verificación
                </span>
              </div>
              <div className="review-divider" aria-hidden="true" />
              <p className="review-note">
                No mostramos testimonios, cifras ni certificaciones que no podamos acreditar.
                Este espacio se activará al integrar reseñas reales.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="trust-strip">
          <a
            className="trust-cta"
            href={waLink('Hola DENTEA, me gustaría resolver una duda antes de agendar.')}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="trust-icon" aria-hidden="true">
              <MessageCircle size={18} strokeWidth={1.6} />
            </span>
            <span>
              <strong>¿Prefieres preguntarnos directamente?</strong>
              <span>Te respondemos por WhatsApp, sin compromiso.</span>
            </span>
            <ArrowUpRight size={18} strokeWidth={1.6} className="trust-arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}
