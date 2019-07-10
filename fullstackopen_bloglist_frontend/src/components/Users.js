import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Header, Table, Segment } from "semantic-ui-react";

const Users = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <Segment>
        <Table basic="very" celled collapsing>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>User</Table.HeaderCell>
              <Table.HeaderCell>Created Blogs</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {users.map(user => (
            <Table.Body key={user.id}>
              <Table.Row>
                <Table.Cell>
                  <Header as="h4">
                    <Header.Content>
                      {user.name}
                      <Header.Subheader>
                        <Link to={`/users/${user.id}`}>{user.username}</Link>
                      </Header.Subheader>
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{user.blogs.length}</Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
      </Segment>
    </div>
  );
};

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps)(Users);
