import React, { useState, useImperativeHandle } from "react";
import { Button } from "semantic-ui-react";
import PropTypes from "prop-types";

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    };
  });

  return (
    <div>
      <div className={hideWhenVisible}>
        {!visible ? (
          <Button size="small" color="teal" onClick={toggleVisibility}>
            {props.buttonLabel}
          </Button>
        ) : (
          <Button
            color="red"
            size="small"
            onClick={toggleVisibility}
            style={{ marginTop: "10px" }}
          >
            cancel
          </Button>
        )}
      </div>
      <div style={showWhenVisible}>{props.children}</div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
};

export default Togglable;
