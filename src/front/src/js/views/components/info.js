'use strict';
import Storage from '../../Storage';

const storage = new Storage();

const keys = {
  'step_1': 'Cuéntanos <b>qué necesitas</b>',
  'step_2': 'Recibe hasta <b>4 presupuestos de tu zona</b>',
  'step_3': 'Compara ofertas y <b>elige (o no) la mejor</b>',
  'tip_1': 'Es Gratis',
  'tip_1_text': 'Recibe varios presupuestos de forma gratuita y sin compromiso.',
  'tip_2': 'Ahorra Tiempo',
  'tip_2_text': 'No pierdas tiempo buscando empresas. Ellas te contactan a ti.',
  'tip_3': 'Ahorra dinero',
  'tip_3_text': 'Tienes más de un presupuesto para comparar.',
  'tip_4': 'Encuentra a los mejores',
  'tip_4_text': 'Elige a los profesionales mejor valorados por los usuarios.',
};

const Info = {
  render: async () => {
    const page = storage.getPage();
    return `
      <section>
        <ol class="ss-info-steps">
          <li class="ss-info-step">${keys.step_1}</li>
          <li class="ss-info-step">${keys.step_2}</li>
          <li class="ss-info-step">${keys.step_3}</li>
        </ol>
        <ul class="ss-info-tips ss-${page}">
          <li class="ss-info-tip ss-info-tip-icon-1">
            <h3 class="ss-info-tip-title">${keys.tip_1}</h3>
            ${keys.tip_1_text}
          </li>
          <li class="ss-info-tip ss-info-tip-icon-2">
            <h3 class="ss-info-tip-title">${keys.tip_2}</h3>
            ${keys.tip_2_text}
          </li>
          <li class="ss-info-tip ss-info-tip-icon-3">
            <h3 class="ss-info-tip-title">${keys.tip_3}</h3>
            ${keys.tip_3_text}
          </li>
          <li class="ss-info-tip ss-info-tip-icon-4">
            <h3 class="ss-info-tip-title">${keys.tip_4}</h3>
            ${keys.tip_4_text}
          </li>
        </ul>
      </section>
    `;
  },
  after_render: async () => {
  },
};

export default Info;
