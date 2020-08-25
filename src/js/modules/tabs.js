function tabs() {
    const tabs = document.querySelectorAll('.catalog__tab'),
          contants = document.querySelectorAll('.catalog__content');

    let tabsIndex = 0;
    toggleActive();
    function toggleActive() {
        tabs.forEach(tab => tab.classList.remove('catalog__tab_active'));
        contants.forEach(contant => contant.classList.remove('catalog__content_active'));
        tabs[tabsIndex].classList.add('catalog__tab_active');
        contants[tabsIndex].classList.add('catalog__content_active');
    }

    tabs.forEach((tab, i) => {
        tab.addEventListener('click', () => {
            tabsIndex = i;
            toggleActive();
        });
    });
}

export default tabs;