'use strict';
const TitleCustom = {
  render: async (keys) => {
    return `
      <section>
        <div class="ss-title">
          <h1 class="ss-title-title">${keys.title}</h1>
        </div>
      </section>
    `;
  },
  after_render: async () => {
  },
};

export default TitleCustom;
