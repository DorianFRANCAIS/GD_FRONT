import { IEstablishments } from "./IEstablishments";
import { IUser } from "./IUser";

export interface IHolidays {
    _id: string;
    employee: IUser;
    establishment: IEstablishments;
    beginDate: string;
    endDate: string;
    status: string;
    isApproved: boolean;
}