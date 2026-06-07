import { Link } from 'react-router-dom';
import { Zap, Brain, TrendingUp, Shield, ArrowRight, CheckCircle } from 'lucide-react';

const agents = [
  { icon: '🔍', name: 'Market Research Agent', desc: 'Analyzes TAM/SAM/SOM, growth trends, and target audience' },
  { icon: '⚔️', name: 'Competition Agent', desc: 'Maps competitors, identifies gaps and differentiation opportunities' },
  { icon: '⚙️', name: 'Feasibility Agent', desc: 'Evaluates technical complexity, cost, and timeline estimates' },
  { icon: '🚀', name: 'Strategy Agent', desc: 'Crafts GTM strategy, revenue streams, and growth milestones' },
];

export default function Landing() {
  return (
    <main style={{ paddingTop: 64 }}>
      {/* Hero */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '4rem 2rem',
        position: 'relative', overflow: 'hidden'
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute', width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(108,99,255,0.15) 0%, transparent 70%)',
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          pointerEvents: 'none'
        }} />

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 100, padding: '0.4rem 1rem',
          fontSize: '0.8rem', color: 'var(--accent)',
          marginBottom: '2rem', fontWeight: 600
        }}>
          <Zap size={14} /> 4 AI Agents • Parallel Analysis • Instant Results
        </div>

        <h1 style={{
          fontFamily: 'Syne', fontWeight: 800,
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          lineHeight: 1.1, marginBottom: '1.5rem',
          maxWidth: 800
        }}>
          Validate Your Startup Idea{' '}
          <span style={{
            background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>Before You Build</span>
        </h1>

        <p style={{
          fontSize: '1.15rem', color: 'var(--text2)',
          maxWidth: 560, lineHeight: 1.7, marginBottom: '2.5rem'
        }}>
          A swarm of 4 specialized AI agents dissects your idea from every angle —
          market, competition, feasibility, and strategy — in under 30 seconds.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/validate" style={{
            padding: '0.9rem 2rem', borderRadius: 12,
            background: 'linear-gradient(135deg, var(--accent), #8b5cf6)',
            color: 'white', textDecoration: 'none',
            fontWeight: 700, fontSize: '1rem',
            boxShadow: '0 0 40px rgba(108,99,255,0.4)',
            display: 'flex', alignItems: 'center', gap: '0.5rem'
          }}>
            Validate My Idea <ArrowRight size={18} />
          </Link>
          <Link to="/history" style={{
            padding: '0.9rem 2rem', borderRadius: 12,
            border: '1px solid var(--border)',
            color: 'var(--text)', textDecoration: 'none',
            fontWeight: 600, fontSize: '1rem',
            background: 'var(--surface)'
          }}>
            View Examples
          </Link>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex', gap: '3rem', marginTop: '4rem',
          borderTop: '1px solid var(--border)', paddingTop: '2rem'
        }}>
          {[['4', 'AI Agents'], ['~20s', 'Analysis Time'], ['100%', 'Free']].map(([val, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '1.8rem', color: 'var(--accent)' }}>{val}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text3)' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Agents Section */}
      <section style={{ padding: '5rem 2rem', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', marginBottom: '1rem' }}>
            Meet Your Agent Swarm
          </h2>
          <p style={{ color: 'var(--text2)', fontSize: '1rem', maxWidth: 500, margin: '0 auto' }}>
            Four specialized AI agents run in parallel, each an expert in their domain
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {agents.map((agent, i) => (
            <div key={i} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 16, padding: '1.5rem',
              transition: 'all 0.3s',
              cursor: 'default'
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.boxShadow = '0 0 30px var(--glow)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{agent.icon}</div>
              <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>{agent.name}</h3>
              <p style={{ color: 'var(--text2)', fontSize: '0.875rem', lineHeight: 1.6 }}>{agent.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{
        padding: '5rem 2rem', background: 'var(--bg2)',
        borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)'
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', marginBottom: '3rem' }}>
            How It Works
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'left' }}>
            {[
              { step: '01', title: 'Describe your idea', desc: 'Write a brief description of your startup concept — the problem, solution, and target market.' },
              { step: '02', title: 'Agents analyze in parallel', desc: 'All 4 agents fire simultaneously: market research, competition, feasibility, and strategy.' },
              { step: '03', title: 'Get your full report', desc: 'Receive a comprehensive scorecard with detailed insights and an actionable improvement plan.' },
            ].map(({ step, title, desc }) => (
              <div key={step} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{
                  minWidth: 48, height: 48, background: 'var(--surface)',
                  border: '1px solid var(--border)', borderRadius: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Syne', fontWeight: 800, color: 'var(--accent)', fontSize: '0.8rem'
                }}>{step}</div>
                <div>
                  <h3 style={{ fontFamily: 'Syne', fontWeight: 700, marginBottom: '0.4rem' }}>{title}</h3>
                  <p style={{ color: 'var(--text2)', fontSize: '0.9rem', lineHeight: 1.6 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '5rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', marginBottom: '1rem' }}>
          Ready to Proof Your Venture?
        </h2>
        <p style={{ color: 'var(--text2)', marginBottom: '2rem' }}>Free. No signup. Results in seconds.</p>
        <Link to="/validate" style={{
          padding: '1rem 2.5rem', borderRadius: 12,
          background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
          color: 'white', textDecoration: 'none',
          fontWeight: 700, fontSize: '1.1rem',
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          boxShadow: '0 0 50px rgba(108,99,255,0.4)'
        }}>
          Start Validating <ArrowRight size={20} />
        </Link>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border)', padding: '2rem',
        textAlign: 'center', color: 'var(--text3)', fontSize: '0.85rem'
      }}>
        Built with ❤️ by Ashay • Powered by Groq + Llama 3.3 70B
      </footer>
    </main>
  );
}
