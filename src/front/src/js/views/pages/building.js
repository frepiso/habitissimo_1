'use strict';
import CustomPage from './custom_page';
const keys = {
  title: 'Pide presupuestos de construcción de casas',
};

const Building = {
  render: async () => {
    return CustomPage.render();
  },
  after_render: async () => {
    return CustomPage.after_render(keys);
  },
};

export default Building;
