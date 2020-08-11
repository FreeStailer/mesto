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
// находим разделы модалок через модификаторы
const modalEditProfile = document.querySelector(".modal_profile"); //окно изменения профиля
const modalAddCard = document.querySelector(".modal_card");//окно добавления карточки
const modalViewer = document.querySelector(".modal_viewer");//окно предпросмотра

//открытие и закрытие окон
const openProfileModalWindow = document.querySelector(".profile__button-edit"); //ищем кнопку открытия окна профиля
const openCardModalWindow = document.querySelector(".profile__button-add"); //ищем кнопку открытия окна загрузки карточки
const closeProfile = modalEditProfile.querySelector(".modal__button-close"); //ищем кнопку закрытия всех модалок
const closeAddCard = modalAddCard.querySelector(".modal__button-close");
const closeViewer = modalViewer.querySelector(".modal__button-close");

//атрибуты профиля в ДОМ
const formElement = modalEditProfile.querySelector(".form"); //форма модального окна 
let profileName = document.querySelector(".profile__name"); //имя в профиле
let profileComment = document.querySelector(".profile__comment"); //коментарий в профиле
let nameInput = formElement.querySelector("#name"); //поле ввода имени
let jobInput = formElement.querySelector("#comment"); //поле ввода комментария

//атрибуты загрузки карточки в ДОМ
const formCardElement = modalAddCard.querySelector(".form"); // форма модального окна загрузки карточки
const titleInput = formCardElement.querySelector("#title"); //поле ввода названия карточки
const photoInput = formCardElement.querySelector("#photo"); //поле ввода ссылки
const cardList = document.querySelector(".cards");
const cardTemplate = document.querySelector(".template-card").content.querySelector(".card");

//атрибуты окна предпросмотра
const modalViewerTitle = modalViewer.querySelector(".modal__title");
const modalViewerPhotoUrl = modalViewer.querySelector(".modal__photo");
const ModalWindow = document.querySelectorAll(".modal_open");

//функции открытия и закрытия окон + ескейп
const openModalWindow = (modalElement) => {
    modalElement.classList.add("modal_open");
    document.addEventListener('keydown', escCloseModalWindow);
};

const closeModalWindow = (modalElement) => {
    modalElement.classList.remove("modal_open");
    document.removeEventListener('keydown', escCloseModalWindow);
};

const escCloseModalWindow = (evt) => {
    const openWindow = document.querySelector(".modal_open");
    if (evt.key === 'Escape') {
    closeModalWindow(openWindow)
}};
////////////////////////////////////////
//функция передачи данных из формы в профиль на странице
const formSubmitHandler = (evt) => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileComment.textContent = jobInput.value;
    closeModalWindow(modalEditProfile);
}

//функция создания карточки
const createCard = (data) => {
    const cardElement = cardTemplate.cloneNode(true);
    const cardTitle = cardElement.querySelector(".card__title");
    const cardPhoto = cardElement.querySelector(".card__photo");
    const cardLikeButton = cardElement.querySelector(".card__like");
    const cardDeleteButton = cardElement.querySelector(".card__delete");
//лайк карточки
    cardLikeButton.addEventListener('click', (evt) =>
    evt.target.classList.toggle("card__like_active")
    )
//удаление карточки
    cardDeleteButton.addEventListener("click", (evt) =>
    cardDeleteButton.closest(".card").remove()
    );
//нажатие просмотр картинки
    cardPhoto.addEventListener("click", (evt) =>
        photoClick(cardPhoto.src, cardTitle.textContent)
    );
//тянем из массива данные
    cardTitle.textContent = data.name;
    cardPhoto.src = data.link;
    return cardElement;
}

//функция загрузки массива
const renderCard = (data) => {
    cardList.prepend(createCard(data));  //порядок с начала и функция создания карточки
}

//функция нажатия кнопки сохранить карточку
const addCardSubmitHandler = (evt) => {
    evt.preventDefault();
    renderCard({name:titleInput.value, link: photoInput.value});
    closeModalWindow(modalAddCard);
    titleInput.value = "";
    photoInput.value = "";
}

//функции Просмоторщика
const photoClick = (src, textcontent) => {
    openModalWindow(modalViewer);
    modalViewerTitle.textContent = textcontent;
    modalViewerPhotoUrl.src = src;
  }

//закрытие модальных окон кликом по оверлею
modalViewer.addEventListener('click', (evt) => {
    if(!evt.target.closest('.modal__photo')) {
      closeModalWindow(modalViewer);
    }
});

modalEditProfile.addEventListener('mousedown', (evt) => {
    if(!evt.target.closest('.modal__content')) {
      closeModalWindow(modalEditProfile);
    }
});

modalAddCard.addEventListener('mousedown', (evt) => {
    if(!evt.target.closest('.modal__content')) {
      closeModalWindow(modalAddCard);
    }
});

// слушатели нажатий и последующие действия
//редактирования профиля
openProfileModalWindow.addEventListener("click", () =>{
    if(!modalEditProfile.classList.contains("modal_open")) {
        nameInput.value = profileName.textContent; //подставляем имя в модалку
        jobInput.value = profileComment.textContent; //подставляем комент в модалку
        }
    openModalWindow(modalEditProfile);
});

closeProfile.addEventListener("click", () => {
    closeModalWindow(modalEditProfile)
});

formElement.addEventListener("submit", formSubmitHandler);

//загрузки карточки
openCardModalWindow.addEventListener("click", () => {
    openModalWindow(modalAddCard);
    formCardElement.reset();
    enableValidation(settings);
});
closeAddCard.addEventListener("click", () => {
    closeModalWindow(modalAddCard);
});
formCardElement.addEventListener("submit", addCardSubmitHandler);

//вкл выкл просмоторщик
closeViewer.addEventListener("click", () => {
    openModalWindow(modalViewer);
});

//загрузка массива карточек на сайт
initialCards.forEach((data) => {
    renderCard(data);
 });