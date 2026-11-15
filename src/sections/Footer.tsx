import { ArrowUp, ArrowUpRight, MessageCircle } from 'lucide-react';
import { BRAND, clinic, nav, WHATSAPP_DISPLAY, waLink } from '../content/site';
import { Logo } from '../components/ui';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <a className="brand" href="#inicio" aria-label={`${BRAND} — volver al inicio`}>
            <Logo className="brand-mark" />
            <span className="brand-name">{BRAND}</span>
          </a>
          <p className="footer-claim">
            Odontología estética y restaurativa.
            <br />
            {clinic.city}.
          </p>
          <a
            className="footer-wa"
            href={waLink('Hola DENTEA, me gustaría agendar una cita.')}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={16} strokeWidth={1.7} />
            WhatsApp
            <ArrowUpRight size={14} strokeWidth={1.7} />
          </a>
          <p className="footer-provisional">Provisional · {WHATSAPP_DISPLAY}</p>
        </div>

        <nav className="footer-nav" aria-label="Navegación del pie de página">
          <span className="footer-eyebrow">Explorar</span>
          <ul>
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href}>{n.label}</a>
              </li>
            ))}
            <li>
              <a href="#cita">Agendar cita</a>
            </li>
          </ul>
        </nav>

        <div className="footer-contact">
          <span className="footer-eyebrow">Visítanos</span>
          <p>
            {clinic.address}
            <span className="tag">Provisional</span>
          </p>
          <p>
            {clinic.hours}
            <span className="tag">Provisional</span>
          </p>
          <p>
            {clinic.email}
            <span className="tag">Provisional</span>
          </p>
        </div>

        <div className="footer-top-link">
          <a href="#inicio" className="to-top" aria-label="Volver arriba">
            <ArrowUp size={18} strokeWidth={1.6} />
          </a>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© 2026 {BRAND}. Todos los derechos reservados.</p>
        <p className="footer-disclaimer">
          Contenido provisional de demostración: textos, fotografías y datos de contacto deben
          validarse antes de publicar.
        </p>
        <div className="footer-legal">
          <span>Fotografías: Pexels / Unsplash</span>
          <span aria-hidden="true">·</span>
          <span>Aviso legal (pendiente)</span>
          <span aria-hidden="true">·</span>
          <span>Privacidad (pendiente)</span>
        </div>
      </div>
    </footer>
  );
}
