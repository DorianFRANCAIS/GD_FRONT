import { UserInterface } from "./User.interface";

export interface AttendanceInterface {
  id: Number;
  educator: UserInterface;
  weekDay: String;
  begin: Number;
  end: Number;
  IsReccurrence: Boolean;
  date: Date | null;
}
