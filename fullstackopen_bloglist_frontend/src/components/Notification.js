import React from "react";
import { connect } from "react-redux";

const Notification = ({ notifications }) => {
  if (notifications.length === 0) return null;

  return (
    notifications.map(notification => <div className={`notification-${notification.type}`}>
      {notification.message}
    </div>)
  );
};

const mapStateToProps = state => ({
  notifications: state.notifications
});

export default connect(mapStateToProps)(Notification);
