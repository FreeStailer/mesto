export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector)
        this._overlay = document.querySelector('.overlay') //добавил оверлей, в дом и тут нашли его, предыдущая технология не подходит
        this._closeButton = this._popup.querySelector('.modal__button-close'); //ищем кнопку закрытия формы
    }

    //частный метод закрытия по ескейпу
    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close()
        }
    }
    
    //публичный метод слушателей
    setEventListeners () {
        this._closeButton.addEventListener('click', this.close.bind(this));
        this._overlay.addEventListener('click', this.close.bind(this));
    }

    //публичный метод открытия формы
    open () {
        document.addEventListener('keydown', this._handleEscClose);
        this._overlay.classList.add("modal_open");
        this._popup.classList.add("modal_open");
    }

    //публичный метод закрытия формы
    close () {
        this._overlay.classList.remove("modal_open");
        this._popup.classList.remove("modal_open");
        this._closeButton.removeEventListener('click', this.close.bind(this));
        this._overlay.removeEventListener('click', this.close.bind(this));
        document.removeEventListener('keydown', this._handleEscClose);
    }

    getPopup() {
        return this._popup;
      }
}