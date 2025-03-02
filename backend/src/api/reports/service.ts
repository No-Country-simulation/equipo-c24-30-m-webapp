import ReportDAO from "./dao";
import { IReport, ReportCreateFields, ReportUpdateFields } from "./interface";
import Report from "./model";

class ReportService {
  private reportDAO: ReportDAO;

  constructor() {
    this.reportDAO = new ReportDAO(Report);
  }

  async createReport(data: ReportCreateFields): Promise<IReport> {
    return await this.reportDAO.create(data);
  }

  async getReportById(id: string): Promise<IReport | null> {
    return await this.reportDAO.findById(id);
  }

  async getAllReports(): Promise<IReport[]> {
    return await this.reportDAO.findAll();
  }

  async updateReport(id: string, data: ReportUpdateFields): Promise<IReport | null> {
    return await this.reportDAO.update(id, data);
  }

  async deleteReport(id: string): Promise<IReport | null> {
    return await this.reportDAO.delete(id);
  }
}

export default new ReportService();
