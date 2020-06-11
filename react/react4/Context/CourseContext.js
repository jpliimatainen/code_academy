/* 
 * Webkäyttöliittymäkirjastot
 * 8. State management (Tehtävät 46-48)
 * 
 * Juha-Pekka Liimatainen 22.11.2019
*/

import React from 'react';

// create a context for course data
const CourseContext = React.createContext();

export const CourseProvider = CourseContext.Provider;
export default CourseContext;