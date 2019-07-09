import React, { useState } from "react";
import { connect } from "react-redux";
import { createBlog } from "./../reducers/blogsReducer";

const BLogFrom = props => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    const blog = {
      title,
      author,
      url
    };

    props.createBlog(blog);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>title:</label>
        <input onChange={({ target }) => setTitle(target.value)} />
      </div>
      <div>
        <label>author:</label>
        <input onChange={({ target }) => setAuthor(target.value)} />
      </div>
      <div>
        <label>url:</label>
        <input onChange={({ target }) => setUrl(target.value)} />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default connect(
  null,
  { createBlog }
)(BLogFrom);
