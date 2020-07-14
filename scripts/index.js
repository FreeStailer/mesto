const openModalWindow = document.querySelector(".profile__button-edit"); //ищем кнопку открытия окна
const Modal = document.querySelector(".modal"); //ищем модальное окно
const closeModalWindow = document.querySelector(".modal__button-close"); //ищем кнопку закрытия окна

//ищем используемые атрибуты
let formElement = document.querySelector(".form"); 
let profileName = document.querySelector(".profile__name");
let profileComment = document.querySelector(".profile__comment");
let nameInput = document.querySelector("#name");
let jobInput = document.querySelector("#comment");

 
//функция открытия окна и заполнения содержимым из профиля
function openModal() {
    Modal.classList.add("modal_open");
    nameInput.value = profileName.textContent;
    jobInput.value = profileComment.textContent;
}

//функция закрытия окна
function closeModal() {
    Modal.classList.remove("modal_open");
}

//функция передачи данных из формы в профиль на странице
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileComment.textContent = jobInput.value;
    closeModal();
}

// слушатели нажатий и последующие действия
openModalWindow.addEventListener("click", openModal);
closeModalWindow.addEventListener("click", closeModal);
formElement.addEventListener("submit", formSubmitHandler);