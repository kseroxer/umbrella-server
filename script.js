// Данные авторизации
const CORRECT_USER = "Leon S. Kennedy";
const CORRECT_PASS = "RaccoonCity1998";

function checkAuth() {
    const userInput = document.getElementById("username").value.trim();
    const passInput = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("error-msg");

    if (userInput === CORRECT_USER && passInput === CORRECT_PASS) {
        document.getElementById("login-screen").classList.remove("active");
        document.getElementById("main-terminal").classList.add("active");
        startClock();
        // Приветственная задержка перед репликой Ады
        setTimeout(adaFirstMessage, 1500);
    } else {
        errorMsg.innerText = "ERROR: INVALID AGENT ID OR SECURITY CODE. ACCESS DENIED.";
        errorMsg.style.padding = "8px";
    }
}

function startClock() {
    setInterval(() => {
        const now = new Date();
        const timeString = now.toTimeString().split(' ')[0];
        document.getElementById("terminal-clock").innerText = timeString;
    }, 1000);
}

// Логика переключения меню (вкладок)
function switchTab(tabName) {
    // Снимаем активный класс со всех кнопок меню
    document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));
    // Скрываем весь контент
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Находим нужную кнопку по тексту или вызову и делаем активной
    event.currentTarget.classList.add('active');
    // Показываем нужный контент
    document.getElementById(`tab-${tabName}`).classList.add('active');
}

// СИМУЛЯЦИЯ ЧАТА С АДОЙ
function adaFirstMessage() {
    appendMessage("ada", "Ada Wong: Давно не виделись, Леон. Не думала, что ты найдешь этот терминал.");
}

function appendMessage(sender, text) {
    const chatBox = document.getElementById("chat-box");
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("msg", sender);
    msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Прокрутка чата вниз
}

function handleChatKey(event) {
    if (event.key === "Enter") {
        sendLeonMessage();
    }
}

function sendLeonMessage() {
    const input = document.getElementById("chat-input");
    const text = input.value.trim();
    if (!text) return;

    appendMessage("leon", `Leon S. Kennedy: ${text}`);
    input.value = "";

    // Эмуляция того, что Ада думает над ответом (мы настроим кастомные сценарии дальше!)
    setTimeout(() => {
        appendMessage("system", "[ADA IS TYPING...]");
    }, 1000);
}
