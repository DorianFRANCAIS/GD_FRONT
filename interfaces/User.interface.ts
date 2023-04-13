import React from "react";

export enum RoleEnum {
  Administrator,
  Manager,
  Educator,
  Client,
}

export interface UserInterface {
  id: number;
  role: number;
  name: String;
  firstName: String;
  phoneNumber: String;
  email: String;
  password: String;
  birthDate: Date;
  registerDate: Date;
  lastConnectionDate: Date;
}
