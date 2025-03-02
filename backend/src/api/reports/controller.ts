import { Request, Response } from "express";
import HTTP_STATUS from "../../constants/HttpStatus";
import ReportService from "./service";
import apiResponse from "../../utils/apiResponse.utils";

export default class ReportController {
    static async createReport(req: Request, res: Response) {
        try {
            const newReport = await ReportService.createReport(req.body);
            res.status(HTTP_STATUS.CREATED).json(apiResponse(true, newReport));
        } catch (err: any) {
            res.status(err.status || HTTP_STATUS.SERVER_ERROR)
               .json(apiResponse(false, err));
        }
    }

    static async getReport(req: Request, res: Response) {
        try {
            const report = await ReportService.getReportById(req.params.id);
            res.status(HTTP_STATUS.OK).json(apiResponse(true, report));
        } catch (err: any) {
            res.status(err.status || HTTP_STATUS.SERVER_ERROR)
               .json(apiResponse(false, err));
        }
    }

    static async updateReport(req: Request, res: Response) {
        try {
            const updatedReport = await ReportService.updateReport(req.params.id, req.body);
            res.status(HTTP_STATUS.OK).json(apiResponse(true, updatedReport));
        } catch (err: any) {
            res.status(err.status || HTTP_STATUS.SERVER_ERROR)
               .json(apiResponse(false, err));
        }
    }

    static async deleteReport(req: Request, res: Response) {
        try {
            await ReportService.deleteReport(req.params.id);
            res.status(HTTP_STATUS.OK)
               .json(apiResponse(true, { message: "Report deleted successfully" }));
        } catch (err: any) {
            res.status(err.status || HTTP_STATUS.SERVER_ERROR)
               .json(apiResponse(false, err));
        }
    }

    static async getAllReports(req: Request, res: Response) {
        try {
            const reports = await ReportService.getAllReports();
            res.status(HTTP_STATUS.OK).json(apiResponse(true, reports));
        } catch (err: any) {
            res.status(err.status || HTTP_STATUS.SERVER_ERROR)
               .json(apiResponse(false, err));
        }
    }
}
