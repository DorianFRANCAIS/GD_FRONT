import { UserInterface } from "./User.interface";

export interface DogInterface {
  id: Number;
  owner: UserInterface;
  name: String;
  birthDate: Date;
  breed: String;
}
