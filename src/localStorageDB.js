
export const saveStudent = (student) => {
  const studentList = JSON.parse(localStorage.getItem('students')) || [];
  studentList.push(student);
  localStorage.setItem('students', JSON.stringify(studentList));
};


export const getStudents = () => {
  const students = JSON.parse(localStorage.getItem('students')) || [];
  const companyId = localStorage.getItem('companyId');
  return students.filter(student => student.companyId === companyId);
}

export const saveSchool = (school) => {
  const schoolList = JSON.parse(localStorage.getItem('schools')) || [];
  schoolList.push(school);
  localStorage.setItem('schools', JSON.stringify(schoolList));
}

export const getSchools = () => {
  return JSON.parse(localStorage.getItem('schools')) || [];
}

export const updateStudent = (updatedStudent) => {
  const students = JSON.parse(localStorage.getItem('students')) || [];
  const companyId = localStorage.getItem('companyId');
  const filteredStudents = students.filter(student => student.companyId === companyId);
  const updatedStudents = filteredStudents.map(student =>
    student.name === updatedStudent.name ? updatedStudent : student
  );
  localStorage.setItem('students', JSON.stringify(updatedStudents));
};

export const deleteStudent = (studentName) => {
  const students = JSON.parse(localStorage.getItem('students')) || [];
  const companyId = localStorage.getItem('companyId');
  const filteredStudents = students.filter(student => student.companyId === companyId);
  const updatedStudents = filteredStudents.filter(student => student.name !== studentName);
  localStorage.setItem('students', JSON.stringify(updatedStudents));
};


export const saveStaff = (staff) => {
  let staffList = JSON.parse(localStorage.getItem("staff"));
  if (!staffList) {
    staffList = [];
  }
  
  // Generate new ID
  const newId = staffList.length > 0 ? staffList[staffList.length - 1].id + 1 : 1;
  staff.id = newId;

  staffList.push(staff);
  localStorage.setItem("staff", JSON.stringify(staffList));
};


export const getStaff = () => {
  const staffList = JSON.parse(localStorage.getItem("staff"));
  return staffList ? staffList : [];
};

export const deleteStaff = (id) => {
  let staffList = JSON.parse(localStorage.getItem("staff"));
  staffList = staffList.filter((staff) => staff.id !== id);
  localStorage.setItem("staff", JSON.stringify(staffList));
};


export const updateStaff = (updatedStaff) => {
  console.log("updating staff")
  let staffList = JSON.parse(localStorage.getItem("staff"));
  const index = staffList.findIndex((staff) => staff.id === updatedStaff.id);
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
