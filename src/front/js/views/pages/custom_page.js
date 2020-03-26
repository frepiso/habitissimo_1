'use strict';
import TitleCustom from '../components/title_custom.js';
import Info from '../components/info.js';
import Form from '../components/form.js';

const CustomPage = {
  render: async () => {
    return `
      <section id="title" class="ss-section-title">
      </section>
      <div class="ss-grid-content-wrapper">
        <section id="info" class="ss-section-info">
        </section>
        <section id="form" class="ss-section-form">
        </section>
      </div>
    `;
  },
  after_render: async (keys) => {
    const title = null || document.getElementById('title');
    const info = null || document.getElementById('info');
    const form = null || document.getElementById('form');

    title.innerHTML = await TitleCustom.render(keys);
    await TitleCustom.after_render();

    info.innerHTML = await Info.render();
    await Info.after_render();

    form.innerHTML = await Form.render();
    await Form.after_render();
  },
};

export default CustomPage;
