'use strict';
const keys = {
  'title': 'Pide presupuestos',
  'subtitle': 'Construcciones y reformas, instalaciones, limpieza, mudanzas, arquitectos y más...',
};

const Title = {
  render: async () => {
    return `
      <section>
        <div class="ss-title">
          <h1 class="ss-title-title">${keys.title}</h1>
          <h1 class="ss-title-subtitle">${keys.subtitle}</h1>
        </div>
      </section>
    `;
  },
  after_render: async () => {
  },
};

export default Title;
