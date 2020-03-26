'use strict';
import Utils from '../../lib/utils';
import Storage from '../../storage';

const storage = new Storage();

const keys = {
  name_text: 'Nombre:',
  name_placeholder: '',
  email_text: 'Email:',
  email_placeholder: '',
  phone_text: 'Telefono',
  phone_placeholder: '',
  continue_button: 'Continuar »',
  back_button: '« Volver',
};

const Step3 = {
  render: async () => {
    return `
      <section>
        <div class="ss-step3-wrapper">
          <div class="ss-step3-text1 ss-form-text">
            ${keys.name_text}
          </div>
          <div class="ss-step3-input1">
            <input id="name" name="name" class="ss-input" placeholder="${keys.name_placeholder}"/>
          </div>
          <div class="ss-step3-text2 ss-form-text">
            ${keys.email_text}
          </div>
          <div class="ss-step3-input2">
            <input id="email" name="email" class="ss-input" placeholder="${keys.email_placeholder}"/>
          </div>
          <div class="ss-step3-text3 ss-form-text">
            ${keys.phone_text}
          </div>
          <div class="ss-step3-input3">
            <input id="phone" name="phone" class="ss-input" placeholder="${keys.phone_placeholder}"/>
          </div>
          <div class="ss-step3-footer">
            <a id="submit_btn" class="ss-step1-button" href="/">${keys.continue_button}</a>
          </div>
        <div>
      </section>
    `;
  },
  after_render: async () => {
    const next = Utils.createURL(storage.getPage(), storage.getNext());
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');

    name.value = storage.getBudgetValue('name');
    email.value = storage.getBudgetValue('email');
    phone.value = storage.getBudgetValue('phone');

    document.getElementById('submit_btn').addEventListener('click', (e) => {
      e.preventDefault();
      //todo
      console.log('click3', JSON.stringify(storage));
      Utils.goto(next);
    });
  },
};

export default Step3;
