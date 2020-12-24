import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._photoPopupImg = this._popup.querySelector(".modal__photo");
        this._popupText = this._popup.querySelector(".modal__title");
    }

    //public method open viewer
    open({link, name}) {
        super.open();
        this._photoPopupImg.src = link;
        this._photoPopupImg.alt = name;
        this._popupText.textContent = name;
    }
}