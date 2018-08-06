import React, { Component } from "react";
import { connect } from "react-redux";
import Proptypes from "prop-types";
import PostForm from "./PostForm";
import Spinner from "../common/Spinner/Spinner";

class Posts extends Component {
  render() {
    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Posts;
