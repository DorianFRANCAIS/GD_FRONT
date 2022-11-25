enum RoleEnum {
  Administrator,
  Manager,
  Educator,
  Client,
}

export interface UserInterface {
  id: Number;
  role: RoleEnum;
  name: String;
  firstName: String;
  phoneNumber: String;
  email: String;
  password: String;
  birthDate: Date;
  registerDate: Date;
  lastConnectionDate: Date;
}
