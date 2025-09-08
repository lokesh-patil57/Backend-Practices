const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" }); // Use the correct model name

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ reply: "❌ No message provided!" });
    }

    const result = await model.generateContent(message);

    // Safely extract reply
    let reply = "";
    if (result?.response && typeof result.response.text === "function") {
      reply = result.response.text();
    } else {
      reply =
        result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "⚠️ No reply from model.";
    }

    res.json({ reply });
  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({ reply: "❌ Something went wrong with Gemini." });
  }
});

module.exports = router;
