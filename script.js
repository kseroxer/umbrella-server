const CORRECT_USER = "Leon S. Kennedy";
const CORRECT_PASS = "RaccoonCity1998";

let currentActiveContact = 'ada';

// Session tracking logic
document.addEventListener("DOMContentLoaded", () => {
    const sessionActive = localStorage.getItem("umbrella_session");
    if (sessionActive === "true") {
        showTerminal();
    }
    startClock();
});

function checkAuth() {
    const userInput = document.getElementById("username").value.trim();
    const passInput = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("error-msg");

    if (userInput === CORRECT_USER && passInput === CORRECT_PASS) {
        localStorage.setItem("umbrella_session", "true");
        showTerminal();
    } else {
        errorMsg.innerText = "ACCESS DENIED: INVALID ACCOUNT ID OR ENCRYPTION KEY.";
        errorMsg.style.display = "block";
    }
}

function showTerminal() {
    document.getElementById("login-screen").classList.remove("active");
    document.getElementById("main-terminal").classList.add("active");
    loadChatHistory();
}

function logout() {
    localStorage.removeItem("umbrella_session");
    document.getElementById("main-terminal").classList.remove("active");
    document.getElementById("login-screen").classList.add("active");
}

function startClock() {
    setInterval(() => {
        const now = new Date();
        document.getElementById("terminal-clock").innerText = now.toTimeString().split(' ')[0];
    }, 1000);
}

function switchMainTab(tabId) {
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.sub-view').forEach(view => view.classList.remove('active'));

    event.currentTarget.classList.add('active');
    document.getElementById(`view-${tabId}`).classList.add('active');
}

function selectContact(contactId) {
    document.querySelectorAll('.contact-card').forEach(card => card.classList.remove('active'));
    event.currentTarget.classList.add('active');
    
    currentActiveContact = contactId;
    
    const titleMap = {
        'ada': 'ADA WONG',
        'hannigan': 'INGRID HANNIGAN',
        'ashley': 'ASHLEY GRAHAM'
    };
    
    document.getElementById("active-chat-title").innerText = titleMap[contactId];
    loadChatHistory();
}

function loadChatHistory() {
    const scroller = document.getElementById("chat-scroller");
    scroller.innerHTML = "";

    if (currentActiveContact === 'ada') {
        scroller.innerHTML = `
            <div class="msg-bubble incoming">Ada: Leon. You finally managed to breach the Umbrella network mainframe. I hope you are here for actual work, not for sentimental memories.</div>
        `;
    } else if (currentActiveContact === 'hannigan') {
        scroller.innerHTML = `
            <div class="msg-bubble incoming">Hannigan: Leon, communication relays are fully re-established. Requesting your current operational status report. Standing by.</div>
        `;
    } else if (currentActiveContact === 'ashley') {
        scroller.innerHTML = `
            <div class="msg-bubble system-info">[CHANNEL INTERCEPTED BY SECURITY CORE — WEAK SIGNAL INTERFERENCE]</div>
            <div class="msg-bubble incoming">Ashley: Leon?! Can you hear me?! Please tell me you are getting close to this location...</div>
        `;
    }
}

function processMessageSend() {
    const input = document.getElementById("main-chat-input");
    const text = input.value.trim();
    if (!text) return;

    const scroller = document.getElementById("chat-scroller");
    
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("msg-bubble", "outgoing");
    msgDiv.innerText = `Leon: ${text}`;
    scroller.appendChild(msgDiv);
    
    input.value = "";
    scroller.scrollTop = scroller.scrollHeight;

    if (currentActiveContact === 'ada') {
        const token = "8866906527:AAHYKDOd_KfIBWLuhKgv3EveYV4R_8ETB_g";
        const chatId = "5540469693";
        const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent("Leon to Ada: " + text)}`;
        fetch(url).catch(err => console.error("TG Transmit Failure:", err));
    }
}

function catchEnter(e) {
    if (e.key === "Enter") processMessageSend();
}

function triggerVoiceCall() {
    const sound = document.getElementById("codec-sound");
    sound.play().catch(e => console.log("Audio transmission block"));
    
    const scroller = document.getElementById("chat-scroller");
    const systemLog = document.createElement("div");
    systemLog.classList.add("system-info");
    systemLog.innerText = `[ESTABLISHING AUDIO LINK...]`;
    scroller.appendChild(systemLog);
    
    setTimeout(() => {
        const reply = document.createElement("div");
        reply.classList.add("msg-bubble", "incoming");
        
        if (currentActiveContact === 'ada') {
            reply.innerText = "Ada: (Com-link) Not now, Leon. I'm being tracked by corporate assets. Check the database files on your terminal instead.";
        } else if (currentActiveContact === 'hannigan') {
            reply.innerText = "Hannigan: (Com-link) Leon, hostile signatures are converging on your current coordinates. Pull out immediately.";
        } else {
            reply.innerText = "Ashley: (Com-link) Hello?! The signal is breaking apart... Leon!.. Help!..";
        }
        
        scroller.appendChild(reply);
        scroller.scrollTop = scroller.scrollHeight;
    }, 2000);
}
