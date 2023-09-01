export type School = {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  contactPerson: string;
  notes: string;
};

export type Staff = {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  school: string;
  contactPerson: string;
  notes: string;
};

export type Student = {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  school: string;
  contactPerson: string;
  notes: string;
};
