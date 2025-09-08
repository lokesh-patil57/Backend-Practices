// // import React, { useState, useRef, useEffect } from "react";
// // import axios from "axios";
// // import "./Chatbot.css";

// // const Chatbot = () => {
// //   const [messages, setMessages] = useState([
// //     { sender: "bot", text: "👋 Hi! I’m Gemini 2.5 Pro. How can I help you today?" },
// //   ]);
// //   const [input, setInput] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const chatEndRef = useRef(null);

// //   // Auto scroll to bottom when new message arrives
// //   useEffect(() => {
// //     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
// //   }, [messages, loading]);

// //   const sendMessage = async () => {
// //     if (!input.trim()) return;

// //     const newMessages = [...messages, { sender: "user", text: input }];
// //     setMessages(newMessages);
// //     setInput("");
// //     setLoading(true);
// //     console.log("API KEY:", process.env.REACT_APP_GEMINI_API_KEY);

// //     try {
// //       const response = await axios.post(
// //         `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`,
// //         {
// //           contents: [{ role: "user", parts: [{ text: input }] }],
// //         }
// //       );

// //       const botReply =
// //         response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
// //         "⚠️ Sorry, I couldn’t process that.";

// //       setMessages([...newMessages, { sender: "bot", text: botReply }]);
// //     } catch (error) {
// //       console.error("Error fetching response:", error);
// //       setMessages([
// //         ...newMessages,
// //         { sender: "bot", text: "❌ Oops! Something went wrong." },
// //       ]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="chat-container">
// //       <div className="chat-header">💬 Gemini 2.5 Pro</div>

// //       <div className="chat-window">
// //         {messages.map((msg, i) => (
// //           <div key={i} className={`chat-message ${msg.sender}`}>
// //             <div className="bubble">{msg.text}</div>
// //           </div>
// //         ))}

// //         {/* Typing Indicator */}
// //         {loading && (
// //           <div className="chat-message bot">
// //             <div className="bubble typing">
// //               <span></span><span></span><span></span>
// //             </div>
// //           </div>
// //         )}

// //         <div ref={chatEndRef} />
// //       </div>

// //       <div className="chat-input">
// //         <input
// //           type="text"
// //           value={input}
// //           placeholder="Type your message..."
// //           onChange={(e) => setInput(e.target.value)}
// //           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
// //         />
// //         <button onClick={sendMessage}>➤</button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Chatbot;
// const chatWindow = document.getElementById("chat-window");
// const userInput = document.getElementById("user-input");
// const sendBtn = document.getElementById("send-btn");

// async function sendMessage() {
//   const message = userInput.value.trim();
//   if (!message) return;

//   // Show user message
//   const userMsg = document.createElement("p");
//   userMsg.textContent = "🧑: " + message;
//   chatWindow.appendChild(userMsg);

//   userInput.value = "";

//   // Add typing indicator
//   const typing = document.createElement("p");
//   typing.classList.add("typing");
//   typing.textContent = "🤖 is typing...";
//   chatWindow.appendChild(typing);
//   chatWindow.scrollTop = chatWindow.scrollHeight;

//   try {
//     // ✅ Call backend
//     const res = await fetch("/api/chat", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ message }),
//     });

//     const data = await res.json();
//     typing.remove();

//     // Show bot reply
//     const botMsg = document.createElement("p");
//     botMsg.textContent = "🤖: " + data.reply;
//     chatWindow.appendChild(botMsg);
//     chatWindow.scrollTop = chatWindow.scrollHeight;
//   } catch (err) {
//     typing.remove();
//     const botMsg = document.createElement("p");
//     botMsg.textContent = "⚠️ Error: Could not reach chatbot.";
//     chatWindow.appendChild(botMsg);
//   }
// }

// // ✅ Click & Enter events
// sendBtn.addEventListener("click", sendMessage);
// userInput.addEventListener("keypress", (e) => {
//   if (e.key === "Enter") {
//     e.preventDefault();
//     sendMessage();
//   }
// });


// Elements
const chatWindow = document.getElementById("chat-window");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const toggleBtn = document.getElementById("chatbot-toggle");
const chatbotWindow = document.getElementById("chatbot-window");

// Toggle open/close
toggleBtn.addEventListener("click", () => {
  chatbotWindow.classList.toggle("hidden");
  if (!chatbotWindow.classList.contains("hidden")) {
    userInput.focus();
  }
});

// Helpers
function addMessage(sender, text, italic = false) {
  const p = document.createElement("p");
  p.innerHTML = `<b>${sender}:</b> ${text}`;
  if (italic) p.style.fontStyle = "italic";
  chatWindow.appendChild(p);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function showTyping() {
  const t = document.createElement("p");
  t.id = "typing-indicator";
  t.textContent = "🤖 is typing...";
  t.style.fontStyle = "italic";
  chatWindow.appendChild(t);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}
function hideTyping() {
  const t = document.getElementById("typing-indicator");
  if (t) t.remove();
}

// Send logic
async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  addMessage("You", message);
  userInput.value = "";

  showTyping();
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    if (!res.ok) throw new Error(`Server returned ${res.status}`);
    const data = await res.json();
    hideTyping();
    addMessage("Bot", data.reply);
  } catch (err) {
    hideTyping();
    addMessage("Bot", "⚠️ Server error. Check console.");
    console.error(err);
  }
}

// Events
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});
