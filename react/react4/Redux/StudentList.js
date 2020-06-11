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
import { connect } from 'react-redux';
import { removeStudent } from './actions';
import './index.css';
import './custom.css';

const mapStateToProps = state => {
  return {
    students: state.students,
    showCourseForm: state.showCourseForm,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    removeStudent: studentId => dispatch(removeStudent(studentId))
  };
}

const ConnectedList = props => {
  return (
    <div className={!props.showCourseForm && props.students.length > 0 ? "show-element" : "hide-element"}>
      <table>
        <TableHeader />
        <TableBody data={props.students} />
      </table>
    </div>
  );
};

const TableHeader = () => {
  const columnHeaders = ['Id', 'Nimi', 'Aloitusvuosi', ''];

  return (
    <thead>
      <tr>
        {columnHeaders.map((item, index) => <th key={index}>{item}</th>)}
      </tr>
    </thead>
  );
}

const TableBody = (props) => {
  const students = props.data;

  return (
    <tbody>
      {students.map((student, index) => <TableRow key={student.id} data={student} />)}
    </tbody>
  );
}

const TableRowConnected = (props) => {
  const { id, name, startYear } = props.data;
  const deleteBtnStyle = {
    backgroundColor: 'red',
    borderRadius: '7px',
  };

  const deleteStudent = (id) => {
    // save a new student
    props.removeStudent(id);
  }

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{startYear}</td>
      <td><button style={deleteBtnStyle} type="button" onClick={() => deleteStudent(id)}>Poista</button></td>
    </tr>
  );
}

const TableRow = connect(null, mapDispatchToProps)(TableRowConnected);
const StudentList = connect(mapStateToProps)(ConnectedList);

export default StudentList;