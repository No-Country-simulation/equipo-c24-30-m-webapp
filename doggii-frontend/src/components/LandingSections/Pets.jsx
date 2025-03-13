import VerticalCardLanding from "../Cards/VerticalCardLanding";

const Pets = () => {

  return (
    <section id="pets" className="px-10 py-20 scroll-mt-65 lg:scroll-mt-25">
      <h2 className="text-4xl text-center font-medium mb-5 lg:text-5xl">
        ¡Estos peluditos buscan hogar!
      </h2>
      <p className="mb-5 text-xl text-center">Descubrí qué mascotas que buscan un hogar. Escribí tu ciudad para buscar mascotas cercanas.</p>
      <div className="sm:px-10 md:px-20 lg:px-30 mb-10 flex justify-end">
        <input
            id='search'
            type='text'
            placeholder='🔍  Buscar'
            className='w-60 h-10 rounded-md shadow-xl focus:ring focus:ring-opacity-75 bg-(--accent) border-2 border-(--secondary) font-light pl-4'
          />
      </div>
      <div className="flex flex-wrap justify-center gap-30">
        <VerticalCardLanding image='src/assets/images/tobi.jpg' title='Tobi' description='Córdoba'/>
        <VerticalCardLanding image='src/assets/images/buggi.jpg' title='Buggi' description='Mar del Plata'/>
        <VerticalCardLanding image='src/assets/images/ambar.jpg' title='Ambar' description='Córdoba'/>
      </div>

    </section>
  )
};

export default Pets;