/* 
 * Webkäyttöliittymäkirjastot
 * 8. State management (Tehtävät 46-48)
 * 
 * Juha-Pekka Liimatainen 22.11.2019
*/

import React, { useContext, useState } from 'react';
import CourseContext from './CourseContext';
import StudentContext from './StudentContext';
import './index.css';

export default function StudentForm(props) {
  const courseContext = useContext(CourseContext);
  const studContext = useContext(StudentContext);

  const [student, setStudent] = useState({
    id: studContext.idCounter,
    name: '',
    startYear: '',
  });

  const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    setStudent(student => ({ ...student, [name]: value }));
  }

  const addStudent = () => {
    // save a new student
    studContext.updateStudents(student);
    // increment counter
    const newValue = student.id + 1;
    studContext.incrementId(newValue);
    // reset state fields
    setStudent({
      id: newValue,
      name: '',
      startYear: '',
    });
  }

  return (
    <form className={props.show ? "show-element" : "hide-element"}>
      <h4>Anna opiskelijan tiedot</h4>
      <input type="text" name="name" placeholder="Nimi" value={student.name} onChange={(e) => handleChange(e)} />
      <input type="text" name="startYear" placeholder="Aloitusvuosi" value={student.startYear} onChange={(e) => handleChange(e)} />
      <button type="button" onClick={() => addStudent()}>Tallenna</button>
      {courseContext.courseData.length > 0 ?
        <select>
          {courseContext.courseData.map((course, i) => <CourseOption key={course.id} data={course} />)}
        </select> : 
        null
      }
    </form>
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