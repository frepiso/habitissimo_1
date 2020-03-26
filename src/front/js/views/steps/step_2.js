'use strict';
import Utils from '../../lib/utils';
import Storage from '../../storage';

const storage = new Storage();

const keys = {
  category_text: 'Categoría del trabajo:',
  category_placeholder: '',
  subcategory_text: 'Subcategoría del trabajo:',
  subcategory_placeholder: '',
  preference_text: 'Preferencia precio',
  preference_placeholder: '',
  continue_button: 'Continuar »',
  back_button: '« Volver',
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
            <input id="category" name="category" class="ss-input" placeholder="${keys.category_placeholder}"/>
          </div>
          <div class="ss-step1-text2 ss-form-text">
            ${keys.subcategory_text}
          </div>
          <div class="ss-step1-input2">
            <select id="subcategory" name="subcategory" type="text" class="ss-select">
              <option value="" selected disabled>${keys.subcategory_placeholder}</option>
            <select>
          </div>
          <div class="ss-step2-text3 ss-form-text">
            ${keys.preference_text}
          </div>
          <div class="ss-step2-input3">
            <select id="preference" name="preference" type="text" class="ss-select">
              <option value="" selected disabled>${keys.preference_placeholder}</option>
            <select>
          </div>
          <div class="ss-step2-footer">
            <a id="submit_btn" class="ss-step1-button" href="/">${keys.continue_button}</a>
          </div>
        <div>
      </section>
    `;
  },
  after_render: async () => {
    const next = Utils.createURL(storage.getPage(), storage.getNext());
    const category = document.getElementById('category');
    const subcategory = document.getElementById('subcategory');
    const preference = document.getElementById('preference');

    category.value = storage.getBudgetValue('category');
    subcategory.value = storage.getBudgetValue('subcategory');
    preference.value = storage.getBudgetValue('preference');

    document.getElementById('submit_btn').addEventListener('click', (e) => {
      e.preventDefault();
      //todo
      console.log('click2', JSON.stringify(storage));
      Utils.goto(next);
    });
  },
};

export default Step2;