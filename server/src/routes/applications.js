const express = require('express');
const router = express.Router();
const { upload } = require('../services/fileService');
const Application = require('../models/Application');

// Create new application
router.post('/', upload.single('resume'), async (req, res) => {
  try {
    const { jobDescription, projectName, company, role } = req.body;
    
    const application = new Application({
      userId: 'temp-user', // Will be replaced with actual user ID later
      projectName,
      company,
      role,
      jobDescription,
      resumeFile: req.file ? {
        filename: req.file.filename,
        path: req.file.path,
        mimetype: req.file.mimetype
      } : null
    });

    await application.save();
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all applications
router.get('/', async (req, res) => {
  try {
    const applications = await Application.find({ userId: 'temp-user' })
      .select('-jobDescription -resumeFile') // Exclude large fields
      .sort('-createdAt');
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single application
router.get('/:id', async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json(application);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update application
router.put('/:id', upload.single('resume'), async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) {
      updates.resumeFile = {
        filename: req.file.filename,
        path: req.file.path,
        mimetype: req.file.mimetype
      };
    }

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json(application);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;