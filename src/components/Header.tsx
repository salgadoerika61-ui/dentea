import { useEffect, useState } from 'react';
import { AnimatePresence, m, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import { ArrowUpRight, MessageCircle, X } from 'lucide-react';
import { nav, waLink, WHATSAPP_DISPLAY } from '../content/site';
import { Logo } from './ui';

const EASE = [0.16, 1, 0.3, 1] as const;

export function Header() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('inicio');
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();

  useMotionValueEvent(scrollY, 'change', (v) => setStuck(v > 16));

  useEffect(() => {
    const ids = ['inicio', ...nav.map((n) => n.href.slice(1))];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.1, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <header className={`site-header ${stuck ? 'is-stuck' : ''}`}>
        <div className="container header-inner">
          <a className="brand" href="#inicio" aria-label="DENTEA — volver al inicio">
            <Logo className="brand-mark" />
            <span className="brand-name">DENTEA</span>
          </a>

          <nav className="main-nav" aria-label="Navegación principal">
            {nav.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                className={active === item.href.slice(1) ? 'is-active' : undefined}
              >
                <span className="nav-num">{String(i + 1).padStart(2, '0')}</span>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <a
              className="btn btn-primary btn-sm header-cta"
              href={waLink('Hola DENTEA, me gustaría agendar una cita.')}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Agendar cita</span>
              <ArrowUpRight size={15} strokeWidth={1.8} />
            </a>
            <button
              type="button"
              className={`menu-btn ${open ? 'is-open' : ''}`}
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            initial={reduce ? false : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="mobile-menu-top container">
              <span className="brand">
                <Logo className="brand-mark" />
                <span className="brand-name">DENTEA</span>
              </span>
              <button
                type="button"
                className="menu-close"
                onClick={() => setOpen(false)}
                aria-label="Cerrar menú"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            <nav className="mobile-nav container" aria-label="Navegación móvil">
              {nav.map((item, i) => (
                <m.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 + i * 0.06, duration: 0.7, ease: EASE }}
                >
                  <span className="nav-num">{String(i + 1).padStart(2, '0')}</span>
                  {item.label}
                </m.a>
              ))}
            </nav>

            <div className="mobile-menu-foot container">
              <a
                className="btn btn-primary"
                href={waLink('Hola DENTEA, me gustaría agendar una cita.')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
                <MessageCircle size={17} strokeWidth={1.7} />
                Agendar por WhatsApp
              </a>
              <p className="provisional">
                WhatsApp provisional · {WHATSAPP_DISPLAY}
              </p>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
