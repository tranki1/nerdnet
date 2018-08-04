import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

class CreateProfile extends Component {
  state = {
    displaySocialInputs: false,
    handle: "",
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
    errors: {}
  };

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      //Bring skill array back to csv
      const skillsCVS = profile.skills.join(",");

      //Check if profile doesn't exist, then make empty string
      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.Social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.social.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.social.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";
      profile.social.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";
      profile.social.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";

      //set component fields state
      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCVS,
        githubusername: profile.githubusername,
        bio: profile.bio,
        twitter: profile.socialtwitter,
        facebook: profile.socialfacebook,
        linkedin: profile.sociallinkedin,
        youtube: profile.socialyoutube,
        instagram: profile.socialinstagram
      });
    }
  }

  onSubmitHandler = e => {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    this.props.createProfile(profileData, this.props.history);
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            icon="fab fa-twitter"
            type="text"
            placeholder="Twitter Profile URL"
            name="twitter"
            value={this.state.twitter}
            onChange={this.onChangeHandler}
          />

          <InputGroup
            icon="fab fa-facebook"
            type="text"
            placeholder="Facebook Profile URL"
            name="facebook"
            value={this.state.facebook}
            onChange={this.onChangeHandler}
          />

          <InputGroup
            icon="fab fa-linkedin"
            type="text"
            placeholder="Linkedin Profile URL"
            value={this.state.linkedin}
            name="linkedin"
            onChange={this.onChangeHandler}
          />

          <InputGroup
            icon="fab fa-youtube"
            type="text"
            placeholder="Youtube Profile URL"
            name="youtube"
            value={this.state.youtube}
            onChange={this.onChangeHandler}
          />

          <InputGroup
            icon="fab fa-instagram"
            type="text"
            placeholder="Instagram Profile URL"
            name="instagram"
            value={this.state.instagram}
            onChange={this.onChangeHandler}
          />
        </div>
      );
    }

    //select options for option field
    const options = [
      { label: "* Select Professional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student or Learning", value: "Student or Learning" },
      { label: "Instructor", value: "Instructor" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit profile</h1>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmitHandler}>
                <TextFieldGroup
                  type="text"
                  placeholder="* Profile handle"
                  name="handle"
                  value={this.state.handle}
                  error={errors.handle}
                  onChange={this.onChangeHandler}
                  info=" A unique handle for your profile URL. Your full name,
                company name, nickname, etc This CAN'T be changed later"
                />

                <SelectListGroup
                  options={options}
                  name="status"
                  value={this.state.status}
                  info="Give us an idea of where you are at in your career"
                  error={errors.status}
                  onChange={this.onChangeHandler}
                />

                <TextFieldGroup
                  type="text"
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  error={errors.company}
                  info="Could be your own company or one you work for"
                  onChange={this.onChangeHandler}
                />
                <TextFieldGroup
                  type="text"
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  error={errors.website}
                  info="Could be your own or a company website"
                  onChange={this.onChangeHandler}
                />

                <TextFieldGroup
                  type="text"
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  error={errors.location}
                  info="City and state suggested (eg. Boston, MA)"
                  onChange={this.onChangeHandler}
                />

                <TextFieldGroup
                  type="text"
                  placeholder="Skills"
                  name="skills"
                  value={this.state.skills}
                  error={errors.skills}
                  info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP)"
                  onChange={this.onChangeHandler}
                />

                <TextFieldGroup
                  type="text"
                  placeholder="Github Username"
                  name="githubusername"
                  value={this.state.githubusername}
                  error={errors.githubusername}
                  info="If you want your latest repos and a Github link, include
                  your username"
                  onChange={this.onChangeHandler}
                />
                <TextAreaFieldGroup
                  placeholder="A short bio of yourself"
                  name="bio"
                  error={errors.bio}
                  value={this.state.bio}
                  info="Tell us a little about yourself"
                  onChange={this.onChangeHandler}
                />

                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => {
                      this.setState(preState => ({
                        displaySocialInputs: !preState.displaySocialInputs
                      }));
                    }}
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>

                {socialInputs}

                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                  onSubmit={this.onSubmitHandler}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(CreateProfile));
