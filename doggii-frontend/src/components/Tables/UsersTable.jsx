import PropTypes from 'prop-types';
import Button from "../Button";

const UsersTable = ({currentUserData}) => {

  return (
    <div className="container my-8 w-full">
      <div className="overflow-x-auto rounded-md shadow-md">
        <table className="w-full p-6 text-left whitespace-nowrap">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr className="bg-(--secondary)">
              <th className="p-3 font-medium text-lg">Nombre</th>
              <th className="p-3 font-medium text-lg">Tipo de usuario</th>
              <th className="p-3 font-medium text-lg">Asociación</th>
              <th className="p-3 font-medium text-lg">Telefono</th>
              <th className="p-3 font-medium text-lg">Correo electrónico</th>
              <th className="p-3 font-medium text-lg">Dirección</th>
              <th className="p-3 font-medium text-lg">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-gray-50">
            {currentUserData.map((user, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="px-3 py-2">
                  <p>{user.userName}</p>
                </td>
                <td className="px-3 py-2">
                  <p>{user.userRole === "admin" 
                      ? "administrador" 
                      : user.userRole === "adopter" 
                        ? "adoptante" 
                        : user.userRole === "shelter" 
                          ? "refugio" 
                          : ""}
                  </p>
                </td>
                <td className="px-3 py-2">
                  <p>{user.shelterName ? user.shelterName : '-'}</p>
                </td>
                <td className="px-3 py-2">
                  <p>{user.phone}</p>
                </td>
                <td className="px-3 py-2">
                  <p>{user.email}</p>
                </td>
                <td className="px-3 py-2">
                  <p>
                    <span>{user.address.street}, </span>
                    <span>{user.address.city}</span>
                  </p>
                  <p>
                    <span>{user.address.province}, </span>
                    <span>{user.address.country}</span>
                  </p>
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

export default UsersTable;

UsersTable.propTypes = {
  currentUserData: PropTypes.array
}