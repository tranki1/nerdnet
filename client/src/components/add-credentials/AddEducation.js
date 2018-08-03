import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addEducation } from "../../actions/profileActions";

class AddEducation extends Component {
  state = {
    school: "",
    degree: "",
    fieldofstudy: "",
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
    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description,
      errors: this.state.errors,
      disabled: this.state.disabled
    };

    this.props.addEducation(eduData, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="section add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Your Education</h1>
              <p className="lead text-center">
                Add any school, bootcamp, etc that you have attended
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmitHandler}>
                <TextFieldGroup
                  placeholder="* School"
                  name="school"
                  value={this.state.school}
                  error={errors.school}
                  onChange={this.onChangeHandler}
                />

                <TextFieldGroup
                  placeholder="* Degree"
                  name="degree"
                  value={this.state.degree}
                  error={errors.degree}
                  onChange={this.onChangeHandler}
                />

                <TextFieldGroup
                  placeholder="Field of study"
                  name="fieldofstudy"
                  value={this.state.fieldofstudy}
                  errors={errors.fieldofstudy}
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
                  <label className="form-check-label" htmlFor="current">
                    Current study
                  </label>
                </div>

                <TextAreaFieldGroup
                  placeholder="Description"
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

AddEducation.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addEducation }
)(withRouter(AddEducation));
