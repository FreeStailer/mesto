import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(submitCallback, popupSelector) {
        super(popupSelector)
        // this._popup = super.getPopup();
        this._submitCallback = submitCallback;
        this._form = this._popup.querySelector('.form');
        this._inputs = Array.from(this._form.querySelector('.form__item'));
        
        this._formitem = this._form.querySelector('.form__item');
    }

    _getInputValues() {
        const result = {};
        Array.from(this._popup.querySelector('.form').elements).forEach((input) => {
          if(input.type === 'url' || input.type === 'text') {
            result[input.name] = input.value;
          }
        });
        //console.log("result getinput", result);
        return result;
      }

    setEventListeners() {
        //console.log("вешаем слушатели на:", this._form);
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) =>{
            evt.preventDefault();
            this._submitCallback(this._getInputValues());
            this.close();
            //console.log('Слушатели попапа с формой в форме');
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