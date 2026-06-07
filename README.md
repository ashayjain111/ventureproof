# VentureProof 🚀

An AI-powered startup idea validator using a **swarm of 4 specialized AI agents** running in parallel. Built with React + Node/Express + PostgreSQL (Supabase) + Groq (Llama 3.3 70B).

## Features

- 🔍 **Market Research Agent** — TAM/SAM/SOM, growth trends, target audience
- ⚔️ **Competition Agent** — competitor mapping, gaps, differentiation opportunities
- ⚙️ **Feasibility Agent** — technical complexity, MVP cost & timeline
- 🚀 **Strategy Agent** — GTM strategy, revenue streams, milestones
- 📊 **Overall Score** — weighted 1-10 scorecard with verdict
- 🗃️ **History** — all past validations saved to Supabase

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React + Vite + React Router |
| Backend | Node.js + Express |
| AI | Groq API (Llama 3.3 70B) |
| Database | PostgreSQL via Supabase |
| Deployment | Vercel |

## Project Structure

```
ventureproof/
├── backend/          # Express API + Agent Swarm
│   ├── server.js     # 4 AI agents + REST API
│   ├── vercel.json
│   └── package.json
└── frontend/         # React SPA
    ├── src/
    │   ├── pages/    # Landing, Validator, Result, History
    │   ├── components/  # Navbar
    │   └── api/      # Axios client
    └── vercel.json
```

## Local Development

### Backend
```bash
cd backend
npm install
# Create .env with:
# GROQ_API_KEY=your_groq_key
# DATABASE_URL=your_supabase_postgres_url
# PORT=5000
node server.js
```

### Frontend
```bash
cd frontend
npm install
# Create .env.local with:
# VITE_API_URL=http://localhost:5000
npm run dev
```

## Deployment (Vercel)

### Deploy Backend
1. `cd backend` → connect to Vercel
2. Add env vars in Vercel dashboard:
   - `GROQ_API_KEY`
   - `DATABASE_URL`

### Deploy Frontend
1. `cd frontend` → connect to Vercel
2. Add env var:
   - `VITE_API_URL=https://your-backend.vercel.app`

## License

MIT — Built by Ashay Jain
