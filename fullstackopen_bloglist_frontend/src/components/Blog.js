import React, { useState } from "react";
import { Link } from "react-router-dom";

const Blog = ({ blog, user, handleLike, handleDelete }) => {
  console.log("blog ", blog);
  // const [detailsVisible, setDetailsVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  return (
    <div style={blogStyle}>
      <div>
        <span style={{ cursor: "pointer" }}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </span>
        {blog.author}
      </div>
      {/* ) : (
        <div className="infoWhenClicked">
          <span
            style={{ cursor: "pointer" }}
            // onClick={() => setDetailsVisible(!detailsVisible)}
          >
            {blog.title}
          </span>
          <br />
          <span>
            <a href={blog.url}>{blog.url}</a>
          </span>
          <br />
          <span>
            {blog.likes} likes{" "}
            <button onClick={() => handleLike(blog)}>like</button>
          </span>
          <br />
          <span>added by {blog.user.name}</span>
          <br />
          {user.id === blog.user.id && (
            <button onClick={() => handleDelete(blog)}>remove</button>
          )}
        </div> */}
    </div>
  );
};

export default Blog;
