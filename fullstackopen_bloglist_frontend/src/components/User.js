import React from "react";
import { connect } from "react-redux";
import { List, Icon, Segment } from "semantic-ui-react";

const User = props => {
  const user = props.users.find(user => user.id === props.match.params.id);
  if (!user) return null;

  const userBlogs = props.blogs.filter(
    blog => blog.user.id === props.match.params.id
  );

  return (
    <div>
      <h2>Blogs added by {user.username}</h2>
      <Segment>
        <List>
          {userBlogs.map(blog => (
            <List.Item key={blog.id}>
              <Icon name="caret right" />
              <List.Content>
                <List.Header>{blog.title}</List.Header>
              </List.Content>
            </List.Item>
          ))}
        </List>
      </Segment>
    </div>
  );
};

const mapStateToProps = state => ({
  blogs: state.blogs,
  users: state.users
});

export default connect(mapStateToProps)(User);
