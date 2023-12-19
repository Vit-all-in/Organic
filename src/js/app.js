import handleClick from './modules/testimonials';

const burgerMenuIcon = document.querySelector('.burger-menu__icon');
const navMenu = document.querySelector('.nav');

burgerMenuIcon.addEventListener('click', () => {
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

const productItems = document.querySelectorAll('.product__item');

productItems.forEach((productItem) => {
  const stars = productItem.querySelectorAll('.star');
  let selectedRating = 0;
  let isRatingSelected = false;

  stars.forEach((star, index) => {
    star.addEventListener('mouseover', () => {
      if (!isRatingSelected) {
        resetStars();
        star.classList.add('selected');
        star.style.color = '#ff0000';
        for (let i = 0; i <= index; i++) {
          stars[i].classList.add('selected');
          stars[i].style.color = '#ff0000';
        }
      }
    });

    star.addEventListener('click', () => {
      isRatingSelected = true;
      resetStars();
      star.classList.add('selected');
      star.style.color = '#ff0000';
      selectedRating = star.getAttribute('data-rating');
      for (let i = 0; i <= index; i++) {
        stars[i].classList.add('selected');
        stars[i].style.color = '#ff0000';
      }
    });
  });

  function resetStars() {
    stars.forEach((star) => {
      star.classList.remove('selected');
      star.style.color = '#ffcc00';
    });
  }
});
