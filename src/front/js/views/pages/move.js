'use strict';
import CustomPage from './custom_page';
const model = {
  page: 'move',
  keys: {
    title: 'Pide presupuestos de mudanzas',
  },
};

const Move = {
  render: async () => {
    return CustomPage.render();
  },
  after_render: async () => {
    return CustomPage.after_render(model);
  },
};

export default Move;
