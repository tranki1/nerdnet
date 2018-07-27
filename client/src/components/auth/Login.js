import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";
import { Link } from "react-router-dom";
class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  onchangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    const newUser = {
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post("api/users/login", newUser)
      .then(res => console.log(res.data))
      .catch(err => this.setState({ errors: err.response.data }));
  };
  render() {
    const errors = this.state.errors;

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

export default Login;
