import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../../../components/Button';

const ApplicationManage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { petData } = location.state || {};

  const [adopterInfo, setAdopterInfo] = useState(null);
  const [formAnswers, setFormAnswers] = useState([]);
  const [newStatus, setNewStatus] = useState('');
  const [updatedStatus, setUpdatedStatus] = useState(petData.payload.status);

    const translateStatus = (status) => {
    switch (status) {
      case 'Pending':
        return 'Pendiente';
      case 'Approved':
        return 'Aprobado';
      case 'Rejected':
        return 'Rechazado';
      default:
        return 'Cancelado';
    }
  };

  useEffect(() => {
    if (petData) {
      // Petición para obtener la información del adoptante a partir del id (petData.payload.adopter)
      const fetchAdopterInfo = async () => {
        try {
          const adopterEndpoint = `${import.meta.env.VITE_BACKEND_URI}/api/adopter/${petData.payload.adopter}`;
          const response = await axios.get(adopterEndpoint);
          if (response.data.success) {
            setAdopterInfo(response.data.payload);
          }
        } catch (error) {
          console.error('Error fetching adopter info:', error);
        }
      };

      // Petición para obtener el formulario del adoptante a partir del id de la mascota
      const fetchFormAnswers = async () => {
        try {
          const formEndpoint = `${import.meta.env.VITE_BACKEND_URI}/api/adopter/filter/?pet=${petData.payload.id}`;
          const response = await axios.get(formEndpoint);
          if (response.data.success && Array.isArray(response.data.payload)) {
            // Se busca el objeto correspondiente al adoptante actual
            const matchingRequest = response.data.payload.find(
              (item) => item.adopter === petData.payload.adopter
            );
            if (matchingRequest) {
              setFormAnswers(matchingRequest.formAnswers);
            }
          }
        } catch (error) {
          console.error('Error fetching form answers:', error);
        }
      };

      fetchAdopterInfo();
      fetchFormAnswers();

      setNewStatus(petData.payload.status);
    }
  }, [petData]);

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

const handleUpdateStatus = async () => {
  try {
    // 1. Obtener el id del shelter a partir del petData
    const shelterId = petData.payload.shelter._id;
    
    // 2. Hacer la petición GET para obtener las solicitudes de adopción del shelter
    const getEndpoint = `${import.meta.env.VITE_BACKEND_URI}/api/adoptionRequest/filter/?shelter=${shelterId}`;
    const getResponse = await axios.get(getEndpoint);
    
    if (
      getResponse.data &&
      getResponse.data.success &&
      Array.isArray(getResponse.data.payload)
    ) {
      // 3. Buscar la solicitud correspondiente a la mascota seleccionada (por id)
      const matchingRequest = getResponse.data.payload.find(
        (request) => request.pet === petData.payload.id
      );
      
      if (!matchingRequest) {
        console.error(
          "No se encontró la solicitud de adopción para la mascota seleccionada"
        );
        return;
      }
      
      // 4. Hacer la petición PUT para actualizar el estado de la solicitud
      const putEndpoint = `${import.meta.env.VITE_BACKEND_URI}/api/adoptionRequest/${matchingRequest._id}`;
      const putResponse = await axios.put(putEndpoint, { status: newStatus });
      setUpdatedStatus(putResponse.data.payload.status);
      console.log("Estado actualizado:", putResponse.data.payload.status);
    } else {
      console.error("No se encontraron solicitudes de adopción para el shelter");
    }
  } catch (error) {
    console.error("Error al actualizar el estado:", error);
  }
};

  if (!petData) {
    return <p>No se encontró la información de la mascota.</p>;
  }

  const handleGoBack = () => {
    navigate(-1);
  }

  return (
    <div className='p-8'>
      <div className='flex items-center gap-6'>
        <button onClick={handleGoBack} className='text-5xl text-(--secondary) cursor-pointer'>←</button>
        <h1 className='text-5xl'>Gestionar solicitud</h1>
      </div>
      <div className='py-10 grid lg:grid-cols-2 sm:grid-cols-1 gap-12'>
      {/* Información de la mascota */}
        <div>
            <h2 className='text-2xl pb-3'>{petData.payload.name}</h2>
            <div className='lg:col-span-2'>
            <img src={petData.payload.photos} alt={petData.payload.name} className='min-h-80 object-cover rounded-xl'/>
            </div>
        </div>
         {/* Información del adoptante */}
        <div>
            <h3 className='text-3xl pb-3'>Información del Adoptante</h3>
            {adopterInfo ? (
            <div>
                <p>
                <strong>Nombre:</strong> {adopterInfo.userName}
                </p>
                <p>
                <strong>Email:</strong> {adopterInfo.email}
                </p>
                <p>
                <strong>Teléfono:</strong> {adopterInfo.phone}
                </p>
                {adopterInfo.address && (
                <p>
                    <strong>Dirección:</strong> {adopterInfo.address.street}, {adopterInfo.address.city}, {adopterInfo.address.province}, {adopterInfo.address.country}
                </p>
                )}
            </div>
            ) : (
            <p>Cargando información del adoptante...</p>
            )}
        </div>

      </div>
        {/* Preguntas y respuestas del formulario */}
        <div>
            <h3 className='text-3xl pb-5'>Preguntas y respuestas del Formulario</h3>
            {formAnswers && formAnswers.length > 0 ? (
            <ul>
                {formAnswers.map((answer, index) => (
                <li key={index}>
                    <strong>Pregunta:</strong> {answer.question} <br />
                    <strong>Respuesta:</strong> {answer.answer}
                </li>
                ))}
            </ul>
            ) : (
            <p className='p-5'>No se encontraron respuestas del formulario.</p>
            )}
        </div>

        {/* Estado de la solicitud */}
          <p className='py-5 text-xl'>
            <span className='font-medium'>Estado actual: </span>
            <span>{translateStatus(updatedStatus)}</span>
          </p>
          {/* Selector para actualizar el estado */}
        <div className='flex flex-row gap-5 flex-wrap py-5'>
            <select value={newStatus} onChange={handleStatusChange} className='w-full max-w-[300px] p-2.5 border border-gray-300 rounded bg-gray-50 text-base text-gray-800 transition duration-300 focus:outline-none focus:border-blue-500 focus:shadow-[0_0_5px_rgba(0,123,255,0.5)]'>
            <option value="Pending">En revisión</option>
            <option value="Approved">Aprobar</option>
            <option value="Rejected">Rechazar</option>
            <option value="Canceled">Cancelar</option>
            </select>
            <Button onClick={handleUpdateStatus} className='cursor-pointer'>Actualizar estado</Button>
        </div>
    </div>
  );
};

export default ApplicationManage;