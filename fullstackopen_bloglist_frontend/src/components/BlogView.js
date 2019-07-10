import React, { useState } from "react";
import { connect } from "react-redux";
import { addComment, likeBlog, deleteBlog } from "../reducers/blogsReducer";
import { setNotification } from "../reducers/notificationReducer";
import {
  Segment,
  Button,
  Label,
  Icon,
  Form,
  Divider,
  Header,
  Table,
  Comment
} from "semantic-ui-react";

const BlogView = props => {
  const [comment, setComment] = useState({ content: "" });

  if (props.blogs.length === 0) return <div>No Blogs Found..</div>;
  const blog = props.blogs.find(blog => blog.id === props.match.params.id);

  const handleSubmitComment = e => {
    e.preventDefault();
    props.addComment(comment, blog.id);
    setComment({ content: "" });
  };

  const handleDelete = blog => {
    props.deleteBlog(blog);
    props.setNotification({
      message: `The blog "${blog.title}" deleted`,
      type: "danger"
    });
    props.history.push("/");
  };

  return (
    <Segment>
      <h2>{blog.title}</h2>
      <Table definition>
      <Table.Body>
        <Table.Row>
          <Table.Cell width={2}>Author</Table.Cell>
          <Table.Cell>{blog.author}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>URL</Table.Cell>
          <Table.Cell>{blog.url}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Added by</Table.Cell>
          <Table.Cell>{blog.user.username}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
      {props.user.id === blog.user.id ? (
        <Button.Group size="large">
          <Button as="div" labelPosition="left">
            <Label color="green" as="a" basic pointing="right">
              {blog.likes}
            </Label>
            <Button color="green" icon onClick={() => props.likeBlog(blog)}>
              <Icon name="heart" />
              Like
            </Button>
          </Button>
          <Button.Or />
          <Button color="red" onClick={() => handleDelete(blog)}>
            delete
          </Button>
        </Button.Group>
      ) : (
        <Button as="div" labelPosition="left">
          <Label color="green" as="a" basic pointing="right">
            {blog.likes}
          </Label>
          <Button color="green" icon onClick={() => props.likeBlog(blog)}>
            <Icon name="heart" />
            Like
          </Button>
        </Button>
      )}
      <Divider horizontal>
        <Header as="h4">
          <Icon name="comments" />
          Comments
        </Header>
      </Divider>
      <Form onSubmit={handleSubmitComment}>
        <Form.Group>
          <Form.Input
            placeholder="Comment"
            value={comment.content}
            onChange={({ target }) => setComment({ content: target.value })}
          />

          <Form.Button content="Submit" />
        </Form.Group>
      </Form>
      {blog.comments && (
        <Comment.Group>
          {blog.comments.map(comment => (
            <Comment key={comment._id}>
              <Comment.Content>{comment.content}</Comment.Content>
            </Comment>
          ))}
        </Comment.Group>
      )}
    </Segment>
  );
};

const mapStateToProps = state => ({
  blogs: state.blogs,
  user: state.user
});

export default connect(
  mapStateToProps,
  { addComment, likeBlog, deleteBlog, setNotification }
)(BlogView);
