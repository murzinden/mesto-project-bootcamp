// === PopUp ===

const button = document.querySelector('#open-popup');
const el = document.querySelector('#pop-el');
const closeButton = document.querySelector('#pop-close');

const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('#username');
const jobInput = formElement.querySelector('#profession');

const profileTitle = document.querySelector('#profile-title');
const profileSubtitle = document.querySelector('#profile-subtitle');

function addClass() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  el.classList.add('popup_opened');
}
function removeClass() {
  el.classList.remove('popup_opened');
}

button.addEventListener('click', addClass);

closeButton.addEventListener('click', removeClass);

// === PopUp-Profile-Form ===


function handleFormSubmit(evt) {
    evt.preventDefault();

    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    const nameElement = document.querySelector('#username');
    const jobElement = document.querySelector('#profession');

    nameElement.textContent = nameValue;
    jobElement.textContent = jobValue;

    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;

    const popup = document.querySelector('#pop-el');
    popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', handleFormSubmit);
