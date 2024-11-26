const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');

// home page
router.get('/', (req, res) => {
  res.render('index'); 
});

// ass list opage
router.get('/assignments', async (req, res) => {
  const assignments = await Assignment.find();
  res.render('assignments', { assignments });
});

// add assignment poage
router.get('/add', (req, res) => {
  res.render('add');
});

// add assignment stuff
router.post('/add', async (req, res) => {
  const { title, status, description, dueDate } = req.body;
  await new Assignment({ title, status, description, dueDate }).save();
  res.redirect('/assignments');
});

// Edit Assignment 
router.get('/edit/:id', async (req, res) => {
  const assignment = await Assignment.findById(req.params.id);
  res.render('edit', { assignment });
});

// Update Assignment stuff
router.post('/edit/:id', async (req, res) => {
  const { title, status, description, dueDate } = req.body;
  await Assignment.findByIdAndUpdate(req.params.id, { title, status, description, dueDate });
  res.redirect('/assignments');
});

// delete assignment
router.post('/delete/:id', async (req, res) => {
  await Assignment.findByIdAndDelete(req.params.id);
  res.redirect('/assignments');
});

module.exports = router;
