import PropTypes from 'prop-types';
import Button from "../Button";

const PetsTable = ({currentPetData}) => {

  return (
    <div className="container my-8 w-full min-w-6xl">
      <div className="overflow-x-auto rounded-md shadow-md">
        <table className="w-full p-6 text-left">
          <colgroup>
            <col className='w-1/11'/>
            <col className='w-1/11'/>
            <col className='w-1/11'/>
            <col className='w-1/11'/>
            <col className='w-1/11'/>
            <col className='w-1/11'/>
            <col className='w-1/11'/>
            <col className='w-2/11'/>
            <col className='w-1/11'/>
            <col className='w-1/11'/>
          </colgroup>
          <thead>
            <tr className="bg-(--secondary)">
              <th className="p-3 font-medium text-lg text-center">Foto</th>
              <th className="p-3 font-medium text-lg text-center">ID</th>
              <th className="p-3 font-medium text-lg text-center">Nombre</th>
              <th className="p-3 font-medium text-lg text-center">Sexo</th>
              <th className="p-3 font-medium text-lg text-center">Edad</th>
              <th className="p-3 font-medium text-lg text-center">Tamaño</th>
              <th className="p-3 font-medium text-lg text-center">Castrado</th>
              <th className="p-3 font-medium text-lg text-center">Cuidados especiales</th>
              <th className="p-3 font-medium text-lg text-center">Refugio</th>
              <th className="p-3 font-medium text-lg text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-gray-50 text-center">
            {currentPetData.map((pet) => (
              <tr key={pet.id} className="border-b border-gray-300">
                <td className="py-2">
                  <img src={pet.photo} alt="Foto del perro" className="w-15 h-15 m-4 object-cover rounded-full dark:bg-gray-500"/>
                </td>
                <td className="px-3 py-2">
                  <p>{pet.id}</p>
                </td>
                <td className="px-3 py-2">
                  <p>{pet.name}</p>
                </td>
                <td className="px-3 py-2">
                  <p>{pet.sex}</p>
                </td>
                <td className="px-3 py-2">
                    <p>{pet.age.days > 0 ? pet.age.days + " días" : ""}</p>
                    <p>{pet.age.months > 0 ? pet.age.months + " meses" : ""}</p>
                    <p>{pet.age.years > 0 ? pet.age.years + " años" : ""}</p>
                </td>
                <td className="px-3 py-2">
                  <p>{pet.size}</p>
                </td>
                <td className="px-3 py-2">
                  <p>{pet.neutered ? "Sí" : "No"}</p>
                </td>
                <td className="px-3 py-2">
                  <p>{pet.specialCare ? pet.specialCare : "-"}</p>
                </td>
                <td className="px-3 py-2">
                  <p>{pet.shelterName}</p>
                </td>
                <td className="px-3 py-2">
                  <Button className="w-20 h-7 m-2">Editar</Button>
                  <Button className="w-20 h-7 m-2">Eliminar</Button>
                </td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PetsTable;

PetsTable.propTypes = {
  currentPetData: PropTypes.array
}