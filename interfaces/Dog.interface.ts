import { UserInterface } from "./User.interface";

export interface DogInterface {
  id: number;
  owner: UserInterface;
  name: string;
  birthDate: Date;
  breed: string;
}
