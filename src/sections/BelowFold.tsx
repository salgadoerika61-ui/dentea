import { useEffect } from 'react';
import { Manifesto } from './Manifesto';
import { Services } from './Services';
import { Experience } from './Experience';
import { Clinic } from './Clinic';
import { Process } from './Process';
import { Testimonials } from './Testimonials';
import { Faq } from './Faq';
import { Contact } from './Contact';
import { Footer } from './Footer';

/** Deep links (#preguntas, #cita…) only exist once this bundle mounts. */
function HashScroll() {
  useEffect(() => {
    if (!window.location.hash) return;
    const id = decodeURIComponent(window.location.hash.slice(1));
    document.getElementById(id)?.scrollIntoView({ block: 'start' });
  }, []);
  return null;
}

/**
 * Everything below the first screen lives in a single lazy chunk so the hero
 * paints without waiting for the rest of the page to be parsed and rendered.
 */
export default function BelowFold() {
  return (
    <>
      <Manifesto />
      <Services />
      <Experience />
      <Clinic />
      <Process />
      <Testimonials />
      <Faq />
      <Contact />
      <HashScroll />
      <Footer />
    </>
  );
}
