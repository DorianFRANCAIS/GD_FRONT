import { IActivity } from "@/types/IActivity";
import { IEstablishments } from "./IEstablishments";
import { IUser } from "./IUser";

export interface ISession {
  _id: string
  title: string;
  educator: IUser;
  activity: IActivity;
  establishment: IEstablishments;
  status: string;
  maximumCapacity: number;
  beginDate: string;
  endDate: string;
  report: string;
}

export interface IPostSession {
  educator: string;
  activity: string;
  establishment: string;
  status: string;
  maximumCapacity: number;
  beginDate: string;
}

export interface IPutSession {
  _id?: string;
  educator?: string;
  activity?: string;
  status?: string;
  maximumCapacity?: number;
  report?: string;
  beginDate?: string;
  endDate?: string;
}
export interface IDailySession {
  today: [{
    educator: string;
    activity: IActivity;
    establishment: string;
    status: "Pending" | "Confirmed" | "Cancelled";
    maximumCapacity: number;
    beginDate: string;
    endDate: string;
  }]
}

export interface ISessionReport {
  report: string;
}