'use strict';
import CustomPage from './custom_page';
const model = {
  page: 'brickwork',
  keys: {
    title: 'Pide presupuestos de albañiles',
  },
};

const Brickwork = {
  render: async () => {
    return CustomPage.render();
  },
  after_render: async () => {
    return CustomPage.after_render(model);
  },
};

export default Brickwork;
