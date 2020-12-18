export const nameInput = document.querySelector("#name"); //поле ввода имени
export const jobInput = document.querySelector("#comment"); //поле ввода комментария

export const formNameElement = document.querySelector('#edit-profile') //форма редактирования профиля
export const formPhotoElement = document.querySelector('#load-cards') //форма загрузки карточки

export const openProfileModalWindow = document.querySelector(".profile__button-edit"); //ищем кнопку открытия окна профиля
export const openCardModalWindow = document.querySelector(".profile__button-add"); //ищем кнопку открытия окна загрузки карточки

export const openProfileButton = document.querySelector(".profile__button-edit"); //для слушателя кнопка открытия окна профиля
export const openCardButton = document.querySelector(".profile__button-add"); //для слушателя кнопкаоткрытия окна загрузки карточки


export const selectorFolder = {
    formSelector: ".form",
    inputSelector: ".form__item",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_disabled",
    inputErrorClass: "form__item_type_error",
    errorClass: "form__input-error_active",
  };

  // массив начальных картинок
export const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];