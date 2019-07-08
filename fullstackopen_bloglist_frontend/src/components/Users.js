import React from "react";

const Users = ({ blogs }) => {
  //   console.log(blogs);

  //   [
  //     {
  //       name: "",
  //       blogs: []
  //     }
  //   ];
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
    blogsCreated.push({ username: key, numberOfBlogs: element.length });
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
              <td>{user.username}</td>
              <td>{user.numberOfBlogs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
