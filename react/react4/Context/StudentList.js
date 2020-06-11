/* 
 * Webkäyttöliittymäkirjastot
 * 8. State management (Tehtävät 46-48)
 * 
 * Juha-Pekka Liimatainen 22.11.2019
*/

import React, { useContext } from 'react';
import StudentContext from './StudentContext';
import './index.css';

export default function StudentList(props) {
  const context = useContext(StudentContext);

  return (
    <div>
      {context.studentData.length > 0 && props.show ?
        <table>
          <TableHeader />
          <TableBody />
        </table> :
        null
      }
    </div>
  );
}

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Id</th><th>Nimi</th><th>Aloitusvuosi</th>
      </tr>
    </thead>
  );
}

const TableBody = () => {
  const context = useContext(StudentContext);

  return (
    <tbody>
      {context.studentData.map((student, index) => <TableRow key={student.id} data={student} />)}
    </tbody>
  );
}

const TableRow = (props) => {
  const context = useContext(StudentContext);
  const { id, name, startYear } = props.data;
  const deleteBtnStyle = {
    backgroundColor: 'red',
    borderRadius: '7px',
  };

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{startYear}</td>
      <td><button style={deleteBtnStyle} type="button" onClick={() => context.removeStudent(id) }>Poista</button></td>
    </tr>
  );
}