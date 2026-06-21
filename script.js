// Конфигурация Telegram (Строго твои данные)
const TG_TOKEN = "8866906527:AAHYKDOd_KfIBWLuhKgv3EveYV4R_8ETB_g";
const TG_CHAT_ID = "5540469693";

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
        startTelemetryStream();
    } else {
        errorMsg.innerText = "SECURITY ERROR: INVALID DATA. ACCESS DENIED.";
    }
}

function startClock() {
    setInterval(() => {
        const now = new Date();
        document.getElementById("terminal-clock").innerText = now.toTimeString().split(' ')[0];
    }, 1000);
}

// Переключение модулей
function switchTab(tabName) {
    document.querySelectorAll('.tab-module').forEach(mod => mod.classList.remove('active'));
    document.getElementById(`tab-${tabName}`).classList.add('active');
}

function switchChannel(chanName) {
    document.querySelectorAll('.tab-module').forEach(mod => mod.classList.remove('active'));
    document.querySelectorAll('.channel-item').forEach(ch => ch.classList.remove('active'));
    
    document.getElementById(`chan-${chanName}`).classList.add('active');
    document.getElementById(`tab-chat-${chanName}`).classList.add('active');
}

// ОТПРАВКА СООБЩЕНИЙ
function sendMessage(target) {
    const input = document.getElementById(`chat-input-${target}`);
    const text = input.value.trim();
    if (!text) return;

    appendMessage(`chat-box-${target}`, "leon", `LEON: ${text}`);
    input.value = "";

    if (target === "ada") {
        // Отправка сообщения Леона тебе в Telegram через скрытый запрос
        const url = `https://api.telegram.org/bot${TG_TOKEN}/sendMessage?chat_id=${TG_CHAT_ID}&text=${encodeURIComponent("Леон пишет Аде: " + text)}`;
        fetch(url).catch(err => console.error("Ошибка отправки в TG:", err));
    } else if (target === "hanningan") {
        // Автоответ Ханниган (ИИ/Скрипт)
        setTimeout(() => {
            appendMessage("chat-box-hanningan", "hanningan", "Hannigan: Леон, оставайся на связи. Направляю спутник для сканирования местности.");
        }, 1500);
    }
}

function handleChatKey(event, target) {
    if (event.key === "Enter") sendMessage(target);
}

function appendMessage(boxId, sender, text) {
    const chatBox = document.getElementById(boxId);
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("msg", sender);
    msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// ФУНКЦИЯ АУДИОЗВОНКА АДЫ
function startVoiceCall() {
    const sound = document.getElementById("call-sound");
    const chatBox = document.getElementById("chat-box-ada");
    
    appendMessage("chat-box-ada", "system", "[INITIALIZING VOICE LINK...]");
    sound.play().catch(e => console.log("Sound error"));

    setTimeout(() => {
        sound.pause();
        sound.currentTime = 0;
        appendMessage("chat-box-ada", "ada", "Ada Wong: (Аудиосвязь) Леон, ты тратишь наше время. Вся информация уже в архивах терминала. Ищи лучше. Конец связи.");
        appendMessage("chat-box-ada", "system", "[LINE DISCONNECTED]");
    }, 4000); // Длина звонка 4 секунды
}

// СИМУЛЯТОР БРАУЗЕРА
function loadBrowserPage(page) {
    const content = document.getElementById("browser-page-content");
    if (page === 'news') {
        content.innerHTML = `<div class="browser-title">Raccoon Times - Sept 1998</div><p>Вспышка неизвестного вируса в черте города. Власти рекомендуют не покидать свои дома. Карантинная зона расширяется.</p>`;
    } else if (page === 'incident') {
        content.innerHTML = `<div class="browser-title">Arklay Lab Case #002</div><p>Эксперимент по созданию биологического оружия "Тиран" вышел из-под контроля. Объект Арклей полностью уничтожен сотрудником С.Т.А.Р.С.</p>`;
    }
}

// ПАСХАЛКА: ОТКРЫТИЕ ДНЕВНИКА
function unlockHiddenDiary() {
    // Дневник активируется только если нажать на заголовок "UMBRELLA MAINFRAME ACCESS" в верхнем баре
    switchTab('secret-diary');
}

function verifyDiaryCode() {
    const code = document.getElementById("diary-code-input").value.trim();
    // Каноничная дата уничтожения Раккун-Сити: 01101998 (1 октября 1998)
    if (code === "01101998") {
        document.getElementById("diary-lock-screen").style.display = "none";
        document.getElementById("diary-text-content").style.display = "block";
    } else {
        alert("ACCESS DENIED: INCORRECT ENCRYPTION KEY.");
    }
}

// Поток фоновых логов
function startTelemetryStream() {
    const telemetryBox = document.getElementById("telemetry-stream");
    const logs = ["SYS_STABLE", "ENCRYPT_ON", "DATA_PACKET_SEND", "ANTIVIRUS_OK", "TEMP_19C"];
    setInterval(() => {
        const line = document.createElement("div");
        line.innerText = `[${new Date().toLocaleTimeString()}] ${logs[Math.floor(Math.random() * logs.length)]}`;
        telemetryBox.appendChild(line);
        if (telemetryBox.children.length > 20) telemetryBox.removeChild(telemetryBox.firstChild);
    }, 2500);
}
