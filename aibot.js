document.addEventListener("DOMContentLoaded", () => {
    const chatIcon = document.getElementById("chat-icon");
    const chatWindow = document.getElementById("chat-window");
    const closeChat = document.getElementById("close-chat");
    const chatInput = document.getElementById("chat-input");
    const chatContent = document.getElementById("chat-content");
    const sendMessage = document.getElementById("send-message");

    const apiKey = "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";  // Dein API-Key
    const apiUrl = "https://api.groq.com/openai/v1/chat/completions"; // Ersetze dies mit der tatsächlichen API-URL

    chatIcon.addEventListener("click", () => {
        chatWindow.classList.remove("hidden");
    });

    closeChat.addEventListener("click", () => {
        chatWindow.classList.add("hidden");
    });

    sendMessage.addEventListener("click", () => {
        const userMessage = chatInput.value.trim();
        if (userMessage !== "") {
            appendMessage("user", userMessage);
            chatInput.value = "";
            respondToMessage(userMessage);
        }
    });

    function appendMessage(sender, message) {
        const messageDiv = document.createElement("div");
        messageDiv.className = `chat-message ${sender}`;
        messageDiv.textContent = message;
        chatContent.appendChild(messageDiv);
        chatContent.scrollTop = chatContent.scrollHeight;
    }

    function respondToMessage(message) {
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "llama3-8b-8192", // Beispielmodell, anpassen falls notwendig
                messages: [
                    { role: "system", content: "you are a helpful assistant." },
                    { role: "user", content: message }
                ],
                temperature: 0.5,
                max_tokens: 1024,
                top_p: 1
            })
        })
            .then(response => response.json())
            .then(data => {
                // Prüfen, ob die Antwort die erwartete Struktur hat
                if (data && data.choices && data.choices[0] && data.choices[0].message) {
                    const botMessage = data.choices[0].message.content;
                    setTimeout(() => {
                        appendMessage("bot", botMessage);
                    }, 1000);
                } else {
                    setTimeout(() => {
                        appendMessage("bot", "Entschuldigung, ich konnte keine Antwort erhalten.");
                    }, 1000);
                }
            })
            .catch(error => {
                console.error("Fehler beim Abrufen der Antwort:", error);
                setTimeout(() => {
                    appendMessage("bot", "Entschuldigung, es gab ein Problem bei der Verarbeitung deiner Anfrage.");
                }, 1000);
            });
    }
});
