document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form");

  form.addEventListener("submit", function (event) {
      event.preventDefault();

      const firstDelay = parseInt(form.elements.delay.value);
      const step = parseInt(form.elements.step.value);
      const amount = parseInt(form.elements.amount.value);

      generatePromises(amount, firstDelay, step);
  });

  function createPromise(position, delay) {
      return new Promise((resolve, reject) => {
          const shouldResolve = Math.random() > 0.3;

          setTimeout(() => {
              if (shouldResolve) {
                  resolve({ position, delay });
              } else {
                  reject({ position, delay });
              }
          }, delay);
      });
  }

  function generatePromises(amount, firstDelay, step) {
      for (let i = 1; i <= amount; i++) {
          const delay = firstDelay + (i - 1) * step;

          createPromise(i, delay)
              .then(({ position, delay }) => {
                  console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
                  // Aici puteți adăuga notificarea cu notiflix dacă doriți
              })
              .catch(({ position, delay }) => {
                  console.log(`❌ Rejected promise ${position} in ${delay}ms`);
                  // Aici puteți adăuga notificarea cu notiflix dacă doriți
              });
      }
  }
});
