import './Sidebar.css';

function Sidebar({ projects, setActiveProject }) {
  return (
    <div className="sidebar">
      <h2>Applications</h2>
      {projects.length > 0 ? (
        <ul>
          {projects.map((project, index) => (
            <li key={index} onClick={() => setActiveProject(project)}>
              {project}
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-projects-message">
          Your applications will appear here when you add projects.
        </p>
      )}
    </div>
  );
}

export default Sidebar;
