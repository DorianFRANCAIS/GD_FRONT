import { IUser } from "./IUser";

export interface IDogs {
  owner: IUser
  nationalId: string,
  name: string,
  imageUrl: string,
  gender: string,
  breed: string,
  birthDate: string,
  weight: number,
  height: number,
}

export interface IPostDog {
  nationalId: string;
  name: string;
  imageUrl: string;
  gender: string;
  breed: string;
  weight: number;
  height: number;
}