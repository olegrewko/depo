git clone https://github.com/olegrewko/b--w.git ;
npm i ;
gulp ---запуск проекта


<!-- <label> сам кликает на радио. И этот клик срабатывает раньше (меняя значение checked), чем другие обработчики клика, добавленные в коде. Если добавить event.preventDefault(); - радио перестанет отмечаться, но внутри функции this.checked всё равно всегда показывает true (Не знаю, предполагаю: лейбел сначала включает радио, а когда выполнение доходит до preventDefault, делается вывод, что checked надо отменить. Но во время выполнения, он всё еще true).

Поэтому, переключение состояния можно немного отложить, чтобы браузер завершил всю обработку, и можно было получить реальное значение checked. -->
<!-- $(".price__calc-row input").on("click", function (e) {
  console.clear(); console.log(this.checked); // всегда true;
  e.preventDefault();
  
  setTimeout(
    () => $(this).prop("checked", !this.checked).trigger("change")
  );
});
label { display: block; }
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<div class="price__calc-row">
  <label><input type="radio" name="bubu"> test</label>
  <label><input type="radio" name="bubu"> test</label>
  <label><input type="radio" name="bubu"> test</label>
</div> -->