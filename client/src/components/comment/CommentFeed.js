import React, { Component } from "react";
import PropTypes from "prop-types";
import CommentItem from "./CommentItem";

class CommentFeed extends Component {
  render() {
    const { comments, postId } = this.props;
    let commentItems = comments.map(comment => (
      <CommentItem key={comment._id} comment={comment} postId={postId} />
    ));
    return <div className="comments">{commentItems}</div>;
  }
}
CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired
};

export default CommentFeed;
