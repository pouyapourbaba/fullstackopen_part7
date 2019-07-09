const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");
const logger = require("../utils/logger");

blogsRouter.get("/", async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate("user");
    res.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogsRouter.post("/", async (req, res, next) => {
  try {
    let blog = req.body;
    let token = req.token;
    token = token.split(",")[0];
    const decodedToken = jwt.verify(token, process.env.JWTSECRET);
    if (!decodedToken.id) {
      response.status(401).json({ error: "token missing or invalid" });
    }

    if (!blog.likes) blog.likes = 0;

    if (!blog.title && !blog.url) return res.status(400).end();

    const user = await User.findById(decodedToken.id);

    blog = new Blog({ ...req.body, user: user.id });

    let result = await blog.save();

    // populate the user after saveing the blog
    result = await result.populate("user").execPopulate()

    user.blogs = user.blogs.concat(result.id);

    await user.save();
    res.status(201).json(result.toJSON());
  } catch (error) {
    next(error);
  }
});

// delete
blogsRouter.delete("/:id", async (req, res, next) => {
  try {
    let token = req.token;
    token = token.split(",")[0];

    const decodedToken = jwt.verify(token, process.env.JWTSECRET);
    const blog = await Blog.findById(req.params.id);

    // Check if the they own the blog
    if (blog.user.toString() === decodedToken.id) {
      const deletedBlog = await Blog.deleteOne({ _id: req.params.id });
      if (deletedBlog) {
        // delete the blogs id from the User model
        const user = await User.findById({ _id: blog.user })
        user.blogs = user.blogs.filter(blog => blog.toString() !== req.params.id)
        await user.save()

        res.status(204).end()}
      else res.status(404).end();
    } else {
      res.status(403).send({ error: "not authorized to delete this post" });
    }
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:id", async (req, res, next) => {
  try {
    const blog = await Blog.findById({_id: req.params.id})
    blog.likes = blog.likes + 1;
    let result = await blog.save()
    // populate the user after saveing the blog
    result = await result.populate("user").execPopulate()
    if (result) return res.json(result);
    else return res.status(404).end();
  } catch (error) {
    next(error);
  }
});

// Comment
blogsRouter.post("/:id/comments", async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if(blog) {
      blog.comments.push(req.body)
      let result = await blog.save()
      // populate the user after saveing the blog
      result = await result.populate("user").execPopulate()
      res.json(blog)
    } else {
      res.status(404).send({error: "blog not found"})
    }

  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter;
