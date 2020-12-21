import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(submitCallback, popupSelector) {
        super(popupSelector)
        this._submitCallback = submitCallback;
        this._form = this._popup.querySelector('.form');
        this._inputs = Array.from(this._form.querySelector('.form__item'));
    }

    //получаем введенные данные
    _getInputValues() {
        const result = {};
        Array.from(this._popup.querySelector('.form').elements).forEach((input) => {
          if(input.type === 'url' || input.type === 'text') {
            result[input.name] = input.value;
          }
        });
        return result;
      }

    //слушаем и передаем введенные данные
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) =>{
            evt.preventDefault();
            this._submitCallback(this._getInputValues());
            this.close();
        });
    }
    
    close = () => {
        super.close();
        return this._inputs.forEach(function (item) {
            item.value = ""
        })
    }
}