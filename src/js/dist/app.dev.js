"use strict";

var _testimonials = _interopRequireDefault(require("./modules/testimonials"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var burgerMenuIcon = document.querySelector('.burger-menu__icon');
var navMenu = document.querySelector('.nav');
burgerMenuIcon.addEventListener('click', function () {
  burgerMenuIcon.classList.toggle('open');
  navMenu.classList.toggle('show');

  if (navMenu.classList.contains('show')) {
    navMenu.style.transform = 'translateY(0)';
    navMenu.style.opacity = '1';
  } else {
    navMenu.style.transform = 'translateY(-100%)';
    navMenu.style.opacity = '0';
  }
});
var productItems = document.querySelectorAll('.product__item');
productItems.forEach(function (productItem) {
  var stars = productItem.querySelectorAll('.star');
  var selectedRating = 0;
  var isRatingSelected = false;
  stars.forEach(function (star, index) {
    star.addEventListener('mouseover', function () {
      if (!isRatingSelected) {
        resetStars();
        star.classList.add('selected');
        star.style.color = '#ff0000';

        for (var i = 0; i <= index; i++) {
          stars[i].classList.add('selected');
          stars[i].style.color = '#ff0000';
        }
      }
    });
    star.addEventListener('click', function () {
      isRatingSelected = true;
      resetStars();
      star.classList.add('selected');
      star.style.color = '#ff0000';
      selectedRating = star.getAttribute('data-rating');

      for (var i = 0; i <= index; i++) {
        stars[i].classList.add('selected');
        stars[i].style.color = '#ff0000';
      }
    });
  });

  function resetStars() {
    stars.forEach(function (star) {
      star.classList.remove('selected');
      star.style.color = '#ffcc00';
    });
  }
});