import { useState } from 'react';
import './MainContent.css';

function MainContent() {
  const [jobDescription, setJobDescription] = useState('');
  const [resume, setResume] = useState(null);

  const handleJobDescriptionChange = (e) => setJobDescription(e.target.value);
  const handleFileUpload = (e) => setResume(e.target.files[0]);

  return (
    <div className="main-content">
      <h1>Job Application Tool</h1>
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
        {resume && <p>Uploaded: {resume.name}</p>}
      </div>
    </div>
  );
}

export default MainContent;
