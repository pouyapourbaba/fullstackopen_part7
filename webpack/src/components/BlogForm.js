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
        <Form.Group widths="equal">
          <Form.Input
            onChange={({ target }) => setTitle(target.value)}
            fluid
            label="Title"
            placeholder="Title"
            value={title}
            required
          />
          <Form.Input
            onChange={({ target }) => setAuthor(target.value)}
            fluid
            label="Author"
            placeholder="Author"
            value={author}
          />
          <Form.Input
            onChange={({ target }) => setUrl(target.value)}
            fluid
            label="Url"
            placeholder="Url"
            value={url}
          />
        </Form.Group>
        <Button size="small" type="submit">
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
