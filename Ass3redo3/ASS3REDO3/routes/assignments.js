const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');

// home /list 
router.get('/', async (req, res) => {
  const assignments = await Assignment.find();
  res.render('index', { assignments });
});

// Assignments List Route
router.get('/assignments', async (req, res) => {
    const assignments = await Assignment.find();
    res.render('assignments', { assignments }); // New EJS view for assignments list
  });
  

// add form
router.get('/add', (req, res) => {
  res.render('add');
});

// add assignment
router.post('/add', async (req, res) => {
  await new Assignment(req.body).save();
  res.redirect('/');
});

// edit
router.get('/edit/:id', async (req, res) => {
  const assignment = await Assignment.findById(req.params.id);
  res.render('edit', { assignment });
});

// update
router.post('/edit/:id', async (req, res) => {
  await Assignment.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/');
});

// delete assignment
router.post('/delete/:id', async (req, res) => {
  await Assignment.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

module.exports = router;
