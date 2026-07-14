// js/main.js

document.addEventListener('DOMContentLoaded', function () {

  // ==================== ПЛАВНАЯ ПРОКРУТКА ====================
  document.querySelectorAll('.menu a, .totop').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var id = this.getAttribute('href');
      var target = document.querySelector(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ==================== Slick SLIDER ====================
  var slickSlider = document.querySelector('.slider-blog__inner');
  if (slickSlider && typeof $ !== 'undefined' && $.fn.slick) {
    $(slickSlider).slick({
      arrows: false,
      dots: true,
      autoplay: true,
      autoplaySpeed: 3000,
      fade: true,
      responsive: [{
        breakpoint: 768,
        settings: { arrows: false }
      }]
    });
  }

  // ==================== МОБИЛЬНОЕ МЕНЮ ====================
  var menuBtn = document.querySelector('.menu__btn');
  var menuList = document.querySelector('.menu__list');

  if (menuBtn && menuList) {
    menuBtn.addEventListener('click', function () {
      menuList.classList.toggle('menu__list--active');
    });

    document.querySelectorAll('.menu a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth <= 768) {
          menuList.classList.remove('menu__list--active');
        }
      });
    });
  }

  // ==================== КНОПКА "НАВЕРХ" ====================
  var toTopBtn = document.getElementById('toTop');
  if (toTopBtn) {
    window.addEventListener('scroll', function () {
      toTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    toTopBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==================== ВКЛАДКИ (TABS) ====================
  var defaultTab = document.getElementById('defaultOpen');
  if (defaultTab) {
    defaultTab.click();
  }

  window.openCity = function (evt, cityName) {
    var tabcontent = document.getElementsByClassName('tabcontent');
    for (var i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none';
    }

    var tablinks = document.getElementsByClassName('tablinks');
    for (var i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove('active');
    }

    var targetTab = document.getElementById(cityName);
    if (targetTab) {
      targetTab.style.display = 'block';
    }
    evt.currentTarget.classList.add('active');
  };

  // ==================== EMAILJS: ПОДПИСКА ====================
  emailjs.init('QtQs0hpE6RP4L7imF');

  var subscribeForm = document.getElementById('subscribeForm');
  if (subscribeForm) {
    subscribeForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var emailInput = this.querySelector('input[type="email"]');
      var email = emailInput ? emailInput.value : '';

      if (!email) {
        alert('Пожалуйста, введите email адрес.');
        return;
      }

      var submitBtn = this.querySelector('.subscribe-form-btn');
      var originalText = submitBtn.textContent;
      submitBtn.textContent = 'Отправка...';
      submitBtn.disabled = true;

      emailjs.send('service_zd0rflv', 'template_ojddyqj', {
        user_email: email,
        subscribe_time: new Date().toLocaleString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        title: 'Новая подписка на сайте'
      })
        .then(function () {
          alert('Спасибо за подписку! На указанный email ' + email + ' отправлено подтверждение.');
          emailInput.value = '';
        })
        .catch(function () {
          alert('Произошла ошибка. Пожалуйста, попробуйте позже.');
        })
        .finally(function () {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        });
    });
  }

  // ==================== EMAILJS: КОНТАКТЫ ====================
  var contactForm = document.querySelector('.contacts__form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var submitBtn = this.querySelector('.contacts__submit');
      var originalText = submitBtn.value;

      var nameInput = this.querySelector('input[name="firstname"]');
      var emailInput = this.querySelector('input[name="firstemail"]');
      var messageInput = this.querySelector('textarea[name="subject"]');

      if (!nameInput || !emailInput || !messageInput) {
        alert('Ошибка: не все поля формы найдены.');
        return;
      }

      var templateParams = {
        name: nameInput.value || '',
        email: emailInput.value || '',
        message: messageInput.value || '',
        time: new Date().toLocaleString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      if (!templateParams.name || !templateParams.email || !templateParams.message) {
        alert('Пожалуйста, заполните все поля формы.');
        return;
      }

      submitBtn.value = 'Отправка...';
      submitBtn.disabled = true;

      emailjs.send('service_zd0rflv', 'template_kvbjjar', templateParams)
        .then(function () {
          alert('Спасибо! Ваше сообщение отправлено.');
          contactForm.reset();
        })
        .catch(function () {
          alert('Ошибка отправки. Позвоните нам: 8-999-852-58-21');
        })
        .finally(function () {
          submitBtn.value = originalText;
          submitBtn.disabled = false;
        });
    });
  }

  // ==================== АВТОЗАМЕНА НА WEBP ====================
  function supportsWebP() {
    var canvas = document.createElement('canvas');
    return canvas.toDataURL('image/webp').indexOf('image/webp') === 0;
  }

  if (supportsWebP()) {
    document.querySelectorAll('img[src$=".jpg"], img[src$=".jpeg"], img[src$=".png"]').forEach(function (img) {
      var webpSrc = img.src.replace(/\.(jpg|jpeg|png)$/, '.webp');
      fetch(webpSrc, { method: 'HEAD' })
        .then(function (res) {
          if (res.ok) img.src = webpSrc;
        })
        .catch(function () { });
    });
  }

}); // КОНЕЦ DOMContentLoaded
