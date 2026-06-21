// Главный файл для инициализации приложения
let authManager;
let taskManager;

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация менеджеров
    authManager = new AuthManager();
    taskManager = new TaskManager(authManager);
    
    // Делаем менеджеры глобальными для обработчиков событий в HTML
    window.authManager = authManager;
    window.taskManager = taskManager;
    
    // Проверяем авторизацию при загрузке
    if (authManager.isLoggedIn()) {
        authManager.showPage('tasks-page');
        authManager.updateUserInterface();
        taskManager.init();
        
        // Загружаем тестовые данные, если их нет
        loadSampleData();
    } else {
        authManager.showPage('login-page');
    }
});

function loadSampleData() {
    // Загружаем примеры категорий, если их нет
    if (taskManager.categories.length === 0) {
        const sampleCategories = [
            { id: 'cat1', name: 'Работа', color: '#4361ee', userId: authManager.getCurrentUser().id },
            { id: 'cat2', name: 'Личное', color: '#7209b7', userId: authManager.getCurrentUser().id },
            { id: 'cat3', name: 'Здоровье', color: '#4cc9f0', userId: authManager.getCurrentUser().id },
            { id: 'cat4', name: 'Обучение', color: '#f72585', userId: authManager.getCurrentUser().id }
        ];
        taskManager.categories = sampleCategories;
        taskManager.saveCategories();
        taskManager.renderCategories();
    }
    
    // Загружаем примеры задач, если их нет
    if (taskManager.tasks.length === 0) {
        const sampleTasks = [
            {
                id: 'task1',
                title: 'Завершить проект TaskFlow',
                description: 'Доработать функционал и протестировать приложение',
                categoryId: 'cat1',
                priority: 'high',
                dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Завтра
                completed: false,
                userId: authManager.getCurrentUser().id,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'task2', 
                title: 'Купить продукты',
                description: 'Молоко, хлеб, фрукты, овощи',
                categoryId: 'cat2',
                priority: 'medium',
                dueDate: new Date().toISOString().split('T')[0], // Сегодня
                completed: false,
                userId: authManager.getCurrentUser().id,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'task3',
                title: 'Изучить новые технологии',
                description: 'Прочитать документацию по новым фреймворкам',
                categoryId: 'cat4', 
                priority: 'low',
                dueDate: null,
                completed: true,
                userId: authManager.getCurrentUser().id,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        ];
        taskManager.tasks = sampleTasks;
        taskManager.saveTasks();
        taskManager.renderTasks();
        taskManager.updateStats();
    }
}