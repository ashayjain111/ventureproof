import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Validator from './pages/Validator';
import History from './pages/History';
import Result from './pages/Result';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/validate" element={<Validator />} />
        <Route path="/history" element={<History />} />
        <Route path="/result/:id" element={<Result />} />
      </Routes>
    </>
  );
}
