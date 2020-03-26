'use strict';
const keys = {
  ok: '¡Recibido, gracias!',
  ko: 'Ha ocurrido un error, por favor, inténtelo más tarde.',
};

const Step4 = {
  render: async () => {
    return `
      <section>
        <h1> ${keys.ok} </h1>
      </section>
    `;
  },
  after_render: async () => {
  },
};

export default Step4;
