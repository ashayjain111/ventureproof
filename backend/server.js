const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const Groq = require("groq-sdk");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// ─── DB INIT ────────────────────────────────────────────────────────────────
async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS validations (
      id UUID PRIMARY KEY,
      idea TEXT NOT NULL,
      market_research JSONB,
      competition JSONB,
      feasibility JSONB,
      strategy JSONB,
      overall_score INTEGER,
      verdict TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);
  console.log("✅ DB ready");
}

// ─── AGENT DEFINITIONS ──────────────────────────────────────────────────────
async function runAgent(agentName, systemPrompt, userPrompt) {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.7,
    max_tokens: 1024,
    response_format: { type: "json_object" },
  });
  try {
    return JSON.parse(completion.choices[0].message.content);
  } catch {
    return { error: "Parse failed", raw: completion.choices[0].message.content };
  }
}

// Agent 1: Market Research
async function marketResearchAgent(idea) {
  return runAgent(
    "MarketResearch",
    `You are an expert market research analyst specializing in startup ecosystems. 
     Analyze startup ideas and return ONLY valid JSON with this exact structure:
     {
       "market_size": "string (e.g. $50B TAM)",
       "growth_rate": "string (e.g. 23% YoY)",
       "target_audience": "string",
       "key_trends": ["trend1", "trend2", "trend3"],
       "score": number (1-10),
       "summary": "2-3 sentence analysis"
     }`,
    `Analyze the market for this startup idea: "${idea}"`
  );
}

// Agent 2: Competition Analysis
async function competitionAgent(idea) {
  return runAgent(
    "Competition",
    `You are a competitive intelligence expert. Analyze competition for startup ideas.
     Return ONLY valid JSON with this exact structure:
     {
       "direct_competitors": ["competitor1", "competitor2", "competitor3"],
       "indirect_competitors": ["competitor1", "competitor2"],
       "market_gaps": ["gap1", "gap2", "gap3"],
       "differentiation_opportunities": ["opp1", "opp2"],
       "score": number (1-10, higher = less competition = better),
       "summary": "2-3 sentence analysis"
     }`,
    `Analyze the competition landscape for this startup idea: "${idea}"`
  );
}

// Agent 3: Feasibility Analysis
async function feasibilityAgent(idea) {
  return runAgent(
    "Feasibility",
    `You are a startup technical and financial feasibility expert.
     Return ONLY valid JSON with this exact structure:
     {
       "technical_complexity": "Low | Medium | High",
       "estimated_mvp_time": "string (e.g. 3-6 months)",
       "estimated_mvp_cost": "string (e.g. $10k-$30k)",
       "required_skills": ["skill1", "skill2", "skill3"],
       "risks": ["risk1", "risk2", "risk3"],
       "score": number (1-10),
       "summary": "2-3 sentence analysis"
     }`,
    `Analyze the feasibility of this startup idea: "${idea}"`
  );
}

// Agent 4: Strategy & GTM
async function strategyAgent(idea) {
  return runAgent(
    "Strategy",
    `You are a startup go-to-market strategist and growth expert.
     Return ONLY valid JSON with this exact structure:
     {
       "business_model": "string",
       "revenue_streams": ["stream1", "stream2"],
       "gtm_strategy": ["step1", "step2", "step3"],
       "marketing_channels": ["channel1", "channel2", "channel3"],
       "milestones": ["0-3 months: ...", "3-6 months: ...", "6-12 months: ..."],
       "score": number (1-10),
       "summary": "2-3 sentence analysis"
     }`,
    `Create a go-to-market strategy for this startup idea: "${idea}"`
  );
}

// ─── ROUTES ─────────────────────────────────────────────────────────────────

// Validate a startup idea using agent swarm
app.post("/api/validate", async (req, res) => {
  const { idea } = req.body;
  if (!idea || idea.trim().length < 10) {
    return res.status(400).json({ error: "Please provide a detailed startup idea (min 10 chars)" });
  }

  try {
    console.log(`🚀 Running agent swarm for: "${idea}"`);

    // Run all 4 agents in parallel
    const [marketResearch, competition, feasibility, strategy] = await Promise.all([
      marketResearchAgent(idea),
      competitionAgent(idea),
      feasibilityAgent(idea),
      strategyAgent(idea),
    ]);

    console.log("✅ All agents completed");

    // Calculate overall score
    const scores = [
      marketResearch.score || 5,
      competition.score || 5,
      feasibility.score || 5,
      strategy.score || 5,
    ];
    const overallScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

    let verdict;
    if (overallScore >= 8) verdict = "🚀 Strong Idea — Go Build It!";
    else if (overallScore >= 6) verdict = "✅ Promising — Needs Refinement";
    else if (overallScore >= 4) verdict = "⚠️ Risky — Major Pivots Needed";
    else verdict = "❌ High Risk — Reconsider";

    const id = uuidv4();
    await pool.query(
      `INSERT INTO validations (id, idea, market_research, competition, feasibility, strategy, overall_score, verdict)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [id, idea, marketResearch, competition, feasibility, strategy, overallScore, verdict]
    );

    res.json({ id, idea, marketResearch, competition, feasibility, strategy, overallScore, verdict });
  } catch (err) {
    console.error("Agent swarm error:", err);
    res.status(500).json({ error: "Agent swarm failed", details: err.message });
  }
});

// Get all past validations
app.get("/api/history", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, idea, overall_score, verdict, created_at FROM validations ORDER BY created_at DESC LIMIT 20"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single validation
app.get("/api/validation/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM validations WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/health", (_, res) => res.json({ status: "ok", agents: 4 }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await initDB();
  console.log(`🚀 Server running on port ${PORT}`);
});
