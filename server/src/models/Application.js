const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    // Will be useful when we add authentication
  },
  projectName: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true
  },
  jobDescription: {
    type: String,
    required: true
  },
  resumeFile: {
    filename: String,
    path: String,
    mimetype: String
  },
  status: {
    type: String,
    enum: ['draft', 'submitted', 'in_progress', 'completed'],
    default: 'draft'
  },
  generatedContent: {
    linkedinMessage: String,
    emailDraft: String,
    coverLetter: String
  },
  analysis: {
    skillsMatch: [{
      skill: String,
      present: Boolean,
      importance: String
    }],
    missingSkills: [String],
    suggestions: [String]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
applicationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Application', applicationSchema);