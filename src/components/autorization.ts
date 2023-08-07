import { createElement, createInputElement } from './utils';

export class LoginPage {
  mode = 'Autorization';

  private drawAuthBlock(parent: HTMLElement): void {
    createInputElement('email', 'E-mail', 'email', parent, 'login');
    createInputElement('password', 'Password', 'password', parent, 'login');
  }

  private drawRegBlock(parent: HTMLElement): void {
    createInputElement('email', 'E-mail*', 'email', parent, 'login');

    const nameBlock = createElement('div', ['login-row']);
    createInputElement('text', 'Name*', 'userName', nameBlock, 'login');
    createInputElement('text', 'Surname*', 'userSurname', nameBlock, 'login');
    parent.append(nameBlock);

    const userInfo = createElement('div', ['login-row']);
    createInputElement('date', 'Date of birth*', 'birthday', userInfo, 'login');
    createInputElement('tel', 'Phone number*', 'phoneNum', userInfo, 'login');
    parent.append(userInfo);

    const userAddress = createElement('div', ['login-row']);
    createInputElement('text', 'Country*', 'country', userAddress, 'login');
    createInputElement('text', 'City*', 'city', userAddress, 'login');
    createInputElement('text', 'Street*', 'street', userAddress, 'login');
    createInputElement('number', 'Code*', 'code', userAddress, 'login');
    parent.append(userAddress);

    const policyBlock = createElement('div', ['login-row', 'policy-row']);
    const policyInput = createElement('input', ['login-input']) as HTMLInputElement;
    policyInput.setAttribute('type', 'checkbox');
    policyInput.setAttribute('id', 'policyInput');
    policyInput.required = true;
    const policylabel = createElement(
      'label',
      ['login-label'],
      'I agree with <a href="">the terms of personal data processing</a> and <a href=""> privacy policy</a>',
    );
    policylabel.setAttribute('for', 'policylabel');
    policyBlock.append(policyInput);
    policyBlock.append(policylabel);
    parent.append(policyBlock);
  }

  public drawLoginPage(): void {
    const loginBlockType = this.mode === 'Autorization' ? 'autoriz-block' : 'reg-block';
    const loginPage = createElement('div', ['login-page']);
    const loginBlock = createElement('div', ['login-block', loginBlockType]);
    const loginHeader = createElement('div', ['login-header']);
    const loginBtnAutoriz = createElement('button', ['button', 'login-btn'], 'Autorization');
    const loginBtnReg = createElement('button', ['button', 'login-btn'], 'Registration');
    const loginForm = createElement('form', ['login-form']);

    const authFooter = `<p>I am not registered. <a href=''>Go to Registration.</a></p> 
    <p>I forgot password. <a href=''>Reset</a></p>`;
    const regFooter = `<p>I am registered. <a href="">Go to Login.</a></p>
    <p>I forgot password. <a href="">Reset</a></p>`;

    const parent = document.querySelector('.main');
    if (parent) {
      parent.innerHTML = '';
      parent.append(loginPage);
    }
    loginPage.append(loginBlock);
    loginBlock.innerHTML = '';
    loginBlock.append(loginHeader);
    loginHeader.append(loginBtnAutoriz);
    loginHeader.append(loginBtnReg);
    loginBlock.append(loginForm);
    loginForm.innerHTML = '';

    if (this.mode === 'Autorization') {
      this.drawAuthBlock(loginForm);
    } else {
      this.drawRegBlock(loginForm);
    }

    const submitBlock = createElement('div', ['login-submit-block']);
    const loginSubmitText = this.mode === 'Autorization' ? 'Enter' : 'Register';
    const loginSubmitBtn = createElement(
      'button',
      ['button', 'login-btn', 'uncolored'],
      loginSubmitText,
    );
    submitBlock.append(loginSubmitBtn);
    loginBlock.append(submitBlock);

    const footerText = this.mode === 'Autorization' ? authFooter : regFooter;
    const loginFooter = createElement('div', ['login-footer'], footerText);
    loginBlock.append(loginFooter);

    loginBtnAutoriz.addEventListener('click', () => {
      this.mode = 'Autorization';
      this.drawLoginPage();
    });

    loginBtnReg.addEventListener('click', () => {
      this.mode = 'Registration';
      this.drawLoginPage();
    });
  }
}
