/* 
 * Webkäyttöliittymäkirjastot
 * 8. State management (Tehtävät 46-48)
 * 
 * Juha-Pekka Liimatainen 22.11.2019
*/

import React, { useState } from 'react';
import { StudentProvider } from './StudentContext';
import { CourseProvider } from './CourseContext';
import CourseForm from './CourseForm';
import StudentForm from './StudentForm';
import StudentList from './StudentList';
import './index.css';
import './custom.css';

const StudentApp = () => {
  const [students, setStudents] = useState([]);
  const [studentIdCounter, setStudentIdCounter] = useState(1);
  const [courses, setCourses] = useState([]);
  const [courseIdCounter, setCourseIdCounter] = useState(1);
  const [showCourseForm, toggleCourseForm] = useState(false);

  return (
    <div>
      <div className={!showCourseForm ? "show-element" : "hide-element"}>
        <button className="insert-button" type="button" onClick={() => { toggleCourseForm(true) }}>Lisää opintojakso</button>
      </div>
      <StudentProvider value={
        {
          studentData: students,
          updateStudents: (student) => {
            setStudents([...students, student]);
          },
          removeStudent: (id) => {
            const studentsNew = students.filter(function (value, index, arr) {
              return value.id !== id; // filter all but the removed student
            });
            // update students array
            setStudents(studentsNew);
          },
          idCounter: studentIdCounter,
          incrementId: (newValue) => {
            setStudentIdCounter(newValue);
          }
        }
      }>
        <CourseProvider value={
          {
            courseData: courses
          }
        }>
          <StudentForm show={!showCourseForm} />
        </CourseProvider>
        <StudentList show={!showCourseForm} />
      </StudentProvider>

      <CourseProvider value={
        {
          courseData: courses,
          updateCourses: (course) => {
            setCourses([...courses, course]);
          },
          idCounter: courseIdCounter,
          incrementId: (newValue) => {
            setCourseIdCounter(newValue);
          },
          closeForm: () => {
            toggleCourseForm(false);
          }
        }
      }>
        <CourseForm show={showCourseForm} />
      </CourseProvider>
    </div>
  );
}

export default StudentApp;