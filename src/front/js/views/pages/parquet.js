'use strict';
import CustomPage from './custom_page';
const model = {
  page: 'parquet',
  keys: {
    title: 'Pide presupuestos de parquetistas',
  },
};

const Parquet = {
  render: async () => {
    return CustomPage.render();
  },
  after_render: async () => {
    return CustomPage.after_render(model);
  },
};

export default Parquet;
