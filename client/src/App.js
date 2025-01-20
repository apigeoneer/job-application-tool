import { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import './App.css';

function App() {
  const projects = [];
  const [activeProject, setActiveProject] = useState(projects.length > 0 ? projects[0] : null);

  return (
    <div className="app">
      <Sidebar projects={projects} setActiveProject={setActiveProject} />
      <MainContent activeProject={activeProject} />
    </div>
  );
}

export default App;
