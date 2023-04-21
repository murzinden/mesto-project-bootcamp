// === PopUp ===

const button = document.querySelector('#open-popup');
const el = document.querySelector('#pop-el');
const closeButton = document.querySelector('#pop-close');

const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('#username');
const jobInput = formElement.querySelector('#profession');

function addClass() {
  el.classList.add('popup_opened');
}
function removeClass() {
  el.classList.remove('popup_opened');
  resetForm();
}
function resetForm() {
  nameInput.value = '';
  jobInput.value = '';
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

    const popup = document.querySelector('#pop-el');
    popup.classList.remove('popup_opened');
    resetForm();
}

formElement.addEventListener('submit', handleFormSubmit);
