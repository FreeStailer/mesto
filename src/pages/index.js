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

const userInfo = new UserInfo({nameSelector: '.profile__name', jobSelector: '.profile__comment'}); //обрабатываем данные с помощью класса юзер инфо.js
const imagePopup = new PopupWithImage('.modal_viewer');


//функции Просмоторщика
const clickForPreview = (item) => {
    imagePopup.open(item)
}

//функция создания карточки
const addNewCard = (item) => {
    const card = new Card(item, '.template-card', clickForPreview);
    return card.createCard(open);
}

const profileAddSubmitHandler = (values) => {
    const name = values.title;
    const link = values.photo;
    section.addItem(addNewCard({link, name}));
}

//submit имени и описания
const profileFormSubmitHandler = (values) => {
    userInfo.setUserInfo(values.name, values.comment);
}

const editPopup = new PopupWithForm(profileFormSubmitHandler, '#edit');
const photoPopup = new PopupWithForm(profileAddSubmitHandler, '#photo-add');

const openEditPopup = () => {
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.name;
    jobInput.value = userData.job;
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