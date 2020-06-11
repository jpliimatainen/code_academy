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
import { addStudent } from './actions';
import { toggleCourseForm } from './actions';
import './index.css';
import './custom.css';

const mapStateToProps = state => {
  return {
    counter: state.studentIdCounter,
    showCourseForm: state.showCourseForm,
    courses: state.courses,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    addStudent: student => dispatch(addStudent(student)),
    toggleCourseForm: flag => dispatch(toggleCourseForm(flag)),
  };
}

const ConnectedForm = props => {
  const [student, setStudent] = useState({
    id: props.counter,
    name: '',
    startYear: '',
  });

  const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    setStudent(student => ({ ...student, [name]: value }));
  }

  const saveStudent = () => {
    // save a new student
    props.addStudent({ student });
    // increment counter
    const newValue = student.id + 1;
    // reset state fields
    setStudent({
      id: newValue,
      name: '',
      startYear: '',
    });
  }

  const displayCourseForm = () => {
    // show course form
    props.toggleCourseForm(true);
  }

  return (
    <div className={!props.showCourseForm ? "show-element" : "hide-element"}>
      <div>
        <button className="insert-button" type="button"
          onClick={() => displayCourseForm()}>Lisää opintojakso</button>
      </div>
      <h4>Anna opiskelijan tiedot</h4>
      <form>
        <input type="text" name="name" placeholder="Nimi" value={student.name}
          onChange={(e) => handleChange(e)} />
        <input type="text" name="startYear" placeholder="Aloitusvuosi" value={student.startYear}
          onChange={(e) => handleChange(e)} />
        <button type="button" onClick={() => saveStudent()}>Tallenna</button>
        <select className={props.courses.length > 0 ? "show-element" : "hide-element"}>
          {props.courses.map((course, i) => <CourseOption key={course.id} data={course} />)}
        </select>
      </form>
    </div>
  );
}

const CourseOption = (props) => {
  const { id, name, description, ects } = props.data;

  return (
    <option value={id}>
      Id: {id}, Nimi: {name}, Selite: {description}, Opintopisteet: {ects}
    </option>
  );
}

const StudentForm = connect(mapStateToProps, mapDispatchToProps)(ConnectedForm);

export default StudentForm;