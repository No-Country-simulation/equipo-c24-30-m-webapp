

const Working = () => {

  return (
    <section id="how-it-works" className="p-10 scroll-mt-65 lg:scroll-mt-25">
      <h2 className="text-4xl text-center font-medium mb-10 lg:text-5xl">
        ¿Cómo funciona <span className="text-(--secondary-dark)">DOGGII</span>?
      </h2>
      <div className="flex flex-col sm:flex-row justify-center gap-20">
        <div className="max-w-80 lg:max-w-100 bg-(--secondary-light) rounded-xl shadow-xl p-6">
          <h3 className="text-center mb-2">SI QUERÉS <span className="font-bold">ADOPTAR</span>:</h3>
          <ol className="list-decimal pl-6 font-light">
            <li>Explorá las mascotas disponibles.</li>
            <li>Completá un formulario con tus datos.</li>
            <li>Comunicate con el refugio para programar entrevistas y visitas.</li>
            <li>Dale un hogar a tu nuevo amigo.</li>
          </ol>
        </div>
        <div className="max-w-80 lg:max-w-100 bg-(--secondary-light) rounded-xl shadow-xl p-6">
          <h3 className="text-center mb-2">SI QUERÉS <span className="font-bold">DAR EN ADOPCIÓN</span>:</h3>
          <ol className="list-decimal pl-6 font-light">
            <li>Publicá tu mascota.</li>
            <li>Recibí solicitudes de adopción.</li>
            <li>Comunicate con los posibles adoptantes entrevistas y visitas.</li>
            <li>Conseguí un nuevo hogar para la mascota.</li>
          </ol>
        </div>
      </div>
    </section>
  )
};

export default Working;