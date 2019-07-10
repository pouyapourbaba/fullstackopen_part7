import React from "react";
import { connect } from "react-redux";
import { Message } from "semantic-ui-react";

const Notification = ({ notifications }) => {
  if (notifications.length === 0) return null;

  return notifications.map(notification => {
    let messageColor;
    if (notification.type === "success") messageColor = "green";
    else if (notification.type === "danger") messageColor = "red";
    return (
      <Message key={notification.id} color={messageColor}>
        <p>{notification.message}</p>
      </Message>
    );
  });
};

const mapStateToProps = state => ({
  notifications: state.notifications
});

export default connect(mapStateToProps)(Notification);
