import { IActivity } from "./IActivity";
import { IEstablishments } from "./IEstablishments";

export interface IUser {
  activities: [string],
  establishments: IEstablishments[],
  _id: string,
  lastname: string,
  firstname: string,
  avatarUrl: string,
  role: string,
  emailAddress: string,
  password: string,
  registeredAt: string,
  lastConnectionAt: string,
}

export interface INewUser {
  lastname: string;
  firstname: string;
  avatarUrl?: string;
  role?: 'Client';
  emailAddress: string;
  phoneNumber: string;
  password: string;
  birthDate: string;
  stripeId?: string;
}