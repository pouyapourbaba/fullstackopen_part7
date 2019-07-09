import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { useField } from "./hooks/index";
import Blog from "./components/Blog";
import BlogFrom from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Users from "./components/Users";
import User from "./components/User";

// Redux
import { connect } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { initBlogs, createBlog } from "./reducers/blogsReducer";
import { initUsers } from "./reducers/usersReducer";
import { login, setUser, logout } from "./reducers/loginReducer";
import BlogView from "./components/BlogView";
import Navigation from "./components/Navigation";

function App(props) {
  const username = useField("text");
  const password = useField("text");
  const blogFormRef = React.createRef();

  const handleLogin = async e => {
    e.preventDefault();
    const user = { username: username.value, password: password.value };

    props.login(user);
    username.onReset();
    password.onReset();
  };

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedBlogListUser");
    props.initBlogs();
    props.initUsers();
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
            <BlogFrom />
          </div>
        </Togglable>
        <div>
          {props.blogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
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
            <Navigation user={props.user} logout={props.logout} />
            <h1>Blogs</h1>
            <Notification />
            <Route exact path="/" render={() => <Content />} />
            <Route exact path="/users" render={() => <Users />} />
            <Route
              exact
              path="/users/:id"
              render={props => <User {...props} blogs={props.blogs} />}
            />
            <Route
              exact
              path="/blogs/:id"
              render={props => <BlogView {...props} />}
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
  { setNotification, initUsers, initBlogs, login, setUser, logout, createBlog }
)(App);
