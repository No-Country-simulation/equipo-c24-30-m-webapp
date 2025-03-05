const getTimeElapsed = (dateString) => {
  const start = new Date(dateString);
  const today = new Date();
  
  const yearsDiff = today.getFullYear() - start.getFullYear();
  const monthsDiff = today.getMonth() - start.getMonth();
  const daysDiff = today.getDate() - start.getDate();

  let years = yearsDiff;
  let months = monthsDiff;
  let days = daysDiff;

  if (daysDiff < 0) {
    months--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, start.getDate());
    days = Math.floor((today - lastMonth) / (1000 * 60 * 60 * 24));
  }

  if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
    years--;
    months += 12;
  }

  const parts = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? 'año' : 'años'}`);
  if (months > 0) parts.push(`${months} ${months === 1 ? 'mes' : 'meses'}`);
  if (days > 0) parts.push(`${days} ${days === 1 ? 'día' : 'días'}`);

  return parts.join(', ');
}

export default getTimeElapsed;