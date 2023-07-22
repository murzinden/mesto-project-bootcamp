

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

export {
  openPopup,
  closePopup,
  closeByOverlayClick,
  closeByEscKey
}
