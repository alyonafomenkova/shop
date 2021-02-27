const NUMBER_OF_VISIBLE_POINTS = 8;
const items = document.querySelectorAll('.js-categories-links__item');
const button = document.querySelector('.js-categories-links__more-button');

const handleButtonClick = () => {
  for (let i = NUMBER_OF_VISIBLE_POINTS; i < items.length; i += 1) {
    items[i].classList.toggle('categories-links__item-visible');
  }
  const isAllListVisible = items[items.length - 1].classList.contains('categories-links__item-visible');
  const numberOfSwitchableItems = items.length - NUMBER_OF_VISIBLE_POINTS;
  if (isAllListVisible) {
    button.innerHTML = `Скрыть ${numberOfSwitchableItems} категорий...`;
  } else {
    button.innerHTML = `Ещё ${numberOfSwitchableItems} категорий...`;
  }
};

if (items.length > NUMBER_OF_VISIBLE_POINTS) {
  button.addEventListener('click', handleButtonClick);
}
