import HorizontalCardLanding from '../Cards/HorizontalCardLanding';

const Testimonials = () => {

  return (
    <section id='testimonials' className="px-10 py-20 scroll-mt-65 lg:scroll-mt-25">
      <h2 className="text-4xl text-center font-medium mb-5 lg:text-5xl">
        Testimonios
      </h2>
      <p className="mb-10 text-xl text-center">Nada habla mejor de la adopción que las historias reales. Conocé a quienes encontraron en una mascota un amigo para toda la vida.</p>
      <div className="flex flex-wrap font-light italic justify-center gap-30">
        <HorizontalCardLanding image='src/assets/images/matias-polo.jpg' title='Matías y Polo' text='"Cuando vi la foto de Polo, supe que tenía que conocerlo. Gracias a DOGGII, me puse en contacto con el refugio y en pocos días ya estaba en casa. Es el perro más cariñoso del mundo y le ha dado una nueva luz a mi hogar. ¡Adoptar fue la mejor decisión!"'/>
        <HorizontalCardLanding image='src/assets/images/paula-menta.jpg' title='Paula y Menta' text='"Siempre quise adoptar, pero no sabía por dónde empezar. Gracias a DOGGII, encontré a Menta, una perrita rescatada que ahora es mi mejor amiga. El proceso fue claro y rápido, y el refugio nos acompañó en cada paso. No puedo imaginar mi vida sin ella."'/>
      </div>
    </section>
  )
};

export default Testimonials;