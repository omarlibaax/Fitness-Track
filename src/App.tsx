import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { FitTrackShell } from './layout/FitTrackShell';
import { Dashboard } from './pages/Dashboard';
import { Workouts } from './pages/Workouts';
import { Nutrition } from './pages/Nutrition';
import { Progress } from './pages/Progress';
import { Profile } from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <FitTrackShell>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </FitTrackShell>
    </BrowserRouter>
  );
}

export default App;
