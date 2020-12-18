import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(submitCallback, popupSelector) {
        super(popupSelector)
        this._popup = super.getPopup();
        this._submitCallback = submitCallback;

        this._form = this._popup.querySelector('.form');
        this._inputs = Array.from(this._form.querySelector('.form__item'));
    }

    _getInputValues() {
        console.log('гетинпут');
        this._formValues = {};
        this._inputs.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }

    setEventListeners() {
        console.log("вешаем слушатели на:", this._form);
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) =>{
            evt.preventDefault();
            this._submitCallback(this._getInputValues());
            this.close();
            console.log('Слушатели попапа с формой в форме');
        });
    }

    close = () => {
        console.log('закрыть');
        super.close();
        return this._inputs.forEach(function (item) {
            item.value = ""
        })
    }
}