export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._submitButton = this._popup.querySelector('.form__button');
        }

    renderLoadingProfile(isLoading) {
        if (isLoading) {
            this._submitButton.textContent = 'Сохранение...'
        } else {
            this._submitButton.textContent = 'Сохранить'
        }
    }

    renderLoadingPhoto(isLoading) {
        if (isLoading) {
            this._submitButton.textContent = 'Создание...'
        } else {
            this._submitButton.textContent = 'Создать'
        }
    }


    //частный метод закрытия по ескейпу
    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close()
        }
    }
    
    //слушатель клика по оверлею
    setEventListeners() {
        this._popup.addEventListener('mousedown', (evt) => {
          if (evt.target.classList.contains('modal') || evt.target.classList.contains('modal__button-close')) {
            this.close();
          }
        });
      }

    //публичный метод открытия формы
    open () {
        document.addEventListener('keydown', this._handleEscClose);
        this._popup.classList.add("modal_open");
    }

    //публичный метод закрытия формы
    close () {
        this._popup.classList.remove("modal_open");
        //this._closeButton.removeEventListener('click', this.close.bind(this));
        document.removeEventListener('keydown', this._handleEscClose);
    }

}