import sharp from "sharp";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { Comment } from "../models/comment.model.js";

export const addNewPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const image = req.file;
    const authorId = req.id;

    if (!caption || !image) {
      return res.status(401).json({
        message: "Image and caption are required",
        success: false,
      });
    }

    const optimizedImageBuffer = sharp(image.buffer)
      .resize({
        width: 800,
        height: 800,
        fit: "inside",
      })
      .toFormat("jpeg", { quality: 80 })
      .toBuffer();

    const fileUri = `data:image/jpeg;base64, ${optimizedImageBuffer.toString(
      "base64"
    )}`;

    const cloudResponse = await cloudinary.uploader.upload(fileUri);

    const post = await Post.create({
      caption,
      image: cloudResponse.secure_url,
      author: authorId,
    });

    const user = await User.findByIdAndUpdate(authorId, {
      $push: { posts: post._id },
    });

    await Post.populate({ path: "author", select: "-password" });

    res.status(200).json({
      message: "Post created successfully",
      success: true,
      post,
    });
  } catch (error) {
    console.log("Error => ", error.message);
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({ path: "author", select: "username, profilePicture" })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: { path: "author", select: "username, profilePicture" },
      });

    res.status(200).json({
      message: "Posts fetched successfully",
      success: true,
      posts: allPosts,
    });
  } catch (error) {
    console.log("Error => ", error.message);
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const authorId = req.id;

    const Posts = await Post.find({ author: authorId })
      .sort({ createdAt: -1 })
      .populate({ path: "author", select: "username, profilePicture" })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: { path: "author", select: "username, profilePicture" },
      });

    res.status(200).json({
      message: "User's Post fetched successfully",
      success: true,
      Posts,
    });
  } catch (error) {
    console.log("Error => ", error.message);
  }
};

export const likePost = async (req, res) => {
  try {
    const userLikedId = req.id;
    const postId = req.params.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }

    // Logic to like the post
    await post.updateOne({ $addToSet: { likes: userLikedId } });
    await post.save();

    // Implement socket.io for real time notification

    return res.status(200).json({
      message: "Post liked successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error => ", error.message);
  }
};

// dislike post

export const disLikePost = async (req, res) => {
  try {
    const userDisLikedId = req.id;
    const postId = req.params.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }

    // Logic to dislike the post
    await post.updateOne({ $pull: { likes: userDisLikedId } });
    await post.save();

    // Implement socket.io for real time notification

    return res.status(200).json({
      message: "Post disliked successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error => ", error.message);
  }
};

export const addComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const userCommentedId = req.id;
    const { comment } = req.body;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }

    const createComment = await Comment.create({
      author: userCommentedId,
      comment,
      post: postId,
    });

    await post.updateOne({ $push: { comments: createComment._id } });

    await Post.populate({ path: "author", select: "username, profilePicture" });

    // Implement socket.io for real time notification

    return res.status(200).json({
      message: "Comment added successfully",
      success: true,
      comment: createComment,
    });
  } catch (error) {
    console.log("Error => ", error.message);
  }
};

export const getParticularPostComments = async (req, res) => {
  try {
    const postId = req.params.id;

    const comments = await Comment.find({ post: postId }).populate(
      "author",
      "username, profilePicture"
    );

    if (!comments) {
      return res.status(404).json({
        message: "No comments found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Comments fetched successfully",
      success: true,
      comments,
    });
  } catch (error) {
    console.log("Error => ", error.message);
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const authorId = req.id;

    const post = await Post.findById(postId);

    // Check if the post is owned by the user
    if (post.author.toString() !== authorId) {
      return res.status(401).json({
        message: "Unauthorized access",
        success: false,
      });
    }

    await Post.findByIdAndDelete(postId);

    // remove the post from the user's posts array
    await User.findByIdAndUpdate(authorId, { $pull: { posts: postId } });

    // remove the post from the comments array of the post
    await Comment.deleteMany({ post: postId });

    return res.status(200).json({
      message: "Post deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error => ", error.message);
  }
};

export const bookmarkPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const authorId = req.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }
    const user = await User.findById(authorId);
    if (user.bookmarks.includes(postId)) {
      await user.updateOne({ $pull: { bookmarks: postId } });
      await user.save();
      return res.status(200).json({
        message: "Post unbookmarked successfully",
        success: true,
      });
    } else {
      await user.updateOne({ $addToSet: { bookmarks: postId } });
      await user.save();
      return res.status(200).json({
        message: "Post bookmarked successfully",
        success: true,
      });
    }
  } catch (error) {
    console.log("Error => ", error.message);
  }
};
