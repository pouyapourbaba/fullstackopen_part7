import React from "react";
import Notification from "./Notification";
import { Button, Form, Header } from "semantic-ui-react";

const LoginForm = props => {
  return (
    <div>
      <Header style={{ marginTop: "20px" }} size="huge">
        Log in to the application
      </Header>
      <Notification />

      <Form onSubmit={props.handleLogin} data-cy="loginForm">
        <Form.Field>
          <label>Username</label>
          <input {...props.username} placeholder="Username" data-cy="username" />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input {...props.password} placeholder="Password" data-cy="password" />
        </Form.Field>
        <Button type="submit" data-cy="login">Login</Button>
      </Form>
    </div>
  );
};

export default LoginForm;
