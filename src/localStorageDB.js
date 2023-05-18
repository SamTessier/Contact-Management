export const saveStaff = (staff) => {
  const staffList = JSON.parse(localStorage.getItem('staff')) || [];
  staffList.push(staff);
  localStorage.setItem('staff', JSON.stringify(staffList));
}

export const getStaff = () => {
  return JSON.parse(localStorage.getItem('staff')) || [];
}

export const saveStudent = (student) => {
  const studentList = JSON.parse(localStorage.getItem('students')) || [];
  studentList.push(student);
  localStorage.setItem('students', JSON.stringify(studentList));
};


export const getStudents = () => {
  return JSON.parse(localStorage.getItem('students')) || [];
}

export const saveSchool = (school) => {
  const schoolList = JSON.parse(localStorage.getItem('schools')) || [];
  schoolList.push(school);
  localStorage.setItem('schools', JSON.stringify(schoolList));
}

export const getSchools = () => {
  return JSON.parse(localStorage.getItem('schools')) || [];
}

export const deleteStudent = (studentName) => {
  const students = getStudents();
  const updatedStudents = students.filter(student => student.name !== studentName);
  localStorage.setItem('students', JSON.stringify(updatedStudents));
};

export const updateStudent = (updatedStudent) => {
  const students = getStudents();
  const updatedStudents = students.map(student =>
    student.name === updatedStudent.name ? updatedStudent : student
  );
  localStorage.setItem('students', JSON.stringify(updatedStudents));
};
