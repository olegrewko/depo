$(function () {

  $(".menu a, .totop").on("click", function (event) {
    //отменяем стандартную обработку нажатия по ссылке
    event.preventDefault();

    //забираем идентификатор бока с атрибута href
    var id = $(this).attr('href'),

      //узнаем высоту от начала страницы до блока на который ссылается якорь
      top = $(id).offset().top;

    //анимируем переход на расстояние - top за 1500 мс
    $('body,html').animate({
      scrollTop: top
    }, 1500);
  });



  $('.slider-blog__inner').slick({
    arrows: false,
    prevArrow: '<button type="button" class="slick-prev"><img src="img/arrow-left.svg" alt="img/arrow-left.svg" /></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="img/arrow-right.svg" alt="img/arrow-right.svg" /></button>',
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    responsive: [{
        breakpoint: 768,
        settings: {

          arrows: false

        }
      },

    ]
  });


  $('.menu__btn, .menu a').on('click', function name() {
    $('.menu__list').toggleClass('menu__list--active');


  });

 
  
});

         function myFunction() {
        document.getElementById("myDropdown").classList.toggle("show");
        
    }
         function myFunctionHeadphones() {
        document.getElementById("myHeadphones").classList.toggle("show");
    }
         function myFunctionWireless() {
        document.getElementById("myWireless").classList.toggle("show");
    }
         function myFunctionFind() {
        document.getElementById("myFind").classList.toggle("show");
    }
      

      window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    }
 $stepper: document.querySelector('.stepper');    
 if (vars.$stepper) {

  const $stepperInput = vars.$stepper.querySelector('.stepper__input'),
    $stepperMinus = vars.$stepper.querySelector('.stepper__btn--minus'),
    $stepperPlus = vars.$stepper.querySelector('.stepper__btn--plus');

  $stepperInput.addEventListener('keydown', (e) => {
    console.log(e.currentTarget.value)
    if (e.currentTarget.value <= 1) {
      $stepperMinus.classList.add('stepper__btn--disabled');
      $stepperPlus.classList.remove('stepper__btn--disabled');
    } else {
      $stepperMinus.classList.remove('stepper__btn--disabled');
    }

    if (e.currentTarget.value > 99998) {
      $stepperMinus.classList.remove('stepper__btn--disabled');
      $stepperPlus.classList.add('stepper__btn--disabled');
    } else {
      $stepperPlus.classList.remove('stepper__btn--disabled');
    }
  });

  $stepperPlus.addEventListener('click', (e) => {
    let currentValue = parseInt($stepperInput.value);
    currentValue++;
    $stepperInput.value = currentValue;

    $stepperMinus.classList.remove('stepper__btn--disabled');

    if ($stepperInput.value > 99998) {
      $stepperInput.value = 99999;
      $stepperPlus.classList.add('stepper__btn--disabled');
    } else {
      $stepperPlus.classList.remove('stepper__btn--disabled');
    }
  });

  $stepperMinus.addEventListener('click', (e) => {
    let currentValue = parseInt($stepperInput.value);
    currentValue--;
    $stepperInput.value = currentValue;

    $stepperPlus.classList.remove('stepper__btn--disabled');

    if ($stepperInput.value <= 1) {
      $stepperInput.value = 1;
      $stepperMinus.classList.add('stepper__btn--disabled');
    } else {
      $stepperMinus.classList.remove('stepper__btn--disabled');
    }
  });

 }