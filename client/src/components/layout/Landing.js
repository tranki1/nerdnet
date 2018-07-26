import React, { Component } from "react";

class Landing extends Component {
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
                <a href="register.html" className="btn btn-lg btn-info mr-2">
                  Sign Up
                </a>
                <a href="login.html" className="btn btn-lg btn-light">
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
