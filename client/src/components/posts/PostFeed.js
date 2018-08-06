import React, { Component } from "react";
import PostItem from "./PostItem";
import PropTypes from "prop-types";

class PostFeed extends Component {
  render() {
    const { posts } = this.props;
    let postItems = posts.map(post => <PostItem key={post._id} post={post} />);
    return <div className="posts">{postItems}</div>;
  }
}
PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostFeed;
