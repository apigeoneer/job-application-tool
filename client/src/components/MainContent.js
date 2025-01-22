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
  const [company, setCompany] = useState('');
  const [role, setRole] = useState(''); 
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
    formData.append('projectName', activeProject);
    formData.append('company', company);
    formData.append('role', role);   

    setIsSubmitting(true); // Disable submit button
    try {
      const response = await fetch('http://localhost:5000/api/applications', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server Error Details:', errorData);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error || 'Unknown error'}`);
      }

      const result = await response.json();
      setResponseMessage({ text: result.message || 'Submission successful!', type: 'success' });

      // Add the project to the sidebar
      addProject();

      // Clear form fields after successful submission
      setJobDescription('');
      setResume(null);
    } catch (error) {
      console.error('*Error submitting data:', error);
      setResponseMessage({ text: '*An error occurred. Please try again.', type: 'error' });
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

    {/* Company Input */}
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">Company:</label>
      <input
        type="text"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Enter company name"
        required
      />
    </div>

    {/* Role Input */}
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">Role:</label>
      <input
        type="text"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Enter job role"
        required
      />
    </div>  

      {/* Job Description Input */}
      <JobDescriptionInput
        jobDescription={jobDescription}
        onChange={handleJobDescriptionChange}
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

