import { createElement, encodeText } from './utils';
import Sidebar from './sidebar';
import Router from '../router/router';
import { pages } from '../router/pages';
import { checkValidity } from '../api/helpers/checkValidity';
import removeCustomerAddress from '../api/customer/update/remove-address';
import Catalog from '../pages/catalog';
import Filters from './filters';
import {
  toggleProfileEditMode,
  toggleProfileItems,
  toggleAccordion,
  handlerSameAddresses,
  handlerCountry,
  handlerShowPassword,
  handlerValInput,
  handlersProfileUpdates,
  handlerChangePaswwordSubmit,
  handlerChangeEmailSubmit,
  handlerAddAddressSubmit,
  handlerProfileEditMode,
  handlerDefaultAddress,
  clearCart,
} from '../components/handlers';
import {
  addFilterNavigationForCheckbox,
  addFilterNavigationForPrices,
  addFilterNavigationForSearch,
  addFilterNavigationForSelect,
  addNavigationForSidebar,
  clearFilterForPrices,
  clearFilterForSearch,
  loadMoreProducts,
  redrawProducts,
  toggleCatalogAddProductButton,
} from './handlers-catalog';
import { changeCartItemQuantityFromCart } from './handlers-cart';
import {
  toggleCardAddProductButton,
  changeCartItemQuantityFromCard,
  switchNextSlide,
  switchPrevSlide,
  getImagebyMini,
  toggleCardModal,
} from './handlers-card';
import Header from './header';
import { loginViaForm, registerViaForm } from './handlers-autorizarion';

class Main {
  mainElement: HTMLDivElement;

  sidebar: Sidebar;

  sidebarWrapper: HTMLDivElement;

  constructor(router: Router) {
    this.sidebar = new Sidebar();
    this.sidebarWrapper = this.sidebar.drawSidebar();
    this.mainElement = this.drawMain();
    this.setEventListeners(router);
  }

  public drawMain(): HTMLDivElement {
    const body = document.querySelector('body') as HTMLBodyElement;
    const main = createElement('div', ['main']) as HTMLDivElement;
    const dimming = createElement('div', ['sidebar__dimming']) as HTMLDivElement;
    Header.addProductsNumberInBasket();

    body.append(main, this.sidebarWrapper, dimming);

    return main;
  }

  static setContent(element: HTMLDivElement): void {
    const main = document.querySelector('.main') as HTMLDivElement;
    const content = element.outerHTML;
    main.innerHTML = content;
  }

  static createTitleDecorator(): HTMLDivElement {
    const decorator = createElement('div', ['decorator']) as HTMLDivElement;
    const blue = createElement('div', ['decorator__blue']) as HTMLDivElement;
    const peach = createElement('div', ['decorator__peach']) as HTMLDivElement;
    const green = createElement('div', ['decorator__green']) as HTMLDivElement;

    decorator.append(blue, peach, green);
    return decorator;
  }

  private setEventListeners(router: Router): void {
    document.addEventListener('click', async (event: Event): Promise<void> => {
      const target = event.target as HTMLElement;

      if (target.classList.contains('sidebar__link') && target.dataset.page === 'main') {
        router.navigate(pages.MAIN);
        this.sidebar.closeSidebar();
      }

      if (target.classList.contains('sidebar__link') && target.dataset.page === 'catalog') {
        Catalog.clearSortedProducts();
        router.navigate(pages.CATALOG);
        this.sidebar.closeSidebar();
      }

      if (target.classList.contains('logo') || target.parentElement?.classList.contains('logo')) {
        router.navigate(pages.MAIN);
        this.sidebar.closeSidebar();
      }

      if (target.id === 'form-reg-btn') {
        router.navigate(pages.REGISTRATION);
      }

      if (target.id === 'form-auth-btn') {
        router.navigate(pages.AUTORIZATION);
      }

      if (
        !(
          target.classList.contains('profile__content') ||
          target.closest('.profile__content') ||
          target.classList.contains('profile__address__btn')
        ) &&
        target.closest('.profile__item_inline')
      ) {
        toggleProfileItems(target);
      }

      if (
        (!(target.classList.contains('profile__modal') || target.closest('.profile__modal')) &&
          target.closest('.profile__item_modal')) ||
        target.classList.contains('modal-cancel')
      ) {
        toggleProfileItems(target);
      }

      if (target.classList.contains('profile__edit-btn')) {
        toggleProfileEditMode(target);
      }

      if (target.classList.contains('profile__update')) {
        handlersProfileUpdates(target);
      }

      if (target.classList.contains('profile__address__delete-btn')) {
        const address = target.closest('.profile__address');
        if (address && address instanceof HTMLElement && address.dataset.id) {
          removeCustomerAddress(address.dataset.id);
        }
      }

      if (target.classList.contains('profile__address__edit-btn')) {
        handlerProfileEditMode(target);
      }
      if (target.classList.contains('profile__address__default-btn')) {
        handlerDefaultAddress(target);
      }

      if (target.classList.contains('main-page__page')) {
        const pageName: string = target.dataset.page ? target.dataset.page : '';
        if (pageName === 'catalog') Catalog.clearSortedProducts();
        router.navigate(pageName);
      }

      if (
        target.classList.contains('product-card__next-slide') ||
        target.classList.contains('modal-card__next-slide')
      ) {
        switchNextSlide();
      }

      if (
        target.classList.contains('product-card__prev-slide') ||
        target.classList.contains('modal-card__prev-slide')
      ) {
        switchPrevSlide();
      }

      if (target.classList.contains('product-card__mini-img')) {
        getImagebyMini(target);
      }

      if (
        target.classList.contains('product-card__slide-img') ||
        target.classList.contains('modal-card__close-btn') ||
        (target.classList.contains('modal-card__dimming') && target !== document.querySelector('.modal-card__wrapper'))
      ) {
        const cardWrapper = document.querySelector('.product-card') as HTMLDivElement;
        const currentIndex = +cardWrapper.getAttribute('data-slideIndex')!;
        toggleCardModal(currentIndex);
      }

      if (target.classList.contains('product-card__add-to-cart')) {
        toggleCardAddProductButton(target, router);
      }

      if (target.classList.contains('product-card__increase-quantity')) {
        changeCartItemQuantityFromCard(target, router, 'add');
      }

      if (target.classList.contains('product-card__decrease-quantity')) {
        changeCartItemQuantityFromCard(target, router, 'decrease');
      }

      if (target.classList.contains('filters__item')) {
        toggleAccordion(target.id, target, 'filters');
      }

      if (target.classList.contains('filters__checkbox')) {
        const currentTarget = target as HTMLInputElement;
        addFilterNavigationForCheckbox(currentTarget);
      }

      if (target.classList.contains('filters__button')) {
        Filters.resetAllFilters();
        redrawProducts();
      }

      if (target.classList.contains('mobile-filters__item')) {
        toggleAccordion('mobile-filters', target, 'mobile-filters');
      }

      if (target.classList.contains('filters__apply_prices')) {
        addFilterNavigationForPrices();
      }

      if (target.classList.contains('filters__close_prices')) {
        clearFilterForPrices();
      }

      if (target.classList.contains('filters__close_search')) {
        clearFilterForSearch();
      }

      if (
        target.classList.contains('sidebar__category') ||
        target.classList.contains('sidebar__category-item') ||
        target.classList.contains('catalog__breadcrumb')
      ) {
        const currentTarget = target as HTMLLIElement;
        addNavigationForSidebar(currentTarget, router, this.sidebar);
      }

      if (target.classList.contains('catalog__product')) {
        const currentID = target.id;
        router.navigate(`${pages.CATALOG}/${currentID}`);
      }

      if (target.classList.contains('product__buttons') || target.classList.contains('product__button')) {
        event.stopPropagation();
        toggleCatalogAddProductButton(target);
      }

      if (target.parentElement?.classList.contains('catalog__product')) {
        const parentDiv = target.parentNode as HTMLDivElement;
        const currentID = parentDiv.id;
        router.navigate(`${pages.CATALOG}/${currentID}`);
      }

      if (target.classList.contains('cart__delete-cart-btn')) {
        clearCart().then(() => {
          router.navigate(pages.CART);
        });
      }

      if (target.classList.contains('catalog__load-more-button')) {
        await loadMoreProducts(target);
      }

      if (target.classList.contains('cart__link-to-catalog')) {
        event.preventDefault();
        Catalog.clearSortedProducts();
        router.navigate(pages.CATALOG);
      }

      if (target.classList.contains('cart__item__btn-plus')) {
        changeCartItemQuantityFromCart(target, router, 'add');
      }

      if (target.classList.contains('cart__item__btn-minus')) {
        changeCartItemQuantityFromCart(target, router, 'decrease');
      }

      if (target.classList.contains('cart__item__btn-delete')) {
        changeCartItemQuantityFromCart(target, router, 'remove');
      }
    });

    document.addEventListener('submit', async (event: Event) => {
      const target = event.target as HTMLElement;

      if (target.classList.contains('login-form')) {
        event.preventDefault();
        const isValid: boolean = checkValidity();
        if (isValid) {
          loginViaForm(target as HTMLFormElement, router);
        }
      }

      if (target.classList.contains('register-form')) {
        event.preventDefault();
        const isValid: boolean = checkValidity();
        if (isValid) {
          registerViaForm(router);
        }
      }

      if (target.classList.contains('product-card__form')) {
        event.preventDefault();
      }

      if (target.classList.contains('profile__password__form')) {
        handlerChangePaswwordSubmit(event, target);
      }

      if (target.classList.contains('profile__e-mail__form')) {
        handlerChangeEmailSubmit(event, target);
      }

      if (target.classList.contains('profile__address__form')) {
        handlerAddAddressSubmit(event, target);
      }
    });

    document.addEventListener('input', (event: Event): void => {
      const target = event.target as HTMLInputElement;

      if (
        !target.parentElement?.classList.contains('filters__checkbox-block') &&
        !target.classList.contains('filters__search') &&
        !target.classList.contains('filters__price-input') &&
        !target.classList.contains('filters__select')
      ) {
        handlerValInput(event);
      }
    });

    document.addEventListener('change', (event: Event): void => {
      const target = event.target as HTMLElement;

      if (target.id === 'are-same-addresses') {
        handlerSameAddresses();
      }

      if (target.id.includes('country')) {
        handlerCountry(target);
      }

      if (target.id.includes('showPassword')) {
        handlerShowPassword(target);
      }

      if (target.classList.contains('filters__select')) {
        const currentTarget = target as HTMLSelectElement;
        addFilterNavigationForSelect(currentTarget);
      }

      if (target.classList.contains('filters__search')) {
        const currentTarget = target as HTMLInputElement;
        addFilterNavigationForSearch(currentTarget);
      }
    });
  }
}

export default Main;
