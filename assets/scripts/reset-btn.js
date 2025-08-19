document.querySelectorAll('.reset-btn').forEach(button => {
    button.addEventListener('click', () => {
        const input = button.previousElementSibling;
        if (input && input.dataset.original !== undefined) {
            input.value = input.dataset.original;
            input.dispatchEvent(new Event('change')); // utile pour relancer un fetch AJAX lié
        }
    });
});