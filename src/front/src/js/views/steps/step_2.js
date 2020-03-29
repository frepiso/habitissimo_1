'use strict';
import Config from '../../config/app.config';
import Utils from '../../lib/utils';
import Storage from '../../Storage';

const storage = new Storage();

const keys = {
  category_text: 'Categoría del trabajo:',
  category_placeholder: '',
  subcategory_text: 'Subcategoría del trabajo:',
  subcategory_placeholder: '',
  preference_text: 'Preferencia precio',
  preference_placeholder: '',
  preference_cheaper: 'Lo más barato',
  preference_middle: 'Relación calidad precio',
  preference_quality: 'Mejor calidad',
  continue_button: 'Continuar »',
  back_button: '« Volver',
  reset_button: 'Reset',
  free_text: 'gratis y sin compromiso',
  category_reforms: 'Reformas',
  category_building: 'Construcción',
  category_move: 'Mudanza',
  category_tecnics: 'Técnicos',
  category_brickwork: 'Obra menor',
};

const updateOptions = async (category) => {
  let $optionsViews = '';
  if (category) {
    const options = await Utils.getData(category, Config.endpoint_categories);
    if (options) {
      $optionsViews = options.map((option) => {
        return `<option value="${option.id}">${option.value}</option>`;
      }).join('\n ');
    }
  }
  Step2.after_request($optionsViews);
};

const Step2 = {
  render: async () => {
    return `
    <section>
        <div class="ss-step2-wrapper">
          <div class="ss-step2-text1 ss-form-text">
            ${keys.category_text}
          </div>
          <div class="ss-step1-input1">
            <select id="category" name="subcategory" type="text" class="ss-select" data-validation="required">
              <option value="" selected>${keys.category_placeholder}</option>
              <option value="reforms">${keys.category_reforms}</option>
              <option value="building">${keys.category_building}</option>
              <option value="move">${keys.category_move}</option>
              <option value="tecnics">${keys.category_tecnics}</option>
              <option value="brickwork">${keys.category_brickwork}</option>
            <select>
          </div>
          <div class="ss-step1-text2 ss-form-text">
            ${keys.subcategory_text}
          </div>
          <div class="ss-step1-input2">
            <select id="subcategory" name="subcategory" type="text" class="ss-select">
            <select>
          </div>
          <div class="ss-step2-text3 ss-form-text">
            ${keys.preference_text}
          </div>
          <div class="ss-step2-input3">
            <select id="preference" name="preference" type="text" class="ss-select">
              <option value="" selected>${keys.preference_placeholder}</option>
              <option value="1">${keys.preference_cheaper}</option>
              <option value="2">${keys.preference_middle}</option>
              <option value="3">${keys.preference_quality}</option>
            <select>
          </div>
          <div class="ss-step-footer">
            <div class="ss-step-backbutton">
              <a id="back_button" class="ss-step-back-button" href="/">${keys.back_button}</a>
            </div>
            <a id="submit_btn" class="ss-step-button" href="/">${keys.continue_button}</a>
            <div class="ss-step-resetbutton">
              <a id="reset_button" class="ss-step-reset-button" href="/">${keys.reset_button}</a>
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
    const $category = document.getElementById('category');
    const $subcategory = document.getElementById('subcategory');
    const $preference = document.getElementById('preference');
    const $submitBtn = document.getElementById('submit_btn');
    const $backBtn = document.getElementById('back_button');
    const $resetBtn = document.getElementById('reset_button');
    const saveData = () => {
      storage.setBudgetValue('subcategory', $subcategory.value);
      storage.setBudgetValue('preference', $preference.value);
      if (Utils.validation($category)) {
        storage.setBudgetValue('category', $category.value);
        return true;
      } else {
        $category.classList.add('ss-error');
        return false;
      }
    };

    $category.addEventListener('change', (e) => {
      updateOptions($category.value);
    });

    $backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const url = Utils.createURL(storage.getPage(), storage.getPrev());
      saveData();
      Utils.goto(url);
    });

    $submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const url = Utils.createURL(storage.getPage(), storage.getNext());
      if (saveData()) {
        Utils.goto(url);
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

    $category.addEventListener('focus', (el) => {
      Utils.removeClass(el, 'ss-error');
    });

    $category.value = storage.getBudgetValue('category');
    $preference.value = storage.getBudgetValue('preference');
    if (storage.getBudgetValue('category')) {
      updateOptions($category.value);
    }
  },
  after_request: async ($options) => {
    const $subcategory = document.getElementById('subcategory');
    const $defaulValue = `<option value="" selected>${keys.subcategory_placeholder}</option>`;
    $subcategory.innerHTML = $defaulValue + $options;
    $subcategory.value = storage.getBudgetValue('subcategory');
  },
};

export default Step2;
