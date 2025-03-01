const form = document.querySelector('.feedback-form');
const LOCAL_STORAGE_KEY = 'feedback-form-state';

// Початковий об'єкт з даними форми
let formData = {
    email: '',
    message: '',
};

// 1️⃣ Перевіряємо, чи є збережені дані у localStorage, і заповнюємо ними форму
const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
if (savedData) {
    formData = JSON.parse(savedData);
    form.elements.email.value = formData.email || ''; // Запобігає `undefined`
    form.elements.message.value = formData.message || ''; // Запобігає `undefined`
}

// 2️⃣ Відстежуємо введення користувача та зберігаємо у localStorage
form.addEventListener('input', (event) => {
    formData[event.target.name] = event.target.value.trim(); // Видаляємо зайві пробіли
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
});

// 3️⃣ Обробляємо відправлення форми
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Забороняємо перезавантаження сторінки

    // Перевіряємо, чи всі поля заповнені
    if (!formData.email || !formData.message) {
        alert('Fill please all fields');
        return;
    }

    console.log('Submitted data:', formData); // Виводимо дані у консоль

    // Очищаємо локальне сховище та форму
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    form.reset();
    formData = { email: '', message: '' }; // Скидаємо об'єкт
});
