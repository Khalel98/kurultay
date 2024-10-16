const hamburger = document.getElementById("hamburger");
const menu = document.querySelector(".menu");
const menu__close = document.querySelector(".menu__close");
const menuLinks = document.querySelectorAll(".menu ul li a"); // Получаем все ссылки меню

hamburger.addEventListener("click", () => {
  menu.classList.toggle("active");
});
menu__close.addEventListener("click", () => {
  menu.classList.toggle("active");
});

// Добавляем обработчик события для каждой ссылки меню
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("active");
  });
});

function updateCountdown() {
  const endDate = new Date(2024, 10, 14, 10, 0, 0).getTime(); // Месяцы от 0 (январь) до 11 (декабрь)
  const now = new Date().getTime();
  const timeLeft = endDate - now;

  if (timeLeft >= 0) {
    let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    let minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    let seconds = Math.floor((timeLeft / 1000) % 60);

    // Преобразуем числа в строки с ведущим нулём
    days = ("0" + days).slice(-2);
    hours = ("0" + hours).slice(-2);
    minutes = ("0" + minutes).slice(-2);
    seconds = ("0" + seconds).slice(-2);

    // Обновляем цифры для дней
    document.getElementById("days_digit1").textContent = days.charAt(0);
    document.getElementById("days_digit2").textContent = days.charAt(1);

    // Обновляем цифры для часов
    document.getElementById("hours_digit1").textContent = hours.charAt(0);
    document.getElementById("hours_digit2").textContent = hours.charAt(1);

    // Обновляем цифры для минут
    document.getElementById("minutes_digit1").textContent = minutes.charAt(0);
    document.getElementById("minutes_digit2").textContent = minutes.charAt(1);

    // Обновляем цифры для секунд
    document.getElementById("seconds_digit1").textContent = seconds.charAt(0);
    document.getElementById("seconds_digit2").textContent = seconds.charAt(1);
  } else {
    document.getElementById("countdown").textContent = "Событие уже произошло!";
  }
}

updateCountdown(); // Обновляем таймер сразу при загрузке страницы
setInterval(updateCountdown, 1000); // Обновляем каждую секунду

// Обработчик для формы
document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Отключаем стандартное поведение формы

    var formData = new FormData(this);

    fetch("index.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        // Выводим сообщение об успешной отправке
        alert("Форма успешно отправлена!");
        // Очищаем форму после отправки
        document.getElementById("contactForm").reset();
      })
      .catch((error) => {
        alert("Произошла ошибка при отправке формы.");
      });
  });
