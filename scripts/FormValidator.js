class FormValidator {
    constructor(validSelector, validItem){
      this.formSelector = validSelector.formSelector;
      this.inputSelector = validSelector.inputSelector;
      this.submitButtonSelector = validSelector.submitButtonSelector;
      this.inactiveButtonClass = validSelector.inactiveButtonClass;
      this.inputErrorClass = validSelector.inputErrorClass;
      this.errorClass = validSelector.errorClass;
      this.validItem = validItem;
    }
  
  //функции показа  ошибки
    _showInputError = (formElement, inputElement, errorMessage) => {
      const errorElement = formElement.querySelector(`#${inputElement.name}-error`)
      inputElement.classList.add(this.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this.errorClass);
    };
  
    //....и скрытия
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
  
    //метод установки слушателей и 
  
    _setEventListeners = (openButton) => {
      const inputs = Array.from(this.validItem.querySelectorAll(this.inputSelector));
      const buttonElement = this.validItem.querySelector(this.submitButtonSelector);
      openButton.addEventListener('click', () => {
        this._validWindow();
      });
      this._checkButtonState(inputs, buttonElement);
      inputs.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          this._checkInputValidity(this.validItem, inputElement);
          this._checkButtonState(inputs, buttonElement);
        });
      });
    };

    //валидность при открытии окна, в прошлом спринте мы пользовались кроссвалидацией в индексе(что было не корректно)
    _validWindow() {
      const buttonElement = this.validItem.querySelector(this.submitButtonSelector);
      const inputs = Array.from(this.validItem.querySelectorAll(this.inputSelector));
      this._checkButtonState(inputs, buttonElement);
    }
  
    enableValidation (openButton) {
        this.validItem.addEventListener("submit", (evt) => {
          evt.preventDefault();
        });
        this._setEventListeners(openButton);
      };
  }
    export {FormValidator}