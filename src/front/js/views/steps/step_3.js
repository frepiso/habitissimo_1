'use strict';
import Config from '../../config/app.config';
import Utils from '../../lib/utils';
import Storage from '../../Storage';

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
  reset_button: 'Reset',
  free_text: 'gratis y sin compromiso',
};

const isValid = async (email, url, allowedNav) => {
  const isValidEmail = await Utils.getData(email, Config.endpoint_validator);
  await Step3.after_request(isValidEmail, url, allowedNav);
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
            <input id="name" name="name" class="ss-input" data-validation="required" placeholder="${keys.name_placeholder}"/>
          </div>
          <div class="ss-step3-text2 ss-form-text">
            ${keys.email_text}
          </div>
          <div class="ss-step3-input2">
            <input id="email" name="email" class="ss-input" data-validation="required email" placeholder="${keys.email_placeholder}"/>
          </div>
          <div class="ss-step3-text3 ss-form-text">
            ${keys.phone_text}
          </div>
          <div class="ss-step3-input3">
            <input id="phone" name="phone" class="ss-input" data-validation="required phone" placeholder="${keys.phone_placeholder}"/>
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
    const $name = document.getElementById('name');
    const $email = document.getElementById('email');
    const $phone = document.getElementById('phone');
    const $submitBtn = document.getElementById('submit_btn');
    const $backBtn = document.getElementById('back_button');
    const $resetBtn = document.getElementById('reset_button');

    $backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const url = Utils.createURL(storage.getPage(), storage.getPrev());
      isValid($email.value, url, true);
    });

    $submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const url = Utils.createURL(storage.getPage(), storage.getNext());
      isValid($email.value, url, false);
    });

    $resetBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const page = storage.getPage();
      storage.clearBudget();
      storage.clearRouter();
      const url = Utils.createURL(page, storage.getStep());
      Utils.goto(url);
    });

    $name.addEventListener('focus', (el) => {
      Utils.removeClass(el, 'ss-error');
    });

    $email.addEventListener('focus', (el) => {
      Utils.removeClass(el, 'ss-error');
    });

    $phone.addEventListener('focus', (el) => {
      Utils.removeClass(el, 'ss-error');
    });

    $name.value = storage.getBudgetValue('name');
    $email.value = storage.getBudgetValue('email');
    $phone.value = storage.getBudgetValue('phone');
  },
  after_request: (isValidEmail, url, allowedNav) => {
    const $name = document.getElementById('name');
    const $email = document.getElementById('email');
    const $phone = document.getElementById('phone');
    const isValid = {
      name: false,
      phone: false,
      email: false,
    };

    if (Utils.validation($name)) {
      storage.setBudgetValue('name', $name.value);
      isValid.name = true;
    } else {
      $name.classList.add('ss-error');
    }

    if (Utils.validation($email) && isValidEmail) {
      storage.setBudgetValue('email', $email.value);
      isValid.email = true;
    } else {
      $email.classList.add('ss-error');
    }

    if (Utils.validation($phone)) {
      storage.setBudgetValue('phone', $phone.value);
      isValid.phone = true;
    } else {
      $phone.classList.add('ss-error');
    }

    if (allowedNav) {
      Utils.goto(url);
    } else {
      if (isValid.name && isValid.phone && isValid.email) {
        Utils.goto(url);
      }
    }
  },
};

export default Step3;
