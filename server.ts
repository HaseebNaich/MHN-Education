import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API Health Check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Helper to lazy-get Gemini client safely
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// AI API Endpoints

// 1. AI Tutor / Ask Anything Endpoint
app.post("/api/ai/tutor", async (req, res) => {
  try {
    const { prompt, context, level, subject } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        text: `[MHN AI Tutor Mode]: You asked: "${prompt}". \n\nHere is a structured explanation:\n1. **Core Concept**: ${subject || 'Topic'} plays a crucial role in academic and practical domain.\n2. **Detailed Breakdown**: Deeply analyzing ${prompt} reveals key fundamental principles.\n3. **Example**: Consider a real-world scenario where this concept is applied to optimize solutions.\n\n*(Note: Set your GEMINI_API_KEY in Secrets for live AI generated responses)*`,
        source: "fallback",
      });
    }

    const systemInstruction = `You are MHN AI Tutor, an elite, patient, world-class professor and educational expert.
Level: ${level || "University / General"}. Subject: ${subject || "General Education"}.
Provide clear, structured explanations with key concepts, examples, formulas/code if relevant, and quick practice questions. Format in clean markdown.`;

    const fullPrompt = context ? `Context: ${context}\n\nStudent Question: ${prompt}` : prompt;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: fullPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({
      text: response.text || "No response generated.",
      source: "gemini",
    });
  } catch (error: any) {
    console.error("AI Tutor Error:", error);
    res.status(500).json({ error: error?.message || "Failed to query AI Tutor" });
  }
});

// 2. AI Quiz Generator Endpoint
app.post("/api/ai/quiz", async (req, res) => {
  try {
    const { topic, difficulty, questionCount = 5 } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        quizzes: [
          {
            id: 1,
            question: `What is the primary function of ${topic}?`,
            options: ["Data abstraction and processing", "Hardware compilation only", "Storage overhead", "None of the above"],
            correctAnswer: 0,
            explanation: `${topic} focuses on data processing, abstraction, and modular structure.`
          },
          {
            id: 2,
            question: `Which of the following best applies to ${topic}?`,
            options: ["Linear complexity", "Optimal structural efficiency", "Random behavior", "Deprecated syntax"],
            correctAnswer: 1,
            explanation: `Efficiency and structural clarity are fundamental to ${topic}.`
          }
        ]
      });
    }

    const prompt = `Generate an educational quiz on the topic "${topic}" with difficulty "${difficulty}".
Create ${questionCount} multiple choice questions. Format output as JSON array of objects with keys: "id", "question", "options" (array of 4 strings), "correctAnswer" (0-based index), and "explanation".`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "[]");
    res.json({ quizzes: parsed });
  } catch (error: any) {
    console.error("AI Quiz Error:", error);
    res.status(500).json({ error: error?.message || "Quiz generation failed" });
  }
});

// 3. AI Code Explainer & Bug Fixer
app.post("/api/ai/code-helper", async (req, res) => {
  try {
    const { code, language, mode } = req.body; // mode: 'explain' | 'fix' | 'optimize'
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        analysis: `[MHN AI Code Helper]: Analyzed your ${language} code (${mode} mode):\n\n\`\`\`${language}\n${code}\n\`\`\`\n\n- **Syntax**: Valid structural logic.\n- **Recommendation**: Ensure standard variable naming conventions and error handling boundaries.\n\n*(Connect GEMINI_API_KEY in Secrets for live deep code analysis)*`
      });
    }

    const prompt = mode === 'fix' 
      ? `Find bugs in this ${language} code, fix them, and explain the fix:\n\`\`\`${language}\n${code}\n\`\`\``
      : `Provide a detailed line-by-line explanation and complexity analysis for this ${language} code:\n\`\`\`${language}\n${code}\n\`\`\``;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    res.json({ analysis: response.text });
  } catch (error: any) {
    console.error("AI Code Helper Error:", error);
    res.status(500).json({ error: error?.message || "Code helper failed" });
  }
});

// 4. AI Study Planner Endpoint
app.post("/api/ai/planner", async (req, res) => {
  try {
    const { goal, availableHours, examDate, weakAreas } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        plan: `### 📅 MHN AI 7-Day Study Plan for ${goal}\n- **Daily Goal**: ${availableHours} Hours/Day\n- **Focus Areas**: ${weakAreas || 'Core Subjects'}\n\n- **Day 1**: Deep dive into core fundamentals & definitions.\n- **Day 2**: Practice solved numericals & code exercises.\n- **Day 3**: Review weak areas (${weakAreas || 'Key Topics'}).\n- **Day 4-5**: Comprehensive practice quizzes and flashcard revisions.\n- **Day 6-7**: Mock examination and exam-time strategy session.`
      });
    }

    const prompt = `Create a customized daily study plan for a student with target goal "${goal}", preparing for exam on "${examDate}", studying ${availableHours} hours per day, focusing on weak topics: "${weakAreas}". Return organized markdown study schedule with daily milestones and revision tactics.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    res.json({ plan: response.text });
  } catch (error: any) {
    console.error("AI Planner Error:", error);
    res.status(500).json({ error: error?.message || "Study planner failed" });
  }
});

// Vite Middleware & Static Serving setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`MHN Education Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
