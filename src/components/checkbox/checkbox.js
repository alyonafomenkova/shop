const clearButton = document.querySelector('.js-checkbox__clear-button');
const inputs = document.querySelectorAll('.js-checkbox__input');

const handleClearButtonClick = () => {
  inputs.forEach((input) => {
    input.checked = false;
  });
};

clearButton.addEventListener('click', handleClearButtonClick);
