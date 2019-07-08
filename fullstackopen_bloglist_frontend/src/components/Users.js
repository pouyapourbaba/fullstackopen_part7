import React from "react";
import { Link } from "react-router-dom";

const Users = ({ blogs }) => {
  let users = {};
  const extractUsers = blogs => {
    blogs.forEach(blog => {
      users.hasOwnProperty(blog.user.username)
        ? users[blog.user.username].push(blog)
        : (users[blog.user.username] = [blog]);
    });
  };

  extractUsers(blogs);

  const blogsCreated = [];

  for (const key in users) {
    const element = users[key];
    blogsCreated.push({ username: key, blogs: element });
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th />
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {blogsCreated.map(user => (
            <tr key={user.username}>
              <td>
                <Link to={`/users/${user.blogs[0].user.id}`}>
                  {user.username}
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
