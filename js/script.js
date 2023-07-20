
const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');

const profileEditButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('#editProfilePopup');
const profileAddButton = document.querySelector('.profile__add-button');
const addPlacePopup = document.querySelector('#addPlacePopup');
const userNameError = document.querySelector('.popup__input-error');
const professionError = document.querySelector('#profession-error');

const form = document.querySelector('.popup__form');

const saveButton = document.querySelector('.popup__button');

const elementsSection = document.querySelector('.elements');
const cardTemplate = document.querySelector('.element-template').content;

const formPlace = document.querySelector('#form-place');
const placeInput = formPlace.querySelector('input[name="card-name"]');
const urlInput = formPlace.querySelector('input[name="card-image"]');
const placeError = document.querySelector('#place-error');
const urlError = document.querySelector('#url-error');
const saveButtonPlace = formPlace.querySelector('.popup__button');

const popupView = document.querySelector('.popup_view');
const popupImage = popupView.querySelector('.popup__image');
const popupCaption = popupView.querySelector('.popup__caption');


// open&close popup
const openPopup = popup => {
  popup.classList.add('popup_opened');
}
const closePopup = popup => {
  popup.classList.remove('popup_opened');
}

const closeByOverlayClick = event => {
  if (event.target.classList.contains('popup')) {
    closePopup(event.target);
  }
}

const closeByEscKey = event => {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    openedPopup && closePopup(openedPopup);
  }
}

document.addEventListener('click', closeByOverlayClick);
document.addEventListener('keydown', closeByEscKey);


// editProfilePopup
profileEditButton.addEventListener('click', () => {
  openPopup(editProfilePopup);
  toggleButtonState(saveButton, [userNameInput, professionInput]);
});
editProfilePopup.querySelector('.popup__close').addEventListener('click', () => closePopup(editProfilePopup));

// addPlacePopup
profileAddButton.addEventListener('click', () => {
  openPopup(addPlacePopup);
  toggleButtonState(saveButtonPlace, [placeInput, urlInput]);
});

addPlacePopup.querySelector('.popup__close').addEventListener('click', () => closePopup(addPlacePopup));

// closeImagePopup
popupView.querySelector('.popup__close').addEventListener('click', () => {
  closePopup(popupView);
});

// editProfile
const handleFormSubmit = evt => {
  evt.preventDefault();

  const userNameInput = document.querySelector('input[name="username"]');
  const professionInput = document.querySelector('input[name="profession"]');

  profileTitle.textContent = userNameInput.value;
  profileSubTitle.textContent = professionInput.value;

  closePopup(editProfilePopup);
};

form.addEventListener('submit', handleFormSubmit);


// valid form


const checkInputValidity = (inputElement, errorElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorClass);
    inputElement.classList.add(inputErrorClass);
  } else {
    errorElement.textContent = '';
    errorElement.classList.remove(errorClass);
    inputElement.classList.remove(inputErrorClass);
  }
};

const toggleButtonState = (button, inputs, inactiveButtonClass) => {
  const isValid = inputs.every(input => input.validity.valid);

  if (isValid) {
    button.removeAttribute('disabled');
    button.classList.remove(inactiveButtonClass);
  } else {
    button.setAttribute('disabled', true);
    button.classList.add(inactiveButtonClass);
  }
}


const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
}) => {
  const forms = Array.from(document.querySelectorAll(formSelector));

  forms.forEach((form) => {
    const inputs = Array.from(form.querySelectorAll(inputSelector));
    const submitButton = form.querySelector(submitButtonSelector);

    inputs.forEach((input) => {
      const errorElement = form.querySelector(`#${input.id.replace('-input', '')}-error`);

      input.addEventListener('input', () => {
        checkInputValidity(input, errorElement, inputErrorClass, errorClass);
        toggleButtonState(submitButton, inputs, inactiveButtonClass);
      });
    });
    toggleButtonState(submitButton, inputs, inactiveButtonClass);
  });
};




enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-error_visible',
  errorClass: 'popup__input-error'
});



// addCard

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


const createCard = (name, link) => {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.element__title').textContent = name;
  const cardImage = cardElement.querySelector('.element__image');
  cardImage.src = link;
  cardImage.alt = name;
  cardImage.addEventListener('click', () => {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openPopup(popupView);
  });

  // addLike

  const cardHeart = cardElement.querySelector('.element__heart');
  cardHeart.addEventListener('click', () => {
    cardHeart.classList.toggle('element__heart_liked');
  });

  // buttonDelete

  elementsSection.addEventListener('click', (event) => {
    if (event.target.classList.contains('element__delete')) {
      event.target.closest('.element').remove();
    }
  });

  return cardElement;
};


initialCards.forEach(card => {
  const cardElement = createCard(card.name, card.link);
  elementsSection.append(cardElement);
});

formPlace.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = placeInput.value;
  const link = urlInput.value;
  const cardElement = createCard(name, link);
  elementsSection.prepend(cardElement);

  closePopup(addPlacePopup);

  placeInput.value = '';
  urlInput.value = '';

});


