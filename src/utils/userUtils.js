// utils/userUtils.js
export const getUserInfo = (userData) => {
  return {
    nombre: userData.nombre || 'Nombre Desconocido',
    apellido: userData.apellido || 'Apellido Desconocido',
    photoUrl: userData.photoUrl || 'https://www.revistadiabetes.org/wp-content/uploads/Manejo-del-paciente-psiquiatrico-con-diabetes3.jpg',
  };
};