/* 
 * Webkäyttöliittymäkirjastot
 * 8. State management (Tehtävät 46-48)
 * 
 * Juha-Pekka Liimatainen 22.11.2019
*/

import React, { useContext, useState } from 'react';
import CourseContext from './CourseContext';
import './index.css';

export default function CourseForm(props) {
  const context = useContext(CourseContext);

  const [course, setCourse] = useState({
    id: context.idCounter,
    name: '',
    description: '',
    ects: '',
  });

  const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    setCourse(course => ({ ...course, [name]: value }));
  }

  const addCourse = () => {
    // save a new course
    context.updateCourses(course);
    // increment counter
    const newValue = course.id + 1;
    context.incrementId(newValue);
    // reset state fields
    setCourse({
      id: newValue,
      name: '',
      description: '',
      ects: '',
    });
    // close the form
    context.closeForm();
  }

  return (
    <form className={props.show ? "show-element" : "hide-element"}>
      <h4>Anna kurssin tiedot</h4>
      <input type="text" name="name" placeholder="Nimi" value={course.name} onChange={(e) => handleChange(e)} />
      <input type="text" name="description" placeholder="Selite" value={course.description} onChange={(e) => handleChange(e)} />
      <input type="text" name="ects" placeholder="Opintopisteet" value={course.ects} onChange={(e) => handleChange(e)} />
      <button type="button" onClick={() => addCourse()}>Tallenna</button>
    </form>
  );
}