import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import PlayerList from './components/PlayerList';
import PlayerForm from './components/PlayerForm';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/players" element={<PlayerList />} />
        <Route path="/add" element={<PlayerForm />} />
        <Route path="/edit/:id" element={<PlayerForm />} />
      </Routes>
    </Router>
  );
}

export default App;
