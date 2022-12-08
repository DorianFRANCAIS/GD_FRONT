import { ActivityTypeInterface } from "./ActivityType.interface";
import { UserInterface } from "./User.interface";

export interface SessionInterface {
  id: Number;
  educator: UserInterface;
  activityType: ActivityTypeInterface;
  report: String;
  beginDate: Date;
  endDate: Date;
}
