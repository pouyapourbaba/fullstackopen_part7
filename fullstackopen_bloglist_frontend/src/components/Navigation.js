import React from "react";
import { Link, withRouter } from "react-router-dom";

const Navigation = props => {
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogListUser");
    props.logout();
    props.history.push("/");
  };

  return (
    <div className="navigation">
      <ul>
        <li>
          <Link to="/">blogs</Link>
        </li>
        <li>
          <Link to="/users">users</Link>
        </li>
        <li>
          {props.user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(Navigation);
