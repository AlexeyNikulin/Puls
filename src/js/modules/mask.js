function mask() {
    
    function createMask(event) {
        let matrix = '+7 (___) ___-__-__',
            i = 0,
            def = matrix.replace(/\D/g, ''),
            val = this.value.replace(/\D/g, '');

        if (def.length >= val.length || +val[0] !== 7) {
            val = def;
        }

        this.value = matrix.replace(/./g, function(a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        });

        if (event.type === 'blur') {
            if (this.value.length === 2) {
                this.value = '';
            }
        }
    }

    let inputs = document.querySelectorAll('input[name="phone"]');

    inputs.forEach(input => {
        input.addEventListener('input', createMask);
        input.addEventListener('blur', createMask);
        input.addEventListener('focus', createMask);
    });

}

export default mask;