const storedUserData = JSON.parse(localStorage.getItem('userData1'));
if (!storedUserData) {
    window.location.href = "./gemini-signup.html"
}
const typingform = document.querySelector(".typing-form");
const chatList = document.querySelector(".chat-list");
const toggleThemeButton = document.querySelector("#toggle-theme-button");
const suggestions = document.querySelectorAll(".suggestion-list .suggestion");
const deleteChatButton = document.querySelector("#delete-Chat-Button");


let userMessage = null;
let isResponseGenerating = false;

const API_KEY = "AIzaSyCM7w4_s-xdSE1cvgJI5SVMGEUMgp2UDzs";
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;

const loadLocalStorageData = () => {
    const SavedChats = localStorage.getItem("SavedChats")
    const isLightMode = (localStorage.getItem("themeColor") === "light_mode");

    document.body.classList.toggle("light_mode", isLightMode);
    toggleThemeButton.innerText = isLightMode ? "Dark_mode" : "light_mode";

    chatList.innerHTML = SavedChats || "";
    chatList.scrollTo(0, chatList.scrollHeight);
    document.body.classList.toggle("hide-header", SavedChats);
}

loadLocalStorageData();



const showTypingAffect = (text, textElement, incomingMessageDiv) => {
    const words = text.split(' ');
    let currentWordIndex = 0;

    const typingInterval = setInterval(() => {
        textElement.innerText += (currentWordIndex === 0 ? '' : ' ') + words[currentWordIndex++];
        incomingMessageDiv.querySelector(".icon").classList.add("hide");

        if (currentWordIndex === words.length) {
            isResponseGenerating = false;
            clearInterval(typingInterval);
            incomingMessageDiv.querySelector(".icon").classList.remove("hide");
            localStorage.setItem("SavedChats", chatList.innerHTML);
        }
        chatList.scrollTo(0, chatList.scrollHeight);
    }, 75);
}

const generateAPIresponse = async (incomingMessageDiv) => {
    const taskElement = incomingMessageDiv.querySelector(".text");
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    role: "user",
                    parts: [{ text: userMessage }]
                }]
            })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error.message)
        const aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text.replace(/\*\*(.*?)\*\*/g, '$1'); // Added optional chaining

        if (aiResponse) {
            showTypingAffect(aiResponse, taskElement, incomingMessageDiv);
        } else {
            taskElement.innerText = "Sorry, I couldn't understand that."; // Fallback message
        }
    } catch (error) {
        isResponseGenerating = false;
        console.log(error);
        taskElement.innerText = error.message;
        taskElement.classList.add("error")
        taskElement.innerText = "An error occurred while fetching the response."; // Error message
    } finally {
        incomingMessageDiv.classList.remove("loading");
    }
}

const showLoadingAnimation = () => {
    const html = `<div class="message-content">
                <img src="./img/gemini.svg" alt="" class="avatar">
                <p class="text"></p>
                <div class="loading-indicator">
                    <div class="loading-bar"></div>
                    <div class="loading-bar"></div>
                    <div class="loading-bar"></div>
                </div>
            </div>
            <span onclick="copyMessage(this)" class="icon material-symbols-rounded">content_copy</span>`;

    const incomingMessageDiv = createMessageElement(html, "incoming", "loading");
    chatList.appendChild(incomingMessageDiv);

    chatList.scrollTo(0, chatList.scrollHeight);
    // Pass the incomingMessageDiv to generateAPIresponse
    generateAPIresponse(incomingMessageDiv);
}

const copyMessage = (copyIcon) => {
    const meassageText = copyIcon.parentElement.querySelector(".text").innerText;
    navigator.clipboard.writeText(meassageText);

    copyIcon.innerText = "done";
    setTimeout(() => copyIcon.innerText = "content_copy", 1000)
}

const createMessageElement = (content, ...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);

    div.innerHTML = content;
    return div;
}

const handleOutgoingChat = () => {
    userMessage = typingform.querySelector(".typing-input").value.trim() || userMessage;
    if (!userMessage || isResponseGenerating) return;

    isResponseGenerating = true;

    const html = `<div class="message-content">
                <img src="./img/user.jpg" alt="" class="avatar">
                <p class="text"></p>
            </div>`;

    const outgoingMessageDiv = createMessageElement(html, "outgoing");
    outgoingMessageDiv.querySelector(".text").innerText = userMessage;
    chatList.appendChild(outgoingMessageDiv);

    typingform.reset();
    chatList.scrollTo(0, chatList.scrollHeight);
    document.body.classList.add("hide-header");
    setTimeout(showLoadingAnimation, 500);
}

suggestions.forEach(suggestions => {
    suggestions.addEventListener("click", () => {
        userMessage = suggestions.querySelector(".text").innerText;
        handleOutgoingChat();
    })
})
toggleThemeButton.addEventListener("click", () => {
    const isLightMode = document.body.classList.toggle("light_mode")
    localStorage.setItem("themeColor", isLightMode ? "light_mode" : "Dark_mode")
    toggleThemeButton.innerText = isLightMode ? "Dark_mode" : "light_mode";
})

deleteChatButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all messages")) {
        localStorage.removeItem("SavedChats");
        loadLocalStorageData()
    }
})

typingform.addEventListener("submit", (e) => {
    e.preventDefault();
    handleOutgoingChat();
});
