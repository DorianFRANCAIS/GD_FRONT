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

export interface IPutHolidays {
    employee?: string;
    establishment?: string;
    beginDate?: string;
    endDate?: string;
    status?: string;
    isApproved?: boolean;
}

export interface IPostHolidays {
    employee?: string;
    establishment?: string;
    beginDate?: string;
    endDate?: string;
    status?: string;
}