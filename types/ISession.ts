import { IActivity } from "@/types/IActivity";

export interface ISession {
  educator: string;
  activity: IActivity;
  establishment: string;
  status: "Pending" | "Confirmed" | "Cancelled";
  maximumCapacity: number;
  beginDate: string;
  endDate: string;
}

export interface IPostSession {
  educator: string;
  activity: string;
  establishment: string;
  status: string;
  maximumCapacity: number;
  beginDate: string;
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