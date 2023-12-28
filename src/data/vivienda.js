export const vivienda = [
  {
    id: 1,
    nombre: 'Arias Planta Baja',
    pacientes: [
        {
          id: 1,
          nombre: 'María Gómez',
          edad: 30,
          diagnostico: 'Enfermedad X',
          planFarmacologico: {
            manana: '05:00:00, - 1mg Lorazepan,  - 2mg Respitidona, - 1mg Clozapina',
            mediodia: '06:30:00, - 1/2mg Aloperidol, - 1mg Respitidona',
            tarde: '16:00:00, - 4mg Lorazepan, - 1mg Respitidona',
            noche: '20:00:00, - 1mg Lorazepan, - 2mg  Respitidona',
          },
          registroMedicacion: [
            {
              fecha: "12/11/2023",
              hora: "20:00:00",
              responsable: "Javier Milton",
              imagen: "https://www.enfermeriayseguridaddelpaciente.com/wp-content/uploads/2020/12/medicacion.jpg",
            },
            {
              fecha: "13/11/2023",
              hora: "08:00:00",
              responsable: "Susana Gimenez",
              imagen: "https://static.eldiario.es/clip/9023a1c2-0485-485c-8366-b69eb21db478_16-9-discover-aspect-ratio_default_0.webp",
            },
            {
              fecha: "12/11/2023",
              hora: "20:00:00",
              responsable: "Javier Milton",
              imagen: "https://www.enfermeriayseguridaddelpaciente.com/wp-content/uploads/2020/12/medicacion.jpg",
            },
            {
              fecha: "13/11/2023",
              hora: "08:00:00",
              responsable: "Susana Gimenez",
              imagen: "https://static.eldiario.es/clip/9023a1c2-0485-485c-8366-b69eb21db478_16-9-discover-aspect-ratio_default_0.webp",
            },
          ],
        },
      {
        id: 2,
        nombre: 'Juan Pérez',
        edad: 25,
        diagnostico: 'Enfermedad Y',
        planFarmacologico: {
          manana: '05:00:00, - 1mg Lorazepan,  - 2mg Respitidona, - 1mg Clozapina',
          mediodia: '12:00:00, - 1/2mg Aloperidol, - 1mg Respitidona',
          tarde: '16:00:00, - 4mg Lorazepan, - 1mg Respitidona',
          noche: '20:00:00, - 1mg Lorazepan, - 2mg  Respitidona',
        },
        registroMedicacion: [
          {
            fecha: "01/01/2024",
            hora: "20:00:00",
            responsable: "Javier Milton",
            imagen: "https://www.enfermeriayseguridaddelpaciente.com/wp-content/uploads/2020/12/medicacion.jpg",
          },
          {
            fecha: "31/12/2023",
            hora: "08:00:00",
            responsable: "Susana Gimenez",
            imagen: "https://static.eldiario.es/clip/9023a1c2-0485-485c-8366-b69eb21db478_16-9-discover-aspect-ratio_default_0.webp",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    nombre: 'Arias Planta Alta',
    pacientes: [
      {
        id: 3,
        nombre: 'Diego Sánchez',
        edad: 40,
        diagnostico: 'Enfermedad Z',
        planFarmacologico: {
          manana: '08:00:00 - 2mg Lorazepan, - 1mg Respitidona',
          mediodia: '12:00:00 - 1mg Aloperidol, - 1/2mg Respitidona',
          tarde: '16:00:00 - 1mg Lorazepan, - 2mg Respitidona',
          noche: '20:00:00 - 2mg Lorazepan, - 1mg Respitidona',
        },
      },
      {
        id: 4,
        nombre: 'Lucas Fernández',
        edad: 35,
        diagnostico: 'Enfermedad W',
        planFarmacologico: {
          manana: '07:00:00 - 2mg Lorazepan, - 1mg Respitidona',
          mediodia: '11:00:00 - 1mg Aloperidol, - 1/2mg Respitidona',
          tarde: '15:00:00 - 1mg Lorazepan, - 2mg Respitidona',
          noche: '19:00:00 - 2mg Lorazepan, - 1mg Respitidona',
        },
      },
    ],
  },
  {
    id: 3,
    nombre: 'Libertador',
    pacientes: [
      {
        id: 5,
        nombre: 'Valentina Rodríguez',
        edad: 40,
        diagnostico: 'Enfermedad Z',
        planFarmacologico: {
          manana: '08:00:00, - 2mg Lorazepan, - 1mg Respitidona',
          mediodia: '12:00:00, - 1mg Aloperidol, - 1/2mg Respitidona',
          tarde: '16:00:00, - 1mg Lorazepan, - 2mg Respitidona',
          noche: '20:00:00,- 2mg Lorazepan, - 1mg Respitidona',
        },
      },
      {
        id: 6,
        nombre: 'Laura López',
        edad: 35,
        diagnostico: 'Enfermedad W',
        planFarmacologico: {
          manana: '07:00:00, - 2mg Lorazepan, - 1mg Respitidona',
          mediodia: '11:00:00, - 1mg Aloperidol, - 1/2mg Respitidona',
          tarde: '15:00:00, - 1mg Lorazepan, - 2mg Respitidona',
          noche: '19:00:00, - 2mg Lorazepan, - 1mg Respitidona',
        },
      },
    ],
  },
  {
    id: 4,
    nombre: 'Echeverria',
    pacientes: [
      {
        id: 7,
        nombre: 'Sofía García',
        edad: 40,
        diagnostico: 'Enfermedad Z',
        planFarmacologico: {
          manana: '08:00:00, - 2mg Lorazepan, - 1mg Respitidona',
          mediodia: '12:00:00, - 1mg Aloperidol, - 1/2mg Respitidona',
          tarde: '16:00:00, - 1mg Lorazepan, - 2mg Respitidona',
          noche: '20:00:00, - 2mg Lorazepan, - 1mg Respitidona',
        },
      },
      {
        id: 8,
        nombre: 'Sebastián Gómez',
        edad: 35,
        diagnostico: 'Enfermedad W',
        planFarmacologico: {
          manana: '07:00:00 - 2mg Lorazepan, - 1mg Respitidona',
          mediodia: '11:00:00 - 1mg Aloperidol, - 1/2mg Respitidona',
          tarde: '15:00:00 - 1mg Lorazepan, - 2mg Respitidona',
          noche: '19:00:00 - 2mg Lorazepan, - 1mg Respitidona',
        },
      },
    ],
  },
  // Puedes agregar más datos según tus necesidades
];