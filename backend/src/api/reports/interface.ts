    import { Document, Types } from "mongoose";

    export enum ReportCategory {
        Fraud = "fraud",
        Spam = "spam",
        Sell = "sell",
        Bug = "bug",
        Misconduct = "misconduct"
    }

    export enum ReportStatus {
        Solved = "solved",
        Pending = "pending"
    }


    export interface IReport extends Document{
        _id: Types.ObjectId;
        category: ReportCategory;
        url?: string;
        description: string;
        userId: Types.ObjectId;
        createdAt: string;
        status: ReportStatus;
    }

    export interface ReportCreateFields extends Omit<IReport, "_id" | "createdAt">{}

    export interface ReportUpdateFields {
        category?: ReportCategory;
        url?: string;
        description?: string;
        status?: ReportStatus;
    }