const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 5000;

// Configure Multer to store uploaded files in the 'uploads' folder
const upload = multer({
  dest: path.join(__dirname, 'uploads'),
});

// Middleware to parse JSON body data
app.use(express.json());

// Route to handle job description and resume submission
app.post('/api/submit', upload.single('resume'), (req, res) => {
  const { jobDescription } = req.body;
  const resumeFile = req.file;

  if (!jobDescription || !resumeFile) {
    return res.status(400).json({ message: 'Job description and resume are required.' });
  }

  const targetPath = path.join(__dirname, 'uploads', resumeFile.originalname);
  fs.rename(resumeFile.path, targetPath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'File upload failed.' });
    }

    console.log('Job Description:', jobDescription);
    console.log('Uploaded Resume:', targetPath);

    res.status(200).json({ message: 'Submission successful!' });
  });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
