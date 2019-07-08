import React from "react";
import { connect } from "react-redux";

const BlogView = props => {
  if (props.blogs.length === 0) return null;
  const blog = props.blogs.find(blog => blog.id === props.match.params.id);

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
    </div>
  );
};

const mapStateToProps = state => ({
  blogs: state.blogs
});

export default connect(mapStateToProps)(BlogView);
