import noUiSlider from 'nouislider';

const slider = document.getElementById('slider');
const inputFrom = document.querySelector('.js-range-slider__from-value');
const inputTo = document.querySelector('.js-range-slider__to-value');

noUiSlider.create(slider, {
  start: [100, 900],
  connect: true,
  range: {
    min: 0,
    max: 1000,
  },
  tooltips: false,
  format: {
    from(value) {
      return parseInt(value, 10);
    },
    to(value) {
      return parseInt(value, 10);
    },
  },
});

slider.noUiSlider.on('update', (values, handle) => {
  if (handle === 0) {
    inputFrom.value = values[handle].toLocaleString();
  }
  if (handle === 1) {
    inputTo.value = values[handle].toLocaleString();
  }
});

inputFrom.addEventListener('change', (evt) => {
  const { value } = evt.target;
  slider.noUiSlider.set([value, null]);
});

inputTo.addEventListener('change', (evt) => {
  const { value } = evt.target;
  slider.noUiSlider.set([null, value]);
});
