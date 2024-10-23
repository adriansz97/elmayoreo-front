export const fDateDDMMYYYY = (fechaISO) => {
  const fecha = new Date(fechaISO);
  
  // Validar si la fecha es válida
  if (isNaN(fecha.getTime())) {
      return "Fecha no válida";
  }
  
  // Obtener el día, mes y año
  const dia = String(fecha.getUTCDate()).padStart(2, '0'); // Obtener el día con 2 dígitos
  const mes = String(fecha.getUTCMonth() + 1).padStart(2, '0'); // Mes en formato 2 dígitos, recuerda que los meses empiezan en 0
  const anio = fecha.getUTCFullYear(); // Obtener el año

  // Formatear en dd-mm-yyyy
  return `${dia}-${mes}-${anio}`;
}

export function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}