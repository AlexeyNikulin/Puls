function hide() {
    document.querySelector('.overlay').style.display = 'none';
    document.querySelector('#order').style.display = 'none';
    document.querySelector('#consultation').style.display = 'none';
    document.querySelector('#thanks').style.display = 'none';
    document.body.style.overflow = '';
}

function modal() {
    const btnsConsultation = document.querySelectorAll('[data-modal="consultation"]'),
          btnsOrder = document.querySelectorAll('.button_catalog'),
          overlay = document.querySelector('.overlay'),
          closes = document.querySelectorAll('.modal__close'); 

    function hidden() {
        document.body.style.overflow = 'hidden';
    }
    
    btnsConsultation.forEach(btn => {
        btn.addEventListener('click', () => {
            overlay.style.display = 'block';
            document.querySelector('#consultation').style.display = 'block';
            hidden();
        });
    });

    closes.forEach(close => {
        close.addEventListener('click', () => {
            hide();
        });
    });

    btnsOrder.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            overlay.style.display = 'block';
            document.querySelector('#order > .modal__descr').textContent = document.querySelectorAll('.catalog-item__subtitle')[i].textContent;
            document.querySelector('#order').style.display = 'block';
            hidden();
        });
    });
}
export {hide};
export default modal;
