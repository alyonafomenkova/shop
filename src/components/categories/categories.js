import Glider from 'glider-js';

const slides = document.querySelectorAll('.js-categories__item');

new Glider(document.querySelector('.glider'), {
  slidesToShow: slides.length,
  slidesToScroll: slides.length,
  draggable: true,
});
