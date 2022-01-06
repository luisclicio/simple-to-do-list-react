export function formatDateTime(dateTime) {
  const options = {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  };

  return dateTime.toLocaleString('pt-BR', options);
}
