'use strict';
import Utils from '../../lib/utils';
import Storage from '../../Storage';

const storage = new Storage();

const keys = {
  title_text: 'Título de su presupuesto:',
  title_placeholder: 'Ej: Reforma baño',
  description_text: 'Describanos el trabajo que necesita:',
  description_placeholder: 'Ej: Pintura, reforma baños, etc.',
  date_text: '¿Fecha estimada de entrega?',
  date_placeholder: 'Ej: Lo antes posible.',
  date_1: 'Lo antes posible',
  date_2: 'de 1 a 3 meses',
  date_3: 'más de 3 meses',
  continue_button: 'Continuar »',
  reset_button: 'Reset',
  free_text: 'gratis y sin compromiso',
};

const Step1 = {
  render: async () => {
    return `
      <section>
        <div class="ss-step1-wrapper">
          <div class="ss-step1-text0 ss-form-text">
            ${keys.title_text}
          </div>
          <div class="ss-step1-input0">
            <input id="title" name="title" class="ss-input" placeholder="${keys.title_placeholder}"/>
          </div>
          <div class="ss-step1-text1 ss-form-text">
            ${keys.description_text}
          </div>
          <div class="ss-step1-input1">
            <textarea id="description" name="description" data-validation="required"
              class="ss-textarea" rows="3" cols="50" placeholder="${keys.description_placeholder}">
            </textarea>
          </div>
          <div class="ss-step1-text2 ss-form-text">
            ${keys.date_text}
          </div>
          <div class="ss-step1-input2">
            <select id="date" name="date" type="text" class="ss-select" >
              <option value="" selected><${keys.date_placeholder}</option>
              <option value="1">${keys.date_1}</option>
              <option value="2">${keys.date_2}</option>
              <option value="3">${keys.date_3}</option>
            <select>
          </div>
          <div class="ss-step-footer">
            <a id="submit_btn" class="ss-step-button" href="/">${keys.continue_button}</a>
            <div class="ss-step-resetbutton">
              <a id="reset_button" class="ss-step-reset-button">${keys.reset_button}</a>
            </div>
            <div class="ss-step-free">
              ${keys.free_text}
            </div>
          </div>
        <div>
      </section>
    `;
  },
  after_render: async () => {
    const $title = document.getElementById('title');
    const $description = document.getElementById('description');
    const $date = document.getElementById('date');
    const $submitBtn = document.getElementById('submit_btn');
    const $resetBtn = document.getElementById('reset_button');
    const saveData = () => {
      storage.setBudgetValue('title', $title.value);
      storage.setBudgetValue('description', $description.value);
      storage.setBudgetValue('date', $date.value);
    };

    $submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const url = Utils.createURL(storage.getPage(), storage.getNext());
      if (Utils.validation($description)) {
        saveData();
        Utils.goto(url);
      } else {
        $description.classList.add('ss-error');
      }
    });

    $resetBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const page = storage.getPage();
      storage.clearBudget();
      storage.clearRouter();
      const url = Utils.createURL(page, storage.getStep());
      Utils.goto(url);
    });

    $description.addEventListener('focus', (el) => {
      Utils.removeClass(el, 'ss-error');
    });

    $title.value = storage.getBudgetValue('title');
    $description.value = storage.getBudgetValue('description');
    $date.value = storage.getBudgetValue('date');
  },
};

export default Step1;
