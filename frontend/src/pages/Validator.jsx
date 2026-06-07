import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateIdea } from '../api';
import { Zap, Loader, Brain } from 'lucide-react';

const agentSteps = [
  { icon: '🔍', name: 'Market Research Agent', status: 'Analyzing market size & trends...' },
  { icon: '⚔️', name: 'Competition Agent', status: 'Mapping competitive landscape...' },
  { icon: '⚙️', name: 'Feasibility Agent', status: 'Evaluating technical feasibility...' },
  { icon: '🚀', name: 'Strategy Agent', status: 'Crafting go-to-market strategy...' },
];

export default function Validator() {
  const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeAgents, setActiveAgents] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (idea.trim().length < 10) {
      setError('Please describe your idea in at least 10 characters.');
      return;
    }
    setError('');
    setLoading(true);

    // Simulate agents activating one by one
    for (let i = 0; i < agentSteps.length; i++) {
      await new Promise(r => setTimeout(r, 400));
      setActiveAgents(prev => [...prev, i]);
    }

    try {
      const res = await validateIdea(idea.trim());
      navigate(`/result/${res.data.id}`, { state: res.data });
    } catch (err) {
      setError(err.response?.data?.error || 'Validation failed. Please try again.');
      setLoading(false);
      setActiveAgents([]);
    }
  };

  return (
    <main style={{ paddingTop: 64, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 2rem 2rem' }}>
      <div style={{ width: '100%', maxWidth: 680 }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', marginBottom: '0.75rem' }}>
            Validate Your Startup Idea
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: '1rem' }}>
            Describe your idea below — be as specific as possible for best results
          </p>
        </div>

        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 20, padding: '2rem', marginBottom: '1.5rem'
        }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text2)', marginBottom: '0.75rem', display: 'block' }}>
            YOUR STARTUP IDEA
          </label>
          <textarea
            value={idea}
            onChange={e => setIdea(e.target.value)}
            disabled={loading}
            placeholder="e.g. An AI-powered platform that helps indie developers find beta testers for their apps, with automated feedback collection and analytics dashboard..."
            style={{
              width: '100%', minHeight: 160,
              background: 'var(--bg2)', border: '1px solid var(--border)',
              borderRadius: 12, padding: '1rem', color: 'var(--text)',
              fontSize: '0.95rem', lineHeight: 1.6, resize: 'vertical',
              outline: 'none', fontFamily: 'DM Sans',
              transition: 'border-color 0.2s'
            }}
            onFocus={e => e.target.style.borderColor = 'var(--accent)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: idea.length < 10 ? 'var(--accent2)' : 'var(--text3)' }}>
              {idea.length} chars {idea.length < 10 ? `(${10 - idea.length} more needed)` : '✓'}
            </span>
          </div>
        </div>

        {error && (
          <div style={{
            background: 'rgba(255,101,132,0.1)', border: '1px solid rgba(255,101,132,0.3)',
            borderRadius: 12, padding: '0.75rem 1rem', color: 'var(--accent2)',
            fontSize: '0.9rem', marginBottom: '1rem'
          }}>{error}</div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading || idea.trim().length < 10}
          style={{
            width: '100%', padding: '1rem',
            borderRadius: 12, border: 'none',
            background: loading || idea.trim().length < 10
              ? 'var(--surface2)'
              : 'linear-gradient(135deg, var(--accent), #8b5cf6)',
            color: loading || idea.trim().length < 10 ? 'var(--text3)' : 'white',
            fontWeight: 700, fontSize: '1rem',
            cursor: loading || idea.trim().length < 10 ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            transition: 'all 0.2s',
            boxShadow: loading || idea.trim().length < 10 ? 'none' : '0 0 30px rgba(108,99,255,0.3)'
          }}
        >
          {loading ? <><Loader size={18} style={{ animation: 'spin 1s linear infinite' }} /> Running Agent Swarm...</> : <><Zap size={18} /> Validate with AI Agents</>}
        </button>

        {/* Agent Activity */}
        {loading && (
          <div style={{
            marginTop: '1.5rem', background: 'var(--surface)',
            border: '1px solid var(--border)', borderRadius: 16, padding: '1.5rem'
          }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text3)', marginBottom: '1rem', letterSpacing: '0.1em' }}>
              AGENT SWARM ACTIVE
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {agentSteps.map((agent, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  opacity: activeAgents.includes(i) ? 1 : 0.3,
                  transition: 'opacity 0.4s'
                }}>
                  <span style={{ fontSize: '1.2rem' }}>{agent.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{agent.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text3)' }}>{agent.status}</div>
                  </div>
                  {activeAgents.includes(i) && (
                    <Loader size={14} style={{ color: 'var(--accent)', animation: 'spin 1s linear infinite' }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Example ideas */}
        {!loading && (
          <div style={{ marginTop: '1.5rem' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text3)', marginBottom: '0.75rem', textAlign: 'center' }}>Try an example:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
              {[
                'AI-powered SaaS for automating customer support for small businesses',
                'Marketplace connecting freelance designers with early-stage startups',
                'Mobile app for tracking and reducing personal carbon footprint'
              ].map((ex, i) => (
                <button key={i} onClick={() => setIdea(ex)} style={{
                  padding: '0.4rem 0.8rem', borderRadius: 8,
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  color: 'var(--text2)', fontSize: '0.78rem', cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                  onMouseEnter={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.color = 'var(--text)'; }}
                  onMouseLeave={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--text2)'; }}
                >
                  {ex.substring(0, 40)}...
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </main>
  );
}
