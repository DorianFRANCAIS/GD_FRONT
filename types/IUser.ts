import { IActivity } from "./IActivity";
import { IEstablishments } from "./IEstablishments";

export interface IUser {
  activities: IActivity[];
  establishments?: [string];
  _id: string;
  lastname: string;
  firstname: string;
  avatarUrl: string;
  phoneNumber: string;
  role: string;
  emailAddress: string;
  password: string;
  registeredAt: string;
  lastConnectionAt: string;
  birthDate: string;
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