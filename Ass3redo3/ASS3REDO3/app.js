require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb'); // For MongoDB Node.js Driver
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); 
app.set('view engine', 'ejs');

// MongoDB Connection with Mongoose
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected via Mongoose'))
.catch(err => console.error('Mongoose Connection Error:', err));

// MongoDB Connection with Node.js Driver
const client = new MongoClient(process.env.DB_URI, { serverApi: ServerApiVersion.v1 });

client.connect(err => {
  if (err) {
    console.error('MongoDB Node.js Driver Connection Error:', err);
  } else {
    console.log('MongoDB Connected via Node.js Driver');
    
    // Example: Accessing the database and performing an operation
    const db = client.db("assignment3db");
    const collection = db.collection("assignments");

    // Example query: Find all documents in the collection
    collection.find({}).toArray((err, results) => {
      if (err) {
        console.error('Error querying MongoDB:', err);
      } else {
        console.log('Sample Data from MongoDB:', results);
      }
    });
  }
});

// Routes (Step 9: Ensure this is properly linked)
app.use('/', require('./routes/assignments')); // Main route

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
