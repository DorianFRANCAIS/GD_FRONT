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