const express = require('express');
const router = express.Router();
const BlogPost = require('../models/PostSchema'); // Importint the blog post schema

// Create a new blog post
router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const newBlog = await BlogPost.create(req.body);
        res.status(201).json(newBlog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all blog posts
router.get('/', async (req, res) => {
    try {
        const posts = await BlogPost.find();
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get a specific blog post by ID
router.get('/:id', async (req, res) => {
    try {
    const blog = await BlogPost.findById(req.params.id);
    if (!blog) {
        return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json(blog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update a specific blog post by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedBlog = await BlogPost.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (!updatedBlog) {
        return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json(updatedBlog);
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
    }
});

// Delete a specific blog post by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedBlog = await BlogPost.findByIdAndRemove(req.params.id);
    if (!deletedBlog) {
        return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json({ message: `Blog post ${req.params.id} has been deleted` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

/* Retrieve posts by category, tags, and search string */

// Get posts by category -> accessible via the category menu
router.get('/category/:category', async (req, res) => {
    const category = req.params.category;
    try {
        const posts = await BlogPost.find({ categories: category });
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get posts by tags -> This will be activated via a 'tag' search menu, which will exist right below the category menu
router.get('/tags/:tag', async (req, res) => {
    const tag = req.params.tag;
    try {
        const posts = await BlogPost.find({ tags: tag });
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get posts containing a certain search string
router.get('/search/:searchString', async (req, res) => {
    const searchString = req.params.searchString;
    try {
    const posts = await BlogPost.find({
    $or: [
        { title: { $regex: searchString, $options: 'i' } }, // Case-insensitive title search
        { content: { $regex: searchString, $options: 'i' } }, // Case-insensitive content search
      ],
    });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
