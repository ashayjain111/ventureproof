import { Link, useLocation } from 'react-router-dom';
import { Zap } from 'lucide-react';

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(8,8,16,0.8)', backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)',
      padding: '0 2rem', height: '64px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between'
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
        <div style={{
          width: 32, height: 32, background: 'var(--accent)',
          borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Zap size={18} color="white" fill="white" />
        </div>
        <span style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '1.1rem', color: 'var(--text)' }}>
          VentureProof
        </span>
      </Link>

      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        {[
          { to: '/validate', label: 'Validate' },
          { to: '/history', label: 'History' },
        ].map(({ to, label }) => (
          <Link key={to} to={to} style={{
            padding: '0.4rem 1rem',
            borderRadius: 8,
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: 500,
            color: pathname === to ? 'white' : 'var(--text2)',
            background: pathname === to ? 'var(--accent)' : 'transparent',
            transition: 'all 0.2s'
          }}>{label}</Link>
        ))}
        <Link to="/validate" style={{
          padding: '0.4rem 1.2rem',
          borderRadius: 8,
          textDecoration: 'none',
          fontSize: '0.9rem',
          fontWeight: 600,
          color: 'white',
          background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
          boxShadow: '0 0 20px var(--glow)'
        }}>Try Free →</Link>
      </div>
    </nav>
  );
}
