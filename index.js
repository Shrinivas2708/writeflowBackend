const express = require('express');
const mongoose = require('mongoose');
const { Blogs } = require('./db');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://ssherikar2005:shrinivas%40123@cluster0.u4yupz4.mongodb.net/Blogs', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));

// Predefined array of authors
const authors = ['John Doe', 'Jane Smith', 'Michael Johnson', 'Sarah Lee', 'David Brown'];

// Endpoint to publish (save a new blog)
app.post('/publish', async (req, res) => {
    try {
      const { title, content } = req.body;
  
      // Validate if title and content are provided
      if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
      }
  
      // Automatically set the author and date
      const authorName = authors[Math.floor(Math.random() * authors.length)]; // Save as a string
      const publishedDate = new Date();
      const published = true; // Set default value to true
  
      const newBlog = new Blogs({
        authorName, // Save as a string
        title,
        content,
        published,
        publishedDate,
      });
  
      // Save the blog to the database
      await newBlog.save();
  
      return res.status(201).json({
        message: 'Blog published successfully',
        blog: newBlog,
      });
    } catch (error) {
      console.error('Error publishing blog:', error);
      return res.status(500).json({ message: 'Server error while publishing blog' });
    }
  });
  
// Endpoint to get all blogs (bulk retrieval)
app.get('/bulks', async (req, res) => {
  try {
    const blogs = await Blogs.find();
    
    if (!blogs.length) {
      return res.status(404).json({ message: 'No blogs found' });
    }

    return res.status(200).json({
   
      blogs
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return res.status(500).json({ message: 'Server error while fetching blogs' });
  }
});

// Set the app to listen on a specific port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
