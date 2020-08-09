const settings = {
    formSelector: ".form",
    inputSelector: ".form__item",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_disabled",
    inputErrorClass: "form__item_type_error",
    errorClass: "form__input-error_active",
  };


//функции показа и скрытия ошибки
  const showInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`)
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorClass);
  };

  const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";
  };

  //функция валидации объекта
  const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputErrorClass, errorClass, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
  };

  //валидация
  const hasInvalidInput = (inputs) => {
    return inputs.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  //функция изменения кнопки при вводе правильных данных
  const checkButtonState = (inputs, buttonElement, submitButtonSelector, inactiveButtonClass) => {
    if (hasInvalidInput(inputs)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
    }
};

  //функции установки слушателей и 

  const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
    const inputs = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    checkButtonState(inputs, buttonElement, submitButtonSelector, inactiveButtonClass);
    inputs.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
        checkButtonState(inputs, buttonElement, submitButtonSelector, inactiveButtonClass);
      });
    });
  };

  const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
    const forms = Array.from(document.querySelectorAll(formSelector));
    forms.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
        setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
    });
  };

  enableValidation(settings);