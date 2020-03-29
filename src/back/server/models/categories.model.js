'use strict';

const CategoriesMock = {
  reforms: [
    {id: 1, value: 'Reformas viviendas'},
    {id: 2, value: 'Reformas baños'},
    {id: 3, value: 'Reformas cocinas'},
    {id: 4, value: 'Reformas locales comerciales'},
    {id: 5, value: 'Rehabilitacion fachadas'},
    {id: 6, value: 'Reformas piscinas'},
    {id: 7, value: 'Reformas comunidades'},
    {id: 8, value: 'Rehabilitacion edificios'},
    {id: 9, value: 'Reformas naves industriales'},
  ],
  building: [
    {id: 1, value: 'Casas'},
    {id: 2, value: 'Piscinas'},
    {id: 3, value: 'Casas prefabricadas'},
    {id: 4, value: 'Muros'},
    {id: 5, value: 'Derribos'},
    {id: 6, value: 'Naves industriales'},
    {id: 7, value: 'Excavaciones'},
  ],
  move: [
    {id: 1, value: 'Mudanzas viviendas'},
    {id: 2, value: 'Guardamuebles'},
    {id: 3, value: 'Mudanzas oficinas'},
  ],
  tecnics: [
    {id: 1, value: 'Arquitectos'},
    {id: 2, value: 'Licencias'},
    {id: 3, value: 'Decoradores'},
    {id: 4, value: 'Topógrafos'},
    {id: 5, value: 'Inspección técnica edificios'},
    {id: 6, value: 'Peritos'},
    {id: 7, value: 'Certificaciones energéticas'},
    {id: 8, value: 'Geólogos'},
    {id: 9, value: 'Paisajistas'},
    {id: 10, value: 'Delineantes'},
  ],
  brickwork: [
    {id: 1, value: 'Pintores'},
    {id: 2, value: 'Carpinteros'},
    {id: 3, value: 'Parquetistas'},
    {id: 4, value: 'Albañiles'},
    {id: 5, value: 'Carpinteros aluminio'},
    {id: 6, value: 'Tejados'},
    {id: 7, value: 'Fontaneros'},
    {id: 8, value: 'Impermeabilizaciones'},
    {id: 9, value: 'Cristaleros'},
    {id: 10, value: 'Hormigón impreso'},
    {id: 11, value: 'Aislamiento'},
    {id: 12, value: 'Armarios'},
    {id: 13, value: 'Pladur'},
    {id: 14, value: 'Tapiceros'},
    {id: 15, value: 'Cerrajeros'},
    {id: 16, value: 'Insonorización'},
    {id: 17, value: 'Poceros'},
    {id: 18, value: 'Microcemento'},
    {id: 19, value: 'Pavimentos continuos'},
    {id: 20, value: 'Trabajos verticales'},
    {id: 21, value: 'Yeseros'},
    {id: 22, value: 'Marmolistas'},
  ],
};

exports.findByName = async (name) => {
  return (CategoriesMock[name]);
};
