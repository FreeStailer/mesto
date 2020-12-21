//класс создания карточки

export class Card {
    constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    }

    _getCardTemplate() {
        const card = document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(true);
        return card;
    }

    _addEventListeners() {
        this._cardLikeButton = this._card.querySelector(".card__like"); //переменная так как ниже еще пригодится нам
        this._cardLikeButton.addEventListener('click', this._cardLike);
        this._card.querySelector(".card__delete").addEventListener('click', this._cardDelete);
        this._imageSelector.addEventListener('click', () => {
            this._handleCardClick({name: this._name, link: this._link});
        })
    }

    _cardLike = () => {
        this._cardLikeButton.classList.toggle("card__like_active");
    }

    _cardDelete = () => {
        this._card.remove();
        this._card = null;
    }

    //создание карточки
    createCard() {
    this._card = this._getCardTemplate();
    this._imageSelector = this._card.querySelector(".card__photo");
    this._card.querySelector(".card__title").textContent = this._name;
    this._imageSelector.src = this._link;
    this._imageSelector.alt = this._name; //добавили альт картинкам и в сетку и новым
    this._addEventListeners();
    return this._card
    }
}