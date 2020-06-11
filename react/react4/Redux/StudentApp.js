/* 
 * Webkäyttöliittymäkirjastot
 * 8. State management (Tehtävät 49-51)
 * 
 * Vaatii redux ja react-redux -asennukset
 * (npm i redux/react-redux --save)
 * 
 * Juha-Pekka Liimatainen 26.11.2019
*/

import React from 'react';
import CourseForm from './CourseForm';
import StudentForm from './StudentForm';
import StudentList from './StudentList';
import './index.css';
import './custom.css';

const StudentApp = () => (
  <div>
    <CourseForm />
    <StudentForm />
    <StudentList />
  </div>
);

export default StudentApp;