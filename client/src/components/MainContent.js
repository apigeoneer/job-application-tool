import { useState } from 'react';
import './MainContent.css';

function MainContent({activeProject}) {
  const [jobDescription, setJobDescription] = useState('');
  const [resume, setResume] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');

  const handleJobDescriptionChange = (e) => setJobDescription(e.target.value);
  const handleFileUpload = (e) => setResume(e.target.files[0]);
  
  const handleSubmit = async () => {
    if (!jobDescription.trim()) {
      setResponseMessage('*Job description cannot be empty.');
      return;
    }
  
    if (!resume) {
      setResponseMessage('*Please upload your resume.');
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
      setResponseMessage(result.message || 'Submission successful!');
    } catch (error) {
      setResponseMessage('*An error occurred. Please try again.');
      console.error('*Error submitting data:', error);
    }
  };  

  // if (!activeProject) {
  //   return <div className="main-content">Select a project to get started.</div>;
  // }

  return (
    <div className="main-content">
      <h1>{activeProject}</h1>
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
        {/* {resume } */}
        <div className='resume-upload-text'>
          {resume && <p>Uploaded Resume: {resume.name}</p>}
        </div>
      </div>
      <button onClick={handleSubmit} className="submit-button">
        Submit
      </button>
      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </div>
  );
}

export default MainContent;
