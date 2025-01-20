import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import './MainContent.css';

// Subcomponent: Job Description Input
const JobDescriptionInput = ({ jobDescription, onChange }) => (
  <div>
    <label>Add Job Description:</label>
    <textarea
      value={jobDescription}
      onChange={onChange}
      placeholder="Paste or write the job description here..."
      rows="6"
      cols="60"
    ></textarea>
  </div>
);

// Subcomponent: Resume Upload
const ResumeUpload = ({ resume, onChange }) => (
  <div>
    <label>Upload Your Resume:</label>
    <input type="file" onChange={onChange} />
    {resume && <p>Uploaded Resume: {resume.name}</p>}
  </div>
);

function MainContent({ activeProject, hasProjects, addProject, updateProjectName }) {
  const [jobDescription, setJobDescription] = useState('');
  const [resume, setResume] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
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

    setIsSubmitting(true); // Disable submit button
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      setResponseMessage({ text: result.message || 'Submission successful!', type: 'success' });

      // Add the project to the sidebar
      addProject();

      // Clear form fields after successful submission
      setJobDescription('');
      setResume(null);
    } catch (error) {
      setResponseMessage({ text: '*An error occurred. Please try again.', type: 'error' });
      console.error('*Error submitting data:', error);
    } finally {
      setIsSubmitting(false); // Re-enable submit button
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditKeyPress = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      if (editedName.trim() !== '') {
        updateProjectName(editedName.trim()); // Update the heading
      } else {
        setEditedName(activeProject); // Revert to previous name if empty
      }
    }
  };

  const handleEditBlur = () => {
    setIsEditing(false);
    setEditedName(activeProject); // Revert to the current project name
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
            onBlur={handleEditBlur}
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

      {/* Job Description Input */}
      <JobDescriptionInput
        jobDescription={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      {/* Resume Upload */}
      <ResumeUpload resume={resume} onChange={(e) => setResume(e.target.files[0])} />

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="submit-button"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>

      {/* Response Message */}
      {responseMessage && (
        <p
          className={`response-message ${responseMessage.type}`}
          aria-live="assertive"
        >
          {responseMessage.text}
        </p>
      )}
    </div>
  );
}

export default MainContent;

