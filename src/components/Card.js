//класс создания карточки с WebAPI
export class Card {
    constructor({data, liked, owned, handleCardClick, handleLikeClick, handleDelClick},cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        //и новенькие:
        this._likes = data.likes;
        this._cardId = data._id;
        this.owned = owned;
        this._liked = liked;
        this._handleLikeClick = handleLikeClick;
        this.delCardClick = handleDelClick;
    }

    getCardId() {
        return this._cardId;
    }
 
    getCardLiked() {
        return this._liked
    }

    //создание карточки
    createCard() {
        this._card = this._getCardTemplate();
        this._imageSelector = this._card.querySelector(".card__photo");
        this._card.querySelector(".card__title").textContent = this._name;
        //лайки
        this._likeCount = this._card.querySelector(".card__like-data");
        this._likeCount.textContent = this._likes.length;
        //
        this._imageSelector.src = this._link;
        this._imageSelector.alt = this._name; //добавили альт картинкам и в сетку и новым
        this._addEventListeners();
        this._toggleCardLiked()
        if (!this.owned) {
            this._delButton.style.display = "none";
        }
        return this._card
        }

    _getCardTemplate() {
        const card = document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(true);
        return card;
        }
    
    //счетчик лайков
    likeCounter = (arr, liked) => {
        this._liked = liked;
        this._toggleCardLiked()
        this._likes = arr;
        this._likeCount.textContent = this._likes.length;
    }

    //удаление, и обнуление карточки
    delCard = () => {
        console.log('Удаление карты');
        this._card.remove();
        this._card = null;
    }

    _cardLiked = () => {
        this._handleLikeClick(this);
    }

    _toggleCardLiked = () => {
        if (this._liked) {
            this._likeButton.classList.add("card__like_active");
        } else {
            this._likeButton.classList.remove("card__like_active");
        }
    }

    _addEventListeners() {
        this._likeButton = this._card.querySelector(".card__like"); //переменная так как ниже еще пригодится нам
        this._likeButton.addEventListener('click', this._cardLiked);
        this._delButton = this._card.querySelector(".card__delete");
        this._delButton.addEventListener('click', () => {
            this.delCardClick(this)
        });
        this._imageSelector.addEventListener('click', () => {
            this._handleCardClick({name: this._name, link: this._link});
        })
    }
}