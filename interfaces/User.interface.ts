enum RoleEnum {
  Administrator,
  Manager,
  Educator,
  Client,
}

export interface UserInterface {
  id: Number;
  role: RoleEnum;
  lastName: String;
  firstName: String;
  phoneNumber: String;
  emailAddress: String;
  password: String;
  birthDate: Date;
  registerDate: Date;
  lastConnectionDate: Date;
}
