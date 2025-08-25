
const selector = 'input[type="text"], input[type="number"], input[type=email], input[type=password], select, textarea';
const inputs = document.querySelectorAll(selector);
const form = document.querySelector('.all-form');

function initInput(inputEl) {
    const wrapper = inputEl.closest('span');

    if (inputEl.value.trim() !== '') {
        wrapper?.classList.add('inputs--filled');
    }

    inputEl.addEventListener('focus', onFocus);
    inputEl.addEventListener('blur', onBlur);
}

function onFocus(ev) {
    const parent = ev.target.parentNode;

    if (parent && parent.classList) {
        parent.classList.add('inputs--filled');
    }
}

function onBlur( ev ) {
    const input = ev.target;
    const wrapper = input.parentNode;

    if (input.value.trim() === '') {
        wrapper.classList.remove('inputs--filled');
        wrapper.classList.remove('inputs--invalid');
    } else {
        wrapper.classList.add('inputs--filled');

        if (!input.checkValidity()) {
            wrapper.classList.add('inputs--invalid');
        } else {
            wrapper.classList.remove('inputs--invalid');
        }
    }

    input.removeEventListener('input', liveValidation);
    input.addEventListener('input', liveValidation);
}

function liveValidation( ev ) {
    const input = ev.target;
    const wrapper = input.parentNode;

    if (!input.checkValidity()) {
        wrapper.classList.add('inputs--invalid');
    } else {
        wrapper.classList.remove('inputs--invalid');
    }
}

if (form) {
    form.addEventListener('submit', onSubmit);
}

function onSubmit(ev) {
    const inputsWrappers = ev.target.querySelectorAll('span');
    let hasError = false;

    inputsWrappers.forEach((wrapper) => {
        const input = wrapper.querySelector(selector);
        if (input) {
            if (!input.checkValidity()) {
                wrapper.classList.add('inputs--invalid');
                hasError = true;
            } else {
                wrapper.classList.remove('inputs--invalid');
            }
        }
    });

    if (hasError) {
        ev.preventDefault();
    }
}

window.addEventListener('load', () => {
    inputs.forEach((input) => {
        initInput(input);

        if (input.tagName === 'SELECT' && input.value) {
            const wrapper = input.parentNode;
            wrapper.classList.add('inputs--filled');
        }
    });
});