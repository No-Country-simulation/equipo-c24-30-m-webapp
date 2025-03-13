import { model, Schema } from "mongoose";
import { IReport, ReportCategory, ReportStatus } from "./interface";

const reportSchema = new Schema<IReport>({
  category: {
    type: String,
    enum: Object.values(ReportCategory),
    required: true,
  },
  url: { type: String },
  description: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: Object.values(ReportStatus), required: true },
});

const Report = model<IReport>("Report", reportSchema);
export default Report;
