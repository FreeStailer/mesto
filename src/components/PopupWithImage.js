import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._closeButton = this._popup.querySelector(".modal__button-close"); //ищем кнопку закрытия формы (тут возможно стиль надо разбивать для каждой кнопки закрытия, хоть и бредово будет. посмотрим)
        this._photoPopupImg = this._popup.querySelector(".modal__photo");
        this._popupText = this._popup.querySelector(".modal__title");
    }

    //public method open viewer
    open({link, name}) {
        super.open();
        this._photoPopupImg.src = link;
        this._popupText.textContent = name;
    }

}

// const modalViewerTitle = modalViewer.querySelector(".modal__title");
// const modalViewerPhotoUrl = modalViewer.querySelector(".modal__photo");

// closeAddCard.addEventListener("click", () => {
//     closeModalWindow(modalAddCard);
// });

// //вкл выкл просмоторщик
// closeViewer.addEventListener("click", () => {
//     closeModalWindow(modalViewer);
// });