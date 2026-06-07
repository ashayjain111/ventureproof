import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getHistory } from '../api';
import { Clock, ArrowRight, Zap } from 'lucide-react';

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHistory()
      .then(r => setHistory(r.data))
      .catch(() => setHistory([]))
      .finally(() => setLoading(false));
  }, []);

  const getColor = (score) => score >= 8 ? '#43e97b' : score >= 6 ? '#6c63ff' : score >= 4 ? '#f7b731' : '#ff6584';

  return (
    <main style={{ paddingTop: 64, minHeight: '100vh', padding: '80px 2rem 4rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '2rem', marginBottom: '0.25rem' }}>Validation History</h1>
            <p style={{ color: 'var(--text2)', fontSize: '0.9rem' }}>Recent startup ideas validated by the agent swarm</p>
          </div>
          <Link to="/validate" style={{
            padding: '0.6rem 1.2rem', borderRadius: 10,
            background: 'linear-gradient(135deg, var(--accent), #8b5cf6)',
            color: 'white', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem',
            display: 'flex', alignItems: 'center', gap: '0.4rem'
          }}>
            <Zap size={14} /> New Validation
          </Link>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text2)' }}>Loading history...</div>
        ) : history.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '4rem',
            background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16
          }}>
            <Clock size={48} style={{ color: 'var(--text3)', marginBottom: '1rem' }} />
            <h3 style={{ fontFamily: 'Syne', fontWeight: 700, marginBottom: '0.5rem' }}>No validations yet</h3>
            <p style={{ color: 'var(--text2)', marginBottom: '1.5rem' }}>Validate your first startup idea to see it here</p>
            <Link to="/validate" style={{
              color: 'var(--accent)', textDecoration: 'none', fontWeight: 600
            }}>Start validating →</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {history.map((item) => {
              const color = getColor(item.overall_score);
              return (
                <Link key={item.id} to={`/result/${item.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    borderRadius: 16, padding: '1.25rem 1.5rem',
                    display: 'flex', alignItems: 'center', gap: '1.5rem',
                    transition: 'all 0.2s', cursor: 'pointer'
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateX(0)'; }}
                  >
                    <div style={{
                      minWidth: 56, height: 56, borderRadius: 12,
                      background: `${color}15`, border: `2px solid ${color}40`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'Syne', fontWeight: 800, fontSize: '1.2rem', color
                    }}>
                      {item.overall_score}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 500, marginBottom: '0.3rem', color: 'var(--text)', fontSize: '0.95rem' }}>
                        {item.idea.length > 80 ? item.idea.substring(0, 80) + '...' : item.idea}
                      </div>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.8rem', color, fontWeight: 600 }}>{item.verdict}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text3)' }}>
                          {new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                    <ArrowRight size={18} style={{ color: 'var(--text3)' }} />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
