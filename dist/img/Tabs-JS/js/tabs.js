document.addEventListener('DOMContentLoaded', () => {
	const tabs = document.querySelector('.tabs');
	const tabsBtn = document.querySelectorAll('.tabs__btn');
	const tabsContent = document.querySelectorAll('.tabs__content');

	if (tabs) {
		tabs.addEventListener('click', (e) => {
			if (e.target.classList.contains('tabs__btn')) {
				const tabsPath = e.target.dataset.tabsPath;
				tabsBtn.forEach(el => {el.classList.remove('tabs__btn--active')});
				document.querySelector(`[data-tabs-path="${tabsPath}"]`).classList.add('tabs__btn--active');
				tabsHandler(tabsPath);
			}
			if(e.target.classList.contains('tabs__arrow--prev')){
				let activeBtn = document.querySelector('.tabs__btn--active');
				let activeParent = activeBtn.closest('.tabs__item');
				let previousParent = activeParent.previousElementSibling;

				if(previousParent){
					tabsBtn.forEach(el =>  {el.classList.remove('tabs__btn-active')});
					previousParent.querySelector('.tabs__btn').classList.add('tabs__btn--active');
				}
			}
			if(e.target.classList.contains('tabs__arrow--next')){
				let activeBtn = document.querySelectorAll('.tabs__btn--active');
				let activeParent = activeBtn.closest('.tabs__item');
				let nextParent = activeParent.nextElementSibling;

				if(nextParent){
					tabsBtn.forEach(el =>  {el.classList.remove('tabs__btn-active')});
					nextParent.querySelector('.tabs__btn').classList.add('tabs__btn--active');
				}
			}

		});
	}

	const tabsHandler = (path) => {
		tabsContent.forEach(el => {el.classList.remove('tabs__content--active')});
		document.querySelector(`[data-tabs-target="${path}"]`).classList.add('tabs__content--active');
	};


// if (document.querySelector('.tab')) {
//   document.querySelector('.tab').addEventListener('click', (t) => {

//         t.preventDefault();
//         $($(this).siblings()).removeClass('tab--active');
//         $($(this).parent().siblings().find('div')).removeClass('tabs-content--active');
//         $(this).addClass('tab--active');
//         $($(this).attr('href')).addClass('tabs-content--active');

//   });
// }

});
