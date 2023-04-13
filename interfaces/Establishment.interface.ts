import { UserInterface } from "./User.interface";

export interface EstablishmentInterface {
  id: number;
  ownerId: number;
  name: String;
  description: String;
  adress: String;
  phoneNumber: String;
  email: String;
}
