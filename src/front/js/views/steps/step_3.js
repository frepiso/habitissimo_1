'use strict';
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
  free_text: 'gratis y sin compromiso',
};

const fetchData = async (id) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'text/plain',
    },
  };
  try {
    const response = await fetch(`http://localhost:3000/validator/` + id, options);
    const json = await response.json();
    return json;
  } catch (err) {
    console.log('Error getting data server', err);
  }
};

const isValidEmail = async (email) => {
  const isValid = await fetchData(email);
  if (isValid) {
    storage.setBudgetValue('email', email);
  } else {
    // show Error
  }
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
            <div class="ss-step-backbutton">
              <a id="back_button" class="ss-step-back-button">${keys.back_button}</a>
            </div>
            <a id="submit_btn" class="ss-step-button" href="/">${keys.continue_button}</a>
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
    const validation = () => {
      const isValid = {
        name: false,
        phone: false,
        email: false,
      };
      // todo if validation
      if ($name.value !== '' && $phone.value !== '') {
        storage.setBudgetValue('name', $name.value);
        isValid.name = true;
      }
      if ($phone.value !== '') {
        storage.setBudgetValue('phone', $phone.value);
        isValid.phone = true;
      }
      if ($email.value !== '') {
        isValidEmail($email.value);
        isValid.email = true;
      }
      // end if
      return isValid;
    };

    $backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const url = Utils.createURL(storage.getPage(), storage.getPrev());
      validation();
      Utils.goto(url);
    });

    $submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const url = Utils.createURL(storage.getPage(), storage.getNext());
      const isValid = validation();
      if (isValid.name && isValid.phone && isValid.email) {
        Utils.goto(url);
      }
    });

    $name.value = storage.getBudgetValue('name');
    $email.value = storage.getBudgetValue('email');
    $phone.value = storage.getBudgetValue('phone');
  },
};

export default Step3;
