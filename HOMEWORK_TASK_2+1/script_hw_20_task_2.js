// ========================================================================================================
// Урок от 14 марта 2025. Домашняя работа.
// ========================================================================================================

// ========================================================================================================
// Курс: Разработка интерфейса на JavaScript.
// ========================================================================================================

// ========================================================================================================
// Дисциплина: Основы  JavaScript.
// ========================================================================================================

// ========================================================================================================
// Домашнее задание №20: Сохранение данных в браузере. Куки. Локальное хранилище.
// ========================================================================================================

// ========================================================================================================
// Решите данные задачи:
// --------------------------------------------------------------------------------------------------------
// 1. Реализуйте небольшой сайт на HTML и CSS. 
// В шапке сайта должна быть кнопка темного режима. 
// Напишите функцию, которая проверяет установлен ли на сайте 
// темный режим (темный фон и белый шрифт) или нет.
// --------------------------------------------------------------------------------------------------------
// 2. Реализуйте страницу для регистрации на HTML и CSS. 
// Там должно быть 5-6 полей на ваш выбор. 
// Напишите функцию, которая проверяет вводил ли пользователь свои данные раньше (после отправки). 
// Если да, то автоматически подставить их в форму.
// ========================================================================================================










const form = document.getElementById('registrationForm');
const avatarInput = document.getElementById('avatar');
const userDataDisplay = document.getElementById('userDataDisplay');
const toggleThemeButton = document.getElementById('toggle-theme');
const modal = document.getElementById('modal');
const closeModalButton = document.getElementById('close-modal');
// --------------------------------------------------------------------------------------------------------
// === Темный режим ===
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}

toggleThemeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});
// --------------------------------------------------------------------------------------------------------
// === Загрузка данных из куков ===
document.addEventListener('DOMContentLoaded', () => {
    loadDataFromCookies();
// --------------------------------------------------------------------------------------------------------
    // Загружаем данные из LocalStorage
    const savedData = JSON.parse(localStorage.getItem('userData'));
    if (savedData) {
        fillForm(savedData);
        displayUserData(savedData);
    }

    modal.classList.remove('show');
});
// --------------------------------------------------------------------------------------------------------
// === Сохранение данных ===
form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validateForm()) {
        showModal('❌ Ошибка валидации. Проверьте введённые данные!');
        return;
    }

    const formData = {
        name: form.name.value,
        surname: form.surname.value,
        email: form.email.value,
        phone: form.phone.value,
        password: form.password.value
    };
// --------------------------------------------------------------------------------------------------------
    // === Сохранение фото профиля ===
    if (avatarInput.files[0]) {
        const reader = new FileReader();
        reader.onload = () => {
            formData.avatar = reader.result;
            saveData(formData);
        };
        reader.readAsDataURL(avatarInput.files[0]);
    } else {
        saveData(formData);
    }
});
// --------------------------------------------------------------------------------------------------------
// === Установка данных в LocalStorage и куки ===
function saveData(data) {
    // Сохраняем в LocalStorage
    localStorage.setItem('userData', JSON.stringify(data));
// --------------------------------------------------------------------------------------------------------    
    // ✅ Сохраняем отдельные куки (НЕ JSON)
    document.cookie = `name=${encodeURIComponent(data.name)}; path=/; max-age=604800`;
    document.cookie = `surname=${encodeURIComponent(data.surname)}; path=/; max-age=604800`;
    document.cookie = `email=${encodeURIComponent(data.email)}; path=/; max-age=604800`;
    document.cookie = `phone=${encodeURIComponent(data.phone)}; path=/; max-age=604800`;
    document.cookie = `password=${encodeURIComponent(data.password)}; path=/; max-age=604800`;

    if (data.avatar) {
        document.cookie = `avatar=${encodeURIComponent(data.avatar)}; path=/; max-age=604800`;
    }

    displayUserData(data);
    showModal('✅ Данные успешно сохранены!');
}
// --------------------------------------------------------------------------------------------------------
// === Загрузка данных из куков ===
function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
}

function loadDataFromCookies() {
    const data = {
        name: getCookie('name'),
        surname: getCookie('surname'),
        email: getCookie('email'),
        phone: getCookie('phone'),
        password: getCookie('password'),
        avatar: getCookie('avatar')
    };

    if (data.name) {
        fillForm(data);
        displayUserData(data);
    }
}
// --------------------------------------------------------------------------------------------------------
// === Заполнение формы ===
function fillForm(data) {
    form.name.value = data.name || '';
    form.surname.value = data.surname || '';
    form.email.value = data.email || '';
    form.phone.value = data.phone || '';
    form.password.value = data.password || '';

    if (data.avatar) {
        document.getElementById('userAvatar').src = data.avatar;
    }
}
// --------------------------------------------------------------------------------------------------------
// === Отображение данных пользователя ===
function displayUserData(data) {
    document.getElementById('displayName').innerText = data.name || '';
    document.getElementById('displaySurname').innerText = data.surname || '';
    document.getElementById('displayEmail').innerText = data.email || '';
    document.getElementById('displayPhone').innerText = data.phone || '';
    document.getElementById('displayPassword').innerText = data.password ? '********' : '';

    if (data.avatar) {
        document.getElementById('userAvatar').src = data.avatar;
    }

    userDataDisplay.classList.remove('hidden');
}
// --------------------------------------------------------------------------------------------------------
// === Валидация формы ===
function validateForm() {
    let isValid = true;
// --------------------------------------------------------------------------------------------------------
    // Проверка имени
    if (!form.name.value.trim()) {
        form.name.style.border = '2px solid red';
        isValid = false;
    } else {
        form.name.style.border = '2px solid green';
    }
// --------------------------------------------------------------------------------------------------------
    // Проверка фамилии
    if (!form.surname.value.trim()) {
        form.surname.style.border = '2px solid red';
        isValid = false;
    } else {
        form.surname.style.border = '2px solid green';
    }
// --------------------------------------------------------------------------------------------------------
    // Проверка email
    if (!form.email.checkValidity()) {
        form.email.style.border = '2px solid red';
        isValid = false;
    } else {
        form.email.style.border = '2px solid green';
    }
// --------------------------------------------------------------------------------------------------------
    // Проверка телефона
    const phonePattern = /^\+?[0-9]{10,15}$/;
    if (!phonePattern.test(form.phone.value)) {
        form.phone.style.border = '2px solid red';
        isValid = false;
    } else {
        form.phone.style.border = '2px solid green';
    }
// --------------------------------------------------------------------------------------------------------
    // Проверка пароля
    if (form.password.value.length < 6) {
        form.password.style.border = '2px solid red';
        isValid = false;
    } else {
        form.password.style.border = '2px solid green';
    }

    return isValid;
}
// --------------------------------------------------------------------------------------------------------
// === Очистка данных ===
function clearData() {
    localStorage.removeItem('userData');
// --------------------------------------------------------------------------------------------------------
    // ✅ Удаляем куки по отдельности
    document.cookie = `name=; path=/; max-age=0`;
    document.cookie = `surname=; path=/; max-age=0`;
    document.cookie = `email=; path=/; max-age=0`;
    document.cookie = `phone=; path=/; max-age=0`;
    document.cookie = `password=; path=/; max-age=0`;
    document.cookie = `avatar=; path=/; max-age=0`;

    userDataDisplay.classList.add('hidden');
}
// --------------------------------------------------------------------------------------------------------
// === Модальное окно ===
function showModal(message) {
    document.getElementById('modal-message').innerText = message;
    modal.classList.add('show');

    setTimeout(closeModal, 3000);
}

function closeModal() {
    modal.classList.remove('show');
}
// --------------------------------------------------------------------------------------------------------
// ✅ Закрытие по кнопке и клику вне области
closeModalButton.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});




