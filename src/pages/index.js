import {FormValidator} from "../components/FormValidator.js";
import {Card} from "../components/Card.js";
import {Section} from "../components/Section";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";
import './index.css';
import {
    jobInput,
    nameInput,
    formNameElement,
    formPhotoElement,
    openProfileModalWindow,
    openCardModalWindow,
    openProfileButton,
    openCardButton,
    selectorFolder,
    initialCards, //массив карточек
} from "../utils/constants.js";

//атрибуты профиля в ДОМ
// const profileName = document.querySelector(".profile__name"); //имя в профиле
// const profileComment = document.querySelector(".profile__comment"); //коментарий в профиле
const userInfo = new UserInfo({nameSelector: '.profile__name', jobSelector: '.profile__comment'}); //обрабатываем данные с помощью класса юзер инфо.js

// const modalViewer = document.querySelector(".modal_viewer");//окно предпросмотра
const imagePopup = new PopupWithImage('.modal_viewer');


//функции Просмоторщика
// const clickForPreview = (data) => {
//     openModalWindow(modalViewer);
//     modalViewerTitle.textContent = data.name;
//     modalViewerPhotoUrl.src = data.link;
//    }
const clickForPreview = (item) => {
    imagePopup.open(item)
}
// //функция создания карточки
// const createCard = (data) => {
//     const newCard = new Card(data, ".template-card", clickForPreview);
//     const newCardElement = newCard.createCard(openCardModalWindow);
//     cardList.prepend(newCardElement);
// }
const addNewCard = (item) => {
    const card = new Card(item, '.template-card', clickForPreview);
    return card.createCard(open);
}

//submit имени и описания
const profileFormSubmitHandler = (values) => {
    userInfo.setUserInfo(values.name, values.comment);
    console.log("profileFormSubmitHandler",values.name, values.comment)
}

const profileAddSubmitHandler = (values) => {
    const name = values.title;
    const link = values.photo;
    console.log("profileAddSubmitHandler", values.title, values.photo)
    section.addItem(addNewCard({link, name}));
}

const editPopup = new PopupWithForm(profileFormSubmitHandler, '#edit');
const photoPopup = new PopupWithForm(profileAddSubmitHandler, '#photo-add');

const openEditPopup = () => {
    console.log("openEditPopup", nameInput.value)
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.name;
    jobInput.value = userData.job;
    console.log("openEditPopup", nameInput.value, userData.name)
    editPopup.open();
}

const openAddPopup = () => {
    photoPopup.open();
}

//слушатели из классов вышенаписаное
imagePopup.setEventListeners();
editPopup.setEventListeners();
photoPopup.setEventListeners();

openProfileButton.addEventListener('click', openEditPopup);
openCardButton.addEventListener('click', openAddPopup);

new FormValidator(selectorFolder, formNameElement).enableValidation(openProfileModalWindow);
new FormValidator(selectorFolder, formPhotoElement).enableValidation(openCardModalWindow);

const section = new Section({items: initialCards, renderer: addNewCard}, '.cards');
section.renderItems();

////////////////////////////////////////////////////////////////////////////////////////////////////////
// const modalEditProfile = document.querySelector(".modal_profile"); //окно изменения профиля
// const closeProfile = modalEditProfile.querySelector(".modal__button-close"); //ищем кнопку закрытия всех модалок
// const profileSaveButton = modalEditProfile.querySelector(".form__button");

// const formElement = modalEditProfile.querySelector(".form"); //форма модального окна 

// // находим разделы модалок через модификаторы
// const modalAddCard = document.querySelector(".modal_card");//окно добавления карточки


// //открытие и закрытие окон

// const closeAddCard = modalAddCard.querySelector(".modal__button-close");
// const closeViewer = modalViewer.querySelector(".modal__button-close");

// //Кнопки сохранения у форм
// const cardSaveButton = modalAddCard.querySelector(".form__button");



// //атрибуты загрузки карточки в ДОМ
// const formCardElement = modalAddCard.querySelector(".form"); // форма модального окна загрузки карточки
// const titleInput = formCardElement.querySelector("#title"); //поле ввода названия карточки
// const photoInput = formCardElement.querySelector("#photo"); //поле ввода ссылки
// const cardList = document.querySelector(".cards");

// //атрибуты окна предпросмотра
// const modalViewerTitle = modalViewer.querySelector(".modal__title");
// const modalViewerPhotoUrl = modalViewer.querySelector(".modal__photo");

// //функции открытия и закрытия окон + ескейп
// const openModalWindow = (modalElement) => {
//     modalElement.classList.add("modal_open");
//     document.addEventListener('keydown', CloseModalWindowByEsc);
// };

// const closeModalWindow = (modalElement) => {
//     modalElement.classList.remove("modal_open");
//     document.removeEventListener('keydown', CloseModalWindowByEsc);
// };

// const CloseModalWindowByEsc = (evt) => {
//     const openWindow = document.querySelector(".modal_open");
//     if (evt.key === 'Escape') {
//     closeModalWindow(openWindow)
// }};

// //функция передачи данных из формы в профиль на странице
// const formSubmitHandler = (evt) => {
//     evt.preventDefault();
//     profileName.textContent = nameInput.value;
//     profileComment.textContent = jobInput.value;
//     closeModalWindow(modalEditProfile);
// }

// //функция нажатия кнопки сохранить карточку
// const addCardSubmitHandler = (evt) => {
//     evt.preventDefault();
//     createCard({name:titleInput.value, link: photoInput.value});
//     closeModalWindow(modalAddCard);
//     titleInput.value = "";
//     photoInput.value = "";
//     cardSaveButton.classList.add("form__button_disabled");
//     cardSaveButton.disabled = true;
// }
// //закрытие модальных окон кликом по оверлею
// function closeByOverlay (event) {
//     if (event.target.classList.contains("modal")) {
//         closeModalWindow(event.target);
//     }
// };

// // слушатели нажатий и последующие действия
// //слушатель клика по оверлею
// modalViewer.addEventListener('click', closeByOverlay);
// modalEditProfile.addEventListener('mousedown', closeByOverlay);
// modalAddCard.addEventListener('mousedown', closeByOverlay);

// //слушатель редактирования профиля
// openProfileModalWindow.addEventListener("click", () =>{
//     nameInput.value = profileName.textContent; //подставляем имя в модалку
//     jobInput.value = profileComment.textContent; //подставляем комент в модалку
//     openModalWindow(modalEditProfile);
// });

// closeProfile.addEventListener("click", () => {
//     closeModalWindow(modalEditProfile)
// });

// formElement.addEventListener("submit", formSubmitHandler);

// //слушатель загрузки карточки
// openCardModalWindow.addEventListener("click", () => {
//     openModalWindow(modalAddCard);
//     formCardElement.reset();
// });


// formCardElement.addEventListener("submit", addCardSubmitHandler);






// //загрузка массива карточек на сайт
// initialCards.forEach((data) => {
//     createCard(data);
//  });