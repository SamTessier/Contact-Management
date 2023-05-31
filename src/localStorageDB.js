
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

export const saveStaff = (staff) => {
  let staffList = JSON.parse(localStorage.getItem("staff"));
  if (!staffList) {
    staffList = [];
  }
  staffList.push(staff);
  localStorage.setItem("staff", JSON.stringify(staffList));
};

export const getStaff = () => {
  const staffList = JSON.parse(localStorage.getItem("staff"));
  return staffList ? staffList : [];
};

export const deleteStaff = (name) => {
  let staffList = JSON.parse(localStorage.getItem("staff"));
  staffList = staffList.filter((staff) => staff.name !== name);
  localStorage.setItem("staff", JSON.stringify(staffList));
};

export const updateStaff = (updatedStaff) => {
  let staffList = JSON.parse(localStorage.getItem("staff"));
  const index = staffList.findIndex((staff) => staff.name === updatedStaff.name);
  if (index !== -1) {
    staffList[index] = updatedStaff;
    localStorage.setItem("staff", JSON.stringify(staffList));
  }
};

export const saveUser = (user) => {
  const userList = JSON.parse(localStorage.getItem('users')) || [];
  userList.push(user);
  localStorage.setItem('users', JSON.stringify(userList));
};

export const getUsers = () => {
  return JSON.parse(localStorage.getItem('users')) || [];
};
