import { useRef } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { gallery, waLink } from '../content/site';
import { Reveal, SectionHead, SmartImage } from '../components/ui';

function GalleryFigure({
  image,
  caption,
  className,
  sizes,
  alt,
  offset,
}: {
  image: (typeof gallery)[number]['image'];
  caption: string;
  className: string;
  sizes: string;
  alt: string;
  offset: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [offset, reduce ? offset : -offset]);

  return (
    <figure className={`gallery-item ${className}`} ref={ref}>
      <m.div className="gallery-media" style={{ y }}>
        <SmartImage name={image} alt={alt} sizes={sizes} />
      </m.div>
      <figcaption>
        <span>{caption}</span>
        <span className="gallery-plus" aria-hidden="true">
          +
        </span>
      </figcaption>
    </figure>
  );
}

export function Clinic() {
  return (
    <section className="section clinic" id="clinica" aria-labelledby="clinica-title">
      <div className="container">
        <SectionHead index="04" label="La clínica" />

        <div className="clinic-head">
          <Reveal>
            <h2 className="display" id="clinica-title">
              Luz, madera
              <br />
              <em>y silencio.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="clinic-head-text">
            <p>
              Un espacio diseñado para bajar el ritmo: materiales cálidos, luz natural y
              circulaciones claras. Nada que gritar. Todo lo necesario para que te sientas
              en calma desde la primera visita.
            </p>
            <a
              className="link-arrow"
              href={waLink('Hola DENTEA, me gustaría concertar una visita para conocer la clínica.')}
              target="_blank"
              rel="noopener noreferrer"
            >
              Solicitar una visita
              <ArrowUpRight size={16} strokeWidth={1.7} />
            </a>
          </Reveal>
        </div>

        <div className="gallery">
          <GalleryFigure
            image="clinic-2"
            caption="Sala de espera"
            className="g1"
            sizes="(max-width: 900px) 92vw, 52vw"
            alt="Sala de espera de la clínica dental (fotografía provisional)"
            offset={22}
          />
          <GalleryFigure
            image="clinic-1"
            caption="Consultorio"
            className="g2"
            sizes="(max-width: 900px) 60vw, 26vw"
            alt="Consultorio dental con sillón y luz natural (fotografía provisional)"
            offset={44}
          />
          <GalleryFigure
            image="clinic-3"
            caption="Detalle"
            className="g3"
            sizes="(max-width: 900px) 92vw, 34vw"
            alt="Detalle del equipamiento de la clínica (fotografía provisional)"
            offset={18}
          />
          <GalleryFigure
            image="detail"
            caption="Equipamiento"
            className="g4"
            sizes="(max-width: 900px) 92vw, 44vw"
            alt="Material clínico preparado para un tratamiento (fotografía provisional)"
            offset={30}
          />
        </div>

        <p className="gallery-note provisional">
          Imágenes de referencia. Las fotografías definitivas del espacio se incorporarán
          antes de publicar.
        </p>
      </div>
    </section>
  );
}
