const getTimeElapsed = (dateString) => {
  const start = new Date(dateString);
  const today = new Date();
  
  const diffInMilliseconds = today - start;
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) {
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    if (diffInHours === 0) {
      const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
      return `${diffInMinutes} ${diffInMinutes === 1 ? 'minuto' : 'minutos'}`;
    }
    return `${diffInHours} ${diffInHours === 1 ? 'hora' : 'horas'}`;
  }

  if (diffInDays < 30) {
    return `${diffInDays} ${diffInDays === 1 ? 'día' : 'días'}`;
  }

  const months = Math.floor(diffInDays / 30);
  if (months < 12) {
    return `${months} ${months === 1 ? 'mes' : 'meses'}`;
  }

  const years = Math.floor(diffInDays / 365);
  const remainingMonths = Math.floor((diffInDays % 365) / 30);

  if (remainingMonths === 0) {
    return `${years} ${years === 1 ? 'año' : 'años'}`;
  }

  return `${years} ${years === 1 ? 'año' : 'años'} y ${remainingMonths} ${remainingMonths === 1 ? 'mes' : 'meses'}`;
}

export default getTimeElapsed;