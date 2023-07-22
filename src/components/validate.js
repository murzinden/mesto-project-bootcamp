import { config } from './constants.js'


//clearError
const clearInputErrors = (popup) => {
  const inputs = Array.from(popup.querySelectorAll(config.inputSelector));
  inputs.forEach((input) => {
    input.classList.remove(config.inputErrorClass)
    const errorElement = popup.querySelector(`.${input.id}-input-error`);
    hideErrorMessage(errorElement);
  })
}

//showError
const showErrorMessage = (errorElement, input) => {
  errorElement.textContent = input.validationMessage;
}

//hideError
const hideErrorMessage = (errorElement) => {
  errorElement.textContent = '';
}

//valid
const validateInput = (form, input, config) => {
  const errorElement = form.querySelector(`.${input.id}-input-error`);
  if (input.validity.valid) {
    input.classList.remove(config.inputErrorClass);
    hideErrorMessage(errorElement)
  } else {
    input.classList.add(config.inputErrorClass);
    showErrorMessage(errorElement, input)
  }
}

const setInputListeners = (form, config) => {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);

  const toggleStateButton = () => {
    if (inputs.every(input => input.validity.valid)) {
      button.removeAttribute('disabled');
      button.classList.remove(config.inactiveButtonClass)
    } else {
      button.setAttribute('disabled', true);
      button.classList.add(config.inactiveButtonClass);
    }
  }

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      validateInput(form, input, config);

      toggleStateButton();
    })
  })
  toggleStateButton();
}

const enableValidation = (config) => {
  const forms = Array.from(document.querySelectorAll(config.formSelector));

  forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
    })
    setInputListeners(form, config)
  });

};


 export {
  enableValidation,
  clearInputErrors
 }


