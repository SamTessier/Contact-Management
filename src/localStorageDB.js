export const saveSchool = (school) => {
  let schoolList = JSON.parse(localStorage.getItem("school")) || [];
  let currentId = JSON.parse(localStorage.getItem("currentId")) || 0;
  currentId++;
  localStorage.setItem("currentId", JSON.stringify(currentId));
  const newId = currentId;
  school.id = newId;
  schoolList.push(school);
  localStorage.setItem("school", JSON.stringify(schoolList))
}

export function getSchools() {
  const schoolList = JSON.parse(localStorage.getItem("school"));
  return schoolList ? schoolList : [];
}

export function deleteSchool(schoolId) {
  let schoolList = JSON.parse(localStorage.getItem("school"));
  schoolList = schoolList.filter((school) => school.id !== schoolId);
  localStorage.setItem("school", JSON.stringify(schoolList));
}

export function updateSchool(updatedSchool) {
  let schoolList = JSON.parse(localStorage.getItem("school"));
  const index = schoolList.findIndex(
    (school) => school.id === updatedSchool.id
  );
  if (index !== -1) {
    schoolList[index] = updatedSchool;
    localStorage.setItem("school", JSON.stringify(schoolList));
  }
}

export const saveStudent = (student) => {
  let studentList = JSON.parse(localStorage.getItem("students")) || [];
  let currentId = JSON.parse(localStorage.getItem("currentId")) || 0;
  currentId++;
  localStorage.setItem("currentId", JSON.stringify(currentId));
  const newId = currentId;
  student.id = newId;
  studentList.push(student);
  localStorage.setItem("students", JSON.stringify(studentList))
}

export const getStudents = () => {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  const companyId = localStorage.getItem("companyId");
  return students.filter((student) => student.companyId === companyId);
};

export const updateStudent = (updatedStudent) => {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  const companyId = localStorage.getItem("companyId");
  const filteredStudents = students.filter(
    (student) => student.companyId === companyId
  );
  const updatedStudents = filteredStudents.map((student) =>
    student.id === updatedStudent.id ? updatedStudent : student
  );
  localStorage.setItem("students", JSON.stringify(updatedStudents));
};

export const deleteStudent = (studentId) => {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  const companyId = localStorage.getItem("companyId");
  const filteredStudents = students.filter(
    (student) => student.companyId === companyId
  );
  const updatedStudents = filteredStudents.filter(
    (student) => student.id !== studentId
  );
  localStorage.setItem("students", JSON.stringify(updatedStudents));
};

export const saveStaff = (staff) => {
  let staffList = JSON.parse(localStorage.getItem("staff")) || [];
  let currentId = JSON.parse(localStorage.getItem("currentId")) || 0;
  currentId++;
  localStorage.setItem("currentId", JSON.stringify(currentId));
  const newId = currentId;
  staff.id = newId;
  staffList.push(staff);
  localStorage.setItem("staff", JSON.stringify(staffList))
}

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
  let staffList = JSON.parse(localStorage.getItem("staff"));
  const index = staffList.findIndex((staff) => staff.id === updatedStaff.id);
  if (index !== -1) {
    staffList[index] = updatedStaff;
    localStorage.setItem("staff", JSON.stringify(staffList));
  }
};

export const saveUser = (user) => {
  const userList = JSON.parse(localStorage.getItem("users")) || [];
  userList.push(user);
  localStorage.setItem("users", JSON.stringify(userList));
};

export const getUsers = () => {
  return JSON.parse(localStorage.getItem("users")) || [];
};
