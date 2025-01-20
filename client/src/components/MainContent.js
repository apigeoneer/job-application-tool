import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import './MainContent.css';

function MainContent({ activeProject, hasProjects, addProject, updateProjectName }) {
  const [jobDescription, setJobDescription] = useState('');
  const [resume, setResume] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(activeProject);

  const handleJobDescriptionChange = (e) => setJobDescription(e.target.value);
  const handleFileUpload = (e) => setResume(e.target.files[0]);
  
  const handleSubmit = async () => {
    if (!jobDescription.trim()) {
      setResponseMessage({ text: '*Job description cannot be empty.', type: 'error' });
      return;
    }
  
    if (!resume) {
      setResponseMessage({ text: '*Please upload your resume.', type: 'error' });
      return;
    }
  
    const formData = new FormData();
    formData.append('jobDescription', jobDescription);
    formData.append('resume', resume);
  
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        body: formData,
      });
  
      const result = await response.json();
      setResponseMessage({ text: result.message || 'Submission successful!', type: 'success' });

      // Add the project to the sidebar
      addProject();
    } catch (error) {
      setResponseMessage({ text: '*An error occurred. Please try again.', type: 'error' });
      console.error('*Error submitting data:', error);
    }
  };  

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditKeyPress = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      updateProjectName(editedName);
    }
  };

  return (
    <div className="main-content">
    <div className="heading-wrapper">
      {isEditing ? (
        <input
          type="text"
          className="editable-heading"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          onKeyPress={handleEditKeyPress}
          autoFocus
        />
      ) : (
        <h1>
          {hasProjects ? activeProject : 'New Application'}
          {hasProjects && (
            <FontAwesomeIcon
              icon={faPen}
              className="edit-icon"
              onClick={handleEditClick}
            />
          )}
        </h1>
      )}
    </div>
          <div>
            <label>Paste Job Description:</label>
            <textarea
              value={jobDescription}
              onChange={handleJobDescriptionChange}
              placeholder="Paste the job description here..."
              rows="6"
              cols="60"
            ></textarea>
          </div>
          <div>
            <label>Upload Your Resume:</label>
            <input type="file" onChange={handleFileUpload} />
            {resume && <p>Uploaded Resume: {resume.name}</p>}
          </div>
          <button onClick={handleSubmit} className="submit-button">
            Submit
          </button>
          {responseMessage && (
            <p className={`response-message ${responseMessage.type}`}>
              {responseMessage.text}
            </p>
          )}
    </div>
  );
}

export default MainContent;
