'use strict';
const keys = {
  'title': 'Anunciado en TV',
};

const Bottombar = {
  render: async () => {
    return `
      <footer class="footer">
        <div class="">
          <p>${keys.title}
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          </p>
        </div>
      </footer>
    `;
  },
  after_render: async () => {
  },
};

export default Bottombar;
