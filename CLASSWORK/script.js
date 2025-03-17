// ========================================================================================================
// Урок от 14 марта 2025. Работа в классе - Практическая работа.
// ========================================================================================================

// ========================================================================================================
// Курс: Разработка интерфейса на JavaScript.
// ========================================================================================================

// ========================================================================================================
// Дисциплина: Основы  JavaScript.
// ========================================================================================================

// ========================================================================================================
// Занятие №20: Сохранение данных в браузере. Куки. Локальное хранилище.
// ========================================================================================================

// ========================================================================================================
// Решите данные задачи:
// --------------------------------------------------------------------------------------------------------
// 1. Напиши функцию, которая вставляет данные из формы в Cookie. И выводит их на экран приветствия. 
//    Если данных в Cookie нет, то выводить обращение к гостю. 
//    Слева есть форма с 3 полями. (Имя, телефон и возраст). Справа место, где нужно их вывести.
// --------------------------------------------------------------------------------------------------------
// 2. Модернизировать прошлую функцию. 
//    На этот раз сделать через LocalStorage. Есть страница для входа. И главная страница. 
//    Если мы залогинились правильно, то показывать админ панель иначе не показывать.
// --------------------------------------------------------------------------------------------------------
// 3. Напишите функцию, которая сохраняет пользовательские настройки. 
//    Пользователь вводит размер текста, цвет текста и выбирает начертание (жирный, курсив и нормальный). 
//    Кнопка сохранить настройки и сбросить настройки. 
//    Затем поле для ввода и кнопка отправить текст. Отправляет текст с настройками текста.
// ========================================================================================================










// ====== ДАННЫЕ ПОЛЬЗОВАТЕЛЯ (COOKIE) ======
function saveUserData() {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim() || 'не указан';
    const age = document.getElementById('age').value.trim() || 'не указан';

    if (name) {
        document.cookie = `name=${encodeURIComponent(name)}; path=/`;
        document.cookie = `phone=${encodeURIComponent(phone)}; path=/`;
        document.cookie = `age=${encodeURIComponent(age)}; path=/`;
        updateGreeting();
        showModal(`Данные сохранены успешно, ${name}`);
    }
}

function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
}

function updateGreeting() {
    const name = getCookie('name') || 'гость';
    const phone = getCookie('phone') || 'не указан';
    const age = getCookie('age') || 'не указан';
    document.getElementById('greeting').innerText = `👋 Привет, ${name}! Телефон: ${phone}, Возраст: ${age}`;
}

// ====== АВТОРИЗАЦИЯ (LOCALSTORAGE) ======
function login() {
    localStorage.setItem('auth', 'true');
    document.getElementById('adminPanel').classList.remove('hidden');
}

function logout() {
    localStorage.removeItem('auth');
    document.getElementById('adminPanel').classList.add('hidden');
}

// ====== НАСТРОЙКИ ТЕКСТА ======
function saveTextSettings() {
    const text = document.getElementById('textInput').value;
    const fontSize = document.getElementById('fontSize').value;
    const fontColor = document.getElementById('fontColor').value;
    const fontStyle = document.getElementById('fontStyle').value;

    const output = document.getElementById('outputText');
    output.innerText = text;
    output.style.fontSize = `${fontSize}px`;
    output.style.color = fontColor;
    output.style.fontStyle = fontStyle;
}

// ====== МОДАЛЬНОЕ ОКНО ======
let modalTimeout;

function showModal(message) {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modalMessage');

    // Очищаем предыдущий таймер
    clearTimeout(modalTimeout);

    modalMessage.innerText = message;
    modal.classList.remove('hidden');

    // Устанавливаем таймер на автоматическое закрытие
    modalTimeout = setTimeout(() => {
        closeModal();
    }, 3000);
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('hidden');
    clearTimeout(modalTimeout);
}

// Добавляем обработчик события для закрытия по клику за пределами окна
document.getElementById('modal').addEventListener('click', closeModal);

document.querySelector('.modal-content').addEventListener('click', (event) => {
    event.stopPropagation(); // Предотвращаем закрытие при клике по самому окну
});




