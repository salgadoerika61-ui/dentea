import { useEffect, useState } from 'react';
import {
  AnimatePresence,
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { waLink } from '../content/site';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return <m.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

export function WhatsAppFab() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();

  useMotionValueEvent(scrollY, 'change', (v) => setVisible(v > 520));

  useEffect(() => {
    setVisible(window.scrollY > 520);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <m.a
          className="wa-fab"
          href={waLink('Hola DENTEA, me gustaría agendar una cita.')}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Agendar cita por WhatsApp"
          initial={reduce ? false : { opacity: 0, y: 18, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.94 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="wa-fab-ring" aria-hidden="true" />
          <MessageCircle size={22} strokeWidth={1.7} />
          <span className="wa-fab-label">Agendar cita</span>
        </m.a>
      )}
    </AnimatePresence>
  );
}
