//функция создания карточки

class Card {
    constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    }
//element v card reneim
    _cardTemplate() {
        this._card = document.querySelector(this._cardSelector).content.cloneNode(true);
}

    _addEventListeners(callbackListener) {
        this._card.querySelector(".card__like").addEventListener('click', this._cardLike);
        this._card.querySelector(".card__delete").addEventListener('click', this._cardDelete);
        this._card.querySelector(".card__photo").addEventListener('click', () => {
            this._handleCardClick(this._link, this._name)
})
}

    _cardLike = () => {
        this._cardLikeButton.classList.toggle("card__like_active");
    }

    _cardDelete = () => {
        this._card.remove();
        this._card = null;
}

    createCard() {
    this._cardTemplate();
    this._addEventListeners();

    this._imageSelector = this._card.querySelector(".card__photo");
    this._card.querySelector(".card__title").textContent = this._name;
    this._imageSelector.src = this._link;

    return this._card
}
}

export {Card};

// //функция создания карточки
// const createCard = (data) => {
//     const cardElement = cardTemplate.cloneNode(true);
//     const cardTitle = cardElement.querySelector(".card__title");
//     const cardPhoto = cardElement.querySelector(".card__photo");
//     const cardLikeButton = cardElement.querySelector(".card__like");
//     const cardDeleteButton = cardElement.querySelector(".card__delete");
// //лайк карточки
//     cardLikeButton.addEventListener('click', (evt) =>
//     evt.target.classList.toggle("card__like_active")
//     )
// //удаление карточки
//     cardDeleteButton.addEventListener("click", (evt) =>
//     cardDeleteButton.closest(".card").remove()
//     );
// //нажатие просмотр картинки
//     cardPhoto.addEventListener("click", (evt) =>
//         photoClick(cardPhoto.src, cardTitle.textContent)
//     );
// //тянем из массива данные
//     cardTitle.textContent = data.name;
//     cardPhoto.src = data.link;
//     return cardElement;
// }