const toggleThemeButton = document.getElementById('toggle-theme');

// Проверяем localStorage при загрузке
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}

toggleThemeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    // Сохраняем состояние в localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});


