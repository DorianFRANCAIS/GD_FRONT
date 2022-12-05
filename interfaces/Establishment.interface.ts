import { UserInterface } from "./User.interface";

export interface EstablishmentInterface {
  id: number;
  owner: UserInterface;
  name: String;
  description: String | null;
  address: String;
  phoneNumber: String;
  emailAddress: String;
}
