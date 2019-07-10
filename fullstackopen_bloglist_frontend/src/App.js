import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { useField } from "./hooks/index";
import Notification from "./components/Notification";
import Users from "./components/Users";
import User from "./components/User";
import { Container } from "semantic-ui-react";

// Redux
import { connect } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { initBlogs, createBlog } from "./reducers/blogsReducer";
import { initUsers } from "./reducers/usersReducer";
import { login, setUser, logout } from "./reducers/loginReducer";
import BlogView from "./components/BlogView";
import Navigation from "./components/Navigation";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";

function App(props) {
  const username = useField("text");
  const password = useField("text");

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

  return (
    <BrowserRouter>
      <div className="App">
        <Container>
          {!props.user ? (
            <LoginForm
              handleLogin={handleLogin}
              username={username}
              password={password}
            />
          ) : (
            <div>
              <Navigation user={props.user} logout={props.logout} />
              <Notification />
              <Route
                exact
                path="/"
                render={() => <Home blogs={props.blogs} />}
              />
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
        </Container>
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
