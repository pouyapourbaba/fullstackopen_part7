import React, { useState } from "react";
import { connect } from "react-redux";
import { addComment } from "../reducers/blogsReducer";

const BlogView = props => {
  const [comment, setComment] = useState({content: ""});

  if (props.blogs.length === 0) return null;
  const blog = props.blogs.find(blog => blog.id === props.match.params.id);

  const handleSubmitComment = e => {
    e.preventDefault();

    props.addComment(comment, blog.id);
  };

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <br />
      <span>
        {blog.likes} likes{" "}
        <button onClick={() => props.handleLike(blog)}>like</button>
      </span>
      <br />
      added by {blog.user.username}
      <h3>comments</h3>
      <form onSubmit={handleSubmitComment}>
        <input
          type="text"
          placeholder="type your comment"
          onChange={({ target }) => setComment({content: target.value})}
        />
        <button>add comment</button>
      </form>
      {blog.comments && (
        <ul>
          {blog.comments.map(comment => (
            <li key={comment._id}>{comment.content}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  blogs: state.blogs
});

export default connect(
  mapStateToProps,
  { addComment }
)(BlogView);
