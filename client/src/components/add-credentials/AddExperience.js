import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addExperience } from "../../actions/profileActions";

class AddExperience extends Component {
  state = {
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
    errors: {},
    disabled: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onCheckHandler = e => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    const expData = {
      title: this.state.title,
      company: this.state.company,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description,
      errors: this.state.errors,
      disabled: this.state.disabled
    };

    this.props.addExperience(expData, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="section add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Your Experience</h1>
              <p className="lead text-center">
                Add any developer/programming positions that you have had in the
                past
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmitHandler}>
                <TextFieldGroup
                  placeholder="* Job Title"
                  name="title"
                  value={this.state.title}
                  error={errors.title}
                  onChange={this.onChangeHandler}
                />

                <TextFieldGroup
                  placeholder="* Company"
                  name="company"
                  value={this.state.company}
                  error={errors.company}
                  onChange={this.onChangeHandler}
                />

                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  errors={errors.location}
                  onChange={this.onChangeHandler}
                />

                <h6>From Date</h6>
                <TextFieldGroup
                  type="date"
                  placeholder="from"
                  name="from"
                  value={this.state.from}
                  error={errors.from}
                  onChange={this.onChangeHandler}
                />

                <h6>To Date</h6>
                <TextFieldGroup
                  type="date"
                  placeholder="to"
                  name="to"
                  value={this.state.to}
                  error={errors.to}
                  onChange={this.onChangeHandler}
                  disabled={this.state.disabled ? "disabled" : ""}
                />

                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="current"
                    value={this.state.current}
                    error={errors.current}
                    onChange={this.onCheckHandler}
                    checked={this.state.current}
                    id="current"
                  />
                  <label className="form-check-label" for="current">
                    Current Job
                  </label>
                </div>

                <TextAreaFieldGroup
                  placeholder="Job Description"
                  name="description"
                  info="Some of your responsibilities, etc"
                  value={this.state.description}
                  errors={errors.description}
                  onChange={this.onChangeHandler}
                />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddExperience.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addExperience: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addExperience }
)(withRouter(AddExperience));
