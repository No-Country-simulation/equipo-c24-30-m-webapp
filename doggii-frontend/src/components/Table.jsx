import Button from "./Button";
import userDataMock from "../test/userDataMock.json"

const Table = () => {

  return (
    <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
      <div className="overflow-x-auto">
        <table className="w-full p-6 text-xs text-left whitespace-nowrap">
          <colgroup>
            <col className="w-5" />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col className="w-5" />
          </colgroup>
          <thead>
            <tr className="dark:bg-gray-300">
              <th className="p-3">Nombre</th>
              <th className="p-3">Tipo de usuario</th>
              <th className="p-3">Asociación</th>
              <th className="p-3">Telefono</th>
              <th className="p-3">Correo electrónico</th>
              <th className="p-3">Dirección</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody className="dark:bg-gray-50">
            {userDataMock.map((user, index) => (
              <tr key={index} className="border-b dark:border-gray-300">
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

export default Table;