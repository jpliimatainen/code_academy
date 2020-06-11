/* 
 * Webkäyttöliittymäkirjastot
 * 8. State management (Tehtävät 49-51)
 * 
 * Vaatii redux ja react-redux -asennukset
 * (npm i redux/react-redux --save)
 * 
 * Juha-Pekka Liimatainen 26.11.2019
*/

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addCourse, toggleCourseForm } from './actions';
import './index.css';
import './custom.css';

const mapStateToProps = state => {
  return {
    counter: state.studentIdCounter,
    showCourseForm: state.showCourseForm,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    addCourse: course => dispatch(addCourse(course)),
    toggleCourseForm: flag => dispatch(toggleCourseForm(flag))
  };
}

const ConnectedForm = props => {
  const [course, setCourse] = useState({
    id: props.counter,
    name: '',
    description: '',
    ects: '',
  });

  const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    setCourse(course => ({ ...course, [name]: value }));
  }

  const saveCourse = () => {
    // save a new course
    props.addCourse({ course });
    // hide course form
    props.toggleCourseForm(false);
    // increment counter
    const newValue = course.id + 1;
    // reset state fields
    setCourse({
      id: newValue,
      name: '',
      description: '',
      ects: '',
    });
  }

  return (
    <div className={props.showCourseForm ? "show-element" : "hide-element"}>
      <h4>Anna kurssin tiedot</h4>
      <form>
        <input type="text" name="name" placeholder="Nimi" value={course.name}
          onChange={(e) => handleChange(e)} />
        <input type="text" name="description" placeholder="Selite" value={course.description}
          onChange={(e) => handleChange(e)} />
        <input type="text" name="ects" placeholder="Opintopisteet" value={course.ects}
          onChange={(e) => handleChange(e)} />
        <button type="button" onClick={() => saveCourse()}>Tallenna</button>
      </form>
    </div>
  );
}

const CourseForm = connect(mapStateToProps, mapDispatchToProps)(ConnectedForm);

export default CourseForm;