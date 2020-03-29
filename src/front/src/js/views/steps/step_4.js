'use strict';
import Config from '../../config/app.config';
import Utils from '../../lib/utils';
import Storage from '../../Storage';

const storage = new Storage();

const keys = {
  ok: '¡Recibido, gracias!',
  ko: 'Ha ocurrido un error, por favor, inténtelo más tarde.',
  send: 'Enviar',
  retry: 'Reintentar',
  back_button: '« Volver',
  new_button: 'Nuevo',
};

const sendBudget = async () => {
  const res = await Utils.postData(storage.getBudget(), Config.endpoint_budget);
  await Step4.after_request(res);
};

const Step4 = {
  render: async () => {
    return `
      <section>
        <div class="ss-step4-wrapper">
        <div class="ss-step4-container">
          <div id="loading" class="ss-step4-container-loading">
            <a id="send_button" class="ss-step-retry-button">${keys.send}</a>
          </div>
          <div id="ok" class="ss-step4-container-ok ss-hidden">${keys.ok}</div>
          <div id="ko" class="ss-step4-container-ko ss-hidden">
            ${keys.ko} <br/>
            <a id="retry" class="ss-step-retry-button">${keys.retry}</a></div>
        </div>
        <div class="ss-step-footer">
          <div class="ss-step-backbutton">
            <a id="back_button" class="ss-step-back-button" href="/">${keys.back_button}</a>
          </div>
          <div class="ss-step-resetbutton">
            <a id="new_button" class="ss-step-new-button" href="/">${keys.new_button}</a>
          </div>
        </div>
        </div>
      </section>
    `;
  },
  after_render: async () => {
    const $backBtn = document.getElementById('back_button');
    const $newBtn = document.getElementById('new_button');
    const $sendBtn = document.getElementById('send_button');

    $backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const url = Utils.createURL(storage.getPage(), storage.getPrev());
      Utils.goto(url);
    });

    $newBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const page = storage.getPage();
      storage.clearBudget();
      storage.clearRouter();
      const url = Utils.createURL(page, storage.getStep());
      Utils.goto(url);
    });

    $sendBtn.addEventListener('click', (e) => {
      e.preventDefault();
      sendBudget();
    });
  },
  after_request: async (res) => {
    console.log('Step4.after_request:', res); // todo delete
    const $loading = document.getElementById('loading');
    const $ok = document.getElementById('ok');
    const $ko = document.getElementById('ko');
    const $toToogle = res ? $ok : $ko;
    Utils.toggle($loading);
    Utils.toggle($toToogle);
    if (!res) {
      const $retry = document.getElementById('retry');
      $retry.addEventListener('click', (e) => {
        e.preventDefault();
        Utils.toggle($loading);
        Utils.toggle($toToogle);
        sendBudget();
      });
    }
  },
};

export default Step4;
