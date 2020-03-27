'use strict';
import Storage from '../../Storage';
import Utils from '../../lib/utils';
// form views
import Step1 from '../steps/step_1';
import Step2 from '../steps/step_2';
import Step3 from '../steps/step_3';
import Step4 from '../steps/step_4';
import Error404 from '../pages/error404';

const storage = new Storage();

const keys = {
  'title': 'Solicita presupuestos',
  'subtitle': '¡Es gratis!',
  'advertisement': 'Anunciado en TV',
};

const steps = {
  '0': {step: Step1, next: '1', prev: '0'},
  '1': {step: Step2, next: '2', prev: '0'},
  '2': {step: Step3, next: '3', prev: '1'},
  '3': {step: Step4, next: '4', prev: '2'},
};

const Form = {
  render: async () => {
    return `
      <section>
        <div class="ss-budgets-form">
          <div class="ss-budget-form-title">${keys.title}</div>
          <div class="ss-budget-form-subtitle">${keys.subtitle}</div>
          <div class="ss-budget-form-content">
            <div class="ss-progress-bar-wrapper">
              <div class="ss-progress-bar">
                <span id="progress-bar" class="ss-progress-bar-fill" data-step="0"></span>
              </div>
            </div>

            <div id="form-container"></div>
          </div>
        </div>
        <div class="ss-budget-advertisement">
          <ul class="ss-advertisements">
            <li class="ss-advertisement"><div class="ss-adv-text">${keys.advertisement}</div></li>
            <li class="ss-advertisement"><span class="ss-adv-icon ss-adv-icon-1"></span></li>
            <li class="ss-advertisement"><span class="ss-adv-icon ss-adv-icon-2"></span></li>
            <li class="ss-advertisement"><span class="ss-adv-icon ss-adv-icon-3"></span></li>
            <li class="ss-advertisement"><span class="ss-adv-icon ss-adv-icon-4"></span></li>
          </ul>
        </div>
      </section>
    `;
  },
  after_render: async () => {
    const progressbar = null || document.getElementById('progress-bar');
    const container = null || document.getElementById('form-container');
    const step = !storage.getStep() ? '0' : storage.getStep();
    const content = steps[step].step ? steps[step].step : Error404;
    const nextStep = steps[step].next ? steps[step].next : steps[0].next;
    const prevStep = steps[step].prev ? steps[step].prev : steps[0].prev;

    storage.setNext(nextStep);
    storage.setPrev(prevStep);
    Utils.saveStorage(storage);

    progressbar.dataset.step = step;
    container.innerHTML = await content.render();
    await content.after_render();
  },
};

export default Form;
