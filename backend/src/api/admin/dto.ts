// INTERFACES
import { IAdmin,  AdminResponse} from "../admin/interface";


export default class AdminDto {
    static adminsArrayDTO(admins: IAdmin[]): Partial<AdminResponse>[] {
        return admins.map((admin) => AdminDto.adminDTO(admin));
    }

    static adminDTO(admin: IAdmin): Partial<AdminResponse> {
        return {
            id: admin._id.toString(),
            email: admin.email,
            userName: admin.userName,
            phone: admin.phone,
            updatedAt: admin.updatedAt,
            createdAt: admin.createdAt,
            address: admin.address,
            status: admin.status,
            role: admin.role,
        };
    }
}
