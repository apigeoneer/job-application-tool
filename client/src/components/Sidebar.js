import './Sidebar.css';

function Sidebar({ setActiveProject }) {
  const projects = ['Google - APM', 'Motorq - PM1'];

  return (
    <div className="sidebar">
      <h2>Applications</h2>
      <ul>
        {projects.map((project, index) => (
          <li key={index} onClick={() => setActiveProject(project)}>
            {project}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
