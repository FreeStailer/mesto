// массив начальных картинок
const initialCards = [
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
//общие переменные модалки профиля
const openModalWindow = document.querySelector(".profile__button-edit"); //ищем кнопку открытия окна профиля
const Modal = document.querySelector(".modal"); //ищем модальное окно профиля
const closeModalWindow = document.querySelector(".modal__button-close"); //ищем кнопку закрытия окна профиля

//Общие атрибуты профиля в ДОМ
let formElement = document.querySelector(".form"); //форма модального окна 
let profileName = document.querySelector(".profile__name"); //имя в профиле
let profileComment = document.querySelector(".profile__comment"); //коментарий в профиле
let nameInput = document.querySelector("#name"); //поле ввода имени
let jobInput = document.querySelector("#comment"); //поле ввода комментария

//общие переменные модалки загрузки карточки
const openModalCardWindow = document.querySelector(".profile__button-add"); //ищем кнопку открытия окна загрузки карточки
const ModalCard = document.querySelector(".modal-card"); //ищем модальное окно загрузки карточки
const closeModalCardWindow = document.querySelector(".modal-card__button-close"); //ищем кнопку закрытия окна загрузки карточки

//Общие атрибуты окна загрузки карточек в ДОМ
let formCardElement = document.querySelector(".form-card"); // вдруг пригодится, форма модального окна
let titleInput = document.querySelector("#title"); //поле ввода названия карточки
let photoInput = document.querySelector("#photo"); //поле ввода ссылки
const cardList = document.querySelector(".cards");
const cardTemplate = document.querySelector(".template-card").content.querySelector(".card");
 

// переменные Просмоторщика
const closeModalViewerWindow = document.querySelector(".modal-viewer__button-close"); //ищем кнопку закрытия окна просмотра
const modalViewer = document.querySelector(".modal-viewer"); //ищем модальное окно просмотра

const modalViewerTitle = modalViewer.querySelector(".card-viewer__title");
const modalViewerPhotoUrl = modalViewer.querySelector(".card-viewer__photo");


//функция открытия окна и заполнения содержимым из профиля
function openModal() {
    Modal.classList.add("modal_open");
    nameInput.value = profileName.textContent; //подставляем имя в модалку
    jobInput.value = profileComment.textContent; //подставляем комент в модалку
}

//функция закрытия окна редактирования профиля
function closeModal() {
    Modal.classList.remove("modal_open");
}

//функция открытия и закрытия окна загрузки карточки
function openModalCard() {
    ModalCard.classList.toggle("modal-card_open");
}

//функция передачи данных из формы в профиль на странице
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileComment.textContent = jobInput.value;
    closeModal();
}

//функция создания карточки
function createCard(data) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardTitle = cardElement.querySelector(".card__title");
    const cardPhoto = cardElement.querySelector(".card__photo");
    const cardLikeButton = cardElement.querySelector(".card__like");
    const cardDeleteButton = cardElement.querySelector(".card__delete");
//лайк карточки
    cardLikeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle("card__like_active");
    })
//удаление карточки
    cardDeleteButton.addEventListener("click", function(evt) {
        const deleteCard = cardDeleteButton.closest(".card");
        deleteCard.remove();
    });
//нажатие просмотр картинки
    cardPhoto.addEventListener("click", function(evt) {
        photoClick(cardPhoto.src, cardTitle.textContent, cardPhoto.alt );
    });
//тянем из массива данные
    cardTitle.textContent = data.name;
    cardPhoto.src = data.link;
    return cardElement;
}

//функция загрузки массива
function renderCard(data) {
    cardList.prepend(createCard(data));  //порядок с начала и функция создания карточки
}

//загрузка массива карточек на сайт
 initialCards.forEach((data) => {
    renderCard(data)
 })

//функция нажатия кнопки сохранить карточку
function addCardSubmitHandler (evt) {
    evt.preventDefault();
    renderCard({name:titleInput.value, link: photoInput.value});
    openModalCard();
}

//функции Просмоторщика
function photoClick(src, textcontent) {
    modalViewer.classList.add("modal-viewer__open");
    modalViewerTitle.textContent = textcontent;
    modalViewerPhotoUrl.src = src;
  }

function openModalViwer() {
    modalViewer.classList.toggle("modal-viewer__open");
}

// слушатели нажатий и последующие действия
//редактирования профиля
openModalWindow.addEventListener("click", openModal);
closeModalWindow.addEventListener("click", closeModal);
formElement.addEventListener("submit", formSubmitHandler);
//загрузки карточки
openModalCardWindow.addEventListener("click", openModalCard);
closeModalCardWindow.addEventListener("click", openModalCard);
formCardElement.addEventListener("submit", addCardSubmitHandler);
//вкл выкл просмоторщик
closeModalViewerWindow.addEventListener("click", openModalViwer);