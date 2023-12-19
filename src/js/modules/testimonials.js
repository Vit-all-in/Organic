const reviewItems = document.querySelectorAll('.review__item');
const paginationDots = document.querySelectorAll('.dot');
let currentIndex = 0;

function showReviewItem(index) {
   reviewItems.forEach((item, i) => {
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
   const index = Array.from(reviewItems).indexOf(event.target.closest('.review__item'));
   currentIndex = index;
   showReviewItem(currentIndex);
   updateDots(currentIndex);
}

reviewItems.forEach(item => {
   item.addEventListener('click', handleReviewItemClick);
});

function handleDotClick(event) {
   const index = Array.from(paginationDots).indexOf(event.target.closest('.dot'));
   currentIndex = index;
   showReviewItem(currentIndex);
   updateDots(currentIndex);
}

paginationDots.forEach(dot => {
   dot.addEventListener('mousedown', handleDotClick);
});

function testimonialSwipe(event) {
   event.preventDefault();
   if (event.button === 0) {
      // Левый клик мыши
      const target = event.target.closest('.testimonial__review-content');
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
   paginationDots.forEach((dot, i) => {
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

export default testimonialSwipe;