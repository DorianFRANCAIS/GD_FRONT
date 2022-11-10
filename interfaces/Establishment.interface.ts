import { UserInterface } from "./User.interface";

export interface EstablishmentInterface {
  id: Number;
  owner: UserInterface;
  name: String;
  description: String;
  address: String;
  phoneNumber: String;
  emailAddress: String;
}
