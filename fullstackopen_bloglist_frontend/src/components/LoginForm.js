import React from "react";
import Notification from "./Notification";
import { Button, Form, Header } from "semantic-ui-react";

const LoginForm = props => {
  return (
    <div>
      <Header style={{ marginTop: "20px" }} size="huge">
        Login to the application
      </Header>
      <Notification />

      <Form onSubmit={props.handleLogin}>
        <Form.Field>
          <label>Username</label>
          <input {...props.username} placeholder="Username" />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input {...props.password} placeholder="Password" />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default LoginForm;
