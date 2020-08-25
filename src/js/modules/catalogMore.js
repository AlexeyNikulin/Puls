function catalogMore() {
    const more = document.querySelectorAll('.catalog-item__link'),
          back = document.querySelectorAll('.catalog-item__back'),
          content = document.querySelectorAll('.catalog-item__content'),
          list = document.querySelectorAll('.catalog-item__list');

    more.forEach((item, i) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            content[i].classList.remove('catalog-item__content_active');
            list[i].classList.add('catalog-item__list_active');
        });
    });

    back.forEach((item, i) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            content[i].classList.add('catalog-item__content_active');
            list[i].classList.remove('catalog-item__list_active');
        });
    });
}

export default catalogMore;