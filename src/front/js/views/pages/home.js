'use strict';
import Title from '../components/title.js';
import Info from '../components/info.js';
import Form from '../components/form.js';

const Home = {
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
  after_render: async () => {
    const page = 'home';
    const title = null || document.getElementById('title');
    const info = null || document.getElementById('info');
    const form = null || document.getElementById('form');

    title.innerHTML = await Title.render();
    await Title.after_render();

    info.innerHTML = await Info.render(page);
    await Info.after_render();

    form.innerHTML = await Form.render();
    await Form.after_render();
  },
};

export default Home;