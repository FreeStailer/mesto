export class FormValidator {
    constructor(validSelector, validItem){
      this.formSelector = validSelector.formSelector;
      this.inputSelector = validSelector.inputSelector;
      this.submitButtonSelector = validSelector.submitButtonSelector;
      this.inactiveButtonClass = validSelector.inactiveButtonClass;
      this.inputErrorClass = validSelector.inputErrorClass;
      this.errorClass = validSelector.errorClass;
      this.validItem = validItem;
      this._buttonElement = this.validItem.querySelector(this.submitButtonSelector);
      this._inputs = Array.from(this.validItem.querySelectorAll(this.inputSelector));
    }

  //проверка формы при открытии
    validateForm() {
      this._checkButtonState(this._inputs, this._buttonElement, this.submitButtonSelector, this.inputSelector);
      this._inputs.forEach((input) => {
        this._hideInputError(this.validItem, input);
      });
    }
  
  //функции добавления стилей ошибки
    _showInputError = (formElement, inputElement, errorMessage) => {
      const errorElement = formElement.querySelector(`#${inputElement.name}-error`)
      inputElement.classList.add(this.inputErrorClass)
      errorElement.textContent = errorMessage
      errorElement.classList.add(this.errorClass)
    };
  
    //....и скрытия ошибок
    _hideInputError = (formElement, inputElement) => {
      const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
      inputElement.classList.remove(this.inputErrorClass);
      errorElement.classList.remove(this.errorClass);
      errorElement.textContent = "";
    };
  
    //функция валидации объекта
    _checkInputValidity = (formElement, inputElement) => {
      if (!inputElement.validity.valid) {
        this._showInputError(formElement, inputElement, inputElement.validationMessage);
      } else {
        this._hideInputError(formElement, inputElement);
      }
    };
  
    //валидация
    _hasInvalidInput = (inputs) => {
      return inputs.some((inputElement) => {
        return !inputElement.validity.valid;
      });
    };
  
    //функция изменения кнопки при вводе правильных данных
    _checkButtonState = (inputs, buttonElement) => {
      if (this._hasInvalidInput(inputs)) {
          buttonElement.classList.add(this.inactiveButtonClass);
          buttonElement.disabled = true;
      } else {
          buttonElement.classList.remove(this.inactiveButtonClass);
          buttonElement.disabled = false;
      }
  };
  
    enableValidation () {
        this.validItem.addEventListener("submit", (evt) => {
          evt.preventDefault();
        });
        this._setEventListeners();
      };

//метод установки слушателей и проверка кнопки
//плюс слушаем новую проверку открытия формы
  
    _setEventListeners() {    
      this._checkButtonState(this._inputs, this._buttonElement, this.submitButtonSelector, this.inactiveButtonClass);
      this._inputs.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          this._checkInputValidity(this.validItem, inputElement);
          this._checkButtonState(this._inputs, this._buttonElement);
        });
      });
    };
  }