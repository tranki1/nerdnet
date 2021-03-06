import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center headingS">
                <h1 className="net display-3 mb-4 ">
                  <span className="nerd">Nerd</span>
                  Net
                </h1>
                <p className="lead">
                  Create a <span className="font-italic">creative nerd </span>
                  profile, share{" "}
                  <span className="font-italic">creative nerds</span>' ideas and
                  get help from other{" "}
                  <span className="font-italic">creative nerds </span>
                </p>
                <hr />
                <Link
                  to="/register"
                  className="btn btn-lg btn-info mr-2 btn-custom py-2 px-4 "
                >
                  SIGN UP
                </Link>
                <Link
                  to="/login"
                  className="btn btn-lg btn-light btn-custom py-2 px-4"
                >
                  LOGIN
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(Landing);
