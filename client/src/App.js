import { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import './App.css';

function App() {
  const [projects, setProjects] = useState(['Google - APM', 'Motorq - PM1']);
  const [activeProject, setActiveProject] = useState(
    projects.length > 0 ? projects[0] : null
  );

  const addProject = (newProject) => {
    setProjects((prevProjects) => [...prevProjects, newProject]);
    setActiveProject(newProject);
  };

  const updateProjectName = () => {
    const newProjectName = `Application (${projects.length + 1})`;
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project === activeProject ? newProjectName : project
      )
    );
    setActiveProject(newProjectName);
  };

  return (
    <div className="app">
      <Sidebar projects={projects} setActiveProject={setActiveProject} />
      <MainContent
        activeProject={activeProject}
        hasProjects={projects.length > 0}
        addProject={addProject}
        updateProjectName={updateProjectName}
      />
    </div>
  );
}

export default App;
