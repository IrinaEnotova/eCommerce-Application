import { createElement } from './utils';
import Router from '../router/router';
import pages from '../router/pages';
import User from './user';

class Header {
  header: HTMLHeadElement;

  constructor(router: Router) {
    this.header = this.drawHeader();
    this.setEventListeners(router);
  }

  private drawHeader(): HTMLHeadElement {
    const body = document.querySelector('body') as HTMLBodyElement;
    const header = createElement('div', ['header']) as HTMLDivElement;
    const wrapper = createElement('div', ['wrapper', 'header__wrapper']) as HTMLDivElement;
    const nav = createElement('nav', ['header__navigation']) as HTMLElement;
    const burger = createElement('span', ['hamburger'], '<span class="hamburger__line"></span>') as HTMLSpanElement;
    const navList = createElement('div', ['header__navigation-list']) as HTMLDivElement;
    const logo = createElement(
      'div',
      ['header__logo'],
      '<h1 class="logo">t<span class="logo__peach">o</span><span class="logo__green">y</span><span class="logo__wine">s</span></h1>',
    ) as HTMLDivElement;
    const icons = createElement('div', ['header__icons']) as HTMLDivElement;
    const iconUser = createElement('span', ['header__icon', 'header__icon-user']) as HTMLSpanElement;
    const iconLogout = createElement('span', ['header__icon', 'header__icon-logout']) as HTMLSpanElement;
    const iconBascket = createElement('span', ['header__icon', 'header__icon-bascket']) as HTMLSpanElement;

    nav.append(burger, navList);
    icons.append(iconUser, iconBascket, iconLogout);
    wrapper.append(nav, logo, icons);
    header.append(wrapper);
    body.append(header);

    return header;
  }

  private navigateUser(router: Router): void {
    if (User.isLogged()) {
      router.navigate(pages.USER_PROFILE);
    } else {
      router.navigate(pages.AUTORIZATION);
    }
  }

  private toggleSidebar(): void {
    const dimming = document.querySelector('.sidebar__dimming');
    const sidebar = document.querySelector('.sidebar__wrapper');
    document.body.classList.add('hidden-overflow');
    dimming?.classList.add('active-dimming');
    sidebar?.classList.add('active-sidebar');
  }

  private setEventListeners(router: Router): void {
    this.header.addEventListener('click', (event: Event): void => {
      const target = event.target as HTMLElement;
      event.stopPropagation();

      if (target.classList.contains('header__icon-user') || target.classList.contains('header__name')) {
        this.navigateUser(router);
      }

      if (target.classList.contains('hamburger') || target.classList.contains('hamburger__line')) {
        this.toggleSidebar();
      }

      if (target.classList.contains('header__icon-logout')) {
        User.userLogout();
        router.navigate(pages.AUTORIZATION);
      }
    });
  }
}

export default Header;
