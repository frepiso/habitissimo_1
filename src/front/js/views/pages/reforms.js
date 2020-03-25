'use strict';
import CustomPage from './custom_page';
const model = {
  page: 'reforms',
  keys: {
    title: 'Pide presupuestos de reformas viviendas',
  },
};

const Reforms = {
  render: async () => {
    return CustomPage.render();
  },
  after_render: async () => {
    return CustomPage.after_render(model);
  },
};

export default Reforms;
