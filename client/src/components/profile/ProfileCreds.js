import React, { Component } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

class ProfileCreds extends Component {
  render() {
    const { experience, education } = this.props;

    const experiences = experience.map(exp => (
      <li className="list-group-item" key={exp._id}>
        <h4>{exp.school}</h4>
        <p>
          <Moment format="MMM YYYY">{exp.from}</Moment> -{" "}
          {exp.to === null ? (
            " Current"
          ) : (
            <Moment format="MMM YYYY">{exp.to}</Moment>
          )}
        </p>
        <p>
          <strong>Position:</strong> {exp.title}
        </p>
        <p>
          {exp.description === "" ? null : (
            <span>
              <strong>Description:</strong> {exp.description}
            </span>
          )}
        </p>
      </li>
    ));

    const educations = education.map(edu => (
      <li className="list-group-item" key={edu._id}>
        <h4>{edu.company}</h4>
        <p>
          <Moment format="MMM YYYY">{edu.from}</Moment> -{" "}
          {edu.to === null ? (
            " Current"
          ) : (
            <Moment format="MMM YYYY">{edu.to}</Moment>
          )}
        </p>
        <p>
          <strong>Position:</strong> {edu.degree}
        </p>
        <p>
          {edu.description === "" ? null : (
            <span>
              <strong>Description:</strong> {edu.description}
            </span>
          )}
        </p>
      </li>
    ));
    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          {experiences.length > 0 ? (
            <ul className="list-group"> {experiences}</ul>
          ) : (
            <p className="text-center">No experience listed</p>
          )}
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          {educations.length > 0 ? (
            <ul className="list-group"> {educations}</ul>
          ) : (
            <p className="text-center">No education listed</p>
          )}
        </div>
      </div>
    );
  }
}
ProfileCreds.propTypes = {
  education: PropTypes.object.isRequired,
  experience: PropTypes.object.isRequired
};
export default ProfileCreds;
