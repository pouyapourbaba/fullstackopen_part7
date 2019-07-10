import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

const Navigation = props => {
  const pathname = props.location.pathname;
  const currentPath = pathname.slice(1, pathname.length);

  const [activeItem, setActiveItem] = useState(currentPath);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogListUser");
    props.logout();
    props.history.push("/");
  };

  return (
    <React.Fragment>
      <Menu>
        <Menu.Item
          name="blogs"
          active={activeItem === "blogs"}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />
        <Menu.Item
          name="users"
          active={activeItem === "users"}
          onClick={handleItemClick}
          as={Link}
          to="/users"
        />
        <Menu.Menu position="right">
          <Menu.Item
            name="logout"
            active={activeItem === "logout"}
            onClick={handleLogout}
          />
        </Menu.Menu>
      </Menu>
    </React.Fragment>
  );
};

export default withRouter(Navigation);
