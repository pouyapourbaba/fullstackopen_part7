import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { useField, useResource } from "./hooks/index";
import Blog from "./components/Blog";
import BlogFrom from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Users from "./components/Users";

// Redux
import { connect } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { initBlogs, createBlog } from "./reducers/blogsReducer";
import { login, setUser, logout } from "./reducers/loginReducer";

function App(props) {
  const username = useField("text");
  const password = useField("text");
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");
  const [blogss, blogService] = useResource("/api/blogs");
  const blogFormRef = React.createRef();

  const handleLogin = async e => {
    e.preventDefault();
    const user = { username: username.value, password: password.value };

    props.login(user);
    username.onReset();
    password.onReset();
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogListUser");
    props.logout();
  };

  const handleCreateBlog = async e => {
    e.preventDefault();
    blogFormRef.current.toggleVisibility();

    const blog = {
      title: title.value,
      author: author.value,
      url: url.value
    };
    props.createBlog(blog);

    // try {
    // await blogService.create(blog);
    title.onReset();
    author.onReset();
    url.onReset();

    props.setNotification({
      message: `a new blog ${blog.title} by ${blog.author} added`,
      type: "success"
    });
    // } catch (error) {
    //   props.setNotification({
    //     message: "the blog not added",
    //     type: "danger"
    //   });
    // }
  };

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedBlogListUser");
    props.initBlogs();
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      props.setUser(user.data);
    }
  }, []);

  const loginForm = () => {
    return (
      <div>
        <h1>log in to application</h1>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            <label>username</label>
            <input {...username} />
          </div>
          <div>
            <label>password</label>
            <input {...password} />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  };

  const Content = () => {
    return (
      <div>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <div>
            <h2>create new</h2>
            <BlogFrom
              handleCreateBlog={handleCreateBlog}
              author={author}
              title={title}
              url={url}
            />
          </div>
        </Togglable>
        <div>
          {props.blogs.map(blog => (
            <Blog
              key={blog.id}
              blog={blog}
              user={props.user}
              handleLike={blogService.likeResource}
              handleDelete={blogService.deleteRecource}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <BrowserRouter>
      <div className="App">
        {!props.user ? (
          loginForm()
        ) : (
          <div>
            <h1>Blogs</h1>
            <Notification />
            <p>
              {props.user.name} logged in
            </p>
            <button onClick={handleLogout}>logout</button>
            <Route exact path="/" render={() => <Content />} />
            <Route
              exact
              path="/users"
              render={() => <Users blogs={props.blogs} />}
            />
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = state => ({
  blogs: state.blogs,
  user: state.user
});

export default connect(
  mapStateToProps,
  { setNotification, initBlogs, login, setUser, logout, createBlog }
)(App);
