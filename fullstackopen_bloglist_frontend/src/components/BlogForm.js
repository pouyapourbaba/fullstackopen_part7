import React, { useState } from "react";
import { connect } from "react-redux";
import { createBlog } from "./../reducers/blogsReducer";
import { setNotification } from "./../reducers/notificationReducer";
import { Button, Segment, Form } from "semantic-ui-react";

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
    setTitle("");
    setAuthor("");
    setUrl("");
    props.setNotification({
      message: `A new blog "${blog.title}" created`,
      type: "success"
    });
    props.blogFormRef.current.toggleVisibility();
  };

  return (
    <Segment>
      <Form size="tiny" onSubmit={handleSubmit}>
        <Form.Field>
          <label>Title</label>
          <input
            onChange={({ target }) => setTitle(target.value)}
            placeholder="Title"
            data-cy="title"
            value={title}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Author</label>
          <input
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="author"
            data-cy="author"
            value={author}
          />
        </Form.Field>
        <Form.Field>
          <label>Url</label>
          <input
            onChange={({ target }) => setUrl(target.value)}
            placeholder="url"
            data-cy="url"
            value={url}
          />
        </Form.Field>
        <Button size="small" type="submit" data-cy="submitNewBlog">
          Submit
        </Button>
      </Form>
    </Segment>
  );
};

export default connect(
  null,
  { createBlog, setNotification }
)(BLogFrom);
