import petDataMock from '../../../test/petsDataMock.json';

const PetDetails = () => {
  const pet = petDataMock[1];
  const age = pet.age.years > 0 ? `${pet.age.years} años ` : 
              (pet.age.months > 0 ? `${pet.age.months} meses ` :
              (pet.age.days > 0 ? `${pet.age.days} días` : ''));

  return (
    <div>
      <h2>{pet.name}</h2>
      <div className='p-8 grid lg:grid-cols-3 sm:grid-cols-1 gap-10'>
        <div className='col-span-1'>
          <img src={pet.photo} alt={pet.name} className='w-full'/>
        </div>
        <div className='col-span-2'>
          <p>
            <span>Sexo: </span>
            <span>{pet.sex}</span>
          </p>
          <p>
            <span>Edad: </span>
            <span>{age}</span>
          </p>
          <p>
            <span>Tamaño: </span>
            <span>{pet.size}</span>
          </p>
          <p>
            <span>Vacunación: </span>
            <span>{pet.vaccinated ? 'Al día' : 'Faltan vacunas'}</span>
          </p>
          <p>
            <span>Castración: </span>
            <span>{pet.neutered ? (pet.sex === 'macho' ? 'Castrado' : 'Castrada') : 'Pendiente'}</span>
          </p>
          {pet.specialCare && (
            <p>
              <span>Cuidados especiales: </span>
              <span>{pet.specialCare}</span>
            </p>
          )}
          <p>
            <span>Descripción: </span>
            <span>{pet.description}</span>
          </p>
          <p>
            <span>Refugio: </span>
            <span>{pet.shelterName}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default PetDetails;