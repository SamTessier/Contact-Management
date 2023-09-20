export const saveSchool = (school, companyId) => {
  let schoolList = JSON.parse(localStorage.getItem("school")) || [];
  let currentId = JSON.parse(localStorage.getItem("currentId")) || 0;
  currentId++;
  localStorage.setItem("currentId", JSON.stringify(currentId));
  const newId = currentId;
  school.id = newId;
  school.companyId = companyId;
  schoolList.push(school);
  localStorage.setItem("school", JSON.stringify(schoolList));
};

export function getSchools(companyId) {
  const schoolList = JSON.parse(localStorage.getItem("school")) || [];
  return schoolList.filter((school) => school.companyId === companyId);
}

export function deleteSchool(schoolId, companyId) {
  let schoolList = JSON.parse(localStorage.getItem("school")) || [];
  schoolList = schoolList.filter((school) => school.id !== schoolId);
  localStorage.setItem("school", JSON.stringify(schoolList));
}

export function updateSchool(updatedSchool, companyId) {
  let schoolList = JSON.parse(localStorage.getItem("school"));
  const index = schoolList.findIndex(
    (school) => school.id === updatedSchool.id && school.companyId === companyId    
  );
  if (index !== -1) {
    schoolList[index] = updatedSchool;
    localStorage.setItem("school", JSON.stringify(schoolList));
  }
}

export const saveStudent = (student, companyId) => {
  let studentList = JSON.parse(localStorage.getItem("students")) || [];
  let currentId = JSON.parse(localStorage.getItem("currentId")) || 0;
  currentId++;
  localStorage.setItem("currentId", JSON.stringify(currentId));
  const newId = currentId;
  student.id = newId;
  student.companyId = companyId;
  studentList.push(student);
  localStorage.setItem("students", JSON.stringify(studentList));
};

export const getStudents = (companyId) => {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  return students.filter((student) => student.companyId === companyId);
};

export const updateStudent = (updatedStudent, companyId) => {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  const index = students.findIndex(
    (student) =>
      student.id === updatedStudent.id && student.companyId === companyId
  );
  if (index !== -1) {
    students[index] = updatedStudent;
    localStorage.setItem("students", JSON.stringify(students));
  }
};

export const deleteStudent = (id, companyId) => {
  let studentList = JSON.parse(localStorage.getItem("students"));
  studentList = studentList.filter(
    (student) => student.id !== id && student.companyId === companyId
  );
  localStorage.setItem("students", JSON.stringify(studentList));
};

export const saveStaff = (staff, companyId) => {
  let staffList = JSON.parse(localStorage.getItem("staff")) || [];
  let currentId = JSON.parse(localStorage.getItem("currentId")) || 0;
  currentId++;
  localStorage.setItem("currentId", JSON.stringify(currentId));
  const newId = currentId;
  staff.id = newId;
  staff.companyId = companyId;
  staffList.push(staff);
  localStorage.setItem("staff", JSON.stringify(staffList));
};

export const getStaff = (companyId) => {
  const staffList = JSON.parse(localStorage.getItem("staff")) || [];
  return staffList.filter((staff) => staff.companyId === companyId);
};

export const deleteStaff = (id, companyId) => {
  let staffList = JSON.parse(localStorage.getItem("staff")) || [];
  staffList = staffList.filter(
    (staff) => staff.id !== id && staff.companyId === companyId
  );
  localStorage.setItem("staff", JSON.stringify(staffList));
};

export const updateStaff = (updatedStaff, companyId) => {
  let staffList = JSON.parse(localStorage.getItem("staff"));
  const index = staffList.findIndex(
    (staff) => staff.id === updatedStaff.id && staff.companyId === companyId
  );
  if (index !== -1) {
    staffList[index] = updatedStaff;
    localStorage.setItem("staff", JSON.stringify(staffList));
  }
};

export const saveUser = (user) => {
  let userList = JSON.parse(localStorage.getItem("users")) || [];
  let currentId = JSON.parse(localStorage.getItem("currentId")) || 0;
  currentId++;
  localStorage.setItem("currentId", JSON.stringify(currentId));
  const newId = currentId;
  user.id = newId;
  userList.push(user);
  localStorage.setItem("users", JSON.stringify(userList));
};



export const getUsers = () => {
  return JSON.parse(localStorage.getItem("users")) || [];
};
