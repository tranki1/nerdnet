import React, { Component } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  onchangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your NerdNet account
              </p>
              <form
                noValidate
                onSubmit={this.onSubmitHandler}
                action="dashboard.html"
              >
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onchangeHandler}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onchangeHandler}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="row">
                  <input
                    type="submit"
                    className="btn btn-custom btn-info my-2 py-2 px-4 mx-auto "
                    value="LOGIN"
                  />
                </div>
                <div className="row mt-3">
                  <p className=" mx-auto">NEW TO THE NERDNET?</p>
                </div>
                <div className="row">
                  <Link
                    to="/register"
                    className="btn btn-light btn-custom py-2 px-4 mx-auto btn-outline-info"
                  >
                    JOIN NOW
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateProps,
  { loginUser }
)(Login);
