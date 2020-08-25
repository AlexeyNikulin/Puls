import {hide} from './modal'; 

function forms() {

    const rules = {
        required: function(el) {
            if (el.value !== '') {
                return true;
            }

            return false;
        },
        email: function(el) {
            if (el.value !== '' && !/[0-9a-z_-]+@[0-9a-z_-]+\.[a-z]{2,5}/i.test(el.value)) {
                return 'notEmail';
            }
            return true;
        },
        phone: function(el) {
            return true;
        }
    };

    const errorClass = {
        consultationForm: 'error-message_consultation-form',
        feedForm: 'error-message_feed-form',
        orderForm: 'error-message_consultation-form'
    };

    const errorMessage = {
        name: 'Введите свое имя',
        phone: 'Введите свой номер телефона',
        email: 'Введите свою почту',
        notEmail: 'Вы неправильно ввели свою почту'
    };

    const message = {
        success: 'Ваша заявка отправлена',
        loading: 'Загрузка...',
        failure: 'Что-то пошло не так...'
    };

    function createErrorMessage(elem, form, name = elem.getAttribute('name')) {
        elem.style.border = '1.5px solid #c70101';
        const message = document.createElement('div');
        message.classList.add(errorClass[form.getAttribute('id')]);
        message.textContent = errorMessage[name];
        elem.after(message);
    }

    const forms = document.querySelectorAll('form');
    forms.forEach((form,  i) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const elems = form.elements;
            let errors = false;
            
            elems.forEach(elem => {
                if (elem.tagName !== 'BUTTON') {
                    let rulesList = elem.dataset.rule.split(' ');
                    rulesList.forEach(item => {
                        if (rules[item]) {
                            if (!rules[item](elem)) {
                                if (elem.nextElementSibling.tagName !== 'DIV') {
                                    createErrorMessage(elem, form);
                                }
                                errors = true;
                            } else if (rules[item](elem) === 'notEmail') {
                                createErrorMessage(elem, form, 'notEmail');
                                errors = true;
                            }
                            
                        }
                    });
                }
                elem.addEventListener('input', () => {
                    if (elem.nextElementSibling.tagName === 'DIV') {
                        elem.nextElementSibling.remove();
                        elem.style.border = 'none';
                    }  
                });
            });

            if (errors) {
                return false;
            }

            if (form.lastElementChild.tagName === 'DIV') {
                form.lastElementChild.remove();
            }

            const formMessage = document.createElement('div');
            formMessage.classList.add(errorClass[form.getAttribute('id')]);
            formMessage.textContent = message.loading;
            form.append(formMessage);
            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            // request.setRequestHeader('Content-type', 'application/json');
            const formData = new FormData(form);
            // const obj = {};
            // formData.forEach((value, key) => {
            //     obj[key] = value;
            // });
            // const json = JSON.stringify(obj);
            request.send(formData);
            
            request.addEventListener('readystatechange', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    formMessage.textContent = message.success;
                } else {
                    formMessage.textContent = message.failure;
                }
                setTimeout(() => {
                    formMessage.remove();
                }, 2000);
                form.reset();
            });

        });
    });

}

export default forms;