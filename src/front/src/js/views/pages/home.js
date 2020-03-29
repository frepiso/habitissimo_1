'use strict';
import Storage from '../../Storage';
import Title from '../components/title.js';
import Info from '../components/info.js';
import Form from '../components/form.js';

const storage = new Storage();

const Home = {
  render: async () => {
    return `
      <section id="heading" class="ss-section-title">
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
    const url = storage.getPage();
    const heading = null || document.getElementById('heading');
    const info = null || document.getElementById('info');
    const form = null || document.getElementById('form');

    heading.innerHTML = await Title.render();
    await Title.after_render();

    info.innerHTML = await Info.render(url);
    await Info.after_render();

    form.innerHTML = await Form.render();
    await Form.after_render();
  },
};

export default Home;
