//функция создания карточки

class Card {
    constructor(data, cardSelector) {
    this._place = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    }

    _cardTemplate() {
    return document.querySelector(this._cardSelector).content.cloneNode(true);
}

    _addEventListeners(callbackListener) {
        this._cardLikeButton = this._card.querySelector(".card__like");
        this._cardDeleteButton = this._card.querySelector(".card__delete");
        this._cardLikeButton.addEventListener('click', this._cardLike)
        this._cardDeleteButton.addEventListener('click', this._cardDelete)
        this._cardPhoto.addEventListener('click', () => {
        callbackListener(this._link, this._name)
})
}

    _cardLike = () => {
                   this._cardLikeButton.classList.toggle("card__like_active");
    }

    _cardDelete = () => {
this._card.remove()
}

    createCard(callbackListener) {
    this._card = this._cardTemplate()
    this._cardPhoto = this._card.querySelector(".card__photo");
    this._cardText = this._card.querySelector(".card__title");
    this._cardPhoto.src = this._link;
    this._cardPhoto.alt = this._name;
    this._cardText.innerText = this._name;
    this._addEventListeners(callbackListener)
    return this._card
}
}

export {Card};