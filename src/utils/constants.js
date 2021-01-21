export const nameInput = document.querySelector("#name"); //поле ввода имени
export const jobInput = document.querySelector("#about"); //поле ввода комментария

export const edit = '#edit'; //переменная формы редактирования
export const photoAdd = '#photo-add'; //переменная формы добавления картинки
export const avatarAdd = '#avatar'; //переменная формы добавления аватарки
export const popupDel = '#del-popup'; //переменная формы удаления картинки

export const formNameElement = document.querySelector('#edit-profile') //форма редактирования профиля
export const formPhotoElement = document.querySelector('#load-cards') //форма загрузки карточки
export const formAvatarElement = document.querySelector('#load-avatar') //форма загрузки аватарки

export const openProfileButton = document.querySelector(".profile__button-edit"); //для слушателя кнопка открытия окна профиля
export const openCardButton = document.querySelector(".profile__button-add"); //для слушателя кнопкаоткрытия окна загрузки карточки
export const openAvatarButton = document.querySelector(".profile__avatar-edit-button"); //для слушателя кнопкаоткрытия окна загрузки аватарки


export const selectorFolder = {
    formSelector: ".form",
    inputSelector: ".form__item",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_disabled",
    inputErrorClass: "form__item_type_error",
    errorClass: "form__input-error_active",
  };