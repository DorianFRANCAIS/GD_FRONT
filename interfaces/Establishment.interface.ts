import React from "react";
import { UserInterface } from "./User.interface";

export interface EstablishmentInterface {
  id: React.Key;
  owner: UserInterface;
  name: String;
  description: String | null;
  address: String;
  phoneNumber: String;
  emailAddress: String;
}
