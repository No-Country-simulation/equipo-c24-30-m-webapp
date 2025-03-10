//import { useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../../../components/Button';
//import Button from '../../../components/Button';
//import getTimeElapsed from '../../../utils/getTimeElapsed';
//import petDataMock from '../../../test/petsDataMock.json';

const ApplicationManage = () => {
  //const userRole = useSelector((state) => state.user.role);
  const navigate = useNavigate();
  const location = useLocation();
  const { petData } = location.state || {};

  const [adopterInfo, setAdopterInfo] = useState(null);
  const [formAnswers, setFormAnswers] = useState([]);
  const [newStatus, setNewStatus] = useState('');

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

      // Opcional: establecer el estado por defecto como el actual de la solicitud
      setNewStatus(petData.payload.status);
    }
  }, [petData]);

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

    const handleUpdateStatus = async () => {
    // Aquí se realizará la petición para actualizar el estado en el backend.
    // Por ahora, solo se muestra por consola el nuevo estado.
    console.log('Nuevo estado a actualizar:', newStatus);
  };

  if (!petData) {
    return <p>No se encontró la información de la mascota.</p>;
  }

  const age = petData.payload.age.years > 0 ? `${petData.payload.age.years} años` : 
              (petData.payload.age.months > 0 ? `${petData.payload.age.months} meses` :
              (petData.payload.age.days > 0 ? `${petData.payload.age.days} días` : '')); 

  const handleGoBack = () => {
    navigate(-1);
  }


  return (
    <div className='p-8'>
      <div className='flex items-center gap-6'>
        <button onClick={handleGoBack} className='text-5xl text-(--secondary) cursor-pointer'>←</button>
        <h1 className='text-5xl'>Detalles de la solicitud</h1>
      </div>
      <div className='py-10 grid lg:grid-cols-5 sm:grid-cols-1 gap-10'>
      {/* Información de la mascota */}
        <div>
            <h3 className='text-3xl'>Información de la mascota</h3>
            <h2 className='text-2xl'>{petData.payload.name}</h2>
            <div className='lg:col-span-2'>
            <img src={petData.payload.photos} alt={petData.payload.name} className='min-h-110 object-cover rounded-xl'/>
            </div>
            <div className='lg:col-span-3 flex flex-col justify-between py-2'>
            <p className='pb-2 text-xl'>
                <span className='font-medium'>Sexo: </span>
                <span>{(petData.payload.sex === "male" ? "Macho" : "Hembra")}</span>
            </p>
            <p className='pb-2 text-xl'>
                <span className='font-medium'>Edad: </span>
                <span>{age}</span>
            </p>
            </div>
        </div>
         {/* Información del adoptante */}
        <div>
            <h3 className='text-3xl'>Información del Adoptante</h3>
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
        {/* Preguntas y respuestas del formulario */}
        <div>
            <h3 className='text-3xl'>Preguntas y respuestas del Formulario</h3>
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
            <p>No se encontraron respuestas del formulario.</p>
            )}
        </div>

        {/* Estado de la solicitud */}
          <p className='pb-2 text-xl'>
            <span className='font-medium'>Estado: </span>
            <span>{translateStatus(petData.payload.status)}</span>
          </p>
          {/* Selector para actualizar el estado */}
          <h3 className='text-3xl'>Cambiar estado de la solicitud</h3>
        <select value={newStatus} onChange={handleStatusChange}>
          <option value="Pending">en revisión</option>
          <option value="Approved">Aprovada</option>
          <option value="Rejected">Rechazada</option>
        </select>
        <Button onClick={handleUpdateStatus}>Actualizar estado</Button>

      </div>
    </div>
  );
};

export default ApplicationManage;