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
      model: "gemini-3.8-flash",
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

// 2. Multi-turn Educational Chatbot Endpoint (Maintains conversation history)
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { messages, systemPrompt, academicContext } = req.body;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Messages array is required for multi-turn chat" });
    }

    const ai = getGeminiClient();

    if (!ai) {
      const lastUserMsg = [...messages].reverse().find((m: any) => m.role === 'user')?.content || "Hello";
      return res.json({
        text: `[MHN Scholar AI Tutor]: I understand you are asking about: **"${lastUserMsg}"**.\n\nHere is a structured explanation:\n- **Overview**: This concept is fundamental in your academic curriculum.\n- **Deep Dive**: In real-world software engineering and academic research, this is analyzed through theoretical proofs and practical implementations.\n- **Follow-up question**: Would you like a step-by-step mathematical derivation, code example in Python/C++, or practice quiz questions on this?\n\n*(Note: Set your GEMINI_API_KEY in Secrets for live AI generation)*`,
        source: "fallback",
        role: "model"
      });
    }

    const systemInstruction = systemPrompt || `You are MHN Education Scholar AI, an elite university professor, tutor, and educational guide.
Maintain contextual memory across all turns of the conversation.
${academicContext ? `Current Academic Context: ${academicContext}\n` : ""}
Provide thorough, structured, pedagogical answers with step-by-step proofs, formulas, code, and conceptual breakdowns in clean Markdown. Answer follow-up questions clearly in the context of preceding dialogue.`;

    const contents = messages.map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: String(m.content || "") }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({
      text: response.text || "No response generated.",
      role: "model",
      source: "gemini",
    });
  } catch (error: any) {
    console.error("AI Multi-turn Chat Error:", error);
    res.status(500).json({ error: error?.message || "Failed in multi-turn chat" });
  }
});

// 3. Google Maps Grounding: Academic Study Hubs, Research Libraries & University Campus Finder
app.post("/api/ai/academic-places", async (req, res) => {
  try {
    const { query, latitude, longitude } = req.body;
    const ai = getGeminiClient();

    const locationQuery = query || "University research libraries, academic study centers, and national book archives";

    if (!ai) {
      // Fallback with real Google Maps search links
      return res.json({
        text: `### 🏛️ University Libraries & Academic Study Centers\nHere are premier academic libraries and study hubs for scholars and students researching near ${locationQuery}:\n\n1. **National & University Library Central Archive**: Quiet study desks, open research databases, and academic journal stacks.\n2. **University Science & Computing Reading Hall**: Equipped with Wi-Fi, high-speed academic research terminals, and quiet study carrels.\n3. **Public Academic & Tech Library**: Free community access to reference books, technical documentation, and seminar rooms.\n\n*(Connect GEMINI_API_KEY in Secrets to enable live Google Maps Grounding place retrieval)*`,
        places: [
          {
            title: "Harvard Widener & Lamont Academic Libraries",
            uri: "https://www.google.com/maps/search/Harvard+University+Widener+Library",
            snippet: "Flagship academic research library with 3.5+ million volumes, study halls, and research carrels."
          },
          {
            title: "MIT Barker & Hayden Engineering Libraries",
            uri: "https://www.google.com/maps/search/MIT+Barker+Engineering+Library",
            snippet: "Quiet academic study space with engineering archives, collaboration zones, and computing labs."
          },
          {
            title: "Stanford Green Library & Tech Center",
            uri: "https://www.google.com/maps/search/Stanford+University+Green+Library",
            snippet: "Major humanities and social sciences library with digital research centers and group study spaces."
          },
          {
            title: "British Library & Academic Reading Rooms",
            uri: "https://www.google.com/maps/search/British+Library+London",
            snippet: "The national library of the United Kingdom with millions of cataloged open research manuscripts."
          }
        ],
        source: "fallback"
      });
    }

    const contents = `Find top university libraries, research institutes, academic study centers, and book archives for students and researchers in or near: ${locationQuery}.
Provide an informative summary of study facilities, quiet reading zones, access rules, and academic resources available.`;

    const toolConfig: any = {};
    if (latitude && longitude && !isNaN(Number(latitude)) && !isNaN(Number(longitude))) {
      toolConfig.retrievalConfig = {
        latLng: {
          latitude: Number(latitude),
          longitude: Number(longitude),
        },
      };
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: Object.keys(toolConfig).length > 0 ? toolConfig : undefined,
      },
    });

    // Extract Google Maps URLs and review snippets from groundingChunks as mandated
    const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
    const groundingChunks = (groundingMetadata as any)?.groundingChunks || [];
    const places: Array<{ title: string; uri: string; snippet?: string }> = [];

    for (const chunk of groundingChunks) {
      if (chunk.maps) {
        const uri = chunk.maps.uri || "";
        const title = chunk.maps.title || "Academic Location on Google Maps";
        let snippet = "";
        if (chunk.maps.placeAnswerSources?.reviewSnippets && chunk.maps.placeAnswerSources.reviewSnippets.length > 0) {
          snippet = chunk.maps.placeAnswerSources.reviewSnippets[0];
        }
        if (uri) {
          places.push({ title, uri, snippet });
        }
      }
    }

    res.json({
      text: response.text || "No location details generated.",
      places,
      groundingMetadata,
      source: "gemini-maps-grounding",
    });
  } catch (error: any) {
    console.error("Academic Places / Maps Grounding Error:", error);
    res.status(500).json({ error: error?.message || "Failed to search academic places" });
  }
});

// 4. AI Scholar Research Paper & Course Deep Dive
app.post("/api/ai/scholar-summary", async (req, res) => {
  try {
    const { title, authors, subject, detailType } = req.body; // detailType: 'paper' | 'course'
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        summary: `### 🎓 Scholar Deep Dive: ${title}\n- **Field**: ${subject || 'Academic Research'}\n- **Author(s)**: ${authors || 'Research Team'}\n\n#### Core Theoretical Concepts\nThis work established foundational principles still studied across university curricula today.\n\n#### Key Equations & Proof Intuition\n\`\`\`\nObjective Function = Minimize Loss + Regularization Penalty\n\`\`\`\n\n#### Real-World Impact\nHeavily cited in Google Scholar, applied in production industry architectures worldwide.\n\n*(Set GEMINI_API_KEY in Secrets for live AI research monograph generation)*`
      });
    }

    const prompt = `Provide an authoritative, graduate-level academic study breakdown of: "${title}" by ${authors} (${subject}).
Detail Type: ${detailType || 'Research Paper'}.
Cover:
1. Executive Abstract & Motivation
2. Core Mathematical Equations or Algorithmic Framework
3. Step-by-Step Proof or Architecture Logic
4. Historical Impact & Google Scholar Citation Significance
5. 3 Common Exam / Defense Questions and Model Answers.
Format in clean, structured Markdown.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
    });

    res.json({ summary: response.text });
  } catch (error: any) {
    console.error("AI Scholar Summary Error:", error);
    res.status(500).json({ error: error?.message || "Failed to generate scholar summary" });
  }
});

// 5. AI Quiz Generator Endpoint
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
      model: "gemini-3.8-flash",
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

// 6. AI Code Explainer & Bug Fixer
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
      model: "gemini-3.8-flash",
      contents: prompt,
    });

    res.json({ analysis: response.text });
  } catch (error: any) {
    console.error("AI Code Helper Error:", error);
    res.status(500).json({ error: error?.message || "Code helper failed" });
  }
});

// 7. AI Study Planner Endpoint
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
      model: "gemini-3.8-flash",
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
