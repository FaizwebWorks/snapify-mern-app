import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
import { addComment, addNewPost, bookmarkPost, deletePost, disLikePost, getAllPosts, getParticularPostComments, getUserPosts, likePost } from "../controllers/post.controller.js";

const router = express.Router();

router.route("/add-post").post( isAuthenticated, upload.single("image"), addNewPost);
router.route("/all-posts").get( isAuthenticated, getAllPosts);
router.route("/user-posts/all").get( isAuthenticated, getUserPosts);
router.route("/:id/like-post").get( isAuthenticated, likePost);
router.route("/:id/dislike-post").get( isAuthenticated, disLikePost);
router.route("/:id/add-comment").post( isAuthenticated, addComment);
router.route("/:id/get-particular-post-comments").get( isAuthenticated, getParticularPostComments);
router.route("/delete-post/:id").post( isAuthenticated, deletePost);
router.route("/:id/boomark-post").post( isAuthenticated, bookmarkPost);

export default router;
