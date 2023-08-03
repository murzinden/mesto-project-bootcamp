import '../pages/index.css';

import '../components/api';

import {
  getProfileInfo,
  getCards,
  updateProfileInfo,
  addCard,
  deleteCard,
  updateAvatar
} from '../components/api.js';


import { enableValidation, clearInputErrors } from '../components/validate.js';
import {
  config,
  elementsSection,
  popupView,
  profileAvatar,
  profileTitle,
  profileSubTitle,
  profileEditButton,
  editProfilePopup,
  profileAddButton,
  addPlacePopup,
  form,
  formPlace,
  placeInput,
  urlInput,
  userNameInput,
  professionInput,
  avatarEditButton,
  avatarEdit,
  urlAvatar
} from '../components/constants.js';
import { createCard, onDeleteCardElement } from '../components/card.js';
import {
  openPopup,
  closePopup,
  closeByOverlayClick
} from '../components/modal.js';

let myId





// При удалении карточки
async function handleDeleteCard(card, cardElement) {
  try {
    await deleteCard(card._id);
    onDeleteCardElement(cardElement);
  } catch (err) {
    console.error('Ошибка при удалении карточки', err);
  }
}


// Отрисовка каждый карточки
function renderCard(card) {
  const newCard = createCard(card, myId, handleDeleteCard)
  elementsSection.prepend(newCard)
}

function renderCardsList(cards) {
  cards.forEach(renderCard)
}

// Получение и отрисовка начальных карточек с сервера
// async function renderCards() {
//   const cardsList = await getCards()
//   renderCardsList(cardsList.reverse())
// }

async function initialDataLoad() {
  try {
    const [profileInfo, cardsList] = await Promise.all([getProfileInfo(), getCards()]);
    myId = profileInfo._id;
    setProfileInfo(profileInfo.name, profileInfo.about);
    renderCardsList(cardsList.reverse());
  } catch (error) {
    console.error('Ошибка при загрузке начальных данных', error);
  }
}


// Получение и отрисовка данных профиля с сервера
async function renderProfileInfo() {
  const profileInfo = await getProfileInfo()
  myId = profileInfo._id
  setProfileInfo(profileInfo.name, profileInfo.about)
}

// Загрузка начальных данных для карточек и профиля
renderProfileInfo();
initialDataLoad();
// renderCards()

// Проверка валидации форм
enableValidation(config);

// Устанавливаем данные Профиля
function setProfileInfo(name, about) {
  profileTitle.textContent = name
  profileSubTitle.textContent = about
}

// Закрытие popup при overlay

document.addEventListener('click', closeByOverlayClick);


// Устанавливаем данные профиля в форму
function setFormProfileInfo(title, subtitle) {
  userNameInput.value = title;
  professionInput.value = subtitle;
}

// editProfilePopup
profileEditButton.addEventListener('click', () => {
  openPopup(editProfilePopup);
  clearInputErrors(editProfilePopup);
  setFormProfileInfo(profileTitle.textContent, profileSubTitle.textContent);
});


editProfilePopup.querySelector('.popup__close').addEventListener('click', () => closePopup(editProfilePopup));


// addPlacePopup
profileAddButton.addEventListener('click', () => {
  openPopup(addPlacePopup);
  clearInputErrors(addPlacePopup);

  placeInput.value = '';
  urlInput.value = '';

  const submitButton = addPlacePopup.querySelector('.popup__button');
  submitButton.setAttribute('disabled', true);
  submitButton.classList.add(config.inactiveButtonClass);
});

addPlacePopup.querySelector('.popup__close').addEventListener('click', () => closePopup(addPlacePopup));

// closeImagePopup
popupView.querySelector('.popup__close').addEventListener('click', () => {
  closePopup(popupView);
});

async function onUpdateProfileInfo(user) {
  const updatedUser = await updateProfileInfo(user)
  setProfileInfo(updatedUser.name, updatedUser.about)
}

// editProfile
const handleFormEditSubmit = async evt => {
  evt.preventDefault();

  const submitButton = editProfilePopup.querySelector('.popup__button');
  setButtonLoadingText(submitButton, true);

  const updatedProfile = {
    name: userNameInput.value,
    about: professionInput.value
  }

  try {
    await onUpdateProfileInfo(updatedProfile);
    closePopup(editProfilePopup);
  } catch (error) {
    console.error('Ошибка при обновлении профиля', error);
  } finally {
    setButtonLoadingText(submitButton, false);
  }

};

form.addEventListener('submit', handleFormEditSubmit);

// addCard


async function onAddCard(card) {
  const newCard = await addCard(card);
  renderCard(newCard)
}

formPlace.addEventListener('submit', async (event) => {
  event.preventDefault();

  const submitButton = formPlace.querySelector('.popup__button');
  setButtonLoadingText(submitButton, true);

  const newCard = {
    name: placeInput.value,
    link: urlInput.value
  }

  try {
    await onAddCard(newCard);
  } catch (error) {
    console.error('Ошибка при добавлении карточки', error);
  } finally {
    setButtonLoadingText(submitButton, false);
    closePopup(addPlacePopup);
  }

});

// avatarEditButton

avatarEditButton.addEventListener('click', () => {
  openPopup(avatarEdit);

})

avatarEdit.querySelector('.popup__close').addEventListener('click', () => closePopup(avatarEdit));


// обновление аватара
avatarEdit.querySelector('.popup__form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const avatarUrl = urlAvatar.value;

  const avatarData = {
    avatar: avatarUrl
  };

  const submitButton = avatarEdit.querySelector('.popup__button');
  setButtonLoadingText(submitButton, true);

  try {
    await updateAvatar(avatarData);
    profileAvatar.src = avatarUrl;
    closePopup(avatarEdit);
  } catch (error) {
    console.error('Ошибка при обновлении аватара', error);
  } finally {
    setButtonLoadingText(submitButton, false);
  }
});


// кнопка сохранить меняется при на сохранение при загрузке
function setButtonLoadingText(button, isLoading) {
  button.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
}



