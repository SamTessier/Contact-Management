export function saveSchool(school) {
  let schools = getSchools();
  const highestId = Math.max(...schools.map((school) => school.id), 0);
  const newId = highestId + 1;
  const schoolWithId = { id: newId, ...school };
  schools.push(schoolWithId);
  localStorage.setItem("schools", JSON.stringify(schools));
}

export function getSchools() {
  const schools = JSON.parse(localStorage.getItem("schools"));
  return schools ? schools : [];
}

export function deleteSchool(schoolId) {
  let schools = getSchools();
  const updatedSchools = schools.filter((school) => school.id !== schoolId);
  localStorage.setItem("schools", JSON.stringify(updatedSchools));
}

export function updateSchool(updatedSchool) {
  let schools = getSchools();
  const index = schools.findIndex((school) => school.id === updatedSchool.id);
  if (index !== -1) {
    schools[index] = updatedSchool;
    localStorage.setItem("schools", JSON.stringify(schools));
  }
}


export const saveStudent = (student) => {
  const studentList = JSON.parse(localStorage.getItem("students")) || [];
  studentList.push(student);
  localStorage.setItem("students", JSON.stringify(studentList));
};

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
    student.name === updatedStudent.name ? updatedStudent : student
  );
  localStorage.setItem("students", JSON.stringify(updatedStudents));
};

export const deleteStudent = (studentName) => {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  const companyId = localStorage.getItem("companyId");
  const filteredStudents = students.filter(
    (student) => student.companyId === companyId
  );
  const updatedStudents = filteredStudents.filter(
    (student) => student.name !== studentName
  );
  localStorage.setItem("students", JSON.stringify(updatedStudents));
};

export const saveStaff = (staff) => {
  let staffList = JSON.parse(localStorage.getItem("staff"));
  if (!staffList) {
    staffList = [];
  }

  // Generate new ID
  const newId =
    staffList.length > 0 ? staffList[staffList.length - 1].id + 1 : 1;
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
  console.log("updating staff");
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
