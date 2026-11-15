export const BRAND = 'DENTEA';

/**
 * ⚠️ CONTENIDO PROVISIONAL
 * El número de WhatsApp es un marcador de posición. Sustitúyelo por el número
 * real de la clínica (formato internacional, sin "+" ni espacios) antes de publicar.
 */
export const WHATSAPP_NUMBER = '000000000000';
export const WHATSAPP_DISPLAY = '+00 000 000 000';

export const clinic = {
  claim: 'Odontología estética y restaurativa',
  city: 'Ciudad por confirmar',
  address: 'Dirección por confirmar',
  hours: 'Horario por confirmar',
  email: 'hola@dentea.example',
};

export function waLink(message = 'Hola DENTEA, me gustaría agendar una cita.') {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const nav = [
  { label: 'Filosofía', href: '#filosofia' },
  { label: 'Tratamientos', href: '#tratamientos' },
  { label: 'Clínica', href: '#clinica' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Preguntas', href: '#preguntas' },
] as const;

export const ticker = [
  'Diseño de sonrisa',
  'Ortodoncia invisible',
  'Implantes',
  'Estética dental',
  'Higiene avanzada',
  'Odontopediatría',
  'Prótesis',
  'Endodoncia',
];

export type Service = {
  id: string;
  title: string;
  blurb: string;
  detail: string;
  image: 'clinic-2' | 'clinic-1' | 'clinic-3' | 'hero-main' | 'detail' | 'care';
  icon: 'sparkles' | 'align' | 'implant' | 'gem' | 'shield' | 'child';
};

export const services: Service[] = [
  {
    id: 'diseno',
    title: 'Diseño de sonrisa',
    blurb: 'Armonía, proporción y naturalidad en cada detalle.',
    detail: 'Planificamos la forma, el color y la posición de tus dientes a partir de tu rostro, no de un modelo genérico.',
    image: 'clinic-2',
    icon: 'sparkles',
  },
  {
    id: 'ortodoncia',
    title: 'Ortodoncia invisible',
    blurb: 'Alineación discreta, planificada digitalmente.',
    detail: 'Alternativas transparentes o estéticas para corregir la posición dental con seguimiento cercano.',
    image: 'clinic-1',
    icon: 'align',
  },
  {
    id: 'implantes',
    title: 'Implantes dentales',
    blurb: 'Recuperar función sin renunciar a la estética.',
    detail: 'Valoramos hueso, encía y oclusión antes de proponer un plan quirúrgico y protésico a medida.',
    image: 'hero-main',
    icon: 'implant',
  },
  {
    id: 'estetica',
    title: 'Estética dental',
    blurb: 'Carillas, blanqueamiento y mínima intervención.',
    detail: 'Buscamos el cambio más pequeño posible con el mayor impacto real. Sin excesos ni blancos imposibles.',
    image: 'clinic-3',
    icon: 'gem',
  },
  {
    id: 'prevencion',
    title: 'Higiene y prevención',
    blurb: 'La base silenciosa de toda sonrisa sana.',
    detail: 'Revisiones, higiene profunda y pautas personalizadas para que el resultado se mantenga en el tiempo.',
    image: 'detail',
    icon: 'shield',
  },
  {
    id: 'infantil',
    title: 'Odontopediatría',
    blurb: 'Primeras visitas en un entorno amable.',
    detail: 'Acompañamos a los más pequeños sin prisas, con lenguaje claro y un espacio que no asusta.',
    image: 'care',
    icon: 'child',
  },
];

export const values = [
  { title: 'Diagnóstico honesto', text: 'Tratamos lo necesario, no lo posible.' },
  { title: 'Estética conservadora', text: 'Respetamos la estructura y el carácter de tu sonrisa.' },
  { title: 'Seguimiento cercano', text: 'Un equipo que recuerda tu caso y tu nombre.' },
];

export const benefits = [
  {
    title: 'Tiempo real',
    text: 'Consultas sin prisas: escuchar forma parte del diagnóstico.',
  },
  {
    title: 'Explicaciones claras',
    text: 'Entiendes qué tienes, qué opciones hay y por qué te lo proponemos.',
  },
  {
    title: 'Planificación digital',
    text: 'Registros y simulaciones para decidir con precisión antes de empezar.',
  },
  {
    title: 'Un espacio que calma',
    text: 'Luz natural, materiales cálidos y silencio. La calma también es clínica.',
  },
];

export const process = [
  {
    step: '01',
    title: 'Conversación inicial',
    text: 'Nos cuentas qué te trae, qué te gustaría cambiar y qué te preocupa. Sin compromiso.',
  },
  {
    step: '02',
    title: 'Diagnóstico',
    text: 'Exploración, registros y una lectura honesta de tu salud oral.',
  },
  {
    step: '03',
    title: 'Plan a medida',
    text: 'Prioridades, alternativas y tiempos explicados con claridad y por escrito.',
  },
  {
    step: '04',
    title: 'Acompañamiento',
    text: 'Revisiones y cuidado continuo para que el resultado dure.',
  },
];

export const faqs = [
  {
    q: '¿Cómo pido una cita?',
    a: 'Escríbenos por WhatsApp y te propondremos los horarios disponibles. Es la vía más rápida para empezar; no atendemos sin cita previa.',
  },
  {
    q: '¿Qué incluye la primera visita?',
    a: 'Una conversación sobre tus objetivos, una revisión de tu salud oral y una orientación inicial. El alcance y la duración se confirman al agendar, según tu caso.',
  },
  {
    q: '¿Puedo hacerme estética dental sin revisar primero mi salud oral?',
    a: 'No. Antes de cualquier tratamiento estético valoramos encías, oclusión y estructura dental. La estética sin salud no se sostiene en el tiempo.',
  },
  {
    q: '¿Y si tengo miedo al dentista?',
    a: 'Es más común de lo que parece. Explicamos cada paso, acordamos señales de pausa y ajustamos el ritmo. Puedes decírnoslo al pedir la cita.',
  },
  {
    q: '¿Atendéis urgencias?',
    a: 'Consúltanos por WhatsApp. Según la disponibilidad del momento, te daremos una cita lo antes posible o te orientaremos sobre cómo actuar.',
  },
  {
    q: '¿Los tratamientos tienen garantía?',
    a: 'Cada caso tiene condiciones distintas. Las explicamos por escrito antes de empezar; no publicamos garantías genéricas que puedan inducir a error.',
  },
  {
    q: '¿Trabajáis con niños?',
    a: 'Sí, en odontopediatría. La primera visita se plantea como una toma de contacto tranquila, sin tratamientos innecesarios.',
  },
  {
    q: '¿Cómo se gestionan los pagos?',
    a: 'Te informamos de las opciones disponibles al preparar tu plan. No publicamos precios porque dependen de cada diagnóstico.',
  },
];

export const gallery = [
  { image: 'clinic-2', caption: 'Sala de espera', span: 'wide' },
  { image: 'clinic-1', caption: 'Consultorio', span: 'tall' },
  { image: 'clinic-3', caption: 'Detalle', span: 'square' },
  { image: 'detail', caption: 'Equipamiento', span: 'wide' },
] as const;
