/* 
 * Webkäyttöliittymäkirjastot
 * 8. State management (Tehtävät 49-51)
 * 
 * Vaatii redux ja react-redux -asennukset
 * (npm i redux/react-redux --save)
 * 
 * Juha-Pekka Liimatainen 26.11.2019
*/

import { ADD_STUDENT, REMOVE_STUDENT, ADD_COURSE, TOGGLE_COURSE_FORM } from './action-types';

export function addStudent(payload) {
  return { type: ADD_STUDENT, payload };
}

export function removeStudent(payload) {
  return { type: REMOVE_STUDENT, payload };
}

export function addCourse(payload) {
  return { type: ADD_COURSE, payload };
}

export function toggleCourseForm(payload) {
  return { type: TOGGLE_COURSE_FORM, payload };
}