import React from "react";
import { connect } from "react-redux";

const User = props => {
  const user = props.users.find(user => user.id === props.match.params.id);
  if (!user) return null;

  const userBlogs = props.blogs.filter(
    blog => blog.user.id === props.match.params.id
  );

  return (
    <div>
      <h2>{user.username}</h2>
      <p>added blogs</p>
      <ul>
        {userBlogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = state => ({
  blogs: state.blogs,
  users: state.users
});

export default connect(mapStateToProps)(User);
