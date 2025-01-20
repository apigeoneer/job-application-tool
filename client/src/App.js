import { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import './App.css';

function App() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <div className="app">
      <Sidebar setActiveProject={setActiveProject} />
      <MainContent activeProject={activeProject} />
    </div>
  );
}

export default App;
