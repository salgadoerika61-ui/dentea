import { useRef } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, MessageCircle } from 'lucide-react';
import { waLink } from '../content/site';
import { Magnetic, SmartImage } from './ui';

const EASE = [0.16, 1, 0.3, 1] as const;

const lines = [
  [{ text: 'El arte de' }],
  [{ text: 'una sonrisa' }],
  [{ text: 'natural', em: true }, { text: '.' }],
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const frameY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 70]);
  const insetY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -40]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, reduce ? 1 : 0.35]);

  return (
    <section className="hero" id="inicio" ref={ref} aria-labelledby="hero-title">
      <div className="hero-glow" aria-hidden="true" />

      <div className="container hero-inner">
        <div className="hero-copy">
          <m.p
            className="eyebrow"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          >
            <span className="eyebrow-dot" aria-hidden="true" />
            Clínica dental · Estética y salud oral
          </m.p>

          <h1 className="hero-title" id="hero-title">
            {lines.map((line, li) => (
              <span className="line" key={li}>
                <m.span
                  className="line-inner"
                  initial={reduce ? false : { y: '112%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.15, ease: EASE, delay: 0.22 + li * 0.09 }}
                >
                  {line.map((part, pi) => (
                    <span key={pi} className={part.em ? 'serif-em' : undefined}>
                      {part.text}
                    </span>
                  ))}
                </m.span>
              </span>
            ))}
          </h1>

          <m.p
            className="hero-sub"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.62 }}
          >
            Odontología estética y restaurativa en un espacio sereno, preciso y hecho a tu
            medida. Escuchamos primero. Diseñamos después.
          </m.p>

          <m.div
            className="hero-actions"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.74 }}
          >
            <Magnetic>
              <a
                className="btn btn-primary"
                href={waLink('Hola DENTEA, me gustaría agendar una cita.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={17} strokeWidth={1.7} />
                Agendar por WhatsApp
              </a>
            </Magnetic>
            <a className="btn btn-ghost" href="#filosofia">
              Descubrir DENTEA
              <ArrowDown size={16} strokeWidth={1.7} />
            </a>
          </m.div>

          <m.ul
            className="hero-facts"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <li>Atención con cita previa</li>
            <li>Planificación digital</li>
            <li>Seguimiento cercano</li>
          </m.ul>
        </div>

        <div className="hero-visual">
          <m.div
            className="hero-frame"
            style={{ y: frameY, opacity: fade }}
            initial={reduce ? false : { scale: 1.04 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, ease: EASE, delay: 0.05 }}
          >
            <SmartImage
              name="hero-main"
              alt="Interior luminoso de un consultorio dental moderno (fotografía provisional)"
              sizes="(max-width: 900px) 92vw, 46vw"
              priority
            />
            <span className="hero-tag">
              <span className="dot" aria-hidden="true" />
              Solo con cita previa
            </span>
            <span className="hero-frame-index" aria-hidden="true">
              D · 01
            </span>
          </m.div>

          <m.div
            className="hero-inset"
            style={{ y: insetY }}
            initial={reduce ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.55 }}
          >
            <div className="hero-inset-inner arch">
              <SmartImage
                name="hero-inset"
                alt="Sillón dental y equipamiento de la clínica (fotografía provisional)"
                sizes="(max-width: 900px) 38vw, 17vw"
                priority
              />
            </div>
            <span className="hero-inset-label">Estudio · Detalle</span>
          </m.div>

          <m.p
            className="hero-credit"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            Imágenes provisionales
          </m.p>
        </div>
      </div>

      <m.a
        className="scroll-cue"
        href="#filosofia"
        aria-label="Bajar a filosofía"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
      >
        <span>Descubre</span>
        <span className="scroll-cue-line" aria-hidden="true" />
      </m.a>
    </section>
  );
}
