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

const initialState = {
  studentIdCounter: 1,
  courseIdCounter: 1,
  showCourseForm: false,
  students: [],
  courses: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_STUDENT:
      return Object.assign({}, state, {
        students: state.students.concat(action.payload.student),
        studentIdCounter: state.studentIdCounter++,
      });
    case REMOVE_STUDENT:
      return Object.assign({}, state, {
        students: state.students.filter(function (value, index, arr) {
          return value.id !== action.payload; // filter all but the removed student
        }),
      });
    case ADD_COURSE:
      return Object.assign({}, state, {
        courses: state.courses.concat(action.payload.course),
        courseIdCounter: state.courseIdCounter++,
      });
    case TOGGLE_COURSE_FORM:
      return Object.assign({}, state, {
        showCourseForm: action.payload,
      });
    default:
      break;
  }

  return state;
}

export default rootReducer;