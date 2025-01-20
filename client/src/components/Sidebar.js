import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

function Sidebar({ projects, setActiveProject }) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Applications</h2>
        <FontAwesomeIcon
          icon={faPlus}
          className="add-icon"
          onClick={() => setActiveProject('New Application')} // Clear active project
        />
      </div>
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
