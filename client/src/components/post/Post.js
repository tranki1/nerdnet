import React, { Component } from "react";
import { connect } from "react-redux";
import { getPostById } from "../../actions/postActions";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner/Spinner";
import CommentForm from "../comment/CommentForm";
import CommentFeed from "../comment/CommentFeed";
import PostItem from "../posts/PostItem";
import PropTypes from "prop-types";

class Post extends Component {
  componentDidMount() {
    this.props.getPostById(this.props.match.params.id);
  }

  render() {
    const { post, loading } = this.props.post;
    let postItem;

    if (post === null || loading || Object.keys(post).length === 0) {
      postItem = <Spinner />;
    } else {
      postItem = (
        <div>
          <PostItem post={post} showActions={false} />;
          <CommentForm postId={post._id} />
          <CommentFeed postId={post._id} comments={post.comments} />
        </div>
      );
    }
    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                {" "}
                Back to Feed{" "}
              </Link>
              {postItem}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  getPostById: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPostById }
)(Post);
