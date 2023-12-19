"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var reviewItems = document.querySelectorAll('.review__item');
var paginationDots = document.querySelectorAll('.dot');
var currentIndex = 0;

function showReviewItem(index) {
  reviewItems.forEach(function (item, i) {
    if (i === index) {
      item.classList.add('active');
      item.classList.remove('inactive');
    } else {
      item.classList.add('inactive');
      item.classList.remove('active');
    }
  });
}

function handleReviewItemClick(event) {
  var index = Array.from(reviewItems).indexOf(event.target.closest('.review__item'));
  currentIndex = index;
  showReviewItem(currentIndex);
  updateDots(currentIndex);
}

reviewItems.forEach(function (item) {
  item.addEventListener('click', handleReviewItemClick);
});

function handleDotClick(event) {
  var index = Array.from(paginationDots).indexOf(event.target.closest('.dot'));
  currentIndex = index;
  showReviewItem(currentIndex);
  updateDots(currentIndex);
}

paginationDots.forEach(function (dot) {
  dot.addEventListener('mousedown', handleDotClick);
});

function testimonialSwipe(event) {
  event.preventDefault();

  if (event.button === 0) {
    // Левый клик мыши
    var target = event.target.closest('.testimonial__review-content');

    if (target) {
      // Элемент содержит класс testimonial__review-content или его родители
      if (event.clientY > window.innerHeight / 2) {
        // Свайп вниз
        currentIndex = (currentIndex + 1) % reviewItems.length;
      } else {
        // Свайп вверх
        currentIndex = (currentIndex - 1 + reviewItems.length) % reviewItems.length;
      }

      showReviewItem(currentIndex);
      updateDots(currentIndex);
    }
  }
}

function updateDots(index) {
  paginationDots.forEach(function (dot, i) {
    if (i === index) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

document.addEventListener('click', testimonialSwipe);
showReviewItem(currentIndex);
updateDots(currentIndex);
reviewItems[0].classList.add('active');
reviewItems[0].classList.remove('inactive');
var _default = testimonialSwipe;
exports["default"] = _default;