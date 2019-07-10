import React from "react";
import Togglable from "./Togglable";
import Blog from "./Blog";
import BlogFrom from "./BlogForm";
import { Segment } from "semantic-ui-react";

const Home = props => {
  const blogFormRef = React.createRef();

  return (
    <div>
      <h1>Blogs</h1>
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <div>
          <h2>create new</h2>
          <BlogFrom blogFormRef={blogFormRef} />
        </div>
      </Togglable>
      <Segment>
        {props.blogs.map(blog => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </Segment>
    </div>
  );
};

export default Home;
