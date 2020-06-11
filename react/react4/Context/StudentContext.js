/* 
 * Webkäyttöliittymäkirjastot
 * 8. State management (Tehtävät 46-48)
 * 
 * Juha-Pekka Liimatainen 22.11.2019
*/

import React from 'react';

// create a context for student data
const StudentContext = React.createContext();

export const StudentProvider = StudentContext.Provider;
export default StudentContext;