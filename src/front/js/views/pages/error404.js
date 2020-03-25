'use strict';
const Error404 = {
  render: async () => {
    return `
      <section class="section">
        <h1>404 Page not found.</h1>
      </section>
    `;
  },
  after_render: async () => {
  },
};

export default Error404;
