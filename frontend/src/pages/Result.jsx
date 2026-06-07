import { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { getValidation } from '../api';
import { ArrowLeft, TrendingUp, Swords, Cog, Rocket } from 'lucide-react';

function ScoreRing({ score }) {
  const color = score >= 8 ? '#43e97b' : score >= 6 ? '#6c63ff' : score >= 4 ? '#f7b731' : '#ff6584';
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: 100, height: 100, borderRadius: '50%',
        background: `conic-gradient(${color} ${score * 10}%, var(--surface2) 0)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 0.5rem',
        boxShadow: `0 0 30px ${color}40`
      }}>
        <div style={{
          width: 78, height: 78, borderRadius: '50%',
          background: 'var(--surface)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <span style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '1.5rem', color }}>{score}</span>
        </div>
      </div>
      <div style={{ fontSize: '0.75rem', color: 'var(--text3)' }}>/ 10</div>
    </div>
  );
}

function AgentCard({ icon, title, data, scoreKey }) {
  if (!data) return null;
  const score = data[scoreKey] || data.score;
  const color = score >= 8 ? '#43e97b' : score >= 6 ? '#6c63ff' : score >= 4 ? '#f7b731' : '#ff6584';

  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 16, padding: '1.5rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.5rem' }}>{icon}</span>
          <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '1rem' }}>{title}</h3>
        </div>
        <div style={{
          background: `${color}20`, color, border: `1px solid ${color}40`,
          borderRadius: 8, padding: '0.2rem 0.6rem',
          fontFamily: 'Syne', fontWeight: 800, fontSize: '1rem'
        }}>{score}/10</div>
      </div>

      {data.summary && (
        <p style={{ color: 'var(--text2)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>
          {data.summary}
        </p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {Object.entries(data).filter(([k]) => !['score', 'summary', scoreKey].includes(k)).map(([key, val]) => (
          <div key={key}>
            <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>
              {key.replace(/_/g, ' ')}
            </div>
            {Array.isArray(val) ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {val.map((v, i) => (
                  <span key={i} style={{
                    background: 'var(--bg2)', border: '1px solid var(--border)',
                    borderRadius: 6, padding: '0.25rem 0.6rem',
                    fontSize: '0.8rem', color: 'var(--text2)'
                  }}>{v}</span>
                ))}
              </div>
            ) : (
              <div style={{ fontSize: '0.9rem', color: 'var(--text)' }}>{val}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Result() {
  const { id } = useParams();
  const { state } = useLocation();
  const [data, setData] = useState(state || null);
  const [loading, setLoading] = useState(!state);

  useEffect(() => {
    if (!state) {
      getValidation(id).then(r => setData(r.data)).catch(() => setLoading(false)).finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return (
    <div style={{ paddingTop: 64, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: 'var(--text2)' }}>Loading results...</div>
    </div>
  );

  if (!data) return (
    <div style={{ paddingTop: 64, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: 'var(--text2)', marginBottom: '1rem' }}>Result not found.</p>
        <Link to="/validate" style={{ color: 'var(--accent)' }}>← Validate a new idea</Link>
      </div>
    </div>
  );

  const overall = data.overall_score || data.overallScore;
  const verdict = data.verdict;
  const market = data.market_research || data.marketResearch;
  const competition = data.competition;
  const feasibility = data.feasibility;
  const strategy = data.strategy;

  return (
    <main style={{ paddingTop: 64, minHeight: '100vh', padding: '80px 2rem 4rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <Link to="/validate" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          color: 'var(--text2)', textDecoration: 'none', fontSize: '0.9rem',
          marginBottom: '2rem'
        }}>
          <ArrowLeft size={16} /> Validate another idea
        </Link>

        {/* Header */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 20, padding: '2rem', marginBottom: '2rem',
          display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap'
        }}>
          <ScoreRing score={overall} />
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text3)', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>VALIDATION RESULT</div>
            <h1 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', marginBottom: '0.75rem' }}>
              {verdict}
            </h1>
            <p style={{ color: 'var(--text2)', fontSize: '0.95rem', lineHeight: 1.6, fontStyle: 'italic' }}>
              "{data.idea}"
            </p>
          </div>

          {/* Score breakdown */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {[
              { label: 'Market', score: market?.score },
              { label: 'Competition', score: competition?.score },
              { label: 'Feasibility', score: feasibility?.score },
              { label: 'Strategy', score: strategy?.score },
            ].map(({ label, score }) => {
              const c = score >= 8 ? '#43e97b' : score >= 6 ? '#6c63ff' : score >= 4 ? '#f7b731' : '#ff6584';
              return (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '1.3rem', color: c }}>{score}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text3)' }}>{label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Agent Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '1.5rem' }}>
          <AgentCard icon="🔍" title="Market Research" data={market} scoreKey="score" />
          <AgentCard icon="⚔️" title="Competition Analysis" data={competition} scoreKey="score" />
          <AgentCard icon="⚙️" title="Feasibility Analysis" data={feasibility} scoreKey="score" />
          <AgentCard icon="🚀" title="Go-to-Market Strategy" data={strategy} scoreKey="score" />
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/validate" style={{
            padding: '0.9rem 2rem', borderRadius: 12,
            background: 'linear-gradient(135deg, var(--accent), #8b5cf6)',
            color: 'white', textDecoration: 'none', fontWeight: 700
          }}>Validate Another Idea →</Link>
        </div>
      </div>
    </main>
  );
}
