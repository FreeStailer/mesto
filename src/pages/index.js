import {FormValidator} from "../components/FormValidator.js";
import {Card} from "../components/Card.js";
import {Section} from "../components/Section";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {PopupWithSubmit} from "../components/PopupWithSubmit.js";
import {UserInfo} from "../components/UserInfo.js";
import './index.css';
import {
    jobInput,
    nameInput,
    formNameElement,
    formPhotoElement,
    formAvatarElement,
    openProfileButton,
    openCardButton,
    openAvatarButton,
    selectorFolder,
    edit,
    photoAdd,
    popupDel,
    avatarAdd,
} from "../utils/constants.js";
import {Api} from "../components/Api.js";

let section
const userInfo = new UserInfo({nameSelector: '.profile__name', jobSelector: '.profile__comment'}, '.profile__avatar'); //обрабатываем данные с помощью класса юзер инфо.js
const imagePopup = new PopupWithImage('.modal_viewer');

//база для поключения к WebAPI
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-19',
    headers: {
        authorization: '047d2b93-9a25-4779-80e5-3e6df788b9a7',
        'Content-Type': 'application/json'
    }
})

//функции Просмоторщика
const handleCardClick = (result) => {
    imagePopup.open(result)
}

//клик по лайку
const handleLikeClick = (card) => {
    const handleLikeResponse = (res) => {
        card.likeCounter(res.likes, res.likes.some(
            (user) => user._id === userInfo.getUserId()
            ))
    }
    if (!card.getCardLiked()) {
        api.takeCardLike(card.getCardId())
        .then(handleLikeResponse)
        .catch((err) => {
            console.log(err);
        })
    } else {
        api.removeCardLike(card.getCardId())
        .then(handleLikeResponse)
        .catch((err) => {
            console.log(err);
        })
    }
}

//т.к. клик по корзинке у нас теперь не удаляет картинку а открывает попап - клик по корзине:
const handleDelClick = (card) => {
    delPopup.setCallback(() => {
        delSubmitHandler(card)
    })
    delPopup.open()
}

//функция создания карточки
const addNewCard = (result) => {
    const card = new Card({
        data: result,
        liked: result.likes.some((user) => user._id === userInfo.getUserId()),
        owned: result.owner._id === userInfo.getUserId(),
        handleCardClick,
        handleLikeClick,
        handleDelClick
    }, '#card')
    return card.createCard(open);
}

//сохранение изменений профиля
const profileFormSubmitHandler = (values) => {
    editPopup.renderLoadingProfile(true);
    api.patchUserData(values)
    .then((result) =>{
        editPopup.close()
        userInfo.setUserInfo(result.name, result.about)
        editPopup.renderLoadingProfile(false)})
    .catch((err) => {
        console.log(err);
    })
}

//сохранение аватарки
const avatarSubmitHandler = (values) => {
    avatarPopup.renderLoadingProfile(true);
    api.patchUserAvatar(values)
    .then((result) =>{
        avatarPopup.close()
        userInfo.setUserAvatar(result.avatar)
        avatarPopup.renderLoadingProfile(false)})
    .catch((err) => {
        console.log(err);
    })
}

//подтверждение создания карточки
const profileAddSubmitHandler = (values) => {
    photoPopup.renderLoadingPhoto(true)
    api.addUserCard(values)
    .then(res => {
        section.addItem(addNewCard(res))
        photoPopup.renderLoadingPhoto(false)
        photoPopup.close()
    })
    .catch((err) => {
        console.log(err);
    })
}

//подтверждение удаления карточки
const delSubmitHandler = (card) => {
    api.delCard(card.getCardId())
    .then(() => {
        card.delCard()
        delPopup.close()
    })
    .catch((err) => {
        console.log(err);
    })
}

//открытие попапов:
const openEditPopup = () => {
    const userData = userInfo.getUserInfo()
    nameInput.value = userData.name;
    jobInput.value = userData.about;
    editPopup.open()
}

const openAddPopup = () => {
    photoPopup.open()
}

const openAvatarPopup = () => {
    avatarPopup.open()
}

//Загрузка карточек на сайт
const loadCards = () => {
    api.getInitialCards()
    .then((result) => {
        section = new Section({items: result, renderer: addNewCard}, '.cards');
        section.renderItems();
    })
    .catch((err) => {
        console.log('Ошибка в лоад кардс', err);
    })
}

//загрузка данных профиля юзера
const loadUser = () => {
    api.getUserData()
    .then((res) => {
        userInfo.setUserInfo(res.name, res.about)
        userInfo.setUserAvatar(res.avatar)
        userInfo.setUserId(res._id)
    })
    .catch((err) => {
        console.log(err);
    })
}

const editPopup = new PopupWithForm(profileFormSubmitHandler, edit);
const photoPopup = new PopupWithForm(profileAddSubmitHandler, photoAdd);
const avatarPopup = new PopupWithForm(avatarSubmitHandler, avatarAdd);
const delPopup = new PopupWithSubmit(popupDel);

imagePopup.setEventListeners();
editPopup.setEventListeners();
photoPopup.setEventListeners();
avatarPopup.setEventListeners();
delPopup.setEventListeners();

//навешиваем слушатели на кнопки
openProfileButton.addEventListener('click', openEditPopup);
openCardButton.addEventListener('click', openAddPopup);
openAvatarButton.addEventListener('click', openAvatarPopup);

//валидация форм
const profileFormValidator = new FormValidator(selectorFolder, formNameElement);
profileFormValidator.enableValidation();

const imageFormValidator = new FormValidator(selectorFolder, formPhotoElement);
imageFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(selectorFolder, formAvatarElement);
avatarFormValidator.enableValidation();


loadUser()
loadCards()