import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import Button from '../../../components/Button';

const ApplicationManage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // id de la solicitud (en caso de que no venga por state)
  const location = useLocation();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newStatus, setNewStatus] = useState('');
  const [updatedStatus, setUpdatedStatus] = useState('');

  // Si viene por state, se utiliza esa información, de lo contrario se hace el fetch
  useEffect(() => {
    if (location.state && location.state.application) {
      const app = location.state.application;
      setApplication(app);
      setUpdatedStatus(app.status);
      setNewStatus(app.status);
      setLoading(false);
    } else {
      const fetchApplication = async () => {
        try {
          // Se asume que existe un endpoint para obtener la solicitud por id.
          const requestRes = await axios.get(
            `${import.meta.env.VITE_BACKEND_URI}/api/adoptionRequest/${id}`
          );
          // Se espera que la respuesta tenga la siguiente estructura:
          // { data: { success: true, payload: { ... } } }
          const requestData = requestRes.data.payload;
          // Obtener información de la mascota
          const petRes = await axios.get(
            `${import.meta.env.VITE_BACKEND_URI}/api/pet/${requestData.pet}`
          );
          // Obtener información del adoptante
          const adopterRes = await axios.get(
            `${import.meta.env.VITE_BACKEND_URI}/api/adopter/${requestData.adopter}`
          );

          // Se construye el objeto manteniendo la estructura original, reemplazando
          // los valores de "pet" y "adopter" con la respuesta de las peticiones correspondientes.
          const constructedApplication = {
            _id: requestData._id,
            adopter: adopterRes.data.payload,
            pet: petRes.data.payload,
            shelter: requestData.shelter,
            status: requestData.status,
            formAnswers: requestData.formAnswers,
          };

          setApplication(constructedApplication);
          setUpdatedStatus(constructedApplication.status);
          setNewStatus(constructedApplication.status);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching application data', error);
          setLoading(false);
        }
      };

      fetchApplication();
    }
  }, [id, location.state]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const translateStatus = (status) => {
    switch (status) {
      case 'Pending':
        return 'Pendiente';
      case 'Approved':
        return 'Aprobado';
      case 'Rejected':
        return 'Rechazado';
      case 'Canceled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleUpdateStatus = async () => {
    try {
      // Se realiza la petición para actualizar el estado.
      // Ajusta la URL y método según tu backend (PUT o PATCH).
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URI}/api/adoptionRequest/${application._id}`,
        { status: newStatus }
      );
      setUpdatedStatus(newStatus);
      alert('Estado actualizado correctamente');
    } catch (error) {
      console.error('Error updating status', error);
      alert('Error al actualizar el estado');
    }
  };

  if (loading) return <p>Cargando datos...</p>;
  if (!application) return <p>No se encontró la información de la solicitud.</p>;

  // Se simula la estructura esperada en el diseño:
  // petData es un objeto con la propiedad payload que contiene la información de la mascota.
  const petData = { payload: application.pet };
  const adopterInfo = application.adopter;
  const formAnswers = application.formAnswers;

  return (
    <div className="p-8">
      <div className="flex items-center gap-6">
        <button
          onClick={handleGoBack}
          className="text-5xl text-(--secondary) cursor-pointer"
        >
          ←
        </button>
        <h1 className="text-5xl">Gestionar solicitud</h1>
      </div>
      <div className="py-10 grid lg:grid-cols-2 sm:grid-cols-1 gap-12">
        {/* Información de la mascota */}
        <div>
          <h2 className="text-2xl pb-3">{petData.payload.name}</h2>
          <div className="lg:col-span-2">
            <img
              src={petData.payload.photos}
              alt={petData.payload.name}
              className="min-h-80 object-cover rounded-xl"
            />
          </div>
        </div>
        {/* Información del adoptante */}
        <div>
          <h3 className="text-3xl pb-3">Información del Adoptante</h3>
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
                  <strong>Dirección:</strong> {adopterInfo.address.street},{' '}
                  {adopterInfo.address.city}, {adopterInfo.address.province},{' '}
                  {adopterInfo.address.country}
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
        <h3 className="text-3xl pb-5">Preguntas y respuestas del Formulario</h3>
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
          <p className="p-5">No se encontraron respuestas del formulario.</p>
        )}
      </div>
      {/* Estado de la solicitud */}
      <p className="py-5 text-xl">
        <span className="font-medium">Estado actual: </span>
        <span>{translateStatus(updatedStatus)}</span>
      </p>
      {/* Selector para actualizar el estado */}
      <div className="flex flex-row gap-5 flex-wrap py-5">
        <select
          value={newStatus}
          onChange={handleStatusChange}
          className="w-full max-w-[300px] p-2.5 border border-gray-300 rounded bg-gray-50 text-base text-gray-800 transition duration-300 focus:outline-none focus:border-blue-500 focus:shadow-[0_0_5px_rgba(0,123,255,0.5)]"
        >
          <option value="Pending">En revisión</option>
          <option value="Approved">Aprobar</option>
          <option value="Rejected">Rechazar</option>
          <option value="Canceled">Cancelar</option>
        </select>
        <Button onClick={handleUpdateStatus} className="cursor-pointer">
          Actualizar estado
        </Button>
      </div>
    </div>
  );
};

export default ApplicationManage;
