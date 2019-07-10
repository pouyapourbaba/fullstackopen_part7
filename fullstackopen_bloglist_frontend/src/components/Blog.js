import React from "react";
import { Link } from "react-router-dom";
import { Segment, List, Icon } from "semantic-ui-react";

const Blog = ({ blog }) => {
  const segmentStyle = {
    marginTop: "10px"
  };

  return (
    <div style={segmentStyle}>
      <List>
        <List.Item>
          <Icon name="caret right" />
          <List.Content>
            <List.Header>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> by{" "}
              {blog.author}
            </List.Header>
          </List.Content>
        </List.Item>
      </List>
    </div>
  );
};

export default Blog;
