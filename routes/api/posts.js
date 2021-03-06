const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load post model
const Post = require("../../models/Post");
// Load profile model
const Profile = require("../../models/Profile");
//Input validation
const validatePostInput = require("../../validation/post");

// @route GET api/posts/test
// @desc Tests post route
// @access public
router.get("/test", (req, res) => res.json({ msg: "posts works" }));

// @route GET api/posts
// @desc Get posts
// @access public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => {
      res.json(posts);
    })
    .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
});

// @route GET api/posts/:id
// @desc Get single post by id
// @access public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      res.json(post);
    })
    .catch(err =>
      res.status(404).json({ nopostfound: "No post found with that id" })
    );
});

// @route POST api/posts/
// @desc Create post
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    //check validation
    if (!isValid) {
      //if any errors send 400 errors object
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

// @route DELETE api/posts/:id
// @desc Delete post
// @access Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id).then(post => {
          //Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }
          //Delete
          post.remove().then(() => res.json({ success: true }));
        });
      })
      .catch(err => res.status(404).json({ nopostfound: "No post found" }));
  }
);

// @route POST api/posts/like/:id
// @desc Like post
// @access Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id).then(post => {
          //Check if user liked the post or not
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(404)
              .json({ alreadyliked: "User already liked this post" });
          }
          //Add user id to likes array
          post.likes.unshift({ user: req.user.id });
          //Save to db
          post.save().then(post => res.json(post));
        });
      })
      .catch(err => res.status(404).json({ nopostfound: "No post found" }));
  }
);
// @route POST api/posts/unlike/:id
// @desc Like post
// @access Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id).then(post => {
          //Check if user liked the post or not
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(404)
              .json({ alreadyliked: "You have not liked this post" });
          }
          //Get the remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);
          //Splice out of array
          post.likes.splice(removeIndex, 1);

          //Save to db
          post.save().then(post => res.json(post));
        });
      })
      .catch(err => res.status(404).json({ nopostfound: "No post found" }));
  }
);

// @route POST api/posts/comment/:id
// @desc Add post's comment
// @access Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        const { errors, isValid } = validatePostInput(req.body);
        //check validation
        if (!isValid) {
          //if any errors send 400 errors object
          return res.status(400).json(errors);
        }
        const newCom = {
          text: req.body.text,
          user: req.user.id,
          name: req.user.name,
          avatar: req.user.avatar
        };

        //Add user id to comment array
        post.comments.unshift(newCom);
        //Save to db
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ nopostfound: "No post found" }));
  }
);

// @route DELETE api/posts/comment/:id/:comment_id
// @desc Delete comment from post
// @access Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        //Check if comment exist
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "The comment does not exist" });
        }
        //Get the remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);
        //Splice out of array
        post.comments.splice(removeIndex, 1);

        //Save to db
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ nopostfound: "No post found" }));
  }
);

module.exports = router;
