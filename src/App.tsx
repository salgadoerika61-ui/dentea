import { Suspense, lazy, useEffect, useState } from 'react';
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import { Header } from './components/Header';
import { ScrollProgress, WhatsAppFab } from './components/Chrome';
import { Hero } from './components/Hero';
import { Ticker } from './sections/Ticker';

/* Everything below the first screen is split into one lazy chunk so the hero
   can paint before the rest of the page is parsed and rendered. */
const BelowFold = lazy(() => import('./sections/BelowFold'));

export default function App() {
  const [belowReady, setBelowReady] = useState(false);

  // Wait for the first screen to finish loading and painting before pulling in
  // the rest of the page, so the hero image and fonts get the bandwidth and
  // main thread first.
  useEffect(() => {
    let timer = 0;
    const mount = () => {
      timer = window.setTimeout(() => setBelowReady(true), 350);
    };
    if (document.readyState === 'complete') {
      mount();
    } else {
      window.addEventListener('load', mount, { once: true });
    }
    return () => {
      window.removeEventListener('load', mount);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        <ScrollProgress />
        <Header />
        <main id="contenido">
          <Hero />
          <Ticker />
          {belowReady && (
            <Suspense fallback={null}>
              <BelowFold />
            </Suspense>
          )}
        </main>
        <WhatsAppFab />
      </MotionConfig>
    </LazyMotion>
  );
}
